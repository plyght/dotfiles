#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";

const AGENT_DIR = path.resolve(os.homedir(), ".pi/agent");
const SETTINGS_PATH = path.join(AGENT_DIR, "settings.json");
const LOCAL_PACKAGES_DIR = path.join(AGENT_DIR, "extensions/local-packages");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function sanitizeName(input) {
  return input.replace(/^npm:/, "").replace(/^git:/, "").replace(/[\/:@]+/g, "-").replace(/^-+|-+$/g, "");
}

function allMiseNodeModulesRoots() {
  const base = path.join(os.homedir(), ".local/share/mise/installs/node");
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base)
    .map((v) => path.join(base, v, "lib/node_modules"))
    .filter((p) => fs.existsSync(p));
}

function resolvePackageRoot(source) {
  if (source.startsWith("npm:")) {
    const name = source.slice(4);
    const candidates = [
      path.join(os.homedir(), ".bun/install/global/node_modules", name),
      ...allMiseNodeModulesRoots().map((root) => path.join(root, name)),
      path.join(os.homedir(), ".pi/npm/node_modules", name),
      path.join(process.cwd(), ".pi/npm/node_modules", name)
    ];
    return candidates.find((c) => fs.existsSync(c)) || null;
  }

  if (source.startsWith("git:github.com/")) {
    const rel = source.slice(4);
    const globalRoot = path.join(AGENT_DIR, "git", rel);
    const projectRoot = path.join(process.cwd(), ".pi/git", rel);
    if (fs.existsSync(projectRoot)) return projectRoot;
    if (fs.existsSync(globalRoot)) return globalRoot;
    return null;
  }

  if (source.startsWith("http://") || source.startsWith("https://") || source.startsWith("ssh://")) {
    return null;
  }

  if (source.startsWith("/") || source.startsWith("./") || source.startsWith("../")) {
    const abs = path.resolve(path.dirname(SETTINGS_PATH), source);
    return fs.existsSync(abs) ? abs : null;
  }

  return null;
}

function listExtensionsFromPackage(pkgRoot) {
  const packageJsonPath = path.join(pkgRoot, "package.json");
  const results = [];

  if (fs.existsSync(packageJsonPath)) {
    const pkg = readJson(packageJsonPath);
    const declared = pkg?.pi?.extensions;
    if (Array.isArray(declared)) {
      for (const rel of declared) {
        const abs = path.resolve(pkgRoot, rel);
        if (!fs.existsSync(abs)) continue;
        const st = fs.statSync(abs);
        if (st.isDirectory()) {
          for (const file of walk(abs)) {
            if (file.endsWith(".ts") || file.endsWith(".js")) results.push(file);
          }
        } else {
          results.push(abs);
        }
      }
      return dedupe(results);
    }
  }

  const conventional = path.join(pkgRoot, "extensions");
  if (fs.existsSync(conventional)) {
    for (const file of walk(conventional)) {
      if (file.endsWith(".ts") || file.endsWith(".js")) results.push(file);
    }
  }

  return dedupe(results);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function dedupe(arr) {
  return [...new Set(arr)];
}

function copyDir(src, dst) {
  ensureDir(path.dirname(dst));
  fs.rmSync(dst, { recursive: true, force: true });
  fs.cpSync(src, dst, { recursive: true, force: true });
}

function toSettingsPath(abs) {
  return "./" + path.relative(AGENT_DIR, abs).replaceAll(path.sep, "/");
}

function maybeInstall(source) {
  if (!source) return;
  execSync(`pi install ${JSON.stringify(source)}`, { stdio: "inherit" });
}

function main() {
  const source = process.argv[2];
  if (source) maybeInstall(source);

  const settings = readJson(SETTINGS_PATH);
  const packages = Array.isArray(settings.packages) ? [...settings.packages] : [];

  if (source && !packages.includes(source)) packages.push(source);

  if (packages.length === 0) {
    console.log("No packages in settings. Nothing to localize.");
    return;
  }

  ensureDir(LOCAL_PACKAGES_DIR);
  const extensionSet = new Set(Array.isArray(settings.extensions) ? settings.extensions : []);
  const failed = [];

  for (const pkgSource of packages) {
    const pkgRoot = resolvePackageRoot(pkgSource);
    if (!pkgRoot) {
      failed.push(`${pkgSource} (could not resolve install path)`);
      continue;
    }

    const pkgJsonPath = path.join(pkgRoot, "package.json");
    let folderName = sanitizeName(pkgSource);
    if (fs.existsSync(pkgJsonPath)) {
      const pkgName = readJson(pkgJsonPath).name;
      if (pkgName) folderName = sanitizeName(pkgName);
    }

    const dstRoot = path.join(LOCAL_PACKAGES_DIR, folderName);
    copyDir(pkgRoot, dstRoot);

    const srcExts = listExtensionsFromPackage(pkgRoot);
    for (const abs of srcExts) {
      const relFromPkg = path.relative(pkgRoot, abs);
      const dstExtAbs = path.join(dstRoot, relFromPkg);
      extensionSet.add(toSettingsPath(dstExtAbs));
    }

    console.log(`Localized ${pkgSource} -> ${dstRoot}`);
  }

  settings.extensions = [...extensionSet];
  settings.packages = [];
  writeJson(SETTINGS_PATH, settings);

  if (failed.length > 0) {
    console.log("\nSome packages were not localized:");
    for (const f of failed) console.log(`- ${f}`);
    process.exitCode = 1;
  } else {
    console.log("\nDone. settings.json now uses local extension files only.");
  }
}

main();

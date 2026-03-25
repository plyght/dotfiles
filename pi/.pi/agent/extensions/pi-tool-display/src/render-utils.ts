import { homedir } from "node:os";

interface TextLikeContent {
  type: string;
  text?: string;
}

interface ToolResultLike {
  content?: unknown;
}

const QUIET_COMMAND_PREFIXES = [
  "cd",
  "mkdir",
  "rmdir",
  "rm",
  "mv",
  "cp",
  "touch",
  "chmod",
  "chown",
  "git add",
  "git checkout",
  "git switch",
  "git restore",
  "git reset",
  "git clean",
  "npm install",
  "pnpm install",
  "yarn install",
  "bun install",
  "pip install",
  "poetry install",
  "cargo fetch",
  "go mod tidy",
  "Set-Location",
  "New-Item",
  "Remove-Item",
  "Move-Item",
  "Copy-Item",
] as const;

interface CompactOutputOptions {
  expanded: boolean;
  maxCollapsedConsecutiveEmptyLines?: number;
}

const ANSI_SGR_PATTERN = /\x1b\[([0-9;]*)m/g;
const STYLE_RESET_PARAMS = [39, 22, 23, 24, 25, 27, 28, 29, 59] as const;

function trimTrailingEmptyLines(lines: string[]): string[] {
  const next = [...lines];
  while (next.length > 0 && next[next.length - 1]?.trim().length === 0) {
    next.pop();
  }
  return next;
}

function collapseConsecutiveEmptyLines(
  lines: string[],
  maxConsecutiveEmptyLines: number,
): string[] {
  const maxAllowed = Math.max(0, maxConsecutiveEmptyLines);
  if (maxAllowed === 0) {
    return lines.filter((line) => line.trim().length > 0);
  }

  const compacted: string[] = [];
  let consecutiveEmpty = 0;

  for (const line of lines) {
    if (line.trim().length === 0) {
      consecutiveEmpty++;
      if (consecutiveEmpty > maxAllowed) {
        continue;
      }
    } else {
      consecutiveEmpty = 0;
    }
    compacted.push(line);
  }

  return compacted;
}

function toSgrParams(rawParams: string): number[] {
  if (!rawParams.trim()) {
    return [0];
  }

  const parsed = rawParams
    .split(";")
    .map((token) => Number.parseInt(token, 10))
    .filter((value) => Number.isFinite(value));

  return parsed.length > 0 ? parsed : [];
}

function sanitizeSgrParams(params: number[]): number[] {
  const sanitized: number[] = [];

  for (let index = 0; index < params.length; index++) {
    const param = params[index] ?? 0;

    if (param === 0) {
      sanitized.push(...STYLE_RESET_PARAMS);
      continue;
    }

    if (param === 49) {
      continue;
    }

    if ((param >= 40 && param <= 47) || (param >= 100 && param <= 107)) {
      continue;
    }

    if (param === 48) {
      const colorMode = params[index + 1];
      if (colorMode === 5) {
        index += 2;
        continue;
      }
      if (colorMode === 2) {
        index += 4;
        continue;
      }
      continue;
    }

    sanitized.push(param);
  }

  return sanitized;
}

export function shortenPath(inputPath: string | undefined): string {
  if (!inputPath) {
    return "";
  }
  const home = homedir();
  return inputPath.startsWith(home)
    ? `~${inputPath.slice(home.length)}`
    : inputPath;
}

export function extractTextOutput(result: ToolResultLike): string {
  const rawBlocks = Array.isArray(result.content) ? result.content : [];
  const blocks = rawBlocks.filter(
    (block): block is TextLikeContent =>
      typeof block === "object" &&
      block !== null &&
      "type" in block &&
      (block as TextLikeContent).type === "text" &&
      typeof (block as TextLikeContent).text === "string",
  );
  return blocks.map((block) => block.text ?? "").join("\n");
}

export function splitLines(text: string): string[] {
  if (!text) {
    return [];
  }
  return text
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/\t/g, "    "));
}

export function sanitizeAnsiForThemedOutput(text: string): string {
  if (!text || !text.includes("\x1b[")) {
    return text;
  }

  return text.replace(ANSI_SGR_PATTERN, (_sequence, rawParams: string) => {
    const parsed = toSgrParams(rawParams);
    if (parsed.length === 0) {
      return "";
    }

    const sanitized = sanitizeSgrParams(parsed);
    if (sanitized.length === 0) {
      return "";
    }

    return `\x1b[${sanitized.join(";")}m`;
  });
}

export function compactOutputLines(
  lines: string[],
  options: CompactOutputOptions,
): string[] {
  const trimmed = trimTrailingEmptyLines(lines);
  if (options.expanded) {
    return trimmed;
  }

  return collapseConsecutiveEmptyLines(
    trimmed,
    options.maxCollapsedConsecutiveEmptyLines ?? 1,
  );
}

export function isLikelyQuietCommand(command: string | undefined): boolean {
  if (!command) {
    return false;
  }

  const normalized = command.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  const primarySegment = normalized
    .split(/&&|\|\||;/)
    .map((segment) => segment.trim())
    .find((segment) => segment.length > 0);

  if (!primarySegment) {
    return false;
  }

  for (const prefix of QUIET_COMMAND_PREFIXES) {
    const normalizedPrefix = prefix.toLowerCase();
    if (
      primarySegment === normalizedPrefix ||
      primarySegment.startsWith(`${normalizedPrefix} `)
    ) {
      return true;
    }
  }

  return false;
}

export function countNonEmptyLines(lines: string[]): number {
  return lines.filter((line) => line.trim().length > 0).length;
}

export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
): string {
  return count === 1 ? singular : plural;
}

export function previewLines(
  lines: string[],
  maxLines: number,
): { shown: string[]; remaining: number } {
  const limit = Math.max(0, maxLines);
  const shown = lines.slice(0, limit);
  const remaining = Math.max(0, lines.length - shown.length);
  return { shown, remaining };
}

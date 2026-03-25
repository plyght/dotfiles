import { Type } from "@sinclair/typebox";
import type { AgentToolResult } from "@mariozechner/pi-agent-core";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { spawn, type ChildProcess } from "node:child_process";
import { createInterface } from "node:readline";

interface AcpConnection {
  proc: ChildProcess;
  sessionId: string | null;
  agentInfo: { name?: string; version?: string } | null;
  nextId: number;
  pending: Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>;
  updates: Array<{ kind: string; data: any }>;
}

const connections = new Map<string, AcpConnection>();

function sendRpc(conn: AcpConnection, method: string, params: any, isNotification = false): Promise<any> {
  return new Promise((resolve, reject) => {
    const id = isNotification ? undefined : conn.nextId++;
    const msg: any = { jsonrpc: "2.0", method, params };
    if (id !== undefined) {
      msg.id = id;
      conn.pending.set(id, { resolve, reject });
    }
    const line = JSON.stringify(msg) + "\n";
    conn.proc.stdin!.write(line, (err) => {
      if (err) reject(err);
      if (isNotification) resolve(undefined);
    });
  });
}

function handleIncoming(conn: AcpConnection, msg: any) {
  if (msg.id !== undefined && msg.id !== null && (msg.result !== undefined || msg.error !== undefined)) {
    const p = conn.pending.get(msg.id);
    if (p) {
      conn.pending.delete(msg.id);
      if (msg.error) p.reject(new Error(`${msg.error.code}: ${msg.error.message}`));
      else p.resolve(msg.result);
    }
    return;
  }

  if (msg.method === "session/update" && msg.params) {
    const update = msg.params.update || msg.params.sessionUpdate;
    if (update) {
      conn.updates.push({ kind: update.sessionUpdate || update.kind || "unknown", data: update });
    }
    return;
  }

  if (msg.method === "session/request_permission" && msg.id !== undefined) {
    const response = { jsonrpc: "2.0", id: msg.id, result: { outcome: "approved" } };
    conn.proc.stdin!.write(JSON.stringify(response) + "\n");
    return;
  }

  if (msg.method === "fs/read_text_file" && msg.id !== undefined) {
    try {
      const { readFileSync } = require("node:fs");
      const content = readFileSync(msg.params.path, "utf-8");
      const response = { jsonrpc: "2.0", id: msg.id, result: { content } };
      conn.proc.stdin!.write(JSON.stringify(response) + "\n");
    } catch (e: any) {
      const response = { jsonrpc: "2.0", id: msg.id, error: { code: -32000, message: e.message } };
      conn.proc.stdin!.write(JSON.stringify(response) + "\n");
    }
    return;
  }

  if (msg.method === "fs/write_text_file" && msg.id !== undefined) {
    try {
      const { writeFileSync, mkdirSync } = require("node:fs");
      const { dirname } = require("node:path");
      mkdirSync(dirname(msg.params.path), { recursive: true });
      writeFileSync(msg.params.path, msg.params.content, "utf-8");
      const response = { jsonrpc: "2.0", id: msg.id, result: {} };
      conn.proc.stdin!.write(JSON.stringify(response) + "\n");
    } catch (e: any) {
      const response = { jsonrpc: "2.0", id: msg.id, error: { code: -32000, message: e.message } };
      conn.proc.stdin!.write(JSON.stringify(response) + "\n");
    }
    return;
  }

  if (msg.method === "terminal/create" && msg.id !== undefined) {
    const { command, args = [], cwd } = msg.params;
    const child = spawn(command, args, { cwd: cwd || process.cwd(), stdio: ["pipe", "pipe", "pipe"] });
    let output = "";
    child.stdout?.on("data", (d: Buffer) => { output += d.toString(); });
    child.stderr?.on("data", (d: Buffer) => { output += d.toString(); });
    const termId = `term-${Date.now()}`;
    const termStore = (conn as any)._terminals || ((conn as any)._terminals = new Map());
    termStore.set(termId, { child, output: () => output, exitCode: null as number | null });
    child.on("exit", (code) => { termStore.get(termId).exitCode = code; });
    conn.proc.stdin!.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: { terminalId: termId } }) + "\n");
    return;
  }

  if (msg.method === "terminal/output" && msg.id !== undefined) {
    const termStore = (conn as any)._terminals;
    const term = termStore?.get(msg.params.terminalId);
    const result: any = { output: term?.output() ?? "" };
    if (term?.exitCode !== null) result.status = { exitCode: term.exitCode };
    conn.proc.stdin!.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result }) + "\n");
    return;
  }

  if (msg.method === "terminal/kill" && msg.id !== undefined) {
    const termStore = (conn as any)._terminals;
    const term = termStore?.get(msg.params.terminalId);
    term?.child?.kill();
    conn.proc.stdin!.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: {} }) + "\n");
    return;
  }

  if (msg.method === "terminal/release" && msg.id !== undefined) {
    conn.proc.stdin!.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: {} }) + "\n");
    return;
  }

  if (msg.method === "terminal/wait_for_exit" && msg.id !== undefined) {
    const termStore = (conn as any)._terminals;
    const term = termStore?.get(msg.params.terminalId);
    if (term?.exitCode !== null) {
      conn.proc.stdin!.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: { status: { exitCode: term.exitCode } } }) + "\n");
    } else {
      term?.child?.on("exit", (code: number) => {
        conn.proc.stdin!.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: { status: { exitCode: code } } }) + "\n");
      });
    }
    return;
  }
}

function collectOutput(conn: AcpConnection): string {
  const parts: string[] = [];
  for (const u of conn.updates) {
    if (u.kind === "agent_message_chunk") {
      const content = u.data.content || [];
      for (const block of content) {
        if (block.type === "text" && block.text) parts.push(block.text);
      }
    } else if (u.kind === "tool_call") {
      parts.push(`[tool: ${u.data.title || u.data.toolCallId}]`);
    } else if (u.kind === "tool_call_update" && u.data.status === "completed") {
      const content = u.data.content || [];
      for (const block of content) {
        if (block.type === "content") {
          for (const inner of (block.content || [])) {
            if (inner.type === "text") parts.push(`  ${inner.text}`);
          }
        }
      }
    }
  }
  conn.updates.length = 0;
  return parts.join("");
}

const AcpParams = Type.Object({
  action: Type.Union([
    Type.Literal("connect"),
    Type.Literal("prompt"),
    Type.Literal("disconnect"),
    Type.Literal("list"),
  ], { description: "Action to perform" }),
  name: Type.Optional(Type.String({ description: "Connection name (default: 'default')" })),
  command: Type.Optional(Type.String({ description: "Command to spawn the ACP server (for 'connect')" })),
  args: Type.Optional(Type.Array(Type.String(), { description: "Arguments for the ACP server command (for 'connect')" })),
  cwd: Type.Optional(Type.String({ description: "Working directory for the session (for 'connect')" })),
  authMethod: Type.Optional(Type.String({ description: "ACP auth method ID (e.g. 'cursor_login' for Cursor). Omit to skip auth." })),
  mode: Type.Optional(Type.String({ description: "Session mode: 'agent', 'plan', or 'ask' (for 'connect', default: 'agent')" })),
  prompt: Type.Optional(Type.String({ description: "Message to send to the agent (for 'prompt')" })),
});

export default function acpClient(pi: ExtensionAPI) {
  pi.registerTool({
    name: "acp",
    label: "ACP Client",
    description: `Connect to and interact with ACP (Agent Client Protocol) servers.
Actions:
• { action: "connect", command: "npx", args: ["-y", "pi-acp"], cwd: "/path" } - spawn and connect to an ACP agent
• { action: "prompt", prompt: "do something" } - send a prompt to a connected agent
• { action: "disconnect" } - tear down the connection
• { action: "list" } - list active connections`,
    promptSnippet: 'acp: Connect to ACP agent servers as a client. Use action: "connect" to spawn, "prompt" to message, "disconnect" to teardown.',
    parameters: AcpParams,

    async execute(_toolCallId, params, _signal, _onUpdate): Promise<AgentToolResult<any>> {
      const name = params.name || "default";

      if (params.action === "list") {
        const entries = Array.from(connections.entries()).map(([k, c]) => ({
          name: k,
          agent: c.agentInfo?.name || "unknown",
          sessionId: c.sessionId,
          alive: !c.proc.killed,
        }));
        return {
          content: [{ type: "text", text: entries.length > 0 ? JSON.stringify(entries, null, 2) : "No active ACP connections." }],
          details: { entries },
        };
      }

      if (params.action === "connect") {
        if (!params.command) {
          return { content: [{ type: "text", text: "Error: 'command' is required for connect action." }], details: {} };
        }

        if (connections.has(name)) {
          const old = connections.get(name)!;
          old.proc.kill();
          connections.delete(name);
        }

        const proc = spawn(params.command, params.args || [], {
          stdio: ["pipe", "pipe", "pipe"],
          cwd: params.cwd || process.cwd(),
        });

        const conn: AcpConnection = {
          proc,
          sessionId: null,
          agentInfo: null,
          nextId: 1,
          pending: new Map(),
          updates: [],
        };

        const rl = createInterface({ input: proc.stdout! });
        rl.on("line", (line: string) => {
          try {
            const msg = JSON.parse(line);
            handleIncoming(conn, msg);
          } catch {}
        });

        let stderrBuf = "";
        proc.stderr?.on("data", (d: Buffer) => { stderrBuf += d.toString(); });
        proc.on("exit", (code) => {
          for (const [, p] of conn.pending) p.reject(new Error(`ACP process exited with code ${code}`));
          conn.pending.clear();
        });

        connections.set(name, conn);

        try {
          const initResult = await sendRpc(conn, "initialize", {
            protocolVersion: 1,
            clientInfo: { name: "pi-acp-client", version: "0.1.0" },
            clientCapabilities: {
              filesystem: { readTextFile: true, writeTextFile: true },
              terminal: true,
            },
          });
          conn.agentInfo = initResult.agentInfo || null;

          const sessionResult = await sendRpc(conn, "session/new", {
            cwd: params.cwd || process.cwd(),
            mcpServers: [],
          });
          conn.sessionId = sessionResult.sessionId;

          const agentName = conn.agentInfo?.name || "unknown";
          const agentVer = conn.agentInfo?.version || "";
          return {
            content: [{ type: "text", text: `Connected to ACP agent: ${agentName} ${agentVer}\nSession: ${conn.sessionId}\nConnection name: ${name}` }],
            details: { agentInfo: conn.agentInfo, sessionId: conn.sessionId },
          };
        } catch (e: any) {
          proc.kill();
          connections.delete(name);
          return { content: [{ type: "text", text: `Failed to connect: ${e.message}\n${stderrBuf}` }], details: {} };
        }
      }

      if (params.action === "prompt") {
        const conn = connections.get(name);
        if (!conn || conn.proc.killed) {
          return { content: [{ type: "text", text: `No active connection '${name}'. Use action: "connect" first.` }], details: {} };
        }
        if (!conn.sessionId) {
          return { content: [{ type: "text", text: "Session not established yet." }], details: {} };
        }
        if (!params.prompt) {
          return { content: [{ type: "text", text: "Error: 'prompt' is required for prompt action." }], details: {} };
        }

        conn.updates.length = 0;

        try {
          const result = await sendRpc(conn, "session/prompt", {
            sessionId: conn.sessionId,
            prompt: [{ type: "text", text: params.prompt }],
          });

          const output = collectOutput(conn);
          const usage = result.usage;
          let summary = output || "(no text response)";
          if (usage) {
            summary += `\n\n[tokens: ${usage.inputTokens}in/${usage.outputTokens}out, stop: ${result.stopReason}]`;
          }
          return { content: [{ type: "text", text: summary }], details: { stopReason: result.stopReason, usage } };
        } catch (e: any) {
          const partial = collectOutput(conn);
          return { content: [{ type: "text", text: `Error: ${e.message}${partial ? "\nPartial output:\n" + partial : ""}` }], details: {} };
        }
      }

      if (params.action === "disconnect") {
        const conn = connections.get(name);
        if (!conn) {
          return { content: [{ type: "text", text: `No connection '${name}' to disconnect.` }], details: {} };
        }
        conn.proc.kill();
        connections.delete(name);
        return { content: [{ type: "text", text: `Disconnected '${name}'.` }], details: {} };
      }

      return { content: [{ type: "text", text: `Unknown action: ${params.action}` }], details: {} };
    },
  });

  pi.registerCommand("acp-connect", {
    description: "Connect to an ACP agent server",
    handler: async (args, ctx) => {
      const parts = (args || "").trim().split(/\s+/);
      if (parts.length === 0 || !parts[0]) {
        ctx.ui.notify("Usage: /acp-connect <command> [args...]", "warning");
        return;
      }
      const command = parts[0];
      const cmdArgs = parts.slice(1);
      ctx.ui.notify(`Connecting to ACP: ${command} ${cmdArgs.join(" ")}...`, "info");
    },
  });

  pi.registerCommand("acp-list", {
    description: "List active ACP connections",
    handler: async (_args, ctx) => {
      if (connections.size === 0) {
        ctx.ui.notify("No active ACP connections.", "info");
        return;
      }
      const lines = Array.from(connections.entries()).map(([k, c]) =>
        `${k}: ${c.agentInfo?.name || "?"} (session: ${c.sessionId || "none"}, alive: ${!c.proc.killed})`
      );
      ctx.ui.notify(lines.join("\n"), "info");
    },
  });

  pi.on("session_shutdown", () => {
    for (const [, conn] of connections) {
      conn.proc.kill();
    }
    connections.clear();
  });
}

import type {
  ExtensionAPI,
  ReadonlyFooterDataProvider,
  Theme,
} from "@mariozechner/pi-coding-agent";

export default function footer(pi: ExtensionAPI) {
  let modelName = "";
  let contextWindow = 0;
  let contextPercent: number | null = null;
  let subagentCount = 0;
  let footerSet = false;

  function updateModel(ctx: { model: any; getContextUsage(): any }) {
    const m = ctx.model;
    if (m) {
      modelName = m.name || m.id || "unknown";
      if (modelName.startsWith("Claude ")) modelName = modelName.slice(7);
      contextWindow = m.contextWindow ?? contextWindow;
    }
    const usage = ctx.getContextUsage();
    if (usage) {
      contextPercent = usage.percent;
      contextWindow = usage.contextWindow || contextWindow;
    }
  }

  function setupFooter(ctx: any) {
    if (footerSet) return;
    footerSet = true;

    ctx.ui.setFooter((_tui: any, theme: Theme, _footerData: ReadonlyFooterDataProvider) => {
      return {
        dispose() { footerSet = false; },
        invalidate() {},
        render(_width: number): string[] {
          const parts: string[] = [theme.fg("accent", "π")];

          if (modelName) {
            parts.push(theme.fg("muted", modelName));
          }

          if (contextWindow > 0) {
            const windowK = contextWindow >= 1_000_000
              ? `${(contextWindow / 1_000_000).toFixed(1)}M`
              : `${Math.round(contextWindow / 1000)}k`;
            const pct = contextPercent !== null ? `${Math.round(contextPercent)}%` : "–";
            parts.push(theme.fg("muted", `${pct}·${windowK}`));
          }

          if (subagentCount > 0) {
            parts.push(theme.fg("accent", `⊕${subagentCount}`));
          }

          return [` ${parts.join(theme.fg("dim", " ∗ "))} `];
        },
      };
    });
  }

  pi.on("session_start", (_event, ctx) => {
    updateModel(ctx);
    setupFooter(ctx);
  });

  pi.on("session_switch", (_event, ctx) => {
    updateModel(ctx);
    setupFooter(ctx);
  });

  pi.on("agent_start", (_event, ctx) => {
    updateModel(ctx);
    setupFooter(ctx);
  });

  pi.on("message_end", (_event, ctx) => {
    updateModel(ctx);
  });

  pi.on("tool_execution_start", (event, _ctx) => {
    if (event.toolName === "subagent") subagentCount++;
  });

  pi.on("agent_end", () => {
    subagentCount = 0;
  });
}

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

function stripAnsi(text: string): string {
	return text.replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, "").replace(/\x1b\][^\x07]*(?:\x07|\x1b\\)/g, "");
}

function visibleWidth(text: string): number {
	return [...stripAnsi(text)].length;
}

function truncateToWidth(text: string, width: number, ellipsis = "..."): string {
	if (width <= 0) return "";
	if (visibleWidth(text) <= width) return text;
	const max = Math.max(0, width - visibleWidth(ellipsis));
	let out = "";
	let used = 0;
	for (const ch of stripAnsi(text)) {
		if (used >= max) break;
		out += ch;
		used++;
	}
	return out + (width >= visibleWidth(ellipsis) ? ellipsis : "");
}

function sanitizeStatusText(text: string): string {
	return text.replace(/[\r\n\t]/g, " ").replace(/ +/g, " ").trim();
}

export default function (pi: ExtensionAPI) {
	function installFooter(ctx: ExtensionContext) {
		ctx.ui.setFooter((_tui, theme, footerData) => {
			return {
				invalidate() {},
				render(width: number): string[] {
					const statuses = Array.from(footerData.getExtensionStatuses().entries())
						.sort(([a], [b]) => a.localeCompare(b))
						.map(([, text]) => sanitizeStatusText(text))
						.filter(Boolean);

					if (statuses.length === 0) return [];

					return [theme.fg("dim", truncateToWidth(statuses.join(" "), width, "..."))];
				},
			};
		});
	}

	function installFooterAfterOtherExtensions(ctx: ExtensionContext) {
		installFooter(ctx);
		setTimeout(() => installFooter(ctx), 0);
		setTimeout(() => installFooter(ctx), 25);
	}

	pi.on("session_start", (_event, ctx) => installFooterAfterOtherExtensions(ctx));
	pi.on("model_select", (_event, ctx) => installFooterAfterOtherExtensions(ctx));
	pi.on("turn_start", (_event, ctx) => installFooter(ctx));
	pi.on("turn_end", (_event, ctx) => installFooter(ctx));

	pi.registerCommand("one-line-footer", {
		description: "Reinstall the one-line footer",
		handler: async (_args, ctx) => installFooterAfterOtherExtensions(ctx),
	});
}

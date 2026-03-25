export interface PromptMetadata {
	promptSnippet?: string;
	promptGuidelines?: string[];
}

interface PromptMetadataSource {
	promptSnippet?: string;
	promptGuidelines?: string[];
}

const MCP_DESCRIPTION_PATTERN = /\bmcp\b/i;

export function toRecord(value: unknown): Record<string, unknown> {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return {};
	}

	return value as Record<string, unknown>;
}

export function getTextField(value: unknown, field: string): string | undefined {
	const record = toRecord(value);
	const raw = record[field];
	return typeof raw === "string" && raw.trim().length > 0 ? raw.trim() : undefined;
}

export function extractPromptMetadata(tool: PromptMetadataSource): PromptMetadata {
	const promptSnippet =
		typeof tool.promptSnippet === "string" && tool.promptSnippet.trim().length > 0
			? tool.promptSnippet
			: undefined;
	const promptGuidelines = Array.isArray(tool.promptGuidelines)
		? tool.promptGuidelines.filter(
				(guideline): guideline is string =>
					typeof guideline === "string" && guideline.trim().length > 0,
			)
		: undefined;

	return {
		promptSnippet,
		promptGuidelines:
			promptGuidelines && promptGuidelines.length > 0
				? [...promptGuidelines]
				: undefined,
	};
}

export function isMcpToolCandidate(tool: unknown): boolean {
	const name = getTextField(tool, "name");
	if (name === "mcp") {
		return true;
	}

	const description = getTextField(tool, "description");
	return typeof description === "string" && MCP_DESCRIPTION_PATTERN.test(description);
}

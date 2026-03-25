interface MarkdownLike {
  text?: unknown;
  theme?: unknown;
  defaultTextStyle?: unknown;
}

interface UserMessageLike {
  children?: unknown;
}

export interface UserMessageMarkdownState {
  text: string;
  theme: unknown;
  defaultTextStyle?: Record<string, unknown>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeDefaultTextStyle(value: unknown): Record<string, unknown> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const { bgColor: _bgColor, ...rest } = value;
  return Object.keys(rest).length > 0 ? rest : undefined;
}

function isMarkdownLike(value: unknown): value is MarkdownLike {
  return isRecord(value) && typeof value.text === "string" && value.theme !== undefined;
}

export function extractUserMessageMarkdownState(
  userMessage: UserMessageLike,
): UserMessageMarkdownState | undefined {
  const children = Array.isArray(userMessage.children) ? userMessage.children : [];
  const markdownChild = children.find((child) => isMarkdownLike(child));
  if (!markdownChild || typeof markdownChild.text !== "string") {
    return undefined;
  }

  return {
    text: markdownChild.text,
    theme: markdownChild.theme,
    defaultTextStyle: sanitizeDefaultTextStyle(markdownChild.defaultTextStyle),
  };
}

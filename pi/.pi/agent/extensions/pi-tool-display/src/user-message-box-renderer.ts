import {
  Markdown,
  truncateToWidth,
  visibleWidth,
  type DefaultTextStyle,
  type MarkdownTheme,
} from "@mariozechner/pi-tui";
import {
  patchUserMessageRenderPrototype,
  type PatchableUserMessagePrototype,
} from "./user-message-box-patch.js";
import {
  extractUserMessageMarkdownState,
  type UserMessageMarkdownState,
} from "./user-message-box-markdown.js";

export type { PatchableUserMessagePrototype } from "./user-message-box-patch.js";
import {
  applyUserMessageBackground,
  normalizeUserMessageContentLine,
  normalizeUserMessageContentLines,
  type UserMessageBackgroundTheme,
} from "./user-message-box-utils.js";

export interface UserMessageTheme extends UserMessageBackgroundTheme {
  fg(color: string, text: string): string;
  bold?(text: string): string;
}

interface CachedUserMessageMarkdownRenderer {
  text: string;
  theme: unknown;
  defaultTextStyle?: Record<string, unknown>;
  renderer: { render(width: number): string[] };
  renderedWidth: number;
  renderedLines: string[];
}

const MIN_BORDER_WIDTH = 8;
const ACCENT_BAR = "▎";
const CONTENT_HORIZONTAL_PADDING_COLUMNS = 1;
const USER_MESSAGE_PATCH_VERSION = 6;
const MAX_USER_MESSAGE_MARKDOWN_TEXT_LENGTH = 100_000;
const MAX_USER_MESSAGE_MARKDOWN_LINE_COUNT = 2_000;

function colorBorder(theme: UserMessageTheme | undefined, text: string): string {
  if (!text || !theme) {
    return text;
  }

  try {
    return theme.fg("border", text);
  } catch {
    return text;
  }
}

function colorUserBackground(
  theme: UserMessageTheme | undefined,
  text: string,
): string {
  return applyUserMessageBackground(theme, text);
}

function wrapContentLine(
  line: string,
  totalWidth: number,
  theme: UserMessageTheme | undefined,
): string {
  const sidePadding = " ".repeat(CONTENT_HORIZONTAL_PADDING_COLUMNS);
  const barWidth = visibleWidth(ACCENT_BAR);
  const innerWidth = Math.max(
    1,
    totalWidth - barWidth - CONTENT_HORIZONTAL_PADDING_COLUMNS,
  );
  const normalizedLine = normalizeUserMessageContentLine(line);
  const content = truncateToWidth(normalizedLine, innerWidth, "", true);
  const row = `${colorBorder(theme, ACCENT_BAR)}${sidePadding}${content}`;

  return colorUserBackground(theme, row);
}

function createMarkdownRenderer(
  markdownState: UserMessageMarkdownState,
): { render(width: number): string[] } {
  return new Markdown(
    markdownState.text,
    0,
    0,
    markdownState.theme as MarkdownTheme,
    markdownState.defaultTextStyle as DefaultTextStyle | undefined,
  );
}

function countUserMessageLines(text: string, maxLines: number): number {
  let lineCount = 1;
  for (const character of text) {
    if (character !== "\n") {
      continue;
    }

    lineCount++;
    if (lineCount > maxLines) {
      return lineCount;
    }
  }

  return lineCount;
}

function hasSameDefaultTextStyle(
  left: Record<string, unknown> | undefined,
  right: Record<string, unknown> | undefined,
): boolean {
  if (left === right) {
    return true;
  }
  if (!left || !right) {
    return left === right;
  }

  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  for (const key of leftKeys) {
    if (left[key] !== right[key]) {
      return false;
    }
  }

  return true;
}

function hasSameMarkdownState(
  cached: CachedUserMessageMarkdownRenderer,
  state: UserMessageMarkdownState,
): boolean {
  return cached.text === state.text
    && cached.theme === state.theme
    && hasSameDefaultTextStyle(cached.defaultTextStyle, state.defaultTextStyle);
}

export function shouldBypassUserMessageMarkdownRebuild(
  markdownState: UserMessageMarkdownState,
): boolean {
  if (markdownState.text.length > MAX_USER_MESSAGE_MARKDOWN_TEXT_LENGTH) {
    return true;
  }

  return countUserMessageLines(
    markdownState.text,
    MAX_USER_MESSAGE_MARKDOWN_LINE_COUNT,
  ) > MAX_USER_MESSAGE_MARKDOWN_LINE_COUNT;
}

export function createUserMessageMarkdownLineRenderer(
  buildRenderer: (
    markdownState: UserMessageMarkdownState,
  ) => { render(width: number): string[] } = createMarkdownRenderer,
): (
  instance: object,
  markdownState: UserMessageMarkdownState,
  width: number,
) => string[] {
  const cache = new WeakMap<object, CachedUserMessageMarkdownRenderer>();

  return (instance, markdownState, width) => {
    const cached = cache.get(instance);
    const canReuseRenderer = cached
      ? hasSameMarkdownState(cached, markdownState)
      : false;

    if (canReuseRenderer && cached?.renderedWidth === width) {
      return cached.renderedLines;
    }

    const renderer = canReuseRenderer && cached
      ? cached.renderer
      : buildRenderer(markdownState);
    const renderedLines = renderer.render(width);

    cache.set(instance, {
      text: markdownState.text,
      theme: markdownState.theme,
      defaultTextStyle: markdownState.defaultTextStyle,
      renderer,
      renderedWidth: width,
      renderedLines,
    });

    return renderedLines;
  };
}

const renderCachedUserMessageMarkdownLines =
  createUserMessageMarkdownLineRenderer();

function renderUserMessageBodyLines(
  instance: unknown,
  innerWidth: number,
  originalRender: (width: number) => string[],
): string[] {
  if (typeof instance !== "object" || instance === null) {
    return originalRender.call(instance, innerWidth);
  }

  const markdownState = extractUserMessageMarkdownState(
    instance as { children?: unknown[] },
  );
  if (!markdownState || shouldBypassUserMessageMarkdownRebuild(markdownState)) {
    return originalRender.call(instance, innerWidth);
  }

  try {
    return renderCachedUserMessageMarkdownLines(
      instance,
      markdownState,
      innerWidth,
    );
  } catch {
    return originalRender.call(instance, innerWidth);
  }
}

export function patchNativeUserMessagePrototype(
  prototype: PatchableUserMessagePrototype,
  getTheme: () => UserMessageTheme | undefined,
  isEnabled: () => boolean,
): void {
  patchUserMessageRenderPrototype(
    prototype,
    USER_MESSAGE_PATCH_VERSION,
    (originalRender) =>
      function renderWithNativeUserBorder(width: number): string[] {
        const safeWidth = Math.max(0, Math.floor(width));
        if (!isEnabled() || safeWidth < MIN_BORDER_WIDTH) {
          return originalRender.call(this, safeWidth);
        }

        const barWidth = visibleWidth(ACCENT_BAR) + CONTENT_HORIZONTAL_PADDING_COLUMNS;
        const innerWidth = Math.max(1, safeWidth - barWidth);
        const lines = renderUserMessageBodyLines(this, innerWidth, originalRender);
        const contentLines = normalizeUserMessageContentLines(lines);
        const body = contentLines.length > 0 ? contentLines : [""];
        const theme = getTheme();

        return [
          "",
          ...body.map((renderLine) =>
            wrapContentLine(renderLine, safeWidth, theme),
          ),
          "",
        ];
      },
  );
}

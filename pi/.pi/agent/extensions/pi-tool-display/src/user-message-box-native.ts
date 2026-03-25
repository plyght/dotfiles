import {
  type ExtensionAPI,
  UserMessageComponent,
} from "@mariozechner/pi-coding-agent";
import {
  patchNativeUserMessagePrototype,
  type PatchableUserMessagePrototype,
  type UserMessageTheme,
} from "./user-message-box-renderer.js";
import type { ToolDisplayConfig } from "./types.js";

function patchUserMessageRender(
  getTheme: () => UserMessageTheme | undefined,
  isEnabled: () => boolean,
): void {
  patchNativeUserMessagePrototype(
    UserMessageComponent.prototype as unknown as PatchableUserMessagePrototype,
    getTheme,
    isEnabled,
  );
}

export default function registerNativeUserMessageBox(
  pi: ExtensionAPI,
  getConfig: () => ToolDisplayConfig,
): void {
  let activeTheme: UserMessageTheme | undefined;

  const getTheme = (): UserMessageTheme | undefined => activeTheme;
  const isEnabled = (): boolean => getConfig().enableNativeUserMessageBox;

  patchUserMessageRender(getTheme, isEnabled);

  pi.on("before_agent_start", async () => {
    patchUserMessageRender(getTheme, isEnabled);
  });

  pi.on("session_start", async (_event, ctx) => {
    activeTheme = ctx.ui.theme as unknown as UserMessageTheme;
    patchUserMessageRender(getTheme, isEnabled);
  });

  pi.on("session_switch", async (_event, ctx) => {
    activeTheme = ctx.ui.theme as unknown as UserMessageTheme;
    patchUserMessageRender(getTheme, isEnabled);
  });
}

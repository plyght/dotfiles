export type UserMessageRenderFn = (width: number) => string[];

export interface PatchableUserMessagePrototype {
  render: UserMessageRenderFn;
  __piUserMessageOriginalRender?: UserMessageRenderFn;
  __piUserMessageNativePatched?: boolean;
  __piUserMessagePatchVersion?: number;
}

export function patchUserMessageRenderPrototype(
  prototype: PatchableUserMessagePrototype,
  patchVersion: number,
  buildRender: (originalRender: UserMessageRenderFn) => UserMessageRenderFn,
): void {
  if (typeof prototype.render !== "function") {
    return;
  }

  if (
    prototype.__piUserMessageNativePatched
    && prototype.__piUserMessagePatchVersion === patchVersion
    && typeof prototype.__piUserMessageOriginalRender === "function"
  ) {
    return;
  }

  if (!prototype.__piUserMessageOriginalRender) {
    prototype.__piUserMessageOriginalRender = prototype.render;
  }

  const originalRender = prototype.__piUserMessageOriginalRender;
  if (!originalRender) {
    return;
  }

  prototype.render = buildRender(originalRender);
  prototype.__piUserMessageNativePatched = true;
  prototype.__piUserMessagePatchVersion = patchVersion;
}

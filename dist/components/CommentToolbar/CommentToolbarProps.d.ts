import { UiElementPosition } from "@blocknote/core";
import { CommentToolbarProsemirrorPlugin, CommentToolbarState } from "./CommentToolbarPlugin";
export type CommentToolbarProps = Omit<CommentToolbarState, keyof UiElementPosition> & Pick<CommentToolbarProsemirrorPlugin, "deleteComment" | "editComment" | "startHideTimer" | "stopHideTimer">;

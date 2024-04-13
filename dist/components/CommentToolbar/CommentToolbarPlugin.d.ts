import { Plugin, PluginKey } from "prosemirror-state";
import { Extension, Editor } from "@tiptap/core";
import { UiElementPosition } from "@blocknote/core";
import { EventEmitter } from "../../utils/EventEmitter";
export type CommentToolbarState = UiElementPosition & {
    comment: string;
    text: string;
};
export declare const commentToolbarPluginKey: PluginKey<any>;
export declare class CommentToolbarProsemirrorPlugin extends EventEmitter<any> {
    private view;
    readonly plugin: Plugin;
    constructor(editor: Editor);
    onUpdate(callback: (state: CommentToolbarState) => void): () => void;
    /**
     * Edit the currently hovered link.
     */
    editComment: (comment: string, text: string) => void;
    /**
     * Delete the currently hovered link.
     */
    deleteComment: () => void;
    /**
     * When hovering on/off links using the mouse cursor, the link toolbar will
     * open & close with a delay.
     *
     * This function starts the delay timer, and should be used for when the mouse
     * cursor enters the link toolbar.
     */
    startHideTimer: () => void;
    /**
     * When hovering on/off links using the mouse cursor, the link toolbar will
     * open & close with a delay.
     *
     * This function stops the delay timer, and should be used for when the mouse
     * cursor exits the link toolbar.
     */
    stopHideTimer: () => void;
}
declare const CommentToolbarPlugin: Extension<any, any>;
export default CommentToolbarPlugin;

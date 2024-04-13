import { getMarkRange, posToDOMRect, Range } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import { Mark } from "prosemirror-model";
import { Plugin, PluginKey } from "prosemirror-state";
import { Extension, Editor } from "@tiptap/core";

import { UiElementPosition } from "@blocknote/core";
import { EventEmitter } from "../../utils/EventEmitter";

export type CommentToolbarState = UiElementPosition & {
  // The hovered link's URL, and the text it's displayed with in the
  // editor.
  comment: string;
  text: string;
};

class CommentToolbarView {
  public state?: CommentToolbarState;
  public emitUpdate: () => void;

  menuUpdateTimer: ReturnType<typeof setTimeout> | undefined;
  startMenuUpdateTimer: () => void;
  stopMenuUpdateTimer: () => void;

  mouseHoveredCommentMark: Mark | undefined;
  mouseHoveredCommentMarkRange: Range | undefined;

  keyboardHoveredCommentMark: Mark | undefined;
  keyboardHoveredCommentMarkRange: Range | undefined;

  commentMark: Mark | undefined;
  commentMarkRange: Range | undefined;

  constructor(
    private readonly editor: Editor,
    private readonly pmView: EditorView,
    emitUpdate: (state: CommentToolbarState) => void
  ) {
    this.emitUpdate = () => {
      if (!this.state) {
        throw new Error("Attempting to update uninitialized comment toolbar");
      }

      emitUpdate(this.state);
    };

    this.startMenuUpdateTimer = () => {
      this.menuUpdateTimer = setTimeout(() => {
        this.update();
      }, 250);
    };

    this.stopMenuUpdateTimer = () => {
      if (this.menuUpdateTimer) {
        clearTimeout(this.menuUpdateTimer);
        this.menuUpdateTimer = undefined;
      }

      return false;
    };
    this.pmView.dom.addEventListener("mouseover", this.mouseOverHandler);
    document.addEventListener("click", this.clickHandler, true);
    document.addEventListener("scroll", this.scrollHandler);
  }

  mouseOverHandler = (event: MouseEvent) => {
    // Resets the link mark currently hovered by the mouse cursor.
    this.mouseHoveredCommentMark = undefined;
    this.mouseHoveredCommentMarkRange = undefined;

    this.stopMenuUpdateTimer();

    if (
      event.target instanceof HTMLSpanElement &&
      event.target.dataset.styleType === "comment"
    ) {
      // Finds link mark at the hovered element's position to update mouseHoveredCommentMark and
      // mouseHoveredCommentMarkRange.
      const hoveredCommentElement = event.target;
      const posInHoveredCommentMark =
        this.pmView.posAtDOM(hoveredCommentElement, 0) + 1;
      const resolvedPosInHoveredCommentMark = this.pmView.state.doc.resolve(
        posInHoveredCommentMark
      );
      const marksAtPos = resolvedPosInHoveredCommentMark.marks();

      for (const mark of marksAtPos) {
        if (
          mark.type.name === this.pmView.state.schema.mark("comment").type.name
        ) {
          this.mouseHoveredCommentMark = mark;
          this.mouseHoveredCommentMarkRange =
            getMarkRange(
              resolvedPosInHoveredCommentMark,
              mark.type,
              mark.attrs
            ) || undefined;

          break;
        }
      }
    }

    this.startMenuUpdateTimer();

    return false;
  };

  clickHandler = (event: MouseEvent) => {
    const editorWrapper = this.pmView.dom.parentElement!;

    if (
      // Toolbar is open.
      this.commentMark &&
      // An element is clicked.
      event &&
      event.target &&
      // The clicked element is not the editor.
      !(
        editorWrapper === (event.target as Node) ||
        editorWrapper.contains(event.target as Node)
      )
    ) {
      if (this.state?.show) {
        this.state.show = false;
        this.emitUpdate();
      }
    }
  };

  scrollHandler = () => {
    if (this.commentMark !== undefined) {
      if (this.state?.show) {
        this.state.referencePos = posToDOMRect(
          this.pmView,
          this.commentMarkRange!.from,
          this.commentMarkRange!.to
        );
        this.emitUpdate();
      }
    }
  };

  editComment(comment: string, text: string) {
    const tr = this.pmView.state.tr.insertText(
      text,
      this.commentMarkRange!.from,
      this.commentMarkRange!.to
    );
    tr.addMark(
      this.commentMarkRange!.from,
      this.commentMarkRange!.from + text.length,
      this.pmView.state.schema.mark("comment", { comment: comment })
    );
    this.pmView.dispatch(tr);
    this.pmView.focus();

    if (this.state?.show) {
      this.state.show = false;
      this.emitUpdate();
    }
  }

  deleteComment() {
    this.pmView.dispatch(
      this.pmView.state.tr
        .removeMark(
          this.commentMarkRange!.from,
          this.commentMarkRange!.to,
          this.commentMark!.type
        )
        .setMeta("preventAutolink", true)
    );
    this.pmView.focus();

    if (this.state?.show) {
      this.state.show = false;
      this.emitUpdate();
    }
  }

  update() {
    if (!this.pmView.hasFocus()) {
      return;
    }

    // Saves the currently hovered link mark before it's updated.
    const prevcommentMark = this.commentMark;

    // Resets the currently hovered link mark.
    this.commentMark = undefined;
    this.commentMarkRange = undefined;

    // Resets the link mark currently hovered by the keyboard cursor.
    this.keyboardHoveredCommentMark = undefined;
    this.keyboardHoveredCommentMarkRange = undefined;

    // Finds link mark at the editor selection's position to update keyboardHoveredCommentMark and
    // keyboardHoveredCommentMarkRange.
    if (this.pmView.state.selection.empty) {
      const marksAtPos = this.pmView.state.selection.$from.marks();

      for (const mark of marksAtPos) {
        if (
          mark.type.name === this.pmView.state.schema.mark("link").type.name
        ) {
          this.keyboardHoveredCommentMark = mark;
          this.keyboardHoveredCommentMarkRange =
            getMarkRange(
              this.pmView.state.selection.$from,
              mark.type,
              mark.attrs
            ) || undefined;

          break;
        }
      }
    }

    if (this.mouseHoveredCommentMark) {
      this.commentMark = this.mouseHoveredCommentMark;
      this.commentMarkRange = this.mouseHoveredCommentMarkRange;
    }

    // Keyboard cursor position takes precedence over mouse hovered link.
    if (this.keyboardHoveredCommentMark) {
      this.commentMark = this.keyboardHoveredCommentMark;
      this.commentMarkRange = this.keyboardHoveredCommentMarkRange;
    }

    if (this.commentMark && this.editor.isEditable) {
      this.state = {
        show: true,
        referencePos: posToDOMRect(
          this.pmView,
          this.commentMarkRange!.from,
          this.commentMarkRange!.to
        ),
        comment: this.commentMark!.attrs.comment,
        text: this.pmView.state.doc.textBetween(
          this.commentMarkRange!.from,
          this.commentMarkRange!.to
        ),
      };
      this.emitUpdate();

      return;
    }

    // Hides menu.
    if (
      this.state?.show &&
      prevcommentMark &&
      (!this.commentMark || !this.editor.isEditable)
    ) {
      this.state.show = false;
      this.emitUpdate();

      return;
    }
  }

  destroy() {
    this.pmView.dom.removeEventListener("mouseover", this.mouseOverHandler);
    document.removeEventListener("scroll", this.scrollHandler);
    document.removeEventListener("click", this.clickHandler, true);
  }
}

export const commentToolbarPluginKey = new PluginKey("CommentToolbarPlugin");

export class CommentToolbarProsemirrorPlugin extends EventEmitter<any> {
  private view: CommentToolbarView | undefined;
  public readonly plugin: Plugin;

  constructor(editor: Editor) {
    super();
    this.plugin = new Plugin({
      key: commentToolbarPluginKey,
      view: (editorView) => {
        this.view = new CommentToolbarView(editor, editorView, (state) => {
          this.emit("update", state);
        });
        return this.view;
      },
    });
  }

  public onUpdate(callback: (state: CommentToolbarState) => void) {
    return this.on("update", callback);
  }

  /**
   * Edit the currently hovered link.
   */
  public editComment = (comment: string, text: string) => {
    this.view!.editComment(comment, text);
  };

  /**
   * Delete the currently hovered link.
   */
  public deleteComment = () => {
    this.view!.deleteComment();
  };

  /**
   * When hovering on/off links using the mouse cursor, the link toolbar will
   * open & close with a delay.
   *
   * This function starts the delay timer, and should be used for when the mouse
   * cursor enters the link toolbar.
   */
  public startHideTimer = () => {
    this.view!.startMenuUpdateTimer();
  };

  /**
   * When hovering on/off links using the mouse cursor, the link toolbar will
   * open & close with a delay.
   *
   * This function stops the delay timer, and should be used for when the mouse
   * cursor exits the link toolbar.
   */
  public stopHideTimer = () => {
    this.view!.stopMenuUpdateTimer();
  };
}

const CommentToolbarPlugin = Extension.create({
  name: "CommentToolbarPlugin",

  addProseMirrorPlugins() {
    return [new CommentToolbarProsemirrorPlugin(this.editor).plugin];
  },
});

export default CommentToolbarPlugin;

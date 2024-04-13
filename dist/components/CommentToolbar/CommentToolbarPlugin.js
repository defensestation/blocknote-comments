var d = Object.defineProperty;
var c = (s, e, t) => e in s ? d(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var i = (s, e, t) => (c(s, typeof e != "symbol" ? e + "" : e, t), t);
import { Extension as p, getMarkRange as a, posToDOMRect as n } from "@tiptap/core";
import { PluginKey as k, Plugin as l } from "prosemirror-state";
import { EventEmitter as u } from "../../utils/EventEmitter.js";
class M {
  constructor(e, t, m) {
    i(this, "state");
    i(this, "emitUpdate");
    i(this, "menuUpdateTimer");
    i(this, "startMenuUpdateTimer");
    i(this, "stopMenuUpdateTimer");
    i(this, "mouseHoveredCommentMark");
    i(this, "mouseHoveredCommentMarkRange");
    i(this, "keyboardHoveredCommentMark");
    i(this, "keyboardHoveredCommentMarkRange");
    i(this, "commentMark");
    i(this, "commentMarkRange");
    i(this, "mouseOverHandler", (e) => {
      if (this.mouseHoveredCommentMark = void 0, this.mouseHoveredCommentMarkRange = void 0, this.stopMenuUpdateTimer(), e.target instanceof HTMLSpanElement && e.target.dataset.styleType === "comment") {
        const t = e.target, m = this.pmView.posAtDOM(t, 0) + 1, o = this.pmView.state.doc.resolve(
          m
        ), h = o.marks();
        for (const r of h)
          if (r.type.name === this.pmView.state.schema.mark("comment").type.name) {
            this.mouseHoveredCommentMark = r, this.mouseHoveredCommentMarkRange = a(
              o,
              r.type,
              r.attrs
            ) || void 0;
            break;
          }
      }
      return this.startMenuUpdateTimer(), !1;
    });
    i(this, "clickHandler", (e) => {
      var m;
      const t = this.pmView.dom.parentElement;
      // Toolbar is open.
      this.commentMark && // An element is clicked.
      e && e.target && // The clicked element is not the editor.
      !(t === e.target || t.contains(e.target)) && (m = this.state) != null && m.show && (this.state.show = !1, this.emitUpdate());
    });
    i(this, "scrollHandler", () => {
      var e;
      this.commentMark !== void 0 && (e = this.state) != null && e.show && (this.state.referencePos = n(
        this.pmView,
        this.commentMarkRange.from,
        this.commentMarkRange.to
      ), this.emitUpdate());
    });
    this.editor = e, this.pmView = t, this.emitUpdate = () => {
      if (!this.state)
        throw new Error("Attempting to update uninitialized comment toolbar");
      m(this.state);
    }, this.startMenuUpdateTimer = () => {
      this.menuUpdateTimer = setTimeout(() => {
        this.update();
      }, 250);
    }, this.stopMenuUpdateTimer = () => (this.menuUpdateTimer && (clearTimeout(this.menuUpdateTimer), this.menuUpdateTimer = void 0), !1), this.pmView.dom.addEventListener("mouseover", this.mouseOverHandler), document.addEventListener("click", this.clickHandler, !0), document.addEventListener("scroll", this.scrollHandler);
  }
  editComment(e, t) {
    var o;
    const m = this.pmView.state.tr.insertText(
      t,
      this.commentMarkRange.from,
      this.commentMarkRange.to
    );
    m.addMark(
      this.commentMarkRange.from,
      this.commentMarkRange.from + t.length,
      this.pmView.state.schema.mark("comment", { comment: e })
    ), this.pmView.dispatch(m), this.pmView.focus(), (o = this.state) != null && o.show && (this.state.show = !1, this.emitUpdate());
  }
  deleteComment() {
    var e;
    this.pmView.dispatch(
      this.pmView.state.tr.removeMark(
        this.commentMarkRange.from,
        this.commentMarkRange.to,
        this.commentMark.type
      ).setMeta("preventAutolink", !0)
    ), this.pmView.focus(), (e = this.state) != null && e.show && (this.state.show = !1, this.emitUpdate());
  }
  update() {
    var t;
    if (!this.pmView.hasFocus())
      return;
    const e = this.commentMark;
    if (this.commentMark = void 0, this.commentMarkRange = void 0, this.keyboardHoveredCommentMark = void 0, this.keyboardHoveredCommentMarkRange = void 0, this.pmView.state.selection.empty) {
      const m = this.pmView.state.selection.$from.marks();
      for (const o of m)
        if (o.type.name === this.pmView.state.schema.mark("link").type.name) {
          this.keyboardHoveredCommentMark = o, this.keyboardHoveredCommentMarkRange = a(
            this.pmView.state.selection.$from,
            o.type,
            o.attrs
          ) || void 0;
          break;
        }
    }
    if (this.mouseHoveredCommentMark && (this.commentMark = this.mouseHoveredCommentMark, this.commentMarkRange = this.mouseHoveredCommentMarkRange), this.keyboardHoveredCommentMark && (this.commentMark = this.keyboardHoveredCommentMark, this.commentMarkRange = this.keyboardHoveredCommentMarkRange), this.commentMark && this.editor.isEditable) {
      this.state = {
        show: !0,
        referencePos: n(
          this.pmView,
          this.commentMarkRange.from,
          this.commentMarkRange.to
        ),
        comment: this.commentMark.attrs.comment,
        text: this.pmView.state.doc.textBetween(
          this.commentMarkRange.from,
          this.commentMarkRange.to
        )
      }, this.emitUpdate();
      return;
    }
    if ((t = this.state) != null && t.show && e && (!this.commentMark || !this.editor.isEditable)) {
      this.state.show = !1, this.emitUpdate();
      return;
    }
  }
  destroy() {
    this.pmView.dom.removeEventListener("mouseover", this.mouseOverHandler), document.removeEventListener("scroll", this.scrollHandler), document.removeEventListener("click", this.clickHandler, !0);
  }
}
const v = new k("CommentToolbarPlugin");
class w extends u {
  constructor(t) {
    super();
    i(this, "view");
    i(this, "plugin");
    /**
     * Edit the currently hovered link.
     */
    i(this, "editComment", (t, m) => {
      this.view.editComment(t, m);
    });
    /**
     * Delete the currently hovered link.
     */
    i(this, "deleteComment", () => {
      this.view.deleteComment();
    });
    /**
     * When hovering on/off links using the mouse cursor, the link toolbar will
     * open & close with a delay.
     *
     * This function starts the delay timer, and should be used for when the mouse
     * cursor enters the link toolbar.
     */
    i(this, "startHideTimer", () => {
      this.view.startMenuUpdateTimer();
    });
    /**
     * When hovering on/off links using the mouse cursor, the link toolbar will
     * open & close with a delay.
     *
     * This function stops the delay timer, and should be used for when the mouse
     * cursor exits the link toolbar.
     */
    i(this, "stopHideTimer", () => {
      this.view.stopMenuUpdateTimer();
    });
    this.plugin = new l({
      key: v,
      view: (m) => (this.view = new M(t, m, (o) => {
        this.emit("update", o);
      }), this.view)
    });
  }
  onUpdate(t) {
    return this.on("update", t);
  }
}
const T = p.create({
  name: "CommentToolbarPlugin",
  addProseMirrorPlugins() {
    return [new w(this.editor).plugin];
  }
});
export {
  w as CommentToolbarProsemirrorPlugin,
  v as commentToolbarPluginKey,
  T as default
};

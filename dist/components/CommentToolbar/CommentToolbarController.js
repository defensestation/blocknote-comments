import { j as E } from "../../jsx-runtime-BwWtxLpl.js";
import { offset as j, flip as I } from "@floating-ui/react";
import { useState as h, useRef as R, useEffect as _ } from "react";
import { useBlockNoteEditor as D } from "@blocknote/react";
import { useUIElementPositioning as $ } from "../../hooks/useUIElementPositioning.js";
import { CommentToolbar as B } from "./mantine/CommentToolbar.js";
import { getMarkRange as H, posToDOMRect as N } from "@tiptap/core";
const i = {
  show: !1,
  referencePos: void 0,
  comment: "",
  text: ""
}, Y = (P) => {
  const n = D(), [e, m] = h(i), [T, u] = h(!1), f = () => {
    setTimeout(() => u(!1), 1e3);
  }, b = () => {
    const r = n._tiptapEditor;
    if (e.referencePos) {
      const t = r.state.doc.resolve(
        e.referencePos.from + 1
      ), s = t == null ? void 0 : t.marks();
      for (const c of s)
        if (c.type.name === r.state.schema.mark("comment").type.name) {
          r.view.dispatch(
            r.view.state.tr.removeMark(
              e.referencePos.from,
              e.referencePos.to,
              c.type
            ).setMeta("preventAutolink", !0)
          ), r.view.focus(), m(i), f();
          break;
        }
    }
  }, w = (r) => {
    const t = n._tiptapEditor;
    if (e.referencePos) {
      const s = t.state.doc.resolve(e.referencePos.from + 1), c = s == null ? void 0 : s.marks();
      for (const k of c)
        if (k.type.name === t.state.schema.mark("comment").type.name) {
          const a = t.state.doc.textBetween(
            e.referencePos.from,
            e.referencePos.to
          ), p = t.view.state.tr.insertText(
            a,
            e.referencePos.from,
            e.referencePos.to
          );
          p.addMark(
            e.referencePos.from,
            e.referencePos.from + a.length,
            t.view.state.schema.mark("comment", {
              stringValue: r
            })
          ), t.view.dispatch(p), t.view.focus(), m(i), f();
          break;
        }
    }
  }, l = R(), v = (r) => {
    try {
      const { _tiptapEditor: t } = r, s = t.view;
      if (!!s.state.selection.$from.marks().filter((a) => a.type.name == "comment").length) {
        const p = t.getAttributes("comment").stringValue, U = t.state.selection.$from.marks();
        for (const d of U)
          if (d.type.name === t.state.schema.mark("comment").type.name) {
            const o = H(
              t.state.selection.$from,
              d.type,
              d.attrs
            ) || void 0;
            if (o != null && o.from && o.to) {
              const S = N(s, o.from, o == null ? void 0 : o.to);
              m({
                referencePos: { ...S, from: o.from, to: o.to },
                show: !0,
                comment: p,
                text: ""
              });
            } else
              m(i), f();
            break;
          }
      } else
        m(i), f();
    } catch (t) {
      throw console.log(t), t;
    }
  };
  _(() => {
    n && n.onSelectionChange(v);
  }, [n]);
  const g = {
    deleteComment: b,
    editComment: w,
    startHideTimer: () => {
      l.current = setTimeout(() => {
        m({
          ...e,
          show: !1
        });
      }, 250);
    },
    stopHideTimer: () => (l.current && (clearTimeout(l.current), l.current = void 0), !1),
    enableEditing: () => {
      u(!0);
    }
  }, { isMounted: M, ref: y, style: x } = $(
    (e == null ? void 0 : e.show) || !1,
    (e == null ? void 0 : e.referencePos) || null,
    4e3,
    {
      placement: "bottom",
      middleware: [j(10), I()]
    }
  );
  if (!M || !e)
    return null;
  const { show: q, referencePos: z, ...C } = e, A = P.commentToolbar || B;
  return /* @__PURE__ */ E.jsx("div", { ref: y, style: x, children: /* @__PURE__ */ E.jsx(A, { isEditable: T, isEditingDisabled: !n.isEditable, ...C, ...g }) });
};
export {
  Y as CommentToolbarController
};

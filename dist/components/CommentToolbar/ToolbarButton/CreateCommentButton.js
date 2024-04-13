import { j as n } from "../../../jsx-runtime-BwWtxLpl.js";
import { useState as m, useCallback as r, useMemo as x } from "react";
import { b as g } from "../../../index.esm-CDklruMj.js";
import { formatKeyboardShortcut as h } from "@blocknote/core";
import { useBlockNoteEditor as y, useEditorContentOrSelectionChange as i, useSelectedBlocks as b, ToolbarButton as T } from "@blocknote/react";
import { ToolbarInputsMenu as k } from "../../../mantine-shared/Toolbar/ToolbarInputsMenu.js";
import { EditCommentMenuItems as v } from "../mantine/EditCommentMenuItem.js";
function E(t) {
  return "comment" in t.schema.styleSpecs && t.schema.styleSpecs.comment.config.type === "comment";
}
const N = () => {
  const t = y(), e = E(t), [l, u] = m(
    "comment" in t.getActiveStyles()
  );
  i(() => {
    e && u("comment" in t.getActiveStyles());
  }, t);
  const c = b(t), s = () => t._tiptapEditor.getAttributes("comment").stringValue, [a, d] = m(s() || ""), [f, p] = m(t.getSelectedText());
  i(() => {
    p(t.getSelectedText() || ""), d(s() || "");
  }, t);
  const S = r(
    (o) => {
      t.addStyles({ comment: o }), t.focus(), t.domElement.focus();
    },
    [t]
  ), C = r(() => {
    t.removeStyles({ comment: "" });
  }, [t]);
  return x(() => {
    if (!e)
      return !1;
    for (const o of c)
      if (o.content === void 0)
        return !1;
    return !0;
  }, [e, c]) ? /* @__PURE__ */ n.jsx(
    k,
    {
      button: /* @__PURE__ */ n.jsx(
        T,
        {
          isSelected: l,
          mainTooltip: "Create Comment",
          secondaryTooltip: h("Mod+K"),
          icon: g
        }
      ),
      dropdownItems: /* @__PURE__ */ n.jsx(
        v,
        {
          comment: a,
          text: f,
          editComment: S,
          deleteComment: C
        }
      )
    }
  ) : null;
};
export {
  N as CreateCommentButton
};

import { j as e } from "../../../jsx-runtime-BwWtxLpl.js";
import { useState as d, useEffect as g, useCallback as a } from "react";
import { Toolbar as c } from "../../../mantine-shared/Toolbar/Toolbar.js";
import { DeleteCommentButton as T } from "./DefaultButtons/DeleteCommentButton.js";
import { Flex as m, Textarea as b, Text as E, Divider as y } from "@mantine/core";
import { M as p } from "../../../index.esm-CDklruMj.js";
import { ToolbarButton as x } from "@blocknote/react";
import { R as v } from "../../../index.esm-CvCaZD5r.js";
const A = (t) => {
  const { comment: n, text: o, editComment: r, enableEditing: u } = t, [i, l] = d(n), [s, h] = d(o);
  g(() => {
    l(n), h(o);
  }, [o, n]);
  const C = a(
    (j) => l(j.currentTarget.value),
    []
  ), f = a(
    () => r(i, s),
    [r, i, s]
  );
  return t.children ? /* @__PURE__ */ e.jsx(c, { children: t.children }) : /* @__PURE__ */ e.jsx(
    c,
    {
      onMouseEnter: t.stopHideTimer,
      onMouseLeave: t.startHideTimer,
      children: /* @__PURE__ */ e.jsxs(m, { direction: "column", children: [
        t.isEditable && !t.isEditingDisabled ? /* @__PURE__ */ e.jsx(
          b,
          {
            autoFocus: !0,
            placeholder: "Edit Comment",
            styles: {
              input: { color: "gray", minWidth: "300px", minHeight: "150px" }
            },
            value: i,
            minRows: 15,
            onChange: C
          }
        ) : /* @__PURE__ */ e.jsx(m, { style: { padding: "5px" }, children: /* @__PURE__ */ e.jsx(
          E,
          {
            size: "sm",
            style: {
              color: "gray",
              maxWidth: "300px",
              maxHeight: "150px",
              overflow: "auto"
            },
            children: i
          }
        ) }),
        !t.isEditingDisabled && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsx(y, {}),
          /* @__PURE__ */ e.jsxs(m, { w: "100%", justify: "flex-end", children: [
            t.isEditable ? /* @__PURE__ */ e.jsx(
              x,
              {
                mainTooltip: "Add/Update Comment",
                isSelected: !1,
                onClick: f,
                icon: v
              }
            ) : /* @__PURE__ */ e.jsx(
              x,
              {
                mainTooltip: "Add/Update Comment",
                isSelected: !1,
                onClick: u,
                icon: p
              }
            ),
            /* @__PURE__ */ e.jsx(T, { deleteComment: t.deleteComment })
          ] })
        ] })
      ] })
    }
  );
};
export {
  A as CommentToolbar
};

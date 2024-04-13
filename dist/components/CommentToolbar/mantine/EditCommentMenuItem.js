import { j as e } from "../../../jsx-runtime-BwWtxLpl.js";
import { useState as a, useEffect as h, useCallback as s } from "react";
import { a as j, R, b as T } from "../../../index.esm-CvCaZD5r.js";
import { ToolbarInputsMenuItem as b } from "../../../mantine-shared/Toolbar/ToolbarInputsMenuItem.js";
import { ToolbarButton as c } from "@blocknote/react";
const F = (u) => {
  const { comment: o, text: n, editComment: i, deleteComment: r } = u, [t, l] = a(o), [m, C] = a(n);
  h(() => {
    l(o), C(n);
  }, [n, o]);
  const d = s(
    (f) => l(f.currentTarget.value),
    []
  ), p = s(
    () => i(t, m),
    [i, t, m]
  ), x = s(
    () => r(),
    [r, t, m]
  );
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(
      b,
      {
        type: "textarea",
        icon: j,
        autoFocus: !0,
        placeholder: "Edit Comment",
        value: t,
        w: "100%",
        h: "100%",
        minRows: 5,
        onChange: d
      }
    ),
    /* @__PURE__ */ e.jsxs(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          gap: "2px",
          justifyContent: "flex-end"
        },
        children: [
          /* @__PURE__ */ e.jsx(
            c,
            {
              mainTooltip: "Add/Update Comment",
              isSelected: !1,
              onClick: p,
              icon: R
            }
          ),
          /* @__PURE__ */ e.jsx(
            c,
            {
              mainTooltip: "Remove Comment",
              isSelected: !1,
              onClick: x,
              icon: T
            }
          )
        ]
      }
    )
  ] });
};
export {
  F as EditCommentMenuItems
};

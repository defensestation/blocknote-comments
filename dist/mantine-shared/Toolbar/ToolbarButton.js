import { j as i } from "../../jsx-runtime-BwWtxLpl.js";
import { Tooltip as a, Button as c, ActionIcon as s } from "@mantine/core";
import { forwardRef as d } from "react";
import { isSafari as n } from "@blocknote/core";
import { TooltipContent as r } from "../Tooltip/TooltipContent.js";
const j = d(
  (e, l) => {
    const o = e.icon;
    return /* @__PURE__ */ i.jsx(
      a,
      {
        withinPortal: !1,
        label: /* @__PURE__ */ i.jsx(
          r,
          {
            mainTooltip: e.mainTooltip,
            secondaryTooltip: e.secondaryTooltip
          }
        ),
        children: e.children ? /* @__PURE__ */ i.jsxs(
          c,
          {
            onMouseDown: (t) => {
              n() && t.currentTarget.focus();
            },
            onClick: e.onClick,
            "data-selected": e.isSelected ? "true" : void 0,
            "data-test": e.mainTooltip.slice(0, 1).toLowerCase() + e.mainTooltip.replace(/\s+/g, "").slice(1),
            size: "xs",
            disabled: e.isDisabled || !1,
            ref: l,
            children: [
              o && /* @__PURE__ */ i.jsx(o, {}),
              e.children
            ]
          }
        ) : /* @__PURE__ */ i.jsx(
          s,
          {
            onMouseDown: (t) => {
              n() && t.currentTarget.focus();
            },
            onClick: e.onClick,
            "data-selected": e.isSelected ? "true" : void 0,
            "data-test": e.mainTooltip.slice(0, 1).toLowerCase() + e.mainTooltip.replace(/\s+/g, "").slice(1),
            size: 30,
            disabled: e.isDisabled || !1,
            ref: l,
            children: o && /* @__PURE__ */ i.jsx(o, {})
          }
        )
      }
    );
  }
);
export {
  j as ToolbarButton
};

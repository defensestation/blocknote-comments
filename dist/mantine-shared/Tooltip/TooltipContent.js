import { j as t } from "../../jsx-runtime-BwWtxLpl.js";
import { Stack as s, Text as i } from "@mantine/core";
const l = (o) => /* @__PURE__ */ t.jsxs(s, { gap: 0, className: "bn-tooltip", children: [
  /* @__PURE__ */ t.jsx(i, { size: "sm", children: o.mainTooltip }),
  o.secondaryTooltip && /* @__PURE__ */ t.jsx(i, { size: "xs", children: o.secondaryTooltip })
] });
export {
  l as TooltipContent
};

import { j as e } from "../../jsx-runtime-BwWtxLpl.js";
import { mergeCSSClasses as a } from "@blocknote/core";
import { Group as p } from "@mantine/core";
import { forwardRef as f } from "react";
const x = f((r, o) => {
  const { className: s, children: m, ...t } = r;
  return /* @__PURE__ */ e.jsx(
    p,
    {
      className: a("bn-toolbar", s || ""),
      ref: o,
      ...t,
      children: m
    }
  );
});
export {
  x as Toolbar
};

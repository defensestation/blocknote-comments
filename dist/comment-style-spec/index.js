import { j as o } from "../jsx-runtime-BwWtxLpl.js";
import { createReactStyleSpec as r } from "@blocknote/react";
import { useMemo as n } from "react";
const s = r(
  {
    type: "comment",
    propSchema: "string"
  },
  {
    render: (e) => {
      const t = n(() => (/* @__PURE__ */ new Date()).valueOf().toString(), [e]);
      return /* @__PURE__ */ o.jsx(
        "span",
        {
          id: t,
          className: "testing",
          ref: e.contentRef,
          style: e.value ? { background: "#fcbc03", color: "#000" } : {}
        }
      );
    }
  }
);
export {
  s as comment
};

import { j as n } from "../../jsx-runtime-BwWtxLpl.js";
import { TextInput as r, FileInput as i, Textarea as x, Group as c } from "@mantine/core";
const p = {
  text: r,
  file: i,
  textarea: x
}, j = (t) => {
  const { type: u, icon: m, ...e } = t, o = p[t.type], s = t.icon;
  return /* @__PURE__ */ n.jsx(c, { children: /* @__PURE__ */ n.jsx(o, { size: "xs", icon: /* @__PURE__ */ n.jsx(s, {}), ...e }) });
};
export {
  j as ToolbarInputsMenuItem,
  p as inputComponents
};

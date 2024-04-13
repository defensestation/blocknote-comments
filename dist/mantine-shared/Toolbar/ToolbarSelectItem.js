import { j as e } from "../../jsx-runtime-BwWtxLpl.js";
import { Menu as c } from "@mantine/core";
import { G as n } from "../../iconBase-Crhuz1M6.js";
function o(t) {
  return n({ tag: "svg", attr: { version: "1.2", baseProfile: "tiny", viewBox: "0 0 24 24" }, child: [{ tag: "path", attr: { d: "M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z" } }] })(t);
}
function r(t) {
  const i = t.icon;
  return /* @__PURE__ */ e.jsx(
    c.Item,
    {
      onClick: t.onClick,
      leftSection: i && /* @__PURE__ */ e.jsx(i, { size: 16 }),
      rightSection: t.isSelected ? /* @__PURE__ */ e.jsx(o, { size: 20, className: "bn-tick-icon" }) : (
        // Ensures space for tick even if item isn't currently selected.
        /* @__PURE__ */ e.jsx("div", { className: "bn-tick-space" })
      ),
      disabled: t.isDisabled,
      children: t.text
    },
    t.text
  );
}
export {
  r as ToolbarSelectItem
};

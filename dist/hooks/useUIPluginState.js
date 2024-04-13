import { useState as s, useEffect as n } from "react";
function o(t) {
  const [e, r] = s();
  return n(() => t((u) => {
    r({ ...u });
  }), [t]), e;
}
export {
  o as useUIPluginState
};

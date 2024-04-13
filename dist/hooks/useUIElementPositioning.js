import { useFloating as r, useTransitionStyles as m } from "@floating-ui/react";
import { useEffect as u, useMemo as p } from "react";
function d(f, t, n, a) {
  const { refs: e, update: i, context: g, floatingStyles: o } = r({
    open: f,
    ...a
  }), { isMounted: s, styles: l } = m(g);
  return u(() => {
    i();
  }, [t, i]), u(() => {
    t !== null && e.setReference({
      getBoundingClientRect: () => t
    });
  }, [t, e]), p(
    () => ({
      isMounted: s,
      ref: e.setFloating,
      style: {
        display: "flex",
        ...l,
        ...o,
        zIndex: n
      }
    }),
    [o, s, e.setFloating, l, n]
  );
}
export {
  d as useUIElementPositioning
};

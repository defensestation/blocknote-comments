import Oe from "react";
var H = { exports: {} }, j = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ye;
function ir() {
  if (ye)
    return j;
  ye = 1;
  var N = Oe, P = Symbol.for("react.element"), V = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, D = N.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, F = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(h, l, y) {
    var d, g = {}, R = null, A = null;
    y !== void 0 && (R = "" + y), l.key !== void 0 && (R = "" + l.key), l.ref !== void 0 && (A = l.ref);
    for (d in l)
      m.call(l, d) && !F.hasOwnProperty(d) && (g[d] = l[d]);
    if (h && h.defaultProps)
      for (d in l = h.defaultProps, l)
        g[d] === void 0 && (g[d] = l[d]);
    return { $$typeof: P, type: h, key: R, ref: A, props: g, _owner: D.current };
  }
  return j.Fragment = V, j.jsx = S, j.jsxs = S, j;
}
var k = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Te;
function ur() {
  return Te || (Te = 1, process.env.NODE_ENV !== "production" && function() {
    var N = Oe, P = Symbol.for("react.element"), V = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), F = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), h = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), X = Symbol.iterator, Ce = "@@iterator";
    function Pe(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = X && e[X] || e[Ce];
      return typeof r == "function" ? r : null;
    }
    var T = N.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function c(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Se("error", e, t);
      }
    }
    function Se(e, r, t) {
      {
        var n = T.ReactDebugCurrentFrame, i = n.getStackAddendum();
        i !== "" && (r += "%s", t = t.concat([i]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var we = !1, xe = !1, je = !1, ke = !1, De = !1, Z;
    Z = Symbol.for("react.module.reference");
    function Fe(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === F || De || e === D || e === y || e === d || ke || e === A || we || xe || je || typeof e == "object" && e !== null && (e.$$typeof === R || e.$$typeof === g || e.$$typeof === S || e.$$typeof === h || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Z || e.getModuleId !== void 0));
    }
    function Ae(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var i = r.displayName || r.name || "";
      return i !== "" ? t + "(" + i + ")" : t;
    }
    function Q(e) {
      return e.displayName || "Context";
    }
    function E(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case V:
          return "Portal";
        case F:
          return "Profiler";
        case D:
          return "StrictMode";
        case y:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case h:
            var r = e;
            return Q(r) + ".Consumer";
          case S:
            var t = e;
            return Q(t._context) + ".Provider";
          case l:
            return Ae(e, e.render, "ForwardRef");
          case g:
            var n = e.displayName || null;
            return n !== null ? n : E(e.type) || "Memo";
          case R: {
            var i = e, u = i._payload, o = i._init;
            try {
              return E(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var _ = Object.assign, w = 0, ee, re, te, ne, ae, oe, ie;
    function ue() {
    }
    ue.__reactDisabledLog = !0;
    function Ie() {
      {
        if (w === 0) {
          ee = console.log, re = console.info, te = console.warn, ne = console.error, ae = console.group, oe = console.groupCollapsed, ie = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ue,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        w++;
      }
    }
    function We() {
      {
        if (w--, w === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: _({}, e, {
              value: ee
            }),
            info: _({}, e, {
              value: re
            }),
            warn: _({}, e, {
              value: te
            }),
            error: _({}, e, {
              value: ne
            }),
            group: _({}, e, {
              value: ae
            }),
            groupCollapsed: _({}, e, {
              value: oe
            }),
            groupEnd: _({}, e, {
              value: ie
            })
          });
        }
        w < 0 && c("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var M = T.ReactCurrentDispatcher, U;
    function I(e, r, t) {
      {
        if (U === void 0)
          try {
            throw Error();
          } catch (i) {
            var n = i.stack.trim().match(/\n( *(at )?)/);
            U = n && n[1] || "";
          }
        return `
` + U + e;
      }
    }
    var B = !1, W;
    {
      var $e = typeof WeakMap == "function" ? WeakMap : Map;
      W = new $e();
    }
    function se(e, r) {
      if (!e || B)
        return "";
      {
        var t = W.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      B = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = M.current, M.current = null, Ie();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (b) {
              n = b;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (b) {
              n = b;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (b) {
            n = b;
          }
          e();
        }
      } catch (b) {
        if (b && n && typeof b.stack == "string") {
          for (var a = b.stack.split(`
`), v = n.stack.split(`
`), s = a.length - 1, f = v.length - 1; s >= 1 && f >= 0 && a[s] !== v[f]; )
            f--;
          for (; s >= 1 && f >= 0; s--, f--)
            if (a[s] !== v[f]) {
              if (s !== 1 || f !== 1)
                do
                  if (s--, f--, f < 0 || a[s] !== v[f]) {
                    var p = `
` + a[s].replace(" at new ", " at ");
                    return e.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", e.displayName)), typeof e == "function" && W.set(e, p), p;
                  }
                while (s >= 1 && f >= 0);
              break;
            }
        }
      } finally {
        B = !1, M.current = u, We(), Error.prepareStackTrace = i;
      }
      var C = e ? e.displayName || e.name : "", me = C ? I(C) : "";
      return typeof e == "function" && W.set(e, me), me;
    }
    function Ye(e, r, t) {
      return se(e, !1);
    }
    function Le(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function $(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return se(e, Le(e));
      if (typeof e == "string")
        return I(e);
      switch (e) {
        case y:
          return I("Suspense");
        case d:
          return I("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return Ye(e.render);
          case g:
            return $(e.type, r, t);
          case R: {
            var n = e, i = n._payload, u = n._init;
            try {
              return $(u(i), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var Y = Object.prototype.hasOwnProperty, fe = {}, le = T.ReactDebugCurrentFrame;
    function L(e) {
      if (e) {
        var r = e._owner, t = $(e.type, e._source, r ? r.type : null);
        le.setExtraStackFrame(t);
      } else
        le.setExtraStackFrame(null);
    }
    function Ne(e, r, t, n, i) {
      {
        var u = Function.call.bind(Y);
        for (var o in e)
          if (u(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var v = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (s) {
              a = s;
            }
            a && !(a instanceof Error) && (L(i), c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), L(null)), a instanceof Error && !(a.message in fe) && (fe[a.message] = !0, L(i), c("Failed %s type: %s", t, a.message), L(null));
          }
      }
    }
    var Ve = Array.isArray;
    function q(e) {
      return Ve(e);
    }
    function Me(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ue(e) {
      try {
        return ce(e), !1;
      } catch {
        return !0;
      }
    }
    function ce(e) {
      return "" + e;
    }
    function ve(e) {
      if (Ue(e))
        return c("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Me(e)), ce(e);
    }
    var x = T.ReactCurrentOwner, Be = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, de, pe, J;
    J = {};
    function qe(e) {
      if (Y.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Je(e) {
      if (Y.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ge(e, r) {
      if (typeof e.ref == "string" && x.current && r && x.current.stateNode !== r) {
        var t = E(x.current.type);
        J[t] || (c('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', E(x.current.type), e.ref), J[t] = !0);
      }
    }
    function ze(e, r) {
      {
        var t = function() {
          de || (de = !0, c("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Ke(e, r) {
      {
        var t = function() {
          pe || (pe = !0, c("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var He = function(e, r, t, n, i, u, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: P,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function Xe(e, r, t, n, i) {
      {
        var u, o = {}, a = null, v = null;
        t !== void 0 && (ve(t), a = "" + t), Je(r) && (ve(r.key), a = "" + r.key), qe(r) && (v = r.ref, Ge(r, i));
        for (u in r)
          Y.call(r, u) && !Be.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var s = e.defaultProps;
          for (u in s)
            o[u] === void 0 && (o[u] = s[u]);
        }
        if (a || v) {
          var f = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && ze(o, f), v && Ke(o, f);
        }
        return He(e, a, v, i, n, x.current, o);
      }
    }
    var G = T.ReactCurrentOwner, ge = T.ReactDebugCurrentFrame;
    function O(e) {
      if (e) {
        var r = e._owner, t = $(e.type, e._source, r ? r.type : null);
        ge.setExtraStackFrame(t);
      } else
        ge.setExtraStackFrame(null);
    }
    var z;
    z = !1;
    function K(e) {
      return typeof e == "object" && e !== null && e.$$typeof === P;
    }
    function Ee() {
      {
        if (G.current) {
          var e = E(G.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function Ze(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var be = {};
    function Qe(e) {
      {
        var r = Ee();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function he(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = Qe(r);
        if (be[t])
          return;
        be[t] = !0;
        var n = "";
        e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + E(e._owner.type) + "."), O(e), c('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), O(null);
      }
    }
    function Re(e, r) {
      {
        if (typeof e != "object")
          return;
        if (q(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            K(n) && he(n, r);
          }
        else if (K(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var i = Pe(e);
          if (typeof i == "function" && i !== e.entries)
            for (var u = i.call(e), o; !(o = u.next()).done; )
              K(o.value) && he(o.value, r);
        }
      }
    }
    function er(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === g))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = E(r);
          Ne(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !z) {
          z = !0;
          var i = E(r);
          c("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && c("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function rr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            O(e), c("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), O(null);
            break;
          }
        }
        e.ref !== null && (O(e), c("Invalid attribute `ref` supplied to `React.Fragment`."), O(null));
      }
    }
    function _e(e, r, t, n, i, u) {
      {
        var o = Fe(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var v = Ze(i);
          v ? a += v : a += Ee();
          var s;
          e === null ? s = "null" : q(e) ? s = "array" : e !== void 0 && e.$$typeof === P ? (s = "<" + (E(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, c("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", s, a);
        }
        var f = Xe(e, r, t, i, u);
        if (f == null)
          return f;
        if (o) {
          var p = r.children;
          if (p !== void 0)
            if (n)
              if (q(p)) {
                for (var C = 0; C < p.length; C++)
                  Re(p[C], e);
                Object.freeze && Object.freeze(p);
              } else
                c("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Re(p, e);
        }
        return e === m ? rr(f) : er(f), f;
      }
    }
    function tr(e, r, t) {
      return _e(e, r, t, !0);
    }
    function nr(e, r, t) {
      return _e(e, r, t, !1);
    }
    var ar = nr, or = tr;
    k.Fragment = m, k.jsx = ar, k.jsxs = or;
  }()), k;
}
process.env.NODE_ENV === "production" ? H.exports = ir() : H.exports = ur();
var fr = H.exports;
export {
  fr as j
};

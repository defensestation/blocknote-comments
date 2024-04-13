import i from "react";
var f = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, s = i.createContext && i.createContext(f), l = function() {
  return l = Object.assign || function(e) {
    for (var n, t = 1, r = arguments.length; t < r; t++) {
      n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, l.apply(this, arguments);
}, y = function(e, n) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, r = Object.getOwnPropertySymbols(e); a < r.length; a++)
      n.indexOf(r[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[a]) && (t[r[a]] = e[r[a]]);
  return t;
};
function m(e) {
  return e && e.map(function(n, t) {
    return i.createElement(n.tag, l({
      key: t
    }, n.attr), m(n.child));
  });
}
function h(e) {
  return function(n) {
    return i.createElement(g, l({
      attr: l({}, e.attr)
    }, n), m(e.child));
  };
}
function g(e) {
  var n = function(t) {
    var r = e.attr, a = e.size, u = e.title, d = y(e, ["attr", "size", "title"]), o = a || t.size || "1em", c;
    return t.className && (c = t.className), e.className && (c = (c ? c + " " : "") + e.className), i.createElement("svg", l({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, t.attr, r, d, {
      className: c,
      style: l(l({
        color: e.color || t.color
      }, t.style), e.style),
      height: o,
      width: o,
      xmlns: "http://www.w3.org/2000/svg"
    }), u && i.createElement("title", null, u), e.children);
  };
  return s !== void 0 ? i.createElement(s.Consumer, null, function(t) {
    return n(t);
  }) : n(f);
}
export {
  h as G
};

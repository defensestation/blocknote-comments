var h = Object.defineProperty;
var b = (c, l, s) => l in c ? h(c, l, { enumerable: !0, configurable: !0, writable: !0, value: s }) : c[l] = s;
var t = (c, l, s) => (b(c, typeof l != "symbol" ? l + "" : l, s), s);
class f {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    t(this, "callbacks", {});
  }
  on(l, s) {
    return this.callbacks[l] || (this.callbacks[l] = []), this.callbacks[l].push(s), () => this.off(l, s);
  }
  emit(l, ...s) {
    const a = this.callbacks[l];
    a && a.forEach((i) => i.apply(this, s));
  }
  off(l, s) {
    const a = this.callbacks[l];
    a && (s ? this.callbacks[l] = a.filter((i) => i !== s) : delete this.callbacks[l]);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
export {
  f as EventEmitter
};

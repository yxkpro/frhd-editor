(() => {
    var t = {
        886: function () {
          (this.o = this.o || {}),
            (createjs.extend = function (t, e) {
              "use strict";
              function s() {
                this.constructor = t;
              }
              return (s.prototype = e.prototype), (t.prototype = new s());
            }),
            (this.o = this.o || {}),
            (createjs.promote = function (t, e) {
              "use strict";
              var s = t.prototype,
                i =
                  (Object.getPrototypeOf && Object.getPrototypeOf(s)) ||
                  s.__proto__;
              if (i)
                for (var n in ((s[(e += "_") + "constructor"] = i.constructor),
                i))
                  s.hasOwnProperty(n) &&
                    "function" == typeof i[n] &&
                    (s[e + n] = i[n]);
              return t;
            }),
            (this.o = this.o || {}),
            (createjs.indexOf = function (t, e) {
              "use strict";
              for (var s = 0, i = t.length; i > s; s++) if (e === t[s]) return s;
              return -1;
            }),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s) {
                (this.type = t),
                  (this.target = null),
                  (this.currentTarget = null),
                  (this.eventPhase = 0),
                  (this.bubbles = !!e),
                  (this.cancelable = !!s),
                  (this.timeStamp = new Date().getTime()),
                  (this.defaultPrevented = !1),
                  (this.propagationStopped = !1),
                  (this.immediatePropagationStopped = !1),
                  (this.removed = !1);
              }
              var e = t.prototype;
              (e.preventDefault = function () {
                this.defaultPrevented = this.cancelable && !0;
              }),
                (e.stopPropagation = function () {
                  this.propagationStopped = !0;
                }),
                (e.stopImmediatePropagation = function () {
                  this.immediatePropagationStopped = this.propagationStopped = !0;
                }),
                (e.remove = function () {
                  this.removed = !0;
                }),
                (e.clone = function () {
                  return new t(this.type, this.bubbles, this.cancelable);
                }),
                (e.set = function (t) {
                  for (var e in t) this[e] = t[e];
                  return this;
                }),
                (e.toString = function () {
                  return "[Event (type=" + this.type + ")]";
                }),
                (createjs.Event = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                (this._listeners = null), (this._captureListeners = null);
              }
              var e = t.prototype;
              (t.initialize = function (t) {
                (t.addEventListener = e.addEventListener),
                  (t.on = e.on),
                  (t.removeEventListener = t.off = e.removeEventListener),
                  (t.removeAllEventListeners = e.removeAllEventListeners),
                  (t.hasEventListener = e.hasEventListener),
                  (t.dispatchEvent = e.dispatchEvent),
                  (t._dispatchEvent = e._dispatchEvent),
                  (t.willTrigger = e.willTrigger);
              }),
                (e.addEventListener = function (t, e, s) {
                  var i,
                    n = (i = s
                      ? (this._captureListeners = this._captureListeners || {})
                      : (this._listeners = this._listeners || {}))[t];
                  return (
                    n && this.removeEventListener(t, e, s),
                    (n = i[t]) ? n.push(e) : (i[t] = [e]),
                    e
                  );
                }),
                (e.on = function (t, e, s, i, n, r) {
                  return (
                    e.handleEvent && ((s = s || e), (e = e.handleEvent)),
                    (s = s || this),
                    this.addEventListener(
                      t,
                      function (t) {
                        e.call(s, t, n), i && t.remove();
                      },
                      r
                    )
                  );
                }),
                (e.removeEventListener = function (t, e, s) {
                  var i = s ? this._captureListeners : this._listeners;
                  if (i) {
                    var n = i[t];
                    if (n)
                      for (var r = 0, o = n.length; o > r; r++)
                        if (n[r] == e) {
                          1 == o ? delete i[t] : n.splice(r, 1);
                          break;
                        }
                  }
                }),
                (e.off = e.removeEventListener),
                (e.removeAllEventListeners = function (t) {
                  t
                    ? (this._listeners && delete this._listeners[t],
                      this._captureListeners && delete this._captureListeners[t])
                    : (this._listeners = this._captureListeners = null);
                }),
                (e.dispatchEvent = function (t) {
                  if ("string" == typeof t) {
                    var e = this._listeners;
                    if (!e || !e[t]) return !1;
                    t = new createjs.Event(t);
                  } else t.target && t.clone && (t = t.clone());
                  try {
                    t.target = this;
                  } catch (t) {}
                  if (t.bubbles && this.parent) {
                    for (var s = this, i = [s]; s.parent; )
                      i.push((s = s.parent));
                    var n,
                      r = i.length;
                    for (n = r - 1; n >= 0 && !t.propagationStopped; n--)
                      i[n]._dispatchEvent(t, 1 + (0 == n));
                    for (n = 1; r > n && !t.propagationStopped; n++)
                      i[n]._dispatchEvent(t, 3);
                  } else this._dispatchEvent(t, 2);
                  return t.defaultPrevented;
                }),
                (e.hasEventListener = function (t) {
                  var e = this._listeners,
                    s = this._captureListeners;
                  return !!((e && e[t]) || (s && s[t]));
                }),
                (e.willTrigger = function (t) {
                  for (var e = this; e; ) {
                    if (e.hasEventListener(t)) return !0;
                    e = e.parent;
                  }
                  return !1;
                }),
                (e.toString = function () {
                  return "[EventDispatcher]";
                }),
                (e._dispatchEvent = function (t, e) {
                  var s,
                    i = 1 == e ? this._captureListeners : this._listeners;
                  if (t && i) {
                    var n = i[t.type];
                    if (!n || !(s = n.length)) return;
                    try {
                      t.currentTarget = this;
                    } catch (t) {}
                    try {
                      t.eventPhase = e;
                    } catch (t) {}
                    (t.removed = !1), (n = n.slice());
                    for (
                      var r = 0;
                      s > r && !t.immediatePropagationStopped;
                      r++
                    ) {
                      var o = n[r];
                      o.handleEvent ? o.handleEvent(t) : o(t),
                        t.removed &&
                          (this.off(t.type, o, 1 == e), (t.removed = !1));
                    }
                  }
                }),
                (createjs.EventDispatcher = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                throw "Ticker cannot be instantiated.";
              }
              (t.RAF_SYNCHED = "synched"),
                (t.RAF = "raf"),
                (t.TIMEOUT = "timeout"),
                (t.useRAF = !1),
                (t.timingMode = null),
                (t.maxDelta = 0),
                (t.paused = !1),
                (t.removeEventListener = null),
                (t.removeAllEventListeners = null),
                (t.dispatchEvent = null),
                (t.hasEventListener = null),
                (t._listeners = null),
                createjs.EventDispatcher.initialize(t),
                (t._addEventListener = t.addEventListener),
                (t.addEventListener = function () {
                  return (
                    !t._inited && t.init(),
                    t._addEventListener.apply(t, arguments)
                  );
                }),
                (t._inited = !1),
                (t._startTime = 0),
                (t._pausedTime = 0),
                (t._ticks = 0),
                (t._pausedTicks = 0),
                (t._interval = 50),
                (t._lastTime = 0),
                (t._times = null),
                (t._tickTimes = null),
                (t._timerId = null),
                (t._raf = !0),
                (t.setInterval = function (e) {
                  (t._interval = e), t._inited && t._setupTick();
                }),
                (t.getInterval = function () {
                  return t._interval;
                }),
                (t.setFPS = function (e) {
                  t.setInterval(1e3 / e);
                }),
                (t.getFPS = function () {
                  return 1e3 / t._interval;
                });
              try {
                Object.defineProperties(t, {
                  interval: { get: t.getInterval, set: t.setInterval },
                  framerate: { get: t.getFPS, set: t.setFPS },
                });
              } catch (t) {
                console.log(t);
              }
              (t.init = function () {
                t._inited ||
                  ((t._inited = !0),
                  (t._times = []),
                  (t._tickTimes = []),
                  (t._startTime = t._getTime()),
                  t._times.push((t._lastTime = 0)),
                  (t.interval = t._interval));
              }),
                (t.reset = function () {
                  if (t._raf) {
                    var e =
                      window.cancelAnimationFrame ||
                      window.webkitCancelAnimationFrame ||
                      window.mozCancelAnimationFrame ||
                      window.oCancelAnimationFrame ||
                      window.msCancelAnimationFrame;
                    e && e(t._timerId);
                  } else clearTimeout(t._timerId);
                  t.removeAllEventListeners("tick"),
                    (t._timerId = t._times = t._tickTimes = null),
                    (t._startTime = t._lastTime = t._ticks = 0),
                    (t._inited = !1);
                }),
                (t.getMeasuredTickTime = function (e) {
                  var s = 0,
                    i = t._tickTimes;
                  if (!i || i.length < 1) return -1;
                  e = Math.min(i.length, e || 0 | t.getFPS());
                  for (var n = 0; e > n; n++) s += i[n];
                  return s / e;
                }),
                (t.getMeasuredFPS = function (e) {
                  var s = t._times;
                  return !s || s.length < 2
                    ? -1
                    : ((e = Math.min(s.length - 1, e || 0 | t.getFPS())),
                      1e3 / ((s[0] - s[e]) / e));
                }),
                (t.setPaused = function (e) {
                  t.paused = e;
                }),
                (t.getPaused = function () {
                  return t.paused;
                }),
                (t.getTime = function (e) {
                  return t._startTime
                    ? t._getTime() - (e ? t._pausedTime : 0)
                    : -1;
                }),
                (t.getEventTime = function (e) {
                  return t._startTime
                    ? (t._lastTime || t._startTime) - (e ? t._pausedTime : 0)
                    : -1;
                }),
                (t.getTicks = function (e) {
                  return t._ticks - (e ? t._pausedTicks : 0);
                }),
                (t._handleSynch = function () {
                  (t._timerId = null),
                    t._setupTick(),
                    t._getTime() - t._lastTime >= 0.97 * (t._interval - 1) &&
                      t._tick();
                }),
                (t._handleRAF = function () {
                  (t._timerId = null), t._setupTick(), t._tick();
                }),
                (t._handleTimeout = function () {
                  (t._timerId = null), t._setupTick(), t._tick();
                }),
                (t._setupTick = function () {
                  if (null == t._timerId) {
                    var e = t.timingMode || (t.useRAF && t.RAF_SYNCHED);
                    if (e == t.RAF_SYNCHED || e == t.RAF) {
                      var s =
                        window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame;
                      if (s)
                        return (
                          (t._timerId = s(
                            e == t.RAF ? t._handleRAF : t._handleSynch
                          )),
                          void (t._raf = !0)
                        );
                    }
                    (t._raf = !1),
                      (t._timerId = setTimeout(t._handleTimeout, t._interval));
                  }
                }),
                (t._tick = function () {
                  var e = t.paused,
                    s = t._getTime(),
                    i = s - t._lastTime;
                  if (
                    ((t._lastTime = s),
                    t._ticks++,
                    e && (t._pausedTicks++, (t._pausedTime += i)),
                    t.hasEventListener("tick"))
                  ) {
                    var n = new createjs.Event("tick"),
                      r = t.maxDelta;
                    (n.delta = r && i > r ? r : i),
                      (n.paused = e),
                      (n.time = s),
                      (n.runTime = s - t._pausedTime),
                      t.dispatchEvent(n);
                  }
                  for (
                    t._tickTimes.unshift(t._getTime() - s);
                    t._tickTimes.length > 100;
  
                  )
                    t._tickTimes.pop();
                  for (t._times.unshift(s); t._times.length > 100; )
                    t._times.pop();
                });
              var e =
                window.performance &&
                (performance.now ||
                  performance.mozNow ||
                  performance.msNow ||
                  performance.oNow ||
                  performance.webkitNow);
              (t._getTime = function () {
                return (
                  ((e && e.call(performance)) || new Date().getTime()) -
                  t._startTime
                );
              }),
                (createjs.Ticker = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                throw "UID cannot be instantiated";
              }
              (t._nextID = 0),
                (t.get = function () {
                  return t._nextID++;
                }),
                (createjs.UID = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s, i, n, r, o, a, h, l) {
                this.Event_constructor(t, e, s),
                  (this.stageX = i),
                  (this.stageY = n),
                  (this.rawX = null == h ? i : h),
                  (this.rawY = null == l ? n : l),
                  (this.nativeEvent = r),
                  (this.pointerID = o),
                  (this.primary = !!a);
              }
              var e = createjs.extend(t, createjs.Event);
              (e._get_localX = function () {
                return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
              }),
                (e._get_localY = function () {
                  return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
                }),
                (e._get_isTouch = function () {
                  return -1 !== this.pointerID;
                });
              try {
                Object.defineProperties(e, {
                  localX: { get: e._get_localX },
                  localY: { get: e._get_localY },
                  isTouch: { get: e._get_isTouch },
                });
              } catch (t) {}
              (e.clone = function () {
                return new t(
                  this.type,
                  this.bubbles,
                  this.cancelable,
                  this.stageX,
                  this.stageY,
                  this.nativeEvent,
                  this.pointerID,
                  this.primary,
                  this.rawX,
                  this.rawY
                );
              }),
                (e.toString = function () {
                  return (
                    "[MouseEvent (type=" +
                    this.type +
                    " stageX=" +
                    this.stageX +
                    " stageY=" +
                    this.stageY +
                    ")]"
                  );
                }),
                (createjs.MouseEvent = createjs.promote(t, "Event"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s, i, n, r) {
                this.setValues(t, e, s, i, n, r);
              }
              var e = t.prototype;
              (t.DEG_TO_RAD = Math.PI / 180),
                (t.identity = null),
                (e.setValues = function (t, e, s, i, n, r) {
                  return (
                    (this.a = null == t ? 1 : t),
                    (this.b = e || 0),
                    (this.c = s || 0),
                    (this.d = null == i ? 1 : i),
                    (this.tx = n || 0),
                    (this.ty = r || 0),
                    this
                  );
                }),
                (e.append = function (t, e, s, i, n, r) {
                  var o = this.a,
                    a = this.b,
                    h = this.c,
                    l = this.d;
                  return (
                    (1 != t || 0 != e || 0 != s || 1 != i) &&
                      ((this.a = o * t + h * e),
                      (this.b = a * t + l * e),
                      (this.c = o * s + h * i),
                      (this.d = a * s + l * i)),
                    (this.tx = o * n + h * r + this.tx),
                    (this.ty = a * n + l * r + this.ty),
                    this
                  );
                }),
                (e.prepend = function (t, e, s, i, n, r) {
                  var o = this.a,
                    a = this.c,
                    h = this.tx;
                  return (
                    (this.a = t * o + s * this.b),
                    (this.b = e * o + i * this.b),
                    (this.c = t * a + s * this.d),
                    (this.d = e * a + i * this.d),
                    (this.tx = t * h + s * this.ty + n),
                    (this.ty = e * h + i * this.ty + r),
                    this
                  );
                }),
                (e.appendMatrix = function (t) {
                  return this.append(t.a, t.b, t.c, t.d, t.tx, t.ty);
                }),
                (e.prependMatrix = function (t) {
                  return this.prepend(t.a, t.b, t.c, t.d, t.tx, t.ty);
                }),
                (e.appendTransform = function (e, s, i, n, r, o, a, h, l) {
                  if (r % 360)
                    var c = r * t.DEG_TO_RAD,
                      u = Math.cos(c),
                      d = Math.sin(c);
                  else (u = 1), (d = 0);
                  return (
                    o || a
                      ? ((o *= t.DEG_TO_RAD),
                        (a *= t.DEG_TO_RAD),
                        this.append(
                          Math.cos(a),
                          Math.sin(a),
                          -Math.sin(o),
                          Math.cos(o),
                          e,
                          s
                        ),
                        this.append(u * i, d * i, -d * n, u * n, 0, 0))
                      : this.append(u * i, d * i, -d * n, u * n, e, s),
                    (h || l) &&
                      ((this.tx -= h * this.a + l * this.c),
                      (this.ty -= h * this.b + l * this.d)),
                    this
                  );
                }),
                (e.prependTransform = function (e, s, i, n, r, o, a, h, l) {
                  if (r % 360)
                    var c = r * t.DEG_TO_RAD,
                      u = Math.cos(c),
                      d = Math.sin(c);
                  else (u = 1), (d = 0);
                  return (
                    (h || l) && ((this.tx -= h), (this.ty -= l)),
                    o || a
                      ? ((o *= t.DEG_TO_RAD),
                        (a *= t.DEG_TO_RAD),
                        this.prepend(u * i, d * i, -d * n, u * n, 0, 0),
                        this.prepend(
                          Math.cos(a),
                          Math.sin(a),
                          -Math.sin(o),
                          Math.cos(o),
                          e,
                          s
                        ))
                      : this.prepend(u * i, d * i, -d * n, u * n, e, s),
                    this
                  );
                }),
                (e.rotate = function (e) {
                  e *= t.DEG_TO_RAD;
                  var s = Math.cos(e),
                    i = Math.sin(e),
                    n = this.a,
                    r = this.b;
                  return (
                    (this.a = n * s + this.c * i),
                    (this.b = r * s + this.d * i),
                    (this.c = -n * i + this.c * s),
                    (this.d = -r * i + this.d * s),
                    this
                  );
                }),
                (e.skew = function (e, s) {
                  return (
                    (e *= t.DEG_TO_RAD),
                    (s *= t.DEG_TO_RAD),
                    this.append(
                      Math.cos(s),
                      Math.sin(s),
                      -Math.sin(e),
                      Math.cos(e),
                      0,
                      0
                    ),
                    this
                  );
                }),
                (e.scale = function (t, e) {
                  return (
                    (this.a *= t),
                    (this.b *= t),
                    (this.c *= e),
                    (this.d *= e),
                    this
                  );
                }),
                (e.translate = function (t, e) {
                  return (
                    (this.tx += this.a * t + this.c * e),
                    (this.ty += this.b * t + this.d * e),
                    this
                  );
                }),
                (e.identity = function () {
                  return (
                    (this.a = this.d = 1),
                    (this.b = this.c = this.tx = this.ty = 0),
                    this
                  );
                }),
                (e.invert = function () {
                  var t = this.a,
                    e = this.b,
                    s = this.c,
                    i = this.d,
                    n = this.tx,
                    r = t * i - e * s;
                  return (
                    (this.a = i / r),
                    (this.b = -e / r),
                    (this.c = -s / r),
                    (this.d = t / r),
                    (this.tx = (s * this.ty - i * n) / r),
                    (this.ty = -(t * this.ty - e * n) / r),
                    this
                  );
                }),
                (e.isIdentity = function () {
                  return (
                    0 === this.tx &&
                    0 === this.ty &&
                    1 === this.a &&
                    0 === this.b &&
                    0 === this.c &&
                    1 === this.d
                  );
                }),
                (e.equals = function (t) {
                  return (
                    this.tx === t.tx &&
                    this.ty === t.ty &&
                    this.a === t.a &&
                    this.b === t.b &&
                    this.c === t.c &&
                    this.d === t.d
                  );
                }),
                (e.transformPoint = function (t, e, s) {
                  return (
                    ((s = s || {}).x = t * this.a + e * this.c + this.tx),
                    (s.y = t * this.b + e * this.d + this.ty),
                    s
                  );
                }),
                (e.decompose = function (e) {
                  null == e && (e = {}),
                    (e.x = this.tx),
                    (e.y = this.ty),
                    (e.scaleX = Math.sqrt(this.a * this.a + this.b * this.b)),
                    (e.scaleY = Math.sqrt(this.c * this.c + this.d * this.d));
                  var s = Math.atan2(-this.c, this.d),
                    i = Math.atan2(this.b, this.a);
                  return (
                    1e-5 > Math.abs(1 - s / i)
                      ? ((e.rotation = i / t.DEG_TO_RAD),
                        this.a < 0 &&
                          this.d >= 0 &&
                          (e.rotation += e.rotation <= 0 ? 180 : -180),
                        (e.skewX = e.skewY = 0))
                      : ((e.skewX = s / t.DEG_TO_RAD),
                        (e.skewY = i / t.DEG_TO_RAD)),
                    e
                  );
                }),
                (e.copy = function (t) {
                  return this.setValues(t.a, t.b, t.c, t.d, t.tx, t.ty);
                }),
                (e.clone = function () {
                  return new t(this.a, this.b, this.c, this.d, this.tx, this.ty);
                }),
                (e.toString = function () {
                  return (
                    "[Matrix2D (a=" +
                    this.a +
                    " b=" +
                    this.b +
                    " c=" +
                    this.c +
                    " d=" +
                    this.d +
                    " tx=" +
                    this.tx +
                    " ty=" +
                    this.ty +
                    ")]"
                  );
                }),
                (t.identity = new t()),
                (createjs.Matrix2D = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s, i, n) {
                this.setValues(t, e, s, i, n);
              }
              var e = t.prototype;
              (e.setValues = function (t, e, s, i, n) {
                return (
                  (this.visible = null == t || !!t),
                  (this.alpha = null == e ? 1 : e),
                  (this.shadow = s),
                  (this.compositeOperation = s),
                  (this.matrix =
                    n ||
                    (this.matrix && this.matrix.identity()) ||
                    new createjs.Matrix2D()),
                  this
                );
              }),
                (e.append = function (t, e, s, i, n) {
                  return (
                    (this.alpha *= e),
                    (this.shadow = s || this.shadow),
                    (this.compositeOperation = i || this.compositeOperation),
                    (this.visible = this.visible && t),
                    n && this.matrix.appendMatrix(n),
                    this
                  );
                }),
                (e.prepend = function (t, e, s, i, n) {
                  return (
                    (this.alpha *= e),
                    (this.shadow = this.shadow || s),
                    (this.compositeOperation = this.compositeOperation || i),
                    (this.visible = this.visible && t),
                    n && this.matrix.prependMatrix(n),
                    this
                  );
                }),
                (e.identity = function () {
                  return (
                    (this.visible = !0),
                    (this.alpha = 1),
                    (this.shadow = this.compositeOperation = null),
                    this.matrix.identity(),
                    this
                  );
                }),
                (e.clone = function () {
                  return new t(
                    this.alpha,
                    this.shadow,
                    this.compositeOperation,
                    this.visible,
                    this.matrix.clone()
                  );
                }),
                (createjs.DisplayProps = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e) {
                this.setValues(t, e);
              }
              var e = t.prototype;
              (e.setValues = function (t, e) {
                return (this.x = t || 0), (this.y = e || 0), this;
              }),
                (e.copy = function (t) {
                  return (this.x = t.x), (this.y = t.y), this;
                }),
                (e.clone = function () {
                  return new t(this.x, this.y);
                }),
                (e.toString = function () {
                  return "[Point (x=" + this.x + " y=" + this.y + ")]";
                }),
                (createjs.Point = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s, i) {
                this.setValues(t, e, s, i);
              }
              var e = t.prototype;
              (e.setValues = function (t, e, s, i) {
                return (
                  (this.x = t || 0),
                  (this.y = e || 0),
                  (this.width = s || 0),
                  (this.height = i || 0),
                  this
                );
              }),
                (e.extend = function (t, e, s, i) {
                  return (
                    (i = i || 0),
                    t + (s = s || 0) > this.x + this.width &&
                      (this.width = t + s - this.x),
                    e + i > this.y + this.height &&
                      (this.height = e + i - this.y),
                    t < this.x && ((this.width += this.x - t), (this.x = t)),
                    e < this.y && ((this.height += this.y - e), (this.y = e)),
                    this
                  );
                }),
                (e.pad = function (t, e, s, i) {
                  return (
                    (this.x -= t),
                    (this.y -= e),
                    (this.width += t + s),
                    (this.height += e + i),
                    this
                  );
                }),
                (e.copy = function (t) {
                  return this.setValues(t.x, t.y, t.width, t.height);
                }),
                (e.contains = function (t, e, s, i) {
                  return (
                    (s = s || 0),
                    (i = i || 0),
                    t >= this.x &&
                      t + s <= this.x + this.width &&
                      e >= this.y &&
                      e + i <= this.y + this.height
                  );
                }),
                (e.union = function (t) {
                  return this.clone().extend(t.x, t.y, t.width, t.height);
                }),
                (e.intersection = function (e) {
                  var s = e.x,
                    i = e.y,
                    n = s + e.width,
                    r = i + e.height;
                  return (
                    this.x > s && (s = this.x),
                    this.y > i && (i = this.y),
                    this.x + this.width < n && (n = this.x + this.width),
                    this.y + this.height < r && (r = this.y + this.height),
                    s >= n || i >= r ? null : new t(s, i, n - s, r - i)
                  );
                }),
                (e.intersects = function (t) {
                  return (
                    t.x <= this.x + this.width &&
                    this.x <= t.x + t.width &&
                    t.y <= this.y + this.height &&
                    this.y <= t.y + t.height
                  );
                }),
                (e.isEmpty = function () {
                  return this.width <= 0 || this.height <= 0;
                }),
                (e.clone = function () {
                  return new t(this.x, this.y, this.width, this.height);
                }),
                (e.toString = function () {
                  return (
                    "[Rectangle (x=" +
                    this.x +
                    " y=" +
                    this.y +
                    " width=" +
                    this.width +
                    " height=" +
                    this.height +
                    ")]"
                  );
                }),
                (createjs.Rectangle = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s, i, n, r, o) {
                t.addEventListener &&
                  ((this.target = t),
                  (this.overLabel = null == s ? "over" : s),
                  (this.outLabel = null == e ? "out" : e),
                  (this.downLabel = null == i ? "down" : i),
                  (this.play = n),
                  (this._isPressed = !1),
                  (this._isOver = !1),
                  (this._enabled = !1),
                  (t.mouseChildren = !1),
                  (this.enabled = !0),
                  this.handleEvent({}),
                  r &&
                    (o &&
                      ((r.actionsEnabled = !1),
                      r.gotoAndStop && r.gotoAndStop(o)),
                    (t.hitArea = r)));
              }
              var e = t.prototype;
              (e.setEnabled = function (t) {
                if (t != this._enabled) {
                  var e = this.target;
                  (this._enabled = t),
                    t
                      ? ((e.cursor = "pointer"),
                        e.addEventListener("rollover", this),
                        e.addEventListener("rollout", this),
                        e.addEventListener("mousedown", this),
                        e.addEventListener("pressup", this))
                      : ((e.cursor = null),
                        e.removeEventListener("rollover", this),
                        e.removeEventListener("rollout", this),
                        e.removeEventListener("mousedown", this),
                        e.removeEventListener("pressup", this));
                }
              }),
                (e.getEnabled = function () {
                  return this._enabled;
                });
              try {
                Object.defineProperties(e, {
                  enabled: { get: e.getEnabled, set: e.setEnabled },
                });
              } catch (t) {}
              (e.toString = function () {
                return "[ButtonHelper]";
              }),
                (e.handleEvent = function (t) {
                  var e,
                    s = this.target,
                    i = t.type;
                  "mousedown" == i
                    ? ((this._isPressed = !0), (e = this.downLabel))
                    : "pressup" == i
                    ? ((this._isPressed = !1),
                      (e = this._isOver ? this.overLabel : this.outLabel))
                    : "rollover" == i
                    ? ((this._isOver = !0),
                      (e = this._isPressed ? this.downLabel : this.overLabel))
                    : ((this._isOver = !1),
                      (e = this._isPressed ? this.overLabel : this.outLabel)),
                    this.play
                      ? s.gotoAndPlay && s.gotoAndPlay(e)
                      : s.gotoAndStop && s.gotoAndStop(e);
                }),
                (createjs.ButtonHelper = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s, i) {
                (this.color = t || "black"),
                  (this.offsetX = e || 0),
                  (this.offsetY = s || 0),
                  (this.blur = i || 0);
              }
              var e = t.prototype;
              (t.identity = new t("transparent", 0, 0, 0)),
                (e.toString = function () {
                  return "[Shadow]";
                }),
                (e.clone = function () {
                  return new t(this.color, this.offsetX, this.offsetY, this.blur);
                }),
                (createjs.Shadow = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t) {
                this.EventDispatcher_constructor(),
                  (this.complete = !0),
                  (this.framerate = 0),
                  (this._animations = null),
                  (this._frames = null),
                  (this._images = null),
                  (this._data = null),
                  (this._loadCount = 0),
                  (this._frameHeight = 0),
                  (this._frameWidth = 0),
                  (this._numFrames = 0),
                  (this._regX = 0),
                  (this._regY = 0),
                  (this._spacing = 0),
                  (this._margin = 0),
                  this._parseData(t);
              }
              var e = createjs.extend(t, createjs.EventDispatcher);
              e.getAnimations = function () {
                return this._animations.slice();
              };
              try {
                Object.defineProperties(e, {
                  animations: { get: e.getAnimations },
                });
              } catch (t) {}
              (e.getNumFrames = function (t) {
                if (null == t)
                  return this._frames
                    ? this._frames.length
                    : this._numFrames || 0;
                var e = this._data[t];
                return null == e ? 0 : e.frames.length;
              }),
                (e.getAnimation = function (t) {
                  return this._data[t];
                }),
                (e.getFrame = function (t) {
                  var e;
                  return this._frames && (e = this._frames[t]) ? e : null;
                }),
                (e.getFrameBounds = function (t, e) {
                  var s = this.getFrame(t);
                  return s
                    ? (e || new createjs.Rectangle()).setValues(
                        -s.regX,
                        -s.regY,
                        s.rect.width,
                        s.rect.height
                      )
                    : null;
                }),
                (e.toString = function () {
                  return "[SpriteSheet]";
                }),
                (e.clone = function () {
                  throw "SpriteSheet cannot be cloned.";
                }),
                (e._parseData = function (t) {
                  var e, s, i, n;
                  if (null != t) {
                    if (
                      ((this.framerate = t.framerate || 0),
                      t.images && (s = t.images.length) > 0)
                    )
                      for (n = this._images = [], e = 0; s > e; e++) {
                        var r = t.images[e];
                        if ("string" == typeof r) {
                          var o = r;
                          (r = document.createElement("img")).src = o;
                        }
                        n.push(r),
                          r.getContext ||
                            r.complete ||
                            (this._loadCount++,
                            (this.complete = !1),
                            (function (t) {
                              r.onload = function () {
                                t._handleImageLoad();
                              };
                            })(this));
                      }
                    if (null == t.frames);
                    else if (t.frames instanceof Array)
                      for (
                        this._frames = [], e = 0, s = (n = t.frames).length;
                        s > e;
                        e++
                      ) {
                        var a = n[e];
                        this._frames.push({
                          image: this._images[a[4] ? a[4] : 0],
                          rect: new createjs.Rectangle(a[0], a[1], a[2], a[3]),
                          regX: a[5] || 0,
                          regY: a[6] || 0,
                        });
                      }
                    else
                      (i = t.frames),
                        (this._frameWidth = i.width),
                        (this._frameHeight = i.height),
                        (this._regX = i.regX || 0),
                        (this._regY = i.regY || 0),
                        (this._spacing = i.spacing || 0),
                        (this._margin = i.margin || 0),
                        (this._numFrames = i.count),
                        0 == this._loadCount && this._calculateFrames();
                    var h;
                    if (((this._animations = []), null != (i = t.animations)))
                      for (h in ((this._data = {}), i)) {
                        var l = { name: h },
                          c = i[h];
                        if ("number" == typeof c) n = l.frames = [c];
                        else if (c instanceof Array)
                          if (1 == c.length) l.frames = [c[0]];
                          else
                            for (
                              l.speed = c[3],
                                l.next = c[2],
                                n = l.frames = [],
                                e = c[0];
                              e <= c[1];
                              e++
                            )
                              n.push(e);
                        else {
                          (l.speed = c.speed), (l.next = c.next);
                          var u = c.frames;
                          n = l.frames = "number" == typeof u ? [u] : u.slice(0);
                        }
                        (!0 === l.next || void 0 === l.next) && (l.next = h),
                          (!1 === l.next || (n.length < 2 && l.next == h)) &&
                            (l.next = null),
                          l.speed || (l.speed = 1),
                          this._animations.push(h),
                          (this._data[h] = l);
                      }
                  }
                }),
                (e._handleImageLoad = function () {
                  0 == --this._loadCount &&
                    (this._calculateFrames(),
                    (this.complete = !0),
                    this.dispatchEvent("complete"));
                }),
                (e._calculateFrames = function () {
                  if (!this._frames && 0 != this._frameWidth) {
                    this._frames = [];
                    var t = this._numFrames || 1e5,
                      e = 0,
                      s = this._frameWidth,
                      i = this._frameHeight,
                      n = this._spacing,
                      r = this._margin;
                    t: for (var o = 0, a = this._images; o < a.length; o++)
                      for (
                        var h = a[o], l = h.width, c = h.height, u = r;
                        c - r - i >= u;
  
                      ) {
                        for (var d = r; l - r - s >= d; ) {
                          if (e >= t) break t;
                          e++,
                            this._frames.push({
                              image: h,
                              rect: new createjs.Rectangle(d, u, s, i),
                              regX: this._regX,
                              regY: this._regY,
                            }),
                            (d += s + n);
                        }
                        u += i + n;
                      }
                    this._numFrames = e;
                  }
                }),
                (createjs.SpriteSheet = createjs.promote(t, "EventDispatcher"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                (this.command = null),
                  (this._stroke = null),
                  (this._strokeStyle = null),
                  (this._oldStrokeStyle = null),
                  (this._strokeDash = null),
                  (this._oldStrokeDash = null),
                  (this._strokeIgnoreScale = !1),
                  (this._fill = null),
                  (this._instructions = []),
                  (this._commitIndex = 0),
                  (this._activeInstructions = []),
                  (this._dirty = !1),
                  (this._storeIndex = 0),
                  this.clear();
              }
              var e = t.prototype,
                s = t;
              (t.getRGB = function (t, e, s, i) {
                return (
                  null != t &&
                    null == s &&
                    ((i = e),
                    (s = 255 & t),
                    (e = (t >> 8) & 255),
                    (t = (t >> 16) & 255)),
                  null == i
                    ? "rgb(" + t + "," + e + "," + s + ")"
                    : "rgba(" + t + "," + e + "," + s + "," + i + ")"
                );
              }),
                (t.getHSL = function (t, e, s, i) {
                  return null == i
                    ? "hsl(" + (t % 360) + "," + e + "%," + s + "%)"
                    : "hsla(" + (t % 360) + "," + e + "%," + s + "%," + i + ")";
                }),
                (t.BASE_64 = {
                  A: 0,
                  B: 1,
                  C: 2,
                  D: 3,
                  E: 4,
                  F: 5,
                  G: 6,
                  H: 7,
                  I: 8,
                  J: 9,
                  K: 10,
                  L: 11,
                  M: 12,
                  N: 13,
                  O: 14,
                  P: 15,
                  Q: 16,
                  R: 17,
                  S: 18,
                  T: 19,
                  U: 20,
                  V: 21,
                  W: 22,
                  X: 23,
                  Y: 24,
                  Z: 25,
                  a: 26,
                  b: 27,
                  c: 28,
                  d: 29,
                  e: 30,
                  f: 31,
                  g: 32,
                  h: 33,
                  i: 34,
                  j: 35,
                  k: 36,
                  l: 37,
                  m: 38,
                  n: 39,
                  o: 40,
                  p: 41,
                  q: 42,
                  r: 43,
                  s: 44,
                  t: 45,
                  u: 46,
                  v: 47,
                  w: 48,
                  x: 49,
                  y: 50,
                  z: 51,
                  0: 52,
                  1: 53,
                  2: 54,
                  3: 55,
                  4: 56,
                  5: 57,
                  6: 58,
                  7: 59,
                  8: 60,
                  9: 61,
                  "+": 62,
                  "/": 63,
                }),
                (t.STROKE_CAPS_MAP = ["butt", "round", "square"]),
                (t.STROKE_JOINTS_MAP = ["miter", "round", "bevel"]);
              var i = createjs.createCanvas
                ? createjs.createCanvas()
                : document.createElement("canvas");
              i.getContext &&
                ((t._ctx = i.getContext("2d")), (i.width = i.height = 1)),
                (e.getInstructions = function () {
                  return this._updateInstructions(), this._instructions;
                });
              try {
                Object.defineProperties(e, {
                  instructions: { get: e.getInstructions },
                });
              } catch (t) {}
              (e.isEmpty = function () {
                return !(
                  this._instructions.length || this._activeInstructions.length
                );
              }),
                (e.draw = function (t, e) {
                  this._updateInstructions();
                  for (
                    var s = this._instructions,
                      i = this._storeIndex,
                      n = s.length;
                    n > i;
                    i++
                  )
                    s[i].exec(t, e);
                }),
                (e.drawAsPath = function (t) {
                  this._updateInstructions();
                  for (
                    var e,
                      s = this._instructions,
                      i = this._storeIndex,
                      n = s.length;
                    n > i;
                    i++
                  )
                    !1 !== (e = s[i]).path && e.exec(t);
                }),
                (e.moveTo = function (t, e) {
                  return this.append(new s.MoveTo(t, e), !0);
                }),
                (e.lineTo = function (t, e) {
                  return this.append(new s.LineTo(t, e));
                }),
                (e.arcTo = function (t, e, i, n, r) {
                  return this.append(new s.ArcTo(t, e, i, n, r));
                }),
                (e.arc = function (t, e, i, n, r, o) {
                  return this.append(new s.Arc(t, e, i, n, r, o));
                }),
                (e.quadraticCurveTo = function (t, e, i, n) {
                  return this.append(new s.QuadraticCurveTo(t, e, i, n));
                }),
                (e.bezierCurveTo = function (t, e, i, n, r, o) {
                  return this.append(new s.BezierCurveTo(t, e, i, n, r, o));
                }),
                (e.rect = function (t, e, i, n) {
                  return this.append(new s.Rect(t, e, i, n));
                }),
                (e.closePath = function () {
                  return this._activeInstructions.length
                    ? this.append(new s.ClosePath())
                    : this;
                }),
                (e.clear = function () {
                  return (
                    (this._instructions.length =
                      this._activeInstructions.length =
                      this._commitIndex =
                        0),
                    (this._strokeStyle =
                      this._stroke =
                      this._fill =
                      this._strokeDash =
                        null),
                    (this._dirty = this._strokeIgnoreScale = !1),
                    this
                  );
                }),
                (e.beginFill = function (t) {
                  return this._setFill(t ? new s.Fill(t) : null);
                }),
                (e.beginLinearGradientFill = function (t, e, i, n, r, o) {
                  return this._setFill(
                    new s.Fill().linearGradient(t, e, i, n, r, o)
                  );
                }),
                (e.beginRadialGradientFill = function (t, e, i, n, r, o, a, h) {
                  return this._setFill(
                    new s.Fill().radialGradient(t, e, i, n, r, o, a, h)
                  );
                }),
                (e.beginBitmapFill = function (t, e, i) {
                  return this._setFill(new s.Fill(null, i).bitmap(t, e));
                }),
                (e.endFill = function () {
                  return this.beginFill();
                }),
                (e.setStrokeStyle = function (t, e, i, n, r) {
                  return (
                    this._updateInstructions(!0),
                    (this._strokeStyle = this.command =
                      new s.StrokeStyle(t, e, i, n, r)),
                    this._stroke && (this._stroke.ignoreScale = r),
                    (this._strokeIgnoreScale = r),
                    this
                  );
                }),
                (e.setStrokeDash = function (t, e) {
                  return (
                    this._updateInstructions(!0),
                    (this._strokeDash = this.command = new s.StrokeDash(t, e)),
                    this
                  );
                }),
                (e.beginStroke = function (t) {
                  return this._setStroke(t ? new s.Stroke(t) : null);
                }),
                (e.beginLinearGradientStroke = function (t, e, i, n, r, o) {
                  return this._setStroke(
                    new s.Stroke().linearGradient(t, e, i, n, r, o)
                  );
                }),
                (e.beginRadialGradientStroke = function (t, e, i, n, r, o, a, h) {
                  return this._setStroke(
                    new s.Stroke().radialGradient(t, e, i, n, r, o, a, h)
                  );
                }),
                (e.beginBitmapStroke = function (t, e) {
                  return this._setStroke(new s.Stroke().bitmap(t, e));
                }),
                (e.endStroke = function () {
                  return this.beginStroke();
                }),
                (e.curveTo = e.quadraticCurveTo),
                (e.drawRect = e.rect),
                (e.drawRoundRect = function (t, e, s, i, n) {
                  return this.drawRoundRectComplex(t, e, s, i, n, n, n, n);
                }),
                (e.drawRoundRectComplex = function (t, e, i, n, r, o, a, h) {
                  return this.append(new s.RoundRect(t, e, i, n, r, o, a, h));
                }),
                (e.drawCircle = function (t, e, i) {
                  return this.append(new s.Circle(t, e, i));
                }),
                (e.drawEllipse = function (t, e, i, n) {
                  return this.append(new s.Ellipse(t, e, i, n));
                }),
                (e.drawPolyStar = function (t, e, i, n, r, o) {
                  return this.append(new s.PolyStar(t, e, i, n, r, o));
                }),
                (e.append = function (t, e) {
                  return (
                    this._activeInstructions.push(t),
                    (this.command = t),
                    e || (this._dirty = !0),
                    this
                  );
                }),
                (e.decodePath = function (e) {
                  for (
                    var s = [
                        this.moveTo,
                        this.lineTo,
                        this.quadraticCurveTo,
                        this.bezierCurveTo,
                        this.closePath,
                      ],
                      i = [2, 2, 4, 6, 0],
                      n = 0,
                      r = e.length,
                      o = [],
                      a = 0,
                      h = 0,
                      l = t.BASE_64;
                    r > n;
  
                  ) {
                    var c = e.charAt(n),
                      u = l[c],
                      d = u >> 3,
                      p = s[d];
                    if (!p || 3 & u) throw "bad path data (@" + n + "): " + c;
                    var f = i[d];
                    d || (a = h = 0), (o.length = 0), n++;
                    for (var g = 2 + ((u >> 2) & 1), m = 0; f > m; m++) {
                      var v = l[e.charAt(n)],
                        y = v >> 5 ? -1 : 1;
                      (v = ((31 & v) << 6) | l[e.charAt(n + 1)]),
                        3 == g && (v = (v << 6) | l[e.charAt(n + 2)]),
                        (v = (y * v) / 10),
                        m % 2 ? (a = v += a) : (h = v += h),
                        (o[m] = v),
                        (n += g);
                    }
                    p.apply(this, o);
                  }
                  return this;
                }),
                (e.store = function () {
                  return (
                    this._updateInstructions(!0),
                    (this._storeIndex = this._instructions.length),
                    this
                  );
                }),
                (e.unstore = function () {
                  return (this._storeIndex = 0), this;
                }),
                (e.clone = function () {
                  var e = new t();
                  return (
                    (e.command = this.command),
                    (e._stroke = this._stroke),
                    (e._strokeStyle = this._strokeStyle),
                    (e._strokeDash = this._strokeDash),
                    (e._strokeIgnoreScale = this._strokeIgnoreScale),
                    (e._fill = this._fill),
                    (e._instructions = this._instructions.slice()),
                    (e._commitIndex = this._commitIndex),
                    (e._activeInstructions = this._activeInstructions.slice()),
                    (e._dirty = this._dirty),
                    (e._storeIndex = this._storeIndex),
                    e
                  );
                }),
                (e.toString = function () {
                  return "[Graphics]";
                }),
                (e.mt = e.moveTo),
                (e.lt = e.lineTo),
                (e.at = e.arcTo),
                (e.bt = e.bezierCurveTo),
                (e.qt = e.quadraticCurveTo),
                (e.a = e.arc),
                (e.r = e.rect),
                (e.cp = e.closePath),
                (e.c = e.clear),
                (e.f = e.beginFill),
                (e.lf = e.beginLinearGradientFill),
                (e.rf = e.beginRadialGradientFill),
                (e.bf = e.beginBitmapFill),
                (e.ef = e.endFill),
                (e.ss = e.setStrokeStyle),
                (e.sd = e.setStrokeDash),
                (e.s = e.beginStroke),
                (e.ls = e.beginLinearGradientStroke),
                (e.rs = e.beginRadialGradientStroke),
                (e.bs = e.beginBitmapStroke),
                (e.es = e.endStroke),
                (e.dr = e.drawRect),
                (e.rr = e.drawRoundRect),
                (e.rc = e.drawRoundRectComplex),
                (e.dc = e.drawCircle),
                (e.de = e.drawEllipse),
                (e.dp = e.drawPolyStar),
                (e.p = e.decodePath),
                (e._updateInstructions = function (e) {
                  var s = this._instructions,
                    i = this._activeInstructions,
                    n = this._commitIndex;
                  if (this._dirty && i.length) {
                    (s.length = n), s.push(t.beginCmd);
                    var r = i.length,
                      o = s.length;
                    s.length = o + r;
                    for (var a = 0; r > a; a++) s[a + o] = i[a];
                    this._fill && s.push(this._fill),
                      this._stroke &&
                        (this._strokeDash !== this._oldStrokeDash &&
                          ((this._oldStrokeDash = this._strokeDash),
                          s.push(this._strokeDash)),
                        this._strokeStyle !== this._oldStrokeStyle &&
                          ((this._oldStrokeStyle = this._strokeStyle),
                          s.push(this._strokeStyle)),
                        s.push(this._stroke)),
                      (this._dirty = !1);
                  }
                  e && ((i.length = 0), (this._commitIndex = s.length));
                }),
                (e._setFill = function (t) {
                  return (
                    this._updateInstructions(!0),
                    (this.command = this._fill = t),
                    this
                  );
                }),
                (e._setStroke = function (t) {
                  return (
                    this._updateInstructions(!0),
                    (this.command = this._stroke = t) &&
                      (t.ignoreScale = this._strokeIgnoreScale),
                    this
                  );
                }),
                ((s.LineTo = function (t, e) {
                  (this.x = t), (this.y = e);
                }).prototype.exec = function (t) {
                  t.lineTo(this.x, this.y);
                }),
                ((s.MoveTo = function (t, e) {
                  (this.x = t), (this.y = e);
                }).prototype.exec = function (t) {
                  t.moveTo(this.x, this.y);
                }),
                ((s.ArcTo = function (t, e, s, i, n) {
                  (this.x1 = t),
                    (this.y1 = e),
                    (this.x2 = s),
                    (this.y2 = i),
                    (this.radius = n);
                }).prototype.exec = function (t) {
                  t.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius);
                }),
                ((s.Arc = function (t, e, s, i, n, r) {
                  (this.x = t),
                    (this.y = e),
                    (this.radius = s),
                    (this.startAngle = i),
                    (this.endAngle = n),
                    (this.anticlockwise = !!r);
                }).prototype.exec = function (t) {
                  t.arc(
                    this.x,
                    this.y,
                    this.radius,
                    this.startAngle,
                    this.endAngle,
                    this.anticlockwise
                  );
                }),
                ((s.QuadraticCurveTo = function (t, e, s, i) {
                  (this.cpx = t), (this.cpy = e), (this.x = s), (this.y = i);
                }).prototype.exec = function (t) {
                  t.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y);
                }),
                ((s.BezierCurveTo = function (t, e, s, i, n, r) {
                  (this.cp1x = t),
                    (this.cp1y = e),
                    (this.cp2x = s),
                    (this.cp2y = i),
                    (this.x = n),
                    (this.y = r);
                }).prototype.exec = function (t) {
                  t.bezierCurveTo(
                    this.cp1x,
                    this.cp1y,
                    this.cp2x,
                    this.cp2y,
                    this.x,
                    this.y
                  );
                }),
                ((s.Rect = function (t, e, s, i) {
                  (this.x = t), (this.y = e), (this.w = s), (this.h = i);
                }).prototype.exec = function (t) {
                  t.rect(this.x, this.y, this.w, this.h);
                }),
                ((s.ClosePath = function () {}).prototype.exec = function (t) {
                  t.closePath();
                }),
                ((s.BeginPath = function () {}).prototype.exec = function (t) {
                  t.beginPath();
                }),
                (e = (s.Fill = function (t, e) {
                  (this.style = t), (this.matrix = e);
                }).prototype),
                (e.exec = function (t) {
                  if (this.style) {
                    t.fillStyle = this.style;
                    var e = this.matrix;
                    e && (t.save(), t.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)),
                      t.fill(),
                      e && t.restore();
                  }
                }),
                (e.linearGradient = function (e, s, i, n, r, o) {
                  for (
                    var a = (this.style = t._ctx.createLinearGradient(
                        i,
                        n,
                        r,
                        o
                      )),
                      h = 0,
                      l = e.length;
                    l > h;
                    h++
                  )
                    a.addColorStop(s[h], e[h]);
                  return (
                    (a.props = {
                      colors: e,
                      ratios: s,
                      x0: i,
                      y0: n,
                      x1: r,
                      y1: o,
                      type: "linear",
                    }),
                    this
                  );
                }),
                (e.radialGradient = function (e, s, i, n, r, o, a, h) {
                  for (
                    var l = (this.style = t._ctx.createRadialGradient(
                        i,
                        n,
                        r,
                        o,
                        a,
                        h
                      )),
                      c = 0,
                      u = e.length;
                    u > c;
                    c++
                  )
                    l.addColorStop(s[c], e[c]);
                  return (
                    (l.props = {
                      colors: e,
                      ratios: s,
                      x0: i,
                      y0: n,
                      r0: r,
                      x1: o,
                      y1: a,
                      r1: h,
                      type: "radial",
                    }),
                    this
                  );
                }),
                (e.bitmap = function (e, s) {
                  return (
                    ((this.style = t._ctx.createPattern(e, s || "")).props = {
                      image: e,
                      repetition: s,
                      type: "bitmap",
                    }),
                    this
                  );
                }),
                (e.path = !1),
                (e = (s.Stroke = function (t, e) {
                  (this.style = t), (this.ignoreScale = e);
                }).prototype),
                (e.exec = function (t) {
                  this.style &&
                    ((t.strokeStyle = this.style),
                    this.ignoreScale &&
                      (t.save(), t.setTransform(1, 0, 0, 1, 0, 0)),
                    t.stroke(),
                    this.ignoreScale && t.restore());
                }),
                (e.linearGradient = s.Fill.prototype.linearGradient),
                (e.radialGradient = s.Fill.prototype.radialGradient),
                (e.bitmap = s.Fill.prototype.bitmap),
                (e.path = !1),
                (e = (s.StrokeStyle = function (t, e, s, i) {
                  (this.width = t),
                    (this.caps = e),
                    (this.joints = s),
                    (this.miterLimit = i);
                }).prototype),
                (e.exec = function (e) {
                  (e.lineWidth = null == this.width ? "1" : this.width),
                    (e.lineCap =
                      null == this.caps
                        ? "butt"
                        : isNaN(this.caps)
                        ? this.caps
                        : t.STROKE_CAPS_MAP[this.caps]),
                    (e.lineJoin =
                      null == this.joints
                        ? "miter"
                        : isNaN(this.joints)
                        ? this.joints
                        : t.STROKE_JOINTS_MAP[this.joints]),
                    (e.miterLimit =
                      null == this.miterLimit ? "10" : this.miterLimit);
                }),
                (e.path = !1),
                ((s.StrokeDash = function (t, e) {
                  (this.segments = t), (this.offset = e || 0);
                }).prototype.exec = function (t) {
                  t.setLineDash &&
                    (t.setLineDash(this.segments || s.StrokeDash.EMPTY_SEGMENTS),
                    (t.lineDashOffset = this.offset || 0));
                }),
                (s.StrokeDash.EMPTY_SEGMENTS = []),
                ((s.RoundRect = function (t, e, s, i, n, r, o, a) {
                  (this.x = t),
                    (this.y = e),
                    (this.w = s),
                    (this.h = i),
                    (this.radiusTL = n),
                    (this.radiusTR = r),
                    (this.radiusBR = o),
                    (this.radiusBL = a);
                }).prototype.exec = function (t) {
                  var e = (l > h ? h : l) / 2,
                    s = 0,
                    i = 0,
                    n = 0,
                    r = 0,
                    o = this.x,
                    a = this.y,
                    h = this.w,
                    l = this.h,
                    c = this.radiusTL,
                    u = this.radiusTR,
                    d = this.radiusBR,
                    p = this.radiusBL;
                  0 > c && (c *= s = -1),
                    c > e && (c = e),
                    0 > u && (u *= i = -1),
                    u > e && (u = e),
                    0 > d && (d *= n = -1),
                    d > e && (d = e),
                    0 > p && (p *= r = -1),
                    p > e && (p = e),
                    t.moveTo(o + h - u, a),
                    t.arcTo(o + h + u * i, a - u * i, o + h, a + u, u),
                    t.lineTo(o + h, a + l - d),
                    t.arcTo(o + h + d * n, a + l + d * n, o + h - d, a + l, d),
                    t.lineTo(o + p, a + l),
                    t.arcTo(o - p * r, a + l + p * r, o, a + l - p, p),
                    t.lineTo(o, a + c),
                    t.arcTo(o - c * s, a - c * s, o + c, a, c),
                    t.closePath();
                }),
                ((s.Circle = function (t, e, s) {
                  (this.x = t), (this.y = e), (this.radius = s);
                }).prototype.exec = function (t) {
                  t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                }),
                ((s.Ellipse = function (t, e, s, i) {
                  (this.x = t), (this.y = e), (this.w = s), (this.h = i);
                }).prototype.exec = function (t) {
                  var e = this.x,
                    s = this.y,
                    i = this.w,
                    n = this.h,
                    r = 0.5522848,
                    o = (i / 2) * r,
                    a = (n / 2) * r,
                    h = e + i,
                    l = s + n,
                    c = e + i / 2,
                    u = s + n / 2;
                  t.moveTo(e, u),
                    t.bezierCurveTo(e, u - a, c - o, s, c, s),
                    t.bezierCurveTo(c + o, s, h, u - a, h, u),
                    t.bezierCurveTo(h, u + a, c + o, l, c, l),
                    t.bezierCurveTo(c - o, l, e, u + a, e, u);
                }),
                ((s.PolyStar = function (t, e, s, i, n, r) {
                  (this.x = t),
                    (this.y = e),
                    (this.radius = s),
                    (this.sides = i),
                    (this.pointSize = n),
                    (this.angle = r);
                }).prototype.exec = function (t) {
                  var e = this.x,
                    s = this.y,
                    i = this.radius,
                    n = ((this.angle || 0) / 180) * Math.PI,
                    r = this.sides,
                    o = 1 - (this.pointSize || 0),
                    a = Math.PI / r;
                  t.moveTo(e + Math.cos(n) * i, s + Math.sin(n) * i);
                  for (var h = 0; r > h; h++)
                    (n += a),
                      1 != o &&
                        t.lineTo(
                          e + Math.cos(n) * i * o,
                          s + Math.sin(n) * i * o
                        ),
                      (n += a),
                      t.lineTo(e + Math.cos(n) * i, s + Math.sin(n) * i);
                  t.closePath();
                }),
                (t.beginCmd = new s.BeginPath()),
                (createjs.Graphics = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                this.EventDispatcher_constructor(),
                  (this.alpha = 1),
                  (this.cacheCanvas = null),
                  (this.cacheID = 0),
                  (this.id = createjs.UID.get()),
                  (this.mouseEnabled = !0),
                  (this.tickEnabled = !0),
                  (this.name = null),
                  (this.parent = null),
                  (this.regX = 0),
                  (this.regY = 0),
                  (this.rotation = 0),
                  (this.scaleX = 1),
                  (this.scaleY = 1),
                  (this.skewX = 0),
                  (this.skewY = 0),
                  (this.shadow = null),
                  (this.visible = !0),
                  (this.x = 0),
                  (this.y = 0),
                  (this.transformMatrix = null),
                  (this.compositeOperation = null),
                  (this.snapToPixel = !0),
                  (this.filters = null),
                  (this.mask = null),
                  (this.hitArea = null),
                  (this.cursor = null),
                  (this._cacheOffsetX = 0),
                  (this._cacheOffsetY = 0),
                  (this._filterOffsetX = 0),
                  (this._filterOffsetY = 0),
                  (this._cacheScale = 1),
                  (this._cacheDataURLID = 0),
                  (this._cacheDataURL = null),
                  (this._props = new createjs.DisplayProps()),
                  (this._rectangle = new createjs.Rectangle()),
                  (this._bounds = null);
              }
              var e = createjs.extend(t, createjs.EventDispatcher);
              (t._MOUSE_EVENTS = [
                "click",
                "dblclick",
                "mousedown",
                "mouseout",
                "mouseover",
                "pressmove",
                "pressup",
                "rollout",
                "rollover",
              ]),
                (t.suppressCrossDomainErrors = !1),
                (t._snapToPixelEnabled = !1);
              var s = createjs.createCanvas
                ? createjs.createCanvas()
                : document.createElement("canvas");
              s.getContext &&
                ((t._hitTestCanvas = s),
                (t._hitTestContext = s.getContext("2d")),
                (s.width = s.height = 1)),
                (t._nextCacheID = 1),
                (e.getStage = function () {
                  for (var t = this, e = createjs.Stage; t.parent; ) t = t.parent;
                  return t instanceof e ? t : null;
                });
              try {
                Object.defineProperties(e, { stage: { get: e.getStage } });
              } catch (t) {}
              (e.isVisible = function () {
                return !!(
                  this.visible &&
                  this.alpha > 0 &&
                  0 != this.scaleX &&
                  0 != this.scaleY
                );
              }),
                (e.draw = function (t, e) {
                  var s = this.cacheCanvas;
                  if (e || !s) return !1;
                  var i = this._cacheScale;
                  return (
                    t.drawImage(
                      s,
                      this._cacheOffsetX + this._filterOffsetX,
                      this._cacheOffsetY + this._filterOffsetY,
                      s.width / i,
                      s.height / i
                    ),
                    !0
                  );
                }),
                (e.updateContext = function (e) {
                  var s = this,
                    i = s.mask,
                    n = s._props.matrix;
                  i &&
                    i.graphics &&
                    !i.graphics.isEmpty() &&
                    (i.getMatrix(n),
                    e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty),
                    i.graphics.drawAsPath(e),
                    e.clip(),
                    n.invert(),
                    e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty)),
                    this.getMatrix(n);
                  var r = n.tx,
                    o = n.ty;
                  t._snapToPixelEnabled &&
                    s.snapToPixel &&
                    ((r = (r + (0 > r ? -0.5 : 0.5)) | 0),
                    (o = (o + (0 > o ? -0.5 : 0.5)) | 0)),
                    e.transform(n.a, n.b, n.c, n.d, r, o),
                    (e.globalAlpha *= s.alpha),
                    s.compositeOperation &&
                      (e.globalCompositeOperation = s.compositeOperation),
                    s.shadow && this._applyShadow(e, s.shadow);
                }),
                (e.cache = function (t, e, s, i, n) {
                  (n = n || 1),
                    this.cacheCanvas ||
                      (this.cacheCanvas = createjs.createCanvas
                        ? createjs.createCanvas()
                        : document.createElement("canvas")),
                    (this._cacheWidth = s),
                    (this._cacheHeight = i),
                    (this._cacheOffsetX = t),
                    (this._cacheOffsetY = e),
                    (this._cacheScale = n),
                    this.updateCache();
                }),
                (e.updateCache = function (e) {
                  var s = this.cacheCanvas;
                  if (!s) throw "cache() must be called before updateCache()";
                  var i = this._cacheScale,
                    n = this._cacheOffsetX * i,
                    r = this._cacheOffsetY * i,
                    o = this._cacheWidth,
                    a = this._cacheHeight,
                    h = s.getContext("2d"),
                    l = this._getFilterBounds();
                  (n += this._filterOffsetX = l.x),
                    (r += this._filterOffsetY = l.y),
                    (o = Math.ceil(o * i) + l.width),
                    (a = Math.ceil(a * i) + l.height),
                    o != s.width || a != s.height
                      ? ((s.width = o), (s.height = a))
                      : e || h.clearRect(0, 0, o + 1, a + 1),
                    h.save(),
                    (h.globalCompositeOperation = e),
                    h.setTransform(i, 0, 0, i, -n, -r),
                    this.draw(h, !0),
                    this._applyFilters(),
                    h.restore(),
                    (this.cacheID = t._nextCacheID++);
                }),
                (e.uncache = function () {
                  (this._cacheDataURL = this.cacheCanvas = null),
                    (this.cacheID =
                      this._cacheOffsetX =
                      this._cacheOffsetY =
                      this._filterOffsetX =
                      this._filterOffsetY =
                        0),
                    (this._cacheScale = 1);
                }),
                (e.getCacheDataURL = function () {
                  return this.cacheCanvas
                    ? (this.cacheID != this._cacheDataURLID &&
                        (this._cacheDataURL = this.cacheCanvas.toDataURL()),
                      this._cacheDataURL)
                    : null;
                }),
                (e.localToGlobal = function (t, e, s) {
                  return this.getConcatenatedMatrix(
                    this._props.matrix
                  ).transformPoint(t, e, s || new createjs.Point());
                }),
                (e.globalToLocal = function (t, e, s) {
                  return this.getConcatenatedMatrix(this._props.matrix)
                    .invert()
                    .transformPoint(t, e, s || new createjs.Point());
                }),
                (e.localToLocal = function (t, e, s, i) {
                  return (
                    (i = this.localToGlobal(t, e, i)),
                    s.globalToLocal(i.x, i.y, i)
                  );
                }),
                (e.setTransform = function (t, e, s, i, n, r, o, a, h) {
                  return (
                    (this.x = t || 0),
                    (this.y = e || 0),
                    (this.scaleX = null == s ? 1 : s),
                    (this.scaleY = null == i ? 1 : i),
                    (this.rotation = n || 0),
                    (this.skewX = r || 0),
                    (this.skewY = o || 0),
                    (this.regX = a || 0),
                    (this.regY = h || 0),
                    this
                  );
                }),
                (e.getMatrix = function (t) {
                  var e = this,
                    s = (t && t.identity()) || new createjs.Matrix2D();
                  return e.transformMatrix
                    ? s.copy(e.transformMatrix)
                    : s.appendTransform(
                        e.x,
                        e.y,
                        e.scaleX,
                        e.scaleY,
                        e.rotation,
                        e.skewX,
                        e.skewY,
                        e.regX,
                        e.regY
                      );
                }),
                (e.getConcatenatedMatrix = function (t) {
                  for (var e = this, s = this.getMatrix(t); (e = e.parent); )
                    s.prependMatrix(e.getMatrix(e._props.matrix));
                  return s;
                }),
                (e.getConcatenatedDisplayProps = function (t) {
                  t = t ? t.identity() : new createjs.DisplayProps();
                  var e = this,
                    s = e.getMatrix(t.matrix);
                  do {
                    t.prepend(e.visible, e.alpha, e.shadow, e.compositeOperation),
                      e != this && s.prependMatrix(e.getMatrix(e._props.matrix));
                  } while ((e = e.parent));
                  return t;
                }),
                (e.hitTest = function (e, s) {
                  var i = t._hitTestContext;
                  i.setTransform(1, 0, 0, 1, -e, -s), this.draw(i);
                  var n = this._testHit(i);
                  return (
                    i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, 2, 2), n
                  );
                }),
                (e.set = function (t) {
                  for (var e in t) this[e] = t[e];
                  return this;
                }),
                (e.getBounds = function () {
                  if (this._bounds) return this._rectangle.copy(this._bounds);
                  var t = this.cacheCanvas;
                  if (t) {
                    var e = this._cacheScale;
                    return this._rectangle.setValues(
                      this._cacheOffsetX,
                      this._cacheOffsetY,
                      t.width / e,
                      t.height / e
                    );
                  }
                  return null;
                }),
                (e.getTransformedBounds = function () {
                  return this._getBounds();
                }),
                (e.setBounds = function (t, e, s, i) {
                  null == t && (this._bounds = t),
                    (this._bounds = (
                      this._bounds || new createjs.Rectangle()
                    ).setValues(t, e, s, i));
                }),
                (e.clone = function () {
                  return this._cloneProps(new t());
                }),
                (e.toString = function () {
                  return "[DisplayObject (name=" + this.name + ")]";
                }),
                (e._cloneProps = function (t) {
                  return (
                    (t.alpha = this.alpha),
                    (t.mouseEnabled = this.mouseEnabled),
                    (t.tickEnabled = this.tickEnabled),
                    (t.name = this.name),
                    (t.regX = this.regX),
                    (t.regY = this.regY),
                    (t.rotation = this.rotation),
                    (t.scaleX = this.scaleX),
                    (t.scaleY = this.scaleY),
                    (t.shadow = this.shadow),
                    (t.skewX = this.skewX),
                    (t.skewY = this.skewY),
                    (t.visible = this.visible),
                    (t.x = this.x),
                    (t.y = this.y),
                    (t.compositeOperation = this.compositeOperation),
                    (t.snapToPixel = this.snapToPixel),
                    (t.filters =
                      null == this.filters ? null : this.filters.slice(0)),
                    (t.mask = this.mask),
                    (t.hitArea = this.hitArea),
                    (t.cursor = this.cursor),
                    (t._bounds = this._bounds),
                    t
                  );
                }),
                (e._applyShadow = function (t, e) {
                  (e = e || Shadow.identity),
                    (t.shadowColor = e.color),
                    (t.shadowOffsetX = e.offsetX),
                    (t.shadowOffsetY = e.offsetY),
                    (t.shadowBlur = e.blur);
                }),
                (e._tick = function (t) {
                  var e = this._listeners;
                  e &&
                    e.tick &&
                    ((t.target = null),
                    (t.propagationStopped = t.immediatePropagationStopped = !1),
                    this.dispatchEvent(t));
                }),
                (e._testHit = function (e) {
                  try {
                    var s = e.getImageData(0, 0, 1, 1).data[3] > 1;
                  } catch (e) {
                    if (!t.suppressCrossDomainErrors)
                      throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
                  }
                  return s;
                }),
                (e._applyFilters = function () {
                  if (
                    this.filters &&
                    0 != this.filters.length &&
                    this.cacheCanvas
                  )
                    for (
                      var t = this.filters.length,
                        e = this.cacheCanvas.getContext("2d"),
                        s = this.cacheCanvas.width,
                        i = this.cacheCanvas.height,
                        n = 0;
                      t > n;
                      n++
                    )
                      this.filters[n].applyFilter(e, 0, 0, s, i);
                }),
                (e._getFilterBounds = function () {
                  var t,
                    e = this.filters,
                    s = this._rectangle.setValues(0, 0, 0, 0);
                  if (!e || !(t = e.length)) return s;
                  for (var i = 0; t > i; i++) {
                    var n = this.filters[i];
                    n.getBounds && n.getBounds(s);
                  }
                  return s;
                }),
                (e._getBounds = function (t, e) {
                  return this._transformBounds(this.getBounds(), t, e);
                }),
                (e._transformBounds = function (t, e, s) {
                  if (!t) return t;
                  var i = t.x,
                    n = t.y,
                    r = t.width,
                    o = t.height,
                    a = this._props.matrix;
                  (a = s ? a.identity() : this.getMatrix(a)),
                    (i || n) && a.appendTransform(0, 0, 1, 1, 0, 0, 0, -i, -n),
                    e && a.prependMatrix(e);
                  var h = r * a.a,
                    l = r * a.b,
                    c = o * a.c,
                    u = o * a.d,
                    d = a.tx,
                    p = a.ty,
                    f = d,
                    g = d,
                    m = p,
                    v = p;
                  return (
                    (i = h + d) < f ? (f = i) : i > g && (g = i),
                    (i = h + c + d) < f ? (f = i) : i > g && (g = i),
                    (i = c + d) < f ? (f = i) : i > g && (g = i),
                    (n = l + p) < m ? (m = n) : n > v && (v = n),
                    (n = l + u + p) < m ? (m = n) : n > v && (v = n),
                    (n = u + p) < m ? (m = n) : n > v && (v = n),
                    t.setValues(f, m, g - f, v - m)
                  );
                }),
                (e._hasMouseEventListener = function () {
                  for (var e = t._MOUSE_EVENTS, s = 0, i = e.length; i > s; s++)
                    if (this.hasEventListener(e[s])) return !0;
                  return !!this.cursor;
                }),
                (createjs.DisplayObject = createjs.promote(t, "EventDispatcher"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                this.DisplayObject_constructor(),
                  (this.children = []),
                  (this.mouseChildren = !0),
                  (this.tickChildren = !0);
              }
              var e = createjs.extend(t, createjs.DisplayObject);
              e.getNumChildren = function () {
                return this.children.length;
              };
              try {
                Object.defineProperties(e, {
                  numChildren: { get: e.getNumChildren },
                });
              } catch (t) {}
              (e.initialize = t),
                (e.isVisible = function () {
                  var t = this.cacheCanvas || this.children.length;
                  return !!(
                    this.visible &&
                    this.alpha > 0 &&
                    0 != this.scaleX &&
                    0 != this.scaleY &&
                    t
                  );
                }),
                (e.draw = function (t, e) {
                  if (this.DisplayObject_draw(t, e)) return !0;
                  for (
                    var s = this.children.slice(), i = 0, n = s.length;
                    n > i;
                    i++
                  ) {
                    var r = s[i];
                    r.isVisible() &&
                      (t.save(), r.updateContext(t), r.draw(t), t.restore());
                  }
                  return !0;
                }),
                (e.addChild = function (t) {
                  if (null == t) return t;
                  var e = arguments.length;
                  if (e > 1) {
                    for (var s = 0; e > s; s++) this.addChild(arguments[s]);
                    return arguments[e - 1];
                  }
                  return (
                    t.parent && t.parent.removeChild(t),
                    (t.parent = this),
                    this.children.push(t),
                    t.dispatchEvent("added"),
                    t
                  );
                }),
                (e.addChildAt = function (t, e) {
                  var s = arguments.length,
                    i = arguments[s - 1];
                  if (0 > i || i > this.children.length) return arguments[s - 2];
                  if (s > 2) {
                    for (var n = 0; s - 1 > n; n++)
                      this.addChildAt(arguments[n], i + n);
                    return arguments[s - 2];
                  }
                  return (
                    t.parent && t.parent.removeChild(t),
                    (t.parent = this),
                    this.children.splice(e, 0, t),
                    t.dispatchEvent("added"),
                    t
                  );
                }),
                (e.removeChild = function (t) {
                  var e = arguments.length;
                  if (e > 1) {
                    for (var s = !0, i = 0; e > i; i++)
                      s = s && this.removeChild(arguments[i]);
                    return s;
                  }
                  return this.removeChildAt(createjs.indexOf(this.children, t));
                }),
                (e.removeChildAt = function (t) {
                  var e = arguments.length;
                  if (e > 1) {
                    for (var s = [], i = 0; e > i; i++) s[i] = arguments[i];
                    s.sort(function (t, e) {
                      return e - t;
                    });
                    var n = !0;
                    for (i = 0; e > i; i++) n = n && this.removeChildAt(s[i]);
                    return n;
                  }
                  if (0 > t || t > this.children.length - 1) return !1;
                  var r = this.children[t];
                  return (
                    r && (r.parent = null),
                    this.children.splice(t, 1),
                    r.dispatchEvent("removed"),
                    !0
                  );
                }),
                (e.removeAllChildren = function () {
                  for (var t = this.children; t.length; ) this.removeChildAt(0);
                }),
                (e.getChildAt = function (t) {
                  return this.children[t];
                }),
                (e.getChildByName = function (t) {
                  for (var e = this.children, s = 0, i = e.length; i > s; s++)
                    if (e[s].name == t) return e[s];
                  return null;
                }),
                (e.sortChildren = function (t) {
                  this.children.sort(t);
                }),
                (e.getChildIndex = function (t) {
                  return createjs.indexOf(this.children, t);
                }),
                (e.swapChildrenAt = function (t, e) {
                  var s = this.children,
                    i = s[t],
                    n = s[e];
                  i && n && ((s[t] = n), (s[e] = i));
                }),
                (e.swapChildren = function (t, e) {
                  for (
                    var s, i, n = this.children, r = 0, o = n.length;
                    o > r &&
                    (n[r] == t && (s = r),
                    n[r] == e && (i = r),
                    null == s || null == i);
                    r++
                  );
                  r != o && ((n[s] = e), (n[i] = t));
                }),
                (e.setChildIndex = function (t, e) {
                  var s = this.children,
                    i = s.length;
                  if (!(t.parent != this || 0 > e || e >= i)) {
                    for (var n = 0; i > n && s[n] != t; n++);
                    n != i && n != e && (s.splice(n, 1), s.splice(e, 0, t));
                  }
                }),
                (e.contains = function (t) {
                  for (; t; ) {
                    if (t == this) return !0;
                    t = t.parent;
                  }
                  return !1;
                }),
                (e.hitTest = function (t, e) {
                  return null != this.getObjectUnderPoint(t, e);
                }),
                (e.getObjectsUnderPoint = function (t, e, s) {
                  var i = [],
                    n = this.localToGlobal(t, e);
                  return (
                    this._getObjectsUnderPoint(n.x, n.y, i, s > 0, 1 == s), i
                  );
                }),
                (e.getObjectUnderPoint = function (t, e, s) {
                  var i = this.localToGlobal(t, e);
                  return this._getObjectsUnderPoint(
                    i.x,
                    i.y,
                    null,
                    s > 0,
                    1 == s
                  );
                }),
                (e.getBounds = function () {
                  return this._getBounds(null, !0);
                }),
                (e.getTransformedBounds = function () {
                  return this._getBounds();
                }),
                (e.clone = function (e) {
                  var s = this._cloneProps(new t());
                  return e && this._cloneChildren(s), s;
                }),
                (e.toString = function () {
                  return "[Container (name=" + this.name + ")]";
                }),
                (e._tick = function (t) {
                  if (this.tickChildren)
                    for (var e = this.children.length - 1; e >= 0; e--) {
                      var s = this.children[e];
                      s.tickEnabled && s._tick && s._tick(t);
                    }
                  this.DisplayObject__tick(t);
                }),
                (e._cloneChildren = function (t) {
                  t.children.length && t.removeAllChildren();
                  for (
                    var e = t.children, s = 0, i = this.children.length;
                    i > s;
                    s++
                  ) {
                    var n = this.children[s].clone(!0);
                    (n.parent = t), e.push(n);
                  }
                }),
                (e._getObjectsUnderPoint = function (e, s, i, n, r, o) {
                  if (!(o = o || 0) && !this._testMask(this, e, s)) return null;
                  var a,
                    h = createjs.DisplayObject._hitTestContext;
                  r = r || (n && this._hasMouseEventListener());
                  for (var l = this.children, c = l.length - 1; c >= 0; c--) {
                    var u = l[c],
                      d = u.hitArea;
                    if (
                      u.visible &&
                      (d || u.isVisible()) &&
                      (!n || u.mouseEnabled) &&
                      (d || this._testMask(u, e, s))
                    )
                      if (!d && u instanceof t) {
                        var p = u._getObjectsUnderPoint(e, s, i, n, r, o + 1);
                        if (!i && p) return n && !this.mouseChildren ? this : p;
                      } else {
                        if (n && !r && !u._hasMouseEventListener()) continue;
                        var f = u.getConcatenatedDisplayProps(u._props);
                        if (
                          ((a = f.matrix),
                          d &&
                            (a.appendMatrix(d.getMatrix(d._props.matrix)),
                            (f.alpha = d.alpha)),
                          (h.globalAlpha = f.alpha),
                          h.setTransform(a.a, a.b, a.c, a.d, a.tx - e, a.ty - s),
                          (d || u).draw(h),
                          !this._testHit(h))
                        )
                          continue;
                        if (
                          (h.setTransform(1, 0, 0, 1, 0, 0),
                          h.clearRect(0, 0, 2, 2),
                          !i)
                        )
                          return n && !this.mouseChildren ? this : u;
                        i.push(u);
                      }
                  }
                  return null;
                }),
                (e._testMask = function (t, e, s) {
                  var i = t.mask;
                  if (!i || !i.graphics || i.graphics.isEmpty()) return !0;
                  var n = this._props.matrix,
                    r = t.parent;
                  (n = r ? r.getConcatenatedMatrix(n) : n.identity()),
                    (n = i.getMatrix(i._props.matrix).prependMatrix(n));
                  var o = createjs.DisplayObject._hitTestContext;
                  return (
                    o.setTransform(n.a, n.b, n.c, n.d, n.tx - e, n.ty - s),
                    i.graphics.drawAsPath(o),
                    (o.fillStyle = "#000"),
                    o.fill(),
                    !!this._testHit(o) &&
                      (o.setTransform(1, 0, 0, 1, 0, 0),
                      o.clearRect(0, 0, 2, 2),
                      !0)
                  );
                }),
                (e._getBounds = function (t, e) {
                  var s = this.DisplayObject_getBounds();
                  if (s) return this._transformBounds(s, t, e);
                  var i = this._props.matrix;
                  (i = e ? i.identity() : this.getMatrix(i)),
                    t && i.prependMatrix(t);
                  for (
                    var n = this.children.length, r = null, o = 0;
                    n > o;
                    o++
                  ) {
                    var a = this.children[o];
                    a.visible &&
                      (s = a._getBounds(i)) &&
                      (r
                        ? r.extend(s.x, s.y, s.width, s.height)
                        : (r = s.clone()));
                  }
                  return r;
                }),
                (createjs.Container = createjs.promote(t, "DisplayObject"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t) {
                this.Container_constructor(),
                  (this.autoClear = !0),
                  (this.canvas =
                    "string" == typeof t ? document.getElementById(t) : t),
                  (this.mouseX = 0),
                  (this.mouseY = 0),
                  (this.drawRect = null),
                  (this.snapToPixelEnabled = !1),
                  (this.mouseInBounds = !1),
                  (this.tickOnUpdate = !0),
                  (this.mouseMoveOutside = !1),
                  (this.preventSelection = !0),
                  (this._pointerData = {}),
                  (this._pointerCount = 0),
                  (this._primaryPointerID = null),
                  (this._mouseOverIntervalID = null),
                  (this._nextStage = null),
                  (this._prevStage = null),
                  this.enableDOMEvents(!0);
              }
              var e = createjs.extend(t, createjs.Container);
              (e._get_nextStage = function () {
                return this._nextStage;
              }),
                (e._set_nextStage = function (t) {
                  this._nextStage && (this._nextStage._prevStage = null),
                    t && (t._prevStage = this),
                    (this._nextStage = t);
                });
              try {
                Object.defineProperties(e, {
                  nextStage: { get: e._get_nextStage, set: e._set_nextStage },
                });
              } catch (t) {}
              (e.update = function (t) {
                if (
                  this.canvas &&
                  (this.tickOnUpdate && this.tick(t),
                  !this.dispatchEvent("drawstart"))
                ) {
                  createjs.DisplayObject._snapToPixelEnabled =
                    this.snapToPixelEnabled;
                  var e = this.drawRect,
                    s = this.canvas.getContext("2d");
                  s.setTransform(1, 0, 0, 1, 0, 0),
                    this.autoClear &&
                      (e
                        ? s.clearRect(e.x, e.y, e.width, e.height)
                        : s.clearRect(
                            0,
                            0,
                            this.canvas.width + 1,
                            this.canvas.height + 1
                          )),
                    s.save(),
                    this.drawRect &&
                      (s.beginPath(),
                      s.rect(e.x, e.y, e.width, e.height),
                      s.clip()),
                    this.updateContext(s),
                    this.draw(s, !1),
                    s.restore(),
                    this.dispatchEvent("drawend");
                }
              }),
                (e.tick = function (t) {
                  if (this.tickEnabled && !this.dispatchEvent("tickstart")) {
                    var e = new createjs.Event("tick");
                    if (t) for (var s in t) t.hasOwnProperty(s) && (e[s] = t[s]);
                    this._tick(e), this.dispatchEvent("tickend");
                  }
                }),
                (e.handleEvent = function (t) {
                  "tick" == t.type && this.update(t);
                }),
                (e.clear = function () {
                  if (this.canvas) {
                    var t = this.canvas.getContext("2d");
                    t.setTransform(1, 0, 0, 1, 0, 0),
                      t.clearRect(
                        0,
                        0,
                        this.canvas.width + 1,
                        this.canvas.height + 1
                      );
                  }
                }),
                (e.toDataURL = function (t, e) {
                  var s,
                    i = this.canvas.getContext("2d"),
                    n = this.canvas.width,
                    r = this.canvas.height;
                  if (t) {
                    s = i.getImageData(0, 0, n, r);
                    var o = i.globalCompositeOperation;
                    (i.globalCompositeOperation = "destination-over"),
                      (i.fillStyle = t),
                      i.fillRect(0, 0, n, r);
                  }
                  var a = this.canvas.toDataURL(e || "image/png");
                  return (
                    t &&
                      (i.putImageData(s, 0, 0), (i.globalCompositeOperation = o)),
                    a
                  );
                }),
                (e.enableMouseOver = function (t) {
                  if (
                    (this._mouseOverIntervalID &&
                      (clearInterval(this._mouseOverIntervalID),
                      (this._mouseOverIntervalID = null),
                      0 == t && this._testMouseOver(!0)),
                    null == t)
                  )
                    t = 20;
                  else if (0 >= t) return;
                  var e = this;
                  this._mouseOverIntervalID = setInterval(function () {
                    e._testMouseOver();
                  }, 1e3 / Math.min(50, t));
                }),
                (e.enableDOMEvents = function (t) {
                  null == t && (t = !0);
                  var e,
                    s,
                    i = this._eventListeners;
                  if (!t && i) {
                    for (e in i) (s = i[e]).t.removeEventListener(e, s.f, !1);
                    this._eventListeners = null;
                  } else if (t && !i && this.canvas) {
                    var n = window.addEventListener ? window : document,
                      r = this;
                    for (e in (((i = this._eventListeners = {}).mouseup = {
                      t: n,
                      f: function (t) {
                        r._handleMouseUp(t);
                      },
                    }),
                    (i.mousemove = {
                      t: n,
                      f: function (t) {
                        r._handleMouseMove(t);
                      },
                    }),
                    (i.dblclick = {
                      t: this.canvas,
                      f: function (t) {
                        r._handleDoubleClick(t);
                      },
                    }),
                    (i.mousedown = {
                      t: this.canvas,
                      f: function (t) {
                        r._handleMouseDown(t);
                      },
                    }),
                    i))
                      (s = i[e]).t.addEventListener(e, s.f, !1);
                  }
                }),
                (e.clone = function () {
                  throw "Stage cannot be cloned.";
                }),
                (e.toString = function () {
                  return "[Stage (name=" + this.name + ")]";
                }),
                (e._getElementRect = function (t) {
                  var e;
                  try {
                    e = t.getBoundingClientRect();
                  } catch (s) {
                    e = {
                      top: t.offsetTop,
                      left: t.offsetLeft,
                      width: t.offsetWidth,
                      height: t.offsetHeight,
                    };
                  }
                  var s =
                      (window.pageXOffset || document.scrollLeft || 0) -
                      (document.clientLeft || document.body.clientLeft || 0),
                    i =
                      (window.pageYOffset || document.scrollTop || 0) -
                      (document.clientTop || document.body.clientTop || 0),
                    n = window.getComputedStyle
                      ? getComputedStyle(t, null)
                      : t.currentStyle,
                    r = parseInt(n.paddingLeft) + parseInt(n.borderLeftWidth),
                    o = parseInt(n.paddingTop) + parseInt(n.borderTopWidth),
                    a = parseInt(n.paddingRight) + parseInt(n.borderRightWidth),
                    h = parseInt(n.paddingBottom) + parseInt(n.borderBottomWidth);
                  return {
                    left: e.left + s + r,
                    right: e.right + s - a,
                    top: e.top + i + o,
                    bottom: e.bottom + i - h,
                  };
                }),
                (e._getPointerData = function (t) {
                  var e = this._pointerData[t];
                  return e || (e = this._pointerData[t] = { x: 0, y: 0 }), e;
                }),
                (e._handleMouseMove = function (t) {
                  t || (t = window.event),
                    this._handlePointerMove(-1, t, t.pageX, t.pageY);
                }),
                (e._handlePointerMove = function (t, e, s, i, n) {
                  if ((!this._prevStage || void 0 !== n) && this.canvas) {
                    var r = this._nextStage,
                      o = this._getPointerData(t),
                      a = o.inBounds;
                    this._updatePointerPosition(t, e, s, i),
                      (a || o.inBounds || this.mouseMoveOutside) &&
                        (-1 === t &&
                          o.inBounds == !a &&
                          this._dispatchMouseEvent(
                            this,
                            a ? "mouseleave" : "mouseenter",
                            !1,
                            t,
                            o,
                            e
                          ),
                        this._dispatchMouseEvent(
                          this,
                          "stagemousemove",
                          !1,
                          t,
                          o,
                          e
                        ),
                        this._dispatchMouseEvent(
                          o.target,
                          "pressmove",
                          !0,
                          t,
                          o,
                          e
                        )),
                      r && r._handlePointerMove(t, e, s, i, null);
                  }
                }),
                (e._updatePointerPosition = function (t, e, s, i) {
                  var n = this._getElementRect(this.canvas);
                  (s -= n.left), (i -= n.top);
                  var r = this.canvas.width,
                    o = this.canvas.height;
                  (s /= (n.right - n.left) / r), (i /= (n.bottom - n.top) / o);
                  var a = this._getPointerData(t);
                  (a.inBounds = s >= 0 && i >= 0 && r - 1 >= s && o - 1 >= i)
                    ? ((a.x = s), (a.y = i))
                    : this.mouseMoveOutside &&
                      ((a.x = 0 > s ? 0 : s > r - 1 ? r - 1 : s),
                      (a.y = 0 > i ? 0 : i > o - 1 ? o - 1 : i)),
                    (a.posEvtObj = e),
                    (a.rawX = s),
                    (a.rawY = i),
                    (t === this._primaryPointerID || -1 === t) &&
                      ((this.mouseX = a.x),
                      (this.mouseY = a.y),
                      (this.mouseInBounds = a.inBounds));
                }),
                (e._handleMouseUp = function (t) {
                  this._handlePointerUp(-1, t, !1);
                }),
                (e._handlePointerUp = function (t, e, s, i) {
                  var n = this._nextStage,
                    r = this._getPointerData(t);
                  if (!this._prevStage || void 0 !== i) {
                    r.down &&
                      this._dispatchMouseEvent(this, "stagemouseup", !1, t, r, e),
                      (r.down = !1);
                    var o = null,
                      a = r.target;
                    i ||
                      (!a && !n) ||
                      (o = this._getObjectsUnderPoint(r.x, r.y, null, !0)),
                      o == a && this._dispatchMouseEvent(a, "click", !0, t, r, e),
                      this._dispatchMouseEvent(a, "pressup", !0, t, r, e),
                      s
                        ? (t == this._primaryPointerID &&
                            (this._primaryPointerID = null),
                          delete this._pointerData[t])
                        : (r.target = null),
                      n && n._handlePointerUp(t, e, s, i || (o && this));
                  }
                }),
                (e._handleMouseDown = function (t) {
                  this._handlePointerDown(-1, t, t.pageX, t.pageY);
                }),
                (e._handlePointerDown = function (t, e, s, i, n) {
                  this.preventSelection && e.preventDefault(),
                    (null == this._primaryPointerID || -1 === t) &&
                      (this._primaryPointerID = t),
                    null != i && this._updatePointerPosition(t, e, s, i);
                  var r = null,
                    o = this._nextStage,
                    a = this._getPointerData(t);
                  a.inBounds &&
                    (this._dispatchMouseEvent(
                      this,
                      "stagemousedown",
                      !1,
                      t,
                      a,
                      e
                    ),
                    (a.down = !0)),
                    n ||
                      ((r = a.target =
                        this._getObjectsUnderPoint(a.x, a.y, null, !0)),
                      this._dispatchMouseEvent(
                        a.target,
                        "mousedown",
                        !0,
                        t,
                        a,
                        e
                      )),
                    o && o._handlePointerDown(t, e, s, i, n || (r && this));
                }),
                (e._testMouseOver = function (t, e, s) {
                  if (!this._prevStage || void 0 !== e) {
                    var i = this._nextStage;
                    if (!this._mouseOverIntervalID)
                      return void (i && i._testMouseOver(t, e, s));
                    var n = this._getPointerData(-1);
                    if (
                      n &&
                      (t ||
                        this.mouseX != this._mouseOverX ||
                        this.mouseY != this._mouseOverY ||
                        !this.mouseInBounds)
                    ) {
                      var r,
                        o,
                        a,
                        h = n.posEvtObj,
                        l = s || (h && h.target == this.canvas),
                        c = null,
                        u = -1,
                        d = "";
                      !e &&
                        (t || (this.mouseInBounds && l)) &&
                        ((c = this._getObjectsUnderPoint(
                          this.mouseX,
                          this.mouseY,
                          null,
                          !0
                        )),
                        (this._mouseOverX = this.mouseX),
                        (this._mouseOverY = this.mouseY));
                      var p = this._mouseOverTarget || [],
                        f = p[p.length - 1],
                        g = (this._mouseOverTarget = []);
                      for (r = c; r; )
                        g.unshift(r),
                          null != r.cursor && (d = r.cursor),
                          (r = r.parent);
                      for (
                        this.canvas.style.cursor = d,
                          !e && s && (s.canvas.style.cursor = d),
                          o = 0,
                          a = g.length;
                        a > o && g[o] == p[o];
                        o++
                      )
                        u = o;
                      for (
                        f != c &&
                          this._dispatchMouseEvent(f, "mouseout", !0, -1, n, h),
                          o = p.length - 1;
                        o > u;
                        o--
                      )
                        this._dispatchMouseEvent(p[o], "rollout", !1, -1, n, h);
                      for (o = g.length - 1; o > u; o--)
                        this._dispatchMouseEvent(g[o], "rollover", !1, -1, n, h);
                      f != c &&
                        this._dispatchMouseEvent(c, "mouseover", !0, -1, n, h),
                        i &&
                          i._testMouseOver(t, e || (c && this), s || (l && this));
                    }
                  }
                }),
                (e._handleDoubleClick = function (t, e) {
                  var s = null,
                    i = this._nextStage,
                    n = this._getPointerData(-1);
                  e ||
                    ((s = this._getObjectsUnderPoint(n.x, n.y, null, !0)),
                    this._dispatchMouseEvent(s, "dblclick", !0, -1, n, t)),
                    i && i._handleDoubleClick(t, e || (s && this));
                }),
                (e._dispatchMouseEvent = function (t, e, s, i, n, r) {
                  if (t && (s || t.hasEventListener(e))) {
                    var o = new createjs.MouseEvent(
                      e,
                      s,
                      !1,
                      n.x,
                      n.y,
                      r,
                      i,
                      i === this._primaryPointerID || -1 === i,
                      n.rawX,
                      n.rawY
                    );
                    t.dispatchEvent(o);
                  }
                }),
                (createjs.Stage = createjs.promote(t, "Container"));
            })(),
            (this.o = this.o || {}),
            (function () {
              function t(t) {
                this.DisplayObject_constructor(),
                  "string" == typeof t
                    ? ((this.image = document.createElement("img")),
                      (this.image.src = t))
                    : (this.image = t),
                  (this.sourceRect = null);
              }
              var e = createjs.extend(t, createjs.DisplayObject);
              (e.initialize = t),
                (e.isVisible = function () {
                  var t =
                    this.cacheCanvas ||
                    (this.image &&
                      (this.image.complete ||
                        this.image.getContext ||
                        this.image.readyState >= 2));
                  return !!(
                    this.visible &&
                    this.alpha > 0 &&
                    0 != this.scaleX &&
                    0 != this.scaleY &&
                    t
                  );
                }),
                (e.draw = function (t, e) {
                  if (this.DisplayObject_draw(t, e) || !this.image) return !0;
                  var s = this.image,
                    i = this.sourceRect;
                  if (i) {
                    var n = i.x,
                      r = i.y,
                      o = n + i.width,
                      a = r + i.height,
                      h = 0,
                      l = 0,
                      c = s.width,
                      u = s.height;
                    0 > n && ((h -= n), (n = 0)),
                      o > c && (o = c),
                      0 > r && ((l -= r), (r = 0)),
                      a > u && (a = u),
                      t.drawImage(s, n, r, o - n, a - r, h, l, o - n, a - r);
                  } else t.drawImage(s, 0, 0);
                  return !0;
                }),
                (e.getBounds = function () {
                  var t = this.DisplayObject_getBounds();
                  if (t) return t;
                  var e = this.sourceRect || this.image;
                  return this.image &&
                    (this.image.complete ||
                      this.image.getContext ||
                      this.image.readyState >= 2)
                    ? this._rectangle.setValues(0, 0, e.width, e.height)
                    : null;
                }),
                (e.clone = function () {
                  var e = new t(this.image);
                  return (
                    this.sourceRect && (e.sourceRect = this.sourceRect.clone()),
                    this._cloneProps(e),
                    e
                  );
                }),
                (e.toString = function () {
                  return "[Bitmap (name=" + this.name + ")]";
                }),
                (createjs.Bitmap = createjs.promote(t, "DisplayObject"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e) {
                this.DisplayObject_constructor(),
                  (this.currentFrame = 0),
                  (this.currentAnimation = null),
                  (this.paused = !0),
                  (this.spriteSheet = t),
                  (this.currentAnimationFrame = 0),
                  (this.framerate = 0),
                  (this._animation = null),
                  (this._currentFrame = null),
                  (this._skipAdvance = !1),
                  e && this.gotoAndPlay(e);
              }
              var e = createjs.extend(t, createjs.DisplayObject);
              (e.isVisible = function () {
                var t = this.cacheCanvas || this.spriteSheet.complete;
                return !!(
                  this.visible &&
                  this.alpha > 0 &&
                  0 != this.scaleX &&
                  0 != this.scaleY &&
                  t
                );
              }),
                (e.draw = function (t, e) {
                  if (this.DisplayObject_draw(t, e)) return !0;
                  this._normalizeFrame();
                  var s = this.spriteSheet.getFrame(0 | this._currentFrame);
                  if (!s) return !1;
                  var i = s.rect;
                  return (
                    i.width &&
                      i.height &&
                      t.drawImage(
                        s.image,
                        i.x,
                        i.y,
                        i.width,
                        i.height,
                        -s.regX,
                        -s.regY,
                        i.width,
                        i.height
                      ),
                    !0
                  );
                }),
                (e.play = function () {
                  this.paused = !1;
                }),
                (e.stop = function () {
                  this.paused = !0;
                }),
                (e.gotoAndPlay = function (t) {
                  (this.paused = !1), (this._skipAdvance = !0), this._goto(t);
                }),
                (e.gotoAndStop = function (t) {
                  (this.paused = !0), this._goto(t);
                }),
                (e.advance = function (t) {
                  var e = this.framerate || this.spriteSheet.framerate,
                    s = e && null != t ? t / (1e3 / e) : 1;
                  this._normalizeFrame(s);
                }),
                (e.getBounds = function () {
                  return (
                    this.DisplayObject_getBounds() ||
                    this.spriteSheet.getFrameBounds(
                      this.currentFrame,
                      this._rectangle
                    )
                  );
                }),
                (e.clone = function () {
                  return this._cloneProps(new t(this.spriteSheet));
                }),
                (e.toString = function () {
                  return "[Sprite (name=" + this.name + ")]";
                }),
                (e._cloneProps = function (t) {
                  return (
                    this.DisplayObject__cloneProps(t),
                    (t.currentFrame = this.currentFrame),
                    (t.currentAnimation = this.currentAnimation),
                    (t.paused = this.paused),
                    (t.currentAnimationFrame = this.currentAnimationFrame),
                    (t.framerate = this.framerate),
                    (t._animation = this._animation),
                    (t._currentFrame = this._currentFrame),
                    (t._skipAdvance = this._skipAdvance),
                    t
                  );
                }),
                (e._tick = function (t) {
                  this.paused ||
                    (this._skipAdvance || this.advance(t && t.delta),
                    (this._skipAdvance = !1)),
                    this.DisplayObject__tick(t);
                }),
                (e._normalizeFrame = function (t) {
                  t = t || 0;
                  var e,
                    s = this._animation,
                    i = this.paused,
                    n = this._currentFrame;
                  if (s) {
                    var r = s.speed || 1,
                      o = this.currentAnimationFrame;
                    if (o + t * r >= (e = s.frames.length)) {
                      var a = s.next;
                      if (this._dispatchAnimationEnd(s, n, i, a, e - 1)) return;
                      if (a) return this._goto(a, t - (e - o) / r);
                      (this.paused = !0), (o = s.frames.length - 1);
                    } else o += t * r;
                    (this.currentAnimationFrame = o),
                      (this._currentFrame = s.frames[0 | o]);
                  } else if (
                    (n = this._currentFrame += t) >=
                      (e = this.spriteSheet.getNumFrames()) &&
                    e > 0 &&
                    !this._dispatchAnimationEnd(s, n, i, e - 1) &&
                    (this._currentFrame -= e) >= e
                  )
                    return this._normalizeFrame();
                  (n = 0 | this._currentFrame),
                    this.currentFrame != n &&
                      ((this.currentFrame = n), this.dispatchEvent("change"));
                }),
                (e._dispatchAnimationEnd = function (t, e, s, i, n) {
                  var r = t ? t.name : null;
                  if (this.hasEventListener("animationend")) {
                    var o = new createjs.Event("animationend");
                    (o.name = r), (o.next = i), this.dispatchEvent(o);
                  }
                  var a = this._animation != t || this._currentFrame != e;
                  return (
                    a ||
                      s ||
                      !this.paused ||
                      ((this.currentAnimationFrame = n), (a = !0)),
                    a
                  );
                }),
                (e._goto = function (t, e) {
                  if (((this.currentAnimationFrame = 0), isNaN(t))) {
                    var s = this.spriteSheet.getAnimation(t);
                    s &&
                      ((this._animation = s),
                      (this.currentAnimation = t),
                      this._normalizeFrame(e));
                  } else
                    (this.currentAnimation = this._animation = null),
                      (this._currentFrame = t),
                      this._normalizeFrame();
                }),
                (createjs.Sprite = createjs.promote(t, "DisplayObject"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t) {
                this.DisplayObject_constructor(),
                  (this.graphics = t || new createjs.Graphics());
              }
              var e = createjs.extend(t, createjs.DisplayObject);
              (e.isVisible = function () {
                var t =
                  this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
                return !!(
                  this.visible &&
                  this.alpha > 0 &&
                  0 != this.scaleX &&
                  0 != this.scaleY &&
                  t
                );
              }),
                (e.draw = function (t, e) {
                  return (
                    this.DisplayObject_draw(t, e) || this.graphics.draw(t, this),
                    !0
                  );
                }),
                (e.clone = function (e) {
                  var s =
                    e && this.graphics ? this.graphics.clone() : this.graphics;
                  return this._cloneProps(new t(s));
                }),
                (e.toString = function () {
                  return "[Shape (name=" + this.name + ")]";
                }),
                (createjs.Shape = createjs.promote(t, "DisplayObject"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s) {
                this.DisplayObject_constructor(),
                  (this.text = t),
                  (this.font = e),
                  (this.color = s),
                  (this.textAlign = "left"),
                  (this.textBaseline = "top"),
                  (this.maxWidth = null),
                  (this.outline = 0),
                  (this.lineHeight = 0),
                  (this.lineWidth = null);
              }
              var e = createjs.extend(t, createjs.DisplayObject),
                s = createjs.createCanvas
                  ? createjs.createCanvas()
                  : document.createElement("canvas");
              s.getContext &&
                ((t._workingContext = s.getContext("2d")),
                (s.width = s.height = 1)),
                (t.H_OFFSETS = {
                  start: 0,
                  left: 0,
                  center: -0.5,
                  end: -1,
                  right: -1,
                }),
                (t.V_OFFSETS = {
                  top: 0,
                  hanging: -0.01,
                  middle: -0.4,
                  alphabetic: -0.8,
                  ideographic: -0.85,
                  bottom: -1,
                }),
                (e.isVisible = function () {
                  var t =
                    this.cacheCanvas || (null != this.text && "" !== this.text);
                  return !!(
                    this.visible &&
                    this.alpha > 0 &&
                    0 != this.scaleX &&
                    0 != this.scaleY &&
                    t
                  );
                }),
                (e.draw = function (t, e) {
                  if (this.DisplayObject_draw(t, e)) return !0;
                  var s = this.color || "#000";
                  return (
                    this.outline
                      ? ((t.strokeStyle = s), (t.lineWidth = 1 * this.outline))
                      : (t.fillStyle = s),
                    this._drawText(this._prepContext(t)),
                    !0
                  );
                }),
                (e.getMeasuredWidth = function () {
                  return this._getMeasuredWidth(this.text);
                }),
                (e.getMeasuredLineHeight = function () {
                  return 1.2 * this._getMeasuredWidth("M");
                }),
                (e.getMeasuredHeight = function () {
                  return this._drawText(null, {}).height;
                }),
                (e.getBounds = function () {
                  var e = this.DisplayObject_getBounds();
                  if (e) return e;
                  if (null == this.text || "" == this.text) return null;
                  var s = this._drawText(null, {}),
                    i =
                      this.maxWidth && this.maxWidth < s.width
                        ? this.maxWidth
                        : s.width,
                    n = i * t.H_OFFSETS[this.textAlign || "left"],
                    r =
                      (this.lineHeight || this.getMeasuredLineHeight()) *
                      t.V_OFFSETS[this.textBaseline || "top"];
                  return this._rectangle.setValues(n, r, i, s.height);
                }),
                (e.getMetrics = function () {
                  var e = { lines: [] };
                  return (
                    (e.lineHeight =
                      this.lineHeight || this.getMeasuredLineHeight()),
                    (e.vOffset =
                      e.lineHeight * t.V_OFFSETS[this.textBaseline || "top"]),
                    this._drawText(null, e, e.lines)
                  );
                }),
                (e.clone = function () {
                  return this._cloneProps(
                    new t(this.text, this.font, this.color)
                  );
                }),
                (e.toString = function () {
                  return (
                    "[Text (text=" +
                    (this.text.length > 20
                      ? this.text.substr(0, 17) + "..."
                      : this.text) +
                    ")]"
                  );
                }),
                (e._cloneProps = function (t) {
                  return (
                    this.DisplayObject__cloneProps(t),
                    (t.textAlign = this.textAlign),
                    (t.textBaseline = this.textBaseline),
                    (t.maxWidth = this.maxWidth),
                    (t.outline = this.outline),
                    (t.lineHeight = this.lineHeight),
                    (t.lineWidth = this.lineWidth),
                    t
                  );
                }),
                (e._prepContext = function (t) {
                  return (
                    (t.font = this.font || "10px sans-serif"),
                    (t.textAlign = this.textAlign || "left"),
                    (t.textBaseline = this.textBaseline || "top"),
                    t
                  );
                }),
                (e._drawText = function (e, s, i) {
                  var n = !!e;
                  n || ((e = t._workingContext).save(), this._prepContext(e));
                  for (
                    var r = this.lineHeight || this.getMeasuredLineHeight(),
                      o = 0,
                      a = 0,
                      h = String(this.text).split(/(?:\r\n|\r|\n)/),
                      l = 0,
                      c = h.length;
                    c > l;
                    l++
                  ) {
                    var u = h[l],
                      d = null;
                    if (
                      null != this.lineWidth &&
                      (d = e.measureText(u).width) > this.lineWidth
                    ) {
                      var p = u.split(/(\s)/);
                      (u = p[0]), (d = e.measureText(u).width);
                      for (var f = 1, g = p.length; g > f; f += 2) {
                        var m = e.measureText(p[f] + p[f + 1]).width;
                        d + m > this.lineWidth
                          ? (n && this._drawTextLine(e, u, a * r),
                            i && i.push(u),
                            d > o && (o = d),
                            (u = p[f + 1]),
                            (d = e.measureText(u).width),
                            a++)
                          : ((u += p[f] + p[f + 1]), (d += m));
                      }
                    }
                    n && this._drawTextLine(e, u, a * r),
                      i && i.push(u),
                      s && null == d && (d = e.measureText(u).width),
                      d > o && (o = d),
                      a++;
                  }
                  return (
                    s && ((s.width = o), (s.height = a * r)), n || e.restore(), s
                  );
                }),
                (e._drawTextLine = function (t, e, s) {
                  this.outline
                    ? t.strokeText(e, 0, s, this.maxWidth || 65535)
                    : t.fillText(e, 0, s, this.maxWidth || 65535);
                }),
                (e._getMeasuredWidth = function (e) {
                  var s = t._workingContext;
                  s.save();
                  var i = this._prepContext(s).measureText(e).width;
                  return s.restore(), i;
                }),
                (createjs.Text = createjs.promote(t, "DisplayObject"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e) {
                this.Container_constructor(),
                  (this.text = t || ""),
                  (this.spriteSheet = e),
                  (this.lineHeight = 0),
                  (this.letterSpacing = 0),
                  (this.spaceWidth = 0),
                  (this._oldProps = {
                    text: 0,
                    spriteSheet: 0,
                    lineHeight: 0,
                    letterSpacing: 0,
                    spaceWidth: 0,
                  });
              }
              var e = createjs.extend(t, createjs.Container);
              (t.maxPoolSize = 100),
                (t._spritePool = []),
                (e.draw = function (t, e) {
                  this.DisplayObject_draw(t, e) ||
                    (this._updateText(), this.Container_draw(t, e));
                }),
                (e.getBounds = function () {
                  return this._updateText(), this.Container_getBounds();
                }),
                (e.isVisible = function () {
                  var t =
                    this.cacheCanvas ||
                    (this.spriteSheet && this.spriteSheet.complete && this.text);
                  return !!(
                    this.visible &&
                    this.alpha > 0 &&
                    0 !== this.scaleX &&
                    0 !== this.scaleY &&
                    t
                  );
                }),
                (e.clone = function () {
                  return this._cloneProps(new t(this.text, this.spriteSheet));
                }),
                (e.addChild =
                  e.addChildAt =
                  e.removeChild =
                  e.removeChildAt =
                  e.removeAllChildren =
                    function () {}),
                (e._cloneProps = function (t) {
                  return (
                    this.DisplayObject__cloneProps(t),
                    (t.lineHeight = this.lineHeight),
                    (t.letterSpacing = this.letterSpacing),
                    (t.spaceWidth = this.spaceWidth),
                    t
                  );
                }),
                (e._getFrameIndex = function (t, e) {
                  var s,
                    i = e.getAnimation(t);
                  return (
                    i ||
                      (t != (s = t.toUpperCase()) ||
                        t != (s = t.toLowerCase()) ||
                        (s = null),
                      s && (i = e.getAnimation(s))),
                    i && i.frames[0]
                  );
                }),
                (e._getFrame = function (t, e) {
                  var s = this._getFrameIndex(t, e);
                  return null == s ? s : e.getFrame(s);
                }),
                (e._getLineHeight = function (t) {
                  var e =
                    this._getFrame("1", t) ||
                    this._getFrame("T", t) ||
                    this._getFrame("L", t) ||
                    t.getFrame(0);
                  return e ? e.rect.height : 1;
                }),
                (e._getSpaceWidth = function (t) {
                  var e =
                    this._getFrame("1", t) ||
                    this._getFrame("l", t) ||
                    this._getFrame("e", t) ||
                    this._getFrame("a", t) ||
                    t.getFrame(0);
                  return e ? e.rect.width : 1;
                }),
                (e._updateText = function () {
                  var e,
                    s = 0,
                    i = 0,
                    n = this._oldProps,
                    r = !1,
                    o = this.spaceWidth,
                    a = this.lineHeight,
                    h = this.spriteSheet,
                    l = t._spritePool,
                    c = this.children,
                    u = 0,
                    d = c.length;
                  for (var p in n)
                    n[p] != this[p] && ((n[p] = this[p]), (r = !0));
                  if (r) {
                    var f = !!this._getFrame(" ", h);
                    f || o || (o = this._getSpaceWidth(h)),
                      a || (a = this._getLineHeight(h));
                    for (var g = 0, m = this.text.length; m > g; g++) {
                      var v = this.text.charAt(g);
                      if (" " != v || f)
                        if ("\n" != v && "\r" != v) {
                          var y = this._getFrameIndex(v, h);
                          null != y &&
                            (d > u
                              ? (e = c[u])
                              : (c.push(
                                  (e = l.length ? l.pop() : new createjs.Sprite())
                                ),
                                (e.parent = this),
                                d++),
                            (e.spriteSheet = h),
                            e.gotoAndStop(y),
                            (e.x = s),
                            (e.y = i),
                            u++,
                            (s += e.getBounds().width + this.letterSpacing));
                        } else
                          "\r" == v && "\n" == this.text.charAt(g + 1) && g++,
                            (s = 0),
                            (i += a);
                      else s += o;
                    }
                    for (; d > u; ) l.push((e = c.pop())), (e.parent = null), d--;
                    l.length > t.maxPoolSize && (l.length = t.maxPoolSize);
                  }
                }),
                (createjs.BitmapText = createjs.promote(t, "Container"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                throw "SpriteSheetUtils cannot be instantiated";
              }
              var e = createjs.createCanvas
                ? createjs.createCanvas()
                : document.createElement("canvas");
              e.getContext &&
                ((t._workingCanvas = e),
                (t._workingContext = e.getContext("2d")),
                (e.width = e.height = 1)),
                (t.addFlippedFrames = function (e, s, i, n) {
                  if (s || i || n) {
                    var r = 0;
                    s && t._flip(e, ++r, !0, !1),
                      i && t._flip(e, ++r, !1, !0),
                      n && t._flip(e, ++r, !0, !0);
                  }
                }),
                (t.extractFrame = function (e, s) {
                  isNaN(s) && (s = e.getAnimation(s).frames[0]);
                  var i = e.getFrame(s);
                  if (!i) return null;
                  var n = i.rect,
                    r = t._workingCanvas;
                  (r.width = n.width),
                    (r.height = n.height),
                    t._workingContext.drawImage(
                      i.image,
                      n.x,
                      n.y,
                      n.width,
                      n.height,
                      0,
                      0,
                      n.width,
                      n.height
                    );
                  var o = document.createElement("img");
                  return (o.src = r.toDataURL("image/png")), o;
                }),
                (t.mergeAlpha = function (t, e, s) {
                  s ||
                    (s = createjs.createCanvas
                      ? createjs.createCanvas()
                      : document.createElement("canvas")),
                    (s.width = Math.max(e.width, t.width)),
                    (s.height = Math.max(e.height, t.height));
                  var i = s.getContext("2d");
                  return (
                    i.save(),
                    i.drawImage(t, 0, 0),
                    (i.globalCompositeOperation = "destination-in"),
                    i.drawImage(e, 0, 0),
                    i.restore(),
                    s
                  );
                }),
                (t._flip = function (e, s, i, n) {
                  for (
                    var r = e._images,
                      o = t._workingCanvas,
                      a = t._workingContext,
                      h = r.length / s,
                      l = 0;
                    h > l;
                    l++
                  ) {
                    var c = r[l];
                    (c.__tmp = l),
                      a.setTransform(1, 0, 0, 1, 0, 0),
                      a.clearRect(0, 0, o.width + 1, o.height + 1),
                      (o.width = c.width),
                      (o.height = c.height),
                      a.setTransform(
                        i ? -1 : 1,
                        0,
                        0,
                        n ? -1 : 1,
                        i ? c.width : 0,
                        n ? c.height : 0
                      ),
                      a.drawImage(c, 0, 0);
                    var u = document.createElement("img");
                    (u.src = o.toDataURL("image/png")),
                      (u.width = c.width),
                      (u.height = c.height),
                      r.push(u);
                  }
                  var d = e._frames,
                    p = d.length / s;
                  for (l = 0; p > l; l++) {
                    var f = (c = d[l]).rect.clone(),
                      g = {
                        image: (u = r[c.image.__tmp + h * s]),
                        rect: f,
                        regX: c.regX,
                        regY: c.regY,
                      };
                    i &&
                      ((f.x = u.width - f.x - f.width),
                      (g.regX = f.width - c.regX)),
                      n &&
                        ((f.y = u.height - f.y - f.height),
                        (g.regY = f.height - c.regY)),
                      d.push(g);
                  }
                  var m = "_" + (i ? "h" : "") + (n ? "v" : ""),
                    v = e._animations,
                    y = e._data,
                    w = v.length / s;
                  for (l = 0; w > l; l++) {
                    var x = v[l],
                      b = {
                        name: x + m,
                        speed: (c = y[x]).speed,
                        next: c.next,
                        frames: [],
                      };
                    c.next && (b.next += m);
                    for (var _ = 0, T = (d = c.frames).length; T > _; _++)
                      b.frames.push(d[_] + p * s);
                    (y[b.name] = b), v.push(b.name);
                  }
                }),
                (createjs.SpriteSheetUtils = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                this.EventDispatcher_constructor(),
                  (this.maxWidth = 2048),
                  (this.maxHeight = 2048),
                  (this.spriteSheet = null),
                  (this.scale = 1),
                  (this.padding = 1),
                  (this.timeSlice = 0.3),
                  (this.progress = -1),
                  (this._frames = []),
                  (this._animations = {}),
                  (this._data = null),
                  (this._nextFrameIndex = 0),
                  (this._index = 0),
                  (this._timerID = null),
                  (this._scale = 1);
              }
              var e = createjs.extend(t, createjs.EventDispatcher);
              (t.ERR_DIMENSIONS =
                "frame dimensions exceed max spritesheet dimensions"),
                (t.ERR_RUNNING = "a build is already running"),
                (e.addFrame = function (e, s, i, n, r) {
                  if (this._data) throw t.ERR_RUNNING;
                  var o = s || e.bounds || e.nominalBounds;
                  return (
                    !o && e.getBounds && (o = e.getBounds()),
                    o
                      ? ((i = i || 1),
                        this._frames.push({
                          source: e,
                          sourceRect: o,
                          scale: i,
                          funct: n,
                          data: r,
                          index: this._frames.length,
                          height: o.height * i,
                        }) - 1)
                      : null
                  );
                }),
                (e.addAnimation = function (e, s, i, n) {
                  if (this._data) throw t.ERR_RUNNING;
                  this._animations[e] = { frames: s, next: i, frequency: n };
                }),
                (e.addMovieClip = function (e, s, i, n, r, o) {
                  if (this._data) throw t.ERR_RUNNING;
                  var a = e.frameBounds,
                    h = s || e.bounds || e.nominalBounds;
                  if ((!h && e.getBounds && (h = e.getBounds()), h || a)) {
                    var l,
                      c,
                      u = this._frames.length,
                      d = e.timeline.duration;
                    for (l = 0; d > l; l++) {
                      var p = a && a[l] ? a[l] : h;
                      this.addFrame(e, p, i, this._setupMovieClipFrame, {
                        i: l,
                        f: n,
                        d: r,
                      });
                    }
                    var f = e.timeline._labels,
                      g = [];
                    for (var m in f) g.push({ index: f[m], label: m });
                    if (g.length)
                      for (
                        g.sort(function (t, e) {
                          return t.index - e.index;
                        }),
                          l = 0,
                          c = g.length;
                        c > l;
                        l++
                      ) {
                        for (
                          var v = g[l].label,
                            y = u + g[l].index,
                            w = u + (l == c - 1 ? d : g[l + 1].index),
                            x = [],
                            b = y;
                          w > b;
                          b++
                        )
                          x.push(b);
                        (!o || (v = o(v, e, y, w))) &&
                          this.addAnimation(v, x, !0);
                      }
                  }
                }),
                (e.build = function () {
                  if (this._data) throw t.ERR_RUNNING;
                  for (this._startBuild(); this._drawNext(); );
                  return this._endBuild(), this.spriteSheet;
                }),
                (e.buildAsync = function (e) {
                  if (this._data) throw t.ERR_RUNNING;
                  (this.timeSlice = e), this._startBuild();
                  var s = this;
                  this._timerID = setTimeout(function () {
                    s._run();
                  }, 50 -
                    50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)));
                }),
                (e.stopAsync = function () {
                  clearTimeout(this._timerID), (this._data = null);
                }),
                (e.clone = function () {
                  throw "SpriteSheetBuilder cannot be cloned.";
                }),
                (e.toString = function () {
                  return "[SpriteSheetBuilder]";
                }),
                (e._startBuild = function () {
                  var e = this.padding || 0;
                  (this.progress = 0),
                    (this.spriteSheet = null),
                    (this._index = 0),
                    (this._scale = this.scale);
                  var s = [];
                  this._data = {
                    images: [],
                    frames: s,
                    animations: this._animations,
                  };
                  var i = this._frames.slice();
                  if (
                    (i.sort(function (t, e) {
                      return t.height <= e.height ? -1 : 1;
                    }),
                    i[i.length - 1].height + 2 * e > this.maxHeight)
                  )
                    throw t.ERR_DIMENSIONS;
                  for (var n = 0, r = 0, o = 0; i.length; ) {
                    var a = this._fillRow(i, n, o, s, e);
                    if ((a.w > r && (r = a.w), (n += a.h), !a.h || !i.length)) {
                      var h = createjs.createCanvas
                        ? createjs.createCanvas()
                        : document.createElement("canvas");
                      (h.width = this._getSize(r, this.maxWidth)),
                        (h.height = this._getSize(n, this.maxHeight)),
                        (this._data.images[o] = h),
                        a.h || ((r = n = 0), o++);
                    }
                  }
                }),
                (e._setupMovieClipFrame = function (t, e) {
                  var s = t.actionsEnabled;
                  (t.actionsEnabled = !1),
                    t.gotoAndStop(e.i),
                    (t.actionsEnabled = s),
                    e.f && e.f(t, e.d, e.i);
                }),
                (e._getSize = function (t, e) {
                  for (var s = 4; Math.pow(2, ++s) < t; );
                  return Math.min(e, Math.pow(2, s));
                }),
                (e._fillRow = function (e, s, i, n, r) {
                  for (
                    var o = this.maxWidth,
                      a = this.maxHeight - (s += r),
                      h = r,
                      l = 0,
                      c = e.length - 1;
                    c >= 0;
                    c--
                  ) {
                    var u = e[c],
                      d = this._scale * u.scale,
                      p = u.sourceRect,
                      f = u.source,
                      g = Math.floor(d * p.x - r),
                      m = Math.floor(d * p.y - r),
                      v = Math.ceil(d * p.height + 2 * r),
                      y = Math.ceil(d * p.width + 2 * r);
                    if (y > o) throw t.ERR_DIMENSIONS;
                    v > a ||
                      h + y > o ||
                      ((u.img = i),
                      (u.rect = new createjs.Rectangle(h, s, y, v)),
                      (l = l || v),
                      e.splice(c, 1),
                      (n[u.index] = [
                        h,
                        s,
                        y,
                        v,
                        i,
                        Math.round(-g + d * f.regX - r),
                        Math.round(-m + d * f.regY - r),
                      ]),
                      (h += y));
                  }
                  return { w: h, h: l };
                }),
                (e._endBuild = function () {
                  (this.spriteSheet = new createjs.SpriteSheet(this._data)),
                    (this._data = null),
                    (this.progress = 1),
                    this.dispatchEvent("complete");
                }),
                (e._run = function () {
                  for (
                    var t =
                        50 *
                        Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)),
                      e = new Date().getTime() + t,
                      s = !1;
                    e > new Date().getTime();
  
                  )
                    if (!this._drawNext()) {
                      s = !0;
                      break;
                    }
                  if (s) this._endBuild();
                  else {
                    var i = this;
                    this._timerID = setTimeout(function () {
                      i._run();
                    }, 50 - t);
                  }
                  var n = (this.progress = this._index / this._frames.length);
                  if (this.hasEventListener("progress")) {
                    var r = new createjs.Event("progress");
                    (r.progress = n), this.dispatchEvent(r);
                  }
                }),
                (e._drawNext = function () {
                  var t = this._frames[this._index],
                    e = t.scale * this._scale,
                    s = t.rect,
                    i = t.sourceRect,
                    n = this._data.images[t.img].getContext("2d");
                  return (
                    t.funct && t.funct(t.source, t.data),
                    n.save(),
                    n.beginPath(),
                    n.rect(s.x, s.y, s.width, s.height),
                    n.clip(),
                    n.translate(
                      Math.ceil(s.x - i.x * e),
                      Math.ceil(s.y - i.y * e)
                    ),
                    n.scale(e, e),
                    t.source.draw(n),
                    n.restore(),
                    ++this._index < this._frames.length
                  );
                }),
                (createjs.SpriteSheetBuilder = createjs.promote(
                  t,
                  "EventDispatcher"
                ));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t) {
                this.DisplayObject_constructor(),
                  "string" == typeof t && (t = document.getElementById(t)),
                  (this.mouseEnabled = !1);
                var e = t.style;
                (e.position = "absolute"),
                  (e.transformOrigin =
                    e.WebkitTransformOrigin =
                    e.msTransformOrigin =
                    e.MozTransformOrigin =
                    e.OTransformOrigin =
                      "0% 0%"),
                  (this.htmlElement = t),
                  (this._oldProps = null);
              }
              var e = createjs.extend(t, createjs.DisplayObject);
              (e.isVisible = function () {
                return null != this.htmlElement;
              }),
                (e.draw = function () {
                  return !0;
                }),
                (e.cache = function () {}),
                (e.uncache = function () {}),
                (e.updateCache = function () {}),
                (e.hitTest = function () {}),
                (e.localToGlobal = function () {}),
                (e.globalToLocal = function () {}),
                (e.localToLocal = function () {}),
                (e.clone = function () {
                  throw "DOMElement cannot be cloned.";
                }),
                (e.toString = function () {
                  return "[DOMElement (name=" + this.name + ")]";
                }),
                (e._tick = function (t) {
                  var e = this.getStage();
                  e && e.on("drawend", this._handleDrawEnd, this, !0),
                    this.DisplayObject__tick(t);
                }),
                (e._handleDrawEnd = function () {
                  var t = this.htmlElement;
                  if (t) {
                    var e = t.style,
                      s = this.getConcatenatedDisplayProps(this._props),
                      i = s.matrix,
                      n = s.visible ? "visible" : "hidden";
                    if ((n != e.visibility && (e.visibility = n), s.visible)) {
                      var r = this._oldProps,
                        o = r && r.matrix,
                        a = 1e4;
                      if (!o || !o.equals(i)) {
                        var h =
                          "matrix(" +
                          ((i.a * a) | 0) / a +
                          "," +
                          ((i.b * a) | 0) / a +
                          "," +
                          ((i.c * a) | 0) / a +
                          "," +
                          ((i.d * a) | 0) / a +
                          "," +
                          ((i.tx + 0.5) | 0);
                        (e.transform =
                          e.WebkitTransform =
                          e.OTransform =
                          e.msTransform =
                            h + "," + ((i.ty + 0.5) | 0) + ")"),
                          (e.MozTransform =
                            h + "px," + ((i.ty + 0.5) | 0) + "px)"),
                          r ||
                            (r = this._oldProps =
                              new createjs.DisplayProps(!0, NaN)),
                          r.matrix.copy(i);
                      }
                      r.alpha != s.alpha &&
                        ((e.opacity = "" + ((s.alpha * a) | 0) / a),
                        (r.alpha = s.alpha));
                    }
                  }
                }),
                (createjs.DOMElement = createjs.promote(t, "DisplayObject"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {}
              var e = t.prototype;
              (e.getBounds = function (t) {
                return t;
              }),
                (e.applyFilter = function (t, e, s, i, n, r, o, a) {
                  (r = r || t), null == o && (o = e), null == a && (a = s);
                  try {
                    var h = t.getImageData(e, s, i, n);
                  } catch (t) {
                    return !1;
                  }
                  return !!this._applyFilter(h) && (r.putImageData(h, o, a), !0);
                }),
                (e.toString = function () {
                  return "[Filter]";
                }),
                (e.clone = function () {
                  return new t();
                }),
                (e._applyFilter = function () {
                  return !0;
                }),
                (createjs.Filter = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s) {
                (isNaN(t) || 0 > t) && (t = 0),
                  (isNaN(e) || 0 > e) && (e = 0),
                  (isNaN(s) || 1 > s) && (s = 1),
                  (this.blurX = 0 | t),
                  (this.blurY = 0 | e),
                  (this.quality = 0 | s);
              }
              var e = createjs.extend(t, createjs.Filter);
              (t.MUL_TABLE = [
                1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19,
                283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155,
                149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415,
                405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313,
                307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501,
                493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209,
                413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355,
                351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77,
                305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68,
                135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61,
                121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445,
                221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409,
                203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47,
                187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87,
                173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81,
                323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305,
                303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143,
                285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135,
                269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1,
              ]),
                (t.SHG_TABLE = [
                  0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14,
                  14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15,
                  14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14,
                  15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16,
                  16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13,
                  16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14,
                  16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14,
                  16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17,
                  17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16,
                  17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17,
                  16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15,
                  16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17,
                  17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17,
                  17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15,
                  17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17,
                  13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9,
                ]),
                (e.getBounds = function (t) {
                  var e = 0 | this.blurX,
                    s = 0 | this.blurY;
                  if (0 >= e && 0 >= s) return t;
                  var i = Math.pow(this.quality, 0.2);
                  return (t || new createjs.Rectangle()).pad(
                    e * i + 1,
                    s * i + 1,
                    e * i + 1,
                    s * i + 1
                  );
                }),
                (e.clone = function () {
                  return new t(this.blurX, this.blurY, this.quality);
                }),
                (e.toString = function () {
                  return "[BlurFilter]";
                }),
                (e._applyFilter = function (e) {
                  var s = this.blurX >> 1;
                  if (isNaN(s) || 0 > s) return !1;
                  var i = this.blurY >> 1;
                  if (isNaN(i) || 0 > i) return !1;
                  if (0 == s && 0 == i) return !1;
                  var n = this.quality;
                  (isNaN(n) || 1 > n) && (n = 1),
                    (n |= 0) > 3 && (n = 3),
                    1 > n && (n = 1);
                  var r = e.data,
                    o = 0,
                    a = 0,
                    h = 0,
                    l = 0,
                    c = 0,
                    u = 0,
                    d = 0,
                    p = 0,
                    f = 0,
                    g = 0,
                    m = 0,
                    v = 0,
                    y = 0,
                    w = 0,
                    x = 0,
                    b = (s + s + 1) | 0,
                    _ = (i + i + 1) | 0,
                    T = 0 | e.width,
                    C = 0 | e.height,
                    k = (T - 1) | 0,
                    S = (C - 1) | 0,
                    A = (s + 1) | 0,
                    P = (i + 1) | 0,
                    M = { r: 0, b: 0, g: 0, a: 0 },
                    I = M;
                  for (h = 1; b > h; h++) I = I.n = { r: 0, b: 0, g: 0, a: 0 };
                  I.n = M;
                  var B = { r: 0, b: 0, g: 0, a: 0 },
                    D = B;
                  for (h = 1; _ > h; h++) D = D.n = { r: 0, b: 0, g: 0, a: 0 };
                  D.n = B;
                  for (
                    var E = null,
                      L = 0 | t.MUL_TABLE[s],
                      z = 0 | t.SHG_TABLE[s],
                      O = 0 | t.MUL_TABLE[i],
                      F = 0 | t.SHG_TABLE[i];
                    n-- > 0;
  
                  ) {
                    d = u = 0;
                    var j = L,
                      R = z;
                    for (a = C; --a > -1; ) {
                      for (
                        p = A * (v = r[0 | u]),
                          f = A * (y = r[(u + 1) | 0]),
                          g = A * (w = r[(u + 2) | 0]),
                          m = A * (x = r[(u + 3) | 0]),
                          I = M,
                          h = A;
                        --h > -1;
  
                      )
                        (I.r = v), (I.g = y), (I.b = w), (I.a = x), (I = I.n);
                      for (h = 1; A > h; h++)
                        (l = (u + ((h > k ? k : h) << 2)) | 0),
                          (p += I.r = r[l]),
                          (f += I.g = r[l + 1]),
                          (g += I.b = r[l + 2]),
                          (m += I.a = r[l + 3]),
                          (I = I.n);
                      for (E = M, o = 0; T > o; o++)
                        (r[u++] = (p * j) >>> R),
                          (r[u++] = (f * j) >>> R),
                          (r[u++] = (g * j) >>> R),
                          (r[u++] = (m * j) >>> R),
                          (l = (d + ((l = o + s + 1) < k ? l : k)) << 2),
                          (p -= E.r - (E.r = r[l])),
                          (f -= E.g - (E.g = r[l + 1])),
                          (g -= E.b - (E.b = r[l + 2])),
                          (m -= E.a - (E.a = r[l + 3])),
                          (E = E.n);
                      d += T;
                    }
                    for (j = O, R = F, o = 0; T > o; o++) {
                      for (
                        p = (P * (v = r[(u = (o << 2) | 0)])) | 0,
                          f = (P * (y = r[(u + 1) | 0])) | 0,
                          g = (P * (w = r[(u + 2) | 0])) | 0,
                          m = (P * (x = r[(u + 3) | 0])) | 0,
                          D = B,
                          h = 0;
                        P > h;
                        h++
                      )
                        (D.r = v), (D.g = y), (D.b = w), (D.a = x), (D = D.n);
                      for (c = T, h = 1; i >= h; h++)
                        (u = (c + o) << 2),
                          (p += D.r = r[u]),
                          (f += D.g = r[u + 1]),
                          (g += D.b = r[u + 2]),
                          (m += D.a = r[u + 3]),
                          (D = D.n),
                          S > h && (c += T);
                      if (((u = o), (E = B), n > 0))
                        for (a = 0; C > a; a++)
                          (r[3 + (l = u << 2)] = x = (m * j) >>> R),
                            x > 0
                              ? ((r[l] = (p * j) >>> R),
                                (r[l + 1] = (f * j) >>> R),
                                (r[l + 2] = (g * j) >>> R))
                              : (r[l] = r[l + 1] = r[l + 2] = 0),
                            (l = (o + ((l = a + P) < S ? l : S) * T) << 2),
                            (p -= E.r - (E.r = r[l])),
                            (f -= E.g - (E.g = r[l + 1])),
                            (g -= E.b - (E.b = r[l + 2])),
                            (m -= E.a - (E.a = r[l + 3])),
                            (E = E.n),
                            (u += T);
                      else
                        for (a = 0; C > a; a++)
                          (r[3 + (l = u << 2)] = x = (m * j) >>> R),
                            x > 0
                              ? ((x = 255 / x),
                                (r[l] = ((p * j) >>> R) * x),
                                (r[l + 1] = ((f * j) >>> R) * x),
                                (r[l + 2] = ((g * j) >>> R) * x))
                              : (r[l] = r[l + 1] = r[l + 2] = 0),
                            (l = (o + ((l = a + P) < S ? l : S) * T) << 2),
                            (p -= E.r - (E.r = r[l])),
                            (f -= E.g - (E.g = r[l + 1])),
                            (g -= E.b - (E.b = r[l + 2])),
                            (m -= E.a - (E.a = r[l + 3])),
                            (E = E.n),
                            (u += T);
                    }
                  }
                  return !0;
                }),
                (createjs.BlurFilter = createjs.promote(t, "Filter"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t) {
                (this.alphaMap = t),
                  (this._alphaMap = null),
                  (this._mapData = null);
              }
              var e = createjs.extend(t, createjs.Filter);
              (e.clone = function () {
                var e = new t(this.alphaMap);
                return (
                  (e._alphaMap = this._alphaMap), (e._mapData = this._mapData), e
                );
              }),
                (e.toString = function () {
                  return "[AlphaMapFilter]";
                }),
                (e._applyFilter = function (t) {
                  if (!this.alphaMap) return !0;
                  if (!this._prepAlphaMap()) return !1;
                  for (
                    var e = t.data, s = this._mapData, i = 0, n = e.length;
                    n > i;
                    i += 4
                  )
                    e[i + 3] = s[i] || 0;
                  return !0;
                }),
                (e._prepAlphaMap = function () {
                  if (!this.alphaMap) return !1;
                  if (this.alphaMap == this._alphaMap && this._mapData) return !0;
                  this._mapData = null;
                  var t,
                    e = (this._alphaMap = this.alphaMap),
                    s = e;
                  e instanceof HTMLCanvasElement
                    ? (t = s.getContext("2d"))
                    : (((s = createjs.createCanvas
                        ? createjs.createCanvas()
                        : document.createElement("canvas")).width = e.width),
                      (s.height = e.height),
                      (t = s.getContext("2d")).drawImage(e, 0, 0));
                  try {
                    var i = t.getImageData(0, 0, e.width, e.height);
                  } catch (t) {
                    return !1;
                  }
                  return (this._mapData = i.data), !0;
                }),
                (createjs.AlphaMapFilter = createjs.promote(t, "Filter"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t) {
                this.mask = t;
              }
              var e = createjs.extend(t, createjs.Filter);
              (e.applyFilter = function (t, e, s, i, n, r, o, a) {
                return (
                  !this.mask ||
                  (null == o && (o = e),
                  null == a && (a = s),
                  (r = r || t).save(),
                  t == r &&
                    ((r.globalCompositeOperation = "destination-in"),
                    r.drawImage(this.mask, o, a),
                    r.restore(),
                    !0))
                );
              }),
                (e.clone = function () {
                  return new t(this.mask);
                }),
                (e.toString = function () {
                  return "[AlphaMaskFilter]";
                }),
                (createjs.AlphaMaskFilter = createjs.promote(t, "Filter"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s, i, n, r, o, a) {
                (this.redMultiplier = null != t ? t : 1),
                  (this.greenMultiplier = null != e ? e : 1),
                  (this.blueMultiplier = null != s ? s : 1),
                  (this.alphaMultiplier = null != i ? i : 1),
                  (this.redOffset = n || 0),
                  (this.greenOffset = r || 0),
                  (this.blueOffset = o || 0),
                  (this.alphaOffset = a || 0);
              }
              var e = createjs.extend(t, createjs.Filter);
              (e.toString = function () {
                return "[ColorFilter]";
              }),
                (e.clone = function () {
                  return new t(
                    this.redMultiplier,
                    this.greenMultiplier,
                    this.blueMultiplier,
                    this.alphaMultiplier,
                    this.redOffset,
                    this.greenOffset,
                    this.blueOffset,
                    this.alphaOffset
                  );
                }),
                (e._applyFilter = function (t) {
                  for (var e = t.data, s = e.length, i = 0; s > i; i += 4)
                    (e[i] = e[i] * this.redMultiplier + this.redOffset),
                      (e[i + 1] =
                        e[i + 1] * this.greenMultiplier + this.greenOffset),
                      (e[i + 2] =
                        e[i + 2] * this.blueMultiplier + this.blueOffset),
                      (e[i + 3] =
                        e[i + 3] * this.alphaMultiplier + this.alphaOffset);
                  return !0;
                }),
                (createjs.ColorFilter = createjs.promote(t, "Filter"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t, e, s, i) {
                this.setColor(t, e, s, i);
              }
              var e = t.prototype;
              (t.DELTA_INDEX = [
                0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12,
                0.14, 0.15, 0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27,
                0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48,
                0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8,
                0.83, 0.86, 0.89, 0.92, 0.95, 0.98, 1, 1.06, 1.12, 1.18, 1.24,
                1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9,
                1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4,
                3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8,
                8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10,
              ]),
                (t.IDENTITY_MATRIX = [
                  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
                  0, 0, 0, 1,
                ]),
                (t.LENGTH = t.IDENTITY_MATRIX.length),
                (e.setColor = function (t, e, s, i) {
                  return this.reset().adjustColor(t, e, s, i);
                }),
                (e.reset = function () {
                  return this.copy(t.IDENTITY_MATRIX);
                }),
                (e.adjustColor = function (t, e, s, i) {
                  return (
                    this.adjustHue(i),
                    this.adjustContrast(e),
                    this.adjustBrightness(t),
                    this.adjustSaturation(s)
                  );
                }),
                (e.adjustBrightness = function (t) {
                  return (
                    0 == t ||
                      isNaN(t) ||
                      ((t = this._cleanValue(t, 255)),
                      this._multiplyMatrix([
                        1,
                        0,
                        0,
                        0,
                        t,
                        0,
                        1,
                        0,
                        0,
                        t,
                        0,
                        0,
                        1,
                        0,
                        t,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                      ])),
                    this
                  );
                }),
                (e.adjustContrast = function (e) {
                  return (
                    0 == e ||
                      isNaN(e) ||
                      ((s =
                        0 > (e = this._cleanValue(e, 100))
                          ? 127 + (e / 100) * 127
                          : 127 *
                              (s =
                                0 == (s = e % 1)
                                  ? t.DELTA_INDEX[e]
                                  : t.DELTA_INDEX[e << 0] * (1 - s) +
                                    t.DELTA_INDEX[1 + (e << 0)] * s) +
                            127),
                      this._multiplyMatrix([
                        s / 127,
                        0,
                        0,
                        0,
                        0.5 * (127 - s),
                        0,
                        s / 127,
                        0,
                        0,
                        0.5 * (127 - s),
                        0,
                        0,
                        s / 127,
                        0,
                        0.5 * (127 - s),
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                      ])),
                    this
                  );
                  var s;
                }),
                (e.adjustSaturation = function (t) {
                  if (0 == t || isNaN(t)) return this;
                  var e =
                      1 +
                      ((t = this._cleanValue(t, 100)) > 0
                        ? (3 * t) / 100
                        : t / 100),
                    s = 0.3086,
                    i = 0.6094,
                    n = 0.082;
                  return (
                    this._multiplyMatrix([
                      s * (1 - e) + e,
                      i * (1 - e),
                      n * (1 - e),
                      0,
                      0,
                      s * (1 - e),
                      i * (1 - e) + e,
                      n * (1 - e),
                      0,
                      0,
                      s * (1 - e),
                      i * (1 - e),
                      n * (1 - e) + e,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                    ]),
                    this
                  );
                }),
                (e.adjustHue = function (t) {
                  if (0 == t || isNaN(t)) return this;
                  t = (this._cleanValue(t, 180) / 180) * Math.PI;
                  var e = Math.cos(t),
                    s = Math.sin(t),
                    i = 0.213,
                    n = 0.715,
                    r = 0.072;
                  return (
                    this._multiplyMatrix([
                      i + e * (1 - i) + s * -i,
                      n + e * -n + s * -n,
                      r + e * -r + s * (1 - r),
                      0,
                      0,
                      i + e * -i + 0.143 * s,
                      n + e * (1 - n) + 0.14 * s,
                      r + e * -r + -0.283 * s,
                      0,
                      0,
                      i + e * -i + -0.787 * s,
                      n + e * -n + s * n,
                      r + e * (1 - r) + s * r,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                      0,
                      0,
                      0,
                      0,
                      0,
                      1,
                    ]),
                    this
                  );
                }),
                (e.concat = function (e) {
                  return (
                    (e = this._fixMatrix(e)).length != t.LENGTH ||
                      this._multiplyMatrix(e),
                    this
                  );
                }),
                (e.clone = function () {
                  return new t().copy(this);
                }),
                (e.toArray = function () {
                  for (var e = [], s = 0, i = t.LENGTH; i > s; s++)
                    e[s] = this[s];
                  return e;
                }),
                (e.copy = function (e) {
                  for (var s = t.LENGTH, i = 0; s > i; i++) this[i] = e[i];
                  return this;
                }),
                (e.toString = function () {
                  return "[ColorMatrix]";
                }),
                (e._multiplyMatrix = function (t) {
                  var e,
                    s,
                    i,
                    n = [];
                  for (e = 0; 5 > e; e++) {
                    for (s = 0; 5 > s; s++) n[s] = this[s + 5 * e];
                    for (s = 0; 5 > s; s++) {
                      var r = 0;
                      for (i = 0; 5 > i; i++) r += t[s + 5 * i] * n[i];
                      this[s + 5 * e] = r;
                    }
                  }
                }),
                (e._cleanValue = function (t, e) {
                  return Math.min(e, Math.max(-e, t));
                }),
                (e._fixMatrix = function (e) {
                  return (
                    e instanceof t && (e = e.toArray()),
                    e.length < t.LENGTH
                      ? (e = e
                          .slice(0, e.length)
                          .concat(t.IDENTITY_MATRIX.slice(e.length, t.LENGTH)))
                      : e.length > t.LENGTH && (e = e.slice(0, t.LENGTH)),
                    e
                  );
                }),
                (createjs.ColorMatrix = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t(t) {
                this.matrix = t;
              }
              var e = createjs.extend(t, createjs.Filter);
              (e.toString = function () {
                return "[ColorMatrixFilter]";
              }),
                (e.clone = function () {
                  return new t(this.matrix);
                }),
                (e._applyFilter = function (t) {
                  for (
                    var e,
                      s,
                      i,
                      n,
                      r = t.data,
                      o = r.length,
                      a = this.matrix,
                      h = a[0],
                      l = a[1],
                      c = a[2],
                      u = a[3],
                      d = a[4],
                      p = a[5],
                      f = a[6],
                      g = a[7],
                      m = a[8],
                      v = a[9],
                      y = a[10],
                      w = a[11],
                      x = a[12],
                      b = a[13],
                      _ = a[14],
                      T = a[15],
                      C = a[16],
                      k = a[17],
                      S = a[18],
                      A = a[19],
                      P = 0;
                    o > P;
                    P += 4
                  )
                    (e = r[P]),
                      (s = r[P + 1]),
                      (i = r[P + 2]),
                      (n = r[P + 3]),
                      (r[P] = e * h + s * l + i * c + n * u + d),
                      (r[P + 1] = e * p + s * f + i * g + n * m + v),
                      (r[P + 2] = e * y + s * w + i * x + n * b + _),
                      (r[P + 3] = e * T + s * C + i * k + n * S + A);
                  return !0;
                }),
                (createjs.ColorMatrixFilter = createjs.promote(t, "Filter"));
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              function t() {
                throw "Touch cannot be instantiated";
              }
              (t.isSupported = function () {
                return !!(
                  "ontouchstart" in window ||
                  (window.navigator.msPointerEnabled &&
                    window.navigator.msMaxTouchPoints > 0) ||
                  (window.navigator.pointerEnabled &&
                    window.navigator.maxTouchPoints > 0)
                );
              }),
                (t.enable = function (e, s, i) {
                  return (
                    !!(e && e.canvas && t.isSupported()) &&
                    (e.__touch ||
                      ((e.__touch = {
                        pointers: {},
                        multitouch: !s,
                        preventDefault: !i,
                        count: 0,
                      }),
                      "ontouchstart" in window
                        ? t._IOS_enable(e)
                        : (window.navigator.msPointerEnabled ||
                            window.navigator.pointerEnabled) &&
                          t._IE_enable(e)),
                    !0)
                  );
                }),
                (t.disable = function (e) {
                  e &&
                    ("ontouchstart" in window
                      ? t._IOS_disable(e)
                      : (window.navigator.msPointerEnabled ||
                          window.navigator.pointerEnabled) &&
                        t._IE_disable(e),
                    delete e.__touch);
                }),
                (t._IOS_enable = function (e) {
                  var s = e.canvas,
                    i = (e.__touch.f = function (s) {
                      t._IOS_handleEvent(e, s);
                    });
                  s.addEventListener("touchstart", i, !1),
                    s.addEventListener("touchmove", i, !1),
                    s.addEventListener("touchend", i, !1),
                    s.addEventListener("touchcancel", i, !1);
                }),
                (t._IOS_disable = function (t) {
                  var e = t.canvas;
                  if (e) {
                    var s = t.__touch.f;
                    e.removeEventListener("touchstart", s, !1),
                      e.removeEventListener("touchmove", s, !1),
                      e.removeEventListener("touchend", s, !1),
                      e.removeEventListener("touchcancel", s, !1);
                  }
                }),
                (t._IOS_handleEvent = function (t, e) {
                  if (t) {
                    t.__touch.preventDefault &&
                      e.preventDefault &&
                      e.preventDefault();
                    for (
                      var s = e.changedTouches, i = e.type, n = 0, r = s.length;
                      r > n;
                      n++
                    ) {
                      var o = s[n],
                        a = o.identifier;
                      o.target == t.canvas &&
                        ("touchstart" == i
                          ? this._handleStart(t, a, e, o.pageX, o.pageY)
                          : "touchmove" == i
                          ? this._handleMove(t, a, e, o.pageX, o.pageY)
                          : ("touchend" == i || "touchcancel" == i) &&
                            this._handleEnd(t, a, e));
                    }
                  }
                }),
                (t._IE_enable = function (e) {
                  var s = e.canvas,
                    i = (e.__touch.f = function (s) {
                      t._IE_handleEvent(e, s);
                    });
                  void 0 === window.navigator.pointerEnabled
                    ? (s.addEventListener("MSPointerDown", i, !1),
                      window.addEventListener("MSPointerMove", i, !1),
                      window.addEventListener("MSPointerUp", i, !1),
                      window.addEventListener("MSPointerCancel", i, !1),
                      e.__touch.preventDefault &&
                        (s.style.msTouchAction = "none"))
                    : (s.addEventListener("pointerdown", i, !1),
                      window.addEventListener("pointermove", i, !1),
                      window.addEventListener("pointerup", i, !1),
                      window.addEventListener("pointercancel", i, !1),
                      e.__touch.preventDefault && (s.style.touchAction = "none")),
                    (e.__touch.activeIDs = {});
                }),
                (t._IE_disable = function (t) {
                  var e = t.__touch.f;
                  void 0 === window.navigator.pointerEnabled
                    ? (window.removeEventListener("MSPointerMove", e, !1),
                      window.removeEventListener("MSPointerUp", e, !1),
                      window.removeEventListener("MSPointerCancel", e, !1),
                      t.canvas &&
                        t.canvas.removeEventListener("MSPointerDown", e, !1))
                    : (window.removeEventListener("pointermove", e, !1),
                      window.removeEventListener("pointerup", e, !1),
                      window.removeEventListener("pointercancel", e, !1),
                      t.canvas &&
                        t.canvas.removeEventListener("pointerdown", e, !1));
                }),
                (t._IE_handleEvent = function (t, e) {
                  if (t) {
                    t.__touch.preventDefault &&
                      e.preventDefault &&
                      e.preventDefault();
                    var s = e.type,
                      i = e.pointerId,
                      n = t.__touch.activeIDs;
                    if ("MSPointerDown" == s || "pointerdown" == s) {
                      if (e.srcElement != t.canvas) return;
                      (n[i] = !0), this._handleStart(t, i, e, e.pageX, e.pageY);
                    } else
                      n[i] &&
                        ("MSPointerMove" == s || "pointermove" == s
                          ? this._handleMove(t, i, e, e.pageX, e.pageY)
                          : ("MSPointerUp" == s ||
                              "MSPointerCancel" == s ||
                              "pointerup" == s ||
                              "pointercancel" == s) &&
                            (delete n[i], this._handleEnd(t, i, e)));
                  }
                }),
                (t._handleStart = function (t, e, s, i, n) {
                  var r = t.__touch;
                  if (r.multitouch || !r.count) {
                    var o = r.pointers;
                    o[e] ||
                      ((o[e] = !0), r.count++, t._handlePointerDown(e, s, i, n));
                  }
                }),
                (t._handleMove = function (t, e, s, i, n) {
                  t.__touch.pointers[e] && t._handlePointerMove(e, s, i, n);
                }),
                (t._handleEnd = function (t, e, s) {
                  var i = t.__touch,
                    n = i.pointers;
                  n[e] && (i.count--, t._handlePointerUp(e, s, !0), delete n[e]);
                }),
                (createjs.Touch = t);
            })(),
            (this.o = this.o || {}),
            (function () {
              "use strict";
              var t = (createjs.EaselJS = createjs.EaselJS || {});
              (t.version = "0.8.0"),
                (t.buildDate = "Thu, 15 Jan 2015 23:50:40 GMT");
            })();
        },
        981: function (t, e, s) {
          var i;
          (t = s.nmd(t)),
            function (n) {
              (function () {
                function r(t, e) {
                  if (t !== e) {
                    var s = null === t,
                      i = t === C,
                      n = t == t,
                      r = null === e,
                      o = e === C,
                      a = e == e;
                    if ((t > e && !r) || !n || (s && !o && a) || (i && a))
                      return 1;
                    if ((e > t && !s) || !a || (r && !i && n) || (o && n))
                      return -1;
                  }
                  return 0;
                }
                function o(t, e, s) {
                  for (var i = t.length, n = s ? i : -1; s ? n-- : ++n < i; )
                    if (e(t[n], n, t)) return n;
                  return -1;
                }
                function a(t, e, s) {
                  if (e != e) return v(t, s);
                  s -= 1;
                  for (var i = t.length; ++s < i; ) if (t[s] === e) return s;
                  return -1;
                }
                function h(t) {
                  return "function" == typeof t || !1;
                }
                function l(t) {
                  return null == t ? "" : t + "";
                }
                function c(t, e) {
                  for (
                    var s = -1, i = t.length;
                    ++s < i && -1 < e.indexOf(t.charAt(s));
  
                  );
                  return s;
                }
                function u(t, e) {
                  for (var s = t.length; s-- && -1 < e.indexOf(t.charAt(s)); );
                  return s;
                }
                function d(t, e) {
                  return r(t.a, e.a) || t.b - e.b;
                }
                function p(t) {
                  return At[t];
                }
                function f(t) {
                  return Pt[t];
                }
                function g(t, e, s) {
                  return e ? (t = Bt[t]) : s && (t = Dt[t]), "\\" + t;
                }
                function m(t) {
                  return "\\" + Dt[t];
                }
                function v(t, e, s) {
                  var i = t.length;
                  for (e += s ? 0 : -1; s ? e-- : ++e < i; ) {
                    var n = t[e];
                    if (n != n) return e;
                  }
                  return -1;
                }
                function y(t) {
                  return !!t && "object" == typeof t;
                }
                function w(t) {
                  return (
                    (160 >= t && t >= 9 && 13 >= t) ||
                    32 == t ||
                    160 == t ||
                    5760 == t ||
                    6158 == t ||
                    (t >= 8192 &&
                      (8202 >= t ||
                        8232 == t ||
                        8233 == t ||
                        8239 == t ||
                        8287 == t ||
                        12288 == t ||
                        65279 == t))
                  );
                }
                function x(t, e) {
                  for (var s = -1, i = t.length, n = -1, r = []; ++s < i; )
                    t[s] === e && ((t[s] = B), (r[++n] = s));
                  return r;
                }
                function b(t) {
                  for (var e = -1, s = t.length; ++e < s && w(t.charCodeAt(e)); );
                  return e;
                }
                function _(t) {
                  for (var e = t.length; e-- && w(t.charCodeAt(e)); );
                  return e;
                }
                function T(t) {
                  return Mt[t];
                }
                var C,
                  k = 32,
                  S = 64,
                  A = 128,
                  P = 256,
                  M = 200,
                  I = "Expected a function",
                  B = "__lodash_placeholder__",
                  D = "[object Arguments]",
                  E = "[object Array]",
                  L = "[object Boolean]",
                  z = "[object Date]",
                  O = "[object Error]",
                  F = "[object Function]",
                  j = "[object Number]",
                  R = "[object Object]",
                  W = "[object RegExp]",
                  V = "[object String]",
                  H = "[object ArrayBuffer]",
                  N = "[object Float32Array]",
                  Z = "[object Float64Array]",
                  U = "[object Int8Array]",
                  q = "[object Int16Array]",
                  G = "[object Int32Array]",
                  Y = "[object Uint8Array]",
                  X = "[object Uint8ClampedArray]",
                  K = "[object Uint16Array]",
                  J = "[object Uint32Array]",
                  $ = /\b__p\+='';/g,
                  Q = /\b(__p\+=)''\+/g,
                  tt = /(__e\(.*?\)|\b__t\))\+'';/g,
                  et = /&(?:amp|lt|gt|quot|#39|#96);/g,
                  st = /[&<>"'`]/g,
                  it = RegExp(et.source),
                  nt = RegExp(st.source),
                  rt = /<%-([\s\S]+?)%>/g,
                  ot = /<%([\s\S]+?)%>/g,
                  at = /<%=([\s\S]+?)%>/g,
                  ht = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
                  lt = /^\w*$/,
                  ct =
                    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
                  ut =
                    /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
                  dt = RegExp(ut.source),
                  pt = /[\u0300-\u036f\ufe20-\ufe23]/g,
                  ft = /\\(\\)?/g,
                  gt = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                  mt = /\w*$/,
                  vt = /^0[xX]/,
                  yt = /^\[object .+?Constructor\]$/,
                  wt = /^\d+$/,
                  xt = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
                  bt = /($^)/,
                  _t = /['\n\r\u2028\u2029\\]/g,
                  Tt = RegExp(
                    "[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+",
                    "g"
                  ),
                  Ct =
                    "Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout isFinite parseFloat parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap".split(
                      " "
                    ),
                  kt = {};
                (kt[N] =
                  kt[Z] =
                  kt[U] =
                  kt[q] =
                  kt[G] =
                  kt[Y] =
                  kt[X] =
                  kt[K] =
                  kt[J] =
                    !0),
                  (kt[D] =
                    kt[E] =
                    kt[H] =
                    kt[L] =
                    kt[z] =
                    kt[O] =
                    kt[F] =
                    kt["[object Map]"] =
                    kt[j] =
                    kt[R] =
                    kt[W] =
                    kt["[object Set]"] =
                    kt[V] =
                    kt["[object WeakMap]"] =
                      !1);
                var St = {};
                (St[D] =
                  St[E] =
                  St[H] =
                  St[L] =
                  St[z] =
                  St[N] =
                  St[Z] =
                  St[U] =
                  St[q] =
                  St[G] =
                  St[j] =
                  St[R] =
                  St[W] =
                  St[V] =
                  St[Y] =
                  St[X] =
                  St[K] =
                  St[J] =
                    !0),
                  (St[O] =
                    St[F] =
                    St["[object Map]"] =
                    St["[object Set]"] =
                    St["[object WeakMap]"] =
                      !1);
                var At = {
                    À: "A",
                    Á: "A",
                    Â: "A",
                    Ã: "A",
                    Ä: "A",
                    Å: "A",
                    à: "a",
                    á: "a",
                    â: "a",
                    ã: "a",
                    ä: "a",
                    å: "a",
                    Ç: "C",
                    ç: "c",
                    Ð: "D",
                    ð: "d",
                    È: "E",
                    É: "E",
                    Ê: "E",
                    Ë: "E",
                    è: "e",
                    é: "e",
                    ê: "e",
                    ë: "e",
                    Ì: "I",
                    Í: "I",
                    Î: "I",
                    Ï: "I",
                    ì: "i",
                    í: "i",
                    î: "i",
                    ï: "i",
                    Ñ: "N",
                    ñ: "n",
                    Ò: "O",
                    Ó: "O",
                    Ô: "O",
                    Õ: "O",
                    Ö: "O",
                    Ø: "O",
                    ò: "o",
                    ó: "o",
                    ô: "o",
                    õ: "o",
                    ö: "o",
                    ø: "o",
                    Ù: "U",
                    Ú: "U",
                    Û: "U",
                    Ü: "U",
                    ù: "u",
                    ú: "u",
                    û: "u",
                    ü: "u",
                    Ý: "Y",
                    ý: "y",
                    ÿ: "y",
                    Æ: "Ae",
                    æ: "ae",
                    Þ: "Th",
                    þ: "th",
                    ß: "ss",
                  },
                  Pt = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "`": "&#96;",
                  },
                  Mt = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'",
                    "&#96;": "`",
                  },
                  It = { function: !0, object: !0 },
                  Bt = {
                    0: "x30",
                    1: "x31",
                    2: "x32",
                    3: "x33",
                    4: "x34",
                    5: "x35",
                    6: "x36",
                    7: "x37",
                    8: "x38",
                    9: "x39",
                    A: "x41",
                    B: "x42",
                    C: "x43",
                    D: "x44",
                    E: "x45",
                    F: "x46",
                    a: "x61",
                    b: "x62",
                    c: "x63",
                    d: "x64",
                    e: "x65",
                    f: "x66",
                    n: "x6e",
                    r: "x72",
                    t: "x74",
                    u: "x75",
                    v: "x76",
                    x: "x78",
                  },
                  Dt = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029",
                  },
                  Et =
                    It[typeof t.exports] &&
                    t.exports &&
                    !t.exports.nodeType &&
                    t.exports,
                  Lt = It.object && t && !t.nodeType && t,
                  zt = It[typeof self] && self && self.Object && self,
                  Ot = It[typeof window] && window && window.Object && window,
                  Ft =
                    (Lt && Lt.exports,
                    (Et && Lt && "object" == typeof n && n && n.Object && n) ||
                      (Ot !== (this && this.window) && Ot) ||
                      zt ||
                      this),
                  jt = (function t(e) {
                    function s(t) {
                      if (y(t) && !(rr(t) || t instanceof w)) {
                        if (t instanceof n) return t;
                        if (Bi.call(t, "__chain__") && Bi.call(t, "__wrapped__"))
                          return ws(t);
                      }
                      return new n(t);
                    }
                    function i() {}
                    function n(t, e, s) {
                      (this.__wrapped__ = t),
                        (this.__actions__ = s || []),
                        (this.__chain__ = !!e);
                    }
                    function w(t) {
                      (this.__wrapped__ = t),
                        (this.__actions__ = []),
                        (this.__dir__ = 1),
                        (this.__filtered__ = !1),
                        (this.__iteratees__ = []),
                        (this.__takeCount__ = rn),
                        (this.__views__ = []);
                    }
                    function At() {
                      this.__data__ = {};
                    }
                    function Pt(t) {
                      var e = t ? t.length : 0;
                      for (this.data = { hash: Gi(null), set: new Vi() }; e--; )
                        this.push(t[e]);
                    }
                    function Mt(t, e) {
                      var s = t.data;
                      return (
                        "string" == typeof e || Gs(e) ? s.set.has(e) : s.hash[e]
                      )
                        ? 0
                        : -1;
                    }
                    function It(t, e) {
                      var s = -1,
                        i = t.length;
                      for (e || (e = vi(i)); ++s < i; ) e[s] = t[s];
                      return e;
                    }
                    function Bt(t, e) {
                      for (
                        var s = -1, i = t.length;
                        ++s < i && !1 !== e(t[s], s, t);
  
                      );
                      return t;
                    }
                    function Dt(t, e) {
                      for (var s = -1, i = t.length; ++s < i; )
                        if (!e(t[s], s, t)) return !1;
                      return !0;
                    }
                    function Et(t, e) {
                      for (var s = -1, i = t.length, n = -1, r = []; ++s < i; ) {
                        var o = t[s];
                        e(o, s, t) && (r[++n] = o);
                      }
                      return r;
                    }
                    function Lt(t, e) {
                      for (var s = -1, i = t.length, n = vi(i); ++s < i; )
                        n[s] = e(t[s], s, t);
                      return n;
                    }
                    function zt(t, e) {
                      for (var s = -1, i = e.length, n = t.length; ++s < i; )
                        t[n + s] = e[s];
                      return t;
                    }
                    function Ot(t, e, s, i) {
                      var n = -1,
                        r = t.length;
                      for (i && r && (s = t[++n]); ++n < r; )
                        s = e(s, t[n], n, t);
                      return s;
                    }
                    function Rt(t, e) {
                      for (var s = -1, i = t.length; ++s < i; )
                        if (e(t[s], s, t)) return !0;
                      return !1;
                    }
                    function Wt(t, e, s, i) {
                      return t !== C && Bi.call(i, s) ? t : e;
                    }
                    function Vt(t, e, s) {
                      for (var i = -1, n = mr(e), r = n.length; ++i < r; ) {
                        var o = n[i],
                          a = t[o],
                          h = s(a, e[o], o, t, e);
                        ((h == h ? h === a : a != a) && (a !== C || o in t)) ||
                          (t[o] = h);
                      }
                      return t;
                    }
                    function Ht(t, e) {
                      return null == e ? t : Zt(e, mr(e), t);
                    }
                    function Nt(t, e) {
                      for (
                        var s = -1,
                          i = null == t,
                          n = !i && as(t),
                          r = n ? t.length : 0,
                          o = e.length,
                          a = vi(o);
                        ++s < o;
  
                      ) {
                        var h = e[s];
                        a[s] = n ? (hs(h, r) ? t[h] : C) : i ? C : t[h];
                      }
                      return a;
                    }
                    function Zt(t, e, s) {
                      s || (s = {});
                      for (var i = -1, n = e.length; ++i < n; ) {
                        var r = e[i];
                        s[r] = t[r];
                      }
                      return s;
                    }
                    function Ut(t, e, s) {
                      var i = typeof t;
                      return "function" == i
                        ? e === C
                          ? t
                          : Te(t, e, s)
                        : null == t
                        ? di
                        : "object" == i
                        ? ae(t)
                        : e === C
                        ? mi(t)
                        : he(t, e);
                    }
                    function qt(t, e, s, i, n, r, o) {
                      var a;
                      if ((s && (a = n ? s(t, i, n) : s(t)), a !== C)) return a;
                      if (!Gs(t)) return t;
                      if ((i = rr(t))) {
                        if (
                          ((a = (function (t) {
                            var e = t.length,
                              s = new t.constructor(e);
                            return (
                              e &&
                                "string" == typeof t[0] &&
                                Bi.call(t, "index") &&
                                ((s.index = t.index), (s.input = t.input)),
                              s
                            );
                          })(t)),
                          !e)
                        )
                          return It(t, a);
                      } else {
                        var h = Ei.call(t),
                          l = h == F;
                        if (h != R && h != D && (!l || n))
                          return St[h]
                            ? (function (t, e, s) {
                                var i = t.constructor;
                                switch (e) {
                                  case H:
                                    return Ce(t);
                                  case L:
                                  case z:
                                    return new i(+t);
                                  case N:
                                  case Z:
                                  case U:
                                  case q:
                                  case G:
                                  case Y:
                                  case X:
                                  case K:
                                  case J:
                                    return (
                                      (e = t.buffer),
                                      new i(s ? Ce(e) : e, t.byteOffset, t.length)
                                    );
                                  case j:
                                  case V:
                                    return new i(t);
                                  case W:
                                    var n = new i(t.source, mt.exec(t));
                                    n.lastIndex = t.lastIndex;
                                }
                                return n;
                              })(t, h, e)
                            : n
                            ? t
                            : {};
                        if (
                          ((a = (function (t) {
                            return (
                              ("function" == typeof (t = t.constructor) &&
                                t instanceof t) ||
                                (t = Ti),
                              new t()
                            );
                          })(l ? {} : t)),
                          !e)
                        )
                          return Ht(a, t);
                      }
                      for (r || (r = []), o || (o = []), n = r.length; n--; )
                        if (r[n] == t) return o[n];
                      return (
                        r.push(t),
                        o.push(a),
                        (i ? Bt : te)(t, function (i, n) {
                          a[n] = qt(i, e, s, n, t, r, o);
                        }),
                        a
                      );
                    }
                    function Gt(t, e, s) {
                      if ("function" != typeof t) throw new Si(I);
                      return Hi(function () {
                        t.apply(C, s);
                      }, e);
                    }
                    function Yt(t, e) {
                      var s = t ? t.length : 0,
                        i = [];
                      if (!s) return i;
                      var n = -1,
                        r = is(),
                        o = r === a,
                        h = o && e.length >= M && Gi && Vi ? new Pt(e) : null,
                        l = e.length;
                      h && ((r = Mt), (o = !1), (e = h));
                      t: for (; ++n < s; )
                        if (((h = t[n]), o && h == h)) {
                          for (var c = l; c--; ) if (e[c] === h) continue t;
                          i.push(h);
                        } else 0 > r(e, h, 0) && i.push(h);
                      return i;
                    }
                    function Xt(t, e) {
                      var s = !0;
                      return (
                        dn(t, function (t, i, n) {
                          return (s = !!e(t, i, n));
                        }),
                        s
                      );
                    }
                    function Kt(t, e) {
                      var s = [];
                      return (
                        dn(t, function (t, i, n) {
                          e(t, i, n) && s.push(t);
                        }),
                        s
                      );
                    }
                    function Jt(t, e, s, i) {
                      var n;
                      return (
                        s(t, function (t, s, r) {
                          return e(t, s, r) ? ((n = i ? s : t), !1) : void 0;
                        }),
                        n
                      );
                    }
                    function $t(t, e, s, i) {
                      i || (i = []);
                      for (var n = -1, r = t.length; ++n < r; ) {
                        var o = t[n];
                        y(o) && as(o) && (s || rr(o) || Ns(o))
                          ? e
                            ? $t(o, e, s, i)
                            : zt(i, o)
                          : s || (i[i.length] = o);
                      }
                      return i;
                    }
                    function Qt(t, e) {
                      fn(t, e, ni);
                    }
                    function te(t, e) {
                      return fn(t, e, mr);
                    }
                    function ee(t, e) {
                      return gn(t, e, mr);
                    }
                    function se(t, e) {
                      for (var s = -1, i = e.length, n = -1, r = []; ++s < i; ) {
                        var o = e[s];
                        qs(t[o]) && (r[++n] = o);
                      }
                      return r;
                    }
                    function ie(t, e, s) {
                      if (null != t) {
                        s !== C && s in vs(t) && (e = [s]), (s = 0);
                        for (var i = e.length; null != t && i > s; )
                          t = t[e[s++]];
                        return s && s == i ? t : C;
                      }
                    }
                    function ne(t, e, s, i, n, r) {
                      if (t === e) t = !0;
                      else if (null == t || null == e || (!Gs(t) && !y(e)))
                        t = t != t && e != e;
                      else
                        t: {
                          var o = ne,
                            a = rr(t),
                            h = rr(e),
                            l = E,
                            c = E;
                          a ||
                            ((l = Ei.call(t)) == D
                              ? (l = R)
                              : l != R && (a = Qs(t))),
                            h ||
                              ((c = Ei.call(e)) == D ? (c = R) : c != R && Qs(e));
                          var u = l == R;
                          if (((h = c == R), !(c = l == c) || a || u)) {
                            if (
                              !i &&
                              ((l = u && Bi.call(t, "__wrapped__")),
                              (h = h && Bi.call(e, "__wrapped__")),
                              l || h)
                            ) {
                              t = o(
                                l ? t.value() : t,
                                h ? e.value() : e,
                                s,
                                i,
                                n,
                                r
                              );
                              break t;
                            }
                            if (c) {
                              for (
                                n || (n = []), r || (r = []), l = n.length;
                                l--;
  
                              )
                                if (n[l] == t) {
                                  t = r[l] == e;
                                  break t;
                                }
                              n.push(t),
                                r.push(e),
                                (t = (a ? Qe : ts)(t, e, o, s, i, n, r)),
                                n.pop(),
                                r.pop();
                            } else t = !1;
                          } else
                            t = (function (t, e, s) {
                              switch (s) {
                                case L:
                                case z:
                                  return +t == +e;
                                case O:
                                  return (
                                    t.name == e.name && t.message == e.message
                                  );
                                case j:
                                  return t != +t ? e != +e : t == +e;
                                case W:
                                case V:
                                  return t == e + "";
                              }
                              return !1;
                            })(t, e, l);
                        }
                      return t;
                    }
                    function re(t, e, s) {
                      var i = e.length,
                        n = i,
                        r = !s;
                      if (null == t) return !n;
                      for (t = vs(t); i--; ) {
                        var o = e[i];
                        if (r && o[2] ? o[1] !== t[o[0]] : !(o[0] in t))
                          return !1;
                      }
                      for (; ++i < n; ) {
                        var a = (o = e[i])[0],
                          h = t[a],
                          l = o[1];
                        if (r && o[2]) {
                          if (h === C && !(a in t)) return !1;
                        } else if (
                          (o = s ? s(h, l, a) : C) === C ? !ne(l, h, s, !0) : !o
                        )
                          return !1;
                      }
                      return !0;
                    }
                    function oe(t, e) {
                      var s = -1,
                        i = as(t) ? vi(t.length) : [];
                      return (
                        dn(t, function (t, n, r) {
                          i[++s] = e(t, n, r);
                        }),
                        i
                      );
                    }
                    function ae(t) {
                      var e = ns(t);
                      if (1 == e.length && e[0][2]) {
                        var s = e[0][0],
                          i = e[0][1];
                        return function (t) {
                          return (
                            null != t && t[s] === i && (i !== C || s in vs(t))
                          );
                        };
                      }
                      return function (t) {
                        return re(t, e);
                      };
                    }
                    function he(t, e) {
                      var s = rr(t),
                        i = cs(t) && e == e && !Gs(e),
                        n = t + "";
                      return (
                        (t = ys(t)),
                        function (r) {
                          if (null == r) return !1;
                          var o = n;
                          if (((r = vs(r)), !((!s && i) || o in r))) {
                            if (
                              null ==
                              (r = 1 == t.length ? r : ie(r, pe(t, 0, -1)))
                            )
                              return !1;
                            (o = Cs(t)), (r = vs(r));
                          }
                          return r[o] === e
                            ? e !== C || o in r
                            : ne(e, r[o], C, !0);
                        }
                      );
                    }
                    function le(t) {
                      return function (e) {
                        return null == e ? C : e[t];
                      };
                    }
                    function ce(t, e) {
                      for (var s = t ? e.length : 0; s--; ) {
                        var i = e[s];
                        if (i != n && hs(i)) {
                          var n = i;
                          Ni.call(t, i, 1);
                        }
                      }
                    }
                    function ue(t, e) {
                      return t + Yi(sn() * (e - t + 1));
                    }
                    function de(t, e, s, i, n) {
                      return (
                        n(t, function (t, n, r) {
                          s = i ? ((i = !1), t) : e(s, t, n, r);
                        }),
                        s
                      );
                    }
                    function pe(t, e, s) {
                      var i = -1,
                        n = t.length;
                      for (
                        0 > (e = null == e ? 0 : +e || 0) &&
                          (e = -e > n ? 0 : n + e),
                          0 > (s = s === C || s > n ? n : +s || 0) && (s += n),
                          n = e > s ? 0 : (s - e) >>> 0,
                          e >>>= 0,
                          s = vi(n);
                        ++i < n;
  
                      )
                        s[i] = t[i + e];
                      return s;
                    }
                    function fe(t, e) {
                      var s;
                      return (
                        dn(t, function (t, i, n) {
                          return !(s = e(t, i, n));
                        }),
                        !!s
                      );
                    }
                    function ge(t, e) {
                      var s = t.length;
                      for (t.sort(e); s--; ) t[s] = t[s].c;
                      return t;
                    }
                    function me(t, e, s) {
                      var i = es(),
                        n = -1;
                      return (
                        (e = Lt(e, function (t) {
                          return i(t);
                        })),
                        (t = oe(t, function (t) {
                          return {
                            a: Lt(e, function (e) {
                              return e(t);
                            }),
                            b: ++n,
                            c: t,
                          };
                        })),
                        ge(t, function (t, e) {
                          var i;
                          t: {
                            for (
                              var n = -1,
                                o = t.a,
                                a = e.a,
                                h = o.length,
                                l = s.length;
                              ++n < h;
  
                            )
                              if ((i = r(o[n], a[n]))) {
                                if (n >= l) break t;
                                i *= "asc" === (n = s[n]) || !0 === n ? 1 : -1;
                                break t;
                              }
                            i = t.b - e.b;
                          }
                          return i;
                        })
                      );
                    }
                    function ve(t, e) {
                      var s = -1,
                        i = is(),
                        n = t.length,
                        r = i === a,
                        o = r && n >= M,
                        h = o && Gi && Vi ? new Pt(void 0) : null,
                        l = [];
                      h ? ((i = Mt), (r = !1)) : ((o = !1), (h = e ? [] : l));
                      t: for (; ++s < n; ) {
                        var c = t[s],
                          u = e ? e(c, s, t) : c;
                        if (r && c == c) {
                          for (var d = h.length; d--; )
                            if (h[d] === u) continue t;
                          e && h.push(u), l.push(c);
                        } else
                          0 > i(h, u, 0) && ((e || o) && h.push(u), l.push(c));
                      }
                      return l;
                    }
                    function ye(t, e) {
                      for (var s = -1, i = e.length, n = vi(i); ++s < i; )
                        n[s] = t[e[s]];
                      return n;
                    }
                    function we(t, e, s, i) {
                      for (
                        var n = t.length, r = i ? n : -1;
                        (i ? r-- : ++r < n) && e(t[r], r, t);
  
                      );
                      return s
                        ? pe(t, i ? 0 : r, i ? r + 1 : n)
                        : pe(t, i ? r + 1 : 0, i ? n : r);
                    }
                    function xe(t, e) {
                      (r = t) instanceof w && (r = r.value());
                      for (var s = -1, i = e.length; ++s < i; )
                        var n = e[s],
                          r = n.func.apply(n.thisArg, zt([r], n.args));
                      return r;
                    }
                    function be(t, e, s) {
                      var i = 0,
                        n = t ? t.length : i;
                      if ("number" == typeof e && e == e && an >= n) {
                        for (; n > i; ) {
                          var r = (i + n) >>> 1,
                            o = t[r];
                          (s ? e >= o : e > o) && null !== o
                            ? (i = r + 1)
                            : (n = r);
                        }
                        return n;
                      }
                      return _e(t, e, di, s);
                    }
                    function _e(t, e, s, i) {
                      e = s(e);
                      for (
                        var n = 0,
                          r = t ? t.length : 0,
                          o = e != e,
                          a = null === e,
                          h = e === C;
                        r > n;
  
                      ) {
                        var l = Yi((n + r) / 2),
                          c = s(t[l]),
                          u = c !== C,
                          d = c == c;
                        (
                          o
                            ? d || i
                            : a
                            ? d && u && (i || null != c)
                            : h
                            ? d && (i || u)
                            : null != c && (i ? e >= c : e > c)
                        )
                          ? (n = l + 1)
                          : (r = l);
                      }
                      return Qi(r, on);
                    }
                    function Te(t, e, s) {
                      if ("function" != typeof t) return di;
                      if (e === C) return t;
                      switch (s) {
                        case 1:
                          return function (s) {
                            return t.call(e, s);
                          };
                        case 3:
                          return function (s, i, n) {
                            return t.call(e, s, i, n);
                          };
                        case 4:
                          return function (s, i, n, r) {
                            return t.call(e, s, i, n, r);
                          };
                        case 5:
                          return function (s, i, n, r, o) {
                            return t.call(e, s, i, n, r, o);
                          };
                      }
                      return function () {
                        return t.apply(e, arguments);
                      };
                    }
                    function Ce(t) {
                      var e = new Oi(t.byteLength);
                      return new Zi(e).set(new Zi(t)), e;
                    }
                    function ke(t, e, s) {
                      for (
                        var i = s.length,
                          n = -1,
                          r = $i(t.length - i, 0),
                          o = -1,
                          a = e.length,
                          h = vi(a + r);
                        ++o < a;
  
                      )
                        h[o] = e[o];
                      for (; ++n < i; ) h[s[n]] = t[n];
                      for (; r--; ) h[o++] = t[n++];
                      return h;
                    }
                    function Se(t, e, s) {
                      for (
                        var i = -1,
                          n = s.length,
                          r = -1,
                          o = $i(t.length - n, 0),
                          a = -1,
                          h = e.length,
                          l = vi(o + h);
                        ++r < o;
  
                      )
                        l[r] = t[r];
                      for (o = r; ++a < h; ) l[o + a] = e[a];
                      for (; ++i < n; ) l[o + s[i]] = t[r++];
                      return l;
                    }
                    function Ae(t, e) {
                      return function (s, i, n) {
                        var r = e ? e() : {};
                        if (((i = es(i, n, 3)), rr(s))) {
                          n = -1;
                          for (var o = s.length; ++n < o; ) {
                            var a = s[n];
                            t(r, a, i(a, n, s), s);
                          }
                        } else
                          dn(s, function (e, s, n) {
                            t(r, e, i(e, s, n), n);
                          });
                        return r;
                      };
                    }
                    function Pe(t) {
                      return Vs(function (e, s) {
                        var i = -1,
                          n = null == e ? 0 : s.length,
                          r = n > 2 ? s[n - 2] : C,
                          o = n > 2 ? s[2] : C,
                          a = n > 1 ? s[n - 1] : C;
                        for (
                          "function" == typeof r
                            ? ((r = Te(r, a, 5)), (n -= 2))
                            : (n -= (r = "function" == typeof a ? a : C) ? 1 : 0),
                            o &&
                              ls(s[0], s[1], o) &&
                              ((r = 3 > n ? C : r), (n = 1));
                          ++i < n;
  
                        )
                          (o = s[i]) && t(e, o, r);
                        return e;
                      });
                    }
                    function Me(t, e) {
                      return function (s, i) {
                        var n = s ? yn(s) : 0;
                        if (!ds(n)) return t(s, i);
                        for (
                          var r = e ? n : -1, o = vs(s);
                          (e ? r-- : ++r < n) && !1 !== i(o[r], r, o);
  
                        );
                        return s;
                      };
                    }
                    function Ie(t) {
                      return function (e, s, i) {
                        for (
                          var n = vs(e), r = (i = i(e)).length, o = t ? r : -1;
                          t ? o-- : ++o < r;
  
                        ) {
                          var a = i[o];
                          if (!1 === s(n[a], a, n)) break;
                        }
                        return e;
                      };
                    }
                    function Be(t) {
                      return function (e) {
                        for (
                          var s = -1, i = (e = ci(ai(e))).length, n = "";
                          ++s < i;
  
                        )
                          n = t(n, e[s], s);
                        return n;
                      };
                    }
                    function De(t) {
                      return function () {
                        switch ((e = arguments).length) {
                          case 0:
                            return new t();
                          case 1:
                            return new t(e[0]);
                          case 2:
                            return new t(e[0], e[1]);
                          case 3:
                            return new t(e[0], e[1], e[2]);
                          case 4:
                            return new t(e[0], e[1], e[2], e[3]);
                          case 5:
                            return new t(e[0], e[1], e[2], e[3], e[4]);
                          case 6:
                            return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                          case 7:
                            return new t(
                              e[0],
                              e[1],
                              e[2],
                              e[3],
                              e[4],
                              e[5],
                              e[6]
                            );
                        }
                        var e,
                          s = un(t.prototype);
                        return Gs((e = t.apply(s, e))) ? e : s;
                      };
                    }
                    function Ee(t) {
                      return function e(s, i, n) {
                        return (
                          n && ls(s, i, n) && (i = C),
                          ((s = $e(s, t, C, C, C, C, C, i)).placeholder =
                            e.placeholder),
                          s
                        );
                      };
                    }
                    function Le(t, e) {
                      return Vs(function (s) {
                        var i = s[0];
                        return null == i ? i : (s.push(e), t.apply(C, s));
                      });
                    }
                    function ze(t, e) {
                      return function (s, i, n) {
                        if (
                          (n && ls(s, i, n) && (i = C),
                          1 == (i = es(i, n, 3)).length)
                        ) {
                          for (
                            var r = i,
                              o = -1,
                              a = (n = s = rr(s) ? s : ms(s)).length,
                              h = e,
                              l = h;
                            ++o < a;
  
                          ) {
                            var c = n[o],
                              u = +r(c);
                            t(u, h) && ((h = u), (l = c));
                          }
                          if (((n = l), !s.length || n !== e)) return n;
                        }
                        return (function (t, e, s, i) {
                          var n = i,
                            r = n;
                          return (
                            dn(t, function (t, o, a) {
                              (o = +e(t, o, a)),
                                (s(o, n) || (o === i && o === r)) &&
                                  ((n = o), (r = t));
                            }),
                            r
                          );
                        })(s, i, t, e);
                      };
                    }
                    function Oe(t, e) {
                      return function (s, i, n) {
                        return (
                          (i = es(i, n, 3)),
                          rr(s) ? ((i = o(s, i, e)) > -1 ? s[i] : C) : Jt(s, i, t)
                        );
                      };
                    }
                    function Fe(t) {
                      return function (e, s, i) {
                        return e && e.length ? o(e, (s = es(s, i, 3)), t) : -1;
                      };
                    }
                    function je(t) {
                      return function (e, s, i) {
                        return Jt(e, (s = es(s, i, 3)), t, !0);
                      };
                    }
                    function Re(t) {
                      return function () {
                        for (
                          var e,
                            s = arguments.length,
                            i = t ? s : -1,
                            r = 0,
                            o = vi(s);
                          t ? i-- : ++i < s;
  
                        ) {
                          if ("function" != typeof (a = o[r++] = arguments[i]))
                            throw new Si(I);
                          !e &&
                            n.prototype.thru &&
                            "wrapper" == ss(a) &&
                            (e = new n([], !0));
                        }
                        for (i = e ? -1 : s; ++i < s; ) {
                          var a,
                            h = "wrapper" == (r = ss((a = o[i]))) ? vn(a) : C;
                          e =
                            h &&
                            us(h[0]) &&
                            424 == h[1] &&
                            !h[4].length &&
                            1 == h[9]
                              ? e[ss(h[0])].apply(e, h[3])
                              : 1 == a.length && us(a)
                              ? e[r]()
                              : e.thru(a);
                        }
                        return function () {
                          var t = (n = arguments)[0];
                          if (e && 1 == n.length && rr(t) && t.length >= M)
                            return e.plant(t).value();
                          for (
                            var i = 0, n = s ? o[i].apply(this, n) : t;
                            ++i < s;
  
                          )
                            n = o[i].call(this, n);
                          return n;
                        };
                      };
                    }
                    function We(t, e) {
                      return function (s, i, n) {
                        return "function" == typeof i && n === C && rr(s)
                          ? t(s, i)
                          : e(s, Te(i, n, 3));
                      };
                    }
                    function Ve(t) {
                      return function (e, s, i) {
                        return (
                          ("function" != typeof s || i !== C) &&
                            (s = Te(s, i, 3)),
                          t(e, s, ni)
                        );
                      };
                    }
                    function He(t) {
                      return function (e, s, i) {
                        return (
                          ("function" != typeof s || i !== C) &&
                            (s = Te(s, i, 3)),
                          t(e, s)
                        );
                      };
                    }
                    function Ne(t) {
                      return function (e, s, i) {
                        var n = {};
                        return (
                          (s = es(s, i, 3)),
                          te(e, function (e, i, r) {
                            (r = s(e, i, r)),
                              (e = t ? e : r),
                              (n[(i = t ? r : i)] = e);
                          }),
                          n
                        );
                      };
                    }
                    function Ze(t) {
                      return function (e, s, i) {
                        return (
                          (e = l(e)), (t ? e : "") + Ye(e, s, i) + (t ? "" : e)
                        );
                      };
                    }
                    function Ue(t) {
                      var e = Vs(function (s, i) {
                        var n = x(i, e.placeholder);
                        return $e(s, t, C, i, n);
                      });
                      return e;
                    }
                    function qe(t, e) {
                      return function (s, i, n, r) {
                        var o = 3 > arguments.length;
                        return "function" == typeof i && r === C && rr(s)
                          ? t(s, i, n, o)
                          : de(s, es(i, r, 4), n, o, e);
                      };
                    }
                    function Ge(t, e, s, i, n, r, o, a, h, l) {
                      var c = e & A,
                        u = 1 & e,
                        d = 2 & e,
                        p = 8 & e,
                        f = 4 & e,
                        g = 16 & e,
                        m = d ? C : De(t);
                      return function v() {
                        for (var y = (b = arguments.length), w = vi(b); y--; )
                          w[y] = arguments[y];
                        if (
                          (i && (w = ke(w, i, n)), r && (w = Se(w, r, o)), p || g)
                        ) {
                          var b = b - (_ = x(w, (y = v.placeholder))).length;
                          if (l > b) {
                            var _,
                              T = a ? It(a) : C,
                              A = ((b = $i(l - b, 0)), p ? _ : C),
                              P = p ? w : C;
                            return (
                              (e |= p ? k : S),
                              (e &= ~(p ? S : k)),
                              f || (e &= -4),
                              (w = [
                                t,
                                e,
                                s,
                                P,
                                A,
                                (w = p ? C : w),
                                (_ = p ? C : _),
                                T,
                                h,
                                b,
                              ]),
                              (T = Ge.apply(C, w)),
                              us(t) && wn(T, w),
                              (T.placeholder = y),
                              T
                            );
                          }
                        }
                        if (((y = u ? s : this), (T = d ? y[t] : t), a))
                          for (
                            b = w.length, A = Qi(a.length, b), _ = It(w);
                            A--;
  
                          )
                            (P = a[A]), (w[A] = hs(P, b) ? _[P] : C);
                        return (
                          c && h < w.length && (w.length = h),
                          this &&
                            this !== Ft &&
                            this instanceof v &&
                            (T = m || De(t)),
                          T.apply(y, w)
                        );
                      };
                    }
                    function Ye(t, e, s) {
                      return (e = +e) > (t = t.length) && Ki(e)
                        ? hi(
                            (s = null == s ? " " : s + ""),
                            qi((e -= t) / s.length)
                          ).slice(0, e)
                        : "";
                    }
                    function Xe(t, e, s, i) {
                      var n = 1 & e,
                        r = De(t);
                      return function e() {
                        for (
                          var o = -1,
                            a = arguments.length,
                            h = -1,
                            l = i.length,
                            c = vi(l + a);
                          ++h < l;
  
                        )
                          c[h] = i[h];
                        for (; a--; ) c[h++] = arguments[++o];
                        return (
                          this && this !== Ft && this instanceof e ? r : t
                        ).apply(n ? s : this, c);
                      };
                    }
                    function Ke(t) {
                      var e = bi[t];
                      return function (t, s) {
                        return (s = s === C ? 0 : +s || 0)
                          ? ((s = Ri(10, s)), e(t * s) / s)
                          : e(t);
                      };
                    }
                    function Je(t) {
                      return function (e, s, i, n) {
                        var r = es(i);
                        return null == i && r === Ut
                          ? be(e, s, t)
                          : _e(e, s, r(i, n, 1), t);
                      };
                    }
                    function $e(t, e, s, i, n, r, o, a) {
                      var h = 2 & e;
                      if (!h && "function" != typeof t) throw new Si(I);
                      var l = i ? i.length : 0;
                      if (
                        (l || ((e &= -97), (i = n = C)),
                        (l -= n ? n.length : 0),
                        e & S)
                      ) {
                        var c = i,
                          u = n;
                        i = n = C;
                      }
                      var d = h ? C : vn(t);
                      return (
                        (s = [t, e, s, i, n, c, u, r, o, a]),
                        d &&
                          ((a = (i = s[1]) | (e = d[1])),
                          (n =
                            (e == A && 8 == i) ||
                            (e == A && i == P && s[7].length <= d[8]) ||
                            (384 == e && 8 == i)),
                          (A > a || n) &&
                            (1 & e && ((s[2] = d[2]), (a |= 1 & i ? 0 : 4)),
                            (i = d[3]) &&
                              ((n = s[3]),
                              (s[3] = n ? ke(n, i, d[4]) : It(i)),
                              (s[4] = n ? x(s[3], B) : It(d[4]))),
                            (i = d[5]) &&
                              ((n = s[5]),
                              (s[5] = n ? Se(n, i, d[6]) : It(i)),
                              (s[6] = n ? x(s[5], B) : It(d[6]))),
                            (i = d[7]) && (s[7] = It(i)),
                            e & A &&
                              (s[8] = null == s[8] ? d[8] : Qi(s[8], d[8])),
                            null == s[9] && (s[9] = d[9]),
                            (s[0] = d[0]),
                            (s[1] = a)),
                          (e = s[1]),
                          (a = s[9])),
                        (s[9] =
                          null == a ? (h ? 0 : t.length) : $i(a - l, 0) || 0),
                        (d ? mn : wn)(
                          1 == e
                            ? (function (t, e) {
                                var s = De(t);
                                return function i() {
                                  return (
                                    this && this !== Ft && this instanceof i
                                      ? s
                                      : t
                                  ).apply(e, arguments);
                                };
                              })(s[0], s[2])
                            : (e != k && 33 != e) || s[4].length
                            ? Ge.apply(C, s)
                            : Xe.apply(C, s),
                          s
                        )
                      );
                    }
                    function Qe(t, e, s, i, n, r, o) {
                      var a = -1,
                        h = t.length;
                      if (h != (c = e.length) && (!n || h >= c)) return !1;
                      for (; ++a < h; ) {
                        var l = t[a],
                          c = e[a],
                          u = i ? i(n ? c : l, n ? l : c, a) : C;
                        if (u !== C) {
                          if (u) continue;
                          return !1;
                        }
                        if (n) {
                          if (
                            !Rt(e, function (t) {
                              return l === t || s(l, t, i, n, r, o);
                            })
                          )
                            return !1;
                        } else if (l !== c && !s(l, c, i, n, r, o)) return !1;
                      }
                      return !0;
                    }
                    function ts(t, e, s, i, n, r, o) {
                      var a = mr(t),
                        h = a.length,
                        l = mr(e).length;
                      if (h != l && !n) return !1;
                      for (l = h; l--; ) {
                        var c = a[l];
                        if (!(n ? c in e : Bi.call(e, c))) return !1;
                      }
                      for (var u = n; ++l < h; ) {
                        var d = t[(c = a[l])],
                          p = e[c],
                          f = i ? i(n ? p : d, n ? d : p, c) : C;
                        if (f === C ? !s(d, p, i, n, r, o) : !f) return !1;
                        u || (u = "constructor" == c);
                      }
                      return !(
                        !u &&
                        ((s = t.constructor),
                        (i = e.constructor),
                        s != i &&
                          "constructor" in t &&
                          "constructor" in e &&
                          !(
                            "function" == typeof s &&
                            s instanceof s &&
                            "function" == typeof i &&
                            i instanceof i
                          ))
                      );
                    }
                    function es(t, e, i) {
                      var n = (n = s.callback || ui) === ui ? Ut : n;
                      return i ? n(t, e, i) : n;
                    }
                    function ss(t) {
                      for (
                        var e = t.name + "", s = cn[e], i = s ? s.length : 0;
                        i--;
  
                      ) {
                        var n = s[i],
                          r = n.func;
                        if (null == r || r == t) return n.name;
                      }
                      return e;
                    }
                    function is(t, e, i) {
                      var n = (n = s.indexOf || Ts) === Ts ? a : n;
                      return t ? n(t, e, i) : n;
                    }
                    function ns(t) {
                      for (var e = (t = ri(t)).length; e--; ) {
                        var s = t[e][1];
                        t[e][2] = s == s && !Gs(s);
                      }
                      return t;
                    }
                    function rs(t, e) {
                      var s = null == t ? C : t[e];
                      return Ys(s) ? s : C;
                    }
                    function os(t, e, s) {
                      return (
                        null == t ||
                          cs(e, t) ||
                          ((t =
                            1 == (e = ys(e)).length ? t : ie(t, pe(e, 0, -1))),
                          (e = Cs(e))),
                        null == (e = null == t ? t : t[e]) ? C : e.apply(t, s)
                      );
                    }
                    function as(t) {
                      return null != t && ds(yn(t));
                    }
                    function hs(t, e) {
                      return (
                        (t = "number" == typeof t || wt.test(t) ? +t : -1),
                        (e = null == e ? hn : e),
                        t > -1 && 0 == t % 1 && e > t
                      );
                    }
                    function ls(t, e, s) {
                      if (!Gs(s)) return !1;
                      var i = typeof e;
                      return (
                        !!("number" == i
                          ? as(s) && hs(e, s.length)
                          : "string" == i && e in s) &&
                        ((e = s[e]), t == t ? t === e : e != e)
                      );
                    }
                    function cs(t, e) {
                      var s = typeof t;
                      return (
                        !!(("string" == s && lt.test(t)) || "number" == s) ||
                        (!rr(t) && (!ht.test(t) || (null != e && t in vs(e))))
                      );
                    }
                    function us(t) {
                      var e = ss(t),
                        i = s[e];
                      return (
                        "function" == typeof i &&
                        e in w.prototype &&
                        (t === i || (!!(e = vn(i)) && t === e[0]))
                      );
                    }
                    function ds(t) {
                      return (
                        "number" == typeof t && t > -1 && 0 == t % 1 && hn >= t
                      );
                    }
                    function ps(t, e) {
                      t = vs(t);
                      for (var s = -1, i = e.length, n = {}; ++s < i; ) {
                        var r = e[s];
                        r in t && (n[r] = t[r]);
                      }
                      return n;
                    }
                    function fs(t, e) {
                      var s = {};
                      return (
                        Qt(t, function (t, i, n) {
                          e(t, i, n) && (s[i] = t);
                        }),
                        s
                      );
                    }
                    function gs(t) {
                      for (
                        var e = ni(t),
                          s = e.length,
                          i = s && t.length,
                          n = !!i && ds(i) && (rr(t) || Ns(t)),
                          r = -1,
                          o = [];
                        ++r < s;
  
                      ) {
                        var a = e[r];
                        ((n && hs(a, i)) || Bi.call(t, a)) && o.push(a);
                      }
                      return o;
                    }
                    function ms(t) {
                      return null == t ? [] : as(t) ? (Gs(t) ? t : Ti(t)) : oi(t);
                    }
                    function vs(t) {
                      return Gs(t) ? t : Ti(t);
                    }
                    function ys(t) {
                      if (rr(t)) return t;
                      var e = [];
                      return (
                        l(t).replace(ct, function (t, s, i, n) {
                          e.push(i ? n.replace(ft, "$1") : s || t);
                        }),
                        e
                      );
                    }
                    function ws(t) {
                      return t instanceof w
                        ? t.clone()
                        : new n(t.__wrapped__, t.__chain__, It(t.__actions__));
                    }
                    function xs(t, e, s) {
                      return t && t.length
                        ? ((s ? ls(t, e, s) : null == e) && (e = 1),
                          pe(t, 0 > e ? 0 : e))
                        : [];
                    }
                    function bs(t, e, s) {
                      var i = t ? t.length : 0;
                      return i
                        ? ((s ? ls(t, e, s) : null == e) && (e = 1),
                          pe(t, 0, 0 > (e = i - (+e || 0)) ? 0 : e))
                        : [];
                    }
                    function _s(t) {
                      return t ? t[0] : C;
                    }
                    function Ts(t, e, s) {
                      var i = t ? t.length : 0;
                      if (!i) return -1;
                      if ("number" == typeof s) s = 0 > s ? $i(i + s, 0) : s;
                      else if (s)
                        return i > (s = be(t, e)) &&
                          (e == e ? e === t[s] : t[s] != t[s])
                          ? s
                          : -1;
                      return a(t, e, s || 0);
                    }
                    function Cs(t) {
                      var e = t ? t.length : 0;
                      return e ? t[e - 1] : C;
                    }
                    function ks(t) {
                      return xs(t, 1);
                    }
                    function Ss(t, e, s, i) {
                      if (!t || !t.length) return [];
                      null != e &&
                        "boolean" != typeof e &&
                        ((s = ls(t, e, (i = s)) ? C : e), (e = !1));
                      var n = es();
                      if (
                        ((null != s || n !== Ut) && (s = n(s, i, 3)),
                        e && is() === a)
                      ) {
                        var r;
                        (e = s), (s = -1), (i = t.length), (n = -1);
                        for (var o = []; ++s < i; ) {
                          var h = t[s],
                            l = e ? e(h, s, t) : h;
                          (s && r === l) || ((r = l), (o[++n] = h));
                        }
                        t = o;
                      } else t = ve(t, s);
                      return t;
                    }
                    function As(t) {
                      if (!t || !t.length) return [];
                      var e = -1,
                        s = 0;
                      t = Et(t, function (t) {
                        return as(t) ? ((s = $i(t.length, s)), !0) : void 0;
                      });
                      for (var i = vi(s); ++e < s; ) i[e] = Lt(t, le(e));
                      return i;
                    }
                    function Ps(t, e, s) {
                      return t && t.length
                        ? ((t = As(t)),
                          null == e
                            ? t
                            : ((e = Te(e, s, 4)),
                              Lt(t, function (t) {
                                return Ot(t, e, C, !0);
                              })))
                        : [];
                    }
                    function Ms(t, e) {
                      var s = -1,
                        i = t ? t.length : 0,
                        n = {};
                      for (!i || e || rr(t[0]) || (e = []); ++s < i; ) {
                        var r = t[s];
                        e ? (n[r] = e[s]) : r && (n[r[0]] = r[1]);
                      }
                      return n;
                    }
                    function Is(t) {
                      return ((t = s(t)).__chain__ = !0), t;
                    }
                    function Bs(t, e, s) {
                      return e.call(s, t);
                    }
                    function Ds(t, e, s) {
                      var i = rr(t) ? Dt : Xt;
                      return (
                        s && ls(t, e, s) && (e = C),
                        ("function" != typeof e || s !== C) && (e = es(e, s, 3)),
                        i(t, e)
                      );
                    }
                    function Es(t, e, s) {
                      return (rr(t) ? Et : Kt)(t, (e = es(e, s, 3)));
                    }
                    function Ls(t, e, s, i) {
                      var n = t ? yn(t) : 0;
                      return (
                        ds(n) || (n = (t = oi(t)).length),
                        (s =
                          "number" != typeof s || (i && ls(e, s, i))
                            ? 0
                            : 0 > s
                            ? $i(n + s, 0)
                            : s || 0),
                        "string" == typeof t || (!rr(t) && $s(t))
                          ? n >= s && -1 < t.indexOf(e, s)
                          : !!n && -1 < is(t, e, s)
                      );
                    }
                    function zs(t, e, s) {
                      return (rr(t) ? Lt : oe)(t, (e = es(e, s, 3)));
                    }
                    function Os(t, e, s) {
                      if (s ? ls(t, e, s) : null == e)
                        return (n = (t = ms(t)).length) > 0 ? t[ue(0, n - 1)] : C;
                      s = -1;
                      var i = (n = (t = ei(t)).length) - 1;
                      for (e = Qi(0 > e ? 0 : +e || 0, n); ++s < e; ) {
                        var n,
                          r = t[(n = ue(s, i))];
                        (t[n] = t[s]), (t[s] = r);
                      }
                      return (t.length = e), t;
                    }
                    function Fs(t, e, s) {
                      var i = rr(t) ? Rt : fe;
                      return (
                        s && ls(t, e, s) && (e = C),
                        ("function" != typeof e || s !== C) && (e = es(e, s, 3)),
                        i(t, e)
                      );
                    }
                    function js(t, e) {
                      var s;
                      if ("function" != typeof e) {
                        if ("function" != typeof t) throw new Si(I);
                        var i = t;
                        (t = e), (e = i);
                      }
                      return function () {
                        return (
                          0 < --t && (s = e.apply(this, arguments)),
                          1 >= t && (e = C),
                          s
                        );
                      };
                    }
                    function Rs(t, e, s) {
                      function i(e, s) {
                        s && Fi(s),
                          (h = d = p = C),
                          e &&
                            ((f = Un()),
                            (l = t.apply(u, a)),
                            d || h || (a = u = C));
                      }
                      function n() {
                        var t = e - (Un() - c);
                        0 >= t || t > e ? i(p, h) : (d = Hi(n, t));
                      }
                      function r() {
                        i(m, d);
                      }
                      function o() {
                        if (
                          ((a = arguments),
                          (c = Un()),
                          (u = this),
                          (p = m && (d || !v)),
                          !1 === g)
                        )
                          var s = v && !d;
                        else {
                          h || v || (f = c);
                          var i = g - (c - f),
                            o = 0 >= i || i > g;
                          o
                            ? (h && (h = Fi(h)), (f = c), (l = t.apply(u, a)))
                            : h || (h = Hi(r, i));
                        }
                        return (
                          o && d ? (d = Fi(d)) : d || e === g || (d = Hi(n, e)),
                          s && ((o = !0), (l = t.apply(u, a))),
                          !o || d || h || (a = u = C),
                          l
                        );
                      }
                      var a,
                        h,
                        l,
                        c,
                        u,
                        d,
                        p,
                        f = 0,
                        g = !1,
                        m = !0;
                      if ("function" != typeof t) throw new Si(I);
                      if (((e = 0 > e ? 0 : +e || 0), !0 === s)) {
                        var v = !0;
                        m = !1;
                      } else
                        Gs(s) &&
                          ((v = !!s.leading),
                          (g = "maxWait" in s && $i(+s.maxWait || 0, e)),
                          (m = "trailing" in s ? !!s.trailing : m));
                      return (
                        (o.cancel = function () {
                          d && Fi(d), h && Fi(h), (f = 0), (h = d = p = C);
                        }),
                        o
                      );
                    }
                    function Ws(t, e) {
                      function s() {
                        var i = arguments,
                          n = e ? e.apply(this, i) : i[0],
                          r = s.cache;
                        return r.has(n)
                          ? r.get(n)
                          : ((i = t.apply(this, i)), (s.cache = r.set(n, i)), i);
                      }
                      if ("function" != typeof t || (e && "function" != typeof e))
                        throw new Si(I);
                      return (s.cache = new Ws.Cache()), s;
                    }
                    function Vs(t, e) {
                      if ("function" != typeof t) throw new Si(I);
                      return (
                        (e = $i(e === C ? t.length - 1 : +e || 0, 0)),
                        function () {
                          for (
                            var s = arguments,
                              i = -1,
                              n = $i(s.length - e, 0),
                              r = vi(n);
                            ++i < n;
  
                          )
                            r[i] = s[e + i];
                          switch (e) {
                            case 0:
                              return t.call(this, r);
                            case 1:
                              return t.call(this, s[0], r);
                            case 2:
                              return t.call(this, s[0], s[1], r);
                          }
                          for (n = vi(e + 1), i = -1; ++i < e; ) n[i] = s[i];
                          return (n[e] = r), t.apply(this, n);
                        }
                      );
                    }
                    function Hs(t, e) {
                      return t > e;
                    }
                    function Ns(t) {
                      return (
                        y(t) &&
                        as(t) &&
                        Bi.call(t, "callee") &&
                        !Wi.call(t, "callee")
                      );
                    }
                    function Zs(t, e, s, i) {
                      return (i = (s = "function" == typeof s ? Te(s, i, 3) : C)
                        ? s(t, e)
                        : C) === C
                        ? ne(t, e, s)
                        : !!i;
                    }
                    function Us(t) {
                      return (
                        y(t) && "string" == typeof t.message && Ei.call(t) == O
                      );
                    }
                    function qs(t) {
                      return Gs(t) && Ei.call(t) == F;
                    }
                    function Gs(t) {
                      var e = typeof t;
                      return !!t && ("object" == e || "function" == e);
                    }
                    function Ys(t) {
                      return (
                        null != t &&
                        (qs(t) ? zi.test(Ii.call(t)) : y(t) && yt.test(t))
                      );
                    }
                    function Xs(t) {
                      return "number" == typeof t || (y(t) && Ei.call(t) == j);
                    }
                    function Ks(t) {
                      var e, s;
                      return (
                        !(
                          !y(t) ||
                          Ei.call(t) != R ||
                          Ns(t) ||
                          !(
                            Bi.call(t, "constructor") ||
                            ((e = t.constructor),
                            "function" != typeof e || e instanceof e)
                          )
                        ) &&
                        (Qt(t, function (t, e) {
                          s = e;
                        }),
                        s === C || Bi.call(t, s))
                      );
                    }
                    function Js(t) {
                      return Gs(t) && Ei.call(t) == W;
                    }
                    function $s(t) {
                      return "string" == typeof t || (y(t) && Ei.call(t) == V);
                    }
                    function Qs(t) {
                      return y(t) && ds(t.length) && !!kt[Ei.call(t)];
                    }
                    function ti(t, e) {
                      return e > t;
                    }
                    function ei(t) {
                      var e = t ? yn(t) : 0;
                      return ds(e) ? (e ? It(t) : []) : oi(t);
                    }
                    function si(t) {
                      return Zt(t, ni(t));
                    }
                    function ii(t) {
                      return se(t, ni(t));
                    }
                    function ni(t) {
                      if (null == t) return [];
                      Gs(t) || (t = Ti(t));
                      for (
                        var e =
                            ((e = t.length) && ds(e) && (rr(t) || Ns(t)) && e) ||
                            0,
                          s = -1,
                          i =
                            "function" == typeof (i = t.constructor) &&
                            i.prototype === t,
                          n = vi(e),
                          r = e > 0;
                        ++s < e;
  
                      )
                        n[s] = s + "";
                      for (var o in t)
                        (r && hs(o, e)) ||
                          ("constructor" == o && (i || !Bi.call(t, o))) ||
                          n.push(o);
                      return n;
                    }
                    function ri(t) {
                      t = vs(t);
                      for (
                        var e = -1, s = mr(t), i = s.length, n = vi(i);
                        ++e < i;
  
                      ) {
                        var r = s[e];
                        n[e] = [r, t[r]];
                      }
                      return n;
                    }
                    function oi(t) {
                      return ye(t, mr(t));
                    }
                    function ai(t) {
                      return (t = l(t)) && t.replace(xt, p).replace(pt, "");
                    }
                    function hi(t, e) {
                      var s = "";
                      if (((t = l(t)), 1 > (e = +e) || !t || !Ki(e))) return s;
                      do {
                        e % 2 && (s += t), (e = Yi(e / 2)), (t += t);
                      } while (e);
                      return s;
                    }
                    function li(t, e, s) {
                      var i = t;
                      return (t = l(t))
                        ? (s ? ls(i, e, s) : null == e)
                          ? t.slice(b(t), _(t) + 1)
                          : ((e += ""), t.slice(c(t, e), u(t, e) + 1))
                        : t;
                    }
                    function ci(t, e, s) {
                      return (
                        s && ls(t, e, s) && (e = C),
                        (t = l(t)).match(e || Tt) || []
                      );
                    }
                    function ui(t, e, s) {
                      return s && ls(t, e, s) && (e = C), y(t) ? pi(t) : Ut(t, e);
                    }
                    function di(t) {
                      return t;
                    }
                    function pi(t) {
                      return ae(qt(t, !0));
                    }
                    function fi(t, e, s) {
                      if (null == s) {
                        var i = (r = Gs(e)) ? mr(e) : C;
                        ((i = i && i.length ? se(e, i) : C) ? i.length : r) ||
                          ((i = !1), (s = e), (e = t), (t = this));
                      }
                      i || (i = se(e, mr(e)));
                      var n = !0,
                        r = -1,
                        o = qs(t),
                        a = i.length;
                      !1 === s
                        ? (n = !1)
                        : Gs(s) && "chain" in s && (n = s.chain);
                      for (; ++r < a; ) {
                        var h = e[(s = i[r])];
                        (t[s] = h),
                          o &&
                            (t.prototype[s] = (function (e) {
                              return function () {
                                var s = this.__chain__;
                                if (n || s) {
                                  var i = t(this.__wrapped__);
                                  return (
                                    (i.__actions__ = It(this.__actions__)).push({
                                      func: e,
                                      args: arguments,
                                      thisArg: t,
                                    }),
                                    (i.__chain__ = s),
                                    i
                                  );
                                }
                                return e.apply(t, zt([this.value()], arguments));
                              };
                            })(h));
                      }
                      return t;
                    }
                    function gi() {}
                    function mi(t) {
                      return cs(t)
                        ? le(t)
                        : (function (t) {
                            var e = t + "";
                            return (
                              (t = ys(t)),
                              function (s) {
                                return ie(s, t, e);
                              }
                            );
                          })(t);
                    }
                    var vi = (e = e
                        ? jt.defaults(Ft.Object(), e, jt.pick(Ft, Ct))
                        : Ft).Array,
                      yi = e.Date,
                      wi = e.Error,
                      xi = e.Function,
                      bi = e.Math,
                      _i = e.Number,
                      Ti = e.Object,
                      Ci = e.RegExp,
                      ki = e.String,
                      Si = e.TypeError,
                      Ai = vi.prototype,
                      Pi = Ti.prototype,
                      Mi = ki.prototype,
                      Ii = xi.prototype.toString,
                      Bi = Pi.hasOwnProperty,
                      Di = 0,
                      Ei = Pi.toString,
                      Li = Ft._,
                      zi = Ci(
                        "^" +
                          Ii.call(Bi)
                            .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                            .replace(
                              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                              "$1.*?"
                            ) +
                          "$"
                      ),
                      Oi = e.ArrayBuffer,
                      Fi = e.clearTimeout,
                      ji = e.parseFloat,
                      Ri = bi.pow,
                      Wi = Pi.propertyIsEnumerable,
                      Vi = rs(e, "Set"),
                      Hi = e.setTimeout,
                      Ni = Ai.splice,
                      Zi = e.Uint8Array,
                      Ui = rs(e, "WeakMap"),
                      qi = bi.ceil,
                      Gi = rs(Ti, "create"),
                      Yi = bi.floor,
                      Xi = rs(vi, "isArray"),
                      Ki = e.isFinite,
                      Ji = rs(Ti, "keys"),
                      $i = bi.max,
                      Qi = bi.min,
                      tn = rs(yi, "now"),
                      en = e.parseInt,
                      sn = bi.random,
                      nn = _i.NEGATIVE_INFINITY,
                      rn = _i.POSITIVE_INFINITY,
                      on = 4294967294,
                      an = 2147483647,
                      hn = 9007199254740991,
                      ln = Ui && new Ui(),
                      cn = {};
                    (s.support = {}),
                      (s.templateSettings = {
                        escape: rt,
                        evaluate: ot,
                        interpolate: at,
                        variable: "",
                        imports: { _: s },
                      });
                    var un = (function () {
                        function t() {}
                        return function (e) {
                          if (Gs(e)) {
                            t.prototype = e;
                            var s = new t();
                            t.prototype = C;
                          }
                          return s || {};
                        };
                      })(),
                      dn = Me(te),
                      pn = Me(ee, !0),
                      fn = Ie(),
                      gn = Ie(!0),
                      mn = ln
                        ? function (t, e) {
                            return ln.set(t, e), t;
                          }
                        : di,
                      vn = ln
                        ? function (t) {
                            return ln.get(t);
                          }
                        : gi,
                      yn = le("length"),
                      wn = (function () {
                        var t = 0,
                          e = 0;
                        return function (s, i) {
                          var n = Un(),
                            r = 16 - (n - e);
                          if (((e = n), r > 0)) {
                            if (++t >= 150) return s;
                          } else t = 0;
                          return mn(s, i);
                        };
                      })(),
                      xn = Vs(function (t, e) {
                        return y(t) && as(t) ? Yt(t, $t(e, !1, !0)) : [];
                      }),
                      bn = Fe(),
                      _n = Fe(!0),
                      Tn = Vs(function (t) {
                        for (
                          var e = t.length,
                            s = e,
                            i = vi(c),
                            n = is(),
                            r = n === a,
                            o = [];
                          s--;
  
                        ) {
                          var h = (t[s] = as((h = t[s])) ? h : []);
                          i[s] =
                            r && 120 <= h.length && Gi && Vi
                              ? new Pt(s && h)
                              : null;
                        }
                        var l = -1,
                          c = (r = t[0]) ? r.length : 0,
                          u = i[0];
                        t: for (; ++l < c; )
                          if (((h = r[l]), 0 > (u ? Mt(u, h) : n(o, h, 0)))) {
                            for (s = e; --s; ) {
                              var d = i[s];
                              if (0 > (d ? Mt(d, h) : n(t[s], h, 0))) continue t;
                            }
                            u && u.push(h), o.push(h);
                          }
                        return o;
                      }),
                      Cn = Vs(function (t, e) {
                        var s = Nt(t, (e = $t(e)));
                        return ce(t, e.sort(r)), s;
                      }),
                      kn = Je(),
                      Sn = Je(!0),
                      An = Vs(function (t) {
                        return ve($t(t, !1, !0));
                      }),
                      Pn = Vs(function (t, e) {
                        return as(t) ? Yt(t, e) : [];
                      }),
                      Mn = Vs(As),
                      In = Vs(function (t) {
                        var e = t.length,
                          s = e > 2 ? t[e - 2] : C,
                          i = e > 1 ? t[e - 1] : C;
                        return (
                          e > 2 && "function" == typeof s
                            ? (e -= 2)
                            : ((s =
                                e > 1 && "function" == typeof i ? (--e, i) : C),
                              (i = C)),
                          (t.length = e),
                          Ps(t, s, i)
                        );
                      }),
                      Bn = Vs(function (t) {
                        return (
                          (t = $t(t)),
                          this.thru(function (e) {
                            e = rr(e) ? e : [vs(e)];
                            for (
                              var s = t,
                                i = -1,
                                n = e.length,
                                r = -1,
                                o = s.length,
                                a = vi(n + o);
                              ++i < n;
  
                            )
                              a[i] = e[i];
                            for (; ++r < o; ) a[i++] = s[r];
                            return a;
                          })
                        );
                      }),
                      Dn = Vs(function (t, e) {
                        return Nt(t, $t(e));
                      }),
                      En = Ae(function (t, e, s) {
                        Bi.call(t, s) ? ++t[s] : (t[s] = 1);
                      }),
                      Ln = Oe(dn),
                      zn = Oe(pn, !0),
                      On = We(Bt, dn),
                      Fn = We(function (t, e) {
                        for (var s = t.length; s-- && !1 !== e(t[s], s, t); );
                        return t;
                      }, pn),
                      jn = Ae(function (t, e, s) {
                        Bi.call(t, s) ? t[s].push(e) : (t[s] = [e]);
                      }),
                      Rn = Ae(function (t, e, s) {
                        t[s] = e;
                      }),
                      Wn = Vs(function (t, e, s) {
                        var i = -1,
                          n = "function" == typeof e,
                          r = cs(e),
                          o = as(t) ? vi(t.length) : [];
                        return (
                          dn(t, function (t) {
                            var a = n ? e : r && null != t ? t[e] : C;
                            o[++i] = a ? a.apply(t, s) : os(t, e, s);
                          }),
                          o
                        );
                      }),
                      Vn = Ae(
                        function (t, e, s) {
                          t[s ? 0 : 1].push(e);
                        },
                        function () {
                          return [[], []];
                        }
                      ),
                      Hn = qe(Ot, dn),
                      Nn = qe(function (t, e, s, i) {
                        var n = t.length;
                        for (i && n && (s = t[--n]); n--; ) s = e(s, t[n], n, t);
                        return s;
                      }, pn),
                      Zn = Vs(function (t, e) {
                        if (null == t) return [];
                        var s = e[2];
                        return (
                          s && ls(e[0], e[1], s) && (e.length = 1),
                          me(t, $t(e), [])
                        );
                      }),
                      Un =
                        tn ||
                        function () {
                          return new yi().getTime();
                        },
                      qn = Vs(function (t, e, s) {
                        var i = 1;
                        if (s.length) {
                          var n = x(s, qn.placeholder);
                          i |= k;
                        }
                        return $e(t, i, e, s, n);
                      }),
                      Gn = Vs(function (t, e) {
                        for (
                          var s = -1, i = (e = e.length ? $t(e) : ii(t)).length;
                          ++s < i;
  
                        ) {
                          var n = e[s];
                          t[n] = $e(t[n], 1, t);
                        }
                        return t;
                      }),
                      Yn = Vs(function (t, e, s) {
                        var i = 3;
                        if (s.length) {
                          var n = x(s, Yn.placeholder);
                          i |= k;
                        }
                        return $e(e, i, t, s, n);
                      }),
                      Xn = Ee(8),
                      Kn = Ee(16),
                      Jn = Vs(function (t, e) {
                        return Gt(t, 1, e);
                      }),
                      $n = Vs(function (t, e, s) {
                        return Gt(t, e, s);
                      }),
                      Qn = Re(),
                      tr = Re(!0),
                      er = Vs(function (t, e) {
                        if (((e = $t(e)), "function" != typeof t || !Dt(e, h)))
                          throw new Si(I);
                        var s = e.length;
                        return Vs(function (i) {
                          for (var n = Qi(i.length, s); n--; ) i[n] = e[n](i[n]);
                          return t.apply(this, i);
                        });
                      }),
                      sr = Ue(k),
                      ir = Ue(S),
                      nr = Vs(function (t, e) {
                        return $e(t, P, C, C, C, $t(e));
                      }),
                      rr =
                        Xi ||
                        function (t) {
                          return y(t) && ds(t.length) && Ei.call(t) == E;
                        },
                      or = Pe(function t(e, s, i, n, r) {
                        if (!Gs(e)) return e;
                        var o = as(s) && (rr(s) || Qs(s)),
                          a = o ? C : mr(s);
                        return (
                          Bt(a || s, function (h, l) {
                            if ((a && (h = s[(l = h)]), y(h))) {
                              n || (n = []), r || (r = []);
                              t: {
                                for (
                                  var c = l, u = n, d = r, p = u.length, f = s[c];
                                  p--;
  
                                )
                                  if (u[p] == f) {
                                    e[c] = d[p];
                                    break t;
                                  }
                                p = e[c];
                                var g = i ? i(p, f, c, e, s) : C,
                                  m = g === C;
                                m &&
                                  ((g = f),
                                  as(f) && (rr(f) || Qs(f))
                                    ? (g = rr(p) ? p : as(p) ? It(p) : [])
                                    : Ks(f) || Ns(f)
                                    ? (g = Ns(p) ? si(p) : Ks(p) ? p : {})
                                    : (m = !1)),
                                  u.push(f),
                                  d.push(g),
                                  m
                                    ? (e[c] = t(g, f, i, u, d))
                                    : (g == g ? g !== p : p == p) && (e[c] = g);
                              }
                            } else (c = e[l]), (d = (u = i ? i(c, h, l, e, s) : C) === C) && (u = h), (u === C && (!o || l in e)) || (!d && (u == u ? u === c : c != c)) || (e[l] = u);
                          }),
                          e
                        );
                      }),
                      ar = Pe(function (t, e, s) {
                        return s ? Vt(t, e, s) : Ht(t, e);
                      }),
                      hr = Le(ar, function (t, e) {
                        return t === C ? e : t;
                      }),
                      lr = Le(or, function t(e, s) {
                        return e === C ? s : or(e, s, t);
                      }),
                      cr = je(te),
                      ur = je(ee),
                      dr = Ve(fn),
                      pr = Ve(gn),
                      fr = He(te),
                      gr = He(ee),
                      mr = Ji
                        ? function (t) {
                            var e = null == t ? C : t.constructor;
                            return ("function" == typeof e &&
                              e.prototype === t) ||
                              ("function" != typeof t && as(t))
                              ? gs(t)
                              : Gs(t)
                              ? Ji(t)
                              : [];
                          }
                        : gs,
                      vr = Ne(!0),
                      yr = Ne(),
                      wr = Vs(function (t, e) {
                        if (null == t) return {};
                        if ("function" != typeof e[0])
                          return (e = Lt($t(e), ki)), ps(t, Yt(ni(t), e));
                        var s = Te(e[0], e[1], 3);
                        return fs(t, function (t, e, i) {
                          return !s(t, e, i);
                        });
                      }),
                      xr = Vs(function (t, e) {
                        return null == t
                          ? {}
                          : "function" == typeof e[0]
                          ? fs(t, Te(e[0], e[1], 3))
                          : ps(t, $t(e));
                      }),
                      br = Be(function (t, e, s) {
                        return (
                          (e = e.toLowerCase()),
                          t + (s ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                        );
                      }),
                      _r = Be(function (t, e, s) {
                        return t + (s ? "-" : "") + e.toLowerCase();
                      }),
                      Tr = Ze(),
                      Cr = Ze(!0),
                      kr = Be(function (t, e, s) {
                        return t + (s ? "_" : "") + e.toLowerCase();
                      }),
                      Sr = Be(function (t, e, s) {
                        return (
                          t +
                          (s ? " " : "") +
                          (e.charAt(0).toUpperCase() + e.slice(1))
                        );
                      }),
                      Ar = Vs(function (t, e) {
                        try {
                          return t.apply(C, e);
                        } catch (t) {
                          return Us(t) ? t : new wi(t);
                        }
                      }),
                      Pr = Vs(function (t, e) {
                        return function (s) {
                          return os(s, t, e);
                        };
                      }),
                      Mr = Vs(function (t, e) {
                        return function (s) {
                          return os(t, s, e);
                        };
                      }),
                      Ir = Ke("ceil"),
                      Br = Ke("floor"),
                      Dr = ze(Hs, nn),
                      Er = ze(ti, rn),
                      Lr = Ke("round");
                    return (
                      (s.prototype = i.prototype),
                      (n.prototype = un(i.prototype)),
                      (n.prototype.constructor = n),
                      (w.prototype = un(i.prototype)),
                      (w.prototype.constructor = w),
                      (At.prototype.delete = function (t) {
                        return this.has(t) && delete this.__data__[t];
                      }),
                      (At.prototype.get = function (t) {
                        return "__proto__" == t ? C : this.__data__[t];
                      }),
                      (At.prototype.has = function (t) {
                        return "__proto__" != t && Bi.call(this.__data__, t);
                      }),
                      (At.prototype.set = function (t, e) {
                        return "__proto__" != t && (this.__data__[t] = e), this;
                      }),
                      (Pt.prototype.push = function (t) {
                        var e = this.data;
                        "string" == typeof t || Gs(t)
                          ? e.set.add(t)
                          : (e.hash[t] = !0);
                      }),
                      (Ws.Cache = At),
                      (s.after = function (t, e) {
                        if ("function" != typeof e) {
                          if ("function" != typeof t) throw new Si(I);
                          var s = t;
                          (t = e), (e = s);
                        }
                        return (
                          (t = Ki((t = +t)) ? t : 0),
                          function () {
                            return 1 > --t ? e.apply(this, arguments) : void 0;
                          }
                        );
                      }),
                      (s.ary = function (t, e, s) {
                        return (
                          s && ls(t, e, s) && (e = C),
                          (e = t && null == e ? t.length : $i(+e || 0, 0)),
                          $e(t, A, C, C, C, C, e)
                        );
                      }),
                      (s.assign = ar),
                      (s.at = Dn),
                      (s.before = js),
                      (s.bind = qn),
                      (s.bindAll = Gn),
                      (s.bindKey = Yn),
                      (s.callback = ui),
                      (s.chain = Is),
                      (s.chunk = function (t, e, s) {
                        (e = (s ? ls(t, e, s) : null == e)
                          ? 1
                          : $i(Yi(e) || 1, 1)),
                          (s = 0);
                        for (
                          var i = t ? t.length : 0, n = -1, r = vi(qi(i / e));
                          i > s;
  
                        )
                          r[++n] = pe(t, s, (s += e));
                        return r;
                      }),
                      (s.compact = function (t) {
                        for (
                          var e = -1, s = t ? t.length : 0, i = -1, n = [];
                          ++e < s;
  
                        ) {
                          var r = t[e];
                          r && (n[++i] = r);
                        }
                        return n;
                      }),
                      (s.constant = function (t) {
                        return function () {
                          return t;
                        };
                      }),
                      (s.countBy = En),
                      (s.create = function (t, e, s) {
                        var i = un(t);
                        return s && ls(t, e, s) && (e = C), e ? Ht(i, e) : i;
                      }),
                      (s.curry = Xn),
                      (s.curryRight = Kn),
                      (s.debounce = Rs),
                      (s.defaults = hr),
                      (s.defaultsDeep = lr),
                      (s.defer = Jn),
                      (s.delay = $n),
                      (s.difference = xn),
                      (s.drop = xs),
                      (s.dropRight = bs),
                      (s.dropRightWhile = function (t, e, s) {
                        return t && t.length ? we(t, es(e, s, 3), !0, !0) : [];
                      }),
                      (s.dropWhile = function (t, e, s) {
                        return t && t.length ? we(t, es(e, s, 3), !0) : [];
                      }),
                      (s.fill = function (t, e, s, i) {
                        var n = t ? t.length : 0;
                        if (!n) return [];
                        for (
                          s &&
                            "number" != typeof s &&
                            ls(t, e, s) &&
                            ((s = 0), (i = n)),
                            n = t.length,
                            0 > (s = null == s ? 0 : +s || 0) &&
                              (s = -s > n ? 0 : n + s),
                            0 > (i = i === C || i > n ? n : +i || 0) && (i += n),
                            n = s > i ? 0 : i >>> 0,
                            s >>>= 0;
                          n > s;
  
                        )
                          t[s++] = e;
                        return t;
                      }),
                      (s.filter = Es),
                      (s.flatten = function (t, e, s) {
                        var i = t ? t.length : 0;
                        return s && ls(t, e, s) && (e = !1), i ? $t(t, e) : [];
                      }),
                      (s.flattenDeep = function (t) {
                        return t && t.length ? $t(t, !0) : [];
                      }),
                      (s.flow = Qn),
                      (s.flowRight = tr),
                      (s.forEach = On),
                      (s.forEachRight = Fn),
                      (s.forIn = dr),
                      (s.forInRight = pr),
                      (s.forOwn = fr),
                      (s.forOwnRight = gr),
                      (s.functions = ii),
                      (s.groupBy = jn),
                      (s.indexBy = Rn),
                      (s.initial = function (t) {
                        return bs(t, 1);
                      }),
                      (s.intersection = Tn),
                      (s.invert = function (t, e, s) {
                        s && ls(t, e, s) && (e = C), (s = -1);
                        for (var i = mr(t), n = i.length, r = {}; ++s < n; ) {
                          var o = i[s],
                            a = t[o];
                          e
                            ? Bi.call(r, a)
                              ? r[a].push(o)
                              : (r[a] = [o])
                            : (r[a] = o);
                        }
                        return r;
                      }),
                      (s.invoke = Wn),
                      (s.keys = mr),
                      (s.keysIn = ni),
                      (s.map = zs),
                      (s.mapKeys = vr),
                      (s.mapValues = yr),
                      (s.matches = pi),
                      (s.matchesProperty = function (t, e) {
                        return he(t, qt(e, !0));
                      }),
                      (s.memoize = Ws),
                      (s.merge = or),
                      (s.method = Pr),
                      (s.methodOf = Mr),
                      (s.mixin = fi),
                      (s.modArgs = er),
                      (s.negate = function (t) {
                        if ("function" != typeof t) throw new Si(I);
                        return function () {
                          return !t.apply(this, arguments);
                        };
                      }),
                      (s.omit = wr),
                      (s.once = function (t) {
                        return js(2, t);
                      }),
                      (s.pairs = ri),
                      (s.partial = sr),
                      (s.partialRight = ir),
                      (s.partition = Vn),
                      (s.pick = xr),
                      (s.pluck = function (t, e) {
                        return zs(t, mi(e));
                      }),
                      (s.property = mi),
                      (s.propertyOf = function (t) {
                        return function (e) {
                          return ie(t, ys(e), e + "");
                        };
                      }),
                      (s.pull = function () {
                        var t = arguments,
                          e = t[0];
                        if (!e || !e.length) return e;
                        for (var s = 0, i = is(), n = t.length; ++s < n; )
                          for (var r = 0, o = t[s]; -1 < (r = i(e, o, r)); )
                            Ni.call(e, r, 1);
                        return e;
                      }),
                      (s.pullAt = Cn),
                      (s.range = function (t, e, s) {
                        s && ls(t, e, s) && (e = s = C),
                          (t = +t || 0),
                          null == e ? ((e = t), (t = 0)) : (e = +e || 0);
                        var i = -1;
                        e = $i(
                          qi((e - t) / ((s = null == s ? 1 : +s || 0) || 1)),
                          0
                        );
                        for (var n = vi(e); ++i < e; ) (n[i] = t), (t += s);
                        return n;
                      }),
                      (s.rearg = nr),
                      (s.reject = function (t, e, s) {
                        var i = rr(t) ? Et : Kt;
                        return (
                          (e = es(e, s, 3)),
                          i(t, function (t, s, i) {
                            return !e(t, s, i);
                          })
                        );
                      }),
                      (s.remove = function (t, e, s) {
                        var i = [];
                        if (!t || !t.length) return i;
                        var n = -1,
                          r = [],
                          o = t.length;
                        for (e = es(e, s, 3); ++n < o; )
                          e((s = t[n]), n, t) && (i.push(s), r.push(n));
                        return ce(t, r), i;
                      }),
                      (s.rest = ks),
                      (s.restParam = Vs),
                      (s.set = function (t, e, s) {
                        if (null == t) return t;
                        e = null != t[(i = e + "")] || cs(e, t) ? [i] : ys(e);
                        for (
                          var i = -1, n = e.length, r = n - 1, o = t;
                          null != o && ++i < n;
  
                        ) {
                          var a = e[i];
                          Gs(o) &&
                            (i == r
                              ? (o[a] = s)
                              : null == o[a] && (o[a] = hs(e[i + 1]) ? [] : {})),
                            (o = o[a]);
                        }
                        return t;
                      }),
                      (s.shuffle = function (t) {
                        return Os(t, rn);
                      }),
                      (s.slice = function (t, e, s) {
                        var i = t ? t.length : 0;
                        return i
                          ? (s &&
                              "number" != typeof s &&
                              ls(t, e, s) &&
                              ((e = 0), (s = i)),
                            pe(t, e, s))
                          : [];
                      }),
                      (s.sortBy = function (t, e, s) {
                        if (null == t) return [];
                        s && ls(t, e, s) && (e = C);
                        var i = -1;
                        return (
                          (e = es(e, s, 3)),
                          (t = oe(t, function (t, s, n) {
                            return { a: e(t, s, n), b: ++i, c: t };
                          })),
                          ge(t, d)
                        );
                      }),
                      (s.sortByAll = Zn),
                      (s.sortByOrder = function (t, e, s, i) {
                        return null == t
                          ? []
                          : (i && ls(e, s, i) && (s = C),
                            rr(e) || (e = null == e ? [] : [e]),
                            rr(s) || (s = null == s ? [] : [s]),
                            me(t, e, s));
                      }),
                      (s.spread = function (t) {
                        if ("function" != typeof t) throw new Si(I);
                        return function (e) {
                          return t.apply(this, e);
                        };
                      }),
                      (s.take = function (t, e, s) {
                        return t && t.length
                          ? ((s ? ls(t, e, s) : null == e) && (e = 1),
                            pe(t, 0, 0 > e ? 0 : e))
                          : [];
                      }),
                      (s.takeRight = function (t, e, s) {
                        var i = t ? t.length : 0;
                        return i
                          ? ((s ? ls(t, e, s) : null == e) && (e = 1),
                            pe(t, 0 > (e = i - (+e || 0)) ? 0 : e))
                          : [];
                      }),
                      (s.takeRightWhile = function (t, e, s) {
                        return t && t.length ? we(t, es(e, s, 3), !1, !0) : [];
                      }),
                      (s.takeWhile = function (t, e, s) {
                        return t && t.length ? we(t, es(e, s, 3)) : [];
                      }),
                      (s.tap = function (t, e, s) {
                        return e.call(s, t), t;
                      }),
                      (s.throttle = function (t, e, s) {
                        var i = !0,
                          n = !0;
                        if ("function" != typeof t) throw new Si(I);
                        return (
                          !1 === s
                            ? (i = !1)
                            : Gs(s) &&
                              ((i = "leading" in s ? !!s.leading : i),
                              (n = "trailing" in s ? !!s.trailing : n)),
                          Rs(t, e, { leading: i, maxWait: +e, trailing: n })
                        );
                      }),
                      (s.thru = Bs),
                      (s.times = function (t, e, s) {
                        if (1 > (t = Yi(t)) || !Ki(t)) return [];
                        var i = -1,
                          n = vi(Qi(t, 4294967295));
                        for (e = Te(e, s, 1); ++i < t; )
                          4294967295 > i ? (n[i] = e(i)) : e(i);
                        return n;
                      }),
                      (s.toArray = ei),
                      (s.toPlainObject = si),
                      (s.transform = function (t, e, s, i) {
                        var n = rr(t) || Qs(t);
                        return (
                          (e = es(e, i, 4)),
                          null == s &&
                            (n || Gs(t)
                              ? ((i = t.constructor),
                                (s = n
                                  ? rr(t)
                                    ? new i()
                                    : []
                                  : un(qs(i) ? i.prototype : C)))
                              : (s = {})),
                          (n ? Bt : te)(t, function (t, i, n) {
                            return e(s, t, i, n);
                          }),
                          s
                        );
                      }),
                      (s.union = An),
                      (s.uniq = Ss),
                      (s.unzip = As),
                      (s.unzipWith = Ps),
                      (s.values = oi),
                      (s.valuesIn = function (t) {
                        return ye(t, ni(t));
                      }),
                      (s.where = function (t, e) {
                        return Es(t, ae(e));
                      }),
                      (s.without = Pn),
                      (s.wrap = function (t, e) {
                        return $e((e = null == e ? di : e), k, C, [t], []);
                      }),
                      (s.xor = function () {
                        for (var t = -1, e = arguments.length; ++t < e; ) {
                          var s = arguments[t];
                          if (as(s)) var i = i ? zt(Yt(i, s), Yt(s, i)) : s;
                        }
                        return i ? ve(i) : [];
                      }),
                      (s.zip = Mn),
                      (s.zipObject = Ms),
                      (s.zipWith = In),
                      (s.backflow = tr),
                      (s.collect = zs),
                      (s.compose = tr),
                      (s.each = On),
                      (s.eachRight = Fn),
                      (s.extend = ar),
                      (s.iteratee = ui),
                      (s.methods = ii),
                      (s.object = Ms),
                      (s.select = Es),
                      (s.tail = ks),
                      (s.unique = Ss),
                      fi(s, s),
                      (s.add = function (t, e) {
                        return (+t || 0) + (+e || 0);
                      }),
                      (s.attempt = Ar),
                      (s.camelCase = br),
                      (s.capitalize = function (t) {
                        return (
                          (t = l(t)) && t.charAt(0).toUpperCase() + t.slice(1)
                        );
                      }),
                      (s.ceil = Ir),
                      (s.clone = function (t, e, s, i) {
                        return (
                          e && "boolean" != typeof e && ls(t, e, s)
                            ? (e = !1)
                            : "function" == typeof e &&
                              ((i = s), (s = e), (e = !1)),
                          "function" == typeof s
                            ? qt(t, e, Te(s, i, 3))
                            : qt(t, e)
                        );
                      }),
                      (s.cloneDeep = function (t, e, s) {
                        return "function" == typeof e
                          ? qt(t, !0, Te(e, s, 3))
                          : qt(t, !0);
                      }),
                      (s.deburr = ai),
                      (s.endsWith = function (t, e, s) {
                        e += "";
                        var i = (t = l(t)).length;
                        return (
                          (s = s === C ? i : Qi(0 > s ? 0 : +s || 0, i)),
                          (s -= e.length) >= 0 && t.indexOf(e, s) == s
                        );
                      }),
                      (s.escape = function (t) {
                        return (t = l(t)) && nt.test(t) ? t.replace(st, f) : t;
                      }),
                      (s.escapeRegExp = function (t) {
                        return (t = l(t)) && dt.test(t)
                          ? t.replace(ut, g)
                          : t || "(?:)";
                      }),
                      (s.every = Ds),
                      (s.find = Ln),
                      (s.findIndex = bn),
                      (s.findKey = cr),
                      (s.findLast = zn),
                      (s.findLastIndex = _n),
                      (s.findLastKey = ur),
                      (s.findWhere = function (t, e) {
                        return Ln(t, ae(e));
                      }),
                      (s.first = _s),
                      (s.floor = Br),
                      (s.get = function (t, e, s) {
                        return (t = null == t ? C : ie(t, ys(e), e + "")) === C
                          ? s
                          : t;
                      }),
                      (s.gt = Hs),
                      (s.gte = function (t, e) {
                        return t >= e;
                      }),
                      (s.has = function (t, e) {
                        if (null == t) return !1;
                        var s = Bi.call(t, e);
                        if (!s && !cs(e)) {
                          if (
                            null ==
                            (t =
                              1 == (e = ys(e)).length ? t : ie(t, pe(e, 0, -1)))
                          )
                            return !1;
                          (e = Cs(e)), (s = Bi.call(t, e));
                        }
                        return (
                          s ||
                          (ds(t.length) && hs(e, t.length) && (rr(t) || Ns(t)))
                        );
                      }),
                      (s.identity = di),
                      (s.includes = Ls),
                      (s.indexOf = Ts),
                      (s.inRange = function (t, e, s) {
                        return (
                          (e = +e || 0),
                          s === C ? ((s = e), (e = 0)) : (s = +s || 0),
                          t >= Qi(e, s) && t < $i(e, s)
                        );
                      }),
                      (s.isArguments = Ns),
                      (s.isArray = rr),
                      (s.isBoolean = function (t) {
                        return !0 === t || !1 === t || (y(t) && Ei.call(t) == L);
                      }),
                      (s.isDate = function (t) {
                        return y(t) && Ei.call(t) == z;
                      }),
                      (s.isElement = function (t) {
                        return !!t && 1 === t.nodeType && y(t) && !Ks(t);
                      }),
                      (s.isEmpty = function (t) {
                        return (
                          null == t ||
                          (as(t) &&
                          (rr(t) || $s(t) || Ns(t) || (y(t) && qs(t.splice)))
                            ? !t.length
                            : !mr(t).length)
                        );
                      }),
                      (s.isEqual = Zs),
                      (s.isError = Us),
                      (s.isFinite = function (t) {
                        return "number" == typeof t && Ki(t);
                      }),
                      (s.isFunction = qs),
                      (s.isMatch = function (t, e, s, i) {
                        return (
                          (s = "function" == typeof s ? Te(s, i, 3) : C),
                          re(t, ns(e), s)
                        );
                      }),
                      (s.isNaN = function (t) {
                        return Xs(t) && t != +t;
                      }),
                      (s.isNative = Ys),
                      (s.isNull = function (t) {
                        return null === t;
                      }),
                      (s.isNumber = Xs),
                      (s.isObject = Gs),
                      (s.isPlainObject = Ks),
                      (s.isRegExp = Js),
                      (s.isString = $s),
                      (s.isTypedArray = Qs),
                      (s.isUndefined = function (t) {
                        return t === C;
                      }),
                      (s.kebabCase = _r),
                      (s.last = Cs),
                      (s.lastIndexOf = function (t, e, s) {
                        var i = t ? t.length : 0;
                        if (!i) return -1;
                        var n = i;
                        if ("number" == typeof s)
                          n = (0 > s ? $i(i + s, 0) : Qi(s || 0, i - 1)) + 1;
                        else if (s)
                          return (
                            (t = t[(n = be(t, e, !0) - 1)]),
                            (e == e ? e === t : t != t) ? n : -1
                          );
                        if (e != e) return v(t, n, !0);
                        for (; n--; ) if (t[n] === e) return n;
                        return -1;
                      }),
                      (s.lt = ti),
                      (s.lte = function (t, e) {
                        return e >= t;
                      }),
                      (s.max = Dr),
                      (s.min = Er),
                      (s.noConflict = function () {
                        return (Ft._ = Li), this;
                      }),
                      (s.noop = gi),
                      (s.now = Un),
                      (s.pad = function (t, e, s) {
                        e = +e;
                        var i = (t = l(t)).length;
                        return e > i && Ki(e)
                          ? ((e = Yi((i = (e - i) / 2))),
                            (s = Ye("", (i = qi(i)), s)).slice(0, e) + t + s)
                          : t;
                      }),
                      (s.padLeft = Tr),
                      (s.padRight = Cr),
                      (s.parseInt = function (t, e, s) {
                        return (
                          (s ? ls(t, e, s) : null == e) ? (e = 0) : e && (e = +e),
                          (t = li(t)),
                          en(t, e || (vt.test(t) ? 16 : 10))
                        );
                      }),
                      (s.random = function (t, e, s) {
                        s && ls(t, e, s) && (e = s = C);
                        var i = null == t,
                          n = null == e;
                        return (
                          null == s &&
                            (n && "boolean" == typeof t
                              ? ((s = t), (t = 1))
                              : "boolean" == typeof e && ((s = e), (n = !0))),
                          i && n && ((e = 1), (n = !1)),
                          (t = +t || 0),
                          n ? ((e = t), (t = 0)) : (e = +e || 0),
                          s || t % 1 || e % 1
                            ? ((s = sn()),
                              Qi(
                                t +
                                  s * (e - t + ji("1e-" + ((s + "").length - 1))),
                                e
                              ))
                            : ue(t, e)
                        );
                      }),
                      (s.reduce = Hn),
                      (s.reduceRight = Nn),
                      (s.repeat = hi),
                      (s.result = function (t, e, s) {
                        var i = null == t ? C : t[e];
                        return (
                          i === C &&
                            (null == t ||
                              cs(e, t) ||
                              (i =
                                null ==
                                (t =
                                  1 == (e = ys(e)).length
                                    ? t
                                    : ie(t, pe(e, 0, -1)))
                                  ? C
                                  : t[Cs(e)]),
                            (i = i === C ? s : i)),
                          qs(i) ? i.call(t) : i
                        );
                      }),
                      (s.round = Lr),
                      (s.runInContext = t),
                      (s.size = function (t) {
                        var e = t ? yn(t) : 0;
                        return ds(e) ? e : mr(t).length;
                      }),
                      (s.snakeCase = kr),
                      (s.some = Fs),
                      (s.sortedIndex = kn),
                      (s.sortedLastIndex = Sn),
                      (s.startCase = Sr),
                      (s.startsWith = function (t, e, s) {
                        return (
                          (t = l(t)),
                          (s = null == s ? 0 : Qi(0 > s ? 0 : +s || 0, t.length)),
                          t.lastIndexOf(e, s) == s
                        );
                      }),
                      (s.sum = function (t, e, s) {
                        if (
                          (s && ls(t, e, s) && (e = C),
                          1 == (e = es(e, s, 3)).length)
                        ) {
                          s = (t = rr(t) ? t : ms(t)).length;
                          for (var i = 0; s--; ) i += +e(t[s]) || 0;
                          t = i;
                        } else
                          t = (function (t, e) {
                            var s = 0;
                            return (
                              dn(t, function (t, i, n) {
                                s += +e(t, i, n) || 0;
                              }),
                              s
                            );
                          })(t, e);
                        return t;
                      }),
                      (s.template = function (t, e, i) {
                        var n = s.templateSettings;
                        i && ls(t, e, i) && (e = i = C),
                          (t = l(t)),
                          (e = Vt(Ht({}, i || e), n, Wt)),
                          (i = Vt(Ht({}, e.imports), n.imports, Wt));
                        var r,
                          o,
                          a = mr(i),
                          h = ye(i, a),
                          c = 0;
                        i = e.interpolate || bt;
                        var u = "__p+='";
                        i = Ci(
                          (e.escape || bt).source +
                            "|" +
                            i.source +
                            "|" +
                            (i === at ? gt : bt).source +
                            "|" +
                            (e.evaluate || bt).source +
                            "|$",
                          "g"
                        );
                        var d =
                          "sourceURL" in e
                            ? "//# sourceURL=" + e.sourceURL + "\n"
                            : "";
                        if (
                          (t.replace(i, function (e, s, i, n, a, h) {
                            return (
                              i || (i = n),
                              (u += t.slice(c, h).replace(_t, m)),
                              s && ((r = !0), (u += "'+__e(" + s + ")+'")),
                              a && ((o = !0), (u += "';" + a + ";\n__p+='")),
                              i && (u += "'+((__t=(" + i + "))==null?'':__t)+'"),
                              (c = h + e.length),
                              e
                            );
                          }),
                          (u += "';"),
                          (e = e.variable) || (u = "with(obj){" + u + "}"),
                          (u = (o ? u.replace($, "") : u)
                            .replace(Q, "$1")
                            .replace(tt, "$1;")),
                          (u =
                            "function(" +
                            (e || "obj") +
                            "){" +
                            (e ? "" : "obj||(obj={});") +
                            "var __t,__p=''" +
                            (r ? ",__e=_.escape" : "") +
                            (o
                              ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}"
                              : ";") +
                            u +
                            "return __p}"),
                          ((e = Ar(function () {
                            return xi(a, d + "return " + u).apply(C, h);
                          })).source = u),
                          Us(e))
                        )
                          throw e;
                        return e;
                      }),
                      (s.trim = li),
                      (s.trimLeft = function (t, e, s) {
                        var i = t;
                        return (t = l(t))
                          ? t.slice(
                              (s ? ls(i, e, s) : null == e) ? b(t) : c(t, e + "")
                            )
                          : t;
                      }),
                      (s.trimRight = function (t, e, s) {
                        var i = t;
                        return (t = l(t))
                          ? (s ? ls(i, e, s) : null == e)
                            ? t.slice(0, _(t) + 1)
                            : t.slice(0, u(t, e + "") + 1)
                          : t;
                      }),
                      (s.trunc = function (t, e, s) {
                        s && ls(t, e, s) && (e = C);
                        var i = 30;
                        if (((s = "..."), null != e))
                          if (Gs(e)) {
                            var n = "separator" in e ? e.separator : n;
                            (i = "length" in e ? +e.length || 0 : i),
                              (s = "omission" in e ? l(e.omission) : s);
                          } else i = +e || 0;
                        if (i >= (t = l(t)).length) return t;
                        if (1 > (i -= s.length)) return s;
                        if (((e = t.slice(0, i)), null == n)) return e + s;
                        if (Js(n)) {
                          if (t.slice(i).search(n)) {
                            var r,
                              o = t.slice(0, i);
                            for (
                              n.global ||
                                (n = Ci(n.source, (mt.exec(n) || "") + "g")),
                                n.lastIndex = 0;
                              (t = n.exec(o));
  
                            )
                              r = t.index;
                            e = e.slice(0, null == r ? i : r);
                          }
                        } else
                          t.indexOf(n, i) != i &&
                            (n = e.lastIndexOf(n)) > -1 &&
                            (e = e.slice(0, n));
                        return e + s;
                      }),
                      (s.unescape = function (t) {
                        return (t = l(t)) && it.test(t) ? t.replace(et, T) : t;
                      }),
                      (s.uniqueId = function (t) {
                        var e = ++Di;
                        return l(t) + e;
                      }),
                      (s.words = ci),
                      (s.all = Ds),
                      (s.any = Fs),
                      (s.contains = Ls),
                      (s.eq = Zs),
                      (s.detect = Ln),
                      (s.foldl = Hn),
                      (s.foldr = Nn),
                      (s.head = _s),
                      (s.include = Ls),
                      (s.inject = Hn),
                      fi(
                        s,
                        (function () {
                          var t = {};
                          return (
                            te(s, function (e, i) {
                              s.prototype[i] || (t[i] = e);
                            }),
                            t
                          );
                        })(),
                        !1
                      ),
                      (s.sample = Os),
                      (s.prototype.sample = function (t) {
                        return this.__chain__ || null != t
                          ? this.thru(function (e) {
                              return Os(e, t);
                            })
                          : Os(this.value());
                      }),
                      (s.VERSION = "3.10.1"),
                      Bt(
                        "bind bindKey curry curryRight partial partialRight".split(
                          " "
                        ),
                        function (t) {
                          s[t].placeholder = s;
                        }
                      ),
                      Bt(["drop", "take"], function (t, e) {
                        (w.prototype[t] = function (s) {
                          var i = this.__filtered__;
                          if (i && !e) return new w(this);
                          s = null == s ? 1 : $i(Yi(s) || 0, 0);
                          var n = this.clone();
                          return (
                            i
                              ? (n.__takeCount__ = Qi(n.__takeCount__, s))
                              : n.__views__.push({
                                  size: s,
                                  type: t + (0 > n.__dir__ ? "Right" : ""),
                                }),
                            n
                          );
                        }),
                          (w.prototype[t + "Right"] = function (e) {
                            return this.reverse()[t](e).reverse();
                          });
                      }),
                      Bt(["filter", "map", "takeWhile"], function (t, e) {
                        var s = e + 1,
                          i = 2 != s;
                        w.prototype[t] = function (t, e) {
                          var n = this.clone();
                          return (
                            n.__iteratees__.push({
                              iteratee: es(t, e, 1),
                              type: s,
                            }),
                            (n.__filtered__ = n.__filtered__ || i),
                            n
                          );
                        };
                      }),
                      Bt(["first", "last"], function (t, e) {
                        var s = "take" + (e ? "Right" : "");
                        w.prototype[t] = function () {
                          return this[s](1).value()[0];
                        };
                      }),
                      Bt(["initial", "rest"], function (t, e) {
                        var s = "drop" + (e ? "" : "Right");
                        w.prototype[t] = function () {
                          return this.__filtered__ ? new w(this) : this[s](1);
                        };
                      }),
                      Bt(["pluck", "where"], function (t, e) {
                        var s = e ? "filter" : "map",
                          i = e ? ae : mi;
                        w.prototype[t] = function (t) {
                          return this[s](i(t));
                        };
                      }),
                      (w.prototype.compact = function () {
                        return this.filter(di);
                      }),
                      (w.prototype.reject = function (t, e) {
                        return (
                          (t = es(t, e, 1)),
                          this.filter(function (e) {
                            return !t(e);
                          })
                        );
                      }),
                      (w.prototype.slice = function (t, e) {
                        t = null == t ? 0 : +t || 0;
                        var s = this;
                        return s.__filtered__ && (t > 0 || 0 > e)
                          ? new w(s)
                          : (0 > t ? (s = s.takeRight(-t)) : t && (s = s.drop(t)),
                            e !== C &&
                              (s =
                                0 > (e = +e || 0)
                                  ? s.dropRight(-e)
                                  : s.take(e - t)),
                            s);
                      }),
                      (w.prototype.takeRightWhile = function (t, e) {
                        return this.reverse().takeWhile(t, e).reverse();
                      }),
                      (w.prototype.toArray = function () {
                        return this.take(rn);
                      }),
                      te(w.prototype, function (t, e) {
                        var i = /^(?:filter|map|reject)|While$/.test(e),
                          r = /^(?:first|last)$/.test(e),
                          o = s[r ? "take" + ("last" == e ? "Right" : "") : e];
                        o &&
                          (s.prototype[e] = function () {
                            function e(t) {
                              return r && a ? o(t, 1)[0] : o.apply(C, zt([t], s));
                            }
                            var s = r ? [1] : arguments,
                              a = this.__chain__,
                              h = this.__wrapped__,
                              l = !!this.__actions__.length,
                              c = h instanceof w,
                              u = s[0],
                              d = c || rr(h);
                            return (
                              d &&
                                i &&
                                "function" == typeof u &&
                                1 != u.length &&
                                (c = d = !1),
                              (u = { func: Bs, args: [e], thisArg: C }),
                              (l = c && !l),
                              r && !a
                                ? l
                                  ? ((h = h.clone()).__actions__.push(u),
                                    t.call(h))
                                  : o.call(C, this.value())[0]
                                : !r && d
                                ? ((h = l ? h : new w(this)),
                                  (h = t.apply(h, s)).__actions__.push(u),
                                  new n(h, a))
                                : this.thru(e)
                            );
                          });
                      }),
                      Bt(
                        "join pop push replace shift sort splice split unshift".split(
                          " "
                        ),
                        function (t) {
                          var e = (/^(?:replace|split)$/.test(t) ? Mi : Ai)[t],
                            i = /^(?:push|sort|unshift)$/.test(t)
                              ? "tap"
                              : "thru",
                            n = /^(?:join|pop|replace|shift)$/.test(t);
                          s.prototype[t] = function () {
                            var t = arguments;
                            return n && !this.__chain__
                              ? e.apply(this.value(), t)
                              : this[i](function (s) {
                                  return e.apply(s, t);
                                });
                          };
                        }
                      ),
                      te(w.prototype, function (t, e) {
                        var i = s[e];
                        if (i) {
                          var n = i.name + "";
                          (cn[n] || (cn[n] = [])).push({ name: e, func: i });
                        }
                      }),
                      (cn[Ge(C, 2).name] = [{ name: "wrapper", func: C }]),
                      (w.prototype.clone = function () {
                        var t = new w(this.__wrapped__);
                        return (
                          (t.__actions__ = It(this.__actions__)),
                          (t.__dir__ = this.__dir__),
                          (t.__filtered__ = this.__filtered__),
                          (t.__iteratees__ = It(this.__iteratees__)),
                          (t.__takeCount__ = this.__takeCount__),
                          (t.__views__ = It(this.__views__)),
                          t
                        );
                      }),
                      (w.prototype.reverse = function () {
                        if (this.__filtered__) {
                          var t = new w(this);
                          (t.__dir__ = -1), (t.__filtered__ = !0);
                        } else (t = this.clone()).__dir__ *= -1;
                        return t;
                      }),
                      (w.prototype.value = function () {
                        var t,
                          e = this.__wrapped__.value(),
                          s = this.__dir__,
                          i = rr(e),
                          n = 0 > s,
                          r = i ? e.length : 0;
                        t = r;
                        for (
                          var o = this.__views__, a = 0, h = -1, l = o.length;
                          ++h < l;
  
                        ) {
                          var c = o[h],
                            u = c.size;
                          switch (c.type) {
                            case "drop":
                              a += u;
                              break;
                            case "dropRight":
                              t -= u;
                              break;
                            case "take":
                              t = Qi(t, a + u);
                              break;
                            case "takeRight":
                              a = $i(a, t - u);
                          }
                        }
                        if (
                          ((o = (t = { start: a, end: t }).start),
                          (t = (a = t.end) - o),
                          (n = n ? a : o - 1),
                          (a = (o = this.__iteratees__).length),
                          (h = 0),
                          (l = Qi(t, this.__takeCount__)),
                          !i || M > r || (r == t && l == t))
                        )
                          return xe(e, this.__actions__);
                        i = [];
                        t: for (; t-- && l > h; ) {
                          for (r = -1, c = e[(n += s)]; ++r < a; ) {
                            u = (d = o[r]).type;
                            var d = d.iteratee(c);
                            if (2 == u) c = d;
                            else if (!d) {
                              if (1 == u) continue t;
                              break t;
                            }
                          }
                          i[h++] = c;
                        }
                        return i;
                      }),
                      (s.prototype.chain = function () {
                        return Is(this);
                      }),
                      (s.prototype.commit = function () {
                        return new n(this.value(), this.__chain__);
                      }),
                      (s.prototype.concat = Bn),
                      (s.prototype.plant = function (t) {
                        for (var e, s = this; s instanceof i; ) {
                          var n = ws(s);
                          e ? (r.__wrapped__ = n) : (e = n);
                          var r = n;
                          s = s.__wrapped__;
                        }
                        return (r.__wrapped__ = t), e;
                      }),
                      (s.prototype.reverse = function () {
                        function t(t) {
                          return t.reverse();
                        }
                        var e = this.__wrapped__;
                        return e instanceof w
                          ? (this.__actions__.length && (e = new w(this)),
                            (e = e.reverse()).__actions__.push({
                              func: Bs,
                              args: [t],
                              thisArg: C,
                            }),
                            new n(e, this.__chain__))
                          : this.thru(t);
                      }),
                      (s.prototype.toString = function () {
                        return this.value() + "";
                      }),
                      (s.prototype.run =
                        s.prototype.toJSON =
                        s.prototype.valueOf =
                        s.prototype.value =
                          function () {
                            return xe(this.__wrapped__, this.__actions__);
                          }),
                      (s.prototype.collect = s.prototype.map),
                      (s.prototype.head = s.prototype.first),
                      (s.prototype.select = s.prototype.filter),
                      (s.prototype.tail = s.prototype.rest),
                      s
                    );
                  })();
                (Ft._ = jt),
                  void 0 ===
                    (i = function () {
                      return jt;
                    }.call(e, s, e, t)) || (t.exports = i);
              }).call(this);
            }.call(
              this,
              void 0 !== s.g
                ? s.g
                : "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                ? window
                : {}
            );
        },
        606: () => {
          !(function () {
            if (
              (void 0 === window.performance && (window.performance = {}),
              !window.performance.now)
            ) {
              var t = Date.now();
              performance.timing &&
                performance.timing.navigationStart &&
                (t = performance.timing.navigationStart),
                (window.performance.now = function () {
                  return Date.now() - t;
                });
            }
          })();
        },
        677: function (t, e) {
          var s;
          !(function () {
            if (
              ("performance" in window == 0 && (window.performance = {}),
              (Date.now =
                Date.now ||
                function () {
                  return new Date().getTime();
                }),
              "now" in window.performance == 0)
            ) {
              var t =
                window.performance.timing &&
                window.performance.timing.navigationStart
                  ? window.performance.timing.navigationStart
                  : Date.now();
              window.performance.now = function () {
                return Date.now() - t;
              };
            }
          })();
          var i,
            n =
              n ||
              ((i = []),
              {
                getAll: function () {
                  return i;
                },
                removeAll: function () {
                  i = [];
                },
                add: function (t) {
                  i.push(t);
                },
                remove: function (t) {
                  var e = i.indexOf(t);
                  -1 !== e && i.splice(e, 1);
                },
                update: function (t) {
                  if (0 === i.length) return !1;
                  var e = 0;
                  for (
                    t = void 0 !== t ? t : window.performance.now();
                    e < i.length;
  
                  )
                    i[e].update(t) ? e++ : i.splice(e, 1);
                  return !0;
                },
              });
          (n.Tween = function (t) {
            var e = t,
              s = {},
              i = {},
              r = {},
              o = 1e3,
              a = 0,
              h = !1,
              l = !1,
              c = !1,
              u = 0,
              d = null,
              p = n.Easing.Linear.None,
              f = n.Interpolation.Linear,
              g = [],
              m = null,
              v = !1,
              y = null,
              w = null,
              x = null;
            for (var b in t) s[b] = parseFloat(t[b], 10);
            (this.to = function (t, e) {
              return void 0 !== e && (o = e), (i = t), this;
            }),
              (this.start = function (t) {
                for (var o in (n.add(this),
                (l = !0),
                (v = !1),
                (d = void 0 !== t ? t : window.performance.now()),
                (d += u),
                i)) {
                  if (i[o] instanceof Array) {
                    if (0 === i[o].length) continue;
                    i[o] = [e[o]].concat(i[o]);
                  }
                  (s[o] = e[o]),
                    s[o] instanceof Array == 0 && (s[o] *= 1),
                    (r[o] = s[o] || 0);
                }
                return this;
              }),
              (this.stop = function () {
                return l
                  ? (n.remove(this),
                    (l = !1),
                    null !== x && x.call(e),
                    this.stopChainedTweens(),
                    this)
                  : this;
              }),
              (this.stopChainedTweens = function () {
                for (var t = 0, e = g.length; e > t; t++) g[t].stop();
              }),
              (this.delay = function (t) {
                return (u = t), this;
              }),
              (this.repeat = function (t) {
                return (a = t), this;
              }),
              (this.yoyo = function (t) {
                return (h = t), this;
              }),
              (this.easing = function (t) {
                return (p = t), this;
              }),
              (this.interpolation = function (t) {
                return (f = t), this;
              }),
              (this.chain = function () {
                return (g = arguments), this;
              }),
              (this.onStart = function (t) {
                return (m = t), this;
              }),
              (this.onUpdate = function (t) {
                return (y = t), this;
              }),
              (this.onComplete = function (t) {
                return (w = t), this;
              }),
              (this.onStop = function (t) {
                return (x = t), this;
              }),
              (this.update = function (t) {
                var n, l, x;
                if (d > t) return !0;
                for (n in (!1 === v && (null !== m && m.call(e), (v = !0)),
                (x = p((l = (l = (t - d) / o) > 1 ? 1 : l))),
                i)) {
                  var b = s[n] || 0,
                    _ = i[n];
                  _ instanceof Array
                    ? (e[n] = f(_, x))
                    : ("string" == typeof _ && (_ = b + parseFloat(_, 10)),
                      "number" == typeof _ && (e[n] = b + (_ - b) * x));
                }
                if ((null !== y && y.call(e, x), 1 === l)) {
                  if (a > 0) {
                    for (n in (isFinite(a) && a--, r)) {
                      if (
                        ("string" == typeof i[n] &&
                          (r[n] = r[n] + parseFloat(i[n], 10)),
                        h)
                      ) {
                        var T = r[n];
                        (r[n] = i[n]), (i[n] = T);
                      }
                      s[n] = r[n];
                    }
                    return h && (c = !c), (d = t + u), !0;
                  }
                  null !== w && w.call(e);
                  for (var C = 0, k = g.length; k > C; C++) g[C].start(d + o);
                  return !1;
                }
                return !0;
              });
          }),
            (n.Easing = {
              Linear: {
                None: function (t) {
                  return t;
                },
              },
              Quadratic: {
                In: function (t) {
                  return t * t;
                },
                Out: function (t) {
                  return t * (2 - t);
                },
                InOut: function (t) {
                  return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
                },
              },
              Cubic: {
                In: function (t) {
                  return t * t * t;
                },
                Out: function (t) {
                  return --t * t * t + 1;
                },
                InOut: function (t) {
                  return (t *= 2) < 1
                    ? 0.5 * t * t * t
                    : 0.5 * ((t -= 2) * t * t + 2);
                },
              },
              Quartic: {
                In: function (t) {
                  return t * t * t * t;
                },
                Out: function (t) {
                  return 1 - --t * t * t * t;
                },
                InOut: function (t) {
                  return (t *= 2) < 1
                    ? 0.5 * t * t * t * t
                    : -0.5 * ((t -= 2) * t * t * t - 2);
                },
              },
              Quintic: {
                In: function (t) {
                  return t * t * t * t * t;
                },
                Out: function (t) {
                  return --t * t * t * t * t + 1;
                },
                InOut: function (t) {
                  return (t *= 2) < 1
                    ? 0.5 * t * t * t * t * t
                    : 0.5 * ((t -= 2) * t * t * t * t + 2);
                },
              },
              Sinusoidal: {
                In: function (t) {
                  return 1 - Math.cos((t * Math.PI) / 2);
                },
                Out: function (t) {
                  return Math.sin((t * Math.PI) / 2);
                },
                InOut: function (t) {
                  return 0.5 * (1 - Math.cos(Math.PI * t));
                },
              },
              Exponential: {
                In: function (t) {
                  return 0 === t ? 0 : Math.pow(1024, t - 1);
                },
                Out: function (t) {
                  return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
                },
                InOut: function (t) {
                  return 0 === t
                    ? 0
                    : 1 === t
                    ? 1
                    : (t *= 2) < 1
                    ? 0.5 * Math.pow(1024, t - 1)
                    : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
                },
              },
              Circular: {
                In: function (t) {
                  return 1 - Math.sqrt(1 - t * t);
                },
                Out: function (t) {
                  return Math.sqrt(1 - --t * t);
                },
                InOut: function (t) {
                  return (t *= 2) < 1
                    ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                    : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                },
              },
              Elastic: {
                In: function (t) {
                  var e,
                    s = 0.1;
                  return 0 === t
                    ? 0
                    : 1 === t
                    ? 1
                    : (!s || 1 > s
                        ? ((s = 1), (e = 0.1))
                        : (e = (0.4 * Math.asin(1 / s)) / (2 * Math.PI)),
                      -s *
                        Math.pow(2, 10 * (t -= 1)) *
                        Math.sin((2 * (t - e) * Math.PI) / 0.4));
                },
                Out: function (t) {
                  var e,
                    s = 0.1;
                  return 0 === t
                    ? 0
                    : 1 === t
                    ? 1
                    : (!s || 1 > s
                        ? ((s = 1), (e = 0.1))
                        : (e = (0.4 * Math.asin(1 / s)) / (2 * Math.PI)),
                      s *
                        Math.pow(2, -10 * t) *
                        Math.sin((2 * (t - e) * Math.PI) / 0.4) +
                        1);
                },
                InOut: function (t) {
                  var e,
                    s = 0.1;
                  return 0 === t
                    ? 0
                    : 1 === t
                    ? 1
                    : (!s || 1 > s
                        ? ((s = 1), (e = 0.1))
                        : (e = (0.4 * Math.asin(1 / s)) / (2 * Math.PI)),
                      (t *= 2) < 1
                        ? -0.5 *
                          s *
                          Math.pow(2, 10 * (t -= 1)) *
                          Math.sin((2 * (t - e) * Math.PI) / 0.4)
                        : s *
                            Math.pow(2, -10 * (t -= 1)) *
                            Math.sin((2 * (t - e) * Math.PI) / 0.4) *
                            0.5 +
                          1);
                },
              },
              Back: {
                In: function (t) {
                  var e = 1.70158;
                  return t * t * ((e + 1) * t - e);
                },
                Out: function (t) {
                  var e = 1.70158;
                  return --t * t * ((e + 1) * t + e) + 1;
                },
                InOut: function (t) {
                  var e = 2.5949095;
                  return (t *= 2) < 1
                    ? 0.5 * t * t * ((e + 1) * t - e)
                    : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
                },
              },
              Bounce: {
                In: function (t) {
                  return 1 - n.Easing.Bounce.Out(1 - t);
                },
                Out: function (t) {
                  return 1 / 2.75 > t
                    ? 7.5625 * t * t
                    : 2 / 2.75 > t
                    ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                    : 2.5 / 2.75 > t
                    ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                    : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                },
                InOut: function (t) {
                  return 0.5 > t
                    ? 0.5 * n.Easing.Bounce.In(2 * t)
                    : 0.5 * n.Easing.Bounce.Out(2 * t - 1) + 0.5;
                },
              },
            }),
            (n.Interpolation = {
              Linear: function (t, e) {
                var s = t.length - 1,
                  i = s * e,
                  r = Math.floor(i),
                  o = n.Interpolation.Utils.Linear;
                return 0 > e
                  ? o(t[0], t[1], i)
                  : e > 1
                  ? o(t[s], t[s - 1], s - i)
                  : o(t[r], t[r + 1 > s ? s : r + 1], i - r);
              },
              Bezier: function (t, e) {
                for (
                  var s = 0,
                    i = t.length - 1,
                    r = Math.pow,
                    o = n.Interpolation.Utils.Bernstein,
                    a = 0;
                  i >= a;
                  a++
                )
                  s += r(1 - e, i - a) * r(e, a) * t[a] * o(i, a);
                return s;
              },
              CatmullRom: function (t, e) {
                var s = t.length - 1,
                  i = s * e,
                  r = Math.floor(i),
                  o = n.Interpolation.Utils.CatmullRom;
                return t[0] === t[s]
                  ? (0 > e && (r = Math.floor((i = s * (1 + e)))),
                    o(
                      t[(r - 1 + s) % s],
                      t[r],
                      t[(r + 1) % s],
                      t[(r + 2) % s],
                      i - r
                    ))
                  : 0 > e
                  ? t[0] - (o(t[0], t[0], t[1], t[1], -i) - t[0])
                  : e > 1
                  ? t[s] - (o(t[s], t[s], t[s - 1], t[s - 1], i - s) - t[s])
                  : o(
                      t[r ? r - 1 : 0],
                      t[r],
                      t[r + 1 > s ? s : r + 1],
                      t[r + 2 > s ? s : r + 2],
                      i - r
                    );
              },
              Utils: {
                Linear: function (t, e, s) {
                  return (e - t) * s + t;
                },
                Bernstein: function (t, e) {
                  var s = n.Interpolation.Utils.Factorial;
                  return s(t) / s(e) / s(t - e);
                },
                Factorial: (function () {
                  var t = [1];
                  return function (e) {
                    var s = 1;
                    if (t[e]) return t[e];
                    for (var i = e; i > 1; i--) s *= i;
                    return (t[e] = s), s;
                  };
                })(),
                CatmullRom: function (t, e, s, i, n) {
                  var r = 0.5 * (s - t),
                    o = 0.5 * (i - e),
                    a = n * n;
                  return (
                    (2 * e - 2 * s + r + o) * (n * a) +
                    (-3 * e + 3 * s - 2 * r - o) * a +
                    r * n +
                    e
                  );
                },
              },
            }),
            void 0 ===
              (s = function () {
                return n;
              }.apply(e, [])) || (t.exports = s);
        },
        577: (t, e, s) => {
          "use strict";
          s.r(e), s.d(e, { default: () => a });
          var i = s(537),
            n = s.n(i),
            r = s(645),
            o = s.n(r)()(n());
          o.push([
            t.id,
            ".mod-menu-container {\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    z-index: 11;\r\n    background-color: white;\r\n    border: 1px solid black;\r\n    min-height: 250px;\r\n\r\n    user-select: none; /* supported by Chrome and Opera */\r\n    -webkit-user-select: none; /* Safari */\r\n    -khtml-user-select: none; /* Konqueror HTML */\r\n    -moz-user-select: none; /* Firefox */\r\n    -ms-user-select: none; /* Internet Explorer/Edge */\r\n}\r\n\r\n.mod-v-seperator {\r\n    background-color: black;\r\n    margin-top: 6px;\r\n    margin-bottom: 6px;\r\n    width: 1px;\r\n}\r\n\r\n.mod-list-container {\r\n    display: grid;\r\n    grid-template-columns: auto auto auto;\r\n}\r\n\r\n.mod-section-title {\r\n    font-size: 13pt;\r\n    font-weight: bold;\r\n    text-align: center;\r\n    padding-bottom: 10px;\r\n    padding-left: 14px;\r\n    padding-right: 14px;\r\n}\r\n\r\n.mod-menu {\r\n    padding-top: 14px;\r\n    padding-bottom: 14px;\r\n}\r\n\r\n.mod-menu-option {\r\n    padding-left: 14px;\r\n    padding-right: 14px;\r\n    display: flex; font-size: 13px; align-items: center;\r\n    font-family: roboto_medium, Arial, Helvetica, sans-serif;\r\n    color: #1B5264;\r\n}\r\n.mod-menu-option:hover, .mod-menu-option.opened {\r\n    background-color: rgb(236, 236, 236);\r\n}\r\n\r\n.mod-clickable:hover {\r\n    cursor: pointer;\r\n}\r\n.mod-clickable.mod-disabled:hover {\r\n    cursor: auto;\r\n    background-color: unset;\r\n}\r\n\r\n.mod-description-container {\r\n    max-width: 200px;\r\n    min-width: 200px;\r\n    padding: 14px;\r\n}\r\n\r\n.mod-setting-description {\r\n    font-size: 13px;\r\n}\r\n\r\n.mod-title {\r\n    text-align: center;\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n    cursor: pointer;\r\n}\r\n\r\n.invisible {\r\n    display: none;\r\n}\r\n\r\n.mod-menu-container input {\r\n    width: 13px; margin-right: 4px; height: auto;\r\n}\r\n\r\n\r\n\r\n.mod-icon {\r\n    position: fixed;\r\n    background-size: 32px 32px;\r\n    margin: 7px;\r\n    z-index: 10;\r\n    width: 32px;\r\n    height: 32px;\r\n    bottom: 0;\r\n    left: 0;\r\n}\r\n.mod-icon:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.mod-update-notification {\r\n    width: 100%;\r\n    height: 50px;\r\n    background-color: rgb(43, 184, 43);\r\n    color: white;\r\n    border: 2px solid rgb(3, 141, 3);\r\n    position: fixed;\r\n    top: 0;\r\n    z-index: 1002;\r\n    text-align: center;\r\n    line-height: 46px;\r\n    cursor: pointer;\r\n}\r\n\r\n.mod-dismiss-button {\r\n    height: 30px;\r\n    background-color: rgb(39, 206, 53);\r\n    border: none;\r\n    border-radius: 4px;\r\n    color: white;\r\n}\r\n.mod-dismiss-button:hover {\r\n    background-color: rgb(20, 167, 32);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.shade-indicator {\r\n    width: 6px;\r\n    height: 6px;\r\n    border: 2px solid black;\r\n    box-sizing: unset;\r\n    border-radius: 6px;\r\n    pointer-events: none;\r\n    \r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n  }\r\n  \r\n.shade-picker-container {\r\n    position: relative;\r\n}\r\n.shade-picker-container canvas {\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.hue-picker-container {\r\n    position: relative;\r\n    margin-left: 10px;\r\n}\r\n.hue-picker-container canvas {\r\n    cursor: pointer;\r\n}\r\n\r\n.hue-indicator {\r\n    position: absolute;\r\n    box-sizing: unset;\r\n    width: 28px;\r\n    height: 6px;\r\n    left: -4px;\r\n    border: 1px solid black;\r\n    border-left: none;\r\n    border-right: none;\r\n    pointer-events: none;\r\n}\r\n\r\n.color-picker-container {\r\n    padding: 10px;\r\n    width: fit-content;\r\n}\r\n\r\n.color-picker-container .graphic-container {\r\n    display: flex;\r\n    width: fit-content;\r\n    margin-bottom: 10px;\r\n}\r\n\r\nbody {\r\n    margin: 0;\r\n}\r\n\r\n.textbox-container {\r\n    display: flex;\r\n}\r\n\r\n.color-box {\r\n    flex: 1;\r\n    width: 0;\r\n    padding: 2px;\r\n    margin-left: 10px;\r\n    font-size: 13px;\r\n    text-align: center;\r\n}\r\n\r\n.red-box {\r\n    margin-left: 0;\r\n    border-bottom: 4px solid red;\r\n}\r\n\r\n.green-box {\r\n    border-bottom: 4px solid green;\r\n}\r\n\r\n.blue-box {\r\n    border-bottom: 4px solid blue;\r\n}",
            "",
            {
              version: 3,
              sources: ["webpack://./src/mod/ui-elements/style.css"],
              names: [],
              mappings:
                "AAAA;IACI,eAAe;IACf,OAAO;IACP,SAAS;IACT,WAAW;IACX,uBAAuB;IACvB,uBAAuB;IACvB,iBAAiB;;IAEjB,iBAAiB,EAAE,kCAAkC;IACrD,yBAAyB,EAAE,WAAW;IACtC,wBAAwB,EAAE,mBAAmB;IAC7C,sBAAsB,EAAE,YAAY;IACpC,qBAAqB,EAAE,2BAA2B;AACtD;;AAEA;IACI,uBAAuB;IACvB,eAAe;IACf,kBAAkB;IAClB,UAAU;AACd;;AAEA;IACI,aAAa;IACb,qCAAqC;AACzC;;AAEA;IACI,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,oBAAoB;IACpB,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,oBAAoB;AACxB;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,eAAe;IACf,wDAAwD;IACxD,cAAc;AAClB;AACA;IACI,oCAAoC;AACxC;;AAEA;IACI,eAAe;AACnB;AACA;IACI,YAAY;IACZ,uBAAuB;AAC3B;;AAEA;IACI,gBAAgB;IAChB,gBAAgB;IAChB,aAAa;AACjB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;AAChB;;;;AAIA;IACI,eAAe;IACf,0BAA0B;IAC1B,WAAW;IACX,WAAW;IACX,WAAW;IACX,YAAY;IACZ,SAAS;IACT,OAAO;AACX;AACA;IACI,eAAe;AACnB;;;AAGA;IACI,WAAW;IACX,YAAY;IACZ,kCAAkC;IAClC,YAAY;IACZ,gCAAgC;IAChC,eAAe;IACf,MAAM;IACN,aAAa;IACb,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,kCAAkC;IAClC,YAAY;IACZ,kBAAkB;IAClB,YAAY;AAChB;AACA;IACI,kCAAkC;AACtC;;;;;;AAMA;IACI,UAAU;IACV,WAAW;IACX,uBAAuB;IACvB,iBAAiB;IACjB,kBAAkB;IAClB,oBAAoB;;IAEpB,kBAAkB;IAClB,MAAM;IACN,OAAO;EACT;;AAEF;IACI,kBAAkB;AACtB;AACA;IACI,eAAe;AACnB;;;AAGA;IACI,kBAAkB;IAClB,iBAAiB;AACrB;AACA;IACI,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,iBAAiB;IACjB,WAAW;IACX,WAAW;IACX,UAAU;IACV,uBAAuB;IACvB,iBAAiB;IACjB,kBAAkB;IAClB,oBAAoB;AACxB;;AAEA;IACI,aAAa;IACb,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,mBAAmB;AACvB;;AAEA;IACI,SAAS;AACb;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,iBAAiB;IACjB,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,cAAc;IACd,4BAA4B;AAChC;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,6BAA6B;AACjC",
              sourcesContent: [
                ".mod-menu-container {\r\n    position: fixed;\r\n    left: 0;\r\n    bottom: 0;\r\n    z-index: 11;\r\n    background-color: white;\r\n    border: 1px solid black;\r\n    min-height: 250px;\r\n\r\n    user-select: none; /* supported by Chrome and Opera */\r\n    -webkit-user-select: none; /* Safari */\r\n    -khtml-user-select: none; /* Konqueror HTML */\r\n    -moz-user-select: none; /* Firefox */\r\n    -ms-user-select: none; /* Internet Explorer/Edge */\r\n}\r\n\r\n.mod-v-seperator {\r\n    background-color: black;\r\n    margin-top: 6px;\r\n    margin-bottom: 6px;\r\n    width: 1px;\r\n}\r\n\r\n.mod-list-container {\r\n    display: grid;\r\n    grid-template-columns: auto auto auto;\r\n}\r\n\r\n.mod-section-title {\r\n    font-size: 13pt;\r\n    font-weight: bold;\r\n    text-align: center;\r\n    padding-bottom: 10px;\r\n    padding-left: 14px;\r\n    padding-right: 14px;\r\n}\r\n\r\n.mod-menu {\r\n    padding-top: 14px;\r\n    padding-bottom: 14px;\r\n}\r\n\r\n.mod-menu-option {\r\n    padding-left: 14px;\r\n    padding-right: 14px;\r\n    font-size: 16px;\r\n    font-family: roboto_medium, Arial, Helvetica, sans-serif;\r\n    color: #1B5264;\r\n}\r\n.mod-menu-option:hover, .mod-menu-option.opened {\r\n    background-color: rgb(236, 236, 236);\r\n}\r\n\r\n.mod-clickable:hover {\r\n    cursor: pointer;\r\n}\r\n.mod-clickable.mod-disabled:hover {\r\n    cursor: auto;\r\n    background-color: unset;\r\n}\r\n\r\n.mod-description-container {\r\n    max-width: 200px;\r\n    min-width: 200px;\r\n    padding: 14px;\r\n}\r\n\r\n.mod-setting-description {\r\n    font-size: 13px;\r\n}\r\n\r\n.mod-title {\r\n    text-align: center;\r\n    display: flex;\r\n    flex-direction: column;\r\n    height: 100%;\r\n    cursor: pointer;\r\n}\r\n\r\n.invisible {\r\n    display: none;\r\n}\r\n\r\n.mod-menu-container input {\r\n    height: auto;\r\n}\r\n\r\n\r\n\r\n.mod-icon {\r\n    position: fixed;\r\n    background-size: 32px 32px;\r\n    margin: 7px;\r\n    z-index: 10;\r\n    width: 32px;\r\n    height: 32px;\r\n    bottom: 0;\r\n    left: 0;\r\n}\r\n.mod-icon:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.mod-update-notification {\r\n    width: 100%;\r\n    height: 50px;\r\n    background-color: rgb(43, 184, 43);\r\n    color: white;\r\n    border: 2px solid rgb(3, 141, 3);\r\n    position: fixed;\r\n    top: 0;\r\n    z-index: 1002;\r\n    text-align: center;\r\n    line-height: 46px;\r\n    cursor: pointer;\r\n}\r\n\r\n.mod-dismiss-button {\r\n    height: 30px;\r\n    background-color: rgb(39, 206, 53);\r\n    border: none;\r\n    border-radius: 4px;\r\n    color: white;\r\n}\r\n.mod-dismiss-button:hover {\r\n    background-color: rgb(20, 167, 32);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.shade-indicator {\r\n    width: 6px;\r\n    height: 6px;\r\n    border: 2px solid black;\r\n    box-sizing: unset;\r\n    border-radius: 6px;\r\n    pointer-events: none;\r\n    \r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n  }\r\n  \r\n.shade-picker-container {\r\n    position: relative;\r\n}\r\n.shade-picker-container canvas {\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.hue-picker-container {\r\n    position: relative;\r\n    margin-left: 10px;\r\n}\r\n.hue-picker-container canvas {\r\n    cursor: pointer;\r\n}\r\n\r\n.hue-indicator {\r\n    position: absolute;\r\n    box-sizing: unset;\r\n    width: 28px;\r\n    height: 6px;\r\n    left: -4px;\r\n    border: 1px solid black;\r\n    border-left: none;\r\n    border-right: none;\r\n    pointer-events: none;\r\n}\r\n\r\n.color-picker-container {\r\n    padding: 10px;\r\n    width: fit-content;\r\n}\r\n\r\n.color-picker-container .graphic-container {\r\n    display: flex;\r\n    width: fit-content;\r\n    margin-bottom: 10px;\r\n}\r\n\r\nbody {\r\n    margin: 0;\r\n}\r\n\r\n.textbox-container {\r\n    display: flex;\r\n}\r\n\r\n.color-box {\r\n    flex: 1;\r\n    width: 0;\r\n    padding: 2px;\r\n    margin-left: 10px;\r\n    font-size: 13px;\r\n    text-align: center;\r\n}\r\n\r\n.red-box {\r\n    margin-left: 0;\r\n    border-bottom: 4px solid red;\r\n}\r\n\r\n.green-box {\r\n    border-bottom: 4px solid green;\r\n}\r\n\r\n.blue-box {\r\n    border-bottom: 4px solid blue;\r\n}",
              ],
              sourceRoot: "",
            },
          ]);
          const a = o;
        },
        645: (t) => {
          "use strict";
          t.exports = function (t) {
            var e = [];
            return (
              (e.toString = function () {
                return this.map(function (e) {
                  var s = "",
                    i = void 0 !== e[5];
                  return (
                    e[4] && (s += "@supports (".concat(e[4], ") {")),
                    e[2] && (s += "@media ".concat(e[2], " {")),
                    i &&
                      (s += "@layer".concat(
                        e[5].length > 0 ? " ".concat(e[5]) : "",
                        " {"
                      )),
                    (s += t(e)),
                    i && (s += "}"),
                    e[2] && (s += "}"),
                    e[4] && (s += "}"),
                    s
                  );
                }).join("");
              }),
              (e.i = function (t, s, i, n, r) {
                "string" == typeof t && (t = [[null, t, void 0]]);
                var o = {};
                if (i)
                  for (var a = 0; a < this.length; a++) {
                    var h = this[a][0];
                    null != h && (o[h] = !0);
                  }
                for (var l = 0; l < t.length; l++) {
                  var c = [].concat(t[l]);
                  (i && o[c[0]]) ||
                    (void 0 !== r &&
                      (void 0 === c[5] ||
                        (c[1] = "@layer"
                          .concat(c[5].length > 0 ? " ".concat(c[5]) : "", " {")
                          .concat(c[1], "}")),
                      (c[5] = r)),
                    s &&
                      (c[2]
                        ? ((c[1] = "@media "
                            .concat(c[2], " {")
                            .concat(c[1], "}")),
                          (c[2] = s))
                        : (c[2] = s)),
                    n &&
                      (c[4]
                        ? ((c[1] = "@supports ("
                            .concat(c[4], ") {")
                            .concat(c[1], "}")),
                          (c[4] = n))
                        : (c[4] = "".concat(n))),
                    e.push(c));
                }
              }),
              e
            );
          };
        },
        537: (t) => {
          "use strict";
          t.exports = function (t) {
            var e = t[1],
              s = t[3];
            if (!s) return e;
            if ("function" == typeof btoa) {
              var i = btoa(unescape(encodeURIComponent(JSON.stringify(s)))),
                n =
                  "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                    i
                  ),
                r = "/*# ".concat(n, " */"),
                o = s.sources.map(function (t) {
                  return "/*# sourceURL="
                    .concat(s.sourceRoot || "")
                    .concat(t, " */");
                });
              return [e].concat(o).concat([r]).join("\n");
            }
            return [e].join("\n");
          };
        },
        588: (t, e, s) => {
          var i = s(379),
            n = s(577);
          "string" == typeof (n = n.__esModule ? n.default : n) &&
            (n = [[t.id, n, ""]]);
          i(n, { insert: "head", singleton: !1 }), (t.exports = n.locals || {});
        },
        379: (t, e, s) => {
          "use strict";
          var i,
            n = (function () {
              var t = {};
              return function (e) {
                if (void 0 === t[e]) {
                  var s = document.querySelector(e);
                  if (
                    window.HTMLIFrameElement &&
                    s instanceof window.HTMLIFrameElement
                  )
                    try {
                      s = s.contentDocument.head;
                    } catch (t) {
                      s = null;
                    }
                  t[e] = s;
                }
                return t[e];
              };
            })(),
            r = [];
          function o(t) {
            for (var e = -1, s = 0; s < r.length; s++)
              if (r[s].identifier === t) {
                e = s;
                break;
              }
            return e;
          }
          function a(t, e) {
            for (var s = {}, i = [], n = 0; n < t.length; n++) {
              var a = t[n],
                h = e.base ? a[0] + e.base : a[0],
                l = s[h] || 0,
                c = "".concat(h, " ").concat(l);
              s[h] = l + 1;
              var u = o(c),
                d = { css: a[1], media: a[2], sourceMap: a[3] };
              -1 !== u
                ? (r[u].references++, r[u].updater(d))
                : r.push({ identifier: c, updater: g(d, e), references: 1 }),
                i.push(c);
            }
            return i;
          }
          function h(t) {
            var e = document.createElement("style"),
              i = t.attributes || {};
            if (void 0 === i.nonce) {
              var r = s.nc;
              r && (i.nonce = r);
            }
            if (
              (Object.keys(i).forEach(function (t) {
                e.setAttribute(t, i[t]);
              }),
              "function" == typeof t.insert)
            )
              t.insert(e);
            else {
              var o = n(t.insert || "head");
              if (!o)
                throw new Error(
                  "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
                );
              o.appendChild(e);
            }
            return e;
          }
          var l,
            c =
              ((l = []),
              function (t, e) {
                return (l[t] = e), l.filter(Boolean).join("\n");
              });
          function u(t, e, s, i) {
            var n = s
              ? ""
              : i.media
              ? "@media ".concat(i.media, " {").concat(i.css, "}")
              : i.css;
            if (t.styleSheet) t.styleSheet.cssText = c(e, n);
            else {
              var r = document.createTextNode(n),
                o = t.childNodes;
              o[e] && t.removeChild(o[e]),
                o.length ? t.insertBefore(r, o[e]) : t.appendChild(r);
            }
          }
          function d(t, e, s) {
            var i = s.css,
              n = s.media,
              r = s.sourceMap;
            if (
              (n ? t.setAttribute("media", n) : t.removeAttribute("media"),
              r &&
                btoa &&
                (i +=
                  "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                    btoa(unescape(encodeURIComponent(JSON.stringify(r)))),
                    " */"
                  )),
              t.styleSheet)
            )
              t.styleSheet.cssText = i;
            else {
              for (; t.firstChild; ) t.removeChild(t.firstChild);
              t.appendChild(document.createTextNode(i));
            }
          }
          var p = null,
            f = 0;
          function g(t, e) {
            var s, i, n;
            if (e.singleton) {
              var r = f++;
              (s = p || (p = h(e))),
                (i = u.bind(null, s, r, !1)),
                (n = u.bind(null, s, r, !0));
            } else
              (s = h(e)),
                (i = d.bind(null, s, e)),
                (n = function () {
                  !(function (t) {
                    if (null === t.parentNode) return !1;
                    t.parentNode.removeChild(t);
                  })(s);
                });
            return (
              i(t),
              function (e) {
                if (e) {
                  if (
                    e.css === t.css &&
                    e.media === t.media &&
                    e.sourceMap === t.sourceMap
                  )
                    return;
                  i((t = e));
                } else n();
              }
            );
          }
          t.exports = function (t, e) {
            (e = e || {}).singleton ||
              "boolean" == typeof e.singleton ||
              (e.singleton =
                (void 0 === i &&
                  (i = Boolean(
                    window && document && document.all && !window.atob
                  )),
                i));
            var s = a((t = t || []), e);
            return function (t) {
              if (
                ((t = t || []),
                "[object Array]" === Object.prototype.toString.call(t))
              ) {
                for (var i = 0; i < s.length; i++) {
                  var n = o(s[i]);
                  r[n].references--;
                }
                for (var h = a(t, e), l = 0; l < s.length; l++) {
                  var c = o(s[l]);
                  0 === r[c].references && (r[c].updater(), r.splice(c, 1));
                }
                s = h;
              }
            };
          };
        },
        978: (t, e, s) => {
          "use strict";
          s.d(e, { Z: () => r });
          var i = s(981);
          class n {
            constructor() {}
            initialize(t) {
              (this.scene = t),
                (this.game = t.game),
                (this.assets = t.assets),
                (this.settings = t.settings),
                (this.stage = t.game.stage),
                (this.mouse = t.mouse),
                (this.playerManager = t.playerManager),
                this.createSprite(),
                this.addControls(),
                this.resize();
            }
            isVisible() {
              return this.controlsContainer.visible;
            }
            addControls() {}
            createSprite() {
              const t = this.scene.assets.getResult(this.name),
                e = this.controlsSpriteSheetData;
              e.images = [t];
              const s = new createjs.SpriteSheet(e),
                i = new createjs.Sprite(s);
              this.controlsSprite = i;
            }
            hide() {
              this.controlsContainer.visible = !1;
            }
            show() {
              this.controlsContainer.visible = !0;
            }
            setVisibility(t) {
              this.controlsContainer.visible = t;
            }
            createControl(t) {
              const e = this.controlsSprite.clone(),
                s = (0, i.extend)(
                  {},
                  this.defaultControlOptions,
                  this.controlData[t]
                );
              e.gotoAndStop(t),
                (e.buttonDetails = s),
                (e.cursor = "pointer"),
                e.on("mousedown", this.controlDown.bind(this)),
                e.on("pressup", this.controlUp.bind(this)),
                e.on("mouseover", this.mouseOver.bind(this)),
                e.on("mouseout", this.mouseOut.bind(this));
              const n = e.getBounds();
              if (
                ((e.regX = n.width / 2),
                (e.regY = n.height / 2),
                (e.alpha = 0.5),
                (e.name = t),
                (e.visible = s.visible),
                s.hitArea)
              ) {
                const t = s.hitArea,
                  i = new createjs.Shape();
                t.radius
                  ? i.graphics.beginFill("#000").drawCircle(t.x, t.y, t.radius)
                  : (i.graphics
                      .beginFill("#000")
                      .drawRect(t.x, t.y, t.width, t.height),
                    (e.hitArea = i));
              }
              return e;
            }
            mouseOver(t) {
              (t.target.alpha = 0.8), (this.mouse.enabled = !1);
            }
            mouseOut(t) {
              (t.target.alpha = 0.5), (this.mouse.enabled = !0);
            }
            controlDown(t) {
              const e = t.target.buttonDetails,
                s = this.playerManager.firstPlayer.getGamepad();
              if ((e.key && s.setButtonDown(e.key), e.keys))
                for (let t = 0; t < e.keys.length; t++)
                  s.setButtonDown(e.keys[t]);
              e.downCallback && e.downCallback(t),
                this.settings.mobile && (this.mouse.enabled = !1),
                (t.target.alpha = 1);
            }
            controlUp(t) {
              const e = t.target.buttonDetails,
                s = this.playerManager.firstPlayer.getGamepad();
              if ((e.key && s.setButtonUp(e.key), e.keys))
                for (let t = 0; t < e.keys.length; t++) s.setButtonUp(e.keys[t]);
              e.upCallback && e.upCallback(t),
                this.settings.mobile
                  ? ((this.mouse.enabled = !0), (t.target.alpha = 0.5))
                  : (t.target.alpha = 0.8);
            }
            close() {}
            update() {}
            resize() {
              const t = this.scene.game,
                e = (this.scene.screen, t.width),
                s = t.height,
                i = t.pixelRatio,
                n = this.controlsContainer.children;
              for (const t in n) {
                const r = n[t],
                  o = r.buttonDetails;
                o.bottom && (r.y = s - o.bottom * (i / 2)),
                  o.left && (r.x = o.left * (i / 2)),
                  o.right && (r.x = e - o.right * (i / 2)),
                  o.top && (r.y = o.top * (i / 2)),
                  (r.scaleX = r.scaleY = i / 2);
              }
            }
          }
          (n.prototype.defaultControlOptions = { visible: !0 }),
            (n.prototype.name = null),
            (n.prototype.controlData = null),
            (n.prototype.game = null),
            (n.prototype.scene = null),
            (n.prototype.settings = null),
            (n.prototype.stage = null),
            (n.prototype.controlsContainer = null),
            (n.prototype.controlsSprite = null),
            (n.prototype.gamepad = null),
            (n.prototype.controlsSpriteSheetData = null);
          const r = n;
        },
        807: (t, e, s) => {
          function i(t) {
            this.initialize(t);
          }
          var n = s(978).Z,
            r = (i.prototype = new n());
          (r.name = "phone_controls"),
            (r.mainResize = r.resize),
            (r.zoomControlsContainer = null),
            (r.lastCheckpointButton = null),
            (r.replayButton = null),
            (r.controlsSpriteSheetData = {
              frames: [
                [782, 2, 128, 128],
                [652, 2, 128, 128],
                [522, 2, 128, 128],
                [912, 78, 75, 75],
                [392, 2, 128, 128],
                [912, 2, 75, 75],
                [262, 2, 128, 128],
                [132, 2, 128, 128],
                [2, 2, 128, 128],
              ],
              animations: {
                accelerate: [0],
                brake: [1],
                direction: [2],
                last_checkpoint: [3],
                left: [4],
                replay: [5],
                right: [6],
                zoom_in: [7],
                zoom_out: [8],
              },
            }),
            (r.controlData = {
              brake: {
                key: "down",
                bottom: 100,
                left: 100,
                hitArea: { width: 250, height: 200, x: -30, y: -15 },
              },
              direction: {
                key: "z",
                bottom: 250,
                right: 100,
                hitArea: { width: 200, height: 200, x: -20, y: -65 },
              },
              forward: {
                key: "up",
                bottom: 250,
                left: 100,
                hitArea: { width: 250, height: 200, x: -30, y: -65 },
              },
              last_checkpoint: { key: "enter", top: 60, left: 160 },
              left: {
                key: "left",
                bottom: 100,
                right: 250,
                hitArea: { width: 230, height: 230, x: -100, y: -65 },
              },
              right: {
                key: "right",
                bottom: 100,
                right: 100,
                hitArea: { width: 200, height: 200, x: -10, y: -15 },
              },
              replay: { key: "restart", top: 60, left: 80 },
              zoom_in: { key: "zoom_increase", bottom: 100, right: 100 },
              zoom_out: { key: "zoom_decrease", bottom: 100, left: 100 },
            }),
            (r.addControls = function () {
              var t = this.createControl("last_checkpoint"),
                e = this.createControl("replay"),
                s = this.createControl("zoom_in"),
                i = this.createControl("zoom_out"),
                n = new createjs.Container();
              n.addChild(this.createControl("left")),
                n.addChild(this.createControl("right")),
                n.addChild(this.createControl("forward")),
                n.addChild(this.createControl("brake")),
                n.addChild(this.createControl("direction")),
                n.addChild(t),
                n.addChild(e),
                n.addChild(s),
                n.addChild(i);
              var r = new createjs.Container();
              r.addChild(s),
                r.addChild(i),
                (r.visibility = !1),
                (this.lastCheckpointButton = t),
                (this.replayButton = e),
                (this.controlsContainer = n),
                (this.zoomControlsContainer = r),
                this.stage.addChild(n),
                this.stage.addChild(r);
            }),
            (r.resize = function () {
              var t = this.scene.game,
                e = (this.scene.screen, t.width),
                s = t.height,
                i = t.pixelRatio,
                n = this.zoomControlsContainer.children;
              for (var r in n) {
                var o = n[r],
                  a = o.buttonDetails;
                a.bottom && (o.y = s - a.bottom * (i / 2)),
                  a.left && (o.x = a.left * (i / 2)),
                  a.right && (o.x = e - a.right * (i / 2)),
                  a.top && (o.y = a.top * (i / 2)),
                  (o.scaleX = o.scaleY = i / 2);
              }
              this.mainResize();
            }),
            (r.setZoomControlsVisibilty = function (t) {
              this.zoomControlsContainer.visible = t;
            }),
            (r.update = function () {
              var t = this.scene;
              this.lastCheckpointButton.visible =
                !!t.playerManager.firstPlayer.hasCheckpoints();
            }),
            (t.exports = i);
        },
        127: (t, e, s) => {
          function i(t) {
            if (!1 === t.settings.fullscreenAvailable) {
              var e = this.controlData["settings_btn-hover"];
              (e.top = 60), (e.right = 150);
            }
            this.initialize(t);
          }
          var n = s(978).Z,
            r = (i.prototype = new n());
          (r.name = "settings_controls"),
            (r.controlsSpriteSheetData = {
              frames: [
                [78, 2, 76, 76],
                [2, 2, 76, 76],
              ],
              animations: { "settings_btn-hover": [0], settings_btn: [1] },
            }),
            (r.controlData = {
              "settings_btn-hover": { top: 60, right: 230, key: "settings" },
            }),
            (r.update = function () {}),
            (r.addControls = function () {
              var t = new createjs.Container();
              t.addChild(this.createControl("settings_btn-hover")),
                (this.controlsContainer = t),
                this.stage.addChild(t);
            }),
            (t.exports = i);
        },
        211: (t, e, s) => {
          function i(t) {
            this.initialize(t);
          }
          var n = s(978).Z,
            r = (i.prototype = new n());
          (r.name = "tablet_controls"),
            (r.mainResize = r.resize),
            (r.zoomControlsContainer = null),
            (r.lastCheckpointButton = null),
            (r.controlsSpriteSheetData = {
              frames: [
                [154, 306, 150, 150],
                [154, 154, 150, 150],
                [382, 154, 75, 75],
                [306, 2, 150, 150],
                [154, 2, 150, 150],
                [306, 154, 75, 75],
                [2, 306, 150, 150],
                [2, 154, 150, 150],
                [2, 2, 150, 150],
              ],
              animations: {
                accelerate: [0],
                brake: [1],
                last_checkpoint: [2],
                direction: [3],
                left: [4],
                replay: [5],
                right: [6],
                zoom_in: [7],
                zoom_out: [8],
              },
            }),
            (r.controlData = {
              brake: {
                key: "down",
                bottom: 120,
                left: 285,
                hitArea: { radius: 150, x: 75, y: 90 },
              },
              direction: {
                key: "z",
                bottom: 285,
                right: 450,
                hitArea: { radius: 150, x: 40, y: 40 },
              },
              forward: {
                key: "up",
                bottom: 285,
                left: 140,
                hitArea: { radius: 150, x: 75, y: 75 },
              },
              last_checkpoint: { key: "enter", top: 60, left: 160 },
              left: {
                key: "left",
                bottom: 120,
                right: 285,
                hitArea: { radius: 150, x: 75, y: 75 },
              },
              right: {
                key: "right",
                bottom: 285,
                right: 140,
                hitArea: { radius: 150, x: 100, y: 40 },
              },
              replay: { key: "restart", top: 60, left: 80 },
              zoom_in: { key: "zoom_increase", bottom: 285, right: 140 },
              zoom_out: { key: "zoom_decrease", bottom: 285, left: 140 },
            }),
            (r.resize = function () {
              var t = this.scene.game,
                e = (this.scene.screen, t.width),
                s = t.height,
                i = t.pixelRatio,
                n = this.zoomControlsContainer.children;
              for (var r in n) {
                var o = n[r],
                  a = o.buttonDetails;
                a.bottom && (o.y = s - a.bottom * (i / 2)),
                  a.left && (o.x = a.left * (i / 2)),
                  a.right && (o.x = e - a.right * (i / 2)),
                  a.top && (o.y = a.top * (i / 2)),
                  (o.scaleX = o.scaleY = i / 2);
              }
              this.mainResize();
            }),
            (r.setZoomControlsVisibilty = function (t) {
              this.zoomControlsContainer.visible = t;
            }),
            (r.addControls = function () {
              var t = this.createControl("zoom_in"),
                e = this.createControl("zoom_out"),
                s = new createjs.Container();
              s.addChild(this.createControl("left")),
                s.addChild(this.createControl("right")),
                s.addChild(this.createControl("forward")),
                s.addChild(this.createControl("brake")),
                s.addChild(this.createControl("direction")),
                s.addChild(this.createControl("last_checkpoint")),
                s.addChild(this.createControl("replay"));
              var i = new createjs.Container();
              i.addChild(t),
                i.addChild(e),
                (i.visible = !1),
                (this.lastCheckpointButton = s.getChildByName("last_checkpoint")),
                (this.controlsContainer = s),
                (this.zoomControlsContainer = i),
                this.stage.addChild(s),
                this.stage.addChild(i);
            }),
            (r.update = function () {
              var t = this.scene;
              this.lastCheckpointButton.visible =
                !!t.playerManager.firstPlayer.hasCheckpoints();
            }),
            (t.exports = i);
        },
        219: (t) => {
          !(function () {
            "use strict";
            function e(t) {
              (this.drawAngle = 0), (this.colors = t), this.createVersion();
            }
            var s = GameInventoryManager.HeadClass,
              i = Math.max,
              n = {},
              r = 0.17,
              o = (e.prototype = new s());
            (o.versionName = ""),
              (o.dirty = !0),
              (o.getVersions = function () {
                return n;
              }),
              (o.cache = function (t) {
                var e = n[this.versionName];
                e.dirty = !1;
                var s = 115 * (t = i(t, 1)) * r,
                  o = 112 * t * r,
                  a = e.canvas;
                (a.width = s), (a.height = o), a.width, a.height;
                var h = a.getContext("2d"),
                  l = r * t,
                  c = this.colors;
                h.save(),
                  h.scale(l, l),
                  h.translate(0, 0),
                  h.beginPath(),
                  (h.strokeStyle = "rgba(0,0,0,0)"),
                  (h.lineCap = "butt"),
                  (h.lineJoin = "miter"),
                  (h.miterLimit = 4),
                  h.save(),
                  (h.fillStyle = "#ffffff"),
                  h.beginPath(),
                  h.arc(42.4, 52.5, 30.3, 0, 6.283185307179586, !0),
                  h.closePath(),
                  h.fill(),
                  h.stroke(),
                  h.restore(),
                  h.save(),
                  (h.fillStyle = c.back),
                  h.beginPath(),
                  h.moveTo(71.624, 44.496),
                  h.bezierCurveTo(68.112, 31.647, 56.363, 22.2, 42.4, 22.2),
                  h.bezierCurveTo(
                    25.665999999999997,
                    22.2,
                    12.099999999999998,
                    35.765,
                    12.099999999999998,
                    52.5
                  ),
                  h.bezierCurveTo(
                    12.099999999999998,
                    55.771,
                    12.623999999999999,
                    58.916,
                    13.582999999999998,
                    61.867000000000004
                  ),
                  h.lineTo(71.624, 44.496),
                  h.closePath(),
                  h.fill(),
                  h.stroke(),
                  h.restore(),
                  c.front &&
                    (h.save(),
                    h.beginPath(),
                    h.moveTo(76.917, 38.393),
                    h.bezierCurveTo(
                      71.677,
                      25.617,
                      59.54900000000001,
                      16.371000000000002,
                      45.172,
                      15.309000000000001
                    ),
                    h.bezierCurveTo(
                      47.57899999999999,
                      22.559,
                      50.918,
                      33.862,
                      52.501,
                      44.894999999999996
                    ),
                    h.bezierCurveTo(
                      60.643,
                      42.731,
                      68.775,
                      40.566,
                      76.917,
                      38.393
                    ),
                    h.closePath(),
                    (h.fillStyle = c.front),
                    h.fill(),
                    h.stroke(),
                    h.restore()),
                  h.save(),
                  h.beginPath(),
                  h.moveTo(42.4, 22.2),
                  h.bezierCurveTo(59.134, 22.2, 72.7, 35.765, 72.7, 52.5),
                  h.bezierCurveTo(72.7, 69.235, 59.135, 82.8, 42.4, 82.8),
                  h.bezierCurveTo(25.665, 82.8, 12.1, 69.234, 12.1, 52.5),
                  h.bezierCurveTo(
                    12.1,
                    35.766000000000005,
                    25.666,
                    22.2,
                    42.4,
                    22.2
                  ),
                  h.moveTo(42.4, 15.2),
                  h.bezierCurveTo(
                    21.833,
                    15.2,
                    5.100000000000001,
                    31.932,
                    5.100000000000001,
                    52.5
                  ),
                  h.bezierCurveTo(
                    5.100000000000001,
                    73.068,
                    21.832,
                    89.8,
                    42.4,
                    89.8
                  ),
                  h.bezierCurveTo(
                    62.967999999999996,
                    89.8,
                    79.69999999999999,
                    73.068,
                    79.69999999999999,
                    52.5
                  ),
                  h.bezierCurveTo(
                    79.69999999999999,
                    31.932000000000002,
                    62.968,
                    15.2,
                    42.4,
                    15.2
                  ),
                  h.lineTo(42.4, 15.2),
                  h.closePath(),
                  h.fill(),
                  h.stroke(),
                  h.restore(),
                  h.save(),
                  h.beginPath(),
                  h.moveTo(16.3, 66.85),
                  h.bezierCurveTo(
                    41.8,
                    60.148999999999994,
                    67.2,
                    53.449999999999996,
                    92.601,
                    46.648999999999994
                  ),
                  h.bezierCurveTo(
                    96.201,
                    45.648999999999994,
                    99.8,
                    44.748999999999995,
                    103.5,
                    43.748999999999995
                  ),
                  h.bezierCurveTo(
                    111,
                    41.748999999999995,
                    107.8,
                    30.148999999999994,
                    100.3,
                    32.148999999999994
                  ),
                  h.bezierCurveTo(
                    74.901,
                    38.94899999999999,
                    49.400999999999996,
                    45.748999999999995,
                    24,
                    52.449
                  ),
                  h.bezierCurveTo(20.4, 53.449, 16.8, 54.349, 13.101, 55.349),
                  h.bezierCurveTo(5.7, 57.35, 8.9, 68.85, 16.3, 66.85),
                  h.lineTo(16.3, 66.85),
                  h.closePath(),
                  h.fill(),
                  h.stroke(),
                  h.restore();
              }),
              (o.setDirty = function () {
                n[this.versionName].dirty = !0;
              }),
              (o.getBaseWidth = function () {
                return 115;
              }),
              (o.getBaseHeight = function () {
                return 112;
              }),
              (o.getDrawOffsetX = function () {
                return 2.2;
              }),
              (o.getDrawOffsetY = function () {
                return 1;
              }),
              (o.getScale = function () {
                return r;
              }),
              GameInventoryManager &&
                GameInventoryManager.register("forward_cap", e),
              void 0 !== t.exports &&
                (t.exports && (t.exports = t.exports = e),
                (t.exports.Forward_Cap = e));
          })();
        },
        787: (t, e, s) => {
          function i() {}
          s(302);
          var n = (Math.atan2, i.prototype);
          (n.createVersion = function () {
            var t = this.colors,
              e = this.getVersions(),
              s = "";
            for (var i in t) t.hasOwnProperty(i) && (s += t[i]);
            (this.versionName = s),
              e[s] ||
                (e[s] = { dirty: !0, canvas: document.createElement("canvas") });
          }),
            (n.draw = function (t, e, s, i, n, r) {
              var o = this.getCache(n),
                a = this.getBaseWidth(),
                h = this.getBaseHeight(),
                l = this.getScale(),
                c = a * n * l,
                u = h * n * l,
                d = this.getDrawOffsetX() * n - c / 2,
                p = this.getDrawOffsetY() * n - u / 2,
                f = -1 === r;
              t.translate(e, s),
                t.rotate(i),
                f && t.scale(1, -1),
                t.drawImage(o, d, p, c, u),
                f && t.scale(1, -1),
                t.rotate(-i),
                t.translate(-e, -s);
            }),
            (n.getCache = function (t) {
              var e = this.getVersions();
              return (
                e[this.versionName].dirty && this.cache(t),
                e[this.versionName].canvas
              );
            }),
            (n.setDirty = function () {
              this.getVersions()[this.versionName].dirty = !0;
            }),
            (t.exports = i),
            GameInventoryManager && (GameInventoryManager.HeadClass = i);
        },
        302: (t) => {
          function e() {}
          var s = {},
            i = {},
            n = {},
            r = e.prototype;
          (r.getItem = function (t) {
            var e = t.classname,
              r = t.script,
              o = t.options,
              a = t.type;
            s[e] ||
              ("1" === a && ((e = "forward_cap"), (o = { back: "white" })),
              n[r] || ((n[r] = !0), GameManager.loadFile(r)));
            var h = this.generateID(a, e, o);
            return i[h] || (i[h] = new s[e](o)), i[h];
          }),
            (r.redraw = function () {
              for (var t in i) i.hasOwnProperty(t) && i[t].setDirty();
            }),
            (r.generateID = function (t, e, s) {
              if (((e = t + e), s))
                for (var i in s) s.hasOwnProperty(i) && (e += s[i]);
              return e;
            }),
            (r.register = function (t, e) {
              s[t] = e;
            }),
            (r.clear = function () {}),
            (window.GameInventoryManager = new e()),
            (t.exports = e);
        },
        301: (t, e, s) => {
          var i = (s(430).Z, Math.round),
            n = Math.floor,
            r = Math.ceil,
            o = Math.pow;
          t.exports = function (t, e, s, a, h) {
            var l = [],
              c = t,
              u = e,
              d = (a - e) / (s - t),
              p = s > t ? 1 : -1,
              f = a > e ? 1 : -1,
              g = 0;
            l.push(t, e);
            do {
              var m = n(c / h) == n(s / h),
                v = n(u / h) == n(a / h);
              if (m && v) break;
              var y,
                w = 0;
              (w = i(n(c / h + p) * h)),
                0 > p && (w = i(r((c + 1) / h + p) * h) - 1),
                (y = i(e + (w - t) * d));
              var x,
                b = 0;
              (b = i(n(u / h + f) * h)),
                0 > f && (b = i(r((u + 1) / h + f) * h) - 1),
                (x = i(t + (b - e) / d)),
                o(w - t, 2) + o(y - e, 2) < o(x - t, 2) + o(b - e, 2)
                  ? ((c = w), (u = y), l.push(w, y))
                  : ((c = x), (u = b), l.push(x, b));
            } while (g++ < 5e3);
            return l;
          };
        },
        430: (t, e, s) => {
          "use strict";
          s.d(e, { Z: () => h });
          const i = Math.sqrt,
            n = Math.pow,
            r = Math.atan2,
            o = Math.PI;
          class a {
            constructor(t = 0, e = 0) {
              (this.x = t), (this.y = e);
            }
            toReal(t) {
              const e =
                  (this.x - t.screen.center.x) / t.camera.zoom +
                  t.camera.position.x,
                s =
                  (this.y - t.screen.center.y) / t.camera.zoom +
                  t.camera.position.y;
              return new a(e, s);
            }
            toRealSnapped(t) {
              const e = t.camera.position
                  .factor(t.camera.zoom)
                  .sub(t.screen.center),
                s = (this.x - Math.floor(-e.x)) / t.camera.zoom,
                i = (this.y - Math.floor(-e.y)) / t.camera.zoom;
              return new a(s, i);
            }
            toScreen(t) {
              const e = t.camera,
                s = t.screen,
                i = (this.x - e.position.x) * e.zoom + s.center.x,
                n = (this.y - e.position.y) * e.zoom + s.center.y;
              return new a(i, n);
            }
            toScreenSnapped(t) {
              const e = t.camera.position
                  .factor(t.camera.zoom)
                  .sub(t.screen.center),
                s = this.x * t.camera.zoom + Math.floor(-e.x),
                i = this.y * t.camera.zoom + Math.floor(-e.y);
              return new a(s, i);
            }
            lenSqr() {
              return n(this.x, 2) + n(this.y, 2);
            }
            len() {
              return i(n(this.x, 2) + n(this.y, 2));
            }
            dot(t) {
              return this.x * t.x + this.y * t.y;
            }
            factor(t) {
              return new a(this.x * t, this.y * t);
            }
            factorSelf(t) {
              (this.x = this.x * t), (this.y = this.y * t);
            }
            factorOut(t, e) {
              (e.x = this.x * t), (e.y = this.y * t);
            }
            add(t) {
              return new a(this.x + t.x, this.y + t.y);
            }
            inc(t) {
              (this.x += t.x), (this.y += t.y);
            }
            addOut(t, e) {
              (e.x = this.x + t.x), (e.y = this.y + t.y);
            }
            sub(t) {
              return new a(this.x - t.x, this.y - t.y);
            }
            subOut(t, e) {
              (e.x = this.x - t.x), (e.y = this.y - t.y);
            }
            subSelf(t) {
              (this.x = this.x - t.x), (this.y = this.y - t.y);
            }
            equ(t) {
              (this.x = t.x), (this.y = t.y);
            }
            normalize(t = 1) {
              return this.factor(t / this.len());
            }
            getAngleInDegrees(t) {
              let e = this.getAngleInRadians(t) * (180 / o);
              return e < 0 && (e += 360), e;
            }
            getAngleInRadians(t) {
              return r(t.x - this.x, -t.y + this.y);
            }
            cross(t) {
              return this.x * t.y - this.y * t.x;
            }
            clone() {
              return new a(this.x, this.y);
            }
            toArray() {
              return [this.x, this.y];
            }
          }
          const h = a;
        },
        285: (t) => {
          var e = Math.abs,
            s = Math.atan2,
            i = Math.PI;
          t.exports = function (t, n, r) {
            function o(t, n, r, a, h, l, c) {
              if (!(c > g)) {
                var u = (t + r) / 2,
                  d = (n + a) / 2,
                  w = (r + h) / 2,
                  x = (a + l) / 2,
                  b = (u + w) / 2,
                  _ = (d + x) / 2,
                  T = h - t,
                  C = l - n,
                  k = e((r - h) * C - (a - l) * T);
                if (k > m) {
                  if (f * (T * T + C * C) >= k * k) {
                    if (y > v) return void p.push(b, _);
                    var S = e(s(l - a, h - r) - s(a - n, r - t));
                    if ((S >= i && (S = 2 * i - S), v > S))
                      return void p.push(b, _);
                  }
                } else if (
                  f >=
                  (T = b - (t + h) / 2) * T + (C = _ - (n + l) / 2) * C
                )
                  return void p.push(b, _);
                o(t, n, u, d, b, _, c + 1), o(b, _, w, x, h, l, c + 1);
              }
            }
            var a = t.x,
              h = t.y,
              l = n.x,
              c = n.y,
              u = r.x,
              d = r.y,
              p = [],
              f = 0.25,
              g = 10,
              m = 1e-30,
              v = 0,
              y = 0.01;
            return (
              (function (t, e, s, i, n, r) {
                p.push(t, e), o(t, e, s, i, n, r, 0), p.push(n, r);
              })(a, h, l, c, u, d),
              p
            );
          };
        },
        831: (t, e, s) => {
          "use strict";
          s.d(e, { Z: () => o });
          var i = s(430);
          const n = Math.sqrt,
            r = Math.pow,
            o = class {
              constructor(t, e, s, n) {
                (this.p1 = new i.Z(t, e)),
                  (this.p2 = new i.Z(s, n)),
                  (this.pp = this.p2.sub(this.p1)),
                  (this.len = this.pp.len()),
                  (this.sectors = []),
                  (this.collided = !1),
                  (this.remove = 0),
                  (this.highlight = !1),
                  (this.recorded = !1);
              }
              getCode(t) {
                this.recorded = !0;
                let e =
                  " " + this.p2.x.toString(32) + " " + this.p2.y.toString(32);
                const s = this.checkForConnectedLine(t, this.p2);
                return s && (e += s.getCode(t)), e;
              }
              checkForConnectedLine(t, e) {
                const s = t.physicsLines.indexOf(this);
                if (s + 1 === t.physicsLines.length) return !1;
                const i = t.physicsLines[s + 1];
                return i.p1.x === e.x && i.p1.y === e.y && 0 === i.remove && i;
              }
              addSectorReference(t) {
                this.sectors.push(t);
              }
              erase(t, e) {
                let s = !1;
                if (
                  (this.sectors[0].scene.game.mod.getVar("accurateEraser") && e++,
                  0 === this.remove)
                ) {
                  const i = this.p1,
                    r = this.pp,
                    o = i.sub(t),
                    a = r.dot(r),
                    h = 2 * o.dot(r);
                  let l = h * h - 4 * a * (o.dot(o) - e * e);
                  if (l > 0) {
                    l = n(l);
                    const t = (-h - l) / (2 * a),
                      e = (-h + l) / (2 * a);
                    ((t >= 0 && 1 >= t) || (e >= 0 && 1 >= e)) && (s = !0);
                  }
                  (this.intersects(this.p1.x, this.p1.y, t.x, t.y, e) ||
                    this.intersects(this.p2.x, this.p2.y, t.x, t.y, e)) &&
                    (s = !0),
                    s && ((this.remove = 1), this.redrawSectors());
                }
                return s;
              }
              redrawSectors() {
                for (const t of this.sectors) t.drawn = !1;
              }
              markSectorsDirty() {
                for (const t of this.sectors) t.dirty = !1;
              }
              intersects(t, e, s, i, n) {
                const r = t - s,
                  o = e - i;
                return n * n >= r * r + o * o;
              }
              collide(t) {
                if (!this.collided) {
                  this.collided = !0;
                  const e = t.pos,
                    s = t.vel,
                    i = t.radius,
                    o = this.p1,
                    a = this.p2,
                    h = e.x - o.x,
                    l = e.y - o.y,
                    c = this.pp,
                    u = this.len,
                    d = (h * c.x + l * c.y) / u / u;
                  if (d >= 0 && d <= 1) {
                    const o =
                        (h * c.y - l * c.x) *
                          ((h - s.x) * c.y - (l - s.y) * c.x) <
                        0
                          ? -1
                          : 1,
                      a = h - c.x * d,
                      u = l - c.y * d;
                    let p = n(r(a, 2) + r(u, 2));
                    if ((0 === p && (p = 1), i > p || -1 === o)) {
                      const s = (i * o - p) / p;
                      return (
                        (e.x += a * s),
                        (e.y += u * s),
                        void t.drive(-u / p, a / p)
                      );
                    }
                  }
                  if (!(-i > d * u || d * u > u + i)) {
                    const s = d > 0 ? a : o,
                      h = e.x - s.x,
                      l = e.y - s.y;
                    let c = n(r(h, 2) + r(l, 2));
                    if ((0 === c && (c = 1), i > c)) {
                      const s = (i - c) / c;
                      return (
                        (e.x += h * s),
                        (e.y += l * s),
                        void t.drive(-l / c, h / c)
                      );
                    }
                  }
                }
              }
            };
        },
        578: (t, e, s) => {
          "use strict";
          s.d(e, { Z: () => a });
          var i = s(430);
          const n = Math.sqrt,
            r = Math.floor;
          class o {
            constructor(t, e, s, n) {
              (this.p1 = new i.Z(t, e)),
                (this.p2 = new i.Z(s, n)),
                (this.pp = this.p2.sub(this.p1)),
                (this.len = this.pp.len()),
                (this.sectors = []);
            }
            getCode(t) {
              this.recorded = !0;
              let e = " " + this.p2.x.toString(32) + " " + this.p2.y.toString(32);
              const s = this.checkForConnectedLine(t, this.p2);
              return s && (e += s.getCode(t)), e;
            }
            checkForConnectedLine(t, e) {
              const s = t.settings.drawSectorSize,
                i = t.sectors.drawSectors,
                n = r(e.x / s),
                o = r(e.y / s);
              return i[n][o].searchForLine("sceneryLines", e);
            }
            erase(t, e) {
              let s = !1;
              if (
                (this.sectors[0].scene.game.mod.getVar("accurateEraser") && e++,
                0 === this.remove)
              ) {
                const i = this.p1,
                  r = this.pp,
                  o = i.sub(t),
                  a = r.dot(r),
                  h = 2 * o.dot(r);
                let l = h * h - 4 * a * (o.dot(o) - e * e);
                if (l > 0) {
                  l = n(l);
                  const t = (-h - l) / (2 * a),
                    e = (-h + l) / (2 * a);
                  ((t >= 0 && 1 >= t) || (e >= 0 && 1 >= e)) && (s = !0);
                }
                (this.intersects(this.p1.x, this.p1.y, t.x, t.y, e) ||
                  this.intersects(this.p2.x, this.p2.y, t.x, t.y, e)) &&
                  (s = !0),
                  s && ((this.remove = 1), this.redrawSectors());
              }
              return s;
            }
            redrawSectors() {
              for (const t of this.sectors) t.drawn = !1;
            }
            markSectorsDirty() {
              for (const t of this.sectors) t.dirty = !1;
            }
            intersects(t, e, s, i, n) {
              const r = t - s,
                o = e - i;
              return n * n >= r * r + o * o;
            }
            addSectorReference(t) {
              this.sectors.push(t);
            }
          }
          (o.prototype.sectors = null),
            (o.prototype.p1 = null),
            (o.prototype.p2 = null),
            (o.prototype.pp = null),
            (o.prototype.len = 0),
            (o.prototype.collided = !1),
            (o.prototype.remove = 0),
            (o.prototype.recorded = !1);
          const a = o;
        },
        580: (t, e, s) => {
          var i = s(430).Z,
            n = s(348).Z,
            r = s(783),
            o = s(831).Z,
            a = s(578).Z,
            h = Math.min,
            l = Math.max,
            c = Math.abs,
            u = function (t) {
              this.toolInit(t),
                (this.p1 = new i(0, 0)),
                (this.p2 = new i(0, 0)),
                (this.selectedElements = []),
                (this.dashOffset = 0);
            },
            d = (u.prototype = new n());
          (d.toolInit = d.init),
            (d.name = "Select"),
            (d.passive = !1),
            (d.active = !1),
            (d.p1 = null),
            (d.p2 = null),
            (d.selectedElements = []),
            (d.dashOffset = 0),
            (d.selectedSectors = []),
            (d.press = function () {
              var t = this.mouse.touch.real;
              (this.passive = !1),
                (this.active = !0),
                (this.p1.x = t.x),
                (this.p1.y = t.y),
                (this.p2.x = t.x),
                (this.p2.y = t.y);
            }),
            (d.hold = function () {
              var t = this.mouse.touch.real;
              (this.p2.x = t.x), (this.p2.y = t.y);
            }),
            (d.unselectElements = function () {
              for (
                var t = this.selectedElements, e = t.length, s = 0;
                e > s;
                s++
              ) {
                var i = t[s];
                i instanceof o && i.highlightLine(!1),
                  i instanceof a && i.highlightLine(!1);
              }
            }),
            (d.release = function () {
              this.unselectElements();
              for (
                var t =
                    (performance.now(),
                    this.scene.track.select(this.p1, this.p2)),
                  e = t.length,
                  s = [],
                  i = 0;
                e > i;
                i++
              ) {
                var n = t[i];
                this.intersectsLine(n.p1, n.p2) &&
                  (n.removeAllReferences(), s.push(n));
              }
              (this.selectedElements = s),
                (this.active = !1),
                (this.passive = !0);
            }),
            (d.buildPaths = function (t) {
              for (var e = []; t.length > 0; ) {
                var s = new r();
                s.build(t), e.push(s);
              }
            }),
            (d.intersectsLine = function (t, e) {
              var s = h(this.p1.y, this.p2.y),
                i = h(this.p1.x, this.p2.x),
                n = l(this.p1.y, this.p2.y),
                r = l(this.p1.x, this.p2.x),
                o = c(r - i),
                a = c(s - n),
                u = t.x,
                d = e.x;
              if (
                (t.x > e.x && ((u = e.x), (d = t.x)),
                d > i + o && (d = i + o),
                i > u && (u = i),
                u > d)
              )
                return !1;
              var p = t.y,
                f = e.y,
                g = e.x - t.x;
              if (c(g) > 1e-7) {
                var m = (e.y - t.y) / g,
                  v = t.y - m * t.x;
                (p = m * u + v), (f = m * d + v);
              }
              if (p > f) {
                var y = f;
                (f = p), (p = y);
              }
              return f > s + a && (f = s + a), s > p && (p = s), !(p > f);
            }),
            (d.toScreen = function (t, e) {
              var s = this.scene.camera,
                i = this.scene.screen;
              return (t - s.position[e]) * s.zoom + i.center[e];
            }),
            (d.draw = function () {
              var t = this.scene,
                e = (t.game.canvas, t.game.canvas.getContext("2d"));
              if ((this.drawText(e), this.active || this.passive)) {
                var s = this.p1.toScreen(this.scene),
                  i = this.p2.toScreen(this.scene),
                  n = i.x - s.x,
                  r = i.y - s.y;
                e.save(),
                  e.setLineDash &&
                    (e.setLineDash([6]), (e.lineDashOffset = this.dashOffset)),
                  this.active
                    ? (e.beginPath(),
                      e.rect(s.x, s.y, n, r),
                      (e.fillStyle = "rgba(24, 132, 207, 0.3)"),
                      e.fill(),
                      (e.lineWidth = 2),
                      (e.strokeStyle = "rgba(24, 132, 207, 0.7)"),
                      e.stroke())
                    : this.passive &&
                      ((e.strokeStyle = "rgba(24, 132, 207, 0.7)"),
                      (e.lineWidth = 2),
                      e.strokeRect(s.x, s.y, n, r)),
                  e.restore(),
                  this.dashOffset > 22 && (this.dashOffset = 0),
                  this.dashOffset++;
              }
            }),
            (d.reset = function () {
              (this.p1.x = 0),
                (this.p1.y = 0),
                (this.p2.x = 0),
                (this.p2.y = 0),
                (this.active = !1),
                (this.passive = !1),
                this.unselectElements();
            }),
            (d.drawSectors = function () {
              for (
                var t = this.scene,
                  e = t.camera,
                  s = t.screen,
                  i = t.game.canvas.getContext("2d"),
                  n = e.zoom,
                  r = e.position,
                  o = t.screen.center,
                  a = this.settings.drawSectorSize * n,
                  h = (r.x * n) / a,
                  l = (r.y * n) / a,
                  c = s.width / a,
                  u = s.height / a / 2,
                  d = c / 2,
                  p = h - d - 1,
                  f = l - u - 1,
                  g = h + d,
                  m = l + u,
                  v = this.totalSectors,
                  y = v.length,
                  w = 0;
                y > w;
                w++
              ) {
                var x = v[w],
                  b = x.row,
                  _ = x.column;
                if (_ >= p && g >= _ && b >= f && m >= b) {
                  !1 === x.drawn && !1 === x.image && x.draw();
                  var T = _ * a - h * a + o.x,
                    C = b * a - l * a + o.y;
                  (T |= 0),
                    (C |= 0),
                    x.image
                      ? i.drawImage(x.image, T, C)
                      : i.drawImage(x.canvas, T, C);
                } else x.drawn && x.clear();
              }
            }),
            (d.drawText = function (t) {
              var e = this.name,
                s = this.game.pixelRatio;
              this.scene.game.canvas,
                this.radius,
                t.save(),
                (t.fillStyle = "#000000"),
                (t.font = 12 * s + "pt arial"),
                t.fillText(e, 10 * s, 20 * s),
                (t.font = 8 * s + "pt arial");
            }),
            (d.close = function () {
              (this.dashOffset = 0),
                (this.selectedElements = []),
                (this.mouse = null),
                (this.camera = null),
                (this.scene = null),
                (this.toolHandler = null),
                (this.p2 = null),
                (this.p1 = null),
                (this.active = !1),
                (this.passive = !1);
            }),
            (t.exports = u);
        },
        348: (t, e, s) => {
          "use strict";
          s.d(e, { Z: () => r });
          class i {
            constructor() {}
            init(t) {
              (this.toolHandler = t),
                (this.scene = t.scene),
                (this.game = t.scene.game),
                (this.camera = t.camera),
                (this.mouse = t.mouse),
                (this.gamepad = t.gamepad);
            }
            press() {}
            hold() {}
            release() {}
            update() {
              const t = this.mouse,
                e = t.touch,
                s = t.secondaryTouch,
                i = this.toolHandler.gamepad,
                n = this.toolHandler.options;
              let r = i.isButtonDown("shift") && !i.isButtonDown("ctrl");
              n.rightClickMove && (r = s.old.down),
                r
                  ? (e.old.down || n.rightClickMove) && this.moveCamera()
                  : (e.press && this.press(), e.old.down && this.hold()),
                e.release && this.release(),
                t.mousewheel &&
                  !i.isButtonDown("shift") &&
                  this.mousewheel(t.mousewheel);
            }
            moveCamera() {
              const t = this.mouse.secondaryTouch,
                e = this.camera,
                s = t.old.pos.sub(t.pos).factor(1 / e.zoom);
              e.position.inc(s);
            }
            draw() {}
            reset() {}
            mousewheel(t) {
              const e = this.scene.settings,
                s = this.scene.game.pixelRatio,
                i = e.cameraSensitivity,
                n = e.cameraZoomMin,
                r = e.cameraZoomMax,
                o = this.camera,
                a = this.mouse.touch,
                h = o.desiredZoom + t * i;
              o.setZoom(h / s, a.pos),
                o.desiredZoom < n * s
                  ? o.setZoom(n, a.pos)
                  : o.desiredZoom > r * s && o.setZoom(r, a.pos);
            }
            checkKeys() {
              const t = this.gamepad,
                e = this.name.toLowerCase();
              t.isButtonDown(e) &&
                (this.toolHandler.setTool(e), t.setButtonUp(e));
            }
            getOptions() {
              return {};
            }
            close() {}
          }
          const n = i.prototype;
          (n.name = ""),
            (n.toolHandler = null),
            (n.camera = null),
            (n.mouse = null),
            (n.scene = null);
          const r = i;
        },
        648: (t) => {
          function e(t) {
            (this.scene = t),
              (this.settings = t.settings),
              this.build_interface();
          }
          var s = e.prototype;
          (s.scene = null),
            (s.container = null),
            (s.cached = !1),
            (s.build_interface = function () {
              this.sprite_sheet = this.create_sprite_sheet();
              var t = this.scene.game.pixelRatio,
                e = new createjs.Container(),
                s = "helsinki",
                i = this.settings.campaignData.goals,
                n = i.third,
                r = new createjs.Container(),
                o = this.get_sprite("bronze_medal"),
                a =
                  ((n = new createjs.Text(n, "30px " + s, "#000000")), i.second),
                h = new createjs.Container(),
                l = this.get_sprite("silver_medal"),
                c = ((a = new createjs.Text(a, "30px " + s, "#000000")), i.first),
                u = new createjs.Container(),
                d = this.get_sprite("gold_medal"),
                p = ((c = new createjs.Text(c, "30px " + s, "#000000")), t / 2.5);
              "phone" === this.settings.controls && (p = t / 2.5),
                (o.y = 7),
                (o.x = 16),
                (n.x = 69),
                (n.y = 14),
                (l.y = 7),
                (l.x = 175),
                (a.x = 229),
                (a.y = 14),
                (d.y = 7),
                (d.x = 350),
                (c.y = 14),
                (c.x = 400),
                r.addChild(o),
                r.addChild(n),
                h.addChild(l),
                h.addChild(a),
                u.addChild(d),
                u.addChild(c),
                (r.alpha = 0.4),
                (h.alpha = 0.4),
                (u.alpha = 0.4),
                e.addChild(r),
                e.addChild(h),
                e.addChild(u),
                (e.scaleX = e.scaleY = p),
                (e.y = 80 * p),
                (e.x = 0),
                (this.bronze_container = r),
                (this.silver_container = h),
                (this.gold_container = u),
                (this.container = e),
                this.scene.game.stage.addChild(e),
                this.update_state();
            }),
            (s.update_state = function () {
              switch (this.settings.campaignData.user.has_goal) {
                case 1:
                case "first":
                  this.gold_container.alpha = 1;
                case "second":
                case 2:
                  this.silver_container.alpha = 1;
                case "third":
                case 3:
                  this.bronze_container.alpha = 1;
              }
            }),
            (s.center_container = function () {
              var t = this.scene.screen,
                e = this.container,
                s = e.getBounds(),
                i = this.scene.game.pixelRatio;
              (e.x = t.width / 2 - (s.width / 2) * e.scaleY), (e.y = 40 * i);
            }),
            (s.update = function () {
              this.settings.mobile && this.center_container(),
                this.update_state();
            }),
            (s.create_sprite_sheet = function () {
              var t = {
                images: [this.scene.assets.getResult("campaign_icons")],
                frames: [
                  [548, 68, 44, 44],
                  [2, 68, 452, 56],
                  [502, 68, 44, 44],
                  [2, 2, 588, 64],
                  [456, 68, 44, 44],
                ],
                animations: {
                  bronze_medal: [0],
                  center_panel: [1],
                  silver_medal: [2],
                  left_panel: [3],
                  gold_medal: [4],
                },
              };
              return new createjs.SpriteSheet(t);
            }),
            (s.get_sprite = function (t) {
              var e = this.sprite_sheet,
                s = new createjs.Sprite(e, t);
              return s.stop(), s;
            }),
            (t.exports = e);
        },
        609: (t, e, s) => {
          "use strict";
          s.d(e, { Z: () => i });
          const i = function (t) {
            t = parseInt(t, 10);
            const e = Math.floor(t / 6e4);
            let s = (t - 6e4 * e) / 1e3;
            return (s = s.toFixed(2)), s < 10 && (s = "0" + s), e + ":" + s;
          };
        },
        874: (t, e, s) => {
          var i =
            (s(430).Z,
            Math.round,
            function (t) {
              (this.scene = t),
                (this.screen = t.screen),
                (this.context = t.game.canvas.getContext("2d")),
                (this.clockwise = !1),
                (this.settings = { radius: 10, color: "#1884cf" });
            });
          (i.prototype = {
            scene: null,
            clockwise: !1,
            context: null,
            screen: null,
            pixelRatio: 1,
            draw: function () {
              var t = this.context,
                e = this.screen,
                s = this.settings,
                i = this.scene.game.pixelRatio,
                n = s.radius,
                r = this.clockwise,
                o = ((this.scene.game.tickCount % 25) / 25) * 2 * Math.PI;
              0 === o &&
                (this.clockwise && (o = 2 * Math.PI),
                (this.clockwise = !this.clockwise));
              var a = r ? 0 : o,
                h = r ? o : 0,
                l = e.width - 25 * i,
                c = e.height - 25 * i;
              t.beginPath(),
                t.arc(l, c, n * i, a, h, !1),
                (t.lineWidth = 3 * i),
                (t.strokeStyle = s.color),
                t.stroke();
            },
          }),
            (t.exports = i);
        },
        909: (t) => {
          function e(t) {
            (this.scene = t),
              (this.message = !1),
              (this.timeout = !1),
              (this.color = "#000");
          }
          var s = e.prototype;
          (s.message = null),
            (s.timeout = null),
            (s.draw = function () {
              var t = this.message,
                e = this.timeout,
                s = this.color,
                i = this.outline;
              if (
                (!1 !== e && 0 >= e && (t = !1),
                this.scene.state.paused &&
                  ((s = !1),
                  (i = !1),
                  (t = this.scene.settings.mobile
                    ? "Paused"
                    : "Paused - Press Spacebar to Continue")),
                !1 === s && (s = "#333333"),
                t)
              ) {
                var n = this.scene.game,
                  r = this.scene,
                  o = n.pixelRatio,
                  a = n.canvas.getContext("2d"),
                  h = r.screen.center.x,
                  l = 100;
                "phone" === r.settings.controls && (l = 80),
                  a.save(),
                  (a.fillStyle = s),
                  (a.lineWidth = (o / 2) * 4),
                  (a.font = 12 * o + "pt helsinki"),
                  (a.textAlign = "center"),
                  i &&
                    ((a.strokeStyle = i),
                    a.strokeText(t, h, l * o),
                    (a.strokeStyle = "#000")),
                  a.fillText(t, h, l * o),
                  a.restore();
              }
            }),
            (s.show = function (t, e, s, i) {
              (this.message = t),
                (this.timeout = e),
                (this.color = s),
                (this.outline = i);
            }),
            (s.hide = function () {
              (this.message = !1), (this.color = !1), (this.outline = !1);
            }),
            (s.update = function () {
              !1 !== this.timeout && this.timeout--;
            }),
            (t.exports = e);
        },
        783: (t) => {
          function e() {
            (this.start = null), (this.end = null), (this.verticies = []);
          }
          (e.prototype = {
            start: null,
            end: null,
            verticies: [],
            build: function (t) {
              var e = t.pop();
              (this.start = e.p1), (this.end = e.p2), this.verticies.push(e);
              for (var s = t.length - 1; s >= 0; s--) {
                var i = t[s],
                  n = i.p1,
                  r = i.p2;
                this.start.x === r.x && this.start.y === r.y
                  ? (this.verticies.unshift(i),
                    (this.start = i.p1),
                    t.splice(s, 1))
                  : this.end.x === n.x &&
                    this.end.y === n.y &&
                    (this.verticies.push(i), (this.end = i.p2), t.splice(s, 1));
              }
            },
          }),
            (t.exports = e);
        },
        425: (t, e, s) => {
          function i(t) {
            (this.scene = t),
              (this.maxRaces = this.scene.settings.mobile ? 3 : 10),
              this.createContainer();
          }
          var n = s(609).Z,
            r = i.prototype;
          (r.container = null),
            (r.raceList = []),
            (r.raceCount = 0),
            (r.highlightedRace = null),
            (r.raceOpacity = 0.3),
            (r.raceYOffset = 50),
            (r.mobileRaceXOffset = 180),
            (r.maxRaces = 10),
            (r.createContainer = function () {
              var t = this.scene.game,
                e = t.settings,
                s = t.pixelRatio / 2.5,
                i = new createjs.Container();
              (i.scaleX = i.scaleY = s),
                (i.y = 80 * s),
                (i.x = 15 * s),
                e.isCampaign && (i.y += 55 * s),
                (this.container = i),
                t.stage.addChild(i);
            }),
            (r.clear = function () {
              this.container.removeAllChildren(),
                (this.raceList = []),
                (this.raceCount = 0);
            }),
            (r.centerContainer = function () {
              var t = this.scene,
                e = t.screen,
                s = this.container,
                i = s.getBounds(),
                n = this.scene.game.pixelRatio;
              (s.x = e.width / 2 - (i.width / 2) * s.scaleY),
                t.settings.isCampaign && (s.visible = !1),
                (s.y = 40 * n);
            }),
            (r.addRace = function (t, e) {
              if (this.raceCount < this.maxRaces) {
                var s = this.scene,
                  i = (s.game.pixelRatio, t.user),
                  r = t.race,
                  o = s.settings,
                  a = o.drawFPS,
                  h = i.color,
                  l = "helsinki",
                  c = new createjs.Container(),
                  u = (s.camera, new createjs.Shape()),
                  d = u.graphics;
                d.setStrokeStyle(4, "round"),
                  d.beginFill(h).drawCircle(0, 0, 20),
                  (u.x = 25),
                  (u.y = 25);
                var p = n((parseInt(r.run_ticks) / a) * 1e3),
                  f = new createjs.Text(p, "30px " + l, "#000000");
                (f.x = 55), (f.y = 9);
                var g = new createjs.Text(
                  i.d_name.charAt(0),
                  "25px " + l,
                  "#000000"
                );
                (g.x = 17), (g.y = 33), (g.textBaseline = "alphabetic");
                var m = new createjs.Container();
                m.addChild(u),
                  m.addChild(g),
                  m.cache(0, 0, 50, 50),
                  m.removeAllChildren(),
                  c.addChild(m, f),
                  (c.alpha = this.raceOpacity),
                  o.mobile
                    ? (c.x = e * this.mobileRaceXOffset)
                    : ((c.x = -2), (c.y = e * this.raceYOffset)),
                  this.raceList.push(c),
                  this.container.addChild(c),
                  this.raceCount++;
              }
            }),
            (r.update = function () {
              if (this.raceCount > 0) {
                var t = this.scene.camera;
                t.focusIndex > 0 && t.focusIndex < this.maxRaces
                  ? this.highlightRace(t.focusIndex - 1)
                  : this.unhighlightRace(),
                  this.scene.settings.mobile && this.centerContainer();
              }
            }),
            (r.highlightRace = function (t) {
              if (this.highlightedRace !== this.raceList[t]) {
                this.unhighlightRace();
                var e = this.raceList[t];
                (e.alpha = 1), (this.highlightedRace = e);
              }
            }),
            (r.unhighlightRace = function () {
              this.highlightedRace &&
                ((this.highlightedRace.alpha = this.raceOpacity),
                (this.highlightedRace = null));
            }),
            (t.exports = i);
        },
        742: (t, e, s) => {
            function i(t) {
              (this.scene = t), (this.stage = t.game.stage), this.build_interface();
            }
            var n = s(609).Z,
              r = i.prototype;
            (r.container = null),
              (r.cached = !1),
              (r.scene = null),
              (r.state = null),
              (r.offset = { y: 0, x: 0 }),
              (r.build_interface = function () {
                var t = this.scene,
                  e = t.game.pixelRatio,
                  s = t.settings,
                  i = new createjs.Container(),
                  n = "helsinki",
                  r = new createjs.Text("00:00.00", "40px " + n, "#000000"),
                  o = new createjs.Text("TIME:", "20px " + n, "#999999"),
                  a = this.get_timer_sprite(),
                  h = new createjs.Text(" -- : --.--", "35px " + n, "#999999"),
                  l = new createjs.Text("BEST:", "20px " + n, "#999999"),
                  c = new createjs.Text("0/0", "40px " + n, "#000000"),
                  u = new createjs.Bitmap(t.assets.getResult("targets_icon")),
                  d = e / 2.5;
                s.mobile && (d = e / 2.5),
                  (o.y = 3),
                  (o.x = 59),
                  (h.x = 237),
                  (h.y = 21),
                  (l.x = 240),
                  (l.y = 3),
                  u.x = 12,
                  u.y = 5,
                  c.x = 90,
                  c.y = 20,
    
                  a.x = 12,
                  a.y = 88,
                  r.x = 90,
                  r.y = 100,
                  i.addChild(r),
                  i.addChild(a),
                  i.addChild(c),
                  i.addChild(u),
                  //i.addChild(o),
                  //i.addChild(h),
                  //i.addChild(l),
                  (i.scaleX = i.scaleY = d),
                  (i.y = (10 + this.offset.y) * d),
                  (i.x = 10 * d),
                  (this.best_time_title = l),
                  (this.time_title = o),
                  (this.container = i),
                  (this.time = r),
                  (this.goals = c),
                  (this.best_time = h),
                  this.stage.addChild(i);
              }),
              (r.update = function () {
                var t = this.scene,
                  e = t.ticks,
                  s = t.settings,
                  i = t.track,
                  r = t.playerManager.firstPlayer;
                !1 === this.cached &&
                  e > 50 &&
                  ((this.cached = !0), this.cache_fixed_text());
                var o = e / s.drawFPS;
                this.time.text = n(1e3 * o);
                var a = i.targetCount,
                  h = r.getTargetsHit();
                this.goals.text = h + "/" + a;
                var l = " -- : --.--";
                s.isCampaign && s.campaignData.user.best_time
                  ? (l = s.campaignData.user.best_time)
                  : s.userTrackStats &&
                    s.userTrackStats.best_time &&
                    (l = s.userTrackStats.best_time),
                  (this.best_time.text = l),
                  s.mobile && this.center_container();
              }),
              (r.center_container = function () {
                var t = this.container,
                  e = t.getBounds(),
                  s = this.scene.screen,
                  i = this.scene.game.pixelRatio;
                (t.x = s.width / 2 - (e.width / 2) * t.scaleY), (t.y = 10 * i);
              }),
              (r.cache_fixed_text = function () {
                var t,
                  e = this.best_time_title,
                  s = this.time_title;
                (t = e.getBounds()),
                  e.cache(t.x, t.y, t.width, t.height + 10),
                  (t = s.getBounds()),
                  s.cache(t.x, t.y, t.width, t.height + 10);
              }),
              (r.get_timer_sprite = function () {
                var t = {
                    images: [this.scene.assets.getResult("time_icon")],
                    frames: { width: 60, height: 60 },
                  },
                  e = new createjs.SpriteSheet(t);
                return new createjs.Sprite(e);
              }),
              (t.exports = i);
          },
        80: (t) => {
          var e =
            e ||
            (function (t, e) {
              var s = {},
                i = (s.lib = {}),
                n = function () {},
                r = (i.Base = {
                  extend: function (t) {
                    n.prototype = this;
                    var e = new n();
                    return (
                      t && e.mixIn(t),
                      e.hasOwnProperty("init") ||
                        (e.init = function () {
                          e.$super.init.apply(this, arguments);
                        }),
                      (e.init.prototype = e),
                      (e.$super = this),
                      e
                    );
                  },
                  create: function () {
                    var t = this.extend();
                    return t.init.apply(t, arguments), t;
                  },
                  init: function () {},
                  mixIn: function (t) {
                    for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                    t.hasOwnProperty("toString") && (this.toString = t.toString);
                  },
                  clone: function () {
                    return this.init.prototype.extend(this);
                  },
                }),
                o = (i.WordArray = r.extend({
                  init: function (t, e) {
                    (t = this.words = t || []),
                      (this.sigBytes = null != e ? e : 4 * t.length);
                  },
                  toString: function (t) {
                    return (t || h).stringify(this);
                  },
                  concat: function (t) {
                    var e = this.words,
                      s = t.words,
                      i = this.sigBytes;
                    if (((t = t.sigBytes), this.clamp(), i % 4))
                      for (var n = 0; t > n; n++)
                        e[(i + n) >>> 2] |=
                          ((s[n >>> 2] >>> (24 - (n % 4) * 8)) & 255) <<
                          (24 - ((i + n) % 4) * 8);
                    else if (65535 < s.length)
                      for (n = 0; t > n; n += 4) e[(i + n) >>> 2] = s[n >>> 2];
                    else e.push.apply(e, s);
                    return (this.sigBytes += t), this;
                  },
                  clamp: function () {
                    var e = this.words,
                      s = this.sigBytes;
                    (e[s >>> 2] &= 4294967295 << (32 - (s % 4) * 8)),
                      (e.length = t.ceil(s / 4));
                  },
                  clone: function () {
                    var t = r.clone.call(this);
                    return (t.words = this.words.slice(0)), t;
                  },
                  random: function (e) {
                    for (var s = [], i = 0; e > i; i += 4)
                      s.push((4294967296 * t.random()) | 0);
                    return new o.init(s, e);
                  },
                })),
                a = (s.enc = {}),
                h = (a.Hex = {
                  stringify: function (t) {
                    var e = t.words;
                    t = t.sigBytes;
                    for (var s = [], i = 0; t > i; i++) {
                      var n = (e[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                      s.push((n >>> 4).toString(16)),
                        s.push((15 & n).toString(16));
                    }
                    return s.join("");
                  },
                  parse: function (t) {
                    for (var e = t.length, s = [], i = 0; e > i; i += 2)
                      s[i >>> 3] |=
                        parseInt(t.substr(i, 2), 16) << (24 - (i % 8) * 4);
                    return new o.init(s, e / 2);
                  },
                }),
                l = (a.Latin1 = {
                  stringify: function (t) {
                    var e = t.words;
                    t = t.sigBytes;
                    for (var s = [], i = 0; t > i; i++)
                      s.push(
                        String.fromCharCode(
                          (e[i >>> 2] >>> (24 - (i % 4) * 8)) & 255
                        )
                      );
                    return s.join("");
                  },
                  parse: function (t) {
                    for (var e = t.length, s = [], i = 0; e > i; i++)
                      s[i >>> 2] |= (255 & t.charCodeAt(i)) << (24 - (i % 4) * 8);
                    return new o.init(s, e);
                  },
                }),
                c = (a.Utf8 = {
                  stringify: function (t) {
                    try {
                      return decodeURIComponent(escape(l.stringify(t)));
                    } catch (t) {
                      throw Error("Malformed UTF-8 data");
                    }
                  },
                  parse: function (t) {
                    return l.parse(unescape(encodeURIComponent(t)));
                  },
                }),
                u = (i.BufferedBlockAlgorithm = r.extend({
                  reset: function () {
                    (this._data = new o.init()), (this._nDataBytes = 0);
                  },
                  _append: function (t) {
                    "string" == typeof t && (t = c.parse(t)),
                      this._data.concat(t),
                      (this._nDataBytes += t.sigBytes);
                  },
                  _process: function (e) {
                    var s = this._data,
                      i = s.words,
                      n = s.sigBytes,
                      r = this.blockSize,
                      a = n / (4 * r);
                    if (
                      ((e =
                        (a = e
                          ? t.ceil(a)
                          : t.max((0 | a) - this._minBufferSize, 0)) * r),
                      (n = t.min(4 * e, n)),
                      e)
                    ) {
                      for (var h = 0; e > h; h += r) this._doProcessBlock(i, h);
                      (h = i.splice(0, e)), (s.sigBytes -= n);
                    }
                    return new o.init(h, n);
                  },
                  clone: function () {
                    var t = r.clone.call(this);
                    return (t._data = this._data.clone()), t;
                  },
                  _minBufferSize: 0,
                }));
              i.Hasher = u.extend({
                cfg: r.extend(),
                init: function (t) {
                  (this.cfg = this.cfg.extend(t)), this.reset();
                },
                reset: function () {
                  u.reset.call(this), this._doReset();
                },
                update: function (t) {
                  return this._append(t), this._process(), this;
                },
                finalize: function (t) {
                  return t && this._append(t), this._doFinalize();
                },
                blockSize: 16,
                _createHelper: function (t) {
                  return function (e, s) {
                    return new t.init(s).finalize(e);
                  };
                },
                _createHmacHelper: function (t) {
                  return function (e, s) {
                    return new d.HMAC.init(t, s).finalize(e);
                  };
                },
              });
              var d = (s.algo = {});
              return s;
            })(Math);
          !(function (t) {
            for (
              var s = e,
                i = (r = s.lib).WordArray,
                n = r.Hasher,
                r = s.algo,
                o = [],
                a = [],
                h = function (t) {
                  return (4294967296 * (t - (0 | t))) | 0;
                },
                l = 2,
                c = 0;
              64 > c;
  
            ) {
              var u;
              t: {
                u = l;
                for (var d = t.sqrt(u), p = 2; d >= p; p++)
                  if (!(u % p)) {
                    u = !1;
                    break t;
                  }
                u = !0;
              }
              u &&
                (8 > c && (o[c] = h(t.pow(l, 0.5))),
                (a[c] = h(t.pow(l, 1 / 3))),
                c++),
                l++;
            }
            var f = [];
            (r = r.SHA256 =
              n.extend({
                _doReset: function () {
                  this._hash = new i.init(o.slice(0));
                },
                _doProcessBlock: function (t, e) {
                  for (
                    var s = this._hash.words,
                      i = s[0],
                      n = s[1],
                      r = s[2],
                      o = s[3],
                      h = s[4],
                      l = s[5],
                      c = s[6],
                      u = s[7],
                      d = 0;
                    64 > d;
                    d++
                  ) {
                    if (16 > d) f[d] = 0 | t[e + d];
                    else {
                      var p = f[d - 15],
                        g = f[d - 2];
                      f[d] =
                        (((p << 25) | (p >>> 7)) ^
                          ((p << 14) | (p >>> 18)) ^
                          (p >>> 3)) +
                        f[d - 7] +
                        (((g << 15) | (g >>> 17)) ^
                          ((g << 13) | (g >>> 19)) ^
                          (g >>> 10)) +
                        f[d - 16];
                    }
                    (p =
                      u +
                      (((h << 26) | (h >>> 6)) ^
                        ((h << 21) | (h >>> 11)) ^
                        ((h << 7) | (h >>> 25))) +
                      ((h & l) ^ (~h & c)) +
                      a[d] +
                      f[d]),
                      (g =
                        (((i << 30) | (i >>> 2)) ^
                          ((i << 19) | (i >>> 13)) ^
                          ((i << 10) | (i >>> 22))) +
                        ((i & n) ^ (i & r) ^ (n & r))),
                      (u = c),
                      (c = l),
                      (l = h),
                      (h = (o + p) | 0),
                      (o = r),
                      (r = n),
                      (n = i),
                      (i = (p + g) | 0);
                  }
                  (s[0] = (s[0] + i) | 0),
                    (s[1] = (s[1] + n) | 0),
                    (s[2] = (s[2] + r) | 0),
                    (s[3] = (s[3] + o) | 0),
                    (s[4] = (s[4] + h) | 0),
                    (s[5] = (s[5] + l) | 0),
                    (s[6] = (s[6] + c) | 0),
                    (s[7] = (s[7] + u) | 0);
                },
                _doFinalize: function () {
                  var e = this._data,
                    s = e.words,
                    i = 8 * this._nDataBytes,
                    n = 8 * e.sigBytes;
                  return (
                    (s[n >>> 5] |= 128 << (24 - (n % 32))),
                    (s[14 + (((n + 64) >>> 9) << 4)] = t.floor(i / 4294967296)),
                    (s[15 + (((n + 64) >>> 9) << 4)] = i),
                    (e.sigBytes = 4 * s.length),
                    this._process(),
                    this._hash
                  );
                },
                clone: function () {
                  var t = n.clone.call(this);
                  return (t._hash = this._hash.clone()), t;
                },
              })),
              (s.SHA256 = n._createHelper(r)),
              (s.HmacSHA256 = n._createHmacHelper(r));
          })(Math),
            (t.exports = e);
        },
        546: (t) => {
          "use strict";
          var e =
            (Math.min,
            function (t) {
              (this.scene = t), (this.sounds = {});
            });
          (e.prototype = {
            sounds: null,
            update: function () {
              var t = createjs.Sound,
                e = this.scene,
                s = e.settings;
              t.setMute(!(!e.state.paused && !1 !== s.soundsEnabled));
            },
            setVolume: function (t, e) {
              this.sounds[t] && (this.sounds[t].volume = e);
            },
            muted: !1,
            mute_all: function () {
              var t = this.sounds;
              for (var e in t) t.hasOwnProperty(e) && (t[e].volume = 0);
              this.muted = !0;
            },
            stop_all: function () {
              var t = this.sounds;
              for (var e in t)
                t.hasOwnProperty(e) && ((t[e].volume = 0), t[e].stop());
            },
            play: function (t, e) {
              if ((null == e && (e = 1), this.sounds[t]))
                this.sounds[t].volume = e;
              else if (this.scene.settings.soundsEnabled) {
                var s = createjs.Sound.play(t, { volume: e }),
                  i = this;
                s.addEventListener("complete", function () {
                  i.sounds[t] = null;
                }),
                  (this.sounds[t] = s);
              }
            },
            stop: function (t) {
              this.sounds[t] && (this.sounds[t].stop(), (this.sounds[t] = null));
            },
            close: function () {
              this.sounds = null;
            },
          }),
            (t.exports = e);
        },
        939: (t, e, s) => {
          function i(t) {
            (this.scene = t),
              (this.settings = t.settings),
              (this.player = !1),
              this.build_interface(),
              this.createPulseTween();
          }
          var n = s(677),
            r = i.prototype;
          (r.scene = null),
            (r.container = null),
            (r.cached = !1),
            (r.build_interface = function () {
              var t = this.scene.game.pixelRatio,
                e = new createjs.Container(),
                s = new createjs.Shape();
              s.graphics
                .setStrokeStyle(5, "round")
                .beginStroke("rgba(242,144,66,1)")
                .beginFill("rgba(242,144,66,0.5)")
                .drawRoundRect(0, 0, 200, 60, 25);
              var i = new createjs.Text("00:00", "35px helsinki", "#000000");
              (i.textAlign = "center"),
                (i.textBaseline = "middle"),
                (i.x = 100),
                (i.y = 30),
                e.addChild(s),
                e.addChild(i),
                (e.visible = !1),
                (e.scaleX = e.scaleY = t / 2),
                (this.timeText = i),
                (this.container = e),
                this.scene.game.stage.addChild(e),
                this.center_container();
            }),
            (r.setPlayer = function (t) {
              this.player = t;
            }),
            (r.removePlayer = function () {
              this.player = !1;
            }),
            (r.playerAddedTime = function (t) {
              this.player === t && this.createPulseTween();
            }),
            (r.createPulseTween = function () {
              var t = this.container,
                e = this.scene.game.pixelRatio / 2,
                s = { scale: e },
                i = { scale: 1.2 * e };
              this.pulse = new n.Tween(s)
                .to(i, 200)
                .repeat(1)
                .yoyo(!0)
                .easing(n.Easing.Cubic.InOut)
                .onUpdate(function () {
                  t.scaleX = t.scaleY = this.scale;
                })
                .start();
            }),
            (r.center_container = function () {
              var t = this.scene.screen,
                e = this.container;
              (e.x = t.width / 2 - 100 * e.scaleX),
                (e.y = t.height - 100 * e.scaleY);
            }),
            (r.update = function () {
              n.update(),
                this.player && this.player._tempVehicleTicks > 0
                  ? (this.center_container(), this.updateTime())
                  : (this.container.visible = !1);
            }),
            (r.updateTime = function () {
              var t = (this.container, this.timeText),
                e =
                  (this.player,
                  this.player._tempVehicleTicks / this.scene.settings.drawFPS),
                s = "";
              10 > (e = e.toFixed(2)) && (s = "0"),
                (s += e),
                (t.text = s),
                (this.container.visible = !0);
            }),
            (r.close = function () {
              (this.container = null),
                (this.player = null),
                (this.scene = null),
                (this.settings = null),
                (this.timeText = null);
            }),
            (t.exports = i);
        },
      },
      e = {};
    function s(i) {
      var n = e[i];
      if (void 0 !== n) return n.exports;
      var r = (e[i] = { id: i, loaded: !1, exports: {} });
      return t[i].call(r.exports, r, r.exports, s), (r.loaded = !0), r.exports;
    }
    (s.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return s.d(e, { a: e }), e;
    }),
      (s.d = (t, e) => {
        for (var i in e)
          s.o(e, i) &&
            !s.o(t, i) &&
            Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
      }),
      (s.g = (function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (t) {
          if ("object" == typeof window) return window;
        }
      })()),
      (s.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (s.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (s.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
      (s.nc = void 0),
      (() => {
        "use strict";
        s(886), s(606);
        var t = s(430),
          e = s(981);
        class i {
          constructor() {
            (this._events = this._events || {}),
              (this._maxListeners = this._maxListeners || void 0);
          }
          setMaxListeners(t) {
            if ("number" != typeof t || 0 > t || isNaN(t))
              throw TypeError("n must be a positive number");
            return (this._maxListeners = t), this;
          }
          emit(t) {
            var e, s, i, a, h, l;
            if (
              (this._events || (this._events = {}),
              "error" === t &&
                (!this._events.error ||
                  (r(this._events.error) && !this._events.error.length)))
            ) {
              if ((e = arguments[1]) instanceof Error) throw e;
              throw TypeError('Uncaught, unspecified "error" event.');
            }
            if (o((s = this._events[t]))) return !1;
            if (n(s))
              switch (arguments.length) {
                case 1:
                  s.call(this);
                  break;
                case 2:
                  s.call(this, arguments[1]);
                  break;
                case 3:
                  s.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  for (
                    i = arguments.length, a = new Array(i - 1), h = 1;
                    i > h;
                    h++
                  )
                    a[h - 1] = arguments[h];
                  s.apply(this, a);
              }
            else if (r(s)) {
              for (i = arguments.length, a = new Array(i - 1), h = 1; i > h; h++)
                a[h - 1] = arguments[h];
              for (i = (l = s.slice()).length, h = 0; i > h; h++)
                l[h].apply(this, a);
            }
            return !0;
          }
          addListener(t, e) {
            var s;
            if (!n(e)) throw TypeError("listener must be a function");
            return (
              this._events || (this._events = {}),
              this._events.newListener &&
                this.emit("newListener", t, n(e.listener) ? e.listener : e),
              this._events[t]
                ? r(this._events[t])
                  ? this._events[t].push(e)
                  : (this._events[t] = [this._events[t], e])
                : (this._events[t] = e),
              r(this._events[t]) &&
                !this._events[t].warned &&
                (s = o(this._maxListeners)
                  ? i.defaultMaxListeners
                  : this._maxListeners) &&
                s > 0 &&
                this._events[t].length > s &&
                ((this._events[t].warned = !0),
                console.error(
                  "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                  this._events[t].length
                ),
                "function" == typeof console.trace && console.trace()),
              this
            );
          }
          once(t, e) {
            function s() {
              this.removeListener(t, s),
                i || ((i = !0), e.apply(this, arguments));
            }
            if (!n(e)) throw TypeError("listener must be a function");
            var i = !1;
            return (s.listener = e), this.on(t, s), this;
          }
          removeListener(t, e) {
            var s, i, o, a;
            if (!n(e)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (
              ((o = (s = this._events[t]).length),
              (i = -1),
              s === e || (n(s.listener) && s.listener === e))
            )
              delete this._events[t],
                this._events.removeListener && this.emit("removeListener", t, e);
            else if (r(s)) {
              for (a = o; a-- > 0; )
                if (s[a] === e || (s[a].listener && s[a].listener === e)) {
                  i = a;
                  break;
                }
              if (0 > i) return this;
              1 === s.length
                ? ((s.length = 0), delete this._events[t])
                : s.splice(i, 1),
                this._events.removeListener && this.emit("removeListener", t, e);
            }
            return this;
          }
          removeAllListeners(t) {
            var e, s;
            if (!this._events) return this;
            if (!this._events.removeListener)
              return (
                0 === arguments.length
                  ? (this._events = {})
                  : this._events[t] && delete this._events[t],
                this
              );
            if (0 === arguments.length) {
              for (e in this._events)
                "removeListener" !== e && this.removeAllListeners(e);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = {}),
                this
              );
            }
            if (n((s = this._events[t]))) this.removeListener(t, s);
            else for (; s.length; ) this.removeListener(t, s[s.length - 1]);
            return delete this._events[t], this;
          }
          listeners(t) {
            return this._events && this._events[t]
              ? n(this._events[t])
                ? [this._events[t]]
                : this._events[t].slice()
              : [];
          }
          static listenerCount(t, e) {
            return t._events && t._events[e]
              ? n(t._events[e])
                ? 1
                : t._events[e].length
              : 0;
          }
        }
        function n(t) {
          return "function" == typeof t;
        }
        function r(t) {
          return "object" == typeof t && null !== t;
        }
        function o(t) {
          return void 0 === t;
        }
        (i.prototype._events = void 0),
          (i.prototype._maxListeners = void 0),
          (i.prototype.on = i.prototype.addListener),
          (i.defaultMaxListeners = 10);
        const a = i,
          h = Math.round;
        class l extends a {
          constructor(t) {
            super(),
              (this.scene = t),
              (this.enabled = !0),
              (this.touch = this.getTouchObject()),
              (this.touch.old = this.getTouchObject()),
              (this.secondaryTouch = this.getTouchObject()),
              (this.secondaryTouch.old = this.getTouchObject()),
              this.initAnalytics(),
              this.bindToMouseEvents(),
              (this.updateCallback = !1);
          }
          contextMenuHandler(t) {
            return t.stopPropagation(), t.preventDefault(), !1;
          }
          initAnalytics() {
            this.analytics = { clicks: 0 };
          }
          getTouchObject() {
            return {
              id: null,
              down: !1,
              press: !1,
              release: !1,
              pos: new t.Z(0, 0),
              real: new t.Z(0, 0),
              type: 1,
            };
          }
          bindToMouseEvents() {
            const t = this.scene.game.stage,
              s = this.scene.game.canvas,
              i = this.onMouseMove.bind(this),
              n = this.onMouseDown.bind(this),
              r = this.onMouseUp.bind(this);
            t.addEventListener("stagemousemove", i),
              t.addEventListener("stagemousedown", n),
              t.addEventListener("stagemouseup", r),
              (this.mouseMoveListener = i),
              (this.mouseDownListener = n),
              (this.mouseUpListener = r);
            const o = (0, e.throttle)(this.onMouseWheel, 0);
            s.addEventListener("mousewheel", o.bind(this)),
              s.addEventListener("wheel", o.bind(this)),
              s.addEventListener("DOMMouseScroll", o.bind(this)),
              (this.mouseWheelListener = o);
          }
          onMouseDown(t) {
            this.analytics.clicks++,
              2 === t.nativeEvent.button
                ? this.secondaryTouch.down ||
                  (this.updatePosition(t, this.secondaryTouch),
                  (this.secondaryTouch.down = !0))
                : this.touch.down ||
                  (this.updatePosition(t, this.touch), (this.touch.down = !0));
          }
          disableContextMenu() {
            this.scene.game.canvas.oncontextmenu = function () {
              return !1;
            };
          }
          onMouseUp(t) {
            2 === t.nativeEvent.button
              ? this.secondaryTouch.down &&
                (this.updatePosition(t, this.secondaryTouch),
                (this.secondaryTouch.down = !1))
              : this.touch.down &&
                (this.updatePosition(t, this.touch), (this.touch.down = !1));
          }
          updatePosition(t, e) {
            (e.id = t.pointerID), (e.type = t.nativeEvent.button);
            const s = e.pos;
            (s.x = t.rawX), (s.y = t.rawY), this.updateRealPosition(e);
          }
          updateRealPosition(t) {
            const e = t.pos,
              s = t.real,
              i = this.scene,
              n = i.screen,
              r = i.camera,
              o = n.center,
              a = r.position,
              l = (e.x - o.x) / r.zoom + a.x,
              c = (e.y - o.y) / r.zoom + a.y;
  
            s.x = Math.round((t.pos.x - this.scene.screen.center.x) / this.scene.camera.zoom + this.scene.camera.position.x),
              s.y = Math.round((t.pos.y - this.scene.screen.center.y) / this.scene.camera.zoom + this.scene.camera.position.y);
  
            const u = this.scene.settings;
            const gridSize = u.toolHandler.gridSize;
            const isometricGridEnabled = u.toolHandler.isometricGrid;
  
            if (this.scene.toolHandler.options.grid && isometricGridEnabled) {
  
              let t = gridSize | 0;
              function c(t, z) {
                return ((t % z) + z) % z
              }
              let g = t / 2
                , adjusted = Math.round(s.x / t)
                , k = c(adjusted, 2);
              s.x = adjusted * t;
              s.y = s.y - c(s.y + g * (k + 1), t) - (g * (k - 1)) + (k * g);
            } else if (this.scene.toolHandler.options.grid && !isometricGridEnabled) {
              s.x = h(s.x / gridSize) * gridSize;
              s.y = h(s.y / gridSize) * gridSize;
            }
          }
          onMouseWheel(t) {
            return (
              (t = window.event || t).preventDefault(),
              t.stopPropagation(),
              (this.wheel = -Math.max(-1, Math.min(1, t.deltaY || -t.detail))),
              !1
            );
          }
          onMouseMove(t) {
            this.updatePosition(t, this.touch),
              this.updatePosition(t, this.secondaryTouch);
          }
          update() {
            this.enabled &&
              (this.updateTouch(this.touch),
              this.updateTouch(this.secondaryTouch),
              this.updateWheel());
          }
          updateTouch(t) {
            const e = t.old,
              s = t.pos,
              i = t.real,
              n = t.down;
            (e.pos.x = s.x),
              (e.pos.y = s.y),
              (e.real.x = i.x),
              (e.real.y = i.y),
              !e.down && n && (t.press = !0),
              e.down && !n && (t.release = !0),
              e.press && (t.press = !1),
              e.release && (t.release = !1),
              this.updateRealPosition(t),
              (e.down = t.down),
              (e.press = t.press),
              (e.release = t.release);
          }
          updateWheel() {
            (this.mousewheel = this.wheel), (this.wheel = !1);
          }
          close() {
            const t = this.scene.game.stage,
              e = this.scene.game.canvas;
            t.removeAllEventListeners(),
              e.removeEventListener("mousewheel", this.mouseWheelListener),
              e.removeEventListener("DOMMouseScroll", this.mouseWheelListener),
              (this.touches = null),
              (this.touch = null),
              (this.scene = null),
              (this.wheel = null),
              (this.mouseMoveListener = null),
              (this.mouseDownListener = null),
              (this.mouseUpListener = null);
          }
        }
        const c = l.prototype;
        (c.scene = null),
          (c.touch = null),
          (c.touches = []),
          (c.wheel = !1),
          (c.mousewheel = !1),
          (c.mouseMoveListener = null),
          (c.mouseUpListener = null),
          (c.mouseDownListener = null),
          (c.throttledMouseWheel = null),
          (c.analytics = null);
        const u = l,
          d = Math.round,
          p = Math.abs,
          f = Math.sqrt,
          g = Math.pow;
        class m {
          constructor(e) {
            const s = e.settings;
            (this.settings = s),
              (this.scene = e),
              (this.zoom = s.cameraStartZoom * e.game.pixelRatio),
              (this.desiredZoom = s.cameraStartZoom * e.game.pixelRatio),
              (this.zooming = !1),
              (this.position = new t.Z(0, 0)),
              (this.zoomPercentage = this.getZoomAsPercentage()),
              (this.zoomPoint = !1);
          }
          focusOnNextPlayer() {
            (this.focusIndex =
              (this.focusIndex + 1) % this.scene.playerManager.getPlayerCount()),
              this.focusOnPlayer();
          }
          focusOnPlayer() {
            const t = this.scene,
              e = t.playerManager;
            e.getPlayerCount() <= this.focusIndex && (this.focusIndex = 0);
            const s = e.getPlayerByIndex(this.focusIndex);
            if (this.playerFocus !== s) {
              const e = this.playerFocus;
              (this.playerFocus = s),
                t.vehicleTimer.setPlayer(s),
                e
                  ? s.getDistanceBetweenPlayers(e) > 1500 && this.fastforward()
                  : this.fastforward();
            }
          }
          focusOnMainPlayer() {
            (0 === this.focusIndex && this.playerFocus) ||
              ((this.focusIndex = 0), this.focusOnPlayer());
          }
          update() {
            if (this.playerFocus) {
              const t = this.playerFocus.getActiveVehicle().focalPoint,
                e = this.position;
              let s = 3;
              f(g(t.pos.x - e.x, 2) + g(t.pos.y - e.y, 2)) > 1500 && (s = 1);
              /*
                (e.x += (t.pos.x - e.x) / s),
                (e.y += (t.pos.y - e.y) / s);*/
  
                if (this.settings.cameraMovementHorizontal) {
                    e.x += (t.pos.x - e.x) / s;
                } else {
                    e.x = 0;
                }
  
                if (this.settings.cameraMovementVertical) {
                    e.y += (t.pos.y - e.y) / s;
                } else {
                    e.y = 0;
                }
            }
          }
          updateZoom() {
            this.zoom !== this.desiredZoom &&
              ((this.scene.loading = !0),
              this._performZoom(),
              this.zoom === this.desiredZoom && this.zoomComplete());
          }
          zoomToPoint(t) {
            const e = this.scene.screen,
              s = this.position,
              i = this.zoomPoint,
              n = e.toReal(i.x, "x"),
              r = e.toReal(i.y, "y"),
              o = i.x / e.width,
              a = i.y / e.height,
              h = e.width / t,
              l = e.height / t;
            (s.x = n - h * o + h / 2), (s.y = r - l * a + l / 2);
          }
          _performZoom() {
            let t = this.zoom;
            const e = this.desiredZoom,
              s = e - t;
            (t += s / 3),
              p(s) < 0.05 && (t = e),
              this.zoomPoint && this.zoomToPoint(t),
              (this.zoom = t);
          }
          zoomComplete() {
            this.scene.redraw(), (this.zooming = !1), (this.scene.loading = !1);
          }
          setZoom(t, e) {
            const s = this.scene;
            (this.desiredZoom = (d(10 * t) / 10) * s.game.pixelRatio),
              (this.zooming = !0),
              this.desiredZoom === this.zoom &&
                ((this.zooming = !1), (this.scene.state.loading = !1)),
              (this.zoomPoint = !1),
              null === this.playerFocus && e && (this.zoomPoint = e),
              (this.zoomPercentage = this.getZoomAsPercentage()),
              s.stateChanged();
          }
          resetZoom() {
            this.setZoom(this.settings.cameraStartZoom);
          }
          getZoomAsPercentage() {
            return Math.round(
              (this.desiredZoom /
                this.scene.game.pixelRatio /
                this.scene.settings.cameraStartZoom) *
                100
            );
          }
          increaseZoom() {
            const t = this.scene.settings,
              e = this.scene.game.pixelRatio,
              s = this.desiredZoom + 2 * t.cameraSensitivity * e,
              i = t.cameraZoomMax;
            this.setZoom(s / e), this.desiredZoom > i * e && this.setZoom(i);
          }
          decreaseZoom() {
            const t = this.scene.settings,
              e = this.scene.game.pixelRatio,
              s = this.desiredZoom - 2 * t.cameraSensitivity * e,
              i = t.cameraZoomMin;
            this.setZoom(s / e), this.desiredZoom < i * e && this.setZoom(i);
          }
          unfocus() {
            (this.playerFocus = null), this.scene.vehicleTimer.removePlayer();
          }
          fastforward() {
            this.playerFocus &&
              this.position.equ(
                this.playerFocus.getActiveVehicle().focalPoint.pos
              );
          }
          close() {
            (this.zoom = null),
              (this.scene = null),
              (this.position = null),
              (this.playerFocus = null);
          }
        }
        const v = m.prototype;
        (v.settings = null),
          (v.scene = null),
          (v.zoom = 1),
          (v.position = null),
          (v.desiredZoom = 1),
          (v.zoomPercentage = 0),
          (v.focusIndex = 0),
          (v.playerFocus = null);
        const y = m;
        class w {
          constructor(e) {
            (this.scene = e),
              (this.game = e.game),
              (this.size = new t.Z(0, 0)),
              (this.center = new t.Z(0, 0)),
              this.setScreen();
          }
          setScreen() {
            const t = this.game.width,
              e = this.game.height;
            (this.width = t),
              (this.height = e),
              (this.size.x = t),
              (this.size.y = e),
              (this.center.x = t / 2),
              (this.center.y = e / 2);
          }
          update() {
            const t = this.game;
            (t.width === this.width && t.height === this.height) ||
              this.setScreen();
          }
          realToScreen(t, e) {
            const s = this.scene,
              i = s.camera;
            return (t - i.position[e]) * i.zoom + s.screen.center[e];
          }
          toReal(t, e) {
            const s = this.scene,
              i = s.camera;
            return (t - s.screen.center[e]) / i.zoom + i.position[e];
          }
          close() {
            (this.width = null),
              (this.height = null),
              (this.center = null),
              (this.size = null),
              (this.game = null),
              (this.scene = null);
          }
        }
        const x = w.prototype;
        (x.game = null),
          (x.scene = null),
          (x.size = null),
          (x.center = null),
          (x.width = 0),
          (x.height = 0);
        const b = w;
        class _ {
          constructor(t) {
            (this.scene = t),
              (this.tickDownButtons = {}),
              (this.previousTickDownButtons = {}),
              (this.downButtons = {}),
              (this.keymap = {}),
              (this.records = {}),
              (this.numberOfKeysDown = 0),
              (this.tickNumberOfKeysDown = 0);
          }
          listen() {
            (document.onkeydown = this.handleButtonDown.bind(this)),
              (document.onkeyup = this.handleButtonUp.bind(this)),
              (window.onblur = () => {
                this.downButtons = {};
              });
          }
          unlisten() {
            (this.downButtons = {}),
              (document.onkeydown = function () {}),
              (document.onkeyup = function () {}),
              (window.onblur = () => {});
          }
          semiUnlisten() {
            (document.onkeydown = ((t) => {
              this.handleButtonDown(t, !0);
            }).bind(this)),
              (document.onkeyup = this.handleButtonUp.bind(this));
          }
          pause() {
            this.paused = !0;
          }
          unpause() {
            this.paused = !1;
          }
          recordKeys(t) {
            (this.keysToRecord = t), (this.recording = !0);
          }
          loadPlayback(t, e) {
            (this.keysToPlay = e), (this.playback = t), (this.replaying = !0);
          }
          setKeyMap(t) {
            const e = {};
            for (const s in t)
              if (t[s] instanceof Array) for (const i in t[s]) e[t[s][i]] = s;
              else e[t[s]] = s;
            this.keymap = e;
          }
          handleButtonDown(t, e = !1) {
            const s = this.getInternalCode(t.keyCode);
            "string" != typeof s || e || t.preventDefault(),
              e
                ? "INPUT" === document.activeElement.tagName ||
                  ("string" != typeof s && 16 !== s) ||
                  (t.preventDefault(), this.setButtonDown(s))
                : this.setButtonDown(s);
          }
          handleButtonUp(t) {
            const e = this.getInternalCode(t.keyCode);
            "string" == typeof e && t.preventDefault(), this.setButtonUp(e);
          }
          getInternalCode(t) {
            return this.keymap[t] || t;
          }
          setButtonsDown(t) {
            for (const e of t) this.setButtonDown(e);
          }
          setButtonUp(t) {
            this.downButtons[t] &&
              (this.onButtonUp && this.onButtonUp(t),
              (this.downButtons[t] = !1),
              this.numberOfKeysDown--);
          }
          setButtonDown(t, e) {
            this.downButtons[t] ||
              (this.onButtonDown && this.onButtonDown(t),
              (this.downButtons[t] = e || !0),
              this.numberOfKeysDown++);
          }
          isButtonDown(t) {
            let e = !1;
            const s = this.tickDownButtons[t];
            return (s > 0 || 1 === s) && (e = !0), e;
          }
          getButtonDownOccurances(t) {
            let e = 0;
            if (this.isButtonDown(t)) {
              e = 1;
              const s = this.tickDownButtons[t];
              !0 !== s && (e = s);
            }
            return e;
          }
          getDownButtons() {
            const t = [];
            for (const e in this.tickDownButtons)
              this.tickDownButtons[e] && t.push(e);
            return t;
          }
          reset(t) {
            (this.replaying || t) && (this.downButtons = {}),
              (this.tickDownButtons = {}),
              (this.previousTickDownButtons = {}),
              (this.records = {});
          }
          update() {
            this.scene,
              this.replaying && this.updatePlayback(),
              (this.previousTickDownButtons = (0, e.merge)(
                {},
                this.tickDownButtons
              )),
              (this.tickDownButtons = (0, e.merge)({}, this.downButtons)),
              (this.tickNumberOfKeysDown = this.numberOfKeysDown),
              this.recording && this.updateRecording();
          }
          areKeysDown() {
            for (const t in this.downButtons)
              if (!0 === this.downButtons[t]) return !0;
            return !1;
          }
          updatePlayback() {
            const t = this.playback,
              e = this.scene.ticks;
            for (const s of this.keysToPlay) {
              const i = s + "_up",
                n = s + "_down";
              void 0 !== t[n] &&
                void 0 !== t[n][e] &&
                this.setButtonDown(s, t[n][e]),
                void 0 !== t[i] && void 0 !== t[i][e] && this.setButtonUp(s);
            }
          }
          updateRecording() {
            let t = this.scene.ticks;
            const e = this.records,
              s = this.tickDownButtons,
              i = this.previousTickDownButtons;
            for (const n of this.keysToRecord)
              if (void 0 !== s[n]) {
                const r = s[n];
                if (r !== (i[n] || !1)) {
                  const s = n + "_down";
                  let i = n + "_up";
                  r && (i = s),
                    e[i] || (e[i] = []),
                    !r && e[s] && e[s].includes(t) && t++,
                    e[i].push(t);
                }
              }
          }
          buttonWasRecentlyDown(t) {
            let e = this.records;
            this.replaying && (e = this.playback);
            const s = t + "_down";
            let i = !1;
            if (e[s]) {
              const t = this.scene.ticks,
                n = e[s];
              let r = -1;
              (r = this.replaying ? void 0 !== n[t] : n.indexOf(t)),
                -1 !== r && (i = !0);
            }
            return i;
          }
          getReplayString() {
            return JSON.stringify(this.records);
          }
          encodeReplayString(t) {
            const e = { version: this.scene.settings.replayVersion };
            for (const s in t) {
              const i = t[s];
              e[s] = "";
              for (const t in i) {
                const n = i[t];
                e[s] += n.toString(32) + " ";
              }
            }
            return e;
          }
          clone() {
            const t = new _(this.scene),
              e = [
                "tickDownButtons",
                "previousTickDownButtons",
                "downButtons",
                "paused",
                "keymap",
                "records",
                "keysToRecord",
                "keysToPlay",
                "recording",
                "playback",
                "numberOfKeysDown",
                "tickNumberOfKeysDown",
                "replaying",
              ];
            for (const s of e) t[s] = this[s];
            return t;
          }
          close() {
            this.unlisten(),
              (this.handleButtonUp = null),
              (this.handleButtonDown = null),
              (this.onButtonDown = null),
              (this.onButtonUp = null),
              (this.scene = null),
              (this.tickDownButtons = null),
              (this.downButtons = null),
              (this.keymap = null),
              (this.records = null),
              (this.keysToRecord = null);
          }
        }
        const T = _.prototype;
        (T.tickDownButtons = null),
          (T.previousTickDownButtons = null),
          (T.downButtons = null),
          (T.paused = !1),
          (T.keymap = null),
          (T.records = null),
          (T.keysToRecord = null),
          (T.keysToPlay = null),
          (T.recording = !1),
          (T.playback = null),
          (T.numberOfKeysDown = 0),
          (T.tickNumberOfKeysDown = 0),
          (T.replaying = !1);
        const C = _;
        class k {
          constructor() {}
          init(e, s) {
            (this.pos = new t.Z()),
              (this.old = new t.Z()),
              (this.vel = new t.Z(0, 0)),
              (this.drawPos = new t.Z(0, 0)),
              (this.radius = 10),
              (this.friction = 0),
              (this.parent = s),
              (this.collide = !0),
              (this.contact = !1),
              (this.scene = s.scene),
              this.pos.equ(e),
              this.old.equ(e);
          }
          drive(t, e) {
            const s = -(t * this.vel.x + e * this.vel.y) * this.friction;
            (this.pos.x += t * s), (this.pos.y += e * s), (this.contact = !0);
          }
          update() {
            const t = this.vel,
              e = this.parent.gravity;
            t.inc(e),
              (0 === e.x && 0 === e.y) || t.factorSelf(0.99),
              this.pos.inc(this.vel),
              (this.contact = !1),
              this.collide && this.scene.track.collide(this),
              t.equ(this.pos.sub(this.old)),
              this.old.equ(this.pos);
          }
          draw() {
            const t = this.pos.toScreen(this.scene),
              e = this.scene.game.canvas.getContext("2d"),
              s = this.scene.camera.zoom;
            e.beginPath(),
              (e.fillStyle = "rgba(0,0,0,1)"),
              e.arc(t.x, t.y, this.radius * s, 0, 2 * Math.PI, !1),
              e.fill(),
              e.closePath();
          }
        }
        const S = k.prototype;
        (S.pos = null),
          (S.old = null),
          (S.vel = null),
          (S.parent = null),
          (S.radius = 0),
          (S.friction = 0),
          (S.collide = !1),
          (S.contact = !1),
          (S.scene = null),
          (S.drawPos = null);
        const A = k,
          P = Math.random,
          M = Math.cos,
          I = Math.sin,
          B = [1, 0.7, 0.8, 0.9, 0.5, 1, 0.7, 1];
        class D extends A {
          constructor(t, e, s) {
            super(),
              super.init(t, e),
              (this.color = s),
              (this.pos.x = t.x + 5 * (P() - P())),
              (this.pos.y = t.y + 5 * (P() - P())),
              (this.old.x = this.pos.x),
              (this.old.y = this.pos.y),
              (this.vel.y = 11 * (P() - P())),
              (this.vel.x = 11 * (P() - P())),
              (this.radius = 2 * P() * 5),
              (this.angle = 6.2 * P()),
              (this.speed = P() - P()),
              (this.friction = 0.05);
          }
          drive(t, e) {
            const s = this.vel,
              i = this.pos;
            (this.speed = (t * s.x + e * s.y) / this.radius),
              (this.angle += this.speed);
            const n = -(t * s.x + e * s.y) * this.friction;
            (i.x += t * n), (i.y += e * n);
            const r = -e,
              o = t,
              a = 0.8 * (r * s.x + o * s.y);
            (this.old.x += r * a), (this.old.y += o * a);
          }
          update() {
            (this.angle += this.speed), super.update();
          }
          draw() {
            const t = this.scene.screen,
              e = this.scene.camera,
              s = t.realToScreen(this.pos.x, "x"),
              i = t.realToScreen(this.pos.y, "y"),
              n = e.zoom,
              r = this.angle;
            let o = B[0] * n * this.radius,
              a = s + o * M(r),
              h = i + o * I(r);
            const l = this.scene.game.canvas.getContext("2d");
            (l.lineWidth = 1 * n),
              (l.strokeStyle = "#000000"),
              l.beginPath(),
              l.moveTo(a, h),
              (l.fillStyle = this.color);
            for (let t = 1; t < B.length; t++)
              (o = B[t - 1] * n * this.radius),
                (a = s + o * M(r + (6.283 * t) / 8)),
                (h = i + o * I(r + (6.283 * t) / 8)),
                l.lineTo(a, h);
            l.fill(), l.stroke();
          }
        }
        D.prototype.color = "black";
        const E = D,
          L = Math.random,
          z = Math.cos,
          O = Math.sin;
        class F {
          constructor(e, s) {
            (this.time = 20),
              (this.gravity = new t.Z(0, 0.3)),
              (this.scene = s),
              this.createMasses(e),
              (this.positionX = e.x),
              (this.positionY = e.y);
          }
          draw(t) {
            let e = this.time;
            const s = this.positionX,
              i = this.positionY,
              n = this.scene.camera.zoom,
              r = this.scene.screen,
              o = this.scene.game.canvas.getContext("2d");
            if (((o.globalAlpha = t), e > 0)) {
              e -= 10;
              const t = r.realToScreen(s, "x"),
                a = r.realToScreen(i, "y"),
                h = 6.2 * L();
              let l = e * n,
                c = t + l * z(h),
                u = a + l * O(h);
              (o.lineWidth = 0),
                (o.strokeStyle = "black"),
                o.beginPath(),
                o.moveTo(c, u),
                (o.fillStyle = "black");
              for (let s = 0; s < 16; s++)
                (l = (e + 30 * L()) * n),
                  (c = t + l * z(h + (6.283 * s) / 16)),
                  (u = a + l * O(h + (6.283 * s) / 16)),
                  o.lineTo(c, u);
              o.fill(), o.stroke();
            }
            for (const t of this.masses) t.draw();
            (o.globalAlpha = 1), (this.time = e);
          }
          createMasses(t) {
            (this.masses = []),
              this.masses.push(new E(t, this, "#000000")),
              this.masses.push(new E(t, this, "#000000")),
              this.masses.push(new E(t, this, "#000000")),
              this.masses.push(new E(t, this, "#000000")),
              this.masses.push(new E(t, this, "#000000")),
              this.masses.push(new E(t, this, "#000000")),
              this.masses.push(new E(t, this, "#000000"));
          }
          update() {
            for (const t of this.masses) t.update();
          }
        }
        const j = F.prototype;
        (j.complete = !1), (j.time = 0), (j.powerupsEnabled = !1);
        const R = F,
          W = class {
            constructor(t, e, s) {
              (this.offset = t.clone()),
                (this.xBasis = e.clone()),
                (this.yBasis = s.clone());
            }
            transform(e, s, i) {
              return (
                e instanceof t.Z && ((s = e.y), (e = e.x), (i = s)),
                (i = i || this.offset),
                new t.Z(
                  i.x + this.xBasis.x * e + this.yBasis.x * s,
                  i.y + this.xBasis.y * e + this.yBasis.y * s
                )
              );
            }
          };
        class V {
          constructor(t, e, s) {
            (this.m1 = t),
              (this.m2 = e),
              (this.parent = s),
              (this.lrest = 40),
              (this.leff = 40),
              (this.dampConstant = 0.5),
              (this.springConstant = 0.7);
          }
          swap() {
            const e = new t.Z(),
              s = this.m1,
              i = this.m2;
            e.equ(s.pos),
              s.pos.equ(i.pos),
              i.pos.equ(e),
              e.equ(s.old),
              s.old.equ(i.old),
              i.old.equ(e),
              e.equ(s.vel),
              s.vel.equ(i.vel),
              i.vel.equ(e);
            const n = s.angle;
            (s.angle = i.angle), (i.angle = n);
          }
          update() {
            const e = this.m1,
              s = this.m2,
              i = e.pos,
              n = s.pos,
              r = e.vel,
              o = s.vel;
            if (n.sub(i).len() >= 1) {
              const e = new t.Z(0, 0);
              (e.x = n.x - i.x), (e.y = n.y - i.y);
              const s = e.len();
              if (!(1 > s)) {
                const t = 1 / s;
                (e.x *= t), (e.y *= t);
                const i = (s - this.leff) * this.springConstant,
                  n = { x: e.x * i, y: e.y * i },
                  a = o.x - r.x,
                  h = o.y - r.y,
                  l = (a * e.x + h * e.y) * this.dampConstant,
                  c = e.x * l,
                  u = e.y * l;
                (n.x += c),
                  (n.y += u),
                  (o.x += -n.x),
                  (o.y += -n.y),
                  (r.x += n.x),
                  (r.y += n.y);
              }
            }
          }
          rotate(t) {
            const e = this.m1,
              s = this.m2,
              i = s.pos.x - e.pos.x,
              n = -(s.pos.y - e.pos.y) / this.leff,
              r = i / this.leff;
            (e.pos.x += n * t),
              (e.pos.y += r * t),
              (s.pos.x += -n * t),
              (s.pos.y += -r * t);
          }
          contract(t, e) {
            this.leff += (this.lrest - t - this.leff) / e;
          }
          setMasses(t, e) {
            (this.m1 = t), (this.m2 = e);
          }
        }
        const H = V.prototype;
        (H.m1 = null),
          (H.m2 = null),
          (H.parent = null),
          (H.lrest = 40),
          (H.leff = 40),
          (H.dampConstant = 0),
          (H.springConstant = 0);
        const N = V,
          Z = Math.abs,
          U = Math.round,
          q = class {
            constructor() {}
            init(e) {
              (this.player = e),
                (this.scene = e._scene),
                (this.gamepad = e._gamepad),
                (this.settings = e._settings),
                (this.gravity = new t.Z(0, 0.3)),
                (this.complete = !1),
                (this.alive = !0),
                (this.crashed = !1),
                (this.dir = 1),
                (this.ghost = !1),
                (this.ragdoll = !1),
                (this.explosion = !1),
                (this.speed = 0),
                (this.powerupsEnabled = !0),
                (this.ignore = !1),
                this.createCosmetics();
            }
            explode() {
              this.ignore || this.scene.sound.play("bomb_sound", 1),
                (this.explosion = new R(this.masses[0].pos, this.scene)),
                this.dead();
            }
            createCosmetics() {
              this.cosmetics = this.player._user.cosmetics;
            }
            updateSpeed() {
              this.speed = Z(U(this.focalPoint.vel.x + this.focalPoint.vel.y));
            }
            close() {
              (this.scene = null),
                (this.settings = null),
                (this.gravity = null),
                (this.speed = null),
                (this.cosmetics = null),
                (this.explosion = null),
                (this.ragdoll = null),
                (this.ghost = null),
                (this.crashed = null),
                (this.alive = null),
                (this.gamepad = null);
            }
            dead() {
              this.stopSounds(),
                this.ignore || this.player.dead(),
                (this.crashed = !0),
                (this.alive = !1);
            }
            moveVehicle(t, e) {
              for (const s of this.masses)
                (s.pos.x += t), (s.pos.y += e), (s.old.x += t), (s.old.y += e);
            }
            stopSounds() {}
          };
        class G extends A {
          constructor(t, e) {
            super(),
              this.init(t, e),
              (this.motor = 0),
              (this.brake = !1),
              (this.angle = 0),
              (this.speed = 0),
              (this.rotationSpeed = 0);
          }
          drive(t, e) {
            const s = this.pos,
              i = this.motor * this.parent.dir,
              n = i * t,
              r = i * e;
            if (((s.x += n), (s.y += r), this.brake)) {
              const i = 0.3 * -(t * this.vel.x + e * this.vel.y),
                n = t * i,
                r = e * i;
              (s.x += n), (s.y += r);
            }
            (this.speed = (t * this.vel.x + e * this.vel.y) / this.radius),
              (this.rotationSpeed = this.speed),
              (this.angle += this.speed),
              (this.contact = !0);
          }
          update() {
            const t = this.parent.gravity,
              e = this.pos,
              s = this.old,
              i = this.vel;
            i.inc(t),
              (0 === t.x && 0 === t.y) || i.factorSelf(0.99),
              e.inc(i),
              (this.contact = !1),
              this.collide && this.scene.track.collide(this),
              (i.x = e.x - s.x),
              (i.y = e.y - s.y),
              this.old.equ(this.pos),
              (this.rotationSpeed = 0.999 * this.rotationSpeed);
          }
        }
        const Y = G.prototype;
        (Y.motor = 0), (Y.brake = !1), (Y.angle = 0), (Y.speed = 0);
        const X = G,
          K = class extends E {
            constructor(t, e, s) {
              super(t, s, "#000"),
                (this.pos.x = t.x),
                (this.pos.y = t.y),
                (this.old.x = this.pos.x),
                (this.old.y = this.pos.y),
                (this.vel.x = e.x),
                (this.vel.y = e.y),
                (this.radius = 7),
                (this.angle = 6.2 * Math.random()),
                (this.speed = 1 * Math.random() - 1 * Math.random()),
                (this.friction = 0.05);
            }
          };
        function J(t) {
          function e(t) {
            return (
              t < 0 && (t += 1),
              t > 1 && (t -= 1),
              t < 1 / 6 ? 6 * t : t < 0.5 ? 1 : t < 2 / 3 ? 6 * (2 / 3 - t) : 0
            );
          }
          return [255 * e(t + 1 / 3), 255 * e(t), 255 * e(t - 1 / 3)];
        }
        const Q = (t) => `rgb(${t[0]}, ${t[1]}, ${t[2]})`,
          tt = (t) => `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${t[3]})`,
          et = Math.atan2;
        class st extends q {
          constructor(e, s) {
            super(), (this.parent = s);
            const i = [],
              n = [],
              r = new t.Z(0, 0),
              o = new A(),
              a = new A(),
              h = new A(),
              l = new A(),
              c = new A(),
              u = new A(),
              d = new A(),
              p = new A(),
              f = new A(),
              g = new A();
            o.init(r, s),
              a.init(r, s),
              h.init(r, s),
              l.init(r, s),
              c.init(r, s),
              u.init(r, s),
              d.init(r, s),
              p.init(r, s),
              f.init(r, s),
              g.init(r, s),
              i.push(o),
              i.push(a),
              i.push(h),
              i.push(l),
              i.push(c),
              i.push(u),
              i.push(d),
              i.push(p),
              i.push(f),
              i.push(g),
              n.push(new N(o, a, this)),
              n.push(new N(o, h, this)),
              n.push(new N(h, c, this)),
              n.push(new N(o, l, this)),
              n.push(new N(l, u, this)),
              n.push(new N(a, d, this)),
              n.push(new N(d, f, this)),
              n.push(new N(a, p, this)),
              n.push(new N(p, g, this));
            for (const t of i) (t.radius = 3), (t.friction = 0.05);
            o.radius = a.radius = 8;
            for (const t of n) (t.springConstant = 0.4), (t.dampConstant = 0.7);
            (this.masses = i),
              (this.springs = n),
              (this.head = o),
              (this.waist = a),
              (this.lElbow = h),
              (this.rElbow = l),
              (this.rHand = u),
              (this.lHand = c),
              (this.lKnee = d),
              (this.rKnee = p),
              (this.lFoot = f),
              (this.rFoot = g);
            for (const t in e) this[t].pos.equ(e[t]);
            this.parent.scene.game.mod.getVar("blackHat")
              ? (this.hat = new K(this.head.pos, this.head.vel, this.parent))
              : (this.hat = null);
          }
          zero(t, e) {
            (t = t.factor(0.7)), (e = e.factor(0.7));
            const s = this.springs,
              i = this.masses;
            for (const t of s) {
              const e = t.m2.pos.sub(t.m1.pos).len();
              (t.lrest = e), (t.leff = e);
            }
            for (let t = 1; t <= 4; t++) (s[t].lrest = 13), (s[t].leff = 13);
            for (const t of s) t.leff > 20 && ((t.lrest = 20), (t.leff = 20));
            const n = [
                this.head,
                this.lElbow,
                this.rElbow,
                this.lHand,
                this.rHand,
              ],
              r = [this.waist, this.lKnee, this.rKnee, this.lFoot, this.rFoot];
            for (const e of n) e.old = e.pos.sub(t);
            for (const t of r) t.old = t.pos.sub(e);
            for (const t of i)
              t.vel.equ(t.pos.sub(t.old)),
                (t.vel.x += 1 * (Math.random() - Math.random())),
                (t.vel.y += 1 * (Math.random() - Math.random()));
          }
          draw() {
            this.hat && this.hat.draw();
            const e = this.parent.scene.game.mod.getVar("crRagdoll"),
              s = this.parent.scene.game.mod.getVar("crHead"),
              i = this.parent.scene.game.mod.getVar("customColors"),
              n = this.head,
              r = this.waist,
              o = this.lElbow,
              a = this.rElbow,
              h = this.rHand,
              l = this.lHand,
              c = this.lKnee,
              u = this.rKnee,
              d = this.lFoot,
              p = this.rFoot,
              f = this.parent.scene,
              g = f.camera.zoom,
              m = f.game.canvas.getContext("2d"),
              v = e ? 1 : 2,
              y = n.pos.toScreen(f),
              w = r.pos.toScreen(f),
              x = a.pos.toScreen(f),
              b = h.pos.toScreen(f),
              _ = u.pos.toScreen(f),
              T = p.pos.toScreen(f),
              C = o.pos.toScreen(f),
              k = l.pos.toScreen(f),
              S = c.pos.toScreen(f),
              A = d.pos.toScreen(f);
            if (
              ((m.strokeStyle = "rgba(0,0,0," + 0.5 * v + ")"),
              m.beginPath(),
              m.moveTo(y.x, y.y),
              m.lineTo(x.x, x.y),
              m.lineTo(b.x, b.y),
              (m.strokeStyle = i
                ? tt([...f.game.mod.getVar("riderColor"), 0.5 * v])
                : "rgba(0,0,0," + 0.5 * v + ")"),
              (m.lineWidth = 5 * g),
              m.moveTo(w.x, w.y),
              m.lineTo(_.x, _.y),
              m.lineTo(T.x, T.y),
              !e)
            ) {
              let t = u.pos.sub(r.pos).normalize();
              t = t.factor(4).add(p.pos);
              const e = t.toScreen(f);
              m.lineTo(e.x, e.y);
            }
            if (
              (m.stroke(),
              (m.lineWidth = 5 * g),
              (m.lineCap = "round"),
              (m.lineJoin = "round"),
              (m.strokeStyle = i
                ? tt([...f.game.mod.getVar("riderColor"), v])
                : "rgba(0,0,0," + v + ")"),
              m.beginPath(),
              m.moveTo(y.x, y.y),
              m.lineTo(C.x, C.y),
              m.lineTo(k.x, k.y),
              (m.lineWidth = 5 * g),
              m.moveTo(w.x, w.y),
              m.lineTo(S.x, S.y),
              m.lineTo(A.x, A.y),
              !e)
            ) {
              let t = c.pos.sub(r.pos).normalize();
              t = t.factor(4).add(d.pos);
              const e = t.toScreen(f);
              m.lineTo(e.x, e.y);
            }
            if (
              (m.stroke(),
              (m.lineWidth = 8 * g),
              m.beginPath(),
              m.moveTo(y.x, y.y),
              m.lineTo(w.x, w.y),
              m.stroke(),
              y.inc(y.sub(w).factor(0.25)),
              s || this.hat)
            )
              if (this.hat)
                m.beginPath(),
                  m.arc(y.x, y.y, 5 * g, 0, 1.99999 * Math.PI, !1),
                  (m.lineWidth = 2 * g),
                  m.stroke();
              else {
                const e = y.sub(w),
                  s = new t.Z(e.y, -e.x),
                  i = y.add(s.factor(0.15 * this.dir)).add(e.factor(-0.05)),
                  n = y.add(s.factor(-0.35 * this.dir)).add(e.factor(0.15));
                m.beginPath(),
                  m.arc(y.x, y.y, 5 * g, 0, 1.99999 * Math.PI, !1),
                  m.moveTo(i.x, i.y),
                  m.lineTo(n.x, n.y),
                  (m.lineWidth = 2 * g),
                  m.stroke();
              }
            else {
              const t = GameInventoryManager.getItem(this.parent.cosmetics.head),
                e = this.drawHeadAngle;
              t.draw(m, y.x, y.y, e, g, this.dir, 1);
            }
          }
          update() {
            for (let t = this.springs.length - 1; t >= 0; t--)
              this.springs[t].update();
            for (let t = this.masses.length - 1; t >= 0; t--)
              this.masses[t].update();
            this.hat && this.hat.update(), this.updateDrawHeadAngle();
          }
          updateDrawHeadAngle() {
            let t, e;
            this.dir < 0
              ? ((e = this.head.pos), (t = this.waist.pos))
              : ((t = this.head.pos), (e = this.waist.pos)),
              (this.drawHeadAngle = -(et(t.x - e.x, t.y - e.y) + Math.PI));
          }
        }
        st.prototype.parent = null;
        const it = st,
          nt = Math.atan2,
          rt = Math.floor,
          ot = Math.random,
          at = Math.min;
        class ht extends q {
          constructor(t, e, s, i) {
            super(),
              super.init(t),
              this.createMasses(e, i),
              this.createSprings(),
              this.updateCameraFocalPoint(),
              this.stopSounds(),
              this.propeller = 0,
              -1 === s && this.swap();
          }
          createMasses(e, s) {
            this.masses = [];
            const i = new A(),
              n = new X(new t.Z(e.x + 21, e.y + 3), this),
              r = new X(new t.Z(e.x + -21, e.y + 3), this);
            i.init(new t.Z(e.x, e.y - 36), this);
            i.drive = this.createRagdoll.bind(this);
              (r.radius = 11.7),
              (n.radius = 11.7),
              (i.radius = 14),
              i.vel.equ(s),
              r.vel.equ(s),
              n.vel.equ(s),
              this.masses.push(i, r, n),
              (this.head = i),
              (this.frontWheel = n),
              (this.rearWheel = r),
              (this.rotor = 0);
          }
          createSprings() {
            this.springs = [];
            const t = new N(this.head, this.rearWheel, this),
              e = new N(this.rearWheel, this.frontWheel, this),
              s = new N(this.frontWheel, this.head, this);
              (e.lrest = 42),
              (e.leff = 42),
              (e.springConstant = 0.35),
              (e.dampConstant = 0.3),
              (t.lrest = 45),
              (t.leff = 45),
              (t.springConstant = 0.35),
              (t.dampConstant = 0.3),
              (s.lrest = 45),
              (s.leff = 45),
              (s.springConstant = 0.35),
              (s.dampConstant = 0.3),
              this.springs.push(t, e, s),
              (this.rearSpring = t),
              (this.chasse = e),
              (this.frontSpring = s);
          }
          createRagdoll() {
            (this.ragdoll = new it(this.getStickMan(), this)),
              this.ragdoll.zero(this.head.vel, this.rearWheel.vel),
              (this.ragdoll.dir = this.dir),
              (this.rearWheel.motor = 0),
              (this.rearWheel.brake = !1),
              (this.frontWheel.brake = !1),
              (this.head.collide = !1),
              this.updateCameraFocalPoint(),
              this.player.isInFocus() && !this.ignore && this.playBailSound(),
              this.dead();
          }
          stopSounds() {
            const t = this.scene.sound;
            t.stop(lt.BIKE_AIR), t.stop(lt.BIKE_GROUND);
          }
          playBailSound() {
            const t = this.scene.sound,
              e = at(this.speed / 50, 1);
            switch (rt(3 * ot()) + 1) {
              case 1:
                t.play(lt.BIKE_FALL_1, e);
                break;
              case 2:
                t.play(lt.BIKE_FALL_2, e);
                break;
              case 3:
                t.play(lt.BIKE_FALL_3, e);
            }
          }
          updateCameraFocalPoint() {
            this.focalPoint = this.ragdoll ? this.ragdoll.head : this.head;
          }
          getStickMan() {
            const e = this.dir,
              s = this.head,
              i = this.frontWheel,
              n = this.rearWheel,
              r = this.pedala,
              o = i.pos.sub(n.pos),
              a = s.pos.sub(i.pos.add(n.pos).factor(0.5)),
              h = new t.Z(o.y * e, -o.x * e),
              l = {};
            (l.head = n.pos.add(o.factor(0.35)).add(a.factor(1.2))),
              (l.lHand = l.rHand = n.pos.add(o.factor(0.8)).add(h.factor(0.68)));
            let c = l.head.sub(l.lHand);
            (c = new t.Z(c.y * e, -c.x * e)),
              (l.lElbow = l.rElbow =
                l.head
                  .add(l.lHand)
                  .factor(0.5)
                  .add(c.factor(130 / c.lenSqr()))),
              (l.waist = n.pos.add(o.factor(0.2)).add(h.factor(0.5)));
            const u = new t.Z(6 * Math.cos(r), 6 * Math.sin(r));
            l.lFoot = n.pos.add(o.factor(0.4)).add(h.factor(0.05)).add(u);
            let d = l.waist.sub(l.lFoot);
            return (
              (d = new t.Z(-d.y * e, d.x * e)),
              (l.lKnee = l.waist
                .add(l.lFoot)
                .factor(0.5)
                .add(d.factor(160 / d.lenSqr()))),
              (l.rFoot = n.pos.add(o.factor(0.4)).add(h.factor(0.05)).sub(u)),
              (d = l.waist.sub(l.rFoot)),
              (d = new t.Z(-d.y * e, d.x * e)),
              (l.rKnee = l.waist
                .add(l.rFoot)
                .factor(0.5)
                .add(d.factor(160 / d.lenSqr()))),
              l
            );
          }
          update() {
            if (
              (this.crashed || (this.updateSound(), this.control()),
              this.explosion)
            )
              this.explosion.update();
            else {
              const t = this.springs,
                e = this.masses;
              for (let e = t.length - 1; e >= 0; e--) t[e].update();
              for (let t = e.length - 1; t >= 0; t--) e[t].update();
              if (
                (this.rearWheel.contact &&
                  this.frontWheel.contact &&
                  (this.slow = !1),
                !this.slow)
              ) {
                this.crashed || this.control();
                for (let e = t.length - 1; e >= 0; e--) t[e].update();
                for (let t = e.length - 1; t >= 0; t--) e[t].update();
              }
              this.ragdoll ? this.ragdoll.update() : this.updateDrawHeadAngle();
            }
            this.updateCameraFocalPoint();
          }
          updateSound() {
            if (this.player.isInFocus() && !this.ignore) {
              this.updateSpeed();
              const t = at(this.speed / 50, 1),
                e = this.scene.sound;
              this.rearWheel.contact || this.frontWheel.contact
                ? (e.play(lt.BIKE_GROUND, t), e.stop(lt.BIKE_AIR))
                : (e.play(lt.BIKE_AIR, t), e.stop(lt.BIKE_GROUND));
            }
          }
          swap() {
            (this.dir *= -1), this.chasse.swap();
            const t = this.rearSpring.leff;
            (this.rearSpring.leff = this.frontSpring.leff),
              (this.frontSpring.leff = t);
          }
          control() {
            const t = this.gamepad,
              e = t.isButtonDown("up"),
              s = t.isButtonDown("down"),
              i = t.isButtonDown("left"),
              n = t.isButtonDown("right"),
              x = t.isButtonDown("x") && (this.scene.game.mod.getVar("crouch") || this.scene.game.mod.getVar("propeller")),
              r = t.isButtonDown("z"),
              o = e ? 1 : 0,
              a = this.rearWheel;
  
              if (this.scene.game.mod.getVar("propeller")) {
                let angle = this.frontWheel.pos.sub(this.rearWheel.pos);
                  let angleX = angle.x / angle.len();
                  let angleY = angle.y / angle.len();
  
                  this.propeller = x ? GameSettings.propeller * 0.3 : 0; // 0.3 allows GameSettings.propeller = 1 to be equal to gravity forces
                  this.windspeed = x ? GameSettings.windspeed : 0;
                  
                  let wind = 0.01 / GameSettings.propeller; // 0.01 allows wind lift to be equal to gravity forces at max velocity.x
  
                  this.head.pos.x += this.propeller * angleX; // thrust
                  this.head.pos.y += this.propeller * angleY;
                  this.rearWheel.pos.x += this.propeller * 2 * angleX;
                  this.rearWheel.pos.y += this.propeller * 2 * angleY;
  
                  this.head.pos.y -= this.windspeed * this.head.vel.x * angleX * wind; // wind
                  this.frontWheel.pos.y -= this.windspeed * this.head.vel.x * angleX * wind;
                  this.rearWheel.pos.y -= this.windspeed * this.head.vel.x * angleX * wind;
              }
  
            (a.motor += ((o - a.motor) / 10)),
              r && !this.swapped && (this.swap(), (this.swapped = !0)),
              r || (this.swapped = !1),
              e && (this.pedala += this.rearWheel.speed / 5),
              (a.brake = s),
              s && this.frontSpring.contract(-10, 10),
              (1 === this.dir && n && s) || (-1 === this.dir && i && s)
                ? (this.frontWheel.brake = !0)
                : (this.frontWheel.brake = !1);
            let h = i ? 1 : 0;
            (h += n ? -1 : 0),
              this.rearSpring.contract(5 * h * this.dir, 5),
              this.frontSpring.contract(5 * -h * this.dir, 5),
              this.chasse.rotate(h / 6),
              (!this.scene.game.mod.getVar("crouch") || !x) && !h && e && (this.rearSpring.contract(-7, 5),
                this.frontSpring.contract(7, 5)),
                this.scene.game.mod.getVar("crouch") && x && (this.rearSpring.contract(-25, -20),
                this.frontSpring.contract(-25, -20));
          }
          draw() {
            if (this.explosion) this.explosion.draw();
            else {
              const t = this.scene.game.canvas.getContext("2d");
              if (
                ((t.imageSmoothingEnabled = !0),
                (t.webkitImageSmoothingEnabled = !0),
                (t.mozImageSmoothingEnabled = !0),
                this.settings.developerMode)
              )
                for (const t of this.masses) t.draw();
              this.drawBikeFrame();
            }
          }
          updateDrawHeadAngle() {
            const t = this.frontWheel.pos.sub(this.rearWheel.pos);
            this.drawHeadAngle = -(nt(t.x, t.y) - Math.PI / 2);
          }
          drawBikeFrame() {
            const e = this.scene,
              s = e.game.mod.getVar("crBmx"),
              i = e.game.mod.getVar("crHead"),
              n = e.game.mod.getVar("customColors"),
              r = n ? Q(e.game.mod.getVar("vehicleColor")) : "#000",
              o = e.game.mod.getVar("blackHat"),
              a = this.rearWheel.pos.toScreen(e),
              h = this.frontWheel.pos.toScreen(e),
              l = this.head.pos.toScreen(e),
              c = this.player._opacity;
            let u = h.sub(a),
              d = new t.Z(u.y * this.dir, -u.x * this.dir);
            const p = new W(a, u, d),
              f = this.pedala,
              g = Math.atan2(u.y, u.x),
              m = this.dir,
              v = e.camera.zoom,
              y = e.game.canvas.getContext("2d"),
              w = s ? 3.5 : 3,
              x = s ? 10 : 10.5;
              (y.globalAlpha = c),
              (y.strokeStyle = "rgba(0,0,0,1)"),
              (y.lineWidth = w * v),
              (y.lineCap = "round"),
              (y.lineJoin = "round"),
              (y.fillStyle = "rgba(200,200, 200, 0.2)"),
              y.beginPath(),
              y.arc(h.x, h.y, x * v, 0, 2 * Math.PI, !1),
              y.moveTo(a.x + x * v, a.y),
              y.arc(a.x, a.y, x * v, 0, 2 * Math.PI, !1),
              s || y.fill(),
              y.stroke();
            const b = p.transform(0.3, 0.25),
              _ = p.transform(0.4, 0.05),
              T = p.transform(0.84, 0.42),
              C = p.transform(0.84, 0.37),
              k = new t.Z(6 * Math.cos(f + g) * v, 6 * Math.sin(f + g) * v),
              S = _.add(k),
              A = _.sub(k);
            d = l.sub(a.add(u.factor(0.5)));
  
            const masses = this.masses;
              const nn = this.dir;
              let rotor = this.rotor;
              let dd = masses[1].pos.add(masses[2].pos).factor(.5);
                  dd =  masses[0].pos.sub(dd).factor(v);
  
              let pp = new t.Z(-dd.y * nn,dd.x * nn);
  
            const ff = masses[2].pos.toScreen(e);
                    rotor += 2 * this.propeller + .1, // this.propeller or masses[1].motor
                    rotor > 6.2831 && (rotor -= 6.2831),
                    this.rotor = rotor;
  
            const gg = new W(ff,pp,dd);             
  
            const mm = (.25) * Math.cos(rotor); // propeller
            if (this.scene.game.mod.getVar("propeller")) {
                    y.beginPath();  
                    y.strokeStyle = "#000000",
                    y.lineWidth = 3 * v,
                    y.lineJoin = y.lineCap = "round",
                    y.moveTo(...gg.transform(0.5, .5 + mm).toArray()),
                    y.lineTo(...gg.transform(0.5, 0.5 + -mm).toArray());    
                    y.stroke();
                    y.closePath();}
  
  
            const P = new W(b, u, d),
              M = P.transform(-0.1, 0.3);
            let I = S.sub(M),
              B = new t.Z(I.y * m, -I.x * m);
            B = B.factor(v * v);
            const D = M.add(I.factor(0.5)).add(B.factor(200 / I.lenSqr())),
              E = S.add(I.factor(0.12)).add(B.factor(50 / I.lenSqr()));
            (I = A.sub(M)),
              (B = new t.Z(I.y * m, -I.x * m)),
              (B = B.factor(v * v));
            const L = M.add(I.factor(0.5)).add(B.factor(200 / I.lenSqr())),
              z = A.add(I.factor(0.12)).add(B.factor(50 / I.lenSqr()));
            this.crashed ||
              ((y.strokeStyle = n
                ? tt([...e.game.mod.getVar("riderColor"), 0.5])
                : "rgba(0,0,0,0.5)"),
              (y.lineWidth = 6 * v),
              y.beginPath(),
              y.moveTo(A.x, A.y),
              y.lineTo(L.x, L.y),
              y.lineTo(M.x, M.y),
              y.stroke(),
              s ||
                ((y.lineWidth = 4 * v),
                y.beginPath(),
                y.moveTo(A.x, A.y),
                y.lineTo(z.x, z.y),
                y.stroke())),
              y.beginPath(),
              (y.strokeStyle = r || "#000000"),
              (y.lineWidth = 3 * v),
              y.moveTo(T.x, T.y),
              y.lineTo(b.x, b.y),
              y.lineTo(a.x, a.y),
              y.lineTo(_.x, _.y),
              y.lineTo(C.x, C.y),
              y.stroke(),
              s ||
                (y.beginPath(),
                (y.lineWidth = Math.max(1 * v, 0.5)),
                y.arc(_.x, _.y, 3 * v, 0, 2 * Math.PI, !1),
                y.stroke()),
              y.beginPath(),
              (y.lineWidth = s ? 3 * v : Math.max(1 * v, 0.5)),
              y.moveTo(S.x, S.y),
              y.lineTo(A.x, A.y),
              y.stroke();
            const O = p.transform(0.25, 0.4),
              F = p.transform(0.17, 0.38),
              j = p.transform(0.3, 0.45),
              R = p.transform(0.97, 0),
              V = p.transform(0.8, 0.48),
              H = p.transform(0.86, 0.5),
              N = p.transform(0.82, 0.65),
              Z = p.transform(0.78, 0.67);
            if (
              (y.beginPath(),
              (y.lineWidth = 3 * v),
              y.moveTo(F.x, F.y),
              y.lineTo(j.x, j.y),
              y.moveTo(_.x, _.y),
              y.lineTo(O.x, O.y),
              y.moveTo(h.x, h.y),
              y.lineTo(R.x, R.y),
              y.lineTo(V.x, V.y),
              y.lineTo(H.x, H.y),
              y.lineTo(N.x, N.y),
              y.lineTo(Z.x, Z.y),
              y.stroke(),
              this.crashed && this.ragdoll)
            )
              this.ragdoll.draw();
            else {
              (y.lineWidth = 6 * v),
                (y.strokeStyle = n ? Q(e.game.mod.getVar("riderColor")) : "#000"),
                y.beginPath(),
                y.moveTo(S.x, S.y),
                y.lineTo(D.x, D.y),
                y.lineTo(M.x, M.y),
                y.stroke(),
                s ||
                  (y.beginPath(),
                  y.moveTo(S.x, S.y),
                  y.lineTo(E.x, E.y),
                  y.stroke());
              const r = P.transform(0.05, 0.9);
              (y.lineWidth = 8 * v),
                y.beginPath(),
                y.moveTo(M.x, M.y),
                y.lineTo(r.x, r.y),
                y.stroke();
              const a = P.transform(0.15, 1.05),
                h = P.transform(0.4, 1.1),
                l = P.transform(0.05, 1.05);
              (u = r.sub(Z)),
                (d = new t.Z(u.y * m, -u.x * m)),
                (d = d.factor(v * v));
              const c = Z.add(u.factor(0.4)).add(d.factor(130 / u.lenSqr()));
              if (
                ((y.lineWidth = 5 * v),
                y.beginPath(),
                y.moveTo(r.x, r.y),
                y.lineTo(c.x, c.y),
                y.lineTo(Z.x, Z.y),
                y.stroke(),
                i || o)
              )
                if (o) {
                  const t = P.transform(0.35, 1.15),
                    e = P.transform(-0.05, 1.1),
                    s = P.transform(0.25, 1.13),
                    i = P.transform(0.05, 1.11),
                    n = P.transform(0.25, 1.35),
                    r = P.transform(-0.03, 1.3);
                  y.beginPath(),
                    y.moveTo(a.x + 5 * v, a.y),
                    y.arc(a.x, a.y, 5 * v, 0, 2 * Math.PI),
                    (y.lineWidth = 2 * v),
                    y.stroke(),
                    y.beginPath(),
                    y.moveTo(t.x, t.y),
                    y.lineTo(s.x, s.y),
                    y.lineTo(n.x, n.y),
                    y.lineTo(r.x, r.y),
                    y.lineTo(i.x, i.y),
                    y.lineTo(e.x, e.y),
                    (y.fillStyle = y.strokeStyle),
                    y.stroke(),
                    y.fill();
                } else
                  y.beginPath(),
                    y.moveTo(a.x + 5 * v, a.y),
                    y.arc(a.x, a.y, 5 * v, 0, 2 * Math.PI),
                    y.moveTo(h.x, h.y),
                    y.lineTo(l.x, l.y),
                    (y.lineWidth = 2 * v),
                    y.stroke();
              else
                GameInventoryManager.getItem(this.cosmetics.head).draw(
                  y,
                  a.x,
                  a.y,
                  this.drawHeadAngle,
                  v,
                  this.dir
                );
              y.globalAlpha = 1;
            }
          }
          clone() {
            const e = new ht(this.player, new t.Z(0, 0), 1, new t.Z(0, 0));
            return (
              e.frontWheel.pos.equ(this.frontWheel.pos),
              e.frontWheel.vel.equ(this.frontWheel.vel),
              e.frontWheel.old.equ(this.frontWheel.old),
              e.rearWheel.pos.equ(this.rearWheel.pos),
              e.rearWheel.vel.equ(this.rearWheel.vel),
              e.rearWheel.old.equ(this.rearWheel.old),
              e.head.pos.equ(this.head.pos),
              e.head.vel.equ(this.head.vel),
              e.head.old.equ(this.head.old),
              (e.masses = [e.head, e.rearWheel, e.frontWheel]),
              e
            );
          }
        }
        const lt = {
            BIKE_GROUND: "bike_ground",
            BIKE_AIR: "bike_air",
            BIKE_FALL_1: "bike_fall_1",
            BIKE_FALL_2: "bike_fall_2",
            BIKE_FALL_3: "bike_fall_3",
          },
          ct = ht.prototype;
        (ct.vehicleName = "BMX"),
          (ct.masses = null),
          (ct.springs = null),
          (ct.cosmetics = null),
          (ct.slow = !1),
          (ct.pedala = 0),
          (ct.cosmeticHead = null),
          (ct.cosmeticRearWheel = null),
          (ct.cosmeticFrontWheel = null),
          (ct.swapped = !1),
          (ct.ragdoll = null);
        const ut = ht;
        class dt extends A {
          constructor(e, s) {
            super(),
              this.init(e, s),
              (this.motor = 0),
              (this.angle = new t.Z(0, 0)),
              (this.radius = 10),
              (this.speed = 0);
          }
          update() {
            let t = this.vel;
            const e = this.angle,
              s = this.pos,
              i = this.old,
              n = this.motor;
            t.inc(e.factor(2 * n)),
              (t = t.factor(0.99)),
              s.inc(t),
              (this.contact = !1),
              this.collide && this.scene.track.collide(this),
              (this.vel = s.sub(i)),
              i.equ(s);
          }
        }
        const pt = dt.prototype;
        (pt.motor = 0), (pt.angle = 0), (pt.speed = 0);
        const ft = dt,
          gt = Math.atan2,
          mt = Math.min;
        class vt extends q {
          constructor(t, e, s) {
            super(),
              super.init(t),
              this.createMasses(e),
              this.createSprings(),
              this.createCockpit(),
              this.updateCameraFocalPoint(),
              this.stopSounds(),
              -1 === s && this.swap();
          }
          createCockpit() {
            this.canvasCockpit = document.createElement("canvas");
          }
          drawCockpit() {
            const t = this.canvasCockpit,
              e = this.masses,
              s = this.scene.camera.zoom,
              i = e[0].radius * s * 0.9,
              n = 50 * s,
              r = 50 * s;
            (t.width = n), (t.height = r);
            const o = Math.max(2 * s, 1),
              a = t.getContext("2d");
            a.save(),
              a.translate(n / 2, r / 2),
              a.scale(1.3, 1),
              a.beginPath(),
              a.arc(0, 0, i, 0, 1.5 * Math.PI, !1),
              a.lineTo(0, 0),
              a.lineTo(0 + i, 0),
              a.closePath(),
              a.restore(),
              (a.fillStyle = "#000000"),
              a.fill(),
              (a.lineWidth = o),
              (a.strokeStyle = "black"),
              a.stroke(),
              a.save(),
              a.translate(n / 2, r / 2),
              a.scale(1.3, 1),
              a.beginPath(),
              a.arc(0, 0, i, 0, 1.5 * Math.PI, !0),
              a.restore(),
              (a.lineWidth = o),
              (a.strokeStyle = "black"),
              a.stroke();
          }
          createMasses(e) {
            const s = [];
            s.push(new ft(new t.Z(e.x + 0, e.y + 18), this));
            const i = new A(),
              n = new A(),
              r = new A(),
              o = new A();
            i.init(new t.Z(e.x + -17, e.y + 42), this),
              n.init(new t.Z(e.x + 17, e.y + 42), this),
              r.init(new t.Z(e.x + -40, e.y + 15), this),
              o.init(new t.Z(e.x + 40, e.y + 15), this),
              s.push(i),
              s.push(n),
              s.push(r),
              s.push(o),
              (s[0].radius = 18),
              (s[1].radius = 8),
              (s[2].radius = 8),
              (s[3].grav = !1),
              (s[4].grav = s[4].collide = !1),
              (s[1].friction = 0.2),
              (s[2].friction = 0.2),
              (this.head = s[0]),
              (this.mass2 = s[1]),
              (this.mass3 = s[2]),
              (this.mass4 = s[3]),
              (this.rotor = 0),
              (this.rotor2 = 0),
              (this.dir = 1),
              (s[3].drive = this.head.drive =
                () => {
                  this.explode();
                }),
              (this.focalPoint = s[0]),
              (this.masses = s);
          }
          createSprings() {
            const t = this.masses,
              e = [];
            e.push(new N(t[0], t[1], this)),
              e.push(new N(t[2], t[0], this)),
              e.push(new N(t[2], t[1], this)),
              e.push(new N(t[0], t[3], this)),
              e.push(new N(t[1], t[3], this)),
              e.push(new N(t[0], t[4], this)),
              e.push(new N(t[2], t[4], this)),
              (this.spring1 = e[0]),
              (this.spring2 = e[1]),
              (this.spring3 = e[2]),
              (this.spring4 = e[3]),
              (this.spring5 = e[4]),
              (this.spring6 = e[5]),
              (this.spring7 = e[6]),
              (e[0].leff = e[4].lrest = 30),
              (e[1].leff = e[4].lrest = 30),
              (e[2].leff = e[4].lrest = 35),
              (e[4].leff = e[4].lrest = 35),
              (e[6].leff = e[4].lrest = 35);
            for (const t of e) (t.dampConstant = 0.4), (t.springConstant = 0.5);
            this.springs = e;
          }
          updateCameraFocalPoint() {}
          update() {
            if (
              (this.crashed || (this.updateSound(), this.control()),
              this.explosion)
            )
              this.explosion.update();
            else {
              const t = this.springs,
                e = this.masses;
              for (let e = t.length - 1; e >= 0; e--) t[e].update();
              for (let t = e.length - 1; t >= 0; t--) e[t].update();
              if (
                ((this.masses[1].contact || this.masses[2].contact) &&
                  (this.slow = !1),
                !this.slow)
              ) {
                this.crashed || this.control();
                for (let e = t.length - 1; e >= 0; e--) t[e].update();
                for (let t = e.length - 1; t >= 0; t--) e[t].update();
              }
              this.updateCockpitAngle();
            }
          }
          updateSound() {
            this.player.isInFocus() &&
              this.scene.sound.play(wt.HELICOPTER, mt(this.head.motor, 1));
          }
          stopSounds() {
            this.scene.sound.stop(wt.HELICOPTER);
          }
          swap() {
            const e = this.masses;
            this.springs[2].swap();
            const s = new t.Z(0, 0),
              i = new t.Z(0, 0),
              n = new t.Z(0, 0);
            s.equ(e[3].pos),
              i.equ(e[3].old),
              n.equ(e[3].vel),
              e[3].pos.equ(e[4].pos),
              e[3].old.equ(e[4].old),
              e[3].vel.equ(e[4].vel),
              e[4].pos.equ(s),
              e[4].old.equ(i),
              e[4].vel.equ(n),
              (this.dir *= -1);
          }
          control() {
            const t = this.player.getGamepad(),
              e = t.isButtonDown("up"),
              s = t.isButtonDown("back"),
              i = t.isButtonDown("left"),
              n = t.isButtonDown("right"),
              r = t.isButtonDown("z"),
              o = this.masses,
              a = this.springs;
            r && !this.swapped && (this.swap(), (this.swapped = !0)),
              r || (this.swapped = !1);
            let h = o[1].pos.add(o[2].pos).factor(0.5);
            (h = o[0].pos.sub(h)), (h = h.factor(1 / h.len())), o[0].angle.equ(h);
            const l = e ? 1 : 0;
            o[0].motor += (l - o[0].motor) / 10;
            let c = i ? 1 : 0;
            (c += n ? -1 : 0),
              a[2].rotate(c / 6),
              s && (this.scene.restartTrack = !0);
          }
          updateCockpitAngle() {
            const t = this.masses,
              e = t[0].pos,
              s = t[3].pos,
              i = e.x,
              n = e.y,
              r = s.x,
              o = s.y;
            this.cockpitAngle = -(gt(i - r, n - o) - Math.PI / 2);
          }
          draw() {
            if (this.explosion) this.explosion.draw(1);
            else {
              const e = this.scene.game.mod.getVar("crHeli"),
                s = this.scene.game.canvas.getContext("2d");
              (s.imageSmoothingEnabled = !0),
                (s.webkitImageSmoothingEnabled = !0),
                (s.mozImageSmoothingEnabled = !0),
                (s.globalAlpha = this.player._opacity);
              const i = this.masses,
                n = this.dir;
              let r = this.rotor,
                o = this.rotor2;
              const a = this.scene,
                h = a.camera.zoom,
                l = i[1].pos.toScreen(a),
                c = i[2].pos.toScreen(a),
                u = i[3].pos.toScreen(a);
              let d = i[1].pos.add(i[2].pos).factor(0.5);
              d = i[0].pos.sub(d).factor(h);
              let p = new t.Z(-d.y * n, d.x * n);
              const f = i[0].pos.toScreen(a);
              (r += 0.5 * i[0].motor + 0.05),
                r > 6.2831 && (r -= 6.2831),
                (o += 0.5),
                o > 6.2831 && (o -= 6.2831),
                (this.rotor = r),
                (this.rotor2 = o);
              const g = new W(f, p, d);
              (s.strokeStyle = "#000000"),
                (s.lineWidth = 5 * h),
                (s.lineJoin = s.lineCap = "round"),
                s.beginPath(),
                s.moveTo(...g.transform(0, 0.5).toArray()),
                s.lineTo(...g.transform(0, e ? 1 : 0.8).toArray()),
                s.stroke(),
                (s.lineWidth = 3 * h),
                s.beginPath();
              const m = (e ? 0.7 : 0.9) * Math.cos(r);
              s.moveTo(...g.transform(m, e ? 0.9 : 0.8).toArray()),
                s.lineTo(...g.transform(-m, e ? 0.9 : 0.8).toArray()),
                s.stroke(),
                (s.lineWidth = 4 * h),
                (s.strokeStyle = e ? "#666666" : "#000"),
                (s.lineWidth = 4 * h),
                s.beginPath(),
                s.moveTo(...g.transform(-0.2, -0.1, l).toArray()),
                s.lineTo(...g.transform(0, -0.25, l).toArray()),
                s.lineTo(...g.transform(0, -0.25, c).toArray()),
                s.lineTo(...g.transform(0.2, -0.1, c).toArray()),
                s.stroke(),
                (s.lineWidth = 3 * h),
                s.beginPath(),
                s.moveTo(...g.transform(0, -0.2, l).toArray()),
                s.lineTo(f.x, f.y),
                s.lineTo(...g.transform(0, -0.2, c).toArray()),
                s.stroke(),
                (s.lineWidth = 6 * h),
                (s.strokeStyle = "#000000"),
                s.beginPath(),
                s.moveTo(f.x, f.y),
                s.lineTo(u.x, u.y),
                s.lineTo(...g.transform(0, -0.3).toArray()),
                s.stroke(),
                (s.lineWidth = 2 * h),
                s.beginPath();
              const v = 7 * h,
                y = new t.Z(v * Math.sin(-o), v * Math.cos(-o));
              if (
                (s.moveTo(u.x + y.x, u.y + y.y),
                s.lineTo(u.x - y.x, u.y - y.y),
                s.moveTo(u.x - y.y, u.y + y.x),
                s.lineTo(u.x + y.y, u.y - y.x),
                s.stroke(),
                s.beginPath(),
                e && (s.strokeStyle = "#aaaaaa"),
                (s.lineWidth = 2 * h),
                s.arc(u.x, u.y, i[3].radius * h, 0, 2 * Math.PI, !1),
                s.stroke(),
                e)
              ) {
                const t = i[0].radius * h;
                s.beginPath(),
                  s.arc(f.x, f.y, t, 0, 2 * Math.PI),
                  (s.fillStyle = "#000"),
                  s.fill(),
                  s.beginPath(),
                  s.arc(
                    ...g.transform(0.2, 0.05, f).toArray(),
                    8.5 * h,
                    0,
                    2 * Math.PI
                  ),
                  (s.fillStyle = "#777777"),
                  s.fill();
              } else {
                (p = f.sub(u)),
                  p.factorSelf(h / p.len()),
                  (d = new t.Z(-p.y, p.x));
                const e = p.factor(5).add(d.factor(2 * this.dir)),
                  i = p.factor(5).add(d.factor(-5 * this.dir));
                this.drawCockpit();
                const r = this.canvasCockpit,
                  o = r.width,
                  a = r.height,
                  l = f.x + e.x,
                  c = f.y + e.y,
                  g = -o / 2,
                  m = -a / 2,
                  v = -1 === n,
                  y = GameInventoryManager.getItem(this.cosmetics.head),
                  w = this.cockpitAngle;
                y.draw(s, l + i.x, c + i.y, w, 0.7 * h, n),
                  s.translate(l, c),
                  s.rotate(w),
                  v && s.scale(1, -1),
                  s.drawImage(r, g, m, o, a),
                  v && s.scale(1, -1),
                  s.rotate(-w),
                  s.translate(-l, -c),
                  (s.globalAlpha = 1);
              }
            }
          }
        }
        const yt = vt.prototype;
        (yt.vehicleName = "Helicopter"),
          (yt.masses = null),
          (yt.springs = null),
          (yt.slow = !1),
          (yt.swapped = !1);
        const wt = { HELICOPTER: "helicopter" },
          xt = vt,
          bt = Math.atan2,
          _t = Math.min,
          Tt = Math.sqrt,
          Ct = Math.pow;
        class kt extends q {
          constructor(t, e, s) {
            super(),
              super.init(t),
              this.createMasses(e),
              this.createSprings(),
              this.stopSounds(),
              this.updateCameraFocalPoint(),
              -1 === s && this.swap();
          }
          createMasses(e) {
            (this.masses = []),
              this.masses.push(new A()),
              this.masses.push(new A()),
              this.masses[0].init(new t.Z(e.x - 15, e.y + 7), this),
              this.masses[1].init(new t.Z(e.x + 15, e.y + 7), this),
              (this.masses[0].friction = 0.1),
              (this.masses[1].friction = 0.1),
              this.masses.push(new X(new t.Z(e.x - 20, e.y + 35), this)),
              this.masses.push(new X(new t.Z(e.x + 20, e.y + 35), this)),
              (this.masses[2].radius = this.masses[3].radius = 14),
              (this.masses[0].radius = this.masses[1].radius = 7),
              (this.head = this.masses[0]),
              (this.backMass = this.masses[1]),
              (this.rearWheel = this.masses[2]),
              (this.frontWheel = this.masses[3]);
          }
          createSprings() {
            this.springs = [];
            const t = this.masses;
            this.springs.push(new N(t[0], t[1], this)),
              this.springs.push(new N(t[0], t[2], this)),
              this.springs.push(new N(t[1], t[3], this)),
              this.springs.push(new N(t[0], t[3], this)),
              this.springs.push(new N(t[1], t[2], this)),
              this.springs.push(new N(t[2], t[3], this)),
              (this.springs[0].leff = this.springs[0].lrest = 30),
              (this.springs[1].leff = this.springs[1].lrest = 30),
              (this.springs[2].leff = this.springs[2].lrest = 30),
              (this.springs[3].leff = this.springs[3].lrest = 45),
              (this.springs[4].leff = this.springs[4].lrest = 45);
            for (const t of this.springs) t.springConstant = 0.3;
          }
          updateCameraFocalPoint() {
            this.focalPoint = 1 === this.dir ? this.head : this.backMass;
          }
          update() {
            if (
              (this.crashed || (this.updateSound(), this.control()),
              this.explosion)
            )
              this.explosion.update();
            else {
              const t = this.springs,
                e = this.masses;
              for (let e = t.length - 1; e >= 0; e--) t[e].update();
              for (let t = e.length - 1; t >= 0; t--) e[t].update();
              if (
                (this.rearWheel.contact &&
                  this.frontWheel.contact &&
                  (this.slow = !1),
                !this.slow)
              ) {
                this.crashed || this.control();
                for (let e = t.length - 1; e >= 0; e--) t[e].update();
                for (let t = e.length - 1; t >= 0; t--) e[t].update();
              }
              this.updateDrawHeadAngle(), this.updateCameraFocalPoint();
            }
          }
          updateSound() {
            if (this.player.isInFocus()) {
              const t = this.scene.sound;
              if (this.rearWheel.contact) {
                const e = _t(this.rearWheel.motor, 1);
                t.play(At.TRUCK_GROUND, e);
              } else if (this.frontWheel.contact) {
                const e = _t(this.frontWheel.motor, 1);
                t.play(At.TRUCK_GROUND, e);
              } else t.stop(At.TRUCK_GROUND);
            }
          }
          stopSounds() {
            this.scene.sound.stop(At.TRUCK_GROUND);
          }
          updateDrawHeadAngle() {
            const t = this.frontWheel.pos,
              e = this.rearWheel.pos;
            this.drawHeadAngle = -(bt(t.x - e.x, t.y - e.y) - Math.PI / 2);
          }
          swap() {
            (this.dir *= -1), this.springs[0].swap(), this.springs[5].swap();
          }
          control() {
            const t = this.gamepad,
              e = t.isButtonDown("up"),
              s = t.isButtonDown("down"),
              i = t.isButtonDown("left"),
              n = t.isButtonDown("right"),
              r = t.isButtonDown("z");
            r && !this.swapped && (this.swap(), (this.swapped = !0)),
              r || (this.swapped = !1);
            const o = e ? 1 : 0,
              a = this.rearWheel,
              h = this.frontWheel;
            (a.motor += (0.8 * o - a.motor) / 10),
              (h.motor += (0.8 * o - h.motor) / 10),
              (a.brake = s),
              (h.brake = s);
            let l = i ? 1 : 0;
            l += n ? -1 : 0;
            const c = this.springs;
            c[0].rotate(l / 8), c[5].rotate(l / 8);
          }
          draw() {
            if (this.explosion) this.explosion.draw(1);
            else {
              const t = this.scene.game.canvas.getContext("2d");
              if (
                ((t.imageSmoothingEnabled = !0),
                (t.mozImageSmoothingEnabled = !0),
                (t.oImageSmoothingEnabled = !0),
                (t.webkitImageSmoothingEnabled = !0),
                this.settings.developerMode)
              )
                for (const t of this.masses) t.draw();
              (t.globalAlpha = this.player._opacity),
                this.drawTruck(t),
                (t.globalAlpha = 1);
            }
          }
          drawTruck(t) {
            const e = this.scene,
              s = e.camera.zoom,
              i = GameInventoryManager.getItem(this.cosmetics.head),
              n = this.drawHeadAngle,
              r = this.dir,
              o = this.frontWheel.pos.toScreen(e),
              a = this.rearWheel.pos.toScreen(e),
              h = this.head.pos.toScreen(e),
              l = this.backMass.pos.toScreen(e),
              c = (this.masses[1].pos.x - this.masses[0].pos.x) * s,
              u = (this.masses[1].pos.y - this.masses[0].pos.y) * s,
              d =
                (0.5 * (this.masses[0].pos.x + this.masses[1].pos.x) -
                  0.5 * (this.masses[2].pos.x + this.masses[3].pos.x)) *
                s,
              p =
                (0.5 * (this.masses[0].pos.y + this.masses[1].pos.y) -
                  0.5 * (this.masses[2].pos.y + this.masses[3].pos.y)) *
                s;
            (t.strokeStyle = "#000000"),
              (t.lineWidth = 3 * s),
              (t.lineCap = "round"),
              (t.lineJoin = "round");
            const f = l.x - h.x,
              g = l.y - h.y,
              m = Tt(Ct(f, 2) + Ct(g, 2)),
              v = f / m,
              y = g / m;
            i.draw(
              t,
              l.x - 0.5 * v * s * 20,
              l.y - y * s * 20 * 0.5,
              n,
              0.45 * s,
              r
            ),
              (t.strokeStyle = "#444444"),
              t.beginPath(),
              t.moveTo(h.x - 0.4 * c - 0.9 * d, h.y - 0.4 * u - 0.9 * p),
              t.lineTo(h.x + 0.8 * c - 0.9 * d, h.y + 0.8 * u - 0.9 * p),
              t.stroke(),
              (t.fillStyle = "#777777"),
              t.beginPath(),
              t.moveTo(h.x - 0.4 * c - 0.7 * d, h.y - 0.4 * u - 0.7 * p),
              t.lineTo(h.x - 0.4 * c - 0.7 * d, h.y - 0.4 * u - 0.7 * p),
              t.lineTo(h.x + 1.4 * c - 0.7 * d, h.y + 1.4 * u - 0.7 * p),
              t.lineTo(h.x + 1.35 * c - 0.2 * d, h.y + 1.35 * u - 0.2 * p),
              t.lineTo(h.x + 0.9 * c - 0.1 * d, h.y + 0.9 * u - 0.1 * p),
              t.lineTo(h.x + 0.5 * c - 0.1 * d, h.y + 0.5 * u - 0.1 * p),
              t.lineTo(h.x + 0.5 * c + 0.2 * d, h.y + 0.5 * u + 0.2 * p),
              t.lineTo(h.x - 0.35 * c + 0.2 * d, h.y - 0.35 * u + 0.2 * p),
              t.closePath(),
              t.fill(),
              (t.lineWidth = 2 * s),
              (t.strokeStyle = "#444444"),
              t.beginPath(),
              t.moveTo(h.x - 0.4 * c - 0.7 * d, h.y - 0.4 * u - 0.7 * p),
              t.lineTo(h.x - 0.35 * c + 0.2 * d, h.y - 0.35 * u + 0.2 * p),
              t.lineTo(h.x + 0.8 * c + 0.2 * d, h.y + 0.8 * u + 0.2 * p),
              t.lineTo(h.x + 0.9 * c - 0.1 * d, h.y + 0.9 * u - 0.1 * p),
              t.lineTo(h.x + 1.35 * c - 0.2 * d, h.y + 1.35 * u - 0.2 * p),
              t.lineTo(h.x + 1.4 * c - 0.7 * d, h.y + 1.4 * u - 0.7 * p),
              t.lineTo(h.x - 0.4 * c - 0.7 * d, h.y - 0.4 * u - 0.7 * p),
              t.stroke(),
              (t.strokeStyle = "#444444"),
              (t.lineWidth = s),
              t.beginPath(),
              t.moveTo(h.x + 0.5 * c - 0.1 * d, h.y + 0.5 * u - 0.1 * p),
              t.lineTo(h.x + 0.9 * c - 0.1 * d, h.y + 0.9 * u - 0.1 * p),
              t.lineTo(h.x + 0.8 * c + 0.2 * d, h.y + 0.8 * u + 0.2 * p),
              t.lineTo(h.x + 0.5 * c + 0.2 * d, h.y + 0.5 * u + 0.2 * p),
              t.lineTo(h.x + 0.5 * c - 0.1 * d, h.y + 0.5 * u - 0.1 * p),
              t.stroke(),
              this.tire(t, a.x, a.y, 10 * s, s, this.rearWheel.angle),
              this.tire(t, o.x, o.y, 10 * s, s, this.frontWheel.angle);
          }
          tire(t, e, s, i, n, r) {
            t.beginPath(),
              t.arc(e, s, 10 * n, 0, 2 * Math.PI, !1),
              (t.fillStyle = "#888888"),
              t.fill(),
              (t.lineWidth = 5.9 * n),
              (t.strokeStyle = "#000000"),
              t.closePath(),
              t.stroke(),
              t.beginPath(),
              (t.lineWidth = 2 * n),
              (t.strokeStyle = "0x000000"),
              (i += 3 * n);
            for (let n = 0; n++ < 8; )
              t.moveTo(
                e + i * Math.cos(r + (6.283 * n) / 8),
                s + i * Math.sin(r + (6.283 * n) / 8)
              ),
                t.lineTo(
                  e + i * Math.cos(r + (6.283 * (n + 0.5)) / 8),
                  s + i * Math.sin(r + (6.283 * (n + 0.5)) / 8)
                );
            t.stroke(),
              t.beginPath(),
              (t.lineWidth = 2 * n),
              (t.strokeStyle = "0x000000"),
              (i -= 9 * n);
            for (let n = 0; n++ < 5; )
              t.moveTo(
                e + i * Math.cos(r + (6.283 * n) / 5),
                s + i * Math.sin(r + (6.283 * n) / 5)
              ),
                t.lineTo(
                  e + i * Math.cos(r + (6.283 * (n + 0.2)) / 5),
                  s + i * Math.sin(r + (6.283 * (n + 0.2)) / 5)
                );
            t.stroke();
          }
        }
        const St = kt.prototype;
        (St.vehicleName = "TRUCK"),
          (St.vehicleInit = St.init),
          (St.vehicleUpdate = St.update),
          (St.vehicleControl = St.control),
          (St.vehicleDraw = St.draw),
          (St.masses = null),
          (St.springs = null),
          (St.cosmetics = null),
          (St.slow = !1),
          (St.pedala = 0),
          (St.swapped = !1),
          (St.crashed = !1);
        const At = { TRUCK_GROUND: "truck_idle" },
          Pt = kt;
        s(787), s(219);
        const Mt = Math.atan2,
          It = Math.min,
          Bt = Math.floor,
          Dt = Math.random;
        class Et extends q {
          constructor(t, e, s, i) {
            super(),
              (this.color = "rgba(0,0,0,1)"),
              super.init(t),
              this.createMasses(e, i),
              this.createSprings(),
              this.updateCameraFocalPoint(),
              this.stopSounds(),
              this.propeller = 0,
              -1 === s && this.swap();
          }
          createMasses(e, s) {
            this.masses = [];
            const i = new A(),
              n = new X(new t.Z(e.x + 23, e.y), this),
              r = new X(new t.Z(e.x + -23, e.y), this);
            i.init(new t.Z(e.x + 2, e.y + -38), this);
            i.drive = this.createRagdoll.bind(this);
              (r.radius = 14),
              (n.radius = 14),
              (i.radius = 14),
              i.vel.equ(s),
              r.vel.equ(s),
              n.vel.equ(s),
              this.masses.push(i),
              this.masses.push(r),
              this.masses.push(n),
              (this.head = i),
              (this.frontWheel = n),
              (this.rearWheel = r),
              this.rotor = 0;
          }
          createSprings() {
            this.springs = [];
            const t = new N(this.head, this.rearWheel, this),
              e = new N(this.rearWheel, this.frontWheel, this),
              s = new N(this.frontWheel, this.head, this);
            (e.lrest = 45),
              (e.leff = 45),
              (e.springConstant = 0.2),
              (e.dampConstant = 0.3),
              (t.lrest = 47),
              (t.leff = 47),
              (t.springConstant = 0.2),
              (t.dampConstant = 0.3),
              (s.lrest = 45),
              (s.leff = 45),
              (s.springConstant = 0.2),
              (s.dampConstant = 0.3),
              this.springs.push(t),
              this.springs.push(e),
              this.springs.push(s),
              (this.rearSpring = t),
              (this.chasse = e),
              (this.frontSpring = s);
          }
          createRagdoll() {
            (this.ragdoll = new it(this.getStickMan(), this)),
              this.ragdoll.zero(this.head.vel, this.rearWheel.vel),
              (this.ragdoll.dir = this.dir),
              (this.rearWheel.motor = 0),
              (this.rearWheel.brake = !1),
              (this.frontWheel.brake = !1),
              (this.head.collide = !1),
              this.player.isInFocus() && !this.ignore && this.playBailSound(),
              this.dead();
          }
          playBailSound() {
            const t = this.scene.sound,
              e = It(this.speed / 50, 1);
            switch (Bt(3 * Dt()) + 1) {
              case 1:
                t.play(zt.BIKE_FALL_1, e);
                break;
              case 2:
                t.play(zt.BIKE_FALL_2, e);
                break;
              case 3:
                t.play(zt.BIKE_FALL_3, e);
            }
          }
          updateCameraFocalPoint() {
            this.focalPoint = this.ragdoll ? this.ragdoll.head : this.head;
          }
          getStickMan() {
            const e = this.dir,
              s = this.head,
              i = this.frontWheel,
              n = this.rearWheel,
              r = this.pedala,
              o = i.pos.sub(n.pos),
              a = s.pos.sub(i.pos.add(n.pos).factor(0.5)),
              h = new t.Z(o.y * e, -o.x * e),
              l = {};
            (l.head = n.pos.add(o.factor(0.35)).add(a.factor(1.2))),
              (l.lHand = l.rHand = n.pos.add(o.factor(0.8)).add(h.factor(0.68)));
            let c = l.head.sub(l.lHand);
            (c = new t.Z(c.y * e, -c.x * e)),
              (l.lElbow = l.rElbow =
                l.head
                  .add(l.lHand)
                  .factor(0.5)
                  .add(c.factor(130 / c.lenSqr()))),
              (l.waist = n.pos.add(o.factor(0.2)).add(h.factor(0.5)));
            const u = new t.Z(6 * Math.cos(r), 6 * Math.sin(r));
            l.lFoot = n.pos.add(o.factor(0.4)).add(h.factor(0.05)).add(u);
            let d = l.waist.sub(l.lFoot);
            return (
              (d = new t.Z(-d.y * e, d.x * e)),
              (l.lKnee = l.waist
                .add(l.lFoot)
                .factor(0.5)
                .add(d.factor(160 / d.lenSqr()))),
              (l.rFoot = n.pos.add(o.factor(0.4)).add(h.factor(0.05)).sub(u)),
              (d = l.waist.sub(l.rFoot)),
              (d = new t.Z(-d.y * e, d.x * e)),
              (l.rKnee = l.waist
                .add(l.rFoot)
                .factor(0.5)
                .add(d.factor(160 / d.lenSqr()))),
              l
            );
          }
          update() {
            if (
              (this.crashed || (this.updateSound(), this.control()),
              this.explosion)
            )
              this.explosion.update();
            else {
              const t = this.springs,
                e = this.masses;
              for (let e = t.length - 1; e >= 0; e--) t[e].update();
              for (let t = e.length - 1; t >= 0; t--) e[t].update();
              if (
                (this.rearWheel.contact &&
                  this.frontWheel.contact &&
                  (this.slow = !1),
                !this.slow)
              ) {
                this.crashed || this.control();
                for (let e = t.length - 1; e >= 0; e--) t[e].update();
                for (let t = e.length - 1; t >= 0; t--) e[t].update();
              }
              this.ragdoll ? this.ragdoll.update() : this.updateDrawHeadAngle();
            }
            this.updateCameraFocalPoint();
          }
          updateSound() {
            if (this.player.isInFocus() && !this.ignore) {
              this.updateSpeed();
              const t = It(this.speed / 50, 1),
                e = this.scene.sound;
              this.rearWheel.contact || this.frontWheel.contact
                ? (e.play(zt.BIKE_GROUND, t), e.stop(zt.BIKE_AIR))
                : (e.play(zt.BIKE_AIR, t), e.stop(zt.BIKE_GROUND));
            }
          }
          stopSounds() {
            const t = this.scene.sound;
            t.stop(zt.BIKE_AIR), t.stop(zt.BIKE_GROUND);
          }
          updateDrawHeadAngle() {
            const t = this.frontWheel.pos,
              e = this.rearWheel.pos;
            this.drawHeadAngle = -(Mt(t.x - e.x, t.y - e.y) - Math.PI / 2);
          }
          swap() {
            (this.dir *= -1), this.chasse.swap();
            const t = this.rearSpring.leff;
            (this.rearSpring.leff = this.frontSpring.leff),
              (this.frontSpring.leff = t);
          }
          control() {
            const t = this.gamepad,
              e = t.isButtonDown("up"),
              s = t.isButtonDown("down"),
              i = t.isButtonDown("left"),
              n = t.isButtonDown("right"),
              x = t.isButtonDown("x") && (this.scene.game.mod.getVar("crouch") || this.scene.game.mod.getVar("propeller")),
              r = t.isButtonDown("z"),
              o = e ? 1 : 0,
              a = this.rearWheel;
  
              if (this.scene.game.mod.getVar("propeller")) {
                let angle = this.frontWheel.pos.sub(this.rearWheel.pos);
                  let angleX = angle.x / angle.len();
                  let angleY = angle.y / angle.len();
  
                  this.propeller = x ? GameSettings.propeller * 0.3 : 0; // 0.3 allows GameSettings.propeller = 1 to be equal to gravity forces
                  this.windspeed = x ? GameSettings.windspeed : 0;
                  
                  let wind = 0.01 / GameSettings.propeller; // 0.01 allows wind lift to be equal to gravity forces at max velocity.x
  
                  this.head.pos.x += this.propeller * angleX; // thrust
                  this.head.pos.y += this.propeller * angleY;
                  this.rearWheel.pos.x += this.propeller * 2 * angleX;
                  this.rearWheel.pos.y += this.propeller * 2 * angleY;
  
                  this.head.pos.y -= this.windspeed * this.head.vel.x * angleX * wind; // wind
                  this.frontWheel.pos.y -= this.windspeed * this.head.vel.x * angleX * wind;
                  this.rearWheel.pos.y -= this.windspeed * this.head.vel.x * angleX * wind;
              }
  
            (a.motor += ((o - a.motor) / 10)),
              r && !this.swapped && (this.swap(), (this.swapped = !0)),
              r || (this.swapped = !1),
              e && (this.pedala += this.rearWheel.speed / 5),
              (a.brake = s),
              (this.frontWheel.brake =
                !!(this.dir > 0 && n && s) || !!(this.dir < 0 && i && s));
            let h = i ? 1 : 0;
            (h += n ? -1 : 0),
              this.rearSpring.contract(5 * h * this.dir, 5),
              this.frontSpring.contract(5 * -h * this.dir, 5),
              this.chasse.rotate(h / 8),
              !h && !x && e && (this.rearSpring.contract(-7, 5),
                this.frontSpring.contract(7, 5)),
                this.scene.game.mod.getVar("crouch") && x && (this.rearSpring.contract(-25, -20),
                this.frontSpring.contract(-25, -20));
          }
          draw() {
            if (this.explosion) this.explosion.draw(1);
            else {
              const t = this.scene.game.canvas.getContext("2d");
              if (
                ((t.imageSmoothingEnabled = !0),
                (t.mozImageSmoothingEnabled = !0),
                (t.oImageSmoothingEnabled = !0),
                (t.webkitImageSmoothingEnabled = !0),
                this.settings.developerMode)
              )
                for (const t of this.masses) t.draw();
              this.drawBikeFrame();
            }
          }
          drawBikeFrame() {
            const e = this.scene,
              s = e.game.mod.getVar("crMtb"),
              i = e.game.mod.getVar("crHead"),
              n = e.game.mod.getVar("customColors"),
              r = n ? Q(e.game.mod.getVar("vehicleColor")) : "#000",
              o = e.game.mod.getVar("blackHat"),
              a = this.frontWheel.pos.toScreen(e),
              h = this.rearWheel.pos.toScreen(e),
              l = this.head.pos.toScreen(e),
              c = e.camera.zoom,
              u = e.game.canvas.getContext("2d"),
              d = this.player._opacity,
              p = a.sub(h),
              f = Math.atan2(p.y, p.x),
              g = new t.Z((a.y - h.y) * this.dir, (h.x - a.x) * this.dir),
              m = l.sub(h).sub(p.factor(0.5)),
              v = new W(h, p, m),
              y = new W(h, p, g),
              w = s ? 3.5 : 3,
              x = y.transform(0.4, 0.05),
              b = new t.Z(
                6 * Math.cos(this.pedala + f) * c,
                6 * Math.sin(this.pedala + f) * c
              ),
              _ = new W(v.transform(0.3, 0.25), p, m),
              T = x.add(b),
              C = x.sub(b),
              k = v.transform(0.67, 0.8),
              S = _.transform(-0.05, 0.42);
            let A = T.sub(S),
              P = A.lenSqr();
            const M = new t.Z(A.y, -A.x);
            M.factorSelf(this.dir * c * c);
            const I = S.add(A.factor(0.5)).add(M.factor(200 / A.lenSqr())),
              B = T.add(A.factor(0.12)).add(M.factor(50 / P));
            (A = C.sub(S)),
              (P = A.lenSqr()),
              (M.x = A.y * this.dir),
              (M.y = -A.x * this.dir),
              M.factorSelf(c * c);
            const D = S.add(A.factor(0.5)).add(M.factor(200 / A.lenSqr())),
              E = C.add(A.factor(0.12)).add(M.factor(50 / P)),
              L = _.transform(0.1, 0.95),
              z = _.transform(0.2, 1.09),
              O = L.sub(k),
              F = O.lenSqr(),
              j = new t.Z(O.y, -O.x);
            j.factorSelf(this.dir * c * c);
            const R = k.add(O.factor(0.3)).add(j.factor(80 / F));
  
            const masses = this.masses;
              const nn = this.dir;
              let rotor = this.rotor;
              let dd = masses[1].pos.add(masses[2].pos).factor(.5);
                  dd =  masses[0].pos.sub(dd).factor(c);
  
              let pp = new t.Z(-dd.y * nn,dd.x * nn);
  
            const ff = masses[2].pos.toScreen(e);
                    rotor += 2 * this.propeller + .1, // this.propeller or masses[1].motor
                    rotor > 6.2831 && (rotor -= 6.2831),
                    this.rotor = rotor;
  
            const gg = new W(ff,pp,dd);             
  
            const mm = (.25) * Math.cos(rotor); // propeller
            if (this.scene.game.mod.getVar("propeller")) {
                    u.beginPath();  
                    u.strokeStyle = "#000000",
                    u.lineWidth = 3 * c,
                    u.lineJoin = u.lineCap = "round",
                    u.moveTo(...gg.transform(0.5, .5 + mm).toArray()),
                    u.lineTo(...gg.transform(0.5, 0.5 + -mm).toArray());    
                    u.stroke();
                    u.closePath();}
  
  
            if (
              (this.crashed ||
                ((u.strokeStyle = n
                  ? tt([...e.game.mod.getVar("riderColor"), 0.5 * d])
                  : "rgba(0,0,0," + 0.5 * d + ")"),
                (u.lineWidth = 6 * c),
                u.beginPath(),
                u.moveTo(C.x, C.y),
                u.lineTo(D.x, D.y),
                u.lineTo(S.x, S.y),
                u.stroke(),
                s ||
                  ((u.lineWidth = 4 * c),
                  u.beginPath(),
                  u.moveTo(C.x, C.y),
                  u.lineTo(E.x, E.y),
                  u.stroke())),
              (u.globalAlpha = d),
              (u.strokeStyle = "#000000"),
              (u.lineWidth = w * c),
              (u.lineCap = "round"),
              (u.lineJoin = "round"),
              u.beginPath(),
              (u.fillStyle = "rgba(200,200,200,0.2)"),
              u.arc(a.x, a.y, 12.5 * c, 0, 2 * Math.PI, !1),
              s || u.fill(),
              u.stroke(),
              u.beginPath(),
              u.arc(h.x, h.y, 12.5 * c, 0, 2 * Math.PI, !1),
              s || u.fill(),
              u.stroke(),
              s
                ? ((u.fillStyle = "rgb(128, 128, 128)"),
                  u.beginPath(),
                  u.arc(h.x, h.y, 5 * c, 0, 2 * Math.PI),
                  u.moveTo(a.x, a.y),
                  u.arc(a.x, a.y, 4 * c, 0, 2 * Math.PI),
                  u.fill())
                : ((u.strokeStyle = "rgba(153, 153, 153,1)"),
                  (u.fillStyle = "rgba(204, 204, 204,1)"),
                  (u.lineWidth = 1),
                  u.beginPath(),
                  u.arc(a.x, a.y, 6 * c, 0, 2 * Math.PI, !1),
                  u.fill(),
                  u.stroke(),
                  u.beginPath(),
                  u.arc(h.x, h.y, 6 * c, 0, 2 * Math.PI, !1),
                  u.fill(),
                  u.stroke()),
              u.beginPath(),
              (u.strokeStyle = r || "#000000"),
              (u.lineWidth = 5 * c),
              u.moveTo(h.x, h.y),
              u.lineTo(...y.transform(0.4, 0.05).toArray()),
              u.moveTo(...v.transform(0.72, 0.64).toArray()),
              u.lineTo(...v.transform(0.46, 0.4).toArray()),
              u.lineTo(...y.transform(0.4, 0.05).toArray()),
              u.stroke(),
              u.beginPath(),
              (u.lineWidth = 2 * c),
              u.moveTo(...v.transform(0.72, 0.64).toArray()),
              u.lineTo(...y.transform(0.43, 0.05).toArray()),
              u.stroke(),
              u.beginPath(),
              (u.lineWidth = 1 * c),
              u.moveTo(...v.transform(0.46, 0.4).toArray()),
              u.lineTo(...v.transform(0.28, 0.5).toArray()),
              u.stroke(),
              u.beginPath(),
              (u.lineWidth = 2 * c),
              u.moveTo(...v.transform(0.45, 0.3).toArray()),
              u.lineTo(...v.transform(0.3, 0.4).toArray()),
              u.lineTo(...v.transform(0.25, 0.6).toArray()),
              u.moveTo(...v.transform(0.17, 0.6).toArray()),
              u.lineTo(...v.transform(0.3, 0.6).toArray()),
              u.stroke(),
              u.beginPath(),
              (u.lineWidth = 3 * c),
              u.moveTo(a.x, a.y),
              u.lineTo(...v.transform(0.71, 0.73).toArray()),
              u.lineTo(...v.transform(0.73, 0.77).toArray()),
              u.lineTo(...v.transform(0.7, 0.8).toArray()),
              u.stroke(),
              u.beginPath(),
              (u.lineWidth = (s ? 2 : 1) * c),
              u.moveTo(...x.add(b).toArray()),
              u.lineTo(...x.sub(b).toArray()),
              u.stroke(),
              this.crashed)
            )
              this.ragdoll && this.ragdoll.draw();
            else {
              if (
                ((u.lineWidth = 6 * c),
                (u.strokeStyle = n ? Q(e.game.mod.getVar("riderColor")) : "#000"),
                u.beginPath(),
                u.moveTo(T.x, T.y),
                u.lineTo(I.x, I.y),
                u.lineTo(S.x, S.y),
                u.stroke(),
                s ||
                  ((u.lineWidth = 4 * c),
                  u.beginPath(),
                  u.moveTo(T.x, T.y),
                  u.lineTo(B.x, B.y),
                  u.stroke()),
                (u.lineWidth = 8 * c),
                u.beginPath(),
                u.moveTo(S.x, S.y),
                u.lineTo(L.x, L.y),
                u.stroke(),
                u.beginPath(),
                (u.lineWidth = 5 * c),
                u.beginPath(),
                u.moveTo(L.x, L.y),
                u.lineTo(R.x, R.y),
                u.lineTo(k.x, k.y),
                u.stroke(),
                i || o)
              )
                if (o)
                  u.beginPath(),
                    (u.lineWidth = 2 * c),
                    (u.fillStyle = u.strokeStyle),
                    u.arc(z.x, z.y, 5 * c, 0, 2 * Math.PI),
                    u.stroke(),
                    u.beginPath(),
                    u.moveTo(..._.transform(0.37, 1.19).toArray()),
                    u.lineTo(..._.transform(0.28, 1.17).toArray()),
                    u.lineTo(..._.transform(0.27, 1.39).toArray()),
                    u.lineTo(..._.transform(0.04, 1.34).toArray()),
                    u.lineTo(..._.transform(0.09, 1.15).toArray()),
                    u.lineTo(..._.transform(0.02, 1.14).toArray()),
                    u.stroke(),
                    u.fill();
                else {
                  const t = _.transform(0.4, 1.15),
                    e = _.transform(0.1, 1.05);
                  u.beginPath(),
                    u.arc(z.x, z.y, 5 * c, 0, 2 * Math.PI),
                    u.moveTo(t.x, t.y),
                    u.lineTo(e.x, e.y),
                    (u.lineWidth = 2 * c),
                    u.stroke();
                }
              else {
                const t = GameInventoryManager.getItem(this.cosmetics.head),
                  e = this.drawHeadAngle;
                t.draw(u, z.x, z.y, e, c, this.dir);
              }
              u.globalAlpha = 1;
            }
          }
          clone() {
            const e = new Et(this.player, new t.Z(0, 0), 1, new t.Z(0, 0));
            return (
              e.frontWheel.pos.equ(this.frontWheel.pos),
              e.frontWheel.vel.equ(this.frontWheel.vel),
              e.frontWheel.old.equ(this.frontWheel.old),
              e.rearWheel.pos.equ(this.rearWheel.pos),
              e.rearWheel.vel.equ(this.rearWheel.vel),
              e.rearWheel.old.equ(this.rearWheel.old),
              e.head.pos.equ(this.head.pos),
              e.head.vel.equ(this.head.vel),
              e.head.old.equ(this.head.old),
              (e.masses = [e.head, e.rearWheel, e.frontWheel]),
              e
            );
          }
        }
        const Lt = Et.prototype;
        (Lt.vehicleName = "MTB"),
          (Lt.masses = null),
          (Lt.springs = null),
          (Lt.cosmetics = null),
          (Lt.slow = !1),
          (Lt.pedala = 0),
          (Lt.swapped = !1),
          (Lt.ragdoll = null),
          (Lt.crashed = !1);
        const zt = {
            BIKE_GROUND: "bike_ground",
            BIKE_AIR: "bike_air",
            BIKE_FALL_1: "bike_fall_1",
            BIKE_FALL_2: "bike_fall_2",
            BIKE_FALL_3: "bike_fall_3",
          },
          Ot = Et,
          Ft = class extends A {
            constructor(e, s, i) {
              super(),
                this.init(new t.Z(e, s), i),
                (this.radius = 10),
                (this.collide = !0),
                (this.wind = !0);
            }
            update() {
              const t = this.vel,
                e = this.pos,
                s = this.old,
                i = this.parent.gravity,
                n = this.parent.gamepad,
                r = n.isButtonDown("up"),
                o = n.isButtonDown("left"),
                a = n.isButtonDown("right");
              (0 === i.x && 0 === i.y) || ((t.x = 0.9 * t.x), (t.y = 0.99 * t.y)),
                o && (e.x += -0.05),
                a && (e.x += 0.05),
                (0 === i.x && 0 === i.y) || (e.y += -0.1),
                r && (e.y += -0.5),
                this.wind && (e.x += 0.3),
                (e.x += t.x),
                (e.y += t.y),
                this.collide && this.scene.track.collide(this),
                (0 === i.x && 0 === i.y) ||
                  ((t.x = e.x - s.x), (t.y = e.y - s.y)),
                (s.x = e.x),
                (s.y = e.y);
            }
          };
        class jt extends q {
          constructor(t, e) {
            super(),
              super.init(t),
              this.createMasses(e),
              this.createSprings(),
              this.stopSounds(),
              (this.focalPoint = this.head);
          }
          createMasses(e) {
            this.masses = [];
            const s = new Ft(e.x, e.y - 10, this);
            s.radius = 30;
            const i = new A();
            i.init(new t.Z(e.x, e.y + 35), this),
              (i.friction = 0.1),
              this.masses.push(s),
              this.masses.push(i),
              (this.head = this.masses[0]),
              (this.basket = this.masses[1]),
              (this.head.drive = () => {
                this.explode();
              });
          }
          updateCameraFocalPoint() {}
          createSprings() {
            this.springs = [];
            const t = new N(this.head, this.basket, this);
            (t.springConstant = 0.2),
              (t.dampConstant = 0.2),
              (t.lrest = t.leff = 45),
              this.springs.push(t);
          }
          update() {
            if ((this.crashed || this.updateSound(), this.explosion))
              this.explosion.update();
            else {
              (this.head.wind = !this.basket.contact), (this.slow = !1);
              const t = this.springs,
                e = this.masses;
              for (let e = t.length - 1; e >= 0; e--) t[e].update();
              for (let t = e.length - 1; t >= 0; t--) e[t].update();
              for (let e = t.length - 1; e >= 0; e--) t[e].update();
              for (let t = e.length - 1; t >= 0; t--) e[t].update();
            }
          }
          updateSound() {
            if (this.player.isInFocus()) {
              const t = this.scene.sound;
              this.gamepad.isButtonDown("up")
                ? t.play(Wt.BALLOON_ON, 0.6)
                : t.stop(Wt.BALLOON_ON);
            }
          }
          stopSounds() {
            this.scene.sound.stop(Wt.BALLOON_ON);
          }
          draw() {
            if (this.explosion) this.explosion.draw(1);
            else {
              const t = this.scene.game.canvas.getContext("2d");
              if (this.settings.developerMode)
                for (const e of this.masses) e.draw(t);
              (t.globalAlpha = this.player._opacity),
                this.drawBalloon(t),
                (t.globalAlpha = 1);
            }
          }
          drawBalloon(e) {
            const s = this.scene,
              i = this.basket.pos.toScreen(s),
              n = this.head.pos.toScreen(s),
              r = s.camera.zoom,
              o = n.sub(i).normalize(46 * r),
              a = new t.Z(-o.y, o.x),
              h = (29 / 46) * Math.sin((37 * Math.PI) / 180),
              l = (-29 / 46) * Math.cos((37 * Math.PI) / 180),
              c = (29 / 46) * Math.sin((16.65 * Math.PI) / 180),
              u = (-29 / 46) * Math.cos((16.65 * Math.PI) / 180);
            e.save(),
              (e.strokeStyle = "#999999"),
              (e.lineWidth = Math.max(2 * r, 1)),
              e.beginPath(),
              e.moveTo(i.x + 0.1 * a.x, i.y + 0.1 * a.y),
              e.lineTo(n.x + a.x * h + o.x * l, n.y + a.y * h + o.y * l),
              e.moveTo(i.x - 0.1 * a.x, i.y - 0.1 * a.y),
              e.lineTo(n.x - a.x * h + o.x * l, n.y - a.y * h + o.y * l),
              e.moveTo(i.x + 0.1 * a.x, i.y + 0.1 * a.y),
              e.lineTo(n.x + a.x * c + o.x * u, n.y + a.y * c + o.y * u),
              e.moveTo(i.x - 0.1 * a.x, i.y - 0.1 * a.y),
              e.lineTo(n.x - a.x * c + o.x * u, n.y - a.y * c + o.y * u),
              e.closePath(),
              e.stroke(),
              e.beginPath(),
              e.arc(n.x, n.y, 30 * r, 0, 2 * Math.PI),
              (e.fillStyle = "#000000"),
              e.fill(),
              this.gamepad.isButtonDown("up") &&
                (e.beginPath(),
                (e.strokeStyle = "#FFFF00"),
                (e.lineWidth = 8 * r),
                e.moveTo(i.x, i.y),
                e.lineTo(i.x + 0.1 * o.x, i.y + 0.1 * o.y),
                e.closePath(),
                e.stroke(),
                e.beginPath(),
                (e.strokeStyle = "#FFAA00"),
                (e.lineWidth = 3 * r),
                e.moveTo(i.x, i.y),
                e.lineTo(i.x + 0.1 * o.x, i.y + 0.1 * o.y),
                e.closePath(),
                e.stroke()),
              e.beginPath(),
              (e.fillStyle = "#000000"),
              e.moveTo(i.x + 0.1 * a.x, i.y + 0.1 * a.y),
              e.lineTo(i.x - 0.1 * a.x, i.y - 0.1 * a.y),
              e.lineTo(
                i.x - 0.22 * o.x - 0.1 * a.x,
                i.y - 0.22 * o.y - 0.1 * a.y
              ),
              e.lineTo(
                i.x - 0.22 * o.x + 0.1 * a.x,
                i.y - 0.22 * o.y + 0.1 * a.y
              ),
              e.lineTo(i.x + 0.1 * a.x, i.y + 0.1 * a.y),
              e.closePath(),
              e.fill(),
              e.restore();
          }
        }
        const Rt = jt.prototype;
        (Rt.vehicleName = "BALLOON"),
          (Rt.head = null),
          (Rt.basket = null),
          (Rt.masses = null),
          (Rt.springs = null),
          (Rt.slow = !1),
          (Rt.vehicleInit = Rt.init),
          (Rt.crashed = !1);
        const Wt = { BALLOON_ON: "balloon_on" },
          Vt = jt;
        class Ht extends q {
          constructor(t, e) {
            super(),
              this.init(t),
              this.createMasses(e),
              this.createSprings(),
              this.stopSounds();
          }
          createMasses(e) {
            const s = [];
            s.push(new X(new t.Z(e.x + 15, e.y + 40), this)),
              s.push(new X(new t.Z(e.x + -15, e.y + 40), this)),
              s.push(new X(new t.Z(e.x + -15, e.y + 10), this)),
              s.push(new X(new t.Z(e.x + 15, e.y + 10), this));
            const i = new A();
            i.init(new t.Z(0, 0), this),
              (i.vel = new t.Z(0, 0)),
              (this.m0 = s[0]),
              (this.m1 = s[1]),
              (this.m2 = s[2]),
              (this.m3 = s[3]),
              (this.head = i),
              (this.masses = s),
              (this.focalPoint = this.head);
          }
          createSprings() {
            const t = this.masses,
              e = [];
            e.push((this.spring0 = new N(t[0], t[1], this))),
              e.push((this.spring1 = new N(t[1], t[2], this))),
              e.push((this.spring2 = new N(t[2], t[3], this))),
              e.push((this.spring3 = new N(t[3], t[0], this))),
              e.push((this.spring4 = new N(t[0], t[2], this))),
              e.push((this.spring5 = new N(t[1], t[3], this)));
            for (const t of e) (t.springConstant = 0.2), (t.dampConstant = 0.2);
            this.springs = e;
          }
          update() {
            if (
              (this.crashed || (this.updateSound(), this.control()),
              this.explosion)
            )
              this.explosion.update();
            else {
              const t = this.masses,
                e = this.springs;
              for (let t = e.length - 1; t >= 0; t--) e[t].update();
              for (let e = t.length - 1; e >= 0; e--) t[e].update();
              if (
                ((t[0].contact || t[1].contact || t[2].contact || t[3].contact) &&
                  (this.slow = !1),
                !this.slow)
              ) {
                this.control();
                for (let t = e.length - 1; t >= 0; t--) e[t].update();
                for (let e = t.length - 1; e >= 0; e--) t[e].update();
              }
              let s = 0,
                i = 0;
              for (const e of t) (s += e.pos.x), (i += e.pos.y);
              const n = this.head;
              (n.pos.x = 0.25 * s), (n.pos.y = 0.25 * i), (n.vel = t[0].vel);
            }
          }
          updateSound() {
            this.player.isInFocus() && this.scene.sound.play(Zt.BLOB, 0.4);
          }
          stopSounds() {
            this.scene.sound.stop(Zt.BLOB);
          }
          updateCameraFocalPoint() {}
          control() {
            const t = this.player.getGamepad(),
              e = t.isButtonDown("up"),
              s = t.isButtonDown("down"),
              i = t.isButtonDown("left"),
              n = t.isButtonDown("right"),
              r = t.isButtonDown("z"),
              o = this.masses,
              a = this.springs,
              h = n ? 1 : -1;
            let l = n || i ? 1 : 0;
            s && (l = 0);
            for (const t of o)
              (t.motor += (l * h - t.motor) / 10),
                0 === l && (t.motor = 0),
                (t.brake = s);
            let c = i ? 1 : 0;
            if (
              ((c += n ? -1 : 0), a[4].rotate(c / 9), a[5].rotate(c / 9), r || e)
            )
              for (let t = a.length - 1; t >= 0; t--) a[t].contract(30, 10);
            else for (let t = a.length - 1; t >= 0; t--) a[t].contract(0, 1.5);
          }
          draw() {
            if (this.explosion) this.explosion.draw(1);
            else {
              const t = this.scene.game.canvas.getContext("2d"),
                e = this.scene,
                s = e.camera.zoom,
                i = new Array(4);
              for (let t = 0; t < 4; t++) i[t] = this.masses[t].pos.toScreen(e);
              let n = [i[0]],
                r = 0;
              const o = [null, null];
              let a;
              for (let t = 0; t < i.length; t++)
                for (let e = t + 1; e < i.length; e++)
                  (a = i[t].sub(i[e]).lenSqr()),
                    a > r && ((r = a), (o[0] = i[t]), (o[1] = i[e]));
              if (0 !== r) {
                i.splice(i.indexOf(o[0]), 1), i.splice(i.indexOf(o[1]), 1);
                const t = o[1].sub(o[0]).cross(i[0].sub(o[0])),
                  e = o[1].sub(o[0]).cross(i[1].sub(o[0]));
                if (Math.sign(t) !== Math.sign(e)) n = [o[0], i[0], o[1], i[1]];
                else {
                  const s = Math.abs(t) > Math.abs(e) ? i[0] : i[1],
                    r = s === i[0] ? i[1] : i[0],
                    a = o[1].sub(o[0]).dot(s.sub(o[0])),
                    h = o[1].sub(o[0]).dot(r.sub(o[0]));
                  let l = o[1],
                    c = o[0];
                  a > h && ((l = o[0]), (c = o[1])),
                    (n =
                      Math.sign(l.sub(r).cross(s.sub(r))) ===
                      Math.sign(t) * (a > h ? -1 : 1)
                        ? [c, s, l]
                        : [c, s, r, l]);
                }
              }
              (t.globalAlpha = this.player._opacity),
                t.beginPath(),
                (t.strokeStyle = "#000"),
                (t.fillStyle = "#000"),
                (t.lineJoin = "round"),
                (t.lineWidth = 20 * s),
                t.moveTo(n[0].x, n[0].y);
              for (let e = 1; e < n.length; e++) t.lineTo(n[e].x, n[e].y);
              t.lineTo(n[0].x, n[0].y), t.fill(), t.stroke(), (t.globalAlpha = 1);
            }
          }
        }
        const Nt = Ht.prototype;
        (Nt.vehicleName = "Blob"),
          (Nt.masses = null),
          (Nt.springs = null),
          (Nt.slow = !1);
        const Zt = { BLOB: "blob_sound" },
          Ut = Ht,
          qt = Math.sqrt,
          Gt = Math.pow,
          Yt = Math.max,
          Xt = {};
        (Xt.BMX = ut),
          (Xt.MTB = Ot),
          (Xt.HELI = xt),
          (Xt.TRUCK = Pt),
          (Xt.HELI = xt),
          (Xt.BALLOON = Vt),
          (Xt.BLOB = Ut);
        let Kt = 0;
        function Jt(t, e) {
          for (const s in e)
            try {
              t[s] = e[s].constructor == Object ? Jt(t[s], e[s]) : e[s];
            } catch (i) {
              t[s] = e[s];
            }
          return t;
        }
        const $t = class {
          constructor(t) {
            (this.scene = t),
              (this.game = t.game),
              (this.settings = t.settings),
              (this.firstPlayer = null),
              (this._players = []),
              (this._playerLookup = {});
          }
          update() {
            for (const t of this._players) t.update();
          }
          mutePlayers() {
            for (const t of this._players) t.getActiveVehicle().stopSounds();
          }
          updateGamepads() {
            for (const t of this._players) t._gamepad.update();
          }
          createPlayer(e, s) {
            return new (class {
              constructor(e, s) {
                (this.id = Kt++),
                  (this._scene = e),
                  (this._game = e.game),
                  (this._user = s),
                  (this._settings = e.settings);
                let i = e.settings.startVehicle;
                e.settings.track && (i = e.settings.track.vehicle),
                  (this._baseVehicleType = i),
                  (this._gamepad = new C(e)),
                  (this._ghost = !1),
                  (this._color = s.color ? s.color : "#000000"),
                  this.setDefaults(),
                  this.createBaseVehicle(new t.Z(0, 35), 1, new t.Z(0, 0)),
                  (this.deadVehiclesIndex = 0),
                  (this.deadVehicles = new Array(10));
              }
              getCheckpointCount() {
                return this._checkpoints.length;
              }
              setDefaults() {
                (this._baseVehicle = !1),
                  (this._tempVehicleType = null),
                  (this._tempVehicle = !1),
                  (this._tempVehicleTicks = 0),
                  (this._temp_vehicle_options = null),
                  (this._addCheckpoint = !1),
                  (this._checkpoints = []),
                  (this._crashed = !1),
                  (this._effect = !1),
                  (this._effectTicks = 0),
                  (this._opacity = 1),
                  (this.complete = !1),
                  (this._powerupsConsumed = {
                    checkpoints: [],
                    targets: [],
                    misc: [],
                  });
              }
              hasCheckpoints() {
                return this._checkpoints.length > 0;
              }
              setColor(t) {
                this._color = t;
              }
              dead() {
                if (((this._crashed = !0), !1 === this._ghost)) {
                  const t = this._scene,
                    e = t.settings,
                    s = t.message;
                  (t.state.playerAlive = this.isAlive()),
                    this._checkpoints.length > 0
                      ? e.mobile
                        ? s.show(
                            "Tap to go to checkpoint!",
                            !1,
                            "#000000",
                            "#FFFFFF"
                          )
                        : s.show(
                            "Press Enter For Checkpoint",
                            !1,
                            "#000000",
                            "#FFFFFF"
                          )
                      : e.mobile
                      ? s.show("Tap to Restart!", !1, "#000000", "#FFFFFF")
                      : s.show(
                          "Press Enter To Restart",
                          !1,
                          "#000000",
                          "#FFFFFF"
                        );
                }
              }
              setAsGhost() {
                this._ghost = !0;
              }
              isGhost() {
                return this._ghost;
              }
              isAlive() {
                return !this._crashed;
              }
              getTargetsHit() {
                return this._powerupsConsumed.targets.length;
              }
              getGamepad() {
                return this._gamepad;
              }
              setBaseVehicle(t) {
                (this._baseVehicleType = t), this.reset();
              }
              createBaseVehicle(t, e, s) {
                this._tempVehicle && this._tempVehicle.stopSounds(),
                  (this._baseVehicle = new Xt[this._baseVehicleType](
                    this,
                    t,
                    e,
                    s
                  )),
                  (this._tempVehicle = !1),
                  (this._tempVehicleType = !1),
                  (this._tempVehicleTicks = 0);
              }
              setTempVehicle(t, e, s, i) {
                this._temp_vehicle_options &&
                  this._temp_vehicle_options.type === t &&
                  (e += this._temp_vehicle_options.ticks),
                  (this._temp_vehicle_options = {
                    type: t,
                    ticks: e,
                    position: s,
                    direction: i,
                  });
              }
              createTempVehicle(t, e, s, i) {
                if (this._temp_vehicle_options) {
                  const n = this._temp_vehicle_options;
                  (t = n.type),
                    (e = n.ticks),
                    (s = n.position),
                    (i = n.direction),
                    (this._temp_vehicle_options = null);
                }
                this._tempVehicleType === t
                  ? (this._tempVehicleTicks += e)
                  : (this.getActiveVehicle().stopSounds(),
                    (this._effect = new R(s, this._scene)),
                    (this._effectTicks = 45),
                    (this._tempVehicleType = t),
                    (this._tempVehicle = new Xt[t](this, s, i)),
                    (this._tempVehicleTicks = e));
              }
              update() {
                if (!this.complete || !this._scene.settings.track) {
                  let t = this._baseVehicle;
                  this._temp_vehicle_options && this.createTempVehicle(),
                    this._tempVehicleTicks > 0 &&
                      ((t = this._tempVehicle),
                      this._crashed || this._tempVehicleTicks--,
                      this._tempVehicleTicks <= 0 &&
                        !this._crashed &&
                        ((this._effectTicks = 45),
                        (this._effect = new R(
                          this._tempVehicle.focalPoint.pos,
                          this._scene
                        )),
                        this.createBaseVehicle(
                          this._tempVehicle.focalPoint.pos,
                          this._tempVehicle.dir,
                          this._tempVehicle.masses[0].vel
                        ),
                        (t = this._baseVehicle))),
                    this._effectTicks > 0 &&
                      (this._effectTicks--, this._effect.update()),
                    t.update();
                  for (let t = 0; t < this.deadVehicles.length; t++)
                    this.deadVehicles[t] && this.deadVehicles[t].update();
                  this._addCheckpoint &&
                    (this._createCheckpoint(), (this._addCheckpoint = !1));
                }
              }
              isInFocus() {
                const t = this._scene.camera;
                let e = !1;
                return t.playerFocus && t.playerFocus === this && (e = !0), e;
              }
              updateOpacity() {
                let t = 1;
                const e = this._scene.camera;
                if (e.playerFocus && e.playerFocus !== this) {
                  const s = this.getDistanceBetweenPlayers(e.playerFocus);
                  s < 1200 && (t = Math.min(s / 500, 1));
                }
                this._opacity = t;
              }
              drawName() {
                const t = this._scene,
                  e = this._color,
                  s = this._user.d_name,
                  i = t.game,
                  n = t.camera.zoom,
                  r = i.pixelRatio,
                  o = i.canvas.getContext("2d"),
                  a = this._opacity,
                  h = this.getActiveVehicle().focalPoint.pos.toScreen(t);
                (o.globalAlpha = a),
                  o.beginPath(),
                  (o.fillStyle = e),
                  o.moveTo(h.x, h.y - 40 * n),
                  o.lineTo(h.x - 5 * n, h.y - 50 * n),
                  o.lineTo(h.x + 5 * n, h.y - 50 * n),
                  o.lineTo(h.x, h.y - 40 * n),
                  o.fill();
                const l = 9 * r * Yt(n, 1);
                (o.font = l + "pt helsinki"),
                  (o.textAlign = "center"),
                  (o.fillStyle = e),
                  o.fillText(s, h.x, h.y - 60 * n),
                  (o.globalAlpha = 1);
              }
              draw() {
                this.updateOpacity();
                let t = this._baseVehicle;
                this._tempVehicleTicks > 0 && (t = this._tempVehicle),
                  this._effectTicks > 0 &&
                    this._effect.draw(this._effectTicks / 100),
                  t.draw();
                for (let t = 0; t < this.deadVehicles.length; t++)
                  this.deadVehicles[t] && this.deadVehicles[t].draw();
                this.isGhost() && this.drawName();
              }
              checkKeys() {
                const t = this._gamepad,
                  e = this._ghost,
                  s = this._scene;
                if (
                  (e ||
                    (t.areKeysDown() && !this._crashed && s.play(),
                    t.isButtonDown("restart") &&
                      ((s.restartTrack = !0), t.setButtonUp("restart")),
                    (t.isButtonDown("up") ||
                      t.isButtonDown("down") ||
                      t.isButtonDown("left") ||
                      t.isButtonDown("right")) &&
                      s.camera.focusOnMainPlayer()),
                  t.isButtonDown("enter") &&
                    (this.gotoCheckpoint(), t.setButtonUp("enter")),
                  t.isButtonDown("backspace"))
                ) {
                  const e = t.getButtonDownOccurances("backspace");
                  this.removeCheckpoint(e), t.setButtonUp("backspace");
                }
              }
              getDistanceBetweenPlayers(t) {
                const e = this.getActiveVehicle(),
                  s = t.getActiveVehicle();
                return qt(
                  Gt(s.focalPoint.pos.x - e.focalPoint.pos.x, 2) +
                    Gt(s.focalPoint.pos.y - e.focalPoint.pos.y, 2)
                );
              }
              getActiveVehicle() {
                let t = this._baseVehicle;
                return this._tempVehicleTicks > 0 && (t = this._tempVehicle), t;
              }
              _createCheckpoint() {
                const t = {};
                this._tempVehicleTicks > 0
                  ? ((t._tempVehicleType = this._tempVehicleType),
                    (t._tempVehicle = JSON.stringify(
                      this._tempVehicle,
                      this._snapshotFilter
                    )),
                    (t._tempVehicleTicks = this._tempVehicleTicks))
                  : ((t._baseVehicleType = this._baseVehicleType),
                    (t._baseVehicle = JSON.stringify(
                      this._baseVehicle,
                      this._snapshotFilter
                    ))),
                  (t._powerupsConsumed = JSON.stringify(this._powerupsConsumed)),
                  (t._crashed = this._crashed),
                  this._checkpoints.push(t);
              }
              _snapshotFilter(t, e) {
                switch (t) {
                  case "parent":
                  case "player":
                  case "scene":
                  case "settings":
                  case "masses":
                  case "springs":
                  case "focalPoint":
                  case "gamepad":
                    return;
                  case "explosion":
                    return !1;
                  default:
                    return e;
                }
              }
              setCheckpointOnUpdate() {
                this._addCheckpoint = !0;
              }
              crashed() {
                this._crashed = !0;
              }
              gotoCheckpoint() {
                const t = this._gamepad.replaying,
                  e = this._scene;
                if (this._checkpoints.length > 0) {
                  const s = this._checkpoints[this._checkpoints.length - 1];
                  if (s._tempVehicle) {
                    this._baseVehicle.stopSounds();
                    let t = this._tempVehicle;
                    this._tempVehicleType !== s._tempVehicleType &&
                      (t = new Xt[s._tempVehicleType](this, { x: 0, y: 0 })),
                      Jt(t, JSON.parse(s._tempVehicle)),
                      (this._tempVehicle = t),
                      (this._tempVehicleType = s._tempVehicleType),
                      (this._tempVehicleTicks = s._tempVehicleTicks),
                      t.updateCameraFocalPoint();
                  } else {
                    const t = this._baseVehicle,
                      e = JSON.parse(s._baseVehicle);
                    let i = t;
                    if (
                      this._game.mod.getVar("keepDeadRiders") &&
                      !this._tempVehicle
                    ) {
                      const e = t.clone();
                      (t.ignore = !0),
                        (t.gamepad = t.gamepad.clone()),
                        (this.deadVehicles[this.deadVehiclesIndex] = t),
                        (this.deadVehiclesIndex =
                          (this.deadVehiclesIndex + 1) %
                          this.deadVehicles.length),
                        (i = e);
                    }
                    Jt(i, e),
                      i.ragdoll && delete i.ragdoll,
                      this._tempVehicle && this._tempVehicle.stopSounds(),
                      (this._baseVehicle = i),
                      (this._tempVehicleTicks = 0),
                      (this._tempVehicleType = !1),
                      i.updateCameraFocalPoint();
                  }
                  if (
                    ((this._powerupsConsumed = JSON.parse(s._powerupsConsumed)),
                    (this._crashed = s._crashed),
                    !t)
                  ) {
                    const t = e.settings;
                    (e.state.playerAlive = this.isAlive()),
                      e.settings.mobile
                        ? e.message.show("Tap to resume", 5, "#826cdc", "#FFFFFF")
                        : e.message.show(
                            "Press Backspace To Go Back Further",
                            5,
                            "#826cdc",
                            "#FFFFFF"
                          ),
                      e.track.updatePowerupState(this),
                      t.waitAtCheckpoints && (e.state.playing = !1),
                      e.camera.focusOnMainPlayer();
                  }
                  e.camera.playerFocus === this && e.camera.fastforward();
                } else t || this.restartScene();
              }
              restartScene() {
                if (
                  !this._gamepad.replaying &&
                  ((this._scene.restartTrack = !0),
                  this._game.mod.getVar("keepDeadRiders") && !this._tempVehicle)
                ) {
                  const t = this._baseVehicle,
                    e = t.clone();
                  (t.gamepad = t.gamepad.clone()),
                    (this._baseVehicle = e),
                    (t.ignore = !0),
                    (this.deadVehicles[this.deadVehiclesIndex] = t),
                    (this.deadVehiclesIndex =
                      (this.deadVehiclesIndex + 1) % this.deadVehicles.length);
                }
              }
              removeCheckpoint(t) {
                if (this._checkpoints.length > 1) {
                  for (let e = 0; e < t; e++) this._checkpoints.pop();
                  this.gotoCheckpoint();
                } else this.restartScene();
              }
              close() {
                (this.id = null),
                  (this._scene = null),
                  (this._game = null),
                  (this._user = null),
                  (this._settings = null),
                  (this._baseVehicleType = null),
                  this._gamepad.close(),
                  (this._gamepad = null),
                  (this._baseVehicle = null),
                  (this._tempVehicleType = null),
                  (this._tempVehicle = null),
                  (this._tempVehicleTicks = null),
                  (this._addCheckpoint = null),
                  (this._checkpoints = null),
                  (this._crashed = null),
                  (this._effect = null),
                  (this._effectTicks = null),
                  (this._powerupsConsumed = null);
              }
              reset() {
                this._tempVehicle && this._tempVehicle.stopSounds(),
                  this._baseVehicle.stopSounds(),
                  this.setDefaults(),
                  this.createBaseVehicle(new t.Z(0, 35), 1, new t.Z(0, 0)),
                  this._gamepad.reset(),
                  (this._scene.state.playerAlive = this.isAlive());
              }
            })(e, s);
          }
          addPlayer(t) {
            this._players.push(t), (this._playerLookup[t.id] = t);
          }
          checkKeys() {
            for (const t of this._players) t.checkKeys();
          }
          draw() {
            for (const t of this._players) t.draw();
          }
          getPlayerByIndex(t) {
            return this._players[t];
          }
          getPlayerById(t) {
            return this._playerLookup[t];
          }
          getPlayerCount() {
            return this._players.length;
          }
          reset() {
            for (const t of this._players) t.reset();
          }
          clear() {
            (this._players = []),
              (this._playerLookup = {}),
              this._players.push(this.firstPlayer),
              (this._playerLookup[this.firstPlayer.id] = this.firstPlayer);
          }
          _closePlayers() {
            for (const t of this._players) t.close();
          }
          close() {
            this._closePlayers(),
              (this._players = null),
              (this.firstPlayer = null),
              (this._playerLookup = null),
              (this.scene = null),
              (this.game = null),
              (this.settings = null);
          }
        };
        var Qt = s(939),
          te = s.n(Qt);
        const ee = Math.sqrt,
          se = Math.pow;
        class ie {
          constructor() {}
          init(t) {
            (this.game = t.scene.game),
              (this.scene = t.scene),
              (this.settings = this.game.settings),
              (this.remove = 0);
          }
          getCode() {}
          recache(t) {
            this.constructor.drawData.dirty = !1;
            const e = this.constructor.drawData.canvas;
            (e.width = Math.ceil(this.constructor.drawData.width * t)),
              (e.height = Math.ceil(this.constructor.drawData.height * t));
            const s = e.getContext("2d");
            this.drawPowerup(t, s),
              this.settings.developerMode &&
                (s.beginPath(),
                s.rect(0, 0, e.width, e.height),
                (s.strokeStyle = "#F008"),
                (s.lineWidth = 1 * t),
                s.stroke());
          }
          setDirty(t) {
            this.constructor.drawData.dirty = t;
          }
          draw(t, e, s, i) {
            const n = this.game.mod.getVar("fadedVehiclePowerups");
            if (!this.hit || n) {
              this.constructor.drawData.dirty && this.recache(s);
              const n = this.constructor.drawData.width * s,
                r = this.constructor.drawData.height * s;
              i.save(),
                this.hit && (i.globalAlpha = 0.3),
                i.drawImage(
                  this.constructor.drawData.canvas,
                  t - n / 2,
                  e - r / 2,
                  n,
                  r
                ),
                i.restore();
            }
          }
          erase(t, e) {
            let s = !1;
            return (
              0 === this.remove &&
                e >= ee(se(t.x - this.x, 2) + se(t.y - this.y, 2)) &&
                ((s = [this]), (this.remove = 1), this.redrawSectors()),
              s
            );
          }
          redrawSectors() {
            this.sector && (this.sector.powerupCanvasDrawn = !1);
          }
          markSectorsDirty() {
            this.sector.dirty = !0;
          }
          collide(t) {
            const e = t.pos.x - this.x,
              s = t.pos.y - this.y,
              i = ee(se(e, 2) + se(s, 2));
            !this.hit &&
              26 > i &&
              ((this.hit = !0), (this.sector.powerupCanvasDrawn = !1));
          }
          addSectorReference(t) {
            this.sector = t;
          }
        }
        (ie.prototype.scene = null),
          (ie.prototype.angle = 0),
          (ie.prototype.x = 0),
          (ie.prototype.y = 0),
          (ie.prototype.name = null),
          (ie.prototype.sector = null),
          (ie.prototype.settings = null),
          (ie.prototype.remove = 0);
        const ne = ie;
        function re(t, e, s) {
          const i = t.canvas;
          t.scale(i.width / e.width, i.height / e.height),
            t.arc(e.width / 2, e.height / 2, 7, 0, 2 * Math.PI),
            t.closePath(),
            (t.strokeStyle = "#000000"),
            (t.fillStyle = s),
            (t.lineWidth = 2),
            t.fill(),
            t.stroke();
        }
        function oe(t, e, s) {
          const i = t.canvas;
          t.save(),
            t.scale(i.width / e.width, i.height / e.height),
            t.translate(e.width / 2, e.height / 2),
            t.beginPath(),
            t.moveTo(-10, -7),
            t.lineTo(-10, 7),
            t.lineTo(10, 0),
            t.closePath(),
            (t.lineWidth = 2),
            (t.lineJoin = "round"),
            (t.fillStyle = s),
            (t.strokeStyle = "#000000"),
            t.fill(),
            t.stroke(),
            t.restore();
        }
        const ae = Math.sqrt,
          he = Math.pow,
          le = Math.random;
        class ce extends ne {
          constructor(t, e, s) {
            super(),
              (this.x = t),
              (this.y = e),
              (this.hit = !1),
              (this.id = le().toString(36).substr(2)),
              this.init(s);
          }
          getCode() {
            return "T " + this.x.toString(32) + " " + this.y.toString(32);
          }
          recache(t) {
            (pe = !1), this.cacheStar(t), this.cacheEmptyStar(t);
          }
          cacheStar(t) {
            const e = ue.canvas;
            (e.width = ue.width * t), (e.height = ue.height * t);
            const s = e.getContext("2d");
            this.drawStar(e.width / 2, e.height / 2, 5, 10, 5, !0, t, s),
              this.settings.developerMode &&
                (s.beginPath(),
                s.rect(0, 0, e.width, e.height),
                (s.strokeStyle = "red"),
                (s.strokeWidth = 1 * t),
                s.stroke());
          }
          cacheEmptyStar(t) {
            const e = de.canvas;
            (e.width = ue.width * t), (e.height = ue.height * t);
            const s = e.getContext("2d");
            this.drawStar(e.width / 2, e.height / 2, 5, 10, 5, !1, t, s),
              this.settings.developerMode &&
                (s.beginPath(),
                s.rect(0, 0, e.width, e.height),
                (s.strokeStyle = "red"),
                (s.strokeWidth = 1 * t),
                s.stroke());
          }
          setDirty(t) {
            pe = t;
          }
          draw(t, e, s, i) {
            if (this.hit)
              if (this.game.mod.getVar("crPowerups")) {
                pe && this.recache(s);
                const n = ue.width * s,
                  r = ue.height * s,
                  o = n / 2,
                  a = r / 2;
                i.save(),
                  (i.globalAlpha = 0.4),
                  i.drawImage(ue.canvas, t - o, e - a, n, r),
                  i.restore(0);
              } else {
                const n = de.width * s,
                  r = de.height * s,
                  o = n / 2,
                  a = r / 2;
                i.drawImage(de.canvas, t - o, e - a, n, r);
              }
            else {
              pe && this.recache(s);
              const n = ue.width * s,
                r = ue.height * s,
                o = n / 2,
                a = r / 2;
              i.drawImage(ue.canvas, t - o, e - a, n, r);
            }
          }
          drawStar(t, e, s, i, n, r, o, a) {
            if (this.game.mod.getVar("crPowerups"))
              re(a, ue, r ? "#ff0" : "#ffa");
            else {
              var h = (Math.PI / 2) * 3,
                l = t,
                c = e,
                u = Math.PI / s;
              (i *= o),
                (n *= o),
                (a.strokeSyle = "#000"),
                a.beginPath(),
                a.moveTo(t, e - i);
              for (let r = 0; s > r; r++)
                (l = t + Math.cos(h) * i),
                  (c = e + Math.sin(h) * i),
                  a.lineTo(l, c),
                  (h += u),
                  (l = t + Math.cos(h) * n),
                  (c = e + Math.sin(h) * n),
                  a.lineTo(l, c),
                  (h += u);
              a.lineTo(t, e - i),
                a.closePath(),
                (a.lineWidth = Math.max(2 * o, 1)),
                (a.strokeStyle = "black"),
                a.stroke(),
                (a.fillStyle = r ? "#FAE335" : "#FFFFFF"),
                a.fill();
            }
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            if (!e.ignore) {
              const i = ae(he(t.pos.x - this.x, 2) + he(t.pos.y - this.y, 2)),
                n = s._powerupsConsumed.targets,
                r = this.scene;
              if (i < 26 && e.alive && !n.includes(this.id)) {
                n.push(this.id);
                const t = n.length,
                  e = r.track.targetCount;
                s.isGhost() ||
                  ((this.hit = !0),
                  (this.sector.powerupCanvasDrawn = !1),
                  r.sound.play("goal_sound"),
                  r.message.show(
                    t + " of " + e + " Stars",
                    50,
                    "#FAE335",
                    "#666666"
                  )),
                  t >= e && (s.complete = !0);
              }
            }
          }
          erase(t, e) {
            const s = super.erase(t, e);
            return s && this.scene.track.targetCount--, s;
          }
        }
        const ue = {
            canvas: document.createElement("canvas"),
            width: 35,
            height: 35,
          },
          de = {
            canvas: document.createElement("canvas"),
            width: 35,
            height: 35,
          };
        let pe = !0;
        const fe = ce.prototype;
        (fe.x = 0),
          (fe.y = 0),
          (fe.name = "goal"),
          (fe.hit = !1),
          (fe.superErase = fe.erase);
        const ge = ce,
          me = Math.floor;
        class ve {
          constructor(e) {
            (this.currentTool = ""),
              (this.scene = e),
              (this.camera = e.camera),
              (this.mouse = e.mouse),
              (this.mouse.updateCallback = this.draw.bind(this)),
              (this.gamepad = e.playerManager.firstPlayer.getGamepad()),
              (this.tools = {}),
              (this.options = e.settings.toolHandler),
              (this.snapPoint = new t.Z()),
              this.snapPoint.equ(this.scene.track.defaultLine.p2),
              (this.gridCache = !1),
              this.initAnalytics(),
              (this.actionTimeline = []),
              (this.actionTimelinePointer = 0);
          }
          initAnalytics() {
            this.analytics = { actions: 0 };
          }
          enableGridUse() {
            this.gridUseEnabled = !0;
          }
          getToolOptions() {
            return this.tools[this.currentTool].getOptions();
          }
          setToolOption(t, e, s) {
            void 0 !== s && void 0 !== this.tools[s]
              ? this.tools[s].setOption(t, e)
              : this.tools[this.currentTool].setOption(t, e),
              this.scene.stateChanged();
          }
          registerTool(t) {
            const e = new t(this),
              s = e.name.toLowerCase();
            this.tools[s] = e;
          }
          setTool(t) {
            (t = t.toLowerCase()),
              this.currentTool !== t &&
                (this.resetTool(),
                (this.currentTool = t),
                this.scene.stateChanged(),
                this.analytics.actions++);
          }
          addActionToTimeline(t) {
            const e = [];
            this.actionTimelinePointer >= 50 &&
              (e.push(
                ...this.actionTimeline.splice(
                  0,
                  this.actionTimeline.length - 50 + 1
                )
              ),
              (this.actionTimelinePointer = 49));
            const s = e.length;
            e.push(...this.actionTimeline.splice(this.actionTimelinePointer)),
              this.actionTimeline.push(t),
              this.actionTimelinePointer++;
            for (let t = 0; t < e.length; t++) {
              const i = e[t];
              if (i.type === (t < s ? "remove" : "add")) {
                this.scene.track.needsCleaning = !0;
                for (const t of i.objects) (t.remove = 2), t.markSectorsDirty();
              }
            }
          }
          revertAction() {
            if (this.actionTimelinePointer > 0) {
              this.actionTimelinePointer--;
              const t = this.actionTimeline[this.actionTimelinePointer];
              switch (t.type) {
                case "add":
                  this.removeObjects(t.objects);
                  break;
                case "remove":
                  this.addObjects(t.objects);
              }
            }
          }
          applyAction() {
            const t = this.actionTimeline,
              e = this.actionTimelinePointer;
            if (e < t.length) {
              const t = this.actionTimeline[e];
              switch (((this.actionTimelinePointer = e + 1), t.type)) {
                case "add":
                  this.addObjects(t.objects);
                  break;
                case "remove":
                  this.removeObjects(t.objects);
              }
            }
          }
          removeObjects(t) {
            for (const e of t)
              (e.remove = 1),
                e.redrawSectors(),
                e instanceof ge && this.scene.track.targetCount--;
          }
          addObjects(t) {
            const e = this.scene.track;
            for (const s of t)
              (s.remove = 0),
                s.redrawSectors(),
                s instanceof ge && ((e.dirty = !0), e.targetCount++);
          }
          resetTool() {
            "" !== this.currentTool && this.tools[this.currentTool].reset();
          }
          update() {
            this.checkGrid(),
              this.mouse.enabled && this.tools[this.currentTool].update(),
              this.checkHotkeys(),
              this.checkMouse(),
              this.checkSnap();
          }
          checkGrid() {
            const t = this.scene.camera;
            t.zoom !== t.desiredZoom && (this.gridCache = !1);
          }
          checkSnap() {
            this.options.snapLocked && (this.options.snap = !0);
          }
          moveCameraTowardsMouse() {
            if (!1 === this.options.cameraLocked) {
              const t = this.scene.screen,
                e = 100,
                s = t.height - e,
                i = 0 + e,
                n = t.width - e,
                r = 0 + e,
                o = this.options.cameraMoveSpeed,
                a = t.center,
                h = this.camera,
                l = this.mouse.touch.pos.x,
                c = this.mouse.touch.pos.y,
                u = 0.8 * (l - a.x),
                d = c - a.y;
              (l >= n || r >= l || c >= s || i >= c) &&
                ((h.position.x += u * o * (1 / h.zoom)),
                (h.position.y += d * o * (1 / h.zoom)));
            }
          }
          checkMouse() {
            (this.mouse.touch.press || this.mouse.secondaryTouch.press) &&
              this.press();
          }
          press() {
            this.camera.unfocus();
          }
          checkHotkeys() {
            const t = this.gamepad,
              e = this.options.snap,
              s = this.options.snapLocked;
            let i = t.isButtonDown("alt");
            this.options.rightClickMove && (i = t.isButtonDown("shift")),
              i && !e
                ? this.toggleQuickSnap()
                : i || !e || s || this.toggleQuickSnap(),
              t.isButtonDown("ctrl") &&
                t.isButtonDown("z") &&
                (t.setButtonUp("z"), this.revertAction()),
              t.isButtonDown("ctrl") &&
                t.isButtonDown("y") &&
                (t.setButtonUp("y"), this.applyAction());
            const n = this.tools;
            for (const t in n) n[t].checkKeys();
            this.gridUseEnabled &&
              t.isButtonDown("grid") &&
              (t.setButtonUp("grid"), this.toggleGrid()),
              t.isButtonDown("zoom_increase") &&
                (t.setButtonUp("zoom_increase"),
                this.scene.camera.increaseZoom()),
              t.isButtonDown("zoom_decrease") &&
                (t.setButtonUp("zoom_decrease"),
                this.scene.camera.decreaseZoom()),
              t.isButtonDown("zoom_100") &&
                (t.setButtonUp("zoom_100"), this.scene.camera.resetZoom()),
              t.isButtonDown("lineType") &&
                (t.setButtonUp("lineType"), this.toggleLineType());
          }
          toggleLineType() {
            (this.options.lineType =
              "physics" === this.options.lineType ? "scenery" : "physics"),
              this.scene.stateChanged();
          }
          toggleGrid() {
            (this.options.grid = this.scene.state.grid = !this.options.grid),
              this.scene.stateChanged();
          }
          toggleSnap() {
            (this.options.snap = !this.options.snap),
              (this.options.snapLocked = !this.options.snapLocked),
              this.resetTool(),
              this.scene.stateChanged();
          }
          toggleQuickSnap() {
            this.options.snapLocked ||
              ((this.options.snap = !this.options.snap),
              this.resetTool(),
              this.scene.stateChanged());
          }
          toggleCameraLock() {
            (this.options.cameraLocked = !this.options.cameraLocked),
              this.scene.stateChanged();
          }
          draw() {
            this.mouse.enabled && this.tools[this.currentTool].draw();
          }
          drawGrid() {
            if (this.options.grid && this.options.visibleGrid && !this.scene.game.mod.vars.invisibleGrid) {
              if (this.options.isometricGrid) {
                return this.drawCachedGridIsometric(this.scene.game.canvas.getContext("2d"), this.scene.game.pixelRatio);
              } else {
                return this.drawCachedGrid(this.scene.game.canvas.getContext("2d"), this.scene.game.pixelRatio);
              }
            }
          }
          drawCachedGrid(t, e) {
            if (this.options.isometricGrid) {
              return this.drawCachedGridIsometric(t, e);
            } else {
              this.gridCache || this.cacheGrid(e);
              const s = this.gridCache,
                i = s.width,
                n = s.height,
                r = this.scene.screen.center,
                o = 2 + (r.x / i | 0),
                a = 2 + (r.y / n | 0),
                h = this.camera.zoom,
                l = this.camera.position.x * h % i,
                c = this.camera.position.y * h % n;
              t.globalAlpha = this.gridCacheAlpha;
              t.globalCompositeOperation = "destination-over";
              for (let e = -o; e < o; e++) {
                for (let o = -a; o < a; o++) {
                  const a = e * i - l + r.x,
                    h = o * n - c + r.y;
                  t.drawImage(s, 0, 0, i, n, a, h, i, n);
                }
              }
              t.globalAlpha = 1;
              t.globalCompositeOperation = "source-over";
            }
          }
  
          drawCachedGridIsometric(t, e) {
            this.gridCache || this.cacheIsometricGrid(e);
            const s = this.gridCache,
              i = s.width,
              n = s.height,
              r = this.scene.screen.center,
              o = 2 + (r.x / i | 0),
              a = 2 + (r.y / n | 0),
              h = this.camera.zoom,
              l = this.camera.position.x * h % i,
              c = this.camera.position.y * h % n;
            t.globalAlpha = this.gridCacheAlpha;
            t.globalCompositeOperation = "destination-over";
            for (let e = -o; e < o; e++) {
              for (let o = -a; o < a; o++) {
                const a = e * i - l + r.x,
                  h = o * n - c + r.y;
                t.drawImage(s, 0, 0, i, n, a, h, i, n);
              }
            }
            t.globalAlpha = 1;
            t.globalCompositeOperation = "source-over";
          }
  
  
          cacheGrid(e) {
            const t = this.scene.camera.zoom,
              s = Math.round(200 * t),
              i = Math.round(200 * t),
              n = this.options.gridSize * t,
              r = document.createElement("canvas");
            r.width = s;
            r.height = i;
            const o = r.getContext("2d");
            o.strokeStyle = this.options.gridMinorLineColor;
            o.strokeWidth = 1;
            o.beginPath();
            let a = null,
              h = null;
            for (a = Math.ceil(s / n), h = 0; a >= h; h++) {
              const e = h * n;
              o.moveTo(e, 0);
              o.lineTo(e, i);
              o.stroke();
            }
            for (a = Math.ceil(i / n), h = 0; a >= h; h++) {
              const e = h * n;
              o.moveTo(0, e);
              o.lineTo(s, e);
              o.stroke();
            }
            o.beginPath();
            o.rect(0, 0, s, i);
            o.lineWidth = 2;
            o.strokeStyle = this.options.gridMajorLineColor;
            o.stroke();
            o.closePath();
            this.gridCache = r;
            this.gridCacheAlpha = Math.min(t + .2, 1);
          }
  
          cacheIsometricGrid() {
            let t = this.scene.camera.zoom
              , e = 200 * t
              , i = 200 * t
              , n = this.options.gridSize
              , r = n * t
              , o = document.createElement("canvas");
            o.width = e,
              o.height = i;
            let a = o.getContext("2d");
            a.fillStyle = this.options.gridMajorLineColor;
            for (let width = Math.floor(e / r), l = 0; width >= l; l++)
              for (let height = Math.floor(i / r), b = 0; height >= b; b += .5) {
                a.beginPath();
                a.arc(2 * b * r, (l + b % 1) * r, 1 * t, 0, 2 * Math.PI)
                a.fill()
              }
            this.gridCache = o,
              this.gridCacheAlpha = Math.min(t + .2, 1)
          }
  
          resize() {
            if (this.options.isometricGrid) {
              this.cacheIsometricGrid(this.scene.game.pixelRatio);
            } else {
              this.cacheGrid(this.scene.game.pixelRatio);
            }
          }
          undo() {}
          redo() {}
          close() {
            (this.actionTimeline = []),
              (this.actionTimelinePointer = 0),
              (this.tools = null),
              (this.mouse = null),
              (this.scene = null),
              (this.camera = null),
              (this.options.grid = !1),
              (this.options = null),
              (this.gridCache = null);
          }
        }
        const ye = ve.prototype;
        (ye.currentTool = ""),
          (ye.scene = null),
          (ye.camera = null),
          (ye.mouse = null),
          (ye.tools = {}),
          (ye.gamepad = null),
          (ye.gridCache = !1),
          (ye.gridCacheAlpha = 1),
          (ye.gridUseEnabled = !1),
          (ye.snapPoint = !1),
          (ye.options = null);
        const we = ve;
        var xe = s(348);
        class be extends xe.Z {
          constructor(t) {
            super(), super.init(t);
          }
          hold() {
            const t = this.mouse.touch,
              e = this.camera,
              s = t.old.pos.sub(t.pos).factor(1 / e.zoom);
            e.position.inc(s);
          }
          draw() {}
          drawText(t) {
            const e = this.game.pixelRatio;
            (t.fillStyle = "#000000"),
              (t.font = 12 * e + "pt arial"),
              t.fillText(this.name, 10 * e, 20 * e),
              (t.font = 8 * e + "pt arial");
          }
        }
        be.prototype.name = "Camera";
        const _e = be;
        var Te = s(285),
          Ce = s.n(Te);
        const ke = Math.sqrt,
          Se = Math.pow;
        class Ae extends xe.Z {
          constructor(e) {
            super(),
              super.init(e),
              (this.p1 = new t.Z(0, 0)),
              (this.p2 = new t.Z(0, 0)),
              (this.midpoint = new t.Z(0, 0)),
              (this.active = !1),
              (this.options = {});
          }
          getOptions() {
            const t = this.toolHandler,
              e = this.options;
            return (
              (e.lineType = t.options.lineType), (e.snap = t.options.snap), e
            );
          }
          reset() {
            (this.active = !1), (this.anchoring = !1);
          }
          press() {
            if (!this.active) {
              this.active = !0;
              const t = this.mouse.touch.real;
              (this.p1.x = t.x), (this.p1.y = t.y);
            }
          }
          hold() {
            const t = this.mouse.touch.real;
            (this.p2.x = t.x), (this.p2.y = t.y);
            const e = this.p1,
              s = this.p2;
            (this.midpoint.x = (e.x + s.x) / 2),
              (this.midpoint.y = (e.y + s.y) / 2),
              this.toolHandler.moveCameraTowardsMouse();
          }
          release() {
            const t = this.p1,
              e = this.p2,
              s = this.midpoint,
              i = this.toolHandler;
            if (this.anchoring && this.active) {
              if (s.x === e.x && s.y === e.y) {
                const s = this.scene.track;
                let n = !1;
                (n =
                  "physics" === i.options.lineType
                    ? s.addPhysicsLine(t.x, t.y, e.x, e.y)
                    : s.addSceneryLine(t.x, t.y, e.x, e.y)),
                  n && i.addActionToTimeline({ type: "add", objects: [n] }),
                  (i.snapPoint.x = e.x),
                  (i.snapPoint.y = e.y);
              } else this.splitAndAddCurve();
              (this.anchoring = !1), (this.active = !1);
            } else
              this.active &&
                (ke(Se(e.x - t.x, 2) + Se(e.y - t.y, 2)) > 0 &&
                  (this.anchoring = !0),
                (this.active = !1));
          }
          updateAnchor() {
            this.midpoint.equ(this.mouse.touch.real);
          }
          splitAndAddCurve() {
            const t = Ce()(this.p1, this.midpoint, this.p2),
              e = this.scene.track,
              s = this.toolHandler,
              i = [];
            for (let n = 0; n < t.length - 2; n += 2) {
              const r = t[n],
                o = t[n + 1],
                a = t[n + 2],
                h = t[n + 3];
              let l = !1;
              (l =
                "physics" === s.options.lineType
                  ? e.addPhysicsLine(r, o, a, h)
                  : e.addSceneryLine(r, o, a, h)),
                l && i.push(l),
                (s.snapPoint.x = a),
                (s.snapPoint.y = h);
            }
            i.length > 0 && s.addActionToTimeline({ type: "add", objects: i });
          }
          update() {
            const t = this.mouse,
              e = t.touch,
              s = t.secondaryTouch,
              i = this.toolHandler.gamepad,
              n = this.toolHandler;
            n.options.snap &&
              ((this.active = !0),
              (this.p1 = n.snapPoint),
              this.anchoring || this.hold());
            const r = this.toolHandler.options;
            let o = i.isButtonDown("shift");
            r.rightClickMove && (o = s.old.down),
              o
                ? (e.old.down || r.rightClickMove) && this.moveCamera()
                : (e.press &&
                    (this.anchoring || this.press(), (this.active = !0)),
                  e.old.down && !this.anchoring && this.hold()),
              this.anchoring && this.updateAnchor(),
              e.release && this.release(),
              !1 === t.mousewheel || o || this.mousewheel(t.mousewheel);
          }
          draw() {
            const t = this.scene,
              e = t.game.canvas.getContext("2d"),
              s = t.camera.zoom;
            this.drawCursor(e, s),
              (this.active || this.anchoring) &&
                (this.drawLine(e, s),
                this.drawPoint(e, this.p1, s),
                this.drawPoint(e, this.p2, s));
          }
          drawCursor(t, e) {
            const s = this.mouse.touch.real.toScreenSnapped(this.scene);
            if (this.toolHandler.options.grid) {
              const i = 5 * e;
              t.beginPath(),
                t.moveTo(s.x, s.y - i),
                t.lineTo(s.x, s.y + i),
                t.moveTo(s.x - i, s.y),
                t.lineTo(s.x + i, s.y),
                (t.lineWidth = 1 * e),
                t.stroke();
            } else
              t.beginPath(),
                t.arc(s.x, s.y, 1 * e, 0, 2 * Math.PI, !1),
                (t.lineWidth = 1),
                (t.fillStyle = "#1884cf"),
                t.fill();
          }
          drawPoint(t, e, s) {
            const i = e.toScreenSnapped(this.scene);
            t.beginPath(),
              t.arc(i.x, i.y, 1 * s, 0, 2 * Math.PI, !1),
              (t.lineWidth = 1),
              (t.fillStyle = "#1884cf"),
              t.fill();
          }
          drawText(t) {
            const e = this.name,
              s = this.game.pixelRatio;
            (t.fillStyle = "#000000"),
              (t.font = 12 * s + "pt arial"),
              t.fillText(e, 10 * s, 20 * s),
              (t.font = 8 * s + "pt arial");
          }
          drawLine(t, e) {
            const s = 2 * e > 0.5 ? 2 * e : 0.5,
              i =
                "physics" === this.toolHandler.options.lineType ? "#000" : "#AAA";
            t.beginPath(),
              (t.lineWidth = s),
              (t.lineCap = "round"),
              (t.strokeStyle = i);
            const n = this.p1.toScreenSnapped(this.scene),
              r = this.p2.toScreenSnapped(this.scene),
              o = this.midpoint.toScreenSnapped(this.scene);
            t.moveTo(n.x, n.y),
              t.quadraticCurveTo(o.x, o.y, r.x, r.y),
              t.stroke();
          }
        }
        const Pe = Ae.prototype;
        (Pe.name = "Curve"),
          (Pe.active = !1),
          (Pe.p1 = null),
          (Pe.p2 = null),
          (Pe.midpoint = null),
          (Pe.anchoring = !1),
          (Pe.options = null);
        const Me = Ae;
        class Ie extends xe.Z {
          constructor(e) {
            super(),
              (this.game = e.scene.game),
              super.init(e),
              (this.p1 = new t.Z(0, 0)),
              (this.p2 = new t.Z(0, 0)),
              (this.active = !1),
              (this.shouldDrawMetadata = !1),
              (this.options = {});
          }
          reset() {
            this.active = !1;
          }
          press() {
            this.active ||
              (this.p1.equ(this.mouse.touch.real), (this.active = !0));
          }
          getOptions() {
            const t = this.toolHandler,
              e = this.options;
            return (
              (e.lineType = t.options.lineType), (e.snap = t.options.snap), e
            );
          }
          hold() {
            const t = this.mouse.touch.real;
            if (
              ((this.p2.x = t.x),
              (this.p2.y = t.y),
              this.p2.equ(this.mouse.touch.real),
              this.toolHandler.gamepad.isButtonDown("ctrl") &&
                this.toolHandler.gamepad.isButtonDown("shift"))
            ) {
              let t = Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x);
              const e = Math.sqrt(
                Math.pow(this.p1.x - this.p2.x, 2) +
                  Math.pow(this.p1.y - this.p2.y, 2)
              );
              (t = (Math.round((12 * t) / Math.PI) * Math.PI) / 12),
                (this.p2.x = this.p1.x + Math.round(e * Math.cos(t))),
                (this.p2.y = this.p1.y + Math.round(e * Math.sin(t)));
            }
            this.toolHandler.moveCameraTowardsMouse();
          }
          release() {
            if (this.active) {
              const t = this.p1,
                e = this.p2,
                s = this.scene.track,
                i = this.toolHandler;
              let n = !1;
              (n =
                "physics" === i.options.lineType
                  ? s.addPhysicsLine(t.x, t.y, e.x, e.y)
                  : s.addSceneryLine(t.x, t.y, e.x, e.y)),
                n && i.addActionToTimeline({ type: "add", objects: [n] }),
                i.snapPoint.equ(e),
                (this.active = !1);
            }
          }
          update() {
            super.update();
            const t = this.toolHandler,
              e = t.gamepad;
            t.options.snap &&
              ((this.active = !0), (this.p1 = t.snapPoint), this.hold()),
              (this.shouldDrawMetadata = !!e.isButtonDown("ctrl"));
          }
          draw() {
            const t = this.scene,
              e = t.game.canvas.getContext("2d"),
              s = t.camera.zoom;
            e.save(),
              this.drawCursor(e),
              this.active &&
                (this.drawLine(e, s),
                this.drawPoint(e, this.p1, s),
                this.drawPoint(e, this.p2, s),
                this.drawPointData(e, this.p2, s)),
              e.restore();
          }
          drawCursor(t) {
            const e = this.mouse.touch.real.toScreenSnapped(this.scene),
              s = this.camera.zoom;
            if (this.toolHandler.options.grid) {
              const i = 5 * s;
              t.beginPath(),
                t.moveTo(e.x, e.y - i),
                t.lineTo(e.x, e.y + i),
                t.moveTo(e.x - i, e.y),
                t.lineTo(e.x + i, e.y),
                (t.lineWidth = 1 * s),
                t.closePath(),
                t.stroke();
            } else
              (t.lineWidth = 1),
                (t.fillStyle = "#1884cf"),
                t.beginPath(),
                t.arc(e.x, e.y, 1 * s, 0, 2 * Math.PI, !1),
                t.closePath(),
                t.fill();
          }
          drawPoint(t, e, s) {
            const i = e.toScreenSnapped(this.scene);
            t.beginPath(),
              t.arc(i.x, i.y, s, 0, 2 * Math.PI, !1),
              (t.lineWidth = 1),
              (t.fillStyle = "#1884cf"),
              t.fill();
          }
          drawPointData(t, e) {
            const s = e.toScreenSnapped(this.scene);
            if (this.shouldDrawMetadata) {
              const e = this.p1.getAngleInDegrees(this.p2).toFixed(2),
                i = this.game.pixelRatio;
              let n =
                Math.sqrt(
                  Math.pow(this.p1.x - this.p2.x, 2) +
                    Math.pow(this.p1.y - this.p2.y, 2)
                ) / 10;
              n = n.toFixed(2);
              let r = 10;
              this.p2.x < this.p1.x && ((r = -10), (t.textAlign = "right")),
                (t.fillStyle = "#000000"),
                (t.strokeStyle = "#ffffff"),
                (t.font = "bold " + 10 * i + "pt arial"),
                (t.lineWidth = 5 * i),
                t.strokeText(e + "°", s.x + r, s.y + 10),
                t.strokeText(n + " units", s.x + r, s.y + 30),
                t.strokeText(
                  "x: " + ((this.p2.x - this.p1.x) / 10).toFixed(1),
                  s.x + r,
                  s.y + 50
                ),
                t.strokeText(
                  "y: " + ((this.p2.y - this.p1.y) / 10).toFixed(1),
                  s.x + r,
                  s.y + 65
                ),
                t.fillText(e + "°", s.x + r, s.y + 10),
                t.fillText(n + " units", s.x + r, s.y + 30),
                t.fillText(
                  "x: " + ((this.p2.x - this.p1.x) / 10).toFixed(1),
                  s.x + r,
                  s.y + 50
                ),
                t.fillText(
                  "y: " + ((this.p2.y - this.p1.y) / 10).toFixed(1),
                  s.x + r,
                  s.y + 65
                );
            }
          }
          drawLine(t, e) {
            const s = this.scene.game.mod.getVar("customColors"),
              i = s ? Q(this.scene.game.mod.getVar("lineColor")) : "#000",
              n = s ? Q(this.scene.game.mod.getVar("sceneryColor")) : "#aaa",
              r = "physics" === this.toolHandler.options.lineType ? i : n;
            t.beginPath(),
              (t.lineWidth = 2 * e > 0.5 ? 2 * e : 0.5),
              (t.lineCap = "round"),
              (t.strokeStyle = r);
            const o = this.p1.toScreenSnapped(this.scene),
              a = this.p2.toScreenSnapped(this.scene);
            t.moveTo(o.x, o.y), t.lineTo(a.x, a.y), t.stroke();
          }
        }
        const Be = Ie.prototype;
        (Be.name = "StraightLine"),
          (Be.p1 = null),
          (Be.p2 = null),
          (Be.active = !1);
        const De = Ie;
        class Ee extends xe.Z {
          constructor(e) {
            super(),
              super.init(e),
              (this.p1 = new t.Z(0, 0)),
              (this.p2 = new t.Z(0, 0)),
              (this.active = !1);
            const s = e.scene.settings.brush;
            (this.addedObjects = []),
              (this.options = {
                breakLength: s.breakLength,
                maxBreakLength: s.maxBreakLength,
                minBreakLength: s.minBreakLength,
                breakLengthSensitivity: s.breakLengthSensitivity,
                trailSpeed: s.trailSpeed,
                maxTrailSpeed: s.maxTrailSpeed,
                minTrailSpeed: s.minTrailSpeed,
                trailSpeedSensitivity: s.trailSpeedSensitivity,
              });
          }
          recordActionsToToolhandler() {
            for (const t of this.addedObjects)
              this.toolHandler.addActionToTimeline({ type: "add", objects: [t] });
            this.addedObjects = [];
          }
          press() {
            if ((this.recordActionsToToolhandler(), !this.active)) {
              const t = this.mouse.touch.real;
              (this.p1.x = t.x),
                (this.p1.y = t.y),
                (this.p2.x = t.x),
                (this.p2.y = t.y),
                (this.active = !0);
            }
          }
          hold() {
            if (this.active) {
              const t = this.mouse.touch.real,
                e = this.p1,
                s = this.p2,
                i = this.options.trailSpeed,
                n = this.options.breakLength;
              s.inc(t.sub(s).factor(i));
              let r = screen.height + t.sub(s).len();
              if (((r *= n), s.sub(e).lenSqr() > r)) {
                const t = this.scene.track;
                let i = !1;
                (i =
                  "physics" === this.toolHandler.options.lineType
                    ? t.addPhysicsLine(e.x, e.y, s.x, s.y)
                    : t.addSceneryLine(e.x, e.y, s.x, s.y)),
                  i && this.addedObjects.push(i),
                  e.equ(s),
                  (this.toolHandler.snapPoint.x = s.x),
                  (this.toolHandler.snapPoint.y = s.y);
              }
              this.toolHandler.moveCameraTowardsMouse();
            }
          }
          release() {
            if (this.active) {
              const t = this.p1,
                e = this.p2,
                s = this.scene.track;
              let i = !1;
              (i =
                "physics" === this.toolHandler.options.lineType
                  ? s.addPhysicsLine(t.x, t.y, e.x, e.y)
                  : s.addSceneryLine(t.x, t.y, e.x, e.y)),
                i && this.addedObjects.push(i),
                this.recordActionsToToolhandler();
              const n = this.toolHandler.snapPoint;
              (n.x = e.x), (n.y = e.y), (this.active = !1);
            }
          }
          update() {
            const t = this.toolHandler.gamepad,
              e = this.mouse;
            t.isButtonDown("alt")
              ? !1 !== e.mousewheel && this.adjustTrailSpeed(e.mousewheel)
              : t.isButtonDown("shift") &&
                !1 !== e.mousewheel &&
                this.adjustBreakLength(e.mousewheel);
            const s = this.toolHandler;
            s.options.snap &&
              ((this.active = !0),
              (this.p1.x = s.snapPoint.x),
              (this.p1.y = s.snapPoint.y),
              (this.p2.x = e.touch.real.x),
              (this.p2.y = e.touch.real.y)),
              super.update();
          }
          adjustTrailSpeed(t) {
            let e = this.options.trailSpeed;
            const s = this.options.trailSpeedSensitivity,
              i = this.options.maxTrailSpeed,
              n = this.options.minTrailSpeed;
            t > 0 ? ((e += s), e > i && (e = i)) : ((e -= s), n > e && (e = n)),
              this.setOption("trailSpeed", e);
          }
          adjustBreakLength(t) {
            let e = this.options.breakLength;
            const s = this.options.breakLengthSensitivity,
              i = this.options.maxBreakLength,
              n = this.options.minBreakLength;
            t > 0 ? ((e += s), e > i && (e = i)) : ((e -= s), n > e && (e = n)),
              this.setOption("breakLength", e);
          }
          setOption(t, e) {
            this.options[t] = e;
          }
          getOptions() {
            const t = this.toolHandler,
              e = this.options;
            return (
              (e.lineType = t.options.lineType), (e.snap = t.options.snap), e
            );
          }
          draw() {
            const t = this.scene,
              e = t.game.canvas.getContext("2d"),
              s = t.camera.zoom;
            this.drawCursor(e),
              this.active &&
                (this.drawLine(e, s),
                this.drawPoint(e, this.p1, s),
                this.drawPoint(e, this.p2, s));
          }
          drawText(t) {
            const e = this.name,
              s = this.options.breakLength;
            let i = this.options.trailSpeed;
            const n = this.game.pixelRatio;
            (t.fillStyle = "#000000"),
              (t.font = 12 * n + "pt arial"),
              t.fillText(e, 10 * n, 20 * n),
              (t.font = 8 * n + "pt arial"),
              (i |= 0),
              t.fillText("Trail speed : " + i, 10 * n, 40 * n),
              t.fillText("Break length : " + s, 10 * n, 60 * n);
          }
          drawCursor(t) {
            const e = this.mouse.touch.real.toScreenSnapped(this.scene),
              s = this.camera.zoom;
            if (this.toolHandler.options.grid) {
              const i = 5 * s;
              t.beginPath(),
                t.moveTo(e.x, e.y - i),
                t.lineTo(e.x, e.y + i),
                t.moveTo(e.x - i, e.y),
                t.lineTo(e.x + i, e.y),
                (t.lineWidth = 1 * s),
                t.stroke();
            } else
              t.beginPath(),
                t.arc(e.x, e.y, 1 * s, 0, 2 * Math.PI, !1),
                (t.lineWidth = 1),
                (t.fillStyle = "#1884cf"),
                t.fill();
          }
          drawPoint(t, e, s) {
            const i = e.toScreenSnapped(this.scene);
            t.beginPath(),
              t.arc(i.x, i.y, 1 * s, 0, 2 * Math.PI, !1),
              (t.lineWidth = 1),
              (t.fillStyle = "#1884cf"),
              t.fill();
          }
          drawLine(t, e) {
            const s =
              "physics" === this.toolHandler.options.lineType ? "#000" : "#AAA";
            t.beginPath(),
              (t.lineWidth = 2 * e > 0.5 ? 2 * e : 0.5),
              (t.lineCap = "round"),
              (t.strokeStyle = s);
            const i = this.p1.toScreenSnapped(this.scene),
              n = this.p2.toScreenSnapped(this.scene);
            t.moveTo(i.x, i.y), t.lineTo(n.x, n.y), t.stroke();
          }
          reset() {
            this.recordActionsToToolhandler(), (this.active = !1);
          }
        }
        const Le = Ee.prototype;
        (Le.name = "Brush"),
          (Le.p1 = null),
          (Le.p2 = null),
          (Le.active = !1),
          (Le.options = null);
        const ze = Ee;
        var Oe = s(580),
          Fe = s.n(Oe);
  
        //start circle tool
  
        class circleTool extends xe.Z {
            constructor(e) {
                super(),
                super.init(e),
                this.p1 = new t.Z(0,0),
                this.p2 = new t.Z(0,0),
                this.active = !1;
                const s = e.scene.settings.brush;
                this.shouldDrawMetadata = !1,
                this.addedObjects = [],
                this.options = {
                    SegmentLength: s.SegmentLength,
                    maxSegmentLength: s.maxSegmentLength,
                    minSegmentLength: s.minSegmentLength,
                    SegmentLengthSensitivity: s.SegmentLengthSensitivity
                }
            }
            reset() {
                this.active = !1
            }
            recordActionsToToolhandler() {
                for (const t of this.addedObjects)
                    this.toolHandler.addActionToTimeline({
                        type: "add",
                        objects: [t]
                    });
                this.addedObjects = []
            }
            press() {
                if (this.recordActionsToToolhandler(),
                !this.active) {
                    const t = this.mouse.touch.real;
                    this.p1.x = t.x,
                    this.p1.y = t.y,
                    this.p2.x = t.x,
                    this.p2.y = t.y,
                    this.active = !0
                }
            }
  
            hold() {
                const t = this.mouse.touch.real;
                if (this.p2.x = t.x,
                this.p2.y = t.y,
                this.p2.equ(this.mouse.touch.real),
                this.toolHandler.gamepad.isButtonDown("ctrl") && this.toolHandler.gamepad.isButtonDown("shift")) {
                    let t = Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x);
                    const e = Math.sqrt(Math.pow(this.p1.x - this.p2.x, 2) + Math.pow(this.p1.y - this.p2.y, 2));
                    t = Math.round(12 * t / Math.PI) * Math.PI / 12,
                    this.p2.x = this.p1.x + Math.round(e * Math.cos(t)),
                    this.p2.y = this.p1.y + Math.round(e * Math.sin(t))
                }
                this.toolHandler.moveCameraTowardsMouse()
            }
            release() {
                if (this.active) {
                    const t = this.p1;
                    const e = this.p2;
                    const s = this.scene.track;
                    const i = this.options.SegmentLength;
                    // calculate radius
                    const radius = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
            
                    // calculate the number of line segments
                    const segments = Math.ceil(Math.max(4, (radius/2) * i));
            
                    // calculate angle increment
                    const angleIncrement = (2 * Math.PI) / segments;
            
                    // array to store the line objects
                    const addedObjects = [];
            
                    // calculate and add line segments
                    for (let j = 0; j < segments; j++) {
                        const angle = j * angleIncrement;
                        const x1 = t.x + radius * Math.cos(angle);
                        const y1 = t.y + radius * Math.sin(angle);
                        const x2 = t.x + radius * Math.cos(angle + angleIncrement);
                        const y2 = t.y + radius * Math.sin(angle + angleIncrement);
            
                        // add line based on lineType option
                        let lineObject;
                        if (this.toolHandler.options.lineType === "physics") {
                            lineObject = s.addPhysicsLine(x1, y1, x2, y2);
                        } else {
                            lineObject = s.addSceneryLine(x1, y1, x2, y2);
                        }
                        
                        if (lineObject) {
                            addedObjects.push(lineObject);
                        }
                    }
            
                    // add actions to timeline
                    if (addedObjects.length > 0) {
                        this.toolHandler.addActionToTimeline({
                            type: "add",
                            objects: addedObjects
                        });
                    }
            
                    // reset snap point and active flag
                    this.toolHandler.snapPoint.x = e.x;
                    this.toolHandler.snapPoint.y = e.y;
                    this.active = false;
                }
            }
            update() {
                super.update();
                const t = this.toolHandler
                  , e = t.gamepad;
                t.options.snap && (this.active = !0,
                this.p1 = t.snapPoint,
                this.hold()),
                this.shouldDrawMetadata = !!e.isButtonDown("ctrl")
            }
  
            adjustTrailSpeed(t) {
                let e = this.options.trailSpeed;
                const s = this.options.trailSpeedSensitivity
                  , i = this.options.maxTrailSpeed
                  , n = this.options.minTrailSpeed;
                t > 0 ? (e += s,
                e > i && (e = i)) : (e -= s,
                n > e && (e = n)),
                this.setOption("trailSpeed", e)
            }
            adjustSegmentLength(t) {
                let e = this.options.SegmentLength;
                const s = this.options.SegmentLengthSensitivity
                  , i = this.options.maxSegmentLength
                  , n = this.options.minSegmentLength;
                t > 0 ? (e += s,
                e > i && (e = i)) : (e -= s,
                n > e && (e = n)),
                this.setOption("SegmentLength", e)
            }
            setOption(t, e) {
                this.options[t] = e
            }
            getOptions() {
                const t = this.toolHandler
                  , e = this.options;
                return e.lineType = t.options.lineType,
                e.snap = t.options.snap,
                e
            }
            draw() {
                const t = this.scene
                  , e = t.game.canvas.getContext("2d")
                  , s = t.camera.zoom;
                e.save(),
                this.drawCursor(e),
                this.active && (this.drawLine(e, s),
                this.drawPoint(e, this.p1, s),
                this.drawPoint(e, this.p2, s),
                this.drawPointData(e, this.p2, s)),
                e.restore()
            }
            drawCursor(t) {
                const e = this.mouse.touch.real.toScreenSnapped(this.scene)
                  , s = this.camera.zoom;
                if (this.toolHandler.options.grid) {
                    const i = 5 * s;
                    t.beginPath(),
                    t.moveTo(e.x, e.y - i),
                    t.lineTo(e.x, e.y + i),
                    t.moveTo(e.x - i, e.y),
                    t.lineTo(e.x + i, e.y),
                    t.lineWidth = 1 * s,
                    t.closePath(),
                    t.stroke()
                } else
                    t.lineWidth = 1,
                    t.fillStyle = "#1884cf",
                    t.beginPath(),
                    t.arc(e.x, e.y, 1 * s, 0, 2 * Math.PI, !1),
                    t.closePath(),
                    t.fill()
            }
            drawPoint(t, e, s) {
                const i = e.toScreenSnapped(this.scene);
                t.beginPath(),
                t.arc(i.x, i.y, s, 0, 2 * Math.PI, !1),
                t.lineWidth = 1,
                t.fillStyle = "#1884cf",
                t.fill()
            }
            drawPointData(t, e) {
                const s = e.toScreenSnapped(this.scene);
                if (this.shouldDrawMetadata) {
                    const e = this.p1.getAngleInDegrees(this.p2).toFixed(2)
                      , i = this.game.pixelRatio;
                    let n = Math.sqrt(Math.pow(this.p1.x - this.p2.x, 2) + Math.pow(this.p1.y - this.p2.y, 2)) / 10;
                    n = n.toFixed(2);
                    let r = 10;
                    this.p2.x < this.p1.x && (r = -10,
                    t.textAlign = "right"),
                    t.fillStyle = "#000000",
                    t.strokeStyle = "#ffffff",
                    t.font = "bold " + 10 * i + "pt arial",
                    t.lineWidth = 5 * i,
                    t.strokeText(e + "°", s.x + r, s.y + 10),
                    t.strokeText(n + " units", s.x + r, s.y + 30),
                    t.strokeText("x: " + ((this.p2.x - this.p1.x) / 10).toFixed(1), s.x + r, s.y + 50),
                    t.strokeText("y: " + ((this.p2.y - this.p1.y) / 10).toFixed(1), s.x + r, s.y + 65),
                    t.fillText(e + "°", s.x + r, s.y + 10),
                    t.fillText(n + " units", s.x + r, s.y + 30),
                    t.fillText("x: " + ((this.p2.x - this.p1.x) / 10).toFixed(1), s.x + r, s.y + 50),
                    t.fillText("y: " + ((this.p2.y - this.p1.y) / 10).toFixed(1), s.x + r, s.y + 65)
                }
            }
            drawLine(t, e) {
                const s = this.scene.game.mod.getVar("customColors")
                  , i = s ? Q(this.scene.game.mod.getVar("lineColor")) : "#000"
                  , n = s ? Q(this.scene.game.mod.getVar("sceneryColor")) : "#aaa"
                  , r = "physics" === this.toolHandler.options.lineType ? i : n;
                t.beginPath();
                t.lineWidth = 2 * e > .5 ? 2 * e : .5;
                t.lineCap = "round",
                t.strokeStyle = r;
                const center = this.p1.toScreenSnapped(this.scene);
                const cursorPosition = this.p2.toScreenSnapped(this.scene);
                const radius = Math.sqrt(Math.pow(cursorPosition.x - center.x, 2) + Math.pow(cursorPosition.y - center.y, 2));
            
                // draw circle
                t.arc(center.x, center.y, radius, 0, 2 * Math.PI);
                t.stroke();
            }
        }
        const circLe = circleTool.prototype;
        circLe.name = "Circle",
        circLe.p1 = null,
        circLe.p2 = null,
        circLe.active = !1,
        circLe.options = null;
        const circze = circleTool;
  
        //end circle tool
  
        class je extends xe.Z {
          constructor(e) {
            super(),
              super.init(e),
              (this.options = e.scene.settings.eraser),
              (this.eraserPoint = new t.Z()),
              (this.erasedObjects = []);
          }
          reset() {
            this.recordActionsToToolhandler();
          }
          press() {
            this.recordActionsToToolhandler();
          }
          recordActionsToToolhandler() {
            this.erasedObjects.length > 0 &&
              this.toolHandler.addActionToTimeline({
                type: "remove",
                objects: (0, e.flatten)(this.erasedObjects),
              }),
              (this.erasedObjects = []);
          }
          release() {
            this.recordActionsToToolhandler();
          }
          hold() {
            const t = this.mouse.touch,
              e = this.scene.track;
            this.eraserPoint = t.pos.toRealSnapped(this.scene);
            const s = e.erase(
              this.eraserPoint,
              this.options.radius / this.scene.camera.zoom,
              this.options.types
            );
            s.length > 0 && this.erasedObjects.push(s);
          }
          draw() {
            this.drawEraser(this.scene.game.canvas.getContext("2d"));
          }
          drawEraser(t) {
            const e = this.mouse.touch.pos;
            t.beginPath(),
              t.arc(e.x, e.y, this.options.radius, 0, 2 * Math.PI, !1),
              (t.lineWidth = 1),
              (t.fillStyle = "rgba(255,255,255,0.8)"),
              (t.strokeStyle = "#000000"),
              t.fill(),
              t.stroke();
          }
          setOption(t, e) {
            this.options[t] = e;
          }
          getOptions() {
            return this.options;
          }
          update() {
            const t = this.toolHandler.gamepad,
              e = this.mouse;
            t.isButtonDown("shift") &&
              !1 !== e.mousewheel &&
              this.adjustRadius(e.mousewheel),
              super.update();
          }
          adjustRadius(t) {
            let e = this.options.radius;
            const s = this.options.radiusSizeSensitivity,
              i = this.options.maxRadius,
              n = this.options.minRadius;
            (e += t > 0 ? s : -s),
              (e = Math.max(n, Math.min(i, e))),
              this.setOption("radius", e);
          }
        }
        const Re = je.prototype;
        (Re.name = "Eraser"), (Re.options = null);
        const We = je,
          Ve = class extends ne {
            constructor(t, e, s, i, n = 1) {
              super(),
                (this.x = t),
                (this.y = e),
                (this.angle = s),
                (this.realAngle = s);
              const r = ((this.angle - 180) / 360) * 2 * Math.PI;
              (this.directionX = parseFloat((-n * Math.sin(r)).toFixed(15))),
                (this.directionY = parseFloat((n * Math.cos(r)).toFixed(15))),
                this.init(i);
            }
            draw(t, e, s, i) {
              this.constructor.drawData.dirty && this.recache(s);
              const n = this.constructor.drawData.width * s,
                r = this.constructor.drawData.height * s,
                o = n / 2,
                a = r / 2,
                h = (this.angle - 90) * (Math.PI / 180);
              (i.imageSmoothingEnabled = !0),
                (i.mozImageSmoothingEnabled = !0),
                (i.oImageSmoothingEnabled = !0),
                (i.webkitImageSmoothingEnabled = !0),
                i.translate(t, e),
                i.rotate(h),
                i.drawImage(this.constructor.drawData.canvas, -o, -a, n, r),
                i.rotate(-h),
                i.translate(-t, -e);
            }
          },
          He = Math.pow;
        class Ne extends Ve {
          constructor(t, e, s, i) {
            super(t, e, s, i, 0.3);
          }
          getCode() {
            return (
              "G " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " " +
              this.realAngle.toString(32)
            );
          }
          drawPowerup(t, e) {
            this.game.mod.getVar("crPowerups")
              ? oe(e, this.constructor.drawData, "#0f0")
              : (e.save(),
                (t *= 0.2),
                e.translate(5 * t, 2 * t),
                e.beginPath(),
                e.moveTo(0 * t, 0 * t),
                e.lineTo(97 * t, 0 * t),
                e.lineTo(97 * t, 96 * t),
                e.lineTo(0 * t, 96 * t),
                e.closePath(),
                e.clip(),
                (e.fillStyle = "rgba(0, 0, 0, 0)"),
                (e.strokeStyle = "rgba(0, 0, 0, 0)"),
                (e.lineWidth = Math.max(6 * t, 1)),
                (e.fillStyle = "#376eb7"),
                (e.strokeStyle = "#000000"),
                e.beginPath(),
                e.moveTo(41 * t, 70 * t),
                e.lineTo(41 * t, 95 * t),
                e.lineTo(97 * t, 48 * t),
                e.lineTo(41 * t, 1 * t),
                e.lineTo(41 * t, 25 * t),
                e.lineTo(3 * t, 25 * t),
                e.lineTo(3 * t, 70 * t),
                e.lineTo(41 * t, 70 * t),
                e.closePath(),
                e.closePath(),
                e.fill(),
                e.stroke(),
                e.restore());
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            He(t.pos.x - this.x, 2) + He(t.pos.y - this.y, 2) < 1e3 &&
              e.alive &&
              ((e.gravity.x = this.directionX),
              (e.gravity.y = this.directionY),
              s.isGhost() ||
                e.ignore ||
                (this.scene.message.show(
                  "Gravity Changed",
                  50,
                  "#1F80C3",
                  "#FFFFFF"
                ),
                this.scene.sound.play("gravity_down_sound")));
          }
        }
        Ne.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 22,
          height: 20,
        };
        const Ze = Ne.prototype;
        (Ze.x = 0),
          (Ze.y = 0),
          (Ze.angle = 0),
          (Ze.realAngle = 0),
          (Ze.name = "gravity");
        const Ue = Ne,
          qe = Math.PI,
          Ge = Math.atan2,
          Ye = Math.pow,
          Xe = Math.sqrt,
          Ke = Math.max,
          Je = Math.min;
        class $e extends xe.Z {
          constructor(e, s) {
            super(),
              super.init(e),
              (this.powerup = new s(0, 0, 0, e.scene.track)),
              (this.powerupClass = s),
              (this.p1 = new t.Z(0, 0)),
              (this.p2 = new t.Z(0, 0)),
              (this.active = !1);
          }
          press() {
            this.p1.equ(this.mouse.touch.real),
              this.p2.equ(this.mouse.touch.real),
              (this.active = !0);
          }
          hold() {
            this.p2.equ(this.mouse.touch.real);
            const e = this.p1,
              s = this.p2;
            let i = Ge(s.y - e.y, s.x - e.x);
            i < 0 && (i += 2 * qe),
              e.x === s.x && e.y === s.y && (i = -qe / 2),
              (i = Math.round(i * (180 / qe) + 90) % 360),
              this.toolHandler.gamepad.isButtonDown("ctrl") &&
                this.toolHandler.gamepad.isButtonDown("shift") &&
                ((i = 15 * Math.round(i / 15)), 360 === i && (i = 0));
            const n = new t.Z(
                -Math.sin((i * qe) / 180),
                Math.cos((i * qe) / 180)
              ),
              r = this.mouse.touch.real.sub(e).dot(n);
            (this.p2 = e.add(n.factor(r))),
              (this.powerup.angle = i),
              (this.shouldDrawMetadata =
                this.toolHandler.gamepad.isButtonDown("ctrl"));
          }
          release() {
            const t = this.scene.track,
              e = new this.powerupClass(
                this.p1.x,
                this.p1.y,
                this.powerup.angle,
                t
              );
            (this.powerup.angle = 0),
              t.addPowerup(e),
              (this.active = !1),
              (this.shouldDrawMetadata = !1),
              this.toolHandler.addActionToTimeline({ type: "add", objects: [e] });
          }
          draw(t) {
            const e = this.camera.zoom,
              s = this.scene.settings.device;
            if (this.active) {
              const s = this.p1.toScreen(this.scene);
              this.drawPathToMouse(t, ((this.powerup.angle - 90) * qe) / 180),
                this.powerup.draw(s.x, s.y, e, t);
            } else if ("desktop" === s) {
              const s = this.mouse.touch.real.toScreen(this.scene);
              (t.globalAlpha = 0.8),
                this.powerup.draw(s.x, s.y, e, t),
                (t.globalAlpha = 1);
            }
            this.shouldDrawMetadata && this.drawPointData(t, this.p2);
          }
          drawPathToMouse(t, e) {
            const s = this.scene.camera.zoom,
              i = this.p1.toScreen(this.scene),
              n = this.p2.toScreen(this.scene);
            let r = Xe(Ye(n.x - i.x, 2) + Ye(n.y - i.y, 2));
            r < 30 * s && (r = 30 * s),
              (t.strokeStyle = this.angleStrokeColor),
              (t.lineWidth = Ke(1, 2 * s)),
              t.beginPath(),
              t.moveTo(i.x, i.y),
              t.lineTo(i.x + r, i.y),
              t.stroke(),
              t.beginPath(),
              t.moveTo(i.x, i.y),
              t.lineTo(n.x, n.y),
              t.stroke();
            const o = Je(r, 50 * s);
            t.beginPath(),
              t.moveTo(i.x, i.y),
              t.arc(i.x, i.y, o, e, 0, !1),
              t.moveTo(i.x, i.y),
              t.stroke(),
              (t.fillStyle = this.angleFillColor),
              t.fill(),
              t.closePath();
          }
          drawPointData(t, e) {
            const s = e.toScreen(this.scene),
              i = this.powerup.angle,
              n = this.game.pixelRatio;
            let r = 10;
            (t.textAlign = "left"),
              this.p2.x < this.p1.x && ((r = -10), (t.textAlign = "right")),
              (t.fillStyle = "#000000"),
              (t.strokeStyle = "#ffffff"),
              (t.font = "bold " + 10 * n + "pt arial"),
              (t.lineWidth = 5 * n),
              t.strokeText(i + "°", s.x + r, s.y + 10),
              t.fillText(i + "°", s.x + r, s.y + 10);
          }
        }
        const Qe = $e.prototype;
        (Qe.powerup = null),
          (Qe.p1 = null),
          (Qe.p2 = null),
          (Qe.active = !1),
          (Qe.shouldDrawMetadata = !1);
        const ts = $e;
        class es extends ts {
          constructor(t) {
            super(t, Ue);
          }
        }
        const ss = es.prototype;
        (ss.angleFillColor = "rgba(162, 183, 210,0.2)"),
          (ss.angleStrokeColor = "#A2B7D2"),
          (ss.name = "gravity");
        const is = es;
        class ns extends xe.Z {
          constructor(e, s) {
            super(),
              super.init(e),
              (this.powerupClass = s),
              (this.p1 = new t.Z(0, 0)),
              (this.active = !1);
          }
          draw(t) {
            const e = this.mouse.touch.real,
              s = this.camera.zoom;
            if (this.active) {
              t.globalAlpha = 0.4;
              const e = this.p1.toScreen(this.scene);
              this.powerup.draw(e.x, e.y, s, t), (t.globalAlpha = 1);
            } else if ("desktop" === this.scene.settings.device) {
              t.globalAlpha = 0.8;
              const i = e.toScreen(this.scene);
              this.powerup.draw(i.x, i.y, s, t), (t.globalAlpha = 1);
            }
          }
          press() {
            const t = this.mouse.touch.real;
            this.p1.equ(t), (this.active = !0);
          }
          release() {
            const t = this.scene.track,
              e = new this.powerupClass(this.p1.x, this.p1.y, t);
            t.addPowerup(e),
              (this.active = !1),
              this.toolHandler.addActionToTimeline({ type: "add", objects: [e] });
          }
        }
        const rs = ns.prototype;
        (rs.powerup = null), (rs.p1 = null), (rs.active = !1);
        const os = ns;
        class as extends os {
          constructor(t) {
            super(t, ge), (this.powerup = new ge(0, 0, t.scene.track));
          }
          release() {
            const t = this.scene.track,
              e = new ge(this.p1.x, this.p1.y, t);
            t.addTarget(e),
              t.addPowerup(e),
              (this.active = !1),
              this.toolHandler.addActionToTimeline({ type: "add", objects: [e] });
          }
        }
        as.prototype.name = "goal";
        const hs = as,
          ls = Math.pow;
        class cs extends Ve {
          constructor(t, e, s, i) {
            super(t, e, s, i);
          }
          getCode() {
            return (
              "B " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " " +
              this.realAngle.toString(32)
            );
          }
          drawPowerup(t, e) {
            this.game.mod.getVar("crPowerups")
              ? oe(e, this.constructor.drawData, "#ff0")
              : (e.save(),
                (e.strokeStyle = "rgba(0,0,0,0)"),
                (e.lineCap = "round"),
                (e.fillStyle = "#8ac832"),
                (e.strokeStyle = "#000000"),
                (t *= 0.2),
                (e.lineWidth = Math.max(8 * t, 1)),
                e.beginPath(),
                e.moveTo(0 * t, 0 * t),
                e.lineTo(118 * t, 0 * t),
                e.lineTo(118 * t, 81 * t),
                e.lineTo(0 * t, 81 * t),
                e.closePath(),
                e.beginPath(),
                e.moveTo(3 * t, 1.5 * t),
                e.lineTo(35 * t, 1.7 * t),
                e.lineTo(66 * t, 40 * t),
                e.lineTo(34 * t, 78 * t),
                e.lineTo(4 * t, 78 * t),
                e.lineTo(36 * t, 39 * t),
                e.lineTo(3 * t, 1.5 * t),
                e.closePath(),
                e.moveTo(53 * t, 1.5 * t),
                e.lineTo(85 * t, 1.7 * t),
                e.lineTo(116 * t, 40 * t),
                e.lineTo(84 * t, 78 * t),
                e.lineTo(54 * t, 78 * t),
                e.lineTo(85 * t, 39 * t),
                e.lineTo(53 * t, 1.5 * t),
                e.closePath(),
                e.fill(),
                e.stroke());
          }
          collide(t) {
            const e = t.parent,
              s = e.player,
              i = ls(t.pos.x - this.x, 2) + ls(t.pos.y - this.y, 2),
              n = e.masses,
              r = this.directionX,
              o = this.directionY;
            if (i < 1e3 && e.alive) {
              for (const t of n) (t.pos.x += r), (t.pos.y += o);
              s.isGhost() ||
                e.ignore ||
                (this.scene.sound.play("boost_sound"),
                this.scene.message.show("Boost Engaged", 50, "#8ac832"));
            }
          }
        }
        cs.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 24,
          height: 16,
        };
        const us = cs.prototype;
        (us.x = 0),
          (us.y = 0),
          (us.name = "boost"),
          (us.angle = 0),
          (us.realAngle = 0),
          (us.directionX = 0),
          (us.directionY = 0);
        const ds = cs;
        class ps extends ts {
          constructor(t) {
            super(t, ds);
          }
        }
        const fs = ps.prototype;
        (fs.angleFillColor = "rgba(173, 207, 125,0.2)"),
          (fs.angleStrokeColor = "#ADCF7D"),
          (fs.name = "boost");
        const gs = ps,
          ms = Math.sqrt,
          vs = Math.pow;
        class ys extends ne {
          constructor(t, e, s) {
            super(), (this.x = t), (this.y = e), this.init(s);
          }
          getCode() {
            return "S " + this.x.toString(32) + " " + this.y.toString(32);
          }
          draw(t, e, s, i) {
            this.constructor.drawData.dirty && this.recache(s);
            const n = this.constructor.drawData.width * s,
              r = this.constructor.drawData.height * s;
            i.drawImage(
              this.constructor.drawData.canvas,
              t - n / 2,
              e - r / 2,
              n,
              r
            );
          }
          collide(t) {
            const e = t.parent,
              s = e.player,
              i = ms(vs(t.pos.x - this.x, 2) + vs(t.pos.y - this.y, 2));
            !this.hit &&
              i < 26 &&
              e.alive &&
              ((e.slow = !0),
              s.isGhost() ||
                e.ignore ||
                (this.scene.sound.play("slowmo_sound"),
                this.scene.message.show(
                  "Slow Motion",
                  50,
                  "#FFFFFF",
                  "#000000"
                )));
          }
          drawPowerup(t, e) {
            this.game.mod.getVar("crPowerups")
              ? re(e, this.constructor.drawData, "#eee")
              : (e.save(),
                e.beginPath(),
                (t *= 0.2),
                e.moveTo(0 * t, 0 * t),
                e.lineTo(116 * t, 0 * t),
                e.lineTo(116 * t, 114 * t),
                e.lineTo(0 * t, 114 * t),
                e.closePath(),
                (e.fillStyle = "#FFF"),
                (e.strokeStyle = "#000000"),
                (e.lineWidth = Math.max(3 * t, 0.5)),
                e.beginPath(),
                e.moveTo(58 * t, 111 * t),
                e.bezierCurveTo(
                  89 * t,
                  111 * t,
                  114 * t,
                  87 * t,
                  114 * t,
                  56 * t
                ),
                e.bezierCurveTo(114 * t, 26 * t, 89 * t, 2 * t, 58 * t, 2 * t),
                e.bezierCurveTo(
                  27.1748289 * t,
                  2 * t,
                  2 * t,
                  26 * t,
                  2 * t,
                  56 * t
                ),
                e.bezierCurveTo(
                  2 * t,
                  87 * t,
                  27.1748289 * t,
                  111 * t,
                  58 * t,
                  111 * t
                ),
                e.closePath(),
                e.moveTo(58 * t, 103 * t),
                e.bezierCurveTo(
                  84 * t,
                  103 * t,
                  106 * t,
                  82 * t,
                  106 * t,
                  56 * t
                ),
                e.bezierCurveTo(106 * t, 30 * t, 84 * t, 9 * t, 58 * t, 9 * t),
                e.bezierCurveTo(31 * t, 9 * t, 10 * t, 30 * t, 10 * t, 56 * t),
                e.bezierCurveTo(10 * t, 82 * t, 31 * t, 103 * t, 58 * t, 103 * t),
                e.closePath(),
                e.moveTo(58 * t, 55 * t),
                e.lineTo(37 * t, 23 * t),
                e.lineTo(35 * t, 25 * t),
                e.lineTo(56 * t, 57 * t),
                e.lineTo(58 * t, 55 * t),
                e.closePath(),
                e.moveTo(58.5 * t, 59 * t),
                e.lineTo(81.5 * t, 59 * t),
                e.lineTo(81.5 * t, 56 * t),
                e.lineTo(58.5 * t, 56 * t),
                e.lineTo(58.5 * t, 59 * t),
                e.closePath(),
                e.moveTo(98.5 * t, 59 * t),
                e.lineTo(105.5 * t, 59 * t),
                e.lineTo(105.5 * t, 56 * t),
                e.lineTo(98.5 * t, 56 * t),
                e.lineTo(98.5 * t, 59 * t),
                e.closePath(),
                e.moveTo(11.5 * t, 59 * t),
                e.lineTo(18.5 * t, 59 * t),
                e.lineTo(18.5 * t, 56 * t),
                e.lineTo(11.5 * t, 56 * t),
                e.lineTo(11.5 * t, 59 * t),
                e.closePath(),
                e.moveTo(57 * t, 96 * t),
                e.lineTo(57 * t, 101.5 * t),
                e.lineTo(60 * t, 101.5 * t),
                e.lineTo(60 * t, 96 * t),
                e.lineTo(57 * t, 96 * t),
                e.closePath(),
                e.moveTo(57 * t, 12 * t),
                e.lineTo(57 * t, 17.5 * t),
                e.lineTo(60 * t, 17.5 * t),
                e.lineTo(60 * t, 12 * t),
                e.lineTo(57 * t, 12 * t),
                e.closePath(),
                e.fill(),
                e.stroke());
          }
        }
        ys.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 24,
          height: 24,
        };
        const ws = ys.prototype;
        (ws.x = 0), (ws.y = 0), (ws.name = "slowmo");
        const xs = ys;
        class bs extends os {
          constructor(t) {
            super(t, xs), (this.powerup = new xs(0, 0, t.scene.track));
          }
        }
        bs.prototype.name = "slowmo";
        const _s = bs,
          Ts = Math.sqrt,
          Cs = Math.pow,
          ks = Math.random;
        class Ss extends ne {
          constructor(t, e, s) {
            super(),
              (this.x = t),
              (this.y = e),
              (this.id = ks().toString(36).substr(2)),
              this.init(s);
          }
          getCode() {
            return "C " + this.x.toString(32) + " " + this.y.toString(32);
          }
          draw(t, e, s, i) {
            this.constructor.drawData.dirty && this.recache(s);
            const n = this.constructor.drawData.width * s,
              r = this.constructor.drawData.height * s,
              o = n / 2,
              a = r / 2;
            i.save(),
              this.hit && (i.globalAlpha = 0.3),
              i.drawImage(this.constructor.drawData.canvas, t - o, e - a, n, r),
              i.restore();
          }
          drawPowerup(t, e) {
            this.game.mod.getVar("crPowerups")
              ? re(e, this.constructor.drawData, "#00f")
              : ((t *= 0.15),
                e.save(),
                e.translate(1, 1),
                e.beginPath(),
                e.moveTo(0 * t, 0 * t),
                e.lineTo(112 * t, 0 * t),
                e.lineTo(112 * t, 95 * t),
                e.lineTo(0 * t, 95 * t),
                e.closePath(),
                (e.fillStyle = "#826cdc"),
                (e.strokeStyle = "#000000"),
                (e.lineWidth = 8 * t),
                e.beginPath(),
                e.moveTo(3 * t, 10 * t),
                e.bezierCurveTo(3 * t, 10 * t, 33.5 * t, 27 * t, 55 * t, 10 * t),
                e.bezierCurveTo(76 * t, -6 * t, 108 * t, 10 * t, 108 * t, 10 * t),
                e.lineTo(109 * t, 86 * t),
                e.bezierCurveTo(
                  109 * t,
                  86 * t,
                  74 * t,
                  73.5 * t,
                  56.5 * t,
                  86 * t
                ),
                e.bezierCurveTo(40 * t, 98 * t, 3 * t, 88.5 * t, 3 * t, 88.5 * t),
                e.lineTo(3 * t, 10 * t),
                e.closePath(),
                e.fill(),
                e.stroke(),
                e.beginPath(),
                (e.lineWidth = 15 * t),
                e.moveTo(3 * t, 10 * t),
                e.lineTo(3 * t, 180 * t),
                e.stroke(),
                e.restore());
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            if (!e.ignore) {
              const i = Ts(Cs(t.pos.x - this.x, 2) + Cs(t.pos.y - this.y, 2)),
                n = s._powerupsConsumed.checkpoints;
              i < 26 &&
                e.alive &&
                -1 === n.indexOf(this.id) &&
                (n.push(this.id),
                s.setCheckpointOnUpdate(),
                s.isGhost() ||
                  ((this.hit = !0),
                  (this.sector.powerupCanvasDrawn = !1),
                  this.scene.message.show(
                    "Checkpoint Saved",
                    50,
                    "#826cdc",
                    "#FFFFFF"
                  ),
                  this.scene.sound.play("checkpoint_sound")));
            }
          }
        }
        Ss.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 20,
          height: 32,
        };
        const As = Ss.prototype;
        (As.x = 0), (As.y = 0), (As.name = "checkpoint");
        const Ps = Ss;
        class Ms extends os {
          constructor(t) {
            super(t, Ps), (this.powerup = new Ps(0, 0, t.scene.track));
          }
        }
        Ms.prototype.name = "checkpoint";
        const Is = Ms,
          Bs = Math.pow,
          Ds = Math.sqrt;
        class Es extends ne {
          constructor(t, e, s) {
            super(), (this.x = t), (this.y = e), (this.hit = !1), this.init(s);
          }
          getCode() {
            return "O " + this.x.toString(32) + " " + this.y.toString(32);
          }
          drawPowerup(t, e) {
            this.game.mod.getVar("crPowerups")
              ? re(e, this.constructor.drawData, "#f00")
              : ((t *= 0.2),
                (e.fillStyle = "#000"),
                (e.strokeStyle = "#000"),
                (e.lineWidth = 8 * t),
                e.beginPath(),
                e.moveTo(53 * t, 105 * t),
                e.lineTo(41.5 * t, 115 * t),
                e.lineTo(43 * t, 100 * t),
                e.bezierCurveTo(
                  35.5 * t,
                  95 * t,
                  30 * t,
                  88.5 * t,
                  26.5 * t,
                  80 * t
                ),
                e.lineTo(11 * t, 78 * t),
                e.lineTo(24 * t, 69.5 * t),
                e.bezierCurveTo(24 * t, 68 * t, 24 * t, 67 * t, 24 * t, 66 * t),
                e.bezierCurveTo(24 * t, 58.5 * t, 26 * t, 51 * t, 30 * t, 45 * t),
                e.lineTo(22 * t, 31.5 * t),
                e.lineTo(37.5 * t, 36 * t),
                e.bezierCurveTo(
                  43.5 * t,
                  31 * t,
                  51 * t,
                  27.5 * t,
                  60 * t,
                  26 * t
                ),
                e.lineTo(66 * t, 11 * t),
                e.lineTo(72 * t, 26.5 * t),
                e.bezierCurveTo(
                  80.5 * t,
                  27.5 * t,
                  88 * t,
                  31 * t,
                  93.5 * t,
                  36.5 * t
                ),
                e.lineTo(110 * t, 31.5 * t),
                e.lineTo(101.5 * t, 46 * t),
                e.bezierCurveTo(
                  105 * t,
                  52 * t,
                  107 * t,
                  59 * t,
                  107 * t,
                  66 * t
                ),
                e.bezierCurveTo(
                  107 * t,
                  67 * t,
                  107 * t,
                  68 * t,
                  107 * t,
                  69 * t
                ),
                e.lineTo(121 * t, 78 * t),
                e.lineTo(104.5 * t, 80.5 * t),
                e.bezierCurveTo(
                  101.5 * t,
                  88 * t,
                  96 * t,
                  95 * t,
                  89 * t,
                  99.5 * t
                ),
                e.lineTo(90.5 * t, 115 * t),
                e.lineTo(78.5 * t, 104.5 * t),
                e.bezierCurveTo(
                  74.5 * t,
                  106 * t,
                  70 * t,
                  107 * t,
                  65.5 * t,
                  107 * t
                ),
                e.bezierCurveTo(
                  61 * t,
                  107 * t,
                  57 * t,
                  106 * t,
                  53 * t,
                  105 * t
                ),
                e.lineTo(53 * t, 105 * t),
                e.closePath(),
                e.fill(),
                e.stroke(),
                e.beginPath(),
                e.arc(66 * t, 66 * t, 40 * t, 0 * t, 2 * Math.PI, !0),
                (e.lineWidth = 2 * t),
                (e.fillStyle = "#d12929"),
                e.fill(),
                e.stroke(),
                e.beginPath(),
                e.arc(66 * t, 66 * t, 8 * t, 0 * t, 2 * Math.PI, !0),
                (e.lineWidth = 2 * t),
                (e.fillStyle = "#000"),
                e.fill(),
                e.stroke());
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            Ds(Bs(t.pos.x - this.x, 2) + Bs(t.pos.y - this.y, 2)) < 20 &&
              e.alive &&
              (e.explode(),
              s.isGhost() ||
                e.ignore ||
                ((this.hit = !0), (this.sector.powerupCanvasDrawn = !1)));
          }
        }
        Es.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 26,
          height: 26,
        };
        const Ls = Es.prototype;
        (Ls.x = 0), (Ls.y = 0), (Ls.name = "bomb");
        const zs = Es;
        class Os extends os {
          constructor(t) {
            super(t, zs), (this.powerup = new zs(0, 0, t.scene.track));
          }
        }
        Os.prototype.name = "bomb";
        const Fs = Os,
          js = Math.pow;
        class Rs extends ne {
          constructor(t, e, s) {
            super(), (this.x = t), (this.y = e), this.init(s);
          }
          getCode() {
            return "A " + this.x.toString(32) + " " + this.y.toString(32);
          }
          draw(t, e, s, i) {
            this.constructor.drawData.dirty && this.recache(s);
            const n = this.constructor.drawData.width * s,
              r = this.constructor.drawData.height * s,
              o = n / 2,
              a = r / 2;
            i.translate(t, e),
              i.drawImage(this.constructor.drawData.canvas, -o, -a, n, r),
              i.translate(-t, -e);
          }
          drawPowerup(t, e) {
            this.game.mod.getVar("crPowerups")
              ? re(e, this.constructor.drawData, "#0ff")
              : ((t *= 0.5),
                e.save(),
                e.beginPath(),
                e.scale(t, t),
                e.moveTo(0, 0),
                e.lineTo(50, 0),
                e.lineTo(50, 50),
                e.lineTo(0, 50),
                e.closePath(),
                e.clip(),
                e.translate(0, 0),
                e.translate(0, 0),
                e.scale(1, 1),
                e.translate(0, 0),
                (e.strokeStyle = "rgba(0,0,0,0)"),
                (e.lineCap = "butt"),
                (e.lineJoin = "miter"),
                (e.miterLimit = 4),
                e.save(),
                e.restore(),
                e.save(),
                e.restore(),
                e.save(),
                (e.fillStyle = "rgba(0, 0, 0, 0)"),
                (e.strokeStyle = "rgba(0, 0, 0, 0)"),
                (e.lineWidth = 1),
                e.translate(-726, -131),
                e.save(),
                e.translate(726, 131),
                e.save(),
                (e.fillStyle = "#08faf3"),
                (e.strokeStyle = "#000000"),
                (e.lineWidth = 2),
                e.beginPath(),
                e.moveTo(25, 36),
                e.bezierCurveTo(18.9251591, 36, 14, 31.0751824, 14, 25),
                e.bezierCurveTo(14, 18.9248176, 18.9251591, 14, 25, 14),
                e.bezierCurveTo(31.0751824, 14, 36, 18.9248176, 36, 25),
                e.bezierCurveTo(36, 31.0751824, 31.0751824, 36, 25, 36),
                e.closePath(),
                e.fill(),
                e.stroke(),
                e.restore(),
                e.save(),
                (e.fillStyle = "#000000"),
                e.beginPath(),
                e.moveTo(25, 35),
                e.bezierCurveTo(30.5228976, 35, 35, 30.5228976, 35, 25),
                e.bezierCurveTo(35, 19.4771024, 30.5228976, 15, 25, 15),
                e.bezierCurveTo(19.4773211, 15, 15, 19.4772251, 15, 25),
                e.bezierCurveTo(15, 30.5227749, 19.4773211, 35, 25, 35),
                e.closePath(),
                e.moveTo(25, 37),
                e.bezierCurveTo(18.3727612, 37, 13, 31.627354, 13, 25),
                e.bezierCurveTo(13, 18.372646, 18.3727612, 13, 25, 13),
                e.bezierCurveTo(31.6274671, 13, 37, 18.3725329, 37, 25),
                e.bezierCurveTo(37, 31.6274671, 31.6274671, 37, 25, 37),
                e.closePath(),
                e.fill(),
                e.stroke(),
                e.restore(),
                e.save(),
                (e.fillStyle = "#000000"),
                e.beginPath(),
                e.moveTo(1.0370609, 29.702878),
                e.lineTo(0.571767448, 27.3196417),
                e.lineTo(10.8190136, 27.3196417),
                e.lineTo(11.2235626, 28.7886215),
                e.bezierCurveTo(
                  12.5553335,
                  33.6244869,
                  16.3752072,
                  37.4442862,
                  21.2110994,
                  38.7761385
                ),
                e.lineTo(22.6800518, 39.1807024),
                e.lineTo(22.6800518, 49.4279421),
                e.lineTo(20.2968028, 48.9626301),
                e.bezierCurveTo(
                  10.5816525,
                  47.0658182,
                  2.93381735,
                  39.4180779,
                  1.0370609,
                  29.702878
                ),
                e.closePath(),
                e.moveTo(48.9629391, 20.297122),
                e.lineTo(49.4282326, 22.6803583),
                e.lineTo(39.1809639, 22.6803583),
                e.lineTo(38.7764299, 21.2113511),
                e.bezierCurveTo(
                  37.4446547,
                  16.3752014,
                  33.624798,
                  12.5554192,
                  28.7886215,
                  11.2235626
                ),
                e.lineTo(27.3196417, 10.8190136),
                e.lineTo(27.3196417, 0.571783441),
                e.lineTo(29.7028653, 1.03705842),
                e.bezierCurveTo(
                  39.418382,
                  2.93381152,
                  47.0661305,
                  10.5816549,
                  48.9629391,
                  20.297122
                ),
                e.closePath(),
                e.moveTo(11.2235701, 21.2113511),
                e.lineTo(10.8190361, 22.6803583),
                e.lineTo(0.571767448, 22.6803583),
                e.lineTo(1.0370609, 20.297122),
                e.bezierCurveTo(
                  2.93380373,
                  10.5819918,
                  10.5815702,
                  2.93422536,
                  20.2967378,
                  1.03707606
                ),
                e.lineTo(22.6800518, 0.571669532),
                e.lineTo(22.6800518, 10.8189911),
                e.lineTo(21.2110994, 11.223555),
                e.bezierCurveTo(
                  16.3751604,
                  12.5554202,
                  12.5553324,
                  16.3752482,
                  11.2235701,
                  21.2113511
                ),
                e.closePath(),
                e.moveTo(29.7028653, 48.9626351),
                e.lineTo(27.3196417, 49.4279101),
                e.lineTo(27.3196417, 39.1806799),
                e.lineTo(28.7886215, 38.7761309),
                e.bezierCurveTo(
                  33.6247513,
                  37.4442873,
                  37.4446537,
                  33.6245336,
                  38.7764374,
                  28.7886215
                ),
                e.lineTo(39.1809864, 27.3196417),
                e.lineTo(49.4282326, 27.3196417),
                e.lineTo(48.9629391, 29.702878),
                e.bezierCurveTo(
                  47.0661446,
                  39.4182726,
                  39.4184545,
                  47.0658678,
                  29.7028653,
                  48.9626351
                ),
                e.closePath(),
                e.fill(),
                e.stroke(),
                e.restore(),
                e.save(),
                (e.fillStyle = "#08faf3"),
                e.beginPath(),
                e.moveTo(3, 29.3196417),
                e.bezierCurveTo(
                  4.74079001,
                  38.2359804,
                  11.7640196,
                  45.2589035,
                  20.6800518,
                  46.9996935
                ),
                e.lineTo(20.6800518, 40.7043471),
                e.bezierCurveTo(
                  15.1649961,
                  39.1854465,
                  10.814247,
                  34.8350039,
                  9.29534642,
                  29.3196417
                ),
                e.lineTo(3, 29.3196417),
                e.closePath(),
                e.moveTo(47, 20.6803583),
                e.bezierCurveTo(
                  45.25921,
                  11.7640196,
                  38.2362869,
                  4.74079001,
                  29.3196417,
                  3
                ),
                e.lineTo(29.3196417, 9.29534642),
                e.bezierCurveTo(
                  34.8350039,
                  10.814247,
                  39.185753,
                  15.1646897,
                  40.7046536,
                  20.6803583
                ),
                e.lineTo(47, 20.6803583),
                e.closePath(),
                e.moveTo(9.29534642, 20.6803583),
                e.bezierCurveTo(
                  10.814247,
                  15.1646897,
                  15.1649961,
                  10.814247,
                  20.6800518,
                  9.29534642
                ),
                e.lineTo(20.6800518, 3),
                e.bezierCurveTo(
                  11.7640196,
                  4.74109649,
                  4.74079001,
                  11.7640196,
                  3,
                  20.6803583
                ),
                e.lineTo(9.29534642, 20.6803583),
                e.closePath(),
                e.moveTo(29.3196417, 46.9996935),
                e.bezierCurveTo(
                  38.2362869,
                  45.2589035,
                  45.25921,
                  38.2359804,
                  47,
                  29.3196417
                ),
                e.lineTo(40.7046536, 29.3196417),
                e.bezierCurveTo(
                  39.185753,
                  34.8350039,
                  34.8350039,
                  39.1854465,
                  29.3196417,
                  40.7043471
                ),
                e.lineTo(29.3196417, 46.9996935),
                e.closePath(),
                e.fill(),
                e.stroke(),
                e.restore(),
                e.restore(),
                e.restore(),
                e.restore());
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            js(t.pos.x - this.x, 2) + js(t.pos.y - this.y, 2) < 1e3 &&
              e.alive &&
              (s.isGhost() ||
                e.ignore ||
                ((0 === e.gravity.x && 0 === e.gravity.y) ||
                  this.scene.sound.play("antigravity_sound", 0.3),
                this.scene.message.show("Antigravity Engaged", 50, "#08faf3")),
              (e.gravity.x = 0),
              (e.gravity.y = 0));
          }
        }
        Rs.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 25,
          height: 25,
        };
        const Ws = Rs.prototype;
        (Ws.x = 0), (Ws.y = 0), (Ws.name = "antigravity");
        const Vs = Rs;
        class Hs extends os {
          constructor(t) {
            super(t, Vs), (this.powerup = new Vs(0, 0, t.scene.track));
          }
        }
        Hs.prototype.name = "antigravity";
        const Ns = Hs,
          Zs = Math.sqrt,
          Us = Math.pow,
          qs = Math.random;
        class Gs extends ne {
          constructor(t, e, s) {
            super(),
              (this.x = t),
              (this.y = e),
              (this.id = qs().toString(36).substr(2)),
              this.init(s);
          }
          erase(t, e) {
            let s = !1;
            return (
              this.remove ||
                (e >= Zs(Us(t.x - this.x, 2) + Us(t.y - this.y, 2)) &&
                  ((s = [this, this.otherPortal]),
                  (this.remove = 1),
                  (this.otherPortal.remove = 1),
                  this.redrawSectors(),
                  this.otherPortal.redrawSectors())),
              s
            );
          }
          addOtherPortalRef(t) {
            this.otherPortal = t;
          }
          getCode() {
            let t = "";
            return (
              !this.recorded && this.otherPortal.recorded
                ? (this.recorded = !0)
                : !1 === this.recorded && !1 === this.otherPortal.recorded
                ? ((this.recorded = !0),
                  (t =
                    "W " +
                    this.x.toString(32) +
                    " " +
                    this.y.toString(32) +
                    " " +
                    this.otherPortal.x.toString(32) +
                    " " +
                    this.otherPortal.y.toString(32)))
                : !0 === this.recorded &&
                  !0 === this.otherPortal.recorded &&
                  ((this.otherPortal.recorded = !1),
                  (t =
                    "W " +
                    this.x.toString(32) +
                    " " +
                    this.y.toString(32) +
                    " " +
                    this.otherPortal.x.toString(32) +
                    " " +
                    this.otherPortal.y.toString(32))),
              t
            );
          }
          drawPowerup(t, e) {
            if (this.game.mod.getVar("crPowerups"))
              re(e, this.constructor.drawData, "#f0f");
            else {
              const s = 0.65 * t;
              e.save(),
                e.scale(s, s),
                e.save(),
                e.beginPath(),
                e.moveTo(0, 0),
                e.lineTo(44, 0),
                e.lineTo(44, 48),
                e.lineTo(0, 48),
                e.closePath(),
                e.clip(),
                e.translate(0, 0),
                e.translate(0, 0),
                e.scale(1, 1),
                e.translate(0, 0),
                (e.strokeStyle = "rgba(0,0,0,0)"),
                (e.lineCap = "butt"),
                (e.lineJoin = "miter"),
                (e.miterLimit = 4),
                e.save(),
                e.restore(),
                e.save(),
                e.restore(),
                e.save(),
                (e.fillStyle = "rgba(0, 0, 0, 0)"),
                (e.strokeStyle = "rgba(0, 0, 0, 0)"),
                (e.lineWidth = 1),
                e.translate(-788, -50),
                e.save(),
                e.translate(790, 52),
                e.save(),
                (e.fillStyle = "#000000"),
                e.beginPath(),
                e.moveTo(17, 3),
                e.bezierCurveTo(
                  16.9424049,
                  2.83458834,
                  16.4420628,
                  2.62968665,
                  15.9196825,
                  2.4515011
                ),
                e.lineTo(8.51063934, -0.0757469011),
                e.lineTo(16.223952, -1.41205186),
                e.bezierCurveTo(
                  21.2423806,
                  -2.2814774,
                  25.8773816,
                  -1.40451316,
                  29.9447883,
                  0.583562762
                ),
                e.bezierCurveTo(
                  31.7394578,
                  1.46076529,
                  33.0361403,
                  2.35169307,
                  33.7316821,
                  2.95217334
                ),
                e.bezierCurveTo(
                  35.1972328,
                  4.14751314,
                  36.509471,
                  5.52829294,
                  37.6336956,
                  7.05811132
                ),
                e.bezierCurveTo(
                  39.8993675,
                  10.1439271,
                  41.2801108,
                  13.6041318,
                  41.7252304,
                  17.3208639
                ),
                e.bezierCurveTo(
                  41.7397043,
                  17.4414782,
                  41.7543021,
                  17.5670407,
                  41.7704814,
                  17.7094344
                ),
                e.bezierCurveTo(
                  41.7921038,
                  17.9009058,
                  41.7921038,
                  17.9009058,
                  41.8132645,
                  18.0904969
                ),
                e.lineTo(41.840873, 18.3390683),
                e.lineTo(41.8856209, 18.735971),
                e.lineTo(41.8856209, 21.4226506),
                e.lineTo(41.8542399, 21.5977061),
                e.bezierCurveTo(
                  41.8009577,
                  21.89487,
                  41.7866262,
                  21.9747988,
                  41.7740749,
                  22.044061
                ),
                e.bezierCurveTo(
                  41.759051,
                  22.1809078,
                  41.759051,
                  22.1809078,
                  41.7559584,
                  22.2091488
                ),
                e.bezierCurveTo(
                  41.6872107,
                  22.8267498,
                  41.6438556,
                  23.1562694,
                  41.5609313,
                  23.6049736
                ),
                e.bezierCurveTo(
                  40.8769441,
                  27.3127264,
                  39.3221077,
                  30.5993535,
                  36.9456235,
                  33.3462518
                ),
                e.bezierCurveTo(
                  32.8945821,
                  38.029004,
                  27.65733,
                  40.5391341,
                  21.868366,
                  40.5391341
                ),
                e.bezierCurveTo(
                  21.742671,
                  40.5391341,
                  21.6184358,
                  40.538205,
                  21.4955986,
                  40.5363608
                ),
                e.bezierCurveTo(
                  22.1492681,
                  41.0434881,
                  22.8806236,
                  41.5794806,
                  23.6943816,
                  42.1440112
                ),
                e.lineTo(28.4276887, 45.4276613),
                e.lineTo(22.6779106, 45.7834802),
                e.bezierCurveTo(
                  18.1741264,
                  46.062192,
                  14.0554746,
                  45.155711,
                  10.4302114,
                  43.4736066
                ),
                e.bezierCurveTo(
                  8.54152696,
                  42.5972663,
                  7.17424655,
                  41.7066293,
                  6.38621142,
                  41.0629331
                ),
                e.bezierCurveTo(
                  4.99599225,
                  40.025971,
                  3.38305673,
                  38.3146562,
                  2.25448469,
                  36.778713
                ),
                e.bezierCurveTo(
                  -0.0125398982,
                  33.6943248,
                  -1.39399999,
                  30.2338948,
                  -1.84021156,
                  26.5118367
                ),
                e.bezierCurveTo(
                  -1.86468983,
                  26.3063181,
                  -1.88762639,
                  26.1042985,
                  -1.92006182,
                  25.811651
                ),
                e.lineTo(-1.95463612, 25.5020237),
                e.lineTo(-2.00013072, 25.1020716),
                e.lineTo(-2.00013072, 22.4141906),
                e.lineTo(-1.96885958, 22.2394346),
                e.bezierCurveTo(
                  -1.92214724,
                  21.9784071,
                  -1.90657901,
                  21.8914122,
                  -1.89618079,
                  21.8334198
                ),
                e.bezierCurveTo(
                  -1.83478692,
                  21.2274076,
                  -1.79887919,
                  20.9331002,
                  -1.72945035,
                  20.5323584
                ),
                e.bezierCurveTo(
                  -0.927733904,
                  15.885014,
                  1.1979378,
                  11.9079902,
                  4.5664052,
                  8.76464131
                ),
                e.bezierCurveTo(
                  8.29993169,
                  5.27968493,
                  12.7861394,
                  3.24768826,
                  17.4210789,
                  3.06365477
                ),
                e.closePath(),
                e.fill(),
                e.stroke(),
                e.restore(),
                e.save(),
                (e.fillStyle = "#dd45ec"),
                e.beginPath(),
                e.moveTo(23.9052288, 5.91261647),
                e.bezierCurveTo(
                  23.9052288,
                  5.91261647,
                  22.5543791,
                  5.13614588,
                  18.1099346,
                  5.04995765
                ),
                e.bezierCurveTo(
                  13.6479739,
                  5.05021647,
                  9.39411765,
                  6.99424,
                  5.93111111,
                  10.2266871
                ),
                e.bezierCurveTo(
                  2.88431373,
                  13.0698635,
                  0.969542484,
                  16.6517224,
                  0.241437908,
                  20.8723576
                ),
                e.bezierCurveTo(
                  0.169019608,
                  21.2903576,
                  0.131372549,
                  21.6617694,
                  0.101045752,
                  21.9601929
                ),
                e.bezierCurveTo(
                  0.0960784314,
                  22.0104047,
                  0.0911111111,
                  22.0611341,
                  0.0858823529,
                  22.1113459
                ),
                e.bezierCurveTo(
                  0.0837908497,
                  22.1227341,
                  0.0816993464,
                  22.1341224,
                  0.0796078431,
                  22.1452518
                ),
                e.lineTo(-0.000130718954, 22.5917224),
                e.lineTo(-0.000130718954, 23.0451812),
                e.lineTo(-0.000130718954, 24.6993224),
                e.lineTo(-0.000130718954, 24.9886871),
                e.lineTo(0.0325490196, 25.2759812),
                e.lineTo(0.0675816993, 25.5896753),
                e.bezierCurveTo(
                  0.0929411765,
                  25.8184753,
                  0.118562092,
                  26.0470165,
                  0.145751634,
                  26.2752988
                ),
                e.bezierCurveTo(
                  0.550457516,
                  29.6511341,
                  1.80196078,
                  32.7860047,
                  3.86601307,
                  35.59424
                ),
                e.bezierCurveTo(
                  4.76326797,
                  36.8153694,
                  6.27176471,
                  38.4928047,
                  7.6179085,
                  39.4864282
                ),
                e.bezierCurveTo(
                  7.6179085,
                  39.4864282,
                  13.4911111,
                  44.3481694,
                  22.5543791,
                  43.7872988
                ),
                e.bezierCurveTo(
                  16.5849673,
                  39.6461224,
                  15.7624837,
                  37.5460282,
                  15.7624837,
                  37.5460282
                ),
                e.bezierCurveTo(
                  16.4521569,
                  37.6208282,
                  18.1535948,
                  38.5391341,
                  21.868366,
                  38.5391341
                ),
                e.bezierCurveTo(
                  27.0628758,
                  38.5391341,
                  31.7535948,
                  36.2909929,
                  35.4330719,
                  32.0377459
                ),
                e.bezierCurveTo(
                  37.5739869,
                  29.5631341,
                  38.9739869,
                  26.6037459,
                  39.5941176,
                  23.2421459
                ),
                e.bezierCurveTo(
                  39.6816993,
                  22.76824,
                  39.7295425,
                  22.3354871,
                  39.7682353,
                  21.9878871
                ),
                e.bezierCurveTo(
                  39.7768627,
                  21.9092047,
                  39.7852288,
                  21.8300047,
                  39.7946405,
                  21.7510635
                ),
                e.bezierCurveTo(
                  39.7983007,
                  21.7319106,
                  39.8019608,
                  21.7124988,
                  39.8053595,
                  21.6930871
                ),
                e.lineTo(39.8856209, 21.2448047),
                e.lineTo(39.8856209, 20.7895341),
                e.lineTo(39.8856209, 19.1356518),
                e.lineTo(39.8856209, 18.8483576),
                e.lineTo(39.8534641, 18.5631341),
                e.lineTo(39.8254902, 18.3112988),
                e.bezierCurveTo(
                  39.7975163,
                  18.0607576,
                  39.7695425,
                  17.8096988,
                  39.7394771,
                  17.5591576
                ),
                e.bezierCurveTo(
                  39.3355556,
                  14.1864282,
                  38.0845752,
                  11.0515576,
                  36.0215686,
                  8.24176941
                ),
                e.bezierCurveTo(
                  34.9975163,
                  6.84826353,
                  33.8019608,
                  5.59038118,
                  32.4675817,
                  4.50202824
                ),
                e.bezierCurveTo(
                  32.4675817,
                  4.50202824,
                  25.996732,
                  -1.07536,
                  16.5653595,
                  0.558592941
                ),
                e.bezierCurveTo(
                  21.6393464,
                  2.28934588,
                  23.9052288,
                  5.91261647,
                  23.9052288,
                  5.91261647
                ),
                e.fill(),
                e.stroke(),
                e.restore(),
                e.save(),
                (e.fillStyle = "#fefefe"),
                e.beginPath(),
                e.moveTo(5.22875817, 24.6992965),
                e.lineTo(5.22875817, 23.0451553),
                e.bezierCurveTo(
                  5.24078431,
                  22.97812,
                  5.25647059,
                  22.9113435,
                  5.26457516,
                  22.8437906
                ),
                e.bezierCurveTo(
                  5.30823529,
                  22.4770376,
                  5.33254902,
                  22.1071788,
                  5.39555556,
                  21.7440494
                ),
                e.bezierCurveTo(
                  5.9179085,
                  18.7173671,
                  7.26117647,
                  16.0988494,
                  9.5179085,
                  13.9930612
                ),
                e.bezierCurveTo(
                  12.7882353,
                  10.9404965,
                  16.6520261,
                  9.83428471,
                  21.0614379,
                  10.8020259
                ),
                e.bezierCurveTo(
                  23.1579085,
                  11.2619553,
                  24.9563399,
                  12.2887082,
                  26.3997386,
                  13.8804729
                ),
                e.bezierCurveTo(
                  27.8005229,
                  15.4251318,
                  28.5681046,
                  17.2482847,
                  28.8130719,
                  19.3033435
                ),
                e.bezierCurveTo(
                  29.0044444,
                  20.9103788,
                  28.7861438,
                  22.4467553,
                  28.0836601,
                  23.9122141
                ),
                e.bezierCurveTo(
                  26.5186928,
                  27.1764965,
                  23.3458824,
                  28.74652,
                  19.8862745,
                  27.9666847
                ),
                e.bezierCurveTo(
                  17.6018301,
                  27.4518847,
                  16.0658824,
                  25.7762612,
                  15.7793464,
                  23.4833435
                ),
                e.bezierCurveTo(
                  15.7513725,
                  23.2566141,
                  15.7422222,
                  23.0278141,
                  15.7233987,
                  22.7920259
                ),
                e.bezierCurveTo(
                  15.6826144,
                  22.7959082,
                  15.6577778,
                  22.7959082,
                  15.6345098,
                  22.8013435
                ),
                e.bezierCurveTo(
                  15.2580392,
                  22.8929671,
                  15.0844444,
                  23.1867318,
                  14.9532026,
                  23.5037906
                ),
                e.bezierCurveTo(
                  14.6407843,
                  24.2592965,
                  14.6128105,
                  25.0383553,
                  14.8180392,
                  25.8238847
                ),
                e.bezierCurveTo(
                  15.1252288,
                  26.9999788,
                  15.8075817,
                  27.9480494,
                  16.7301961,
                  28.7162376
                ),
                e.bezierCurveTo(
                  19.105098,
                  30.6939082,
                  21.8201307,
                  31.2356259,
                  24.7777778,
                  30.3869435
                ),
                e.bezierCurveTo(
                  27.9027451,
                  29.4903788,
                  30.1628758,
                  27.5002847,
                  31.6556863,
                  24.6703082
                ),
                e.bezierCurveTo(
                  33.1751634,
                  21.7893435,
                  33.4169935,
                  18.73652,
                  32.7003922,
                  15.5969906
                ),
                e.bezierCurveTo(
                  32.1134641,
                  13.0263553,
                  30.9056209,
                  10.7471553,
                  29.2807843,
                  8.67397882
                ),
                e.bezierCurveTo(
                  29.2345098,
                  8.61496706,
                  29.1887582,
                  8.55595529,
                  29.1427451,
                  8.49694353
                ),
                e.bezierCurveTo(
                  30.1487582,
                  9.31767294,
                  31.0295425,
                  10.2476259,
                  31.7918954,
                  11.2855082
                ),
                e.bezierCurveTo(
                  33.305098,
                  13.3460024,
                  34.2433987,
                  15.6329671,
                  34.5471895,
                  18.1681435
                ),
                e.bezierCurveTo(
                  34.5856209,
                  18.4903788,
                  34.6206536,
                  18.8131318,
                  34.6569935,
                  19.1356259
                ),
                e.lineTo(34.6569935, 20.7897671),
                e.bezierCurveTo(
                  34.6449673,
                  20.8565435,
                  34.629281,
                  20.92332,
                  34.620915,
                  20.9908729
                ),
                e.bezierCurveTo(
                  34.5644444,
                  21.4313906,
                  34.5309804,
                  21.8763082,
                  34.4501961,
                  22.3121671
                ),
                e.bezierCurveTo(
                  34.0122876,
                  24.6873906,
                  33.0475817,
                  26.8374376,
                  31.4616993,
                  28.6706847
                ),
                e.bezierCurveTo(
                  28.1134641,
                  32.5408729,
                  23.9121569,
                  34.11012,
                  18.8256209,
                  33.0287553
                ),
                e.bezierCurveTo(
                  16.5994771,
                  32.5553671,
                  14.72,
                  31.4287082,
                  13.2504575,
                  29.68372
                ),
                e.bezierCurveTo(
                  11.9879739,
                  28.1846141,
                  11.2983007,
                  26.4463553,
                  11.0705882,
                  24.5126847
                ),
                e.bezierCurveTo(
                  10.871634,
                  22.8236024,
                  11.1286275,
                  21.2212259,
                  11.9113725,
                  19.7042612
                ),
                e.bezierCurveTo(
                  13.5228758,
                  16.5810376,
                  16.6386928,
                  15.0982376,
                  19.9803922,
                  15.8646141
                ),
                e.bezierCurveTo(
                  22.303268,
                  16.3975318,
                  23.7997386,
                  18.0288965,
                  24.1079739,
                  20.3696965
                ),
                e.bezierCurveTo(
                  24.136732,
                  20.5899553,
                  24.1440523,
                  20.8128024,
                  24.1662745,
                  21.1008729
                ),
                e.bezierCurveTo(
                  24.343268,
                  20.9921671,
                  24.5147712,
                  20.9334141,
                  24.6146405,
                  20.8153906
                ),
                e.bezierCurveTo(
                  24.7620915,
                  20.6414612,
                  24.8909804,
                  20.4375082,
                  24.970719,
                  20.2255318
                ),
                e.bezierCurveTo(
                  25.28,
                  19.4032494,
                  25.2648366,
                  18.5688024,
                  24.9890196,
                  17.7405671
                ),
                e.bezierCurveTo(
                  24.5738562,
                  16.4935553,
                  23.7654902,
                  15.5263318,
                  22.715817,
                  14.7615082
                ),
                e.bezierCurveTo(
                  20.315817,
                  13.0147082,
                  17.6664052,
                  12.6334612,
                  14.8541176,
                  13.5207082
                ),
                e.bezierCurveTo(
                  11.8538562,
                  14.4672259,
                  9.67267974,
                  16.4187553,
                  8.23006536,
                  19.1622847
                ),
                e.bezierCurveTo(
                  6.68470588,
                  22.1014847,
                  6.45960784,
                  25.2078847,
                  7.22352941,
                  28.3996965
                ),
                e.bezierCurveTo(
                  7.82248366,
                  30.8996729,
                  9.0096732,
                  33.1206376,
                  10.5921569,
                  35.1438612
                ),
                e.bezierCurveTo(
                  10.6420915,
                  35.2083082,
                  10.692549,
                  35.2724965,
                  10.743268,
                  35.3364259
                ),
                e.bezierCurveTo(
                  9.97568627,
                  34.7698612,
                  8.83764706,
                  33.5606376,
                  8.09385621,
                  32.5486376
                ),
                e.bezierCurveTo(
                  6.57986928,
                  30.4886612,
                  5.6420915,
                  28.2016965,
                  5.33830065,
                  25.66652
                ),
                e.bezierCurveTo(
                  5.29960784,
                  25.3442847,
                  5.26535948,
                  25.0215318,
                  5.22875817,
                  24.6992965
                ),
                e.fill(),
                e.stroke(),
                e.restore(),
                e.restore(),
                e.restore(),
                e.restore();
            }
          }
          draw(t, e, s, i) {
            this.constructor.drawData.dirty && this.recache(s);
            const n = this.constructor.drawData.width * s,
              r = this.constructor.drawData.height * s;
            i.save(),
              this.hit && (i.globalAlpha = 0.2),
              i.translate(t, e),
              i.drawImage(this.constructor.drawData.canvas, -n / 2, -r / 2, n, r),
              i.restore();
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            if (!e.ignore) {
              const i = s._powerupsConsumed.misc;
              i.includes(this.id) ||
                (Us(t.pos.x - this.x, 2) + Us(t.pos.y - this.y, 2) < 1e3 &&
                  e.alive &&
                  (i.push(this.id),
                  i.push(this.otherPortal.id),
                  e.moveVehicle(
                    this.otherPortal.x - this.x,
                    this.otherPortal.y - this.y
                  ),
                  s.isGhost() ||
                    ((this.hit = !0),
                    (this.otherPortal.hit = !0),
                    (this.sector.powerupCanvasDrawn = !1),
                    (this.otherPortal.sector.powerupCanvasDrawn = !1),
                    this.scene.sound.play("teleport_sound", 0.3),
                    this.scene.message.show("Teleport Engaged", 50, "#8ac832"))));
            }
          }
        }
        Gs.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 29,
          height: 32,
        };
        const Ys = Gs.prototype;
        (Ys.id = null),
          (Ys.otherPortal = null),
          (Ys.hit = !1),
          (Ys.x = 0),
          (Ys.y = 0),
          (Ys.name = "teleport"),
          (Ys.recorded = !1);
        const Xs = Gs,
          Ks = Math.max;
        class Js extends xe.Z {
          constructor(e) {
            super(),
              super.init(e),
              (this.powerup = new Xs(0, 0, e.scene.track)),
              (this.p1 = new t.Z(0, 0)),
              (this.p2 = new t.Z(0, 0)),
              (this.active = !1);
          }
          press() {
            this.p1.equ(this.mouse.touch.real),
              (this.portal1 = new Xs(this.p1.x, this.p1.y, this.scene.track)),
              (this.active = !0);
          }
          hold() {
            this.p2.equ(this.mouse.touch.real);
          }
          release() {
            if (this.p2.sub(this.p1).len() > 40) {
              const t = this.scene.track;
              (this.portal2 = new Xs(this.p2.x, this.p2.y, t)),
                this.portal1.addOtherPortalRef(this.portal2),
                this.portal2.addOtherPortalRef(this.portal1),
                t.addPowerup(this.portal1),
                t.addPowerup(this.portal2),
                this.toolHandler.addActionToTimeline({
                  type: "add",
                  objects: [this.portal1, this.portal2],
                }),
                (this.active = !1);
            } else (this.active = !1), (this.portal1 = null);
          }
          draw(t) {
            const e = this.camera.zoom,
              s = this.scene.screen;
            if (this.active) {
              const i = this.p1,
                n = this.p2,
                r = n.sub(i).len();
              (t.globalAlpha = r > 40 ? 0.8 : 0.3),
                this.drawPathToMouse(t),
                this.portal1.draw(
                  s.realToScreen(i.x, "x"),
                  s.realToScreen(i.y, "y"),
                  e,
                  t
                ),
                this.powerup.draw(
                  s.realToScreen(n.x, "x"),
                  s.realToScreen(n.y, "y"),
                  e,
                  t
                ),
                (t.globalAlpha = 1);
            } else if ("desktop" === this.scene.settings.device) {
              const i = this.mouse.touch.real,
                n = s.realToScreen(i.x, "x"),
                r = s.realToScreen(i.y, "y");
              (t.globalAlpha = 0.8),
                this.powerup.draw(n, r, e, t),
                (t.globalAlpha = 1);
            }
          }
          drawPathToMouse(t) {
            const e = this.p1,
              s = this.p2,
              i = this.scene.screen;
            (t.strokeStyle = "#dd45ec"),
              (t.lineWidth = Ks(1, 2 * this.scene.camera.zoom)),
              t.beginPath(),
              t.moveTo(i.realToScreen(e.x, "x"), i.realToScreen(e.y, "y")),
              t.lineTo(i.realToScreen(s.x, "x"), i.realToScreen(s.y, "y")),
              t.stroke(),
              t.closePath();
          }
        }
        const $s = Js.prototype;
        ($s.powerup = null),
          ($s.portal1 = null),
          ($s.name = "teleport"),
          ($s.p1 = null),
          ($s.p2 = null),
          ($s.active = !1);
        const Qs = Js;
        class ti extends xe.Z {
          constructor(t) {
            super(),
              super.init(t),
              (this.powerupTools = {}),
              this.registerPowerupTools(),
              (this.active = !1),
              (this.options = { selected: "goal" });
          }
          registerPowerupTools() {
            this.registerTool(new hs(this.toolHandler)),
              this.registerTool(new gs(this.toolHandler)),
              this.registerTool(new is(this.toolHandler)),
              this.registerTool(new _s(this.toolHandler)),
              this.registerTool(new Fs(this.toolHandler)),
              this.registerTool(new Is(this.toolHandler)),
              this.registerTool(new Ns(this.toolHandler)),
              this.registerTool(new Qs(this.toolHandler));
          }
          registerTool(t) {
            this.powerupTools[t.name] = t;
          }
          setOption(t, e) {
            this.options[t] = e;
          }
          getOptions() {
            return this.options;
          }
          update() {
            const t = this.toolHandler.gamepad,
              e = this.options;
            t.isButtonDown("opt1") &&
              ((e.selected = "goal"),
              t.setButtonUp("opt1"),
              this.scene.stateChanged()),
              t.isButtonDown("opt2") &&
                ((e.selected = "boost"),
                t.setButtonUp("opt2"),
                this.scene.stateChanged()),
              t.isButtonDown("opt3") &&
                ((e.selected = "gravity"),
                t.setButtonUp("opt3"),
                this.scene.stateChanged()),
              t.isButtonDown("opt4") &&
                ((e.selected = "slowmo"),
                t.setButtonUp("opt4"),
                this.scene.stateChanged()),
              t.isButtonDown("opt5") &&
                ((e.selected = "bomb"),
                t.setButtonUp("opt5"),
                this.scene.stateChanged()),
              t.isButtonDown("opt6") &&
                ((e.selected = "checkpoint"),
                t.setButtonUp("opt6"),
                this.scene.stateChanged()),
              t.isButtonDown("opt7") &&
                ((e.selected = "antigravity"),
                t.setButtonUp("opt7"),
                this.scene.stateChanged()),
              t.isButtonDown("opt8") &&
                Application.User.get("classic") &&
                ((e.selected = "teleport"),
                t.setButtonUp("opt8"),
                this.scene.stateChanged()),
              super.update();
          }
          press() {
            (this.active = !0), this.powerupTools[this.options.selected].press();
          }
          hold() {
            this.active && this.powerupTools[this.options.selected].hold();
          }
          release() {
            this.active &&
              (this.powerupTools[this.options.selected].release(),
              (this.active = !1));
          }
          draw() {
            this.powerupTools[this.options.selected].draw(
              this.scene.game.canvas.getContext("2d")
            );
          }
        }
        const ei = ti.prototype;
        (ei.name = "Powerup"), (ei.powerupTools = null), (ei.active = !1);
        const si = ti,
          ii = Math.random,
          ni = Math.pow,
          ri = Math.sqrt;
        class oi extends ne {
          constructor(t, e, s, i) {
            super(),
              (this.x = t),
              (this.y = e),
              (this.time = s),
              (this.id = ii().toString(36).substr(2)),
              (this.hit = !1),
              this.init(i);
          }
          getCode() {
            return (
              "V " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " 1 " +
              this.time.toString(32)
            );
          }
          drawPowerup(t, e) {
            (t *= 1),
              (e.lineCap = "butt"),
              (e.lineJoin = "miter"),
              (e.miterLimit = 4 * t),
              (e.fillStyle = "#000000"),
              e.beginPath(),
              e.moveTo(15 * t, 4.5 * t),
              e.lineTo(15 * t, 2.5 * t),
              e.bezierCurveTo(
                15 * t,
                1.4 * t,
                14.1 * t,
                0.5 * t,
                13 * t,
                0.5 * t
              ),
              e.bezierCurveTo(
                11.9 * t,
                0.5 * t,
                11 * t,
                1.4 * t,
                11 * t,
                2.5 * t
              ),
              e.lineTo(11 * t, 4.5 * t),
              e.bezierCurveTo(
                11 * t,
                5.6 * t,
                11.9 * t,
                6.5 * t,
                13 * t,
                6.5 * t
              ),
              e.bezierCurveTo(
                14.1 * t,
                6.5 * t,
                15 * t,
                5.6 * t,
                15 * t,
                4.5 * t
              ),
              e.lineTo(15 * t, 4.5 * t),
              e.closePath(),
              e.fill(),
              e.beginPath(),
              (e.lineCap = "round"),
              (e.lineWidth = 2 * t),
              e.moveTo(1 * t, 3 * t),
              e.lineTo(25 * t, 3 * t),
              e.stroke(),
              (e.lineCap = "butt"),
              (e.lineWidth = 1 * t),
              e.beginPath(),
              e.moveTo(6.1 * t, 26.9 * t),
              e.lineTo(4.1 * t, 31.9 * t),
              e.bezierCurveTo(
                3.8 * t,
                32.7 * t,
                4.2 * t,
                33.6 * t,
                4.9 * t,
                33.9 * t
              ),
              e.bezierCurveTo(
                5.7 * t,
                34.2 * t,
                6.6 * t,
                33.8 * t,
                6.9 * t,
                33 * t
              ),
              e.lineTo(8.9 * t, 28 * t),
              e.bezierCurveTo(
                9.2 * t,
                27.3 * t,
                8.8 * t,
                26.4 * t,
                8 * t,
                26.1 * t
              ),
              e.bezierCurveTo(
                7.3 * t,
                25.8 * t,
                6.4 * t,
                26.1 * t,
                6.1 * t,
                26.9 * t
              ),
              e.lineTo(6.1 * t, 26.9 * t),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.beginPath(),
              e.moveTo(17 * t, 28 * t),
              e.lineTo(19 * t, 33 * t),
              e.bezierCurveTo(
                19.4 * t,
                33.8 * t,
                20.3 * t,
                34.2 * t,
                21 * t,
                33.9 * t
              ),
              e.bezierCurveTo(
                21.8 * t,
                33.6 * t,
                22.2 * t,
                32.7 * t,
                21.9 * t,
                31.9 * t
              ),
              e.lineTo(19.9 * t, 26.9 * t),
              e.bezierCurveTo(
                19.6 * t,
                26.2 * t,
                18.7 * t,
                25.8 * t,
                17.9 * t,
                26.1 * t
              ),
              e.bezierCurveTo(
                17.2 * t,
                26.4 * t,
                16.8 * t,
                27.3 * t,
                17.1 * t,
                28 * t
              ),
              e.lineTo(17 * t, 28 * t),
              e.closePath(),
              e.fill(),
              e.stroke(),
              (e.fillStyle = "#f59423"),
              (e.strokeStyle = "#000000"),
              (e.lineWidth = 2 * t),
              e.beginPath(),
              e.arc(13 * t, 17 * t, 11 * t, 0 * t, 2 * Math.PI, !0),
              e.closePath(),
              e.fill(),
              e.stroke(),
              (e.fillStyle = "#000000"),
              e.beginPath(),
              e.moveTo(21 * t, 17 * t),
              e.bezierCurveTo(21 * t, 12.6 * t, 17.4 * t, 9 * t, 13 * t, 9 * t),
              e.bezierCurveTo(8.6 * t, 9 * t, 5 * t, 12.6 * t, 5 * t, 17 * t),
              e.lineTo(21 * t, 17 * t),
              e.closePath(),
              e.fill();
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            if (!e.ignore) {
              const i = ri(ni(t.pos.x - this.x, 2) + ni(t.pos.y - this.y, 2)),
                n = s._powerupsConsumed.misc,
                r = this.scene;
              i < 30 &&
                e.alive &&
                !n.includes(this.id) &&
                (n.push(this.id),
                s.setTempVehicle(
                  "HELI",
                  this.time * r.settings.drawFPS,
                  { x: this.x, y: this.y },
                  e.dir
                ),
                r.camera.playerFocus === s &&
                  (r.camera.focusOnPlayer(), r.vehicleTimer.playerAddedTime(s)),
                s.isGhost() ||
                  ((this.hit = !0),
                  (this.sector.powerupCanvasDrawn = !1),
                  this.scene.message.show(
                    "Helicopter Powerup!",
                    50,
                    "#F2902E",
                    !1
                  )));
            }
          }
        }
        oi.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 26,
          height: 35,
        };
        const ai = oi.prototype;
        (ai.x = 0), (ai.y = 0), (ai.name = "helicopter");
        const hi = oi;
        class li extends os {
          constructor(t, e, s) {
            super(e, s), (this.options = t.options);
          }
          release() {
            const t = this.scene.track,
              e = new this.powerupClass(
                this.p1.x,
                this.p1.y,
                this.options.time,
                t
              );
            t.addPowerup(e),
              (this.active = !1),
              this.toolHandler.addActionToTimeline({ type: "add", objects: [e] });
          }
        }
        li.prototype.options = null;
        const ci = li;
        class ui extends ci {
          constructor(t, e) {
            super(t, e, hi), (this.powerup = new hi(0, 0, 0, e.scene.track));
          }
        }
        ui.prototype.name = "helicopter";
        const di = ui,
          pi = Math.random,
          fi = Math.pow,
          gi = Math.sqrt;
        class mi extends ne {
          constructor(t, e, s, i) {
            super(),
              (this.x = t),
              (this.y = e),
              (this.time = s),
              (this.id = pi().toString(36).substr(2)),
              (this.hit = !1),
              this.init(i);
          }
          getCode() {
            return (
              "V " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " 2 " +
              this.time.toString(32)
            );
          }
          drawPowerup(t, e) {
            (t *= 1),
              e.save(),
              e.scale(t, t),
              e.beginPath(),
              e.moveTo(0, 0),
              e.lineTo(24, 0),
              e.lineTo(24, 26),
              e.lineTo(0, 26),
              e.closePath(),
              e.clip(),
              e.translate(0, 0),
              e.translate(0, 0),
              e.scale(1, 1),
              e.translate(0, 0),
              (e.strokeStyle = "rgba(0,0,0,0)"),
              (e.lineCap = "butt"),
              (e.lineJoin = "miter"),
              (e.miterLimit = 4),
              e.save(),
              e.restore(),
              e.save(),
              e.restore(),
              e.save(),
              (e.fillStyle = "rgba(0, 0, 0, 0)"),
              (e.strokeStyle = "rgba(0, 0, 0, 0)"),
              (e.lineWidth = 1),
              e.translate(-1320, -352),
              e.save(),
              e.translate(251, 28),
              e.save(),
              e.translate(1056, 265),
              e.save(),
              e.translate(3, 49),
              e.save(),
              e.translate(10, 8),
              e.save(),
              (e.fillStyle = "#000000"),
              e.beginPath(),
              e.moveTo(2, 17),
              e.lineTo(4, 17),
              e.quadraticCurveTo(6, 17, 6, 19),
              e.lineTo(6, 26),
              e.quadraticCurveTo(6, 28, 4, 28),
              e.lineTo(2, 28),
              e.quadraticCurveTo(0, 28, 0, 26),
              e.lineTo(0, 19),
              e.quadraticCurveTo(0, 17, 2, 17),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.save(),
              (e.fillStyle = "#000000"),
              e.beginPath(),
              e.moveTo(20, 17),
              e.lineTo(22, 17),
              e.quadraticCurveTo(24, 17, 24, 19),
              e.lineTo(24, 26),
              e.quadraticCurveTo(24, 28, 22, 28),
              e.lineTo(20, 28),
              e.quadraticCurveTo(18, 28, 18, 26),
              e.lineTo(18, 19),
              e.quadraticCurveTo(18, 17, 20, 17),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.save(),
              (e.strokeStyle = "#000000"),
              (e.lineWidth = 2),
              (e.lineCap = "square"),
              e.beginPath(),
              e.moveTo(3.5, 23),
              e.lineTo(20.5, 23),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.save(),
              e.save(),
              (e.fillStyle = "#94d44e"),
              e.save(),
              e.beginPath(),
              e.moveTo(23, 11.2672237),
              e.bezierCurveTo(
                23.5979157,
                11.6115707,
                24,
                12.2552568,
                24,
                12.999615
              ),
              e.lineTo(24, 19.000385),
              e.bezierCurveTo(24, 20.1047419, 23.1029738, 21, 21.9950534, 21),
              e.lineTo(2.00494659, 21),
              e.bezierCurveTo(0.897645164, 21, 0, 20.1125667, 0, 19.000385),
              e.lineTo(0, 12.999615),
              e.bezierCurveTo(
                0,
                12.2603805,
                0.401930294,
                11.6148368,
                1,
                11.268783
              ),
              e.lineTo(1, 3.99742191),
              e.bezierCurveTo(1, 2.89427625, 1.88967395, 2, 2.991155, 2),
              e.lineTo(21.008845, 2),
              e.bezierCurveTo(22.1085295, 2, 23, 2.89092539, 23, 3.99742191),
              e.lineTo(23, 11.2672237),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.restore(),
              e.save(),
              (e.strokeStyle = "#000000"),
              (e.lineWidth = 2),
              e.beginPath(),
              e.moveTo(22.5009348, 12.1337882),
              e.lineTo(22, 11.8452936),
              e.lineTo(22, 3.99742191),
              e.bezierCurveTo(22, 3.44392402, 21.5569554, 3, 21.008845, 3),
              e.lineTo(2.991155, 3),
              e.bezierCurveTo(2.44342393, 3, 2, 3.44509694, 2, 3.99742191),
              e.lineTo(2, 11.8455),
              e.lineTo(1.50082265, 12.1343329),
              e.bezierCurveTo(
                1.19247839,
                12.3127464,
                1,
                12.6390115,
                1,
                12.999615
              ),
              e.lineTo(1, 19.000385),
              e.bezierCurveTo(1, 19.5563739, 1.44601448, 20, 2.00494659, 20),
              e.lineTo(21.9950534, 20),
              e.bezierCurveTo(22.5510229, 20, 23, 19.5521213, 23, 19.000385),
              e.lineTo(23, 12.999615),
              e.bezierCurveTo(
                23,
                12.6352349,
                22.8086914,
                12.311029,
                22.5009348,
                12.1337882
              ),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.restore(),
              e.save(),
              (e.fillStyle = "#000000"),
              e.beginPath(),
              e.moveTo(5, 6),
              e.lineTo(19, 6),
              e.quadraticCurveTo(19, 6, 19, 6),
              e.lineTo(19, 12),
              e.quadraticCurveTo(19, 12, 19, 12),
              e.lineTo(5, 12),
              e.quadraticCurveTo(5, 12, 5, 12),
              e.lineTo(5, 6),
              e.quadraticCurveTo(5, 6, 5, 6),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.save(),
              (e.fillStyle = "#000000"),
              e.beginPath(),
              e.arc(5.03571429, 16.0357143, 1.39285714, 0, 6.283185307179586, !0),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.save(),
              (e.fillStyle = "#000000"),
              e.beginPath(),
              e.arc(18.9642857, 16.0357143, 1.39285714, 0, 6.283185307179586, !0),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore();
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            if (!e.ignore) {
              const i = gi(fi(t.pos.x - this.x, 2) + fi(t.pos.y - this.y, 2)),
                n = s._powerupsConsumed.misc,
                r = this.scene;
              i < 30 &&
                e.alive &&
                !n.includes(this.id) &&
                (n.push(this.id),
                s.setTempVehicle(
                  "TRUCK",
                  this.time * r.settings.drawFPS,
                  { x: this.x, y: this.y },
                  e.dir
                ),
                r.camera.playerFocus === s &&
                  (r.camera.focusOnPlayer(), r.vehicleTimer.playerAddedTime(s)),
                s.isGhost() ||
                  ((this.hit = !0),
                  (this.sector.powerupCanvasDrawn = !1),
                  this.scene.message.show("Truck Powerup!", 50, "#94d44e", !1)));
            }
          }
        }
        mi.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 24,
          height: 26,
        };
        const vi = mi.prototype;
        (vi.x = 0), (vi.y = 0), (vi.name = "truck");
        const yi = mi;
        class wi extends ci {
          constructor(t, e) {
            super(t, e, yi), (this.powerup = new yi(0, 0, 0, e.scene.track));
          }
        }
        wi.prototype.name = "truck";
        const xi = wi,
          bi = Math.random,
          _i = Math.pow,
          Ti = Math.sqrt;
        class Ci extends ne {
          constructor(t, e, s, i) {
            super(),
              (this.x = t),
              (this.y = e),
              (this.time = s),
              (this.id = bi().toString(36).substr(2)),
              (this.hit = !1),
              this.init(i);
          }
          getCode() {
            return (
              "V " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " 3 " +
              this.time.toString(32)
            );
          }
          drawPowerup(t, e) {
            e.save(),
              e.scale(t, t),
              e.translate(0.6, 0),
              e.beginPath(),
              e.moveTo(0, 0),
              e.lineTo(21, 0),
              e.lineTo(21, 31),
              e.lineTo(0, 31),
              e.closePath(),
              e.clip(),
              e.translate(0, 0),
              e.translate(0, 0),
              e.scale(1, 1),
              e.translate(0, 0),
              (e.strokeStyle = "rgba(0,0,0,0)"),
              (e.lineCap = "butt"),
              (e.lineJoin = "miter"),
              (e.miterLimit = 4),
              e.save(),
              e.restore(),
              e.save(),
              e.restore(),
              e.save(),
              (e.fillStyle = "rgba(0, 0, 0, 0)"),
              (e.strokeStyle = "rgba(0, 0, 0, 0)"),
              (e.lineWidth = 1),
              e.translate(-1322, -440),
              e.save(),
              e.translate(251, 28),
              e.save(),
              e.translate(1056, 265),
              e.save(),
              e.translate(3, 141),
              e.save(),
              e.translate(12, 6),
              e.save(),
              (e.fillStyle = "#000000"),
              e.beginPath(),
              e.moveTo(7, 23),
              e.lineTo(14, 23),
              e.quadraticCurveTo(15, 23, 15, 24),
              e.lineTo(15, 30),
              e.quadraticCurveTo(15, 31, 14, 31),
              e.lineTo(7, 31),
              e.quadraticCurveTo(6, 31, 6, 30),
              e.lineTo(6, 24),
              e.quadraticCurveTo(6, 23, 7, 23),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.save(),
              (e.strokeStyle = "#000000"),
              (e.lineWidth = 2),
              (e.lineCap = "round"),
              e.beginPath(),
              e.moveTo(15, 19),
              e.lineTo(12.9375, 24.6875),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.save(),
              (e.strokeStyle = "#000000"),
              (e.lineWidth = 2),
              (e.lineCap = "round"),
              e.translate(7.03125, 21.84375),
              e.scale(-1, 1),
              e.translate(-7.03125, -21.84375),
              e.beginPath(),
              e.moveTo(8.0625, 19),
              e.lineTo(6, 24.6875),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.save(),
              e.save(),
              (e.fillStyle = "#f02728"),
              e.save(),
              e.beginPath(),
              e.arc(10.5, 11.125, 10.5, 0, 6.283185307179586, !0),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.restore(),
              e.save(),
              (e.strokeStyle = "#000000"),
              (e.lineWidth = 2),
              e.beginPath(),
              e.arc(10.5, 11.125, 9.5, 0, 6.283185307179586, !0),
              e.closePath(),
              e.fill(),
              e.stroke(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore(),
              e.restore();
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            if (!e.ignore) {
              const i = Ti(_i(t.pos.x - this.x, 2) + _i(t.pos.y - this.y, 2)),
                n = s._powerupsConsumed.misc,
                r = this.scene;
              i < 30 &&
                e.alive &&
                !n.includes(this.id) &&
                (n.push(this.id),
                s.setTempVehicle(
                  "BALLOON",
                  this.time * r.settings.drawFPS,
                  { x: this.x, y: this.y },
                  e.dir
                ),
                r.camera.playerFocus === s &&
                  (r.camera.focusOnPlayer(), r.vehicleTimer.playerAddedTime(s)),
                s.isGhost() ||
                  ((this.hit = !0),
                  (this.sector.powerupCanvasDrawn = !1),
                  this.scene.message.show(
                    "Balloon Powerup!",
                    50,
                    "#f02728",
                    !1
                  )));
            }
          }
        }
        Ci.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 22,
          height: 32,
        };
        const ki = Ci.prototype;
        (ki.x = 0), (ki.y = 0), (ki.name = "balloon");
        const Si = Ci;
        class Ai extends ci {
          constructor(t, e) {
            super(t, e, Si), (this.powerup = new Si(0, 0, 0, e.scene.track));
          }
        }
        Ai.prototype.name = "balloon";
        const Pi = Ai,
          Mi = Math.random,
          Ii = Math.pow,
          Bi = Math.sqrt;
        class Di extends ne {
          constructor(t, e, s, i) {
            super(),
              (this.x = t),
              (this.y = e),
              (this.time = s),
              (this.id = Mi().toString(36).substr(2)),
              (this.hit = !1),
              this.init(i);
          }
          getCode() {
            return (
              "V " +
              this.x.toString(32) +
              " " +
              this.y.toString(32) +
              " 4 " +
              this.time.toString(32)
            );
          }
          drawPowerup(t, e) {
            const s = e.canvas.width;
            e.beginPath(), e.scale(s, s);
            const i = 0.25;
            (e.lineWidth = 0.18),
              e.arc(0.75, 0.75, i - e.lineWidth / 2, 0, Math.PI / 2),
              e.arc(i, 0.75, i - e.lineWidth / 2, Math.PI / 2, Math.PI),
              e.arc(i, i, i - e.lineWidth / 2, Math.PI, (3 * Math.PI) / 2),
              e.arc(0.75, i, i - e.lineWidth / 2, 1.5 * Math.PI, 2 * Math.PI),
              e.closePath(),
              (e.fillStyle = "#a784c5"),
              (e.strokeStyle = "#000000"),
              e.stroke(),
              e.fill(),
              e.restore();
          }
          collide(t) {
            const e = t.parent,
              s = e.player;
            if (!e.ignore) {
              const i = Bi(Ii(t.pos.x - this.x, 2) + Ii(t.pos.y - this.y, 2)),
                n = s._powerupsConsumed.misc,
                r = this.scene;
              i < 30 &&
                e.alive &&
                !n.includes(this.id) &&
                (n.push(this.id),
                s.setTempVehicle(
                  "BLOB",
                  this.time * r.settings.drawFPS,
                  { x: this.x, y: this.y },
                  e.dir
                ),
                r.camera.playerFocus === s &&
                  (r.camera.focusOnPlayer(), r.vehicleTimer.playerAddedTime(s)),
                s.isGhost() ||
                  ((this.hit = !0),
                  (this.sector.powerupCanvasDrawn = !1),
                  this.scene.message.show("Blob Powerup!", 50, "#A784C5", !1)));
            }
          }
        }
        Di.drawData = {
          canvas: document.createElement("canvas"),
          dirty: !0,
          width: 24,
          height: 24,
        };
        const Ei = Di.prototype;
        (Ei.x = 0), (Ei.y = 0), (Ei.name = "blob");
        const Li = Di;
        class zi extends ci {
          constructor(t, e) {
            super(t, e, Li), (this.powerup = new Li(0, 0, 0, e.scene.track));
          }
        }
        zi.prototype.name = "blob";
        const Oi = zi;
        class Fi extends xe.Z {
          constructor(t) {
            super(),
              super.init(t),
              (this.powerupTools = {}),
              (this.options = t.scene.settings.vehiclePowerup),
              (this.active = !1),
              this.registerPowerupTools();
          }
          registerPowerupTools() {
            this.registerTool(new di(this, this.toolHandler)),
              this.registerTool(new xi(this, this.toolHandler)),
              this.registerTool(new Pi(this, this.toolHandler)),
              this.registerTool(new Oi(this, this.toolHandler));
          }
          registerTool(t) {
            this.powerupTools[t.name] = t;
          }
          setOption(t, e) {
            this.options[t] = e;
          }
          getOptions() {
            return this.options;
          }
          update() {
            this.toolHandler.gamepad, this.mouse, this.options, super.update();
          }
          press() {
            (this.active = !0), this.powerupTools[this.options.selected].press();
          }
          hold() {
            this.active && this.powerupTools[this.options.selected].hold();
          }
          release() {
            this.active &&
              (this.powerupTools[this.options.selected].release(),
              (this.active = !1));
          }
          draw() {
            this.powerupTools[this.options.selected].draw(
              this.scene.game.canvas.getContext("2d")
            );
          }
        }
        const ji = Fi.prototype;
        (ji.name = "vehiclepowerup"), (ji.powerupTools = null), (ji.active = !1);
        const Ri = Fi;
        var Wi = s(831),
          Vi = s(578),
          Hi = s(301),
          Ni = s.n(Hi);
        function Zi(t, e, s, i, n) {
          const r = new Set(),
            o = s - t,
            a = i - e;
          if (Math.max(Math.abs(o), Math.abs(a)) >= 500200) return [];
          const h = Math.sqrt(o * o + a * a),
            l = t + (-o + a) / h,
            c = e + (-o - a) / h,
            u = s + (o + a) / h,
            d = i + (-o + a) / h,
            p = [];
          m(
            t + (-o - a) / h,
            e + (o - a) / h,
            s + (o - a) / h,
            i + (o + a) / h,
            n
          ),
            m(l, c, u, d, n);
          let f = Math.floor((t - Math.sign(o) * Math.SQRT1_2) / n),
            g = Math.floor((e - Math.sign(a) * Math.SQRT1_2) / n);
          return (
            r.has(f + "," + g) || (p.push(f, g), r.add(f + "," + g)),
            (f = Math.floor((s + Math.sign(o) * Math.SQRT1_2) / n)),
            (g = Math.floor((i + Math.sign(a) * Math.SQRT1_2) / n)),
            r.has(f + "," + g) || p.push(f, g),
            p
          );
          function m(t, e, s, i, n) {
            let o =
                s > t ? (Math.floor(t / n) + 1) * n : (Math.ceil(t / n) - 1) * n,
              a =
                i > e ? (Math.floor(e / n) + 1) * n : (Math.ceil(e / n) - 1) * n,
              h = Math.abs((o - t) / (s - t)),
              l = Math.abs((a - e) / (i - e));
            for (; !(s > t ? s <= o : s >= o) || !(i > e ? i <= a : i >= a); ) {
              (h = Math.abs((o - t) / (s - t))),
                (l = Math.abs((a - e) / (i - e)));
              const c = s > t ? Math.floor(o / n) - 1 : Math.floor(o / n),
                u = i > e ? Math.floor(a / n) - 1 : Math.floor(a / n);
              r.has(c + "," + u) || (p.push(c, u), r.add(c + "," + u)),
                l < h
                  ? i > e
                    ? (a += n)
                    : (a -= n)
                  : s > t
                  ? (o += n)
                  : (o -= n);
            }
            const c = s > t ? Math.ceil(s / n) - 1 : Math.floor(s / n),
              u = i > e ? Math.ceil(i / n) - 1 : Math.floor(i / n);
            r.has(c + "," + u) || (p.push(c, u), r.add(c + "," + u));
          }
        }
        class Ui {
          constructor(t, e, s) {
            (this.track = s),
              (this.scene = s.scene),
              (this.settings = s.settings),
              (this.drawSectorSize = this.settings.drawSectorSize),
              (this.row = e),
              (this.column = t),
              (this.camera = s.camera),
              (this.zoom = s.camera.zoom),
              (this.canvasPool = s.canvasPool),
              (this.x = t * this.drawSectorSize),
              (this.y = e * this.drawSectorSize),
              (this.realX = this.x * this.zoom),
              (this.realY = this.y * this.zoom),
              (this.lineCount = 0),
              (this.powerupsCount = 0),
              (this.drawn = !1),
              (this.dirty = !1),
              (this.physicsLines = []),
              (this.sceneryLines = []),
              (this.hasPowerups = !1),
              (this.powerups = {
                all: [],
                goals: [],
                gravitys: [],
                boosts: [],
                slowmos: [],
                checkpoints: [],
                bombs: [],
                antigravitys: [],
                teleports: [],
                helicopters: [],
                trucks: [],
                balloons: [],
                blobs: [],
              });
          }
          addLine(t) {
            t instanceof Wi.Z && this.physicsLines.push(t),
              t instanceof Vi.Z && this.sceneryLines.push(t),
              this.lineCount++,
              (this.drawn = !1);
          }
          searchForLine(t, e) {
            const s = this[t];
            let i = !1;
            for (const t of s)
              if (
                t.p1.x === e.x &&
                t.p1.y === e.y &&
                !1 === t.recorded &&
                0 === t.remove
              ) {
                i = t;
                break;
              }
            return i;
          }
          addPowerup(t) {
            const e = this.powerups;
            let s = null;
            switch (t.name) {
              case "goal":
                s = e.goals;
                break;
              case "gravity":
                s = e.gravitys;
                break;
              case "slowmo":
                s = e.slowmos;
                break;
              case "boost":
                s = e.boosts;
                break;
              case "checkpoint":
                s = e.checkpoints;
                break;
              case "bomb":
                s = e.bombs;
                break;
              case "antigravity":
                s = e.antigravitys;
                break;
              case "teleport":
                s = e.teleports;
                break;
              case "helicopter":
                s = e.helicopters;
                break;
              case "truck":
                s = e.trucks;
                break;
              case "balloon":
                s = e.balloons;
                break;
              case "blob":
                s = e.blobs;
            }
            e.all.push(t),
              s.push(t),
              this.powerupsCount++,
              (this.hasPowerups = !0),
              (this.powerupCanvasDrawn = !1);
          }
          erase(t, e, s) {
            const i = [];
            if (s.physics)
              for (const s of this.physicsLines) s.erase(t, e) && i.push(s);
            if (s.scenery)
              for (const s of this.sceneryLines) s.erase(t, e) && i.push(s);
            if (s.powerups)
              for (const s of this.powerups.all) {
                const n = s.erase(t, e);
                n && i.push(...n);
              }
            return i;
          }
          cleanSector() {
            this.cleanSectorType("physicsLines"),
              this.cleanSectorType("sceneryLines"),
              this.cleanSectorType("powerups", "all"),
              0 === this.powerups.all.length
                ? ((this.hasPowerups = !1),
                  this.powerupCanvas &&
                    (this.canvasPool.releaseCanvas(this.powerupCanvas),
                    (this.powerupCanvas = null)))
                : (this.hasPowerups = !0),
              (this.dirty = !1);
          }
          cleanSectorType(t, e) {
            let s = this[t];
            e && (s = s[e]);
            for (let i = s.length - 1; i >= 0; i--)
              if (2 === s[i].remove) {
                if ("powerups" === t && "all" === e) {
                  const t = this.powerups[s[i].name + "s"];
                  t.splice(t.indexOf(s[i]), 1);
                }
                s.splice(i, 1);
              }
          }
          draw() {
            const t = this.scene.camera.zoom,
              e = this.physicsLines,
              s = this.sceneryLines,
              i = Math.floor(this.drawSectorSize * t),
              n = this.canvasPool.getCanvas(),
              r = n.getContext("2d"),
              o = Math.max(2 * t, 0.5),
              a = this.settings.sceneryLineColor,
              h = this.settings.physicsLineColor;
            (n.width = i),
              (n.height = i),
              r.clearRect(0, 0, n.width, n.height),
              r.save(),
              r.beginPath(),
              (r.lineWidth = o),
              (r.lineCap = "round"),
              (r.strokeStyle = this.track.game.mod.getVar("customColors")
                ? Q(this.track.game.mod.getVar("sceneryColor"))
                : a),
              this.drawLines(s, t, r),
              r.stroke(),
              r.beginPath(),
              (r.strokeStyle = this.track.game.mod.getVar("customColors")
                ? Q(this.track.game.mod.getVar("lineColor"))
                : h),
              this.drawLines(e, t, r),
              this.track.game.mod.getVar("lineShadow") &&
                ((r.shadowOffsetX = r.shadowOffsetY = 2),
                (r.shadowBlur = Math.max(2, 10 * t)),
                (r.shadowColor = "#000")),
              r.stroke(),
              this.settings.developerMode &&
                (r.beginPath(),
                (r.strokeStyle = "blue"),
                r.rect(0, 0, i, i),
                r.stroke()),
              (this.canvas = n),
              (this.drawn = !0);
          }
          cachePowerupSector() {
            if (((this.powerupCanvasDrawn = !0), this.powerups.all.length > 0)) {
              const t = this.scene.camera.zoom,
                e = (this.drawSectorSize * t) | 0,
                s = this.powerupCanvasOffset,
                i = this.canvasPool.getCanvas(),
                n = i.getContext("2d"),
                r = [
                  "slowmos",
                  "checkpoints",
                  "boosts",
                  "gravitys",
                  "bombs",
                  "goals",
                  "antigravitys",
                  "teleports",
                  "helicopters",
                  "trucks",
                  "balloons",
                  "blobs",
                ];
              (i.width = e + s * t),
                (i.height = e + s * t),
                n.clearRect(0, 0, i.width, i.height);
              for (const e of r) this.drawPowerups(this.powerups[e], t, n);
              (this.powerupCanvas = i),
                this.settings.developerMode &&
                  (n.beginPath(),
                  (n.strokeStyle = "red"),
                  n.rect(0, 0, i.width, i.height),
                  n.stroke());
            }
          }
          update() {
            const t = this.camera.zoom;
            (this.realX = Math.floor(this.x * t)),
              (this.realY = Math.floor((this.y * t) | 0)),
              (this.zoom = t);
          }
          resetCollided() {
            for (const t of this.physicsLines) t && (t.collided = !1);
          }
          collide(t) {
            const e = t.parent,
              s = this.physicsLines;
            for (let e = s.length - 1; e >= 0; e--)
              if (s[e]) {
                const i = s[e];
                0 === i.remove && i.collide(t);
              }
            if (e.powerupsEnabled) {
              const e = this.powerups.all;
              for (let s = e.length - 1; s >= 0; s--) {
                const i = e[s];
                0 === i.remove && i.collide(t);
              }
            }
          }
          drawLines(t, e, s) {
            const i = this.x,
              n = this.y;
            let r, o, a, h, l, c;
            for (let u = t.length - 1; u >= 0; u--) {
              const d = t[u];
              0 === d.remove &&
                ((r = d.p1),
                (o = d.p2),
                (a = (r.x - i) * e),
                (h = (r.y - n) * e),
                (l = (o.x - i) * e),
                (c = (o.y - n) * e),
                s.moveTo(a, h),
                s.lineTo(l, c));
            }
          }
          drawPowerups(t, e, s) {
            const i = this.x,
              n = this.y,
              r = (this.powerupCanvasOffset * e) / 2;
            for (let o = t.length - 1; o >= 0; o--) {
              const a = t[o];
              if (0 === a.remove) {
                const t = (a.x - i) * e + r,
                  o = (a.y - n) * e + r;
                a.draw(t, o, e, s);
              }
            }
          }
          clear() {
            (this.drawn = !1),
              (this.powerupCanvasDrawn = !1),
              this.canvas &&
                ((this.canvas = null),
                this.canvasPool.releaseCanvas(this.canvas)),
              this.powerupCanvas &&
                (this.canvasPool.releaseCanvas(this.powerupCanvas),
                (this.powerupCanvas = null));
          }
          close() {
            (this.track = null),
              (this.scene = null),
              (this.settings = null),
              (this.drawSectorSize = null),
              (this.row = null),
              (this.column = null),
              (this.camera = null),
              (this.zoom = null),
              (this.canvasPool = null),
              (this.x = null),
              (this.y = null),
              (this.realX = null),
              (this.realY = null),
              (this.lineCount = null),
              (this.drawn = null),
              (this.physicsLines = null),
              (this.sceneryLines = null),
              (this.canvas = null);
          }
        }
        const qi = Ui.prototype;
        (qi.image = !1),
          (qi.scene = null),
          (qi.settings = null),
          (qi.drawSectorSize = null),
          (qi.row = 0),
          (qi.column = 0),
          (qi.camera = null),
          (qi.zoom = 0),
          (qi.x = 0),
          (qi.y = 0),
          (qi.realX = 0),
          (qi.realY = 0),
          (qi.lineCount = 0),
          (qi.powerupsCount = 0),
          (qi.drawn = !1),
          (qi.physicsLines = []),
          (qi.sceneryLines = []),
          (qi.powerups = []),
          (qi.canvasPool = null),
          (qi.canvas = null),
          (qi.powerupCanvas = null),
          (qi.powerupCanvasOffset = 30),
          (qi.powerupCanvasDrawn = !1),
          (qi.dirty = !1);
        const Gi = Ui,
          Yi = Math.floor,
          Xi = Math.ceil;
        class Ki {
          constructor(t) {
            (this.options = t),
              (this.canvasPool = []),
              t.screen && ((this.setToScreen = !0), this.update()),
              t.cap && ((this.setToScreen = !1), (this.poolCap = t.cap));
          }
          update() {
            this.setToScreen && (this.getPoolCapFromScreen(), this.cleanPool());
          }
          getPoolCapFromScreen() {
            const t = this.options,
              e = t.screen,
              s = t.camera,
              i = Yi(t.settings.drawSectorSize * s.zoom),
              n = Xi(e.width / i),
              r = Xi(e.height / i);
            this.poolCap = n * r + n + r;
          }
          getCanvas() {
            let t = this.canvasPool.pop();
            return t || (t = document.createElement("canvas")), t;
          }
          releaseCanvas(t) {
            this.canvasPool.length < this.poolCap && this.canvasPool.push(t);
          }
          cleanPool() {
            this.canvasPool.length > this.poolCap &&
              (this.canvasPool = this.canvasPool.slice(0, this.poolCap + 1));
          }
        }
        const Ji = Ki.prototype;
        (Ji.canvasPool = null),
          (Ji.poolCap = 5e3),
          (Ji.setToScreen = !0),
          (Ji.options = null);
        const $i = Ki,
          Qi = Math.floor,
          tn = Math.max,
          en = Math.min,
          sn = Math.sqrt,
          nn = Math.pow,
          rn = Math.round,
          on = [];
        class an {
          constructor(t) {
            (this.scene = t),
              (this.game = t.game),
              (this.settings = t.game.settings),
              (this.camera = t.camera),
              (this.sectors = {}),
              (this.sectors.drawSectors = []),
              (this.sectors.physicsSectors = []),
              (this.totalSectors = []),
              (this.powerups = []),
              (this.powerupsLookupTable = {}),
              (this.physicsLines = []),
              (this.sceneryLines = []),
              (this.targets = []),
              (this.allowedVehicles = ["MTB", "BMX"]),
              (this.canvasPool = new $i(t)),
              (this.needsCleaning = !1),
              this.createPowerupCache();
          }
          createPowerupCache() {
            on.push(new ds(0, 0, 0, this)),
              on.push(new xs(0, 0, this)),
              on.push(new zs(0, 0, this)),
              on.push(new Ue(0, 0, 0, this)),
              on.push(new Ps(0, 0, this)),
              on.push(new ge(0, 0, this)),
              on.push(new Vs(0, 0, this)),
              on.push(new Xs(0, 0, this)),
              on.push(new hi(0, 0, 0, this)),
              on.push(new yi(0, 0, 0, this)),
              on.push(new Si(0, 0, 0, this)),
              on.push(new Li(0, 0, 0, this));
          }
          recachePowerups(t) {
            for (const e of on) e.recache(t);
          }
          read(t) {
            const e = t.split("#"),
              s = e[0].split(",");
            let i,
              n = [],
              r = [];
            e.length > 3
              ? ((n = e[1].split(",")), (r = e[2].split(",")), (i = e[3]))
              : e.length > 2
              ? ((n = e[1].split(",")), (r = e[2].split(",")))
              : e.length > 1 && (r = e[1].split(",")),
              this.addLines(s, this.addPhysicsLine),
              this.addLines(n, this.addSceneryLine),
              this.addPowerups(r),
              this.scene.selectVehicle(i);
          }
          addPowerups(t) {
            for (let e = 0; e < t.length; e++) {
              const s = t[e].split(" ");
              if (s.length >= 2) {
                const t = [];
                for (let e = 1; e < s.length; e++) {
                  const i = parseInt(s[e], 32);
                  t.push(i);
                }
                const e = rn(t[0]),
                  i = rn(t[1]);
                let n = null;
                switch (s[0]) {
                  case "B":
                    (n = new ds(e, i, t[2], this)), this.addPowerup(n);
                    break;
                  case "S":
                    (n = new xs(e, i, this)), this.addPowerup(n);
                    break;
                  case "O":
                    (n = new zs(e, i, this)), this.addPowerup(n);
                    break;
                  case "G":
                    (n = new Ue(e, i, t[2], this)), this.addPowerup(n);
                    break;
                  case "C":
                    (n = new Ps(e, i, this)), this.addPowerup(n);
                    break;
                  case "T":
                    (n = new ge(e, i, this)),
                      this.addTarget(n),
                      this.addPowerup(n);
                    break;
                  case "A":
                    (n = new Vs(e, i, this)), this.addPowerup(n);
                    break;
                  case "V": {
                    const s = t[2];
                    let r = t[3];
                    const o = this.settings.vehiclePowerup.minTime,
                      a = this.settings.vehiclePowerup.maxTime;
                    switch (((r = r || o), (r = en(r, a)), (r = tn(r, o)), s)) {
                      case 1:
                        n = new hi(e, i, r, this);
                        break;
                      case 2:
                        n = new yi(e, i, r, this);
                        break;
                      case 3:
                        n = new Si(e, i, r, this);
                        break;
                      case 4:
                        n = new Li(e, i, r, this);
                        break;
                      default:
                        continue;
                    }
                    this.addPowerup(n);
                    break;
                  }
                  case "W": {
                    const e = t[0],
                      s = t[1],
                      i = t[2],
                      n = t[3],
                      r = new Xs(e, s, this),
                      o = new Xs(i, n, this);
                    r.addOtherPortalRef(o),
                      o.addOtherPortalRef(r),
                      this.addPowerup(r),
                      this.addPowerup(o);
                  }
                }
              }
            }
          }
          addTarget(t) {
            (this.dirty = !0), this.targetCount++, this.targets.push(t);
          }
          addPowerup(t) {
            const e = t.x,
              s = t.y;
            this.addRef(
              e,
              s,
              t,
              2,
              this.sectors.physicsSectors,
              this.settings.physicsSectorSize
            );
            const i = this.addRef(
              e,
              s,
              t,
              2,
              this.sectors.drawSectors,
              this.settings.drawSectorSize
            );
            return (
              !1 !== i && this.totalSectors.push(i),
              null !== t &&
                (this.powerups.push(t),
                t.id && (this.powerupsLookupTable[t.id] = t)),
              t
            );
          }
          addLines(t, e) {
            for (let s = 0; s < t.length; s++) {
              const i = t[s].split(" ");
              if (i.length > 3)
                for (let t = 0; t < i.length - 2; t += 2) {
                  const s = parseInt(i[t], 32),
                    n = parseInt(i[t + 1], 32),
                    r = parseInt(i[t + 2], 32),
                    o = parseInt(i[t + 3], 32);
                  isNaN(s + n + r + o) || e.call(this, s, n, r, o);
                }
            }
          }
          addPhysicsLine(t, e, s, i) {
            (t = rn(t)), (e = rn(e)), (s = rn(s));
            const n = (i = rn(i)) - e;
            if (sn(nn(s - t, 2) + nn(n, 2)) >= 2) {
              const n = new Wi.Z(t, e, s, i);
              return this.addPhysicsLineToTrack(n), n;
            }
          }
          addPhysicsLineToTrack(t) {
            let e = this.settings.drawSectorSize;
            const s = t.p1,
              i = t.p2;
            let n = Zi(s.x, s.y, i.x, i.y, e),
              r = this.sectors.drawSectors;
            for (let s = 0; n.length > s; s += 2) {
              const i = n[s] * e,
                o = n[s + 1] * e,
                a = this.addRef(i, o, t, 1, r, e);
              !1 !== a && this.totalSectors.push(a);
            }
            (e = this.settings.physicsSectorSize),
              (n = Ni()(s.x, s.y, i.x, i.y, e)),
              (r = this.sectors.physicsSectors);
            for (let s = 0; s < n.length; s += 2) {
              const i = n[s],
                o = n[s + 1];
              this.addRef(i, o, t, 1, r, e);
            }
            return this.physicsLines.push(t), t;
          }
          addSceneryLine(t, e, s, i) {
            (t = rn(t)), (e = rn(e)), (s = rn(s));
            const n = (i = rn(i)) - e;
            if (sn(nn(s - t, 2) + nn(n, 2)) >= 2) {
              const n = new Vi.Z(t, e, s, i);
              return this.addSceneryLineToTrack(n), n;
            }
          }
          addSceneryLineToTrack(t) {
            const e = this.settings.drawSectorSize,
              s = t.p1,
              i = t.p2,
              n = Zi(s.x, s.y, i.x, i.y, e),
              r = this.sectors.drawSectors;
            for (let s = 0; s < n.length; s += 2) {
              const i = n[s] * e,
                o = n[s + 1] * e,
                a = this.addRef(i, o, t, 1, r, e);
              !1 !== a && this.totalSectors.push(a);
            }
            return this.sceneryLines.push(t), t;
          }
          addRef(t, e, s, i, n, r) {
            const o = Qi(t / r),
              a = Qi(e / r);
            let h = !1;
            switch (
              (void 0 === n[o] && (n[o] = []),
              void 0 === n[o][a] &&
                ((n[o][a] = new Gi(o, a, this)), (h = n[o][a])),
              i)
            ) {
              case 1:
                n[o][a].addLine(s), s.addSectorReference(n[o][a]);
                break;
              case 2:
                n[o][a].addPowerup(s), s.addSectorReference(n[o][a]);
            }
            return (this.dirty = !0), h;
          }
          cleanTrack() {
            (this.needsCleaning = !1), this.cleanLines(), this.cleanPowerups();
          }
          cleanLines() {
            const t = this.physicsLines,
              e = this.sceneryLines;
            for (let e = t.length - 1; e >= 0; e--)
              2 === t[e].remove && t.splice(e, 1);
            for (let t = e.length - 1; t >= 0; t--)
              2 === e[t].remove && e.splice(t, 1);
          }
          cleanPowerups() {
            const t = this.powerups,
              e = this.targets;
            for (let e = t.length - 1; e >= 0; e--)
              2 === t[e].remove && t.splice(e, 1);
            for (let t = e.length - 1; t >= 0; t--)
              2 === e[t].remove && e.splice(t, 1);
            this.countTargets();
          }
          countTargets() {
            let t = 0;
            for (const e of this.targets) 0 === e.remove && t++;
            this.targetCount = t;
          }
          updatePowerupState(t) {
            const e = t._powerupsConsumed;
            this.resetPowerups(),
              this.setPowerupStates(e.targets),
              this.setPowerupStates(e.checkpoints),
              this.setPowerupStates(e.misc);
          }
          setPowerupStates(t) {
            const e = this.powerupsLookupTable;
            for (let s = 0; s < t.length; s++) {
              const i = e[t[s]];
              i.remove && i.id && (delete e[t[s]], delete t[s]),
                (i.hit = !0),
                (i.sector.powerupCanvasDrawn = !1);
            }
          }
          getCode() {
            this.cleanTrack();
            const t = this.powerups,
              e = this.physicsLines,
              s = this.sceneryLines;
            let i = "",
              n = !1;
            for (const t of e)
              t.recorded ||
                0 !== t.remove ||
                ((n = !0),
                (i +=
                  t.p1.x.toString(32) +
                  " " +
                  t.p1.y.toString(32) +
                  t.getCode(this) +
                  ","));
            n && (i = i.slice(0, -1));
            for (const t of e) t.recorded = !1;
            (i += "#"), (n = !1);
            for (const t of s)
              t.recorded ||
                0 !== t.remove ||
                ((n = !0),
                (i +=
                  t.p1.x.toString(32) +
                  " " +
                  t.p1.y.toString(32) +
                  t.getCode(this) +
                  ","));
            n && (i = i.slice(0, -1));
            for (const t of s) t.recorded = !1;
            (i += "#"), (n = !1);
            for (const e of t)
              if (0 === e.remove) {
                n = !0;
                const t = e.getCode();
                t && (i += t + ",");
              }
            return (
              n && (i = i.slice(0, -1)),
              (i += "#"),
              (i +=
                this.scene.playerManager.firstPlayer._baseVehicle.vehicleName ||
                "MTB"),
              i
            );
          }
          resetPowerups() {
            for (const t of this.powerups)
              t.hit &&
                !t.remove &&
                ((t.hit = !1), (t.sector.powerupCanvasDrawn = !1));
          }
          addDefaultLine() {
            const t = this.defaultLine,
              e = t.p1,
              s = t.p2;
            this.addPhysicsLine(e.x, e.y, s.x, s.y);
          }
          erase(t, s, i) {
            this.dirty = !0;
            const n = this.settings.drawSectorSize,
              r = this.sectors.drawSectors,
              o = [],
              a = Qi((t.x + Math.abs(s)) / n),
              h = Qi((t.x - Math.abs(s)) / n),
              l = Qi((t.y + Math.abs(s)) / n),
              c = Qi((t.y - Math.abs(s)) / n);
            for (let e = h; e <= a; e++)
              for (let n = c; n <= l; n++)
                r[e] && r[e][n] && o.push(r[e][n].erase(t, s, i));
            return (0, e.flatten)(o);
          }
          undraw() {
            for (const t of this.totalSectors) t.drawn && t.clear(!0);
            this.recachePowerups(Math.max(this.camera.zoom, 1)),
              this.canvasPool.update();
          }
          collide(t) {
            const e = this.settings.physicsSectorSize,
              s = Math.floor(t.pos.x / e - 0.5),
              i = Math.floor(t.pos.y / e - 0.5),
              n = this.sectors.physicsSectors;
            n[s] && n[s][i] && n[s][i].resetCollided(),
              n[s + 1] && n[s + 1][i] && n[s + 1][i].resetCollided(),
              n[s + 1] && n[s + 1][i + 1] && n[s + 1][i + 1].resetCollided(),
              n[s] && n[s][i + 1] && n[s][i + 1].resetCollided(),
              n[s] && n[s][i] && n[s][i].collide(t),
              n[s + 1] && n[s + 1][i] && n[s + 1][i].collide(t),
              n[s + 1] && n[s + 1][i + 1] && n[s + 1][i + 1].collide(t),
              n[s] && n[s][i + 1] && n[s][i + 1].collide(t);
          }
          getDrawSector(t, e) {
            const s = this.settings.drawSectorSize,
              i = Qi(t / s),
              n = Qi(e / s),
              r = this.sectors.drawSectors;
            let o = !1;
            return void 0 !== r[i] && void 0 !== r[i][n] && (o = r[i][n]), o;
          }
          draw() {
            const t = this.scene,
              e = t.camera,
              s = t.screen,
              i = t.game.canvas.getContext("2d"),
              n = e.zoom,
              r = e.position,
              o = s.center,
              a = this.settings.drawSectorSize * n,
              h = (r.x * n) / a,
              l = (r.y * n) / a,
              c = s.width / a / 2,
              u = s.height / a / 2,
              d = h - c - 1,
              p = l - u - 1,
              f = h + c,
              g = l + u;
            (i.imageSmoothingEnabled = !1),
              (i.mozImageSmoothingEnabled = !1),
              (i.oImageSmoothingEnabled = !1),
              (i.webkitImageSmoothingEnabled = !1);
            const m = h * a - o.x,
              v = l * a - o.y,
              y = this.totalSectors,
              w = [];
            for (const t of y) {
              const e = t.row,
                s = t.column;
              if (
                (this.needsCleaning && this.cleanTrack(),
                t.dirty && t.cleanSector(),
                s >= d && f >= s && e >= p && g >= e)
              ) {
                !1 === t.drawn && t.draw(),
                  t.hasPowerups &&
                    !t.powerupCanvasDrawn &&
                    t.cachePowerupSector();
                const n = Qi(s * a - m),
                  r = Qi(e * a - v);
                i.drawImage(t.canvas, n, r, a, a),
                  t.hasPowerups && t.powerupCanvasDrawn && w.push(t);
              } else t.drawn && t.clear();
            }
            for (const t of w) {
              const e = t.column * a - m,
                s = t.row * a - v,
                r = t.powerupCanvasOffset * n;
              i.drawImage(t.powerupCanvas, e - r / 2, s - r / 2, a + r, a + r);
            }
          }
          closeSectors() {
            for (const t of this.totalSectors) t.close();
          }
          close() {
            (this.scene = null),
              this.closeSectors(),
              (this.totalSectors = null),
              (this.canvasPool = null),
              (this.sectors = null),
              (this.physicsLines = null),
              (this.sceneryLines = null),
              (this.powerups = null),
              (this.camera = null);
          }
        }
        (an.prototype.defaultLine = {
          p1: new t.Z(-40, 50),
          p2: new t.Z(40, 50),
        }),
          (an.prototype.game = null),
          (an.prototype.scene = null),
          (an.prototype.camera = null),
          (an.prototype.canvas = null),
          (an.prototype.canvasPool = null),
          (an.prototype.settings = null),
          (an.prototype.physicsLines = null),
          (an.prototype.sceneryLines = null),
          (an.prototype.powerups = null),
          (an.prototype.targets = null),
          (an.prototype.targetCount = 0),
          (an.prototype.sectors = null),
          (an.prototype.totalSectors = null),
          (an.prototype.allowedVehicles = null),
          (an.prototype.dirty = !1);
        const hn = an;
        var ln = s(874),
          cn = s.n(ln),
          un = s(742),
          dn = s.n(un),
          pn = s(211),
          fn = s.n(pn),
          gn = s(807),
          mn = s.n(gn),
          vn = s(978);
        class yn extends vn.Z {
          constructor(t) {
            super(),
              (this.name = "pause_controls"),
              (this.pauseControl = null),
              (this.paused = !1),
              (this.controlsSpriteSheetData = {
                frames: [
                  [230, 2, 76, 76],
                  [154, 2, 76, 76],
                  [78, 2, 76, 76],
                  [2, 2, 76, 76],
                ],
                animations: {
                  "pause_btn-hover": [0],
                  pause_btn: [1],
                  "play_btn-hover": [2],
                  play_btn: [3],
                },
              }),
              (this.controlData = {
                "pause_btn-hover": { key: "pause", top: 60, right: 70 },
              }),
              this.initialize(t);
          }
          update() {
            const t = this.scene.state.paused;
            this.paused !== t &&
              (t
                ? (this.pauseControl.gotoAndStop("play_btn-hover"),
                  (this.paused = !0))
                : (this.pauseControl.gotoAndStop("pause_btn-hover"),
                  (this.paused = !1)));
          }
          addControls() {
            const t = new createjs.Container();
            t.addChild(this.createControl("pause_btn-hover")),
              (this.controlsContainer = t),
              (this.pauseControl = t.getChildByName("pause_btn-hover")),
              this.stage.addChild(t);
          }
        }
        const wn = yn;
        class xn extends vn.Z {
          constructor(t) {
            super(), this.initialize(t);
          }
          addControls() {
            const t = new createjs.Container();
            t.addChild(this.createControl("redo")),
              t.addChild(this.createControl("undo")),
              (this.controlsContainer = t),
              this.stage.addChild(t);
          }
          update() {
            const t = this.scene,
              e = this.scene.state.paused;
            t.controls &&
              this.controlsContainer.visible !== e &&
              (this.controlsContainer.visible = e);
          }
        }
        const bn = xn.prototype;
        (bn.name = "redo_undo_controls"),
          (bn.controlsSpriteSheetData = {
            frames: [
              [78, 2, 76, 76],
              [2, 2, 76, 76],
            ],
            animations: { redo: [0], undo: [1] },
          }),
          (bn.controlData = {
            redo: { keys: ["ctrl", "y"], top: 60, right: 160 },
            undo: { keys: ["ctrl", "z"], top: 60, right: 240 },
          });
        const _n = xn;
        var Tn = s(546),
          Cn = s.n(Tn),
          kn = s(909),
          Sn = s.n(kn);
        const An = Application.Helpers.GoogleAnalyticsHelper;
        class Pn {
          constructor(t) {
            (this.game = t),
              (this.mod = t.mod),
              (this.assets = t.assets),
              (this.stage = t.stage),
              (this.settings = t.settings),
              (this.sound = new (Cn())(this)),
              (this.mouse = new u(this)),
              this.mouse.disableContextMenu(),
              (this.message = new (Sn())(this)),
              (this.camera = new y(this)),
              (this.screen = new b(this)),
              this.createTrack(),
              (this.loadingcircle = new (cn())(this)),
              (this.playerManager = new $t(this)),
              (this.vehicleTimer = new (te())(this)),
              (this.score = new (dn())(this)),
              this.updateMainPlayerHotkeys(),
              this.createMainPlayer(),
              this.createControls(),
              this.registerTools(),
              (this.state = this.setStateDefaults()),
              (this.oldState = this.setStateDefaults()),
              this.restart(),
              this.initializeAnalytics(),
              this.stage.addEventListener(
                "stagemousedown",
                this.tapToStartOrRestart.bind(this)
              );
          }
          getCanvasOffset() {
            return this.settings.isStandalone
              ? { height: 90, width: 0 }
              : { height: 90, width: 0 };
          }
          tapToStartOrRestart() {
            if (this.settings.mobile) {
              const t = this.playerManager.firstPlayer;
              t && t._crashed && !this.state.paused
                ? t.getGamepad().setButtonDown("enter")
                : this.play();
            }
          }
          initializeAnalytics() {
            (this.analytics = { deaths: 0, mouseEvents: 0 }),
              this.trackAction("editor-open", "open");
          }
          updateMainPlayerHotkeys() {
            const t = this.playerManager.firstPlayer;
            if (t) {
              const e = t.getGamepad();
              const hotkeys = GameSettings.switchHotkeys ? this.settings.playHotkeys : this.settings.editorHotkeys;
              e.setKeyMap(hotkeys);
            }
          }
          createMainPlayer() {
            const t = this.playerManager.createPlayer(this, this.settings.user),
              e = t.getGamepad(),
              hotkeys = GameSettings.switchHotkeys ? this.settings.playHotkeys : this.settings.editorHotkeys;
            e.setKeyMap(hotkeys),
              (e.onButtonDown = this.buttonDown.bind(this)),
              e.listen(),
              (this.playerManager.firstPlayer = t),
              this.playerManager.addPlayer(t);
          }
          
          createControls() {
            "tablet" === this.settings.controls &&
              ((this.controls = new (fn())(this)), this.controls.hide()),
              "phone" === this.settings.controls &&
                ((this.controls = new (mn())(this)), this.controls.hide()),
              (this.redoundoControls = new _n(this)),
              (this.pauseControls = new wn(this));
          }
          createTrack() {
            this.track && this.track.close();
            const t = new hn(this),
              e = this.getAvailableTrackCode();
            0 != e
              ? (t.read(e),
                (this.track = t),
                (this.state.preloading = !1),
                (this.state.loading = !1))
              : t.addDefaultLine(),
              (this.importCode = !1),
              (this.restartTrack = !0),
              (this.clear = !1),
              (this.track = t);
          }
          updateControls() {
            if (this.controls) {
              const t = this.state.paused;
              this.controls.isVisible() === t &&
                (t ||
                  ((this.state.playing = !1),
                  this.camera.focusOnMainPlayer(),
                  this.toolHandler.setTool("camera")),
                this.controls.setVisibility(!t),
                this.updateState()),
                this.controls.update();
            }
            this.pauseControls.update();
          }
          registerTools() {
            const t = new we(this);
            (this.toolHandler = t),
              t.enableGridUse(),
              t.registerTool(_e),
              t.registerTool(Me),
              t.registerTool(De),
              t.registerTool(ze),
              t.registerTool(circze),
              t.registerTool(Fe()),
              t.registerTool(We),
              t.registerTool(si),
              t.registerTool(Ri),
              t.setTool(this.settings.startTool);
          }
          updateToolHandler() {
            (this.controls && !1 !== this.controls.isVisible()) ||
              this.toolHandler.update();
          }
          play() {
            this.state.playing = !0;
          }
          update() {
            this.updateToolHandler(),
              this.mouse.update(),
              this.state.showDialog ||
                (this.updateGamepads(), this.checkGamepads()),
              this.screen.update(),
              this.updateControls(),
              this.camera.update(),
              this.sound.update(),
              this.restartTrack && this.restart(),
              !this.state.paused &&
                this.state.playing &&
                (this.message.update(),
                this.updatePlayers(),
                this.score.update(),
                this.playerManager.firstPlayer.complete
                  ? this.trackComplete()
                  : this.ticks++),
              this.vehicleTimer.update(),
              (this.importCode || this.clear) && this.createTrack(),
              this.isStateDirty() && this.updateState(),
              this.stage.clear(),
              this.draw(),
              this.stage.update(),
              this.camera.updateZoom(),
              this.updateMainPlayerHotkeys();
          }
          isStateDirty() {
            const t = this.oldState,
              e = this.state;
            let s = !1;
            for (const i in e)
              e[i] !== t[i] && ((s = !0), (this.oldState[i] = e[i]));
            return s;
          }
          updateGamepads() {
            this.playerManager.updateGamepads();
          }
          checkGamepads() {
            this.playerManager.checkKeys();
          }
          stopAudio() {
            createjs.Sound.stop();
          }
          restart() {
            (this.verified = !this.settings.requireTrackVerification),
              (this.track.dirty = !1),
              this.track.resetPowerups(),
              this.message.hide(),
              (this.restartTrack = !1),
              (this.state.playing = !1),
              (this.ticks = 0),
              this.playerManager.reset(),
              this.camera.focusOnPlayer(),
              this.camera.fastforward(),
              this.score.update();
          }
          buttonDown(t) {
            const e = this.camera;
            switch (((this.state.playing = !0), t)) {
              case "up":
              case "down":
              case "left":
              case "right":
                e.focusOnMainPlayer();
                break;
              case "change_camera":
                e.focusOnNextPlayer();
                break;
              case "pause":
                this.state.paused = !this.state.paused;
                break;
              case "settings":
                this.command("dialog", "settings");
                break;
              case "change_vehicle":
                this.toggleVehicle(), this.stateChanged();
                break;
              case "zoom_increase":
                e.increaseZoom(), this.stateChanged();
                break;
              case "zoom_decrease":
                e.decreaseZoom(), this.stateChanged();
                break;
              case "fullscreen":
                this.toggleFullscreen(), this.stateChanged();
            }
          }
          toggleFullscreen() {
            if (this.settings.embedded) {
              const t = this.settings,
                e = t.basePlatformUrl + "/t/" + t.track.url;
              window.open(e);
            } else
              this.settings.fullscreenAvailable &&
                (this.settings.fullscreen = this.state.fullscreen =
                  !this.settings.fullscreen);
          }
          updatePlayers() {
            this.playerManager.update();
          }
          drawPlayers() {
            this.playerManager.draw();
          }
          draw() {
            this.toolHandler.drawGrid(),
              this.track.draw(),
              this.drawPlayers(),
              (this.controls && !1 !== this.controls.isVisible()) ||
                this.toolHandler.draw(),
              this.state.loading && this.loadingcircle.draw(),
              this.message.draw();
          }
          getAvailableTrackCode() {
            const t = this.settings;
            let e = !1;
            return (
              t.importCode && "false" !== t.importCode
                ? ((e = t.importCode), (t.importCode = null))
                : this.importCode &&
                  ((e = this.importCode), (this.importCode = null)),
              e
            );
          }
          redraw() {
            this.track.undraw(),
              GameInventoryManager.redraw(),
              this.toolHandler.resize();
          }
          resize() {
            this.pauseControls.resize(),
              this.redoundoControls.resize(),
              this.controls && this.controls.resize();
          }
          updateState() {
            if (null !== this.game.onStateChange) {
              const t = this.state;
              (t.tool = this.toolHandler.currentTool),
                (t.toolOptions = this.toolHandler.getToolOptions()),
                (t.grid = this.toolHandler.options.grid),
                (t.cameraLocked = this.toolHandler.options.cameraLocked),
                (t.zoomPercentage = this.camera.zoomPercentage),
                (t.vehicle = this.vehicle),
                (t.editorHotkeys = this.editorHotkeys),
                this.game.onStateChange(this.state);
            }
          }
          stateChanged() {
            this.updateState();
          }
          setStateDefaults() {
            const t = {};
            return (
              (t.paused = !!this.settings.mobile || this.settings.startPaused),
              (t.loading = !1),
              (t.playing = this.settings.waitForKeyPress),
              (t.tool = this.toolHandler.currentTool),
              (t.toolOptions = this.toolHandler.getToolOptions()),
              (t.grid = this.toolHandler.options.grid),
              (t.cameraLocked = this.toolHandler.options.cameraLocked),
              (t.zoomPercentage = this.camera.zoomPercentage),
              (t.vehicle = this.vehicle),
              (t.showDialog = !1),
              (t.dialogOptions = !1),
              (t.preloading = !1),
              (t.fullscreen = this.settings.fullscreen),
              (t.inFocus = !0),
              this.controls && (t.hideMenus = this.controls.isVisible()),
              t
            );
          }
          toggleVehicle() {
            const t = this.track.allowedVehicles,
              e = this.state.vehicle;
            let s = t.indexOf(e);
            s++, s >= t.length && (s = 0), this.selectVehicle(t[s]);
          }
          selectVehicle(t) {
            this.track.allowedVehicles.includes(t) &&
              ((this.vehicle = t),
              this.playerManager.firstPlayer.setBaseVehicle(t),
              (this.restartTrack = !0));
          }
          trackAction(t, e) {
            const s = {
              category: "create",
              action: t,
              label: e,
              value:
                this.toolHandler.analytics.actions + this.mouse.analytics.clicks,
              non_interaction: !0,
            };
            An.track_event(s);
          }
          openDialog(t) {
            switch (((this.state.dialogOptions = {}), t)) {
              case "import":
                break;
              case "export":
                setTimeout(this.getTrackCode.bind(this), 750);
                break;
              case "upload":
                "undefined" == typeof isChromeApp &&
                  setTimeout(this.getTrackCode.bind(this), 750);
            }
            (this.state.playing = !1), (this.state.showDialog = t);
          }
          getTrackCode() {
            (this.state.dialogOptions = {}),
              (this.state.dialogOptions.verified = this.verified),
              (this.state.dialogOptions.code = this.track.getCode());
          }
          trackComplete() {
            this.verified = !this.track.dirty;
          }
          hideControlPlanel() {}
          showControlPlanel() {}
          command(...t) {
            switch (t.shift()) {
              case "change tool":
                this.toolHandler.setTool(t[0]);
                break;
              case "change tool option": {
                const e = t[0],
                  s = t[1];
                void 0 !== t[2]
                  ? this.toolHandler.setToolOption(e, s, t[2])
                  : this.toolHandler.setToolOption(e, s);
                break;
              }
              case "snap":
                this.toolHandler.toggleSnap();
                break;
              case "add track":
                this.track.read(demo.code);
                break;
              case "redraw":
                this.redraw();
                break;
              case "fullscreen":
                this.settings.fullscreen = this.state.fullscreen =
                  !this.settings.fullscreen;
                break;
              case "grid":
                this.toolHandler.toggleGrid();
                break;
              case "lock camera":
                this.toolHandler.toggleCameraLock();
                break;
              case "toggle vehicle":
                this.toggleVehicle(), this.stateChanged();
                break;
              case "reset zoom":
                this.camera.resetZoom();
                break;
              case "increase zoom":
                this.camera.increaseZoom();
                break;
              case "decrease zoom":
                this.camera.decreaseZoom();
                break;
              case "change lineType":
                (this.toolHandler.options.lineType = t[0]), this.stateChanged();
                break;
              case "resize":
                this.resize();
                break;
              case "dialog": {
                const e = t[0];
                !1 === e ? this.listen() : this.unlisten(), this.openDialog(e);
                break;
              }
              case "focused":
                !0 === t[0]
                  ? ((this.state.inFocus = !0),
                    this.state.showDialog || this.listen())
                  : ((this.state.inFocus = !1),
                    this.unlisten(),
                    (this.state.playing = !1));
                break;
              case "clear track":
                this.trackAction("editor-action", "clear"), (this.clear = !0);
                break;
              case "import": {
                let e = t[0];
                e.length <= 0 && (e = !1),
                  (this.importCode = e),
                  (this.clear = t[1]),
                  this.command("dialog", !1);
                break;
              }
            }
          }
          listen() {
            this.playerManager.firstPlayer.getGamepad().listen();
          }
          unlisten() {
            this.playerManager.firstPlayer.getGamepad().unlisten();
          }
          close() {
            this.trackAction("editor-exit", "exit"),
              (this.pauseControls = null),
              this.mouse.close(),
              (this.mouse = null),
              this.camera.close(),
              (this.camera = null),
              this.screen.close(),
              (this.screen = null),
              this.vehicleTimer.close(),
              (this.vehicleTimer = null),
              this.playerManager.close(),
              (this.playerManager = null),
              this.sound.close(),
              (this.sound = null),
              this.track.close(),
              this.toolHandler.close(),
              (this.game = null),
              (this.assets = null),
              (this.settings = null),
              (this.stage = null),
              (this.track = null),
              (this.state = null),
              this.stopAudio();
          }
        }
        const Mn = Pn.prototype;
        (Mn.game = null),
          (Mn.assets = null),
          (Mn.stage = null),
          (Mn.canvas = null),
          (Mn.settings = null),
          (Mn.camera = null),
          (Mn.screen = null),
          (Mn.mouse = null),
          (Mn.track = null),
          (Mn.player = null),
          (Mn.players = null),
          (Mn.ticks = 0),
          (Mn.state = null),
          (Mn.oldState = null),
          (Mn.stateDirty = !0),
          (Mn.onStateChange = null),
          (Mn.vehicle = "MTB"),
          (Mn.showDialog = !1),
          (Mn.dialogOptions = !1),
          (Mn.importCode = !1),
          (Mn.clear = !1),
          (Mn.redoundoControls = null),
          (Mn.pauseControls = null),
          (Mn.inFocus = !0),
          (Mn.controls = null),
          (Mn.verified = !1),
          (Mn.analytics = null);
        const In = Pn;
        var Bn = s(648),
          Dn = s.n(Bn),
          En = s(425),
          Ln = s.n(En);
        class zn extends vn.Z {
          constructor(t) {
            super(), this.initialize(t);
          }
          update() {
            const t = this.scene.settings.fullscreen;
            this.fullscreen !== t &&
              (this.fullscreenControl.gotoAndStop(
                t ? "exit_fullscreen_btn-hover" : "fullscreen_btn-hover"
              ),
              (this.fullscreen = t));
          }
          addControls() {
            const t = new createjs.Container();
            t.addChild(this.createControl("fullscreen_btn-hover")),
              (this.controlsContainer = t),
              (this.fullscreenControl = t.getChildByName("fullscreen_btn-hover")),
              this.stage.addChild(t);
          }
        }
        (zn.prototype.name = "fullscreen_controls"),
          (zn.prototype.fullscreenControl = null),
          (zn.prototype.fullscreen = !1),
          (zn.prototype.controlsSpriteSheetData = {
            frames: [
              [230, 2, 76, 76],
              [154, 2, 76, 76],
              [78, 2, 76, 76],
              [2, 2, 76, 76],
            ],
            animations: {
              "exit_fullscreen_btn-hover": [0],
              exit_fullscreen_btn: [1],
              "fullscreen_btn-hover": [2],
              fullscreen_btn: [3],
            },
          }),
          (zn.prototype.controlData = {
            "fullscreen_btn-hover": { top: 60, right: 150, key: "fullscreen" },
          });
        const On = zn;
        var Fn = s(127),
          jn = s.n(Fn),
          Rn = s(80),
          Wn = s(609);
        const Vn = Math.round,
          Hn = Application.Helpers.GoogleAnalyticsHelper;
        class Nn {
          constructor(t) {
            (this.game = t),
              (this.mod = t.mod),
              (this.assets = t.assets),
              (this.stage = t.stage),
              (this.settings = t.settings),
              (this.sound = new (Cn())(this)),
              (this.mouse = new u(this)),
              this.initalizeCamera(),
              (this.screen = new b(this)),
              this.createTrack(),
              (this.score = new (dn())(this)),
              (this.raceTimes = new (Ln())(this)),
              (this.message = new (Sn())(this)),
              this.settings.isCampaign && (this.campaignScore = new (Dn())(this)),
              (this.loadingcircle = new (cn())(this)),
              (this.loading = !1),
              (this.ready = !1),
              (this.playerManager = new $t(this)),
              (this.vehicleTimer = new (te())(this)),
              (this.races = []),
              (this.state = this.setStateDefaults()),
              (this.oldState = this.setStateDefaults()),
              this.createMainPlayer(),
              this.createControls(),
              this.registerTools(),
              this.setStartingVehicle(),
              this.restart(),
              this.initializeAnalytics(),
              this.stage.addEventListener(
                "stagemousedown",
                this.tapToStartOrRestart.bind(this)
              );
          }
          getCanvasOffset() {
            return { height: 0, width: 0 };
          }
          tapToStartOrRestart() {
            if (this.settings.mobile) {
              const t = this.playerManager.firstPlayer;
              t && t._crashed && !this.state.paused
                ? t.getGamepad().setButtonDown("enter")
                : this.play();
            }
          }
          initializeAnalytics() {
            this.analytics = { deaths: 0 };
          }
          createControls() {
            "tablet" === this.settings.controls &&
              ((this.controls = new (fn())(this)), this.controls.hide()),
              "phone" === this.settings.controls &&
                ((this.controls = new (mn())(this)), this.controls.hide()),
              (this.pauseControls = new wn(this)),
              this.settings.fullscreenAvailable &&
                (this.fullscreenControls = new On(this)),
              (this.settingsControls = new (jn())(this));
          }
          play() {
            this.state.playing ||
              ((this.state.playing = !0), this.hideControlPlanel());
          }
          buttonDown(t) {
            if (!this.state.showDialog) {
              const e = this.camera;
              switch (t) {
                case "change_camera":
                  e.focusOnNextPlayer();
                  break;
                case "pause":
                  this.state.paused = !this.state.paused;
                  break;
                case "settings":
                  this.openDialog("settings");
                  break;
                case "exit_fullscreen":
                  this.exitFullscreen();
                  break;
                case "change_vehicle":
                  this.toggleVehicle();
                  break;
                case "zoom_increase":
                  e.increaseZoom();
                  break;
                case "zoom_decrease":
                  e.decreaseZoom();
                  break;
                case "fullscreen":
                  this.toggleFullscreen();
              }
            }
          }
          exitFullscreen() {
            this.settings.fullscreenAvailable &&
              ((this.settings.fullscreen = !1),
              (this.state.fullscreen = !1),
              this.trackEvent(
                "game-ui",
                "game-fullscreen-toggle",
                "game-out-fullscreen"
              ));
          }
          toggleFullscreen() {
            if (this.settings.embedded) {
              const t = this.settings,
                e = t.basePlatformUrl + "/t/" + t.track.url;
              window.open(e);
            } else
              this.settings.fullscreenAvailable &&
                ((this.settings.fullscreen = !this.settings.fullscreen),
                (this.state.fullscreen = !this.settings.fullscreen),
                this.settings.fullscreen
                  ? this.trackEvent(
                      "game-ui",
                      "game-fullscreen-toggle",
                      "game-into-fullscreen"
                    )
                  : this.trackEvent(
                      "game-ui",
                      "game-fullscreen-toggle",
                      "game-out-fullscreen"
                    ));
          }
          trackEvent(t, e, s) {
            Hn.track_event({
              category: t,
              action: e,
              label: s,
              value: 0,
              non_interaction: !0,
            });
          }
          getAvailableTrackCode() {
            const t = this.settings;
            let e = !1;
            return (
              t.importCode && "false" !== t.importCode
                ? ((e = t.importCode), (t.importCode = null))
                : this.importCode &&
                  ((e = this.importCode), (this.importCode = null)),
              e
            );
          }
          createMainPlayer() {
            const t = this.playerManager.createPlayer(this, this.settings.user),
              e = t.getGamepad();
            e.setKeyMap(this.settings.playHotkeys),
              e.recordKeys(this.settings.keysToRecord),
              (e.onButtonDown = this.buttonDown.bind(this)),
              e.listen(),
              (this.playerManager.firstPlayer = t),
              this.playerManager.addPlayer(t);
          }
          createTrack() {
            this.track && this.track.close();
            const t = new hn(this),
              e = this.getAvailableTrackCode();
            0 != e &&
              ((this.track = t),
              this.setTrackAllowedVehicles(),
              t.read(e),
              (this.state.preloading = !1),
              (this.loading = !1),
              (this.restartTrack = !0),
              (this.ready = !0)),
              (this.track = t);
          }
          setTrackAllowedVehicles() {
            const t = this.settings.track;
            t && (this.track.allowedVehicles = t.vehicles);
          }
          initalizeCamera() {
            this.camera = new y(this);
          }
          updateControls() {
            if (this.controls) {
              const t = this.state.paused;
              this.controls.isVisible() === t &&
                (t ||
                  ((this.state.playing = !1),
                  this.camera.focusOnMainPlayer(),
                  this.toolHandler.setTool("camera")),
                this.controls.setVisibility(!t),
                this.controls.setZoomControlsVisibilty(t),
                this.updateState()),
                this.controls.update();
            }
            this.pauseControls.update(),
              this.settings.fullscreenAvailable &&
                this.fullscreenControls.update();
          }
          registerTools() {
            const t = new we(this);
            (this.toolHandler = t), t.registerTool(_e), t.setTool("Camera");
          }
          updateToolHandler() {
            (this.controls && !1 !== this.controls.isVisible()) ||
              this.toolHandler.update();
          }
          update() {
            this.ready
              ? (this.updateToolHandler(),
                this.mouse.update(),
                this.state.paused ||
                  this.state.showDialog ||
                  (this.updateGamepads(), this.checkGamepads()),
                this.screen.update(),
                this.updateControls(),
                this.camera.update(),
                this.sound.update(),
                this.restartTrack && this.restart(),
                !this.state.paused &&
                  this.state.playing &&
                  (this.message.update(),
                  this.updatePlayers(),
                  this.playerManager.firstPlayer.complete
                    ? this.trackComplete()
                    : this.ticks++),
                this.updateScore(),
                this.vehicleTimer.update(),
                this.isStateDirty() && this.updateState(),
                this.stage.clear(),
                this.draw(),
                this.stage.update(),
                this.camera.updateZoom())
              : this.importCode && this.createTrack();
          }
          isStateDirty() {
            const t = this.oldState,
              e = this.state;
            e.fullscreen != GameSettings.fullscreen &&
              (e.fullscreen = GameSettings.fullscreen);
            let s = !1;
            for (const i in e)
              e[i] !== t[i] && ((s = !0), (this.oldState[i] = e[i]));
            return s;
          }
          updateScore() {
            this.score.update(),
              this.campaignScore && this.campaignScore.update(),
              this.raceTimes.update();
          }
          restart() {
            this.settings.mobile
              ? this.message.show("Press Any Button To Start", 1, "#333333")
              : this.message.show(
                  "Press Any Key To Start",
                  1,
                  "#333333",
                  "#FFFFFF"
                ),
              this.track.resetPowerups(),
              (this.restartTrack = !1),
              (this.state.paused = !1),
              (this.state.playing = !this.settings.waitForKeyPress),
              (this.ticks = 0),
              this.playerManager.reset(),
              this.playerManager.getPlayerCount() > 0 &&
                (this.camera.focusIndex = 1),
              this.camera.focusOnPlayer(),
              this.camera.fastforward(),
              this.showControlPlanel("main");
          }
          listen() {
            this.playerManager.firstPlayer.getGamepad().listen();
          }
          unlisten() {
            this.playerManager.firstPlayer.getGamepad().unlisten();
          }
          stopAudio() {
            createjs.Sound.stop();
          }
          setStartingVehicle() {
            const t = this.settings;
            let e = t.startVehicle;
            t.track && (e = t.track.vehicle), (this.vehicle = e);
          }
          updateGamepads() {
            this.playerManager.updateGamepads();
          }
          checkGamepads() {
            this.playerManager.checkKeys();
          }
          updatePlayers() {
            this.playerManager.update();
          }
          drawPlayers() {
            this.playerManager.draw();
          }
          hideControlPlanel() {
            this.state.showSkip && (this.state.showSkip = !1),
              !1 !== this.state.showControls && (this.state.showControls = !1);
          }
          showControlPlanel(t) {
            this.settings.isCampaign &&
              !this.settings.mobile &&
              this.settings.campaignData.can_skip &&
              this.analytics &&
              this.analytics.deaths > 5 &&
              (this.state.showSkip = !0),
              this.stateshowControls !== t &&
                this.settings.showHelpControls &&
                (this.state.showControls = t);
          }
          draw() {
            this.toolHandler.drawGrid(),
              this.track.draw(),
              this.drawPlayers(),
              (this.controls && !1 !== this.controls.isVisible()) ||
                this.toolHandler.draw(),
              this.loading && this.loadingcircle.draw(),
              this.message.draw();
          }
          redraw() {
            this.track.undraw(),
              GameInventoryManager.redraw(),
              this.toolHandler.resize();
          }
          resize() {
            this.pauseControls.resize(),
              this.settings.fullscreenAvailable &&
                this.fullscreenControls.resize(),
              this.settingsControls.resize(),
              this.controls && this.controls.resize();
          }
          updateState() {
            null !== this.game.onStateChange &&
              this.game.onStateChange(this.state);
          }
          stateChanged() {
            this.updateState();
          }
          setStateDefaults() {
            const t = {};
            return (
              (t.playing = !this.settings.waitForKeyPress),
              (t.paused = !1),
              (t.playerAlive = !0),
              (t.inFocus = !0),
              (t.preloading = !0),
              (t.fullscreen = this.settings.fullscreen),
              (t.showControls = !1),
              (t.showSkip = !1),
              (t.showDialog = !1),
              (t.dialogOptions = !1),
              t
            );
          }
          toggleVehicle() {
            const t = this.track.allowedVehicles;
            let e = this.vehicle,
              s = t.indexOf(e);
            s++, s >= t.length && (s = 0), (e = t[s]), this.selectVehicle(e);
          }
          selectVehicle(t) {
            this.track.allowedVehicles.includes(t) &&
              ((this.settings.track.vehicle = t),
              (this.vehicle = t),
              this.playerManager.firstPlayer.setBaseVehicle(t),
              (this.restartTrack = !0));
          }
          openDialog(t) {
            (this.state.playing = !1), (this.state.showDialog = t);
          }
          command(...t) {
            switch (t.shift()) {
              case "resize":
                this.resize();
                break;
              case "dialog": {
                const e = t[0];
                !1 === e ? this.listen() : this.unlisten(), this.openDialog(e);
                break;
              }
              case "focused":
                !0 === t[0]
                  ? ((this.state.inFocus = !0),
                    this.state.showDialog || this.listen())
                  : ((this.state.inFocus = !1),
                    this.game.mod.vars.disableDefocus
                      ? this.playerManager.firstPlayer.getGamepad().semiUnlisten()
                      : (this.unlisten(), (this.state.playing = !1)));
                break;
              case "add track":
                this.importCode = t[0].code;
                break;
              case "clear race":
                (this.races = []),
                  (this.restartTrack = !0),
                  this.raceTimes.clear();
                break;
              case "add race": {
                const e = t[0],
                  s = t[1];
                this.addRaces(e),
                  s &&
                    ((this.state.dialogOptions = { races: this.races }),
                    this.command("dialog", "race_dialog"));
                break;
              }
              case "change vehicle":
                this.selectVehicle(t[0]);
                break;
              case "restart":
                this.command("dialog", !1), (this.restartTrack = !0);
                break;
              case "resume":
                this.state.paused = !1;
                break;
              case "fullscreen":
                this.toggleFullscreen();
                break;
              case "exit_fullscreen":
                this.exitFullscreen();
            }
          }
          addRaces(t) {
            this.mergeRaces(t),
              this.sortRaces(),
              this.formatRaces(),
              this.addRaceTimes(),
              this.addPlayers(),
              (this.restartTrack = !0);
          }
          addRaceTimes() {
            const t = this.settings.raceColors,
              e = this.races,
              s = this.raceTimes;
            s.clear();
            for (const i in e) {
              const n = e[i];
              (n.user.color = t[i % t.length]), s.addRace(n, i);
            }
          }
          addPlayers() {
            const t = this.races,
              e = this.playerManager;
            e.clear();
            for (const s of t) {
              const t = s.user,
                i = s.race;
              let n = i.code;
              "string" == typeof n && (n = JSON.parse(n));
              const r = e.createPlayer(this, t);
              r.setBaseVehicle(i.vehicle),
                r.setAsGhost(),
                r.getGamepad().loadPlayback(n, this.settings.keysToRecord),
                e.addPlayer(r);
            }
          }
          formatRaces() {
            for (const { race: t } of this.races) {
              let s = t.code;
              if ("string" == typeof s) {
                s = JSON.parse(s);
                for (const t in s) s[t] = (0, e.countBy)(s[t], e.identity);
                t.code = s;
              }
            }
          }
          removeDuplicateRaces() {
            this.races = (0, e.uniq)(
              this.races,
              this.uniqesByUserIdIterator.bind(this)
            );
          }
          uniqesByUserIdIterator(t) {
            return t.user.u_id;
          }
          sortRaces() {
            this.races = (0, e.sortBy)(
              this.races,
              this.sortByRunTicksIterator.bind(this)
            );
          }
          mergeRaces(t) {
            const s = this.races;
            (0, e.each)(t, function (t) {
              const i = (0, e.find)(s, function (e) {
                return e.user.u_id === t.user.u_id;
              });
              i ? (0, e.extend)(i, t) : s.push(t);
            });
          }
          sortByRunTicksIterator(t) {
            const e = parseInt(t.race.run_ticks);
            return (t.runTime = (0, Wn.Z)((e / this.settings.drawFPS) * 1e3)), e;
          }
          verifyComplete() {
            const t = this.playerManager.firstPlayer._powerupsConsumed.targets,
              e = this.track.targets;
            let s = !0;
            for (const i of e) t.includes(i.id) || (s = !1);
            return s;
          }
          trackComplete() {
            if (this.verifyComplete()) {
              this.sound.play("victory_sound");
              const t = this.playerManager;
              t.mutePlayers();
              const e = t.firstPlayer,
                s = e.getGamepad(),
                i = s.getReplayString(),
                n = this.settings,
                r = this.ticks,
                o = (0, Wn.Z)((r / n.drawFPS) * 1e3),
                a = {
                  t_id: $("#track-data").data("t_id"),
                  u_id: n.user.u_id,
                  code: i,
                  vehicle: e._baseVehicleType,
                  run_ticks: r,
                  fps: 25,
                  time: o,
                },
                h = (0, Rn.SHA256)(
                  a.t_id +
                    "|" +
                    a.u_id +
                    "|" +
                    a.code +
                    "|" +
                    a.run_ticks +
                    "|" +
                    a.vehicle +
                    "|" +
                    a.fps +
                    "|erxrHHcksIHHksktt8933XhwlstTekz"
                ).toString();
              a.sig = h;
              const l = this.races,
                c = [];
              if (l.length > 0) {
                for (const t of l) c.push(t.user.u_id);
                a.races = c;
              }
              n.isCampaign && (a.is_campaign = !0),
                (this.state.dialogOptions = {
                  postData: a,
                  analytics: this.analytics,
                }),
                n.isCampaign
                  ? this.command("dialog", "campaign_complete")
                  : this.command("dialog", "track_complete"),
                s.reset(!0),
                this.listen();
            }
          }
          drawFPS() {
            let t = createjs.Ticker.getMeasuredFPS();
            const e = this.game.pixelRatio,
              s = this.game.canvas.getContext("2d"),
              i = 5 * e,
              n = this.screen.height - 12 * e;
            t = Vn(10 * t) / 10;
            const r = "FPS : " + t;
            s.save(),
              (s.fillStyle = "#000000"),
              (s.font = 8 * e + "pt arial"),
              s.fillText(r, i, n),
              s.restore();
          }
          close() {
            (this.fullscreenControls = null),
              (this.settingsControls = null),
              (this.pauseControls = null),
              (this.raceTimes = null),
              (this.score = null),
              (this.campaignScore = null),
              this.mouse.close(),
              (this.mouse = null),
              this.camera.close(),
              (this.camera = null),
              this.screen.close(),
              (this.screen = null),
              this.vehicleTimer.close(),
              (this.vehicleTimer = null),
              this.playerManager.close(),
              (this.playerManager = null),
              this.sound.close(),
              (this.sound = null),
              this.track.close(),
              this.toolHandler.close(),
              (this.game = null),
              (this.assets = null),
              (this.settings = null),
              (this.stage = null),
              (this.track = null),
              (this.state = null),
              this.stopAudio();
          }
        }
        const Zn = Nn.prototype;
        (Zn.game = null),
          (Zn.assets = null),
          (Zn.stage = null),
          (Zn.settings = null),
          (Zn.camera = null),
          (Zn.score = null),
          (Zn.screen = null),
          (Zn.mouse = null),
          (Zn.track = null),
          (Zn.player = null),
          (Zn.players = null),
          (Zn.ticks = 0),
          (Zn.races = null),
          (Zn.state = null),
          (Zn.oldState = null),
          (Zn.stateDirty = !0),
          (Zn.onStateChange = null),
          (Zn.playing = !1),
          (Zn.ready = !1),
          (Zn.vehicle = "MTB"),
          (Zn.showDialog = !1),
          (Zn.importCode = !1),
          (Zn.preloading = !0),
          (Zn.loading = !0),
          (Zn.pauseControls = null),
          (Zn.fullscreenControls = null),
          (Zn.settingsControls = null),
          (Zn.controls = null),
          (Zn.message = null),
          (Zn.showSkip = !1),
          (Zn.analytics = null);
        const Un = Nn,
          qn = document.createElement("canvas"),
          Gn = qn.getContext("2d");
        (qn.width = qn.height = 32 * devicePixelRatio),
          Gn.scale(devicePixelRatio, devicePixelRatio);
        let Yn = 0;
        Gn.beginPath(), Gn.moveTo(16, 4);
        for (let t = 1; t < 5; t++)
          (Yn += (2 * Math.PI) / 5),
            Gn.lineTo(16 + 12 * Math.sin(Yn), 16 - 12 * Math.cos(Yn));
        Gn.closePath(),
          (Gn.lineJoin = "round"),
          (Gn.lineWidth = 8),
          (Gn.strokeStyle = "#000"),
          Gn.stroke(),
          (Gn.lineWidth = 4),
          (Gn.strokeStyle = "#fff"),
          Gn.stroke();
        const Xn = qn.toDataURL();
        Gn.clearRect(0, 0, 32, 32),
          Gn.closePath(),
          (Gn.lineWidth = 8),
          (Gn.strokeStyle = "#000"),
          (Gn.lineJoin = "round"),
          Gn.stroke(),
          (Gn.lineWidth = 4),
          (Gn.strokeStyle = "#a1e1f6"),
          Gn.stroke();
        const Kn = qn.toDataURL();
        (qn.width = qn.height = 44 * devicePixelRatio),
          Gn.scale(devicePixelRatio, devicePixelRatio),
          Gn.translate(22, 22),
          (Gn.lineJoin = "round");
        const Jn = {};
        function $n(t) {
          return (
            Gn.clearRect(-22, -22, 44, 44),
            (Gn.fillStyle = t),
            Gn.fill(),
            Gn.stroke(),
            qn.toDataURL()
          );
        }
        (Gn.strokeStyle = "#000"),
          (Gn.lineWidth = 2),
          Gn.moveTo(-10, -7),
          Gn.lineTo(10, 0),
          Gn.lineTo(-10, 7),
          Gn.closePath(),
          (Jn.speed = $n("#ff0")),
          Gn.beginPath(),
          Gn.moveTo(-7, 10),
          Gn.lineTo(0, -10),
          Gn.lineTo(7, 10),
          Gn.closePath(),
          (Jn.gravity = $n("#0f0")),
          Gn.beginPath(),
          Gn.arc(0, 0, 7, 0, 2 * Math.PI),
          Gn.closePath(),
          (Jn.goal = $n("#ff0")),
          (Jn.slowmotion = $n("#eeeeee")),
          (Jn.bomb = $n("#f00")),
          (Jn.checkpoint = $n("#00f")),
          (Jn.antigravity = $n("#0ff")),
          (Jn.portal = $n("#f0f"));
        let Qn = "";
        for (const t in Jn)
          Qn += `.editorgui_icons3.editorgui_icons-${t}{background-image:url("${Jn[t]}");background-position:0 0;background-size:44px 44px;}`;
        const tr = document.createElement("style");
        (tr.innerHTML = Qn),
          (Qn = `.mod-icon{background-image:url("${Xn}")}.mod-icon:hover{background-image:url("${Kn}")}`);
        const er = document.createElement("style");
        (er.innerHTML = Qn), (window.crStyle = tr);
        const sr = {
            crHead: {},
            crBmx: {},
            crMtb: {},
            crHeli: {},
            crRagdoll: {},
            crPowerups: {
              set(t, e, s) {
                e.currentScene.track.undraw(),
                  t && !s
                    ? document.head.appendChild(tr)
                    : !t && s && document.head.removeChild(tr);
              },
              initialize(t) {
                t && document.head.appendChild(tr);
              },
            },
            invisibleGrid: { default: !1 },
            disableDefocus: {
              set(t, e, s) {
                t
                  ? (s || document.head.appendChild(this.data.style),
                    e.currentScene.state.inFocus ||
                      ((e.currentScene.state.playing = !0),
                      e.currentScene.playerManager.firstPlayer._gamepad.semiUnlisten()))
                  : s && document.head.removeChild(this.data.style);
              },
              initialize(t) {
                const e = document.createElement("style");
                (e.type = "text/css"),
                  (e.innerHTML = ".gameFocusOverlay{display:none;}"),
                  (this.data.style = e),
                  t && document.head.appendChild(this.data.style);
              },
              data: { style: null },
            },
            pixelSnapEverything: {
              default: !1,
              set(e, s, i) {
                e && !i
                  ? (t.Z.prototype.toScreen = t.Z.prototype.toScreenSnapped)
                  : !e && i && (t.Z.prototype.toScreen = this.data.vecToScreen);
              },
              initialize(e) {
                (this.data.vecToScreen = t.Z.prototype.toScreen),
                  this.set(e, null, !1);
              },
              data: { vecToScreen: null },
            },
            blackHat: { default: !1 },
            invincibility: { default: !1 },
            mini: { default: !1 },
            propeller: { default: !1 },
            crouch: { default: !1 },
            accurateEraser: {},
            keepDeadRiders: {
              set(t, e, s) {
                try {
                  if (!t && s)
                    for (const t of e.currentScene.playerManager._players)
                      (t.deadVehicles = new Array(10)), (t.deadVehiclesIndex = 0);
                } catch {}
              },
            },
            fadedVehiclePowerups: {
              set(t, e, s) {
                t !== s && e.currentScene.track.undraw();
              },
            },
            invertColors: {
              default: !1,
              set(t, e, s) {
                t !== s &&
                  (t
                    ? document.head.appendChild(ir)
                    : document.head.removeChild(ir));
              },
              initialize(t) {
                this.set(t, null, !1);
              },
            },
            lineShadow: {
              default: !1,
              set(t, e) {
                e.currentScene.track.undraw();
              },
            },
            customColors: {
              default: !1,
              set(t, e, s) {
                t !== s &&
                  (e && e.currentScene.track.undraw(),
                  t
                    ? document.head.appendChild(nr)
                    : document.head.removeChild(nr));
              },
              initialize(t) {
                this.set(t, null, !1);
              },
            },
            vehicleColor: { type: "color", default: [15, 0, 185] },
            riderColor: { type: "color", default: [18, 26, 61] },
            lineColor: {
              type: "color",
              default: [61, 0, 15],
              set(t, e) {
                e.currentScene.track.undraw();
              },
            },
            sceneryColor: {
              type: "color",
              default: [190, 169, 158],
              set(t, e) {
                e.currentScene.track.undraw();
              },
            },
            backgroundColor: {
              type: "color",
              default: [255, 247, 242],
              set(t) {
                nr.innerHTML = `#game-container canvas{background-color:${Q(t)}}`;
              },
              initialize(t) {
                this.set(t);
              },
            },
          },
          ir = document.createElement("style");
        ir.innerHTML =
          "html{filter:invert(1)}";
        const nr = document.createElement("style"),
          rr = sr;
        class or {
          constructor(t, e, s) {
            (this.key = e.key),
              (this.parentArray = s),
              (this.modUi = t),
              (this.disabledBy = []),
              (this.enabledBy = []);
          }
          setHoverListeners(t) {
            (this.node.onmouseenter = () => {
              (this.modUi.settingDescription.innerHTML = t.description),
                this.modUi.settingDescription.classList.remove("invisible"),
                this.modUi.modTitle.classList.add("invisible");
            }),
              (this.node.onmouseleave = () => {
                this.modUi.settingDescription.classList.add("invisible"),
                  this.modUi.modTitle.classList.remove("invisible");
              });
          }
          disable() {}
          enable() {}
          checkStatus() {
            for (const t of this.disabledBy)
              if (this.modUi.mod.getVar(t)) return void this.disable();
            for (const t of this.enabledBy)
              if (!this.modUi.mod.getVar(t)) return void this.disable();
            this.enable();
          }
        }
        const ar =
          '<div class="mod-checkbox-container mod-menu-option mod-clickable"> <input type="checkbox" class="mod-clickable"/> <label class="mod-clickable"></label> </div>';
        let hr = document.createElement("template");
        (hr.innerHTML = ar), (hr = hr.content);
        class lr extends or {
          constructor(t, e) {
            super(t, e),
              (this.node = hr.cloneNode(!0).firstChild),
              (this.checkbox = this.node.querySelector("input")),
              (this.label = this.node.querySelector("label")),
              (this.disables = e.disables || []),
              (this.enables = e.enables || []),
              (this.effects = []),
              this.setHoverListeners(e),
              (this.label.innerHTML = e.title),
              (this.checkbox.checked = this.modUi.mod.getVar(this.key)),
              (this.clickFunction = () => {
                this.modUi.mod.setVar(this.key, !this.modUi.mod.getVar(this.key));
              });
          }
          disable() {
            (this.node.onclick = this.label.onclick = () => {}),
              this.node.classList.add("mod-disabled"),
              this.checkbox.classList.add("disabled"),
              this.label.classList.add("disabled"),
              (this.checkbox.disabled = !0);
          }
          enable() {
            (this.node.onclick = this.clickFunction),
              this.node.classList.remove("mod-disabled"),
              this.checkbox.classList.remove("disabled"),
              this.label.classList.remove("disabled"),
              (this.checkbox.disabled = !1);
          }
        }
        class cr extends or {
          constructor(t, e, s, i) {
            super(t, e, s),
              (this.node = i),
              (this.arr = []),
              (this.opened = !1),
              (this.container = null),
              this.setHoverListeners(e),
              (this.clickFunction = () => {
                this.opened ? this.close() : this.open();
              });
          }
          open() {
            for (const t of this.parentArray)
              t instanceof cr && t.opened && t.close();
            (this.opened = !0), this.node.classList.add("opened");
            const t = document.createElement("div");
            (t.className = "mod-v-seperator"),
              this.node.parentNode.parentNode.appendChild(t),
              this.node.parentNode.parentNode.appendChild(this.container);
          }
          close() {
            for (const t of this.arr) t instanceof cr && t.opened && t.close();
            (this.opened = !1),
              this.node.classList.remove("opened"),
              this.node.parentNode.parentNode.removeChild(
                this.node.parentNode.parentNode.querySelector(".mod-v-seperator")
              ),
              this.node.parentNode.parentNode.removeChild(this.container);
          }
        }
        let ur = document.createElement("template");
        (ur.innerHTML =
          '<div class="mod-checkbox-container mod-menu-option mod-clickable"> <svg width="13" height="13"> <path d="M4 11 L8 7 L4 3" stroke="black" stroke-width="2px" fill="none"/> </svg> <svg width="13" height="13" style="display:none"> <path d="M8 11 L4 7 L8 3" stroke="black" stroke-width="2px" fill="none"/> </svg> <span style="font-size:13px">Folder Name</span> </div>'),
          (ur = ur.content);
        class dr extends cr {
          constructor(t, e, s) {
            super(t, e, s, ur.cloneNode(!0).firstChild),
              (this.label = this.node.querySelector("span")),
              (this.label.innerHTML = e.title),
              ([this.expandIcon, this.collapseIcon] =
                this.node.querySelectorAll("svg")),
              (this.node.onclick = this.clickFunction);
          }
          open() {
            super.open(),
              (this.expandIcon.style.display = "none"),
              (this.collapseIcon.style.display = null);
          }
          close() {
            super.close(),
              (this.expandIcon.style.display = null),
              (this.collapseIcon.style.display = "none");
          }
        }
        let pr = document.createElement("template");
        (pr.innerHTML =
          '<div class="mod-menu-option mod-color-container mod-clickable"> <span style="width:13px;height:13px;margin-top:4px;margin-right:4px;border-radius:2px;float:left;border:1px solid #000">&nbsp;</span> <span style="font-size:13px"></span> </div>'),
          (pr = pr.content);
        const fr = class extends cr {
            constructor(t, e, s) {
              super(t, e, s, pr.cloneNode(!0).firstChild),
                ([this.colorBox, this.label] =
                  this.node.querySelectorAll("span")),
                (this.label.innerHTML = e.title),
                (this.node.onclick = this.clickFunction);
            }
            disable() {
              this.opened && this.close(),
                (this.node.onclick = this.label.onclick = () => {}),
                this.node.classList.add("mod-disabled"),
                this.label.classList.add("disabled");
            }
            enable() {
              (this.node.onclick = this.clickFunction),
                this.node.classList.remove("mod-disabled"),
                this.label.classList.remove("disabled");
            }
          },
          gr = [
            {
              type: "folder",
              title: "Nostalgia Mode",
              description:
                "Makes the game look like Canvas Rider, an older defunct version of the game.",
              folder: [
                {
                  type: "activate",
                  title: "All",
                  description: "Activates all Nostalgia Mode settings.",
                  activates: [
                    "crHead",
                    "crRagdoll",
                    "crBmx",
                    "crMtb",
                    "crHeli",
                    "crPowerups",
                  ],
                },
                {
                  title: "Head",
                  description: "Replaces the FRHD head with Canvas Rider's head.",
                  key: "crHead",
                },
                {
                  title: "Ragdoll",
                  description:
                    "Removes feet from the ragdoll, and adds transparency to the back limbs.",
                  key: "crRagdoll",
                },
                {
                  title: "BMX",
                  description:
                    "Alters the BMX to look like it did in Canvas Rider.",
                  key: "crBmx",
                },
                {
                  title: "MTB",
                  description:
                    "Alters the mountain bike to look like it did in Canvas Rider.",
                  key: "crMtb",
                },
                {
                  title: "Helicopter",
                  description:
                    "Alters the helicopter to look like it did in Free Rider 2.",
                  key: "crHeli",
                },
                {
                  title: "Powerups",
                  description:
                    "Alters the powerups to look like they did in Canvas Rider.",
                  key: "crPowerups",
                },
              ],
            },
            {
              key: "blackHat",
              title: "Hacker Mode",
              description:
                "Replaces the rider's baseball cap with a classy black top hat.",
              disables: ["crHead"],
            },
            {
              key: "lineShadow",
              title: "Line Shadows",
              description:
                "Adds shadows behind the black lines to make them stand out more.",
            },
            /*
            {
              key: "invisibleGrid",
              title: "Invisible Grid",
              description: "Hides the grid in the editor.",
            },
            */
            {
              key: "fadedVehiclePowerups",
              title: "Faded Vehicle Powerups",
              description:
                "When vehicle powerups are collected, they will become faded out, rather than disappearing completely.",
            },
            /*
            {
              key: "disableDefocus",
              title: "Disable Defocus",
              description:
                "The game will no longer lose focus if you click elsewhere on the screen.",
            },
            */
            {
              key: "pixelSnapEverything",
              title: "Pixel Snap Rider",
              description:
                "Snaps the rider's position to pixels, along with the track. This setting trades visual smoothness for visual accuracy. It may be helpful for ghosters, but it is generally not recommended.",
            },
            {
              key: "accurateEraser",
              title: "Accurate Eraser",
              description:
                "Makes the eraser correctly account for line thickness. It feels more responsive, but can make precise erases difficult or impossible.",
            },
            {
              key: "keepDeadRiders",
              title: "Keep Dead Riders",
              description:
                "When you restart, your old bike and rider will be kept on the map. To prevent lag, the maximum number of copies on the track at one time is 10.",
            },
            {
              key: "invincibility",
              title: "Invincibility",
              description:
                "Makes the rider invincible to line collisions and bombs.",
            },
            {
              key: "mini",
              title: "Mini-Bike",
              description:
                "Shrinks the frame and wheels of the bike.",
            },
            {
              key: "propeller",
              title: "Propeller",
              description:
                "Adds a propeller to the bike, press 'x' to fly.",
            },
            {
              key: "crouch",
              title: "Crouch",
              description:
                "Press 'x' to crouch.",
            },
            {
              type: "folder",
              title: "Colors",
              description: "Change some of the colors of the game.",
              folder: [
                {
                  key: "invertColors",
                  title: "Invert Colors",
                  description:
                    "Inverts the colors of the entire game as a post-processing effect. This includes everything, including powerups and the menu.",
                },
                {
                  key: "customColors",
                  title: "Custom Colors",
                  description:
                    "Enables custom colors. With this option disabled, all colors will be the default colors. (This does not apply to inverted colors)",
                  enables: [
                    "vehicleColor",
                    "riderColor",
                    "lineColor",
                    "sceneryColor",
                    "backgroundColor",
                  ],
                },
                {
                  type: "color",
                  key: "vehicleColor",
                  title: "Vehicle Color",
                  description: "The primary color of the vehicles",
                },
                {
                  type: "color",
                  key: "riderColor",
                  title: "Rider Color",
                  description: "The color of the rider",
                },
                {
                  type: "color",
                  key: "lineColor",
                  title: "Line Color",
                  description: "The color of the physical lines",
                },
                {
                  type: "color",
                  key: "sceneryColor",
                  title: "Scenery Line Color",
                  description: "The color of the scenery lines",
                },
                {
                  type: "color",
                  key: "backgroundColor",
                  title: "Background Color",
                  description: "The color of the background",
                },
              ],
            },
          ];
        let mr = document.createElement("template");
        (mr.innerHTML =
          '<div class="color-picker-container"> <div class="graphic-container"> <div class="shade-picker-container"> <canvas class="shade-canvas"></canvas> <div class="shade-indicator"></div> </div> <div class="hue-picker-container"> <canvas class="hue-canvas" width="20"></canvas> <div class="hue-indicator"></div> </div> </div> <div class="textbox-container"> <input type="text" class="color-box red-box"/> <input type="text" class="color-box green-box"/> <input type="text" class="color-box blue-box"/> </div> </div>'),
          (mr = mr.content);
        class vr extends or {
          constructor(t, e) {
            super(t, e),
              (this.colorBox = e.colorBox),
              (this.size = 200),
              (this.node = mr.cloneNode(!0).firstChild),
              (this.color = [255, 255, 255]),
              (this.baseColor = [255, 0, 0]),
              (this.saturation = 0),
              (this.darkness = 0),
              (this.hue = 0),
              (this.shadeCanvas = this.node.querySelector(".shade-canvas")),
              (this.shadeCanvas.width = this.size),
              (this.shadeCanvas.height = this.size),
              (this.shadeCtx = this.shadeCanvas.getContext("2d")),
              (this.shadeIndicator = this.node.querySelector(".shade-indicator"));
            const s = (t) => {
              const e = this.shadeCanvas.getBoundingClientRect(),
                s = Math.min(this.size, Math.max(0, t.clientX - e.left)),
                i = Math.min(this.size, Math.max(0, t.clientY - e.top));
              (this.saturation = s / this.size),
                (this.darkness = i / this.size),
                (this.color = this.getColor()),
                this.updateShadePickerAppearance(),
                this.updateBoxes(),
                this.updateModVar(),
                this.updateColorBox();
            };
            this.shadeCanvas.addEventListener("mousedown", (t) => {
              s(t),
                document.addEventListener("mousemove", s),
                document.addEventListener("mouseup", () => {
                  document.removeEventListener("mousemove", s);
                });
            }),
              (this.hueCanvas = this.node.querySelector(".hue-canvas")),
              (this.hueCanvas.height = this.size),
              (this.hueCtx = this.hueCanvas.getContext("2d")),
              (this.hueIndicator = this.node.querySelector(".hue-indicator"));
            const i = (t) => {
              const e = this.hueCanvas.getBoundingClientRect(),
                s = Math.max(0, Math.min(this.size, t.clientY - e.top));
              (this.hue = s / this.size),
                (this.baseColor = J(this.hue)),
                (this.color = this.getColor()),
                this.updateHuePickerAppearance(),
                this.updateShadePickerAppearance(!0),
                this.updateBoxes(),
                this.updateModVar(),
                this.updateColorBox();
            };
            this.hueCanvas.addEventListener("mousedown", (t) => {
              i(t),
                document.addEventListener("mousemove", i),
                document.addEventListener("mouseup", () => {
                  document.removeEventListener("mousemove", i);
                });
            }),
              (this.boxes = {
                red: this.node.querySelector(".red-box"),
                green: this.node.querySelector(".green-box"),
                blue: this.node.querySelector(".blue-box"),
              });
            const n = (t) => {
              (t.target.value = Math.max(
                0,
                Math.min(255, parseInt(t.target.value) || 0)
              )),
                this.setRgb([
                  this.boxes.red.value,
                  this.boxes.green.value,
                  this.boxes.blue.value,
                ]),
                this.updateModVar();
            };
            for (const t in this.boxes)
              this.boxes[t].addEventListener("input", n);
            this.createHueGradient(), this.setRgb(t.mod.getVar(this.key));
          }
          setRgb(t) {
            this.color = t.slice();
            const [e, s, i] = (function (t, e, s) {
              (t /= 255), (e /= 255), (s /= 255);
              var i,
                n,
                r = Math.max(t, e, s),
                o = Math.min(t, e, s),
                a = r,
                h = r - o;
              if (((n = 0 == r ? 0 : h / r), r == o)) i = 0;
              else {
                switch (r) {
                  case t:
                    i = (e - s) / h + (e < s ? 6 : 0);
                    break;
                  case e:
                    i = (s - t) / h + 2;
                    break;
                  case s:
                    i = (t - e) / h + 4;
                }
                i /= 6;
              }
              return [i, n, a];
            })(...this.color);
            (this.hue = e),
              (this.saturation = s),
              (this.darkness = 1 - i),
              (this.baseColor = J(this.hue)),
              this.updateHuePickerAppearance(),
              this.updateShadePickerAppearance(!0),
              this.updateBoxes(),
              this.updateColorBox();
          }
          updateShadePickerAppearance(t = !1) {
            if (
              ((this.shadeIndicator.style.left =
                this.saturation * this.size - 5 + "px"),
              (this.shadeIndicator.style.top =
                this.darkness * this.size - 5 + "px"),
              (this.shadeIndicator.style.backgroundColor = Q(this.color)),
              t)
            ) {
              let t = this.shadeCtx.createLinearGradient(0, 0, this.size, 0);
              t.addColorStop(0, "white"),
                t.addColorStop(1, Q(this.baseColor)),
                (this.shadeCtx.fillStyle = t),
                this.shadeCtx.fillRect(0, 0, this.size, this.size),
                (t = this.shadeCtx.createLinearGradient(0, 0, 0, this.size)),
                t.addColorStop(0, "transparent"),
                t.addColorStop(1, "black"),
                (this.shadeCtx.fillStyle = t),
                this.shadeCtx.fillRect(0, 0, this.size, this.size);
            }
          }
          updateHuePickerAppearance() {
            (this.hueIndicator.style.top = this.hue * this.size - 4 + "px"),
              (this.hueIndicator.style.backgroundColor = Q(this.baseColor));
          }
          getColor() {
            const t = this.baseColor.slice();
            for (let e = 0; e < t.length; e++)
              (t[e] = t[e] * this.saturation + 255 * (1 - this.saturation)),
                (t[e] = t[e] * (1 - this.darkness)),
                (t[e] = Math.round(t[e]));
            return t;
          }
          createHueGradient() {
            const t = this.hueCtx.createLinearGradient(0, 0, 0, this.size);
            for (let e = 0; e <= 6; e++)
              t.addColorStop(e / 6, `hsl(${(e / 6) * 360}, 100%, 50%)`);
            (this.hueCtx.fillStyle = t),
              this.hueCtx.fillRect(0, 0, this.hueCanvas.width, this.size);
          }
          updateBoxes() {
            (this.boxes.red.value = this.color[0]),
              (this.boxes.green.value = this.color[1]),
              (this.boxes.blue.value = this.color[2]);
          }
          updateModVar() {
            this.modUi.mod.setVar(this.key, this.color);
          }
          updateColorBox() {
            this.colorBox.style.backgroundColor = Q(this.color);
          }
        }
        s(588);
        let yr = document.createElement("template");
        (yr.innerHTML = ar), (yr = yr.content);
        class wr extends or {
          constructor(t, e) {
            super(t, e),
              (this.node = yr.cloneNode(!0).firstChild),
              (this.checkbox = this.node.querySelector("input")),
              (this.label = this.node.querySelector("label")),
              (this.activates = e.activates),
              this.setHoverListeners(e),
              (this.label.innerHTML = e.title),
              (this.clickFunction = () => {
                let t = !1;
                for (const e of this.activates)
                  if (!this.modUi.mod.getVar(e)) {
                    t = !0;
                    break;
                  }
                for (const e of this.activates) this.modUi.mod.setVar(e, t);
              }),
              this.enable();
          }
          disable() {
            (this.node.onclick = this.label.onclick = () => {}),
              this.node.classList.add("mod-disabled"),
              this.checkbox.classList.add("disabled"),
              this.label.classList.add("disabled"),
              (this.checkbox.disabled = !0);
          }
          enable() {
            (this.node.onclick = this.clickFunction),
              this.node.classList.remove("mod-disabled"),
              this.checkbox.classList.remove("disabled"),
              this.label.classList.remove("disabled"),
              (this.checkbox.disabled = !1);
          }
          checkStatus() {
            super.checkStatus();
            let t = 0;
            for (const e of this.activates) this.modUi.mod.getVar(e) && t++;
            t === this.activates.length
              ? ((this.checkbox.indeterminate = !1), (this.checkbox.checked = !0))
              : 0 !== t
              ? (this.checkbox.indeterminate = !0)
              : ((this.checkbox.indeterminate = !1),
                (this.checkbox.checked = !1));
          }
        }
        let xr = document.createElement("template");
        (xr.innerHTML =
          '<div class="mod-menu-container"> <div style="display:grid;grid-template-columns:auto auto auto"> <div class="mod-menu"> </div> <div class="mod-v-seperator"></div> <div class="mod-description-container"> <div class="mod-setting-description invisible"></div> <div class="mod-title" onclick=\'window.open("https://community.freeriderhd.com/threads/polygons-mod.11712/")\'> <div style="flex:1"></div> <div> <p style="font-family:monospace;font-size:14pt">Polygon\'s Mod<br>+<br>other mods</p></div> <div style="flex:1"></div> </div> </div> </div> </div> '),
          (xr = xr.content);
        const br = {
          bool: (t, e, s, i) => new lr(t, s[e], i),
          folder: (t, e, s, i) => new dr(t, s[e], i),
          color: (t, e, s, i) => new fr(t, s[e], i),
          activate: (t, e, s, i) => new wr(t, s[e], i),
        };
        let _r = document.createElement("template");
        (_r.innerHTML =
          '<div class="mod-update-notification"> Polygon\'s Mod has been updated! Click here for more info. &nbsp;&nbsp;&nbsp; <button class="mod-dismiss-button">Close</button> </div>'),
          (_r = _r.content);
        const Tr = new (class {
          constructor(t) {
            (this.game = t),
              (this.vars = {}),
              (this.meta = {}),
              this.loadDefaults(!1),
              this.loadFromLocalStorage(),
              this.clean(),
              this.checkUpdate(),
              this.saveToLocalStorage(),
              (this.ui = new (class {
                constructor(t) {
                  (this.mod = t),
                    (this.arr = []),
                    (this.obj = {}),
                    this.init(gr, this.arr),
                    this.checkAll(this.arr),
                    this.createElement(),
                    document.head.appendChild(er);
                    document.body.appendChild(this.icon);
                }
                init(t, e) {
                  for (let s = 0; s < t.length; s++) {
                    const i = t[s],
                      n = i.key || null,
                      r = i.type || "bool",
                      o = br[r](this, s, t, e);
                    e.push(o),
                      (this.obj[n] = o),
                      "folder" === r && this.init(i.folder, e[s].arr);
                  }
                  for (const t of e)
                    if (t instanceof lr) {
                      for (const e of t.disables)
                        this.obj[e].disabledBy.push(t.key);
                      for (const e of t.enables)
                        this.obj[e].enabledBy.push(t.key);
                    } else if (t instanceof wr)
                      for (const e of t.activates) this.obj[e].effects.push(t);
                }
                checkAll(t) {
                  for (const e of t)
                    "function" == typeof e.checkStatus && e.checkStatus(),
                      e instanceof dr && this.checkAll(e.arr);
                }
                createElement() {
                  (this.container = xr.cloneNode(!0).firstChild),
                    (this.settingList = this.createOptionList(
                      this.arr,
                      "Mod Settings"
                    )),
                    this.container
                      .querySelector(".mod-menu")
                      .replaceWith(this.settingList),
                    (this.settingDescription = this.container.querySelector(
                      ".mod-setting-description"
                    )),
                    (this.modTitle = this.container.querySelector(".mod-title")),
                    (this.verticalBar =
                      this.container.querySelector(".mod-v-seperator")),
                    (this.icon = document.createElement("div")),
                    (this.icon.className = "mod-icon"),
                    (this.icon.onclick = () => {
                      const t = (e) => {
                        if (!this.container.contains(e.target)) {
                          document.removeEventListener("mousedown", t),
                            document.removeEventListener("pointerdown", t),
                            document.body.removeChild(this.container);
                          for (const t of this.arr)
                            t instanceof dr && t.opened && t.close();
                        }
                      };
                      document.body.appendChild(this.container),
                        setTimeout(
                          () => document.addEventListener("mousedown", t),
                          0
                        ),
                        setTimeout(
                          () => document.addEventListener("pointerdown", t),
                          0
                        );
                    });
                }
                
                createOptionList(t, e) {
                  const s = document.createElement("div");
                  s.className = "mod-list-container";
                  const i = document.createElement("div");
                  if (((i.className = "mod-menu"), e)) {
                    const t = document.createElement("div");
                    (t.className = "mod-section-title"),
                      (t.innerHTML = e),
                      i.appendChild(t);
                  }
                  s.appendChild(i);
                  for (const e of t)
                    if ((i.appendChild(e.node), e instanceof fr)) {
                      const t = new vr(this, e);
                      e.container = t.node;
                    } else
                      e instanceof dr &&
                        (e.container = this.createOptionList(
                          e.arr,
                          e.label.innerHTML
                        ));
                  return s;
                }
                update(t, e) {
                  if (this.obj[t] instanceof lr) {
                    this.obj[t].checkbox.checked = e;
                    for (const e of this.obj[t].disables)
                      this.obj[e].checkStatus();
                    for (const e of this.obj[t].enables)
                      this.obj[e].checkStatus();
                    for (const e of this.obj[t].effects) e.checkStatus();
                  }
                }
              })(this));
            for (const t in this.vars)
              rr[t].hasOwnProperty("initialize") &&
                rr[t].initialize(this.vars[t]);
          }
          setVar(t, e) {
            if (rr.hasOwnProperty(t)) {
              const s = this.vars[t],
                i = rr[t];
              switch (i.hasOwnProperty("type") ? i.type : "bool") {
                case "bool":
                  this.vars[t] = !!e;
                  break;
                case "int": {
                  const s = i.max || 1 / 0,
                    n = i.min || -1 / 0;
                  isNaN(e) && (e = 0),
                    (this.vars[t] = Math.max(n, Math.min(s, Math.round(e))));
                  break;
                }
                case "color":
                  this.vars[t] = e;
              }
              if (i.hasOwnProperty("set"))
                try {
                  i.set(this.vars[t], this.game, s);
                } catch (t) {
                  console.error(t);
                }
              this.ui.update(t, this.vars[t]), this.saveToLocalStorage();
            } else console.error('No mod variable found called "' + t + '".');
          }
          getVar(t) {
            if (rr.hasOwnProperty(t)) return this.vars[t];
            console.error('No mod variable found called "' + t + '".');
          }
          loadFromLocalStorage() {
            const t = localStorage.getItem("polygonsMod");
            if (t) {
              const e = JSON.parse(t);
              for (const t in e.vars) this.vars[t] = e.vars[t];
              for (const t in e.meta) this.meta[t] = e.meta[t];
            }
          }
          saveToLocalStorage() {
            const t = JSON.stringify({ vars: this.vars, meta: this.meta });
            localStorage.setItem("polygonsMod", t);
          }
          clean() {
            for (const t in this.vars)
              rr.hasOwnProperty(t) || delete this.vars[t];
          }
          loadDefaults(t = !0, e = null) {
            for (const s in rr) {
              const i = rr[s];
              if (rr[s].hasOwnProperty("default")) this.vars[s] = i.default;
              else
                switch (i.hasOwnProperty("type") ? i.type : "bool") {
                  case "bool":
                    this.vars[s] = !0;
                    break;
                  case "int": {
                    const t = i.hasOwnProperty("max"),
                      e = i.hasOwnProperty("max");
                    this.vars[s] =
                      t && e
                        ? (rr[s].max + i.min) / 2
                        : t
                        ? Math.min(0, i.max)
                        : e
                        ? Math.max(0, i.min)
                        : 0;
                    break;
                  }
                  case "color":
                    this.vars[s] = [0, 0, 0];
                    break;
                  default:
                    console.log("I haven't done this part yet lol");
                }
              t && rr[s].hasOwnProperty("set") && rr[s].set(e, this.vars[s]);
            }
          }
          listVars() {
            let t = 0;
            for (const e in this.vars) t = Math.max(t, e.length);
            for (const e in this.vars) {
              let s = "";
              for (let i = e.length; i < t; i++) s += " ";
              console.log(e + s, this.vars[e]);
            }
          }
          checkUpdate() {
            this.meta.hasOwnProperty("version") &&
              2 !== this.meta.version &&
              (function (t) {
                const e = _r.cloneNode(!0).firstChild,
                  s = e.querySelector("button");
                (e.onclick = () =>
                  window.open("https://community.freeriderhd.com/posts/285222")),
                  (s.onclick = () => {
                    (e.onclick = () => {}), document.body.removeChild(e);
                  }),
                  document.body.appendChild(e);
              })(),
              (this.meta.version = 2);
          }
        })(null);
        class Cr {
          constructor(t, e, s) {
            (this.mod = Tr),
              (Tr.game = this),
              (this.assets = e),
              (this.settings = s),
              this.initCanvas(),
              this.initStage(),
              this.setSize(),
              this.switchScene(t),
              this.setSize(),
              this.startTicker();
          }
          initCanvas() {
            const t = document.createElement("canvas"),
              e = document.getElementById(this.settings.defaultContainerID);
            e.appendChild(t),
              (this.gameContainer = e),
              (this.canvas = t),
              (Sr = () => {
                this.command("focused", !0);
              }),
              t.addEventListener("mousedown", Sr);
          }
          initStage() {
            const t = new createjs.Stage(this.canvas);
            (t.autoClear = !1),
              createjs.Touch.enable(t),
              t.enableMouseOver(30),
              (t.mouseMoveOutside = !0),
              (t.preventSelection = !1),
              (this.stage = t);
          }
          setSize() {
            let t = window.innerHeight,
              e = window.innerWidth;
            if (!this.settings.fullscreen && !this.settings.isStandalone) {
              const s = this.gameContainer;
              (t = s.clientHeight), (e = s.clientWidth);
            }
            this.currentScene &&
              (t -= this.currentScene.getCanvasOffset().height);
            let s = window.devicePixelRatio || 1;
            this.settings.lowQualityMode && (s = 1);
            const i = e * s,
              n = t * s;
            (i === this.width && n === this.height) ||
              ((this.width = i),
              (this.height = n),
              (this.canvas.width = i),
              (this.canvas.height = n)),
              (this.pixelRatio = s),
              (this.canvas.style.width = e + "px"),
              (this.canvas.style.height = t + "px"),
              this.currentScene && this.currentScene.command("resize");
          }
          startTicker() {
            (createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED),
              createjs.Ticker.setFPS(this.settings.drawFPS),
              createjs.Ticker.on("tick", this.update.bind(this));
          }
          update() {
            this.currentScene.update(), this.tickCount++;
          }
          switchScene(t) {
            null !== this.currentScene && this.currentScene.close(),
              (this.currentScene = new kr[t](this));
          }
          command() {
            this.currentScene.command.apply(this.currentScene, arguments);
          }
          close() {
            createjs.Ticker.reset(),
              createjs.Ticker.removeAllEventListeners(),
              this.currentScene.close(),
              (this.currentScene = null),
              (this.assets = null),
              (this.settings = null),
              (this.stage.autoClear = !0),
              this.stage.removeAllChildren(),
              this.stage.update(),
              this.stage.enableDOMEvents(!1),
              this.stage.removeAllEventListeners(),
              (this.stage = null),
              this.canvas.removeEventListener("mousedown", Sr),
              this.canvas.parentNode.removeChild(this.canvas),
              (this.canvas = null),
              (this.tickCount = null),
              (this.height = null),
              (this.width = null);
          }
        }
        const kr = { Editor: In, Main: Un };
        let Sr = () => {};
        const Ar = Cr.prototype;
        (Ar.gameContainer = null),
          (Ar.tickCount = 0),
          (Ar.currentScene = null),
          (Ar.assets = null),
          (Ar.stage = null),
          (Ar.canvas = null),
          (Ar.stats = null),
          (Ar.width = 0),
          (Ar.height = 0),
          (Ar.fullscreen = !1),
          (Ar.onStateChange = null),
          (window.Game = Cr);
      })();
  })();
  //# sourceMappingURL=game.js.map
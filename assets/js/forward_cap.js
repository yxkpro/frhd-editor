!(function () {
  "use strict";
  function e(e) {
    (this.drawAngle = 0), (this.colors = e), this.createVersion();
  }
  var r = GameInventoryManager.HeadClass,
    t = Math.max,
    o = {},
    i = 0,
    n = 0,
    a = (e.prototype = new r());
  (a.versionName = ""),
    (a.dirty = !0),
    (a.getVersions = function () {
      return o;
    }),
    (a.cache = function (e) {
      var r = o[this.versionName];
      r.dirty = !1;
      var a = 115 * (e = t(e, 1)) * 0.17,
        s = 112 * e * 0.17,
        u = r.canvas;
      (u.width = a), (u.height = s), (i = u.width / 2), (n = u.height / 2);
      var v = u.getContext("2d"),
        l = 0.17 * e,
        f = this.colors;
      v.save(),
        v.scale(l, l),
        v.translate(0, 0),
        v.beginPath(),
        (v.strokeStyle = "rgba(0,0,0,0)"),
        (v.lineCap = "butt"),
        (v.lineJoin = "miter"),
        (v.miterLimit = 4),
        v.save(),
        (v.fillStyle = "#ffffff"),
        v.beginPath(),
        v.arc(42.4, 52.5, 30.3, 0, 6.283185307179586, !0),
        v.closePath(),
        v.fill(),
        v.stroke(),
        v.restore(),
        v.save(),
        (v.fillStyle = f.back),
        v.beginPath(),
        v.moveTo(71.624, 44.496),
        v.bezierCurveTo(68.112, 31.647, 56.363, 22.2, 42.4, 22.2),
        v.bezierCurveTo(
          25.665999999999997,
          22.2,
          12.099999999999998,
          35.765,
          12.099999999999998,
          52.5
        ),
        v.bezierCurveTo(
          12.099999999999998,
          55.771,
          12.623999999999999,
          58.916,
          13.582999999999998,
          61.867000000000004
        ),
        v.lineTo(71.624, 44.496),
        v.closePath(),
        v.fill(),
        v.stroke(),
        v.restore(),
        f.front &&
          (v.save(),
          v.beginPath(),
          v.moveTo(76.917, 38.393),
          v.bezierCurveTo(
            71.677,
            25.617,
            59.54900000000001,
            16.371000000000002,
            45.172,
            15.309000000000001
          ),
          v.bezierCurveTo(
            47.57899999999999,
            22.559,
            50.918,
            33.862,
            52.501,
            44.894999999999996
          ),
          v.bezierCurveTo(60.643, 42.731, 68.775, 40.566, 76.917, 38.393),
          v.closePath(),
          (v.fillStyle = f.front),
          v.fill(),
          v.stroke(),
          v.restore()),
        v.save(),
        v.beginPath(),
        v.moveTo(42.4, 22.2),
        v.bezierCurveTo(59.134, 22.2, 72.7, 35.765, 72.7, 52.5),
        v.bezierCurveTo(72.7, 69.235, 59.135, 82.8, 42.4, 82.8),
        v.bezierCurveTo(25.665, 82.8, 12.1, 69.234, 12.1, 52.5),
        v.bezierCurveTo(12.1, 35.766000000000005, 25.666, 22.2, 42.4, 22.2),
        v.moveTo(42.4, 15.2),
        v.bezierCurveTo(
          21.833,
          15.2,
          5.100000000000001,
          31.932,
          5.100000000000001,
          52.5
        ),
        v.bezierCurveTo(5.100000000000001, 73.068, 21.832, 89.8, 42.4, 89.8),
        v.bezierCurveTo(
          62.967999999999996,
          89.8,
          79.69999999999999,
          73.068,
          79.69999999999999,
          52.5
        ),
        v.bezierCurveTo(
          79.69999999999999,
          31.932000000000002,
          62.968,
          15.2,
          42.4,
          15.2
        ),
        v.lineTo(42.4, 15.2),
        v.closePath(),
        v.fill(),
        v.stroke(),
        v.restore(),
        v.save(),
        v.beginPath(),
        v.moveTo(16.3, 66.85),
        v.bezierCurveTo(
          41.8,
          60.148999999999994,
          67.2,
          53.449999999999996,
          92.601,
          46.648999999999994
        ),
        v.bezierCurveTo(
          96.201,
          45.648999999999994,
          99.8,
          44.748999999999995,
          103.5,
          43.748999999999995
        ),
        v.bezierCurveTo(
          111,
          41.748999999999995,
          107.8,
          30.148999999999994,
          100.3,
          32.148999999999994
        ),
        v.bezierCurveTo(
          74.901,
          38.94899999999999,
          49.400999999999996,
          45.748999999999995,
          24,
          52.449
        ),
        v.bezierCurveTo(20.4, 53.449, 16.8, 54.349, 13.101, 55.349),
        v.bezierCurveTo(5.7, 57.35, 8.9, 68.85, 16.3, 66.85),
        v.lineTo(16.3, 66.85),
        v.closePath(),
        v.fill(),
        v.stroke(),
        v.restore();
    }),
    (a.setDirty = function () {
      o[this.versionName].dirty = !0;
    }),
    (a.getBaseWidth = function () {
      return 115;
    }),
    (a.getBaseHeight = function () {
      return 112;
    }),
    (a.getDrawOffsetX = function () {
      return 2.2;
    }),
    (a.getDrawOffsetY = function () {
      return 1;
    }),
    (a.getScale = function () {
      return 0.17;
    }),
    GameInventoryManager && GameInventoryManager.register("forward_cap", e),
    "undefined" != typeof exports &&
      ("undefined" != typeof module &&
        module.exports &&
        (exports = module.exports = e),
      (exports.Forward_Cap = e));
})();

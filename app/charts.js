/* Indonesia in Numbers — charts.js
   Hand-rolled SVG charts. No library, no network, no randomness: every chart
   is a pure function of the data in data.js. All charts use a viewBox and
   width 100% so they scale to any viewport. Colours: one accent red
   (#C8102E) for the story point, neutral greys for everything else. */
var CH = (function () {
  var RED = '#C8102E';
  var INK = '#111110';
  var MUTED = '#6B6B66';
  var GRID = '#E5E5E0';
  var GREY = '#C9C9C2';
  var GREY_DARK = '#8A8A83';
  var FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function fmt(v, dec) {
    if (dec === undefined || dec === null) dec = 1;
    var n = Number(v);
    if (dec === 0) return n.toLocaleString('en-US');
    return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function niceCeil(v) {
    if (v <= 0) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(v)));
    var n = v / p;
    var c = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return c * p;
  }
  function niceFloor(v) {
    if (v >= 0) return 0;
    var p = Math.pow(10, Math.floor(Math.log10(-v)));
    var n = -v / p;
    var c = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return -c * p;
  }

  /* Line chart with labelled axes, gridlines and direct value labels. */
  function lineChart(o) {
    var W = 720, H = 300, L = 56, R = 18, T = 26, B = 30;
    var labels = o.labels, values = o.values;
    var dec = o.decimals === undefined ? 1 : o.decimals;
    var lo = o.ymin !== undefined ? o.ymin : Math.min(0, niceFloor(Math.min.apply(null, values)));
    var hi = o.ymax !== undefined ? o.ymax : niceCeil(Math.max.apply(null, values) * 1.05);
    if (hi <= lo) hi = lo + 1;
    var iw = W - L - R, ih = H - T - B;
    function X(i) { return L + (iw * i) / (labels.length - 1); }
    function Y(v) { return T + ih - ((v - lo) / (hi - lo)) * ih; }
    var s = '';
    s += '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || o.title || 'Line chart') + '">';
    var ticks = 4, t;
    for (t = 0; t <= ticks; t++) {
      var tv = lo + ((hi - lo) * t) / ticks;
      var ty = Y(tv);
      s += '<line x1="' + L + '" y1="' + ty.toFixed(1) + '" x2="' + (W - R) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
      s += '<text x="' + (L - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv, dec) + '</text>';
    }
    var i;
    var step = labels.length > 8 ? 2 : 1;
    for (i = 0; i < labels.length; i++) {
      if (i % step === 0 || i === labels.length - 1) {
        s += '<text x="' + X(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + esc(labels[i]) + '</text>';
      }
    }
    var pts = [];
    for (i = 0; i < values.length; i++) pts.push(X(i).toFixed(1) + ',' + Y(values[i]).toFixed(1));
    s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + (o.color || RED) + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
    var labelIdx = {};
    labelIdx[0] = 1; labelIdx[values.length - 1] = 1;
    if (o.annotate) o.annotate.forEach(function (a) { labelIdx[a.index] = 1; });
    for (i = 0; i < values.length; i++) {
      var isAnn = o.annotate && o.annotate.some(function (a) { return a.index === i; });
      s += '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(values[i]).toFixed(1) + '" r="' + (isAnn ? 4.5 : 3) + '" fill="' + (isAnn ? RED : '#FFFFFF') + '" stroke="' + (o.color || RED) + '" stroke-width="2"/>';
      if (labelIdx[i]) {
        var ly = Y(values[i]) - 10;
        var anchor = 'middle';
        var lx = X(i);
        if (i === 0) { anchor = 'start'; lx = X(i) + 4; }
        if (i === values.length - 1) { anchor = 'end'; lx = X(i) - 4; }
        s += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="' + anchor + '" font-size="12" font-weight="700" fill="' + INK + '" font-family="' + FONT + '">' + fmt(values[i], dec) + (o.unitSuffix || '') + '</text>';
      }
    }
    if (o.annotate) o.annotate.forEach(function (a) {
      var ax = X(a.index), ay = Y(values[a.index]);
      var ty2 = ay + 26;
      var aAnchor = 'middle';
      if (a.index === 0) { aAnchor = 'start'; ax = X(a.index) + 4; }
      if (a.index === labels.length - 1) { aAnchor = 'end'; ax = X(a.index) - 4; }
      s += '<text x="' + ax.toFixed(1) + '" y="' + ty2.toFixed(1) + '" text-anchor="' + aAnchor + '" font-size="11.5" font-weight="700" fill="' + RED + '" font-family="' + FONT + '">' + esc(a.text) + '</text>';
    });
    s += '</svg>';
    return s;
  }

  /* Vertical bar chart. Bars start at zero. One bar may be highlighted red. */
  function barChart(o) {
    var W = 720, H = 300, L = 56, R = 14, T = 30, B = 30;
    var labels = o.labels, values = o.values;
    var dec = o.decimals === undefined ? 1 : o.decimals;
    var min = Math.min.apply(null, values.concat([0]));
    var max = Math.max.apply(null, values);
    var lo = min < 0 ? niceFloor(min * 1.05) : 0;
    var hi = niceCeil(max * 1.08);
    if (hi <= lo) hi = lo + 1;
    var iw = W - L - R, ih = H - T - B;
    var n = values.length;
    var slot = iw / n, bw = Math.min(44, slot * 0.62);
    function Y(v) { return T + ih - ((v - lo) / (hi - lo)) * ih; }
    var s = '';
    s += '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || o.title || 'Bar chart') + '">';
    var ticks = 4, t;
    for (t = 0; t <= ticks; t++) {
      var tv = lo + ((hi - lo) * t) / ticks;
      var ty = Y(tv);
      s += '<line x1="' + L + '" y1="' + ty.toFixed(1) + '" x2="' + (W - R) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
      s += '<text x="' + (L - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv, dec) + '</text>';
    }
    s += '<line x1="' + L + '" y1="' + Y(0).toFixed(1) + '" x2="' + (W - R) + '" y2="' + Y(0).toFixed(1) + '" stroke="' + GREY_DARK + '" stroke-width="1.2"/>';
    var i;
    for (i = 0; i < n; i++) {
      var cx = L + slot * i + slot / 2;
      var y0 = Y(0), y1 = Y(values[i]);
      var top = Math.min(y0, y1), hgt = Math.abs(y1 - y0);
      var hl = o.highlightIndex === i;
      var fill = hl ? RED : GREY;
      s += '<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(hgt, 1).toFixed(1) + '" rx="3" fill="' + fill + '"/>';
      var ly = values[i] >= 0 ? top - 7 : top + hgt + 14;
      s += '<text x="' + cx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" font-size="11.5" font-weight="' + (hl ? 700 : 400) + '" fill="' + (hl ? RED : MUTED) + '" font-family="' + FONT + '">' + fmt(values[i], dec) + '</text>';
      s += '<text x="' + cx.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + esc(labels[i]) + '</text>';
    }
    if (o.annotate) o.annotate.forEach(function (a) {
      var cx2 = L + slot * a.index + slot / 2;
      s += '<text x="' + cx2.toFixed(1) + '" y="' + (T - 8) + '" text-anchor="middle" font-size="11.5" font-weight="700" fill="' + RED + '" font-family="' + FONT + '">' + esc(a.text) + '</text>';
    });
    s += '</svg>';
    return s;
  }

  /* Horizontal bars with the value at the end of each bar. */
  function hbarChart(o) {
    var rows = o.rows;
    var dec = o.decimals === undefined ? 1 : o.decimals;
    var rowH = o.rowHeight || 44;
    var W = 720, H = rowH * rows.length + 16;
    var L = o.labelWidth || 190, R = 90, T = 8;
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }));
    var hi = niceCeil(max * 1.08);
    var iw = W - L - R;
    var s = '';
    s += '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || o.title || 'Horizontal bar chart') + '">';
    rows.forEach(function (r, i) {
      var y = T + i * rowH + rowH / 2;
      var bw = (r.value / hi) * iw;
      s += '<text x="' + (L - 10) + '" y="' + (y + 4) + '" text-anchor="end" font-size="13" fill="' + INK + '" font-family="' + FONT + '">' + esc(r.name) + '</text>';
      s += '<rect x="' + L + '" y="' + (y - 11) + '" width="' + Math.max(bw, 2).toFixed(1) + '" height="22" rx="4" fill="' + (r.highlight ? RED : GREY) + '"/>';
      s += '<text x="' + (L + bw + 8).toFixed(1) + '" y="' + (y + 4) + '" font-size="13" font-weight="700" fill="' + INK + '" font-family="' + FONT + '">' + fmt(r.value, dec) + (o.unitSuffix || '') + (r.extra ? '  ' + esc(r.extra) : '') + '</text>';
    });
    s += '</svg>';
    return s;
  }

  /* Donut chart drawn with arc paths, plus a legend list. */
  function donutChart(o) {
    var segs = o.segments;
    var size = 260, cx = size / 2, cy = size / 2, r = 96, rIn = 62;
    var total = 0;
    segs.forEach(function (sg) { total += sg.value; });
    var palette = [RED, '#3D3D3A', '#8A8A83', '#C9C9C2', '#E5E5E0', '#6B6B66'];
    var s = '';
    s += '<div class="donut-wrap">';
    s += '<svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="' + esc(o.aria || o.title || 'Donut chart') + '" class="donut-svg">';
    var a0 = -Math.PI / 2;
    segs.forEach(function (sg, i) {
      var frac = sg.value / total;
      var a1 = a0 + frac * Math.PI * 2;
      var large = frac > 0.5 ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var x2 = cx + rIn * Math.cos(a1), y2 = cy + rIn * Math.sin(a1);
      var x3 = cx + rIn * Math.cos(a0), y3 = cy + rIn * Math.sin(a0);
      var col = sg.color || palette[i % palette.length];
      s += '<path d="M ' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) +
        ' L ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + ' A ' + rIn + ' ' + rIn + ' 0 ' + large + ' 0 ' + x3.toFixed(1) + ' ' + y3.toFixed(1) + ' Z" fill="' + col + '" stroke="#FAFAF9" stroke-width="2"/>';
      a0 = a1;
    });
    if (o.centerTop) s += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="20" font-weight="700" fill="' + INK + '" font-family="' + FONT + '">' + esc(o.centerTop) + '</text>';
    if (o.centerBottom) s += '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + esc(o.centerBottom) + '</text>';
    s += '</svg>';
    s += '<ul class="legend">';
    segs.forEach(function (sg, i) {
      var col = sg.color || palette[i % palette.length];
      s += '<li><span class="chip" style="background:' + col + '"></span><span class="leg-name">' + esc(sg.name) + '</span><span class="leg-val">' + fmt(sg.value, sg.decimals === undefined ? 1 : sg.decimals) + (o.unitSuffix || '') + '</span></li>';
    });
    s += '</ul></div>';
    return s;
  }

  /* Grouped vertical bars: two series across a few categories. */
  function groupedBars(o) {
    var cats = o.categories, s1 = o.series1, s2 = o.series2;
    var W = 720, H = 300, L = 56, R = 14, T = 30, B = 30;
    var dec = o.decimals === undefined ? 1 : o.decimals;
    var max = Math.max.apply(null, s1.values.concat(s2.values));
    var hi = niceCeil(max * 1.08);
    var iw = W - L - R, ih = H - T - B;
    var n = cats.length, slot = iw / n, bw = Math.min(40, slot * 0.30);
    function Y(v) { return T + ih - (v / hi) * ih; }
    var s = '';
    s += '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || o.title || 'Grouped bar chart') + '">';
    var t;
    for (t = 0; t <= 4; t++) {
      var tv = (hi * t) / 4, ty = Y(tv);
      s += '<line x1="' + L + '" y1="' + ty.toFixed(1) + '" x2="' + (W - R) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
      s += '<text x="' + (L - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv, dec) + '</text>';
    }
    cats.forEach(function (c, i) {
      var cx = L + slot * i + slot / 2;
      var x1 = cx - bw - 2, x2 = cx + 2;
      s += '<rect x="' + x1.toFixed(1) + '" y="' + Y(s1.values[i]).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (Y(0) - Y(s1.values[i])).toFixed(1) + '" rx="3" fill="' + RED + '"/>';
      s += '<rect x="' + x2.toFixed(1) + '" y="' + Y(s2.values[i]).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (Y(0) - Y(s2.values[i])).toFixed(1) + '" rx="3" fill="' + GREY + '"/>';
      s += '<text x="' + (x1 + bw / 2).toFixed(1) + '" y="' + (Y(s1.values[i]) - 7).toFixed(1) + '" text-anchor="middle" font-size="11.5" font-weight="700" fill="' + INK + '" font-family="' + FONT + '">' + fmt(s1.values[i], dec) + '</text>';
      s += '<text x="' + (x2 + bw / 2).toFixed(1) + '" y="' + (Y(s2.values[i]) - 7).toFixed(1) + '" text-anchor="middle" font-size="11.5" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(s2.values[i], dec) + '</text>';
      s += '<text x="' + cx.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + esc(c) + '</text>';
    });
    s += '</svg>';
    s += '<div class="chart-key"><span><i class="key-dot" style="background:' + RED + '"></i>' + esc(s1.name) + '</span><span><i class="key-dot" style="background:' + GREY + '"></i>' + esc(s2.name) + '</span></div>';
    return s;
  }

  function render(id, svg) {
    var node = document.getElementById(id);
    if (node) node.innerHTML = svg;
  }

  /* Mobile hamburger menu. Opens on tap; also opens on load when the URL
     hash is #menu-open, so the open state is a real, linkable page state. */
  function initMenu() {
    var bar = document.querySelector('.topbar');
    var btn = document.getElementById('menu-btn');
    if (!bar || !btn) return;
    function set(open) {
      bar.classList.toggle('nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () { set(!bar.classList.contains('nav-open')); });
    if (window.location.hash === '#menu-open') set(true);
  }

  return { lineChart: lineChart, barChart: barChart, hbarChart: hbarChart, donutChart: donutChart, groupedBars: groupedBars, render: render, initMenu: initMenu, fmt: fmt, RED: RED };
})();

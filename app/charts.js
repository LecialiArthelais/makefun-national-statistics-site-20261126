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

  /* Vertical bar chart. Bars start at zero. One bar may be highlighted red.
     o.ymin / o.ymax / o.ticks override the automatic axis; o.tickDecimals
     controls the tick labels separately from the bar value labels. */
  function barChart(o) {
    var W = 720, H = 300, L = 56, R = 14, T = 30, B = 30;
    var labels = o.labels, values = o.values;
    var dec = o.decimals === undefined ? 1 : o.decimals;
    var tdec = o.tickDecimals === undefined ? dec : o.tickDecimals;
    var min = Math.min.apply(null, values.concat([0]));
    var max = Math.max.apply(null, values);
    var lo = o.ymin !== undefined ? o.ymin : (min < 0 ? niceFloor(min * 1.05) : 0);
    var hi = o.ymax !== undefined ? o.ymax : niceCeil(max * 1.08);
    if (hi <= lo) hi = lo + 1;
    var iw = W - L - R, ih = H - T - B;
    var n = values.length;
    var slot = iw / n, bw = Math.min(44, slot * 0.62);
    function Y(v) { return T + ih - ((v - lo) / (hi - lo)) * ih; }
    var s = '';
    s += '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || o.title || 'Bar chart') + '">';
    var tickVals = o.ticks || null;
    var t;
    if (tickVals) {
      tickVals.forEach(function (tv) {
        var ty = Y(tv);
        s += '<line x1="' + L + '" y1="' + ty.toFixed(1) + '" x2="' + (W - R) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
        s += '<text x="' + (L - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv, tdec) + '</text>';
      });
    } else {
      var ticks = 4;
      for (t = 0; t <= ticks; t++) {
        var tv2 = lo + ((hi - lo) * t) / ticks;
        var ty2 = Y(tv2);
        s += '<line x1="' + L + '" y1="' + ty2.toFixed(1) + '" x2="' + (W - R) + '" y2="' + ty2.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
        s += '<text x="' + (L - 8) + '" y="' + (ty2 + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv2, tdec) + '</text>';
      }
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

  /* Grouped vertical bars: two series across a few categories.
     o.ymax / o.ticks override the automatic axis like barChart. */
  function groupedBars(o) {
    var cats = o.categories, s1 = o.series1, s2 = o.series2;
    var W = 720, H = 300, L = 56, R = 14, T = 30, B = 30;
    var dec = o.decimals === undefined ? 1 : o.decimals;
    var tdec = o.tickDecimals === undefined ? dec : o.tickDecimals;
    var max = Math.max.apply(null, s1.values.concat(s2.values));
    var hi = o.ymax !== undefined ? o.ymax : niceCeil(max * 1.08);
    var iw = W - L - R, ih = H - T - B;
    var n = cats.length, slot = iw / n, bw = Math.min(40, slot * 0.30);
    function Y(v) { return T + ih - (v / hi) * ih; }
    var s = '';
    s += '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || o.title || 'Grouped bar chart') + '">';
    var t;
    if (o.ticks) {
      o.ticks.forEach(function (tv) {
        var ty = Y(tv);
        s += '<line x1="' + L + '" y1="' + ty.toFixed(1) + '" x2="' + (W - R) + '" y2="' + ty.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
        s += '<text x="' + (L - 8) + '" y="' + (ty + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv, tdec) + '</text>';
      });
    } else {
      for (t = 0; t <= 4; t++) {
        var tv2 = (hi * t) / 4, ty2 = Y(tv2);
        s += '<line x1="' + L + '" y1="' + ty2.toFixed(1) + '" x2="' + (W - R) + '" y2="' + ty2.toFixed(1) + '" stroke="' + GRID + '" stroke-width="1"/>';
        s += '<text x="' + (L - 8) + '" y="' + (ty2 + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv2, tdec) + '</text>';
      }
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

  /* Population pyramid: male bars to the left, female to the right, one row
     per 5-year age band. Values are printed at the end of every bar. */
  function pyramidChart(o) {
    var bands = o.bands;
    var rowH = 25, W = 720, L = 52, R = 52, T = 30, B = 26, GAP = 70;
    var H = T + rowH * bands.length + B;
    var max = 0;
    bands.forEach(function (b) { max = Math.max(max, b.male, b.female); });
    var hi = niceCeil(max * 1.06 / 1e6) * 1e6;
    var cx = W / 2, half = (W - L - R - GAP) / 2;
    function X(v) { return (v / hi) * half; }
    var s = '';
    s += '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || 'Population pyramid') + '">';
    /* axis ticks, in millions, mirrored on both sides of the centre gap */
    var t, tv;
    for (t = 0; t <= 4; t++) {
      tv = (hi * t) / 4;
      var xm = cx - GAP / 2 - X(tv), xp = cx + GAP / 2 + X(tv);
      s += '<line x1="' + xm.toFixed(1) + '" y1="' + T + '" x2="' + xm.toFixed(1) + '" y2="' + (H - B) + '" stroke="' + GRID + '" stroke-width="1"/>';
      s += '<line x1="' + xp.toFixed(1) + '" y1="' + T + '" x2="' + xp.toFixed(1) + '" y2="' + (H - B) + '" stroke="' + GRID + '" stroke-width="1"/>';
      if (t > 0) {
        s += '<text x="' + xm.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv / 1e6, 0) + 'm</text>';
        s += '<text x="' + xp.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(tv / 1e6, 0) + 'm</text>';
      }
    }
    s += '<text x="' + (cx - GAP / 2 - half / 2).toFixed(1) + '" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="' + INK + '" font-family="' + FONT + '">Male</text>';
    s += '<text x="' + (cx + GAP / 2 + half / 2).toFixed(1) + '" y="16" text-anchor="middle" font-size="12" font-weight="700" fill="' + INK + '" font-family="' + FONT + '">Female</text>';
    bands.forEach(function (b, i) {
      var y = T + i * rowH;
      var cy = y + rowH / 2;
      var mw = X(b.male), fw = X(b.female);
      s += '<rect x="' + (cx - GAP / 2 - mw).toFixed(1) + '" y="' + (y + 3).toFixed(1) + '" width="' + mw.toFixed(1) + '" height="' + (rowH - 6) + '" rx="2" fill="' + RED + '"/>';
      s += '<rect x="' + (cx + GAP / 2).toFixed(1) + '" y="' + (y + 3).toFixed(1) + '" width="' + fw.toFixed(1) + '" height="' + (rowH - 6) + '" rx="2" fill="#3D3D3A"/>';
      /* band labels sit in the centre gap, painted after the bars so nothing covers them */
      s += '<text x="' + cx + '" y="' + (cy + 4).toFixed(1) + '" text-anchor="middle" font-size="11.5" fill="' + INK + '" font-family="' + FONT + '">' + esc(b.label) + '</text>';
      s += '<text x="' + (cx - GAP / 2 - mw - 5).toFixed(1) + '" y="' + (cy + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(b.male / 1e6, 1) + 'm</text>';
      s += '<text x="' + (cx + GAP / 2 + fw + 5).toFixed(1) + '" y="' + (cy + 4).toFixed(1) + '" text-anchor="start" font-size="11" fill="' + MUTED + '" font-family="' + FONT + '">' + fmt(b.female / 1e6, 1) + 'm</text>';
    });
    s += '<line x1="' + cx + '" y1="' + T + '" x2="' + cx + '" y2="' + (H - B) + '" stroke="' + GREY_DARK + '" stroke-width="1.2"/>';
    s += '</svg>';
    return s;
  }

  /* Tile-map cartogram: one square ≈ 2% of the population, grouped by
     island. Layout is a fixed grid (col,row) per square, roughly geographic:
     Sumatra runs down the left, Java is the long band at the bottom,
     Kalimantan and Sulawesi sit above it, Bali & Nusa Tenggara continue
     east of Java, Maluku & Papua sit far east. Colours are a single-hue
     sequential red ramp ordered by share. o.onGroup (optional) is called
     with the island name when a group is clicked. */
  var TILE_GROUPS = [
    { name: 'Sumatra', share: 21.89, millions: 62.32, color: '#CE2A42',
      cells: [[0,0],[0,1],[1,1],[1,2],[2,2],[2,3],[3,3],[3,4],[4,4],[4,5],[5,5]],
      label: [0.5, -0.9, 'start'] },
    { name: 'Java', share: 55.65, millions: 158.41, color: '#C8102E',
      cells: [[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[15,6],
              [2,7],[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[14,7],[15,7]],
      label: [8.5, 8.9, 'middle'] },
    { name: 'Kalimantan', share: 6.23, millions: 17.75, color: '#E89AA6',
      cells: [[7,1],[8,1],[8,2]], label: [7.5, 0.1, 'middle'] },
    { name: 'Sulawesi', share: 7.40, millions: 21.06, color: '#E0707F',
      cells: [[12,1],[13,1],[13,2],[14,2]], label: [13, 0.1, 'middle'] },
    { name: 'Bali & Nusa Tenggara', share: 5.60, millions: 15.95, color: '#F2B8C0',
      cells: [[16,6],[17,6],[18,6]], label: [17, 8.9, 'middle'] },
    { name: 'Maluku & Papua', share: 3.23, millions: 9.18, color: '#F6DDE1',
      cells: [[20,5],[21,5]], label: [21, 3.9, 'end'] }
  ];
  function tileMap(o) {
    var groups = o.groups || TILE_GROUPS;
    var cell = 27, gap = 4, step = cell + gap;
    var W = 720, H = 356, OX = 24, OY = 44;
    var s = '';
    s += '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || 'Tile map cartogram: one square is about 2 percent of the population') + '">';
    groups.forEach(function (g) {
      g.cells.forEach(function (c) {
        var x = OX + c[0] * step, y = OY + c[1] * step;
        s += '<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" rx="4" fill="' + g.color + '"' +
          (o.onGroup ? ' data-island="' + esc(g.name) + '" style="cursor:pointer"' : '') + '/>';
      });
      var lx = OX + g.label[0] * step, ly = OY + g.label[1] * step;
      var anchor = g.label[2] || 'middle';
      s += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="' + anchor + '" font-size="12.5" font-weight="700" fill="' + INK + '" font-family="' + FONT + '">' + esc(g.name) + ' · ' + g.share.toFixed(2) + '%</text>';
    });
    s += '<text x="' + OX + '" y="' + (H - 8) + '" font-size="12" fill="' + MUTED + '" font-family="' + FONT + '">Each square ≈ 2% of the population · 51 squares · BPS, SUPAS 2025</text>';
    s += '</svg>';
    return s;
  }

  /* Small sparkline for KPI tiles: a red polyline with a dot on the last
     point. Pure function of the values; no axes, no labels. */
  function sparkline(values, o) {
    o = o || {};
    var W = o.width || 220, H = o.height || 48, L = 2, R = 4, T = 5, B = 4;
    var lo = o.ymin !== undefined ? o.ymin : Math.min.apply(null, values);
    var hi = o.ymax !== undefined ? o.ymax : Math.max.apply(null, values);
    if (hi <= lo) hi = lo + 1;
    var pts = values.map(function (v, i) {
      var x = L + ((W - L - R) * i) / (values.length - 1);
      var y = T + (H - T - B) * (1 - (v - lo) / (hi - lo));
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    var last = values[values.length - 1];
    var lx = W - R, ly = T + (H - T - B) * (1 - (last - lo) / (hi - lo));
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><polyline points="' + pts + '" fill="none" stroke="' + RED + '" stroke-width="2" stroke-linejoin="round"/><circle cx="' + lx.toFixed(1) + '" cy="' + ly.toFixed(1) + '" r="3" fill="' + RED + '"/></svg>';
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

  return { lineChart: lineChart, barChart: barChart, hbarChart: hbarChart, donutChart: donutChart, groupedBars: groupedBars, pyramidChart: pyramidChart, tileMap: tileMap, sparkline: sparkline, render: render, initMenu: initMenu, fmt: fmt, RED: RED };
})();

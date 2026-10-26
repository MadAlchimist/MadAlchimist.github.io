/* Aktueller Grow: liest die CSV-Exporte aus Canalyze (assets/canalyze_export/)
 * und zeichnet daraus interaktive Verlaeufe. Neue Daten = CSVs ersetzen und pushen,
 * am Code muss nichts geaendert werden. Fotos kommen aus assets/aktueller-grow/. */
(function () {
  'use strict';
  var root = document.getElementById('grow');
  if (!root || typeof Chart === 'undefined') return;

  var BASIS = root.dataset.basis;
  var DAY = 86400000;
  var MUTED = '#a89c82', GRID = 'rgba(201,162,75,.12)', PARCH = '#e9dcc0';
  var PFLANZEN_FARBEN = ['#c9a24b', '#7ccf4f', '#a06cff', '#e08a4f', '#6fd0d0', '#d96fa8'];
  var PRODUKT_FARBEN = ['#c9a24b', '#7ccf4f', '#a06cff', '#e08a4f', '#6fd0d0', '#d96fa8', '#cdb0ff', '#b9f08f'];
  // Schreibweisen aus Canalyze vereinheitlichen (links: so im Export, rechts: Anzeige)
  var ALIAS = { 'Rhizotomic': 'Canna Rhizotonic', 'Calmag Pro': 'Plagron Calmag Pro' };
  var LINKS = 60, RECHTS = 10; // Plot-Rand in px, damit Foto-Spur und Diagramme deckungsgleich sind

  // ---------- Hilfen ----------------------------------------------------------------
  function csv(text) {
    var z = text.replace(/^﻿/, '').split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
    var kopf = z.shift().split(';').map(function (h) { return h.trim(); });
    return z.map(function (l) {
      var c = l.split(';'), o = {};
      kopf.forEach(function (h, i) { o[h] = (c[i] || '').trim(); });
      return o;
    });
  }
  function laden(name, optional) {
    return fetch(BASIS + name + '.csv', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(name + ': ' + r.status); return r.text(); })
      .then(csv)
      .catch(function (e) { if (optional) return []; throw e; });
  }
  function tag(d) { var p = d.slice(0, 10).split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
  function zahl(v) { return v === '' || v == null ? null : parseFloat(v); }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function datum(ms, kurz) {
    var d = new Date(ms);
    return p2(d.getUTCDate()) + '.' + p2(d.getUTCMonth() + 1) + (kurz ? '.' : '.' + d.getUTCFullYear());
  }
  function el(tagName, attrs, kind) {
    var e = document.createElement(tagName);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kind || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }
  function mittel(a) { return a.reduce(function (s, v) { return s + v; }, 0) / a.length; }

  // ---------- Zustand ----------------------------------------------------------------
  var D = {};   // Daten
  var S = { layers: {}, plants: {}, zelte: {}, produkte: {}, range: 'alles', min: 0, max: 0 };
  var charts = {};
  var PANELS = [
    { id: 'temp',     gruppe: 'klima',      label: 'Temperatur',  einheit: '°C',  legende: [['Tag', 'tag'], ['Nacht', 'nacht']] },
    { id: 'rlf',      gruppe: 'klima',      label: 'Luftfeuchte', einheit: '%',   legende: [] },
    { id: 'vpd',      gruppe: 'klima',      label: 'VPD',         einheit: 'kPa', legende: [] },
    { id: 'ec',       gruppe: 'giessen',    label: 'EC',          einheit: '',    legende: 'stil' },
    { id: 'menge',    gruppe: 'giessen',    label: 'Menge',       einheit: 'ml',  legende: 'stil' },
    { id: 'zusatz',   gruppe: 'zusaetze',   label: 'Zusätze',     einheit: 'ml',  legende: [] },
    { id: 'ereignis', gruppe: 'ereignisse', label: 'Ereignisse',  einheit: '',    legende: [['defoliert', 'defol'], ['getoppt', 'topp']] }
  ];
  var GRUPPEN = [
    { id: 'klima', titel: 'Klima' }, { id: 'giessen', titel: 'Gießen' },
    { id: 'zusaetze', titel: 'Zusätze' }, { id: 'ereignisse', titel: 'Ereignisse' }, { id: 'fotos', titel: 'Fotos' }
  ];
  var STANDARD_AN = ['temp', 'rlf', 'vpd', 'fotos'];

  // ---------- Laden --------------------------------------------------------------------
  Promise.all([
    laden('stand'), laden('pflanzen'), laden('klima'), laden('giessen'),
    laden('zusaetze'), laden('ereignisse'), laden('fotos', true)
  ]).then(function (r) {
    D.stand = r[0][0] ? r[0][0].stand : '';
    D.pflanzen = r[1].map(function (p, i) {
      return { id: p.pflanze_id, strain: p.strain, zelt: p.zelt, aussaat: tag(p.aussaat), bluete: p.bluete_start ? tag(p.bluete_start) : null, farbe: PFLANZEN_FARBEN[i % PFLANZEN_FARBEN.length] };
    });
    D.klima = r[2].map(function (k) { return { zelt: k.zelt, t: tag(k.datum), temp_tag: zahl(k.temp_tag), temp_nacht: zahl(k.temp_nacht), rlf: zahl(k.rlf_tag), vpd: zahl(k.vpd) }; });
    D.giessen = r[3].map(function (g) { return { id: g.giess_id, pid: g.pflanze_id, t: tag(g.datum), ec_in: zahl(g.ec_input), ec_dr: zahl(g.ec_drain), menge: zahl(g.giessmenge_ml), drain: zahl(g.drainmenge_ml) }; });
    D.zusaetze = r[4].map(function (z) { return { gid: z.giess_id, name: ALIAS[z.produkt] || z.produkt, ml: zahl(z.menge_ml) }; });
    D.ereignisse = r[5].map(function (e) { return { pid: e.pflanze_id, t: tag(e.datum), typ: e.typ }; });
    D.fotoInfo = {};
    r[6].forEach(function (f) { D.fotoInfo[f.datei] = f; });
    start();
  }).catch(function (e) {
    root.innerHTML = '';
    root.appendChild(el('p', { 'class': 'grow-fehler', text: 'Die Daten aus Canalyze konnten nicht geladen werden (' + e.message + ').' }));
  });

  // ---------- Start --------------------------------------------------------------------
  function start() {
    var aus = D.pflanzen.map(function (p) { return p.aussaat; });
    var bl = D.pflanzen.map(function (p) { return p.bluete; }).filter(Boolean);
    D.aussaat = Math.min.apply(null, aus);
    D.bluete = bl.length ? Math.min.apply(null, bl) : null;
    D.standT = tag(D.stand || new Date().toISOString());
    D.zeltListe = D.pflanzen.map(function (p) { return p.zelt; }).filter(function (z, i, a) { return a.indexOf(z) === i; });
    D.klima.forEach(function (k) { if (D.zeltListe.indexOf(k.zelt) < 0) D.zeltListe.push(k.zelt); });
    D.produktListe = D.zusaetze.map(function (z) { return z.name; }).filter(function (n, i, a) { return a.indexOf(n) === i; }).sort();
    D.giessenById = {}; D.giessen.forEach(function (g) { D.giessenById[g.id] = g; });
    D.pflanzeById = {}; D.pflanzen.forEach(function (p) { D.pflanzeById[p.id] = p; });

    D.fotos = Array.prototype.map.call(document.querySelectorAll('#grow-fotos li'), function (li) {
      var src = li.dataset.src, name = src.split('/').pop(), info = D.fotoInfo[name] || {};
      var m = name.match(/(\d{4})(\d{2})(\d{2})[_-](\d{2})(\d{2})(\d{2})/), t = null;
      if (m) t = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]);
      if (info.datum) t = tag(info.datum) + 12 * 3600000;
      return { src: src, thumb: src.replace(/\/([^\/]+)$/, '/thumbs/$1'), t: t, text: info.text || '', pid: info.pflanze_id || '' };
    }).filter(function (f) { return f.t !== null; }).sort(function (a, b) { return a.t - b.t; });

    D.pflanzen.forEach(function (p) { S.plants[p.id] = true; });
    D.zeltListe.forEach(function (z) { S.zelte[z] = true; });
    D.produktListe.forEach(function (n) { S.produkte[n] = true; });
    PANELS.forEach(function (p) { S.layers[p.id] = STANDARD_AN.indexOf(p.id) >= 0; });
    S.layers.fotos = true;
    hashLesen();

    Chart.defaults.font.family = '"EB Garamond", Georgia, serif';
    Chart.defaults.font.size = 13;
    Chart.defaults.color = MUTED;

    S.min = D.aussaat - DAY; S.max = D.standT + DAY;   // Startwerte, bevor der Zeitraum gewaehlt wird
    bauen();
    bereich(S.range, true);
  }

  // ---------- Oberflaeche ------------------------------------------------------------------
  var ui = {};
  function bauen() {
    root.innerHTML = '';
    var tage = Math.floor((D.standT - D.aussaat) / DAY) + 1;
    var bt = D.bluete && D.standT >= D.bluete ? Math.floor((D.standT - D.bluete) / DAY) + 1 : null;
    var kpi = el('div', { 'class': 'grow-kpis' });
    [['Stand', D.stand ? D.stand.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1') : '–'],
     ['Grow-Tag', String(tage)], ['Blüte-Tag', bt ? String(bt) : '–'], ['Pflanzen', String(D.pflanzen.length)]].forEach(function (k) {
      kpi.appendChild(el('div', { 'class': 'kpi' }, [el('span', { 'class': 'kpi-label', text: k[0] }), el('strong', { text: k[1] })]));
    });
    root.appendChild(kpi);

    var pult = el('div', { 'class': 'grow-pult' });
    // Pflanzen
    var zp = el('div', { 'class': 'pult-zeile' }, [el('span', { 'class': 'pult-titel', text: 'Pflanzen' })]);
    D.pflanzen.forEach(function (p) {
      var b = pille(p.strain, function () { S.plants[p.id] = !S.plants[p.id]; b.setAttribute('aria-pressed', S.plants[p.id]); aktualisieren(); }, S.plants[p.id], p.farbe);
      zp.appendChild(b);
    });
    pult.appendChild(zp);
    if (D.zeltListe.length > 1) {
      var zz = el('div', { 'class': 'pult-zeile' }, [el('span', { 'class': 'pult-titel', text: 'Zelte' })]);
      D.zeltListe.forEach(function (z) {
        var b = pille(z, function () { S.zelte[z] = !S.zelte[z]; b.setAttribute('aria-pressed', S.zelte[z]); aktualisieren(); }, S.zelte[z]);
        zz.appendChild(b);
      });
      pult.appendChild(zz);
    }
    // Ebenen
    var ze = el('div', { 'class': 'pult-zeile pult-ebenen' }, [el('span', { 'class': 'pult-titel', text: 'Ebenen' })]);
    GRUPPEN.forEach(function (g) {
      var box = el('div', { 'class': 'ebene' }, [el('span', { 'class': 'ebene-titel', text: g.titel })]);
      var inhalt = PANELS.filter(function (p) { return p.gruppe === g.id; });
      if (g.id === 'fotos') inhalt = [{ id: 'fotos', label: D.fotos.length ? 'Zeitleiste (' + D.fotos.length + ')' : 'keine Fotos' }];
      inhalt.forEach(function (p) {
        var b = pille(p.label, function () { S.layers[p.id] = !S.layers[p.id]; b.setAttribute('aria-pressed', S.layers[p.id]); sichtbarkeit(); }, S.layers[p.id]);
        if (p.id === 'fotos' && !D.fotos.length) b.disabled = true;
        box.appendChild(b);
      });
      ze.appendChild(box);
    });
    pult.appendChild(ze);
    // Zusatz-Produkte (nur sichtbar, wenn die Ebene an ist)
    ui.produkte = el('div', { 'class': 'pult-zeile', hidden: '' }, [el('span', { 'class': 'pult-titel', text: 'Produkte' })]);
    D.produktListe.forEach(function (n, i) {
      var b = pille(n, function () { S.produkte[n] = !S.produkte[n]; b.setAttribute('aria-pressed', S.produkte[n]); aktualisieren(); }, S.produkte[n], PRODUKT_FARBEN[i % PRODUKT_FARBEN.length]);
      ui.produkte.appendChild(b);
    });
    pult.appendChild(ui.produkte);
    // Zeitraum
    var zr = el('div', { 'class': 'pult-zeile' }, [el('span', { 'class': 'pult-titel', text: 'Zeitraum' })]);
    ui.bereichBtn = {};
    [['alles', 'Alles'], ['bluete', 'Blüte'], ['14', 'Letzte 14 Tage']].forEach(function (r) {
      var b = pille(r[1], function () { bereich(r[0]); }, S.range === r[0]);
      if (r[0] === 'bluete' && !D.bluete) b.disabled = true;
      ui.bereichBtn[r[0]] = b; zr.appendChild(b);
    });
    pult.appendChild(zr);
    root.appendChild(pult);

    // Foto-Spur und Diagramm-Felder
    ui.spur = el('div', { 'class': 'fotospur', 'aria-label': 'Fotos auf der Zeitachse' });
    root.appendChild(ui.spur);
    ui.panels = {};
    PANELS.forEach(function (p) {
      var legende = el('span', { 'class': 'panel-legende' });
      if (p.legende === 'stil') {
        legende.appendChild(el('span', { 'class': 'leg leg-voll', text: p.id === 'ec' ? 'Input' : 'Gießmenge' }));
        legende.appendChild(el('span', { 'class': 'leg leg-strich', text: 'Drain' }));
      } else if (p.id === 'temp') {
        legende.appendChild(el('span', { 'class': 'leg', 'style': '--c:#c9a24b', text: 'Tag' }));
        legende.appendChild(el('span', { 'class': 'leg', 'style': '--c:#cdb0ff', text: 'Nacht' }));
      } else if (p.id === 'ereignis') {
        legende.appendChild(el('span', { 'class': 'leg', 'style': '--c:#7ccf4f', text: '▼ defoliert' }));
        legende.appendChild(el('span', { 'class': 'leg', 'style': '--c:#c9a24b', text: '★ getoppt' }));
      }
      var kopf = el('div', { 'class': 'panel-kopf' }, [el('h3', { text: p.label + (p.einheit ? ' (' + p.einheit + ')' : '') }), legende]);
      var wrap = el('div', { 'class': 'panel-chart' }, [el('canvas')]);
      var box = el('section', { 'class': 'grow-panel' }, [kopf, wrap]);
      root.appendChild(box);
      ui.panels[p.id] = { box: box, wrap: wrap, def: p };
    });
    root.appendChild(el('p', { 'class': 'grow-hinweis', text: 'Violett hinterlegt = Blütephase. Daten und Fotos stammen aus Canalyze; die Ansicht aktualisiert sich mit jedem Upload.' }));
    lightboxBauen();
    sichtbarkeit();
    window.addEventListener('resize', debounce(function () { spurZeichnen(); }, 150));
  }

  function pille(text, onClick, an, farbe) {
    var b = el('button', { type: 'button', 'class': 'pille', 'aria-pressed': an ? 'true' : 'false' });
    if (farbe) { b.style.setProperty('--c', farbe); b.appendChild(el('span', { 'class': 'punkt' })); }
    b.appendChild(document.createTextNode(text));
    b.addEventListener('click', onClick);
    return b;
  }
  function debounce(fn, ms) { var h; return function () { clearTimeout(h); h = setTimeout(fn, ms); }; }

  // ---------- Sichtbarkeit / Aktualisierung -------------------------------------------------------
  function sichtbarkeit() {
    PANELS.forEach(function (p) {
      var an = !!S.layers[p.id];
      ui.panels[p.id].box.hidden = !an;
      if (an && !charts[p.id]) chartErzeugen(p);
    });
    ui.produkte.hidden = !S.layers.zusatz;
    ui.spur.hidden = !S.layers.fotos || !D.fotos.length;
    aktualisieren();
    hashSchreiben();
  }
  function aktualisieren() {
    PANELS.forEach(function (p) { if (S.layers[p.id] && charts[p.id]) fuellen(p); });
    spurZeichnen();
  }
  function bereich(art, still) {
    S.range = art;
    if (art === 'bluete' && D.bluete) { S.min = D.bluete - DAY; S.max = D.standT + DAY; }
    else if (art === '14') { S.min = D.standT - 14 * DAY; S.max = D.standT + DAY; }
    else { S.range = 'alles'; S.min = D.aussaat - DAY; S.max = D.standT + DAY; }
    Object.keys(ui.bereichBtn).forEach(function (k) { ui.bereichBtn[k].setAttribute('aria-pressed', k === S.range); });
    Object.keys(charts).forEach(function (id) { charts[id].options.scales.x.min = S.min; charts[id].options.scales.x.max = S.max; charts[id].update('none'); });
    spurZeichnen();
    if (!still) hashSchreiben();
  }

  // ---------- Diagramme ------------------------------------------------------------------------------
  var phasen = {
    id: 'phasen',
    beforeDatasetsDraw: function (c) {
      if (!D.bluete) return;
      var a = c.chartArea, px = c.scales.x.getPixelForValue(D.bluete), x = Math.max(a.left, px), ctx = c.ctx;
      if (px >= a.right) return;
      ctx.save();
      ctx.fillStyle = 'rgba(160,108,255,.09)';
      ctx.fillRect(x, a.top, a.right - x, a.bottom - a.top);
      if (px >= a.left) { ctx.strokeStyle = 'rgba(201,162,75,.55)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(px, a.top); ctx.lineTo(px, a.bottom); ctx.stroke(); }
      ctx.restore();
    }
  };
  var zeilenNamen = {
    id: 'zeilenNamen',
    afterDraw: function (c) {
      var a = c.chartArea, ctx = c.ctx;
      ctx.save(); ctx.font = '12px "EB Garamond", serif'; ctx.fillStyle = 'rgba(233,220,192,.75)'; ctx.textBaseline = 'bottom';
      ereignisPflanzen().forEach(function (pf, i) { ctx.fillText(pf.strain, a.left + 6, c.scales.y.getPixelForValue(i + 1) - 5); });
      ctx.restore();
    }
  };
  function wochenTicks(scale) {
    // Schrittweite (1, 2, 7 oder 14 Tage) so waehlen, dass die Datumsbeschriftungen nicht ineinanderlaufen
    var span = (scale.max - scale.min) / DAY, breite = Math.max(120, scale.chart.width - LINKS - RECHTS), pxTag = breite / span;
    var schritt = [1, 2, 7, 14, 28].filter(function (s) { return s * pxTag >= 56; })[0] || 28, v = [];
    for (var x = Math.ceil(scale.min / DAY) * DAY; x <= scale.max; x += schritt * DAY) v.push({ value: x });
    scale.ticks = v;
  }
  function chartErzeugen(p) {
    var ereignis = p.id === 'ereignis';
    var opt = {
      responsive: true, maintainAspectRatio: false, animation: false, parsing: false, normalized: true,
      layout: { padding: { left: 8, right: RECHTS, top: 6, bottom: 0 } },
      interaction: { mode: ereignis ? 'nearest' : 'x', intersect: ereignis },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1612', borderColor: '#c9a24b', borderWidth: 1, titleColor: '#c9a24b', bodyColor: PARCH, padding: 10,
          callbacks: {
            title: function (it) {
              if (!it.length) return '';
              var t = it[0].parsed.x, g = Math.floor((t - D.aussaat) / DAY) + 1;
              var s = datum(t) + ' · Tag ' + g;
              if (D.bluete && t >= D.bluete) s += ' · Blüte-Tag ' + (Math.floor((t - D.bluete) / DAY) + 1);
              return s;
            },
            label: function (c) {
              if (ereignis) return c.dataset.label + ': ' + c.raw.name;
              var v = c.parsed.y; return ' ' + c.dataset.label + ': ' + (Math.round(v * 100) / 100).toLocaleString('de-DE') + ' ' + (p.einheit || '');
            }
          }
        }
      },
      scales: {
        x: { type: 'linear', min: S.min, max: S.max, grid: { color: GRID }, ticks: { color: MUTED, maxRotation: 0, callback: function (v) { return datum(v, true); } }, afterBuildTicks: wochenTicks },
        y: { position: 'left', grid: { color: GRID }, ticks: { color: MUTED }, afterFit: function (s) { s.width = LINKS - 8; } }
      }
    };
    if (ereignis) {
      opt.scales.y.min = 0.5;
      opt.scales.y.afterBuildTicks = function (scale) {
        scale.ticks = ereignisPflanzen().map(function (pf, i) { return { value: i + 1 }; });
      };
      opt.scales.y.ticks.display = false;
    }
    charts[p.id] = new Chart(ui.panels[p.id].wrap.firstChild, { type: ereignis ? 'scatter' : 'line', data: { datasets: [] }, options: opt, plugins: ereignis ? [phasen, zeilenNamen] : [phasen] });
    fuellen(p);
  }
  function linie(label, daten, farbe, strich, punkte) {
    return { label: label, data: daten, borderColor: farbe, backgroundColor: farbe, borderWidth: 2, pointRadius: punkte === false ? 0 : 3, pointHoverRadius: 5, tension: 0.25, spanGaps: true, borderDash: strich ? [6, 4] : [] };
  }
  function gewaehltePflanzen() { return D.pflanzen.filter(function (p) { return S.plants[p.id]; }); }
  function ereignisPflanzen() { return gewaehltePflanzen(); }
  function punkte(rows, key) {
    return rows.filter(function (r) { return r[key] !== null; }).sort(function (a, b) { return a.t - b.t; }).map(function (r) { return { x: r.t, y: r[key] }; });
  }
  function fuellen(p) {
    var c = charts[p.id], ds = [], sel = gewaehltePflanzen();
    if (p.gruppe === 'klima') {
      var key = { temp: ['temp_tag', 'temp_nacht'], rlf: ['rlf'], vpd: ['vpd'] }[p.id];
      var farben = { temp_tag: '#c9a24b', temp_nacht: '#cdb0ff', rlf: '#7ccf4f', vpd: '#e08a4f' };
      var zelte = D.zeltListe.filter(function (z) { return S.zelte[z]; });
      zelte.forEach(function (z, zi) {
        var rows = D.klima.filter(function (k) { return k.zelt === z; });
        key.forEach(function (k) {
          var name = { temp_tag: 'Tag', temp_nacht: 'Nacht', rlf: 'Luftfeuchte', vpd: 'VPD' }[k] + (D.zeltListe.length > 1 ? ' (' + z + ')' : '');
          ds.push(linie(name, punkte(rows, k), farben[k], zi > 0, false));
        });
      });
    } else if (p.id === 'ec' || p.id === 'menge') {
      var ki = p.id === 'ec' ? ['ec_in', 'ec_dr'] : ['menge', 'drain'];
      sel.forEach(function (pf) {
        var rows = D.giessen.filter(function (g) { return g.pid === pf.id; });
        ds.push(linie(pf.strain + (p.id === 'ec' ? ' Input' : ' Gießmenge'), punkte(rows, ki[0]), pf.farbe, false));
        ds.push(linie(pf.strain + ' Drain', punkte(rows, ki[1]), pf.farbe, true));
      });
    } else if (p.id === 'zusatz') {
      var sid = {}; sel.forEach(function (pf) { sid[pf.id] = true; });
      D.produktListe.forEach(function (n, i) {
        if (!S.produkte[n]) return;
        var proTag = {};
        D.zusaetze.forEach(function (z) {
          if (z.name !== n || z.ml === null) return;
          var g = D.giessenById[z.gid]; if (!g || !sid[g.pid]) return;
          (proTag[g.t] = proTag[g.t] || []).push(z.ml);
        });
        var pts = Object.keys(proTag).map(Number).sort(function (a, b) { return a - b; }).map(function (t) { return { x: t, y: mittel(proTag[t]) }; });
        ds.push(linie(n, pts, PRODUKT_FARBEN[i % PRODUKT_FARBEN.length], false));
      });
    } else if (p.id === 'ereignis') {
      var typen = [['defoliert', '#7ccf4f', 'triangle'], ['getoppt', '#c9a24b', 'star']];
      typen.forEach(function (ty) {
        var pts = [];
        sel.forEach(function (pf, idx) {
          D.ereignisse.filter(function (e) { return e.pid === pf.id && e.typ === ty[0]; }).forEach(function (e) {
            pts.push({ x: e.t, y: idx + 1, name: pf.strain });
          });
        });
        ds.push({ label: ty[0], data: pts, backgroundColor: ty[1], borderColor: ty[1], pointStyle: ty[2], pointRadius: 6, pointHoverRadius: 8, showLine: false });
      });
      c.options.scales.y.max = Math.max(1, sel.length) + 0.5;
      ui.panels.ereignis.wrap.style.height = (60 + 34 * Math.max(1, sel.length)) + 'px';
    }
    c.data.datasets = ds;
    c.update('none');
  }

  // ---------- Foto-Spur -------------------------------------------------------------------------------
  function spurZeichnen() {
    if (!ui.spur || ui.spur.hidden) return;
    ui.spur.innerHTML = '';
    ui.spur.appendChild(el('span', { 'class': 'spur-label', text: 'Fotos' }));
    var cs = getComputedStyle(ui.panels.temp.box), padL = parseFloat(cs.paddingLeft), padR = parseFloat(cs.paddingRight);
    var von = padL + LINKS, bis = ui.spur.clientWidth - padR - RECHTS, span = S.max - S.min;
    var inBereich = D.fotos.filter(function (f) { return f.t >= S.min && f.t <= S.max; });
    var gruppen = [];
    inBereich.forEach(function (f) {
      var x = von + (f.t - S.min) / span * (bis - von), g = gruppen[gruppen.length - 1];
      if (g && x - g.x < 30) g.liste.push(f); else gruppen.push({ x: x, liste: [f] });
    });
    gruppen.forEach(function (g) {
      var b = el('button', { type: 'button', 'class': 'fotopunkt', 'aria-label': g.liste.length + ' Foto(s) vom ' + datum(g.liste[0].t) });
      b.style.left = g.x + 'px';
      b.style.backgroundImage = 'url("' + g.liste[0].thumb + '")';
      if (g.liste.length > 1) b.appendChild(el('span', { 'class': 'anzahl', text: String(g.liste.length) }));
      b.addEventListener('click', function () { lightboxOeffnen(g.liste, 0); });
      ui.spur.appendChild(b);
    });
  }

  // ---------- Lightbox -----------------------------------------------------------------------------------
  var lb = {};
  function lightboxBauen() {
    lb.box = el('div', { 'class': 'lightbox', hidden: '', role: 'dialog', 'aria-label': 'Foto' });
    lb.bild = el('img', { alt: '' });
    lb.text = el('p', { 'class': 'lb-text' });
    lb.zu = el('button', { type: 'button', 'class': 'lb-knopf lb-zu', 'aria-label': 'Schließen', text: '✕' });
    lb.vor = el('button', { type: 'button', 'class': 'lb-knopf lb-vor', 'aria-label': 'Nächstes Foto', text: '›' });
    lb.zur = el('button', { type: 'button', 'class': 'lb-knopf lb-zur', 'aria-label': 'Vorheriges Foto', text: '‹' });
    [lb.zu, lb.zur, lb.vor, lb.bild, lb.text].forEach(function (n) { lb.box.appendChild(n); });
    lb.box.addEventListener('click', function (e) { if (e.target === lb.box) lightboxSchliessen(); });
    lb.zu.addEventListener('click', lightboxSchliessen);
    lb.vor.addEventListener('click', function () { lightboxZeigen(lb.i + 1); });
    lb.zur.addEventListener('click', function () { lightboxZeigen(lb.i - 1); });
    document.addEventListener('keydown', function (e) {
      if (lb.box.hidden) return;
      if (e.key === 'Escape') lightboxSchliessen();
      if (e.key === 'ArrowRight') lightboxZeigen(lb.i + 1);
      if (e.key === 'ArrowLeft') lightboxZeigen(lb.i - 1);
    });
    document.body.appendChild(lb.box);
  }
  function lightboxOeffnen(liste, i) { lb.liste = liste; lb.box.hidden = false; lightboxZeigen(i); lb.zu.focus(); }
  function lightboxSchliessen() { lb.box.hidden = true; }
  function lightboxZeigen(i) {
    if (!lb.liste.length) return;
    lb.i = (i + lb.liste.length) % lb.liste.length;
    var f = lb.liste[lb.i], g = Math.floor((f.t - D.aussaat) / DAY) + 1;
    lb.bild.src = f.src;
    var pf = f.pid && D.pflanzeById[f.pid] ? ' · ' + D.pflanzeById[f.pid].strain : '';
    lb.text.textContent = datum(f.t) + ' · Tag ' + g + pf + (f.text ? ' — ' + f.text : '') + (lb.liste.length > 1 ? '  (' + (lb.i + 1) + '/' + lb.liste.length + ')' : '');
    lb.vor.hidden = lb.zur.hidden = lb.liste.length < 2;
  }

  // ---------- Teilbare Ansicht (Adresse merkt sich die Auswahl) -------------------------------------------
  function hashSchreiben() {
    var an = PANELS.map(function (p) { return p.id; }).concat(['fotos']).filter(function (id) { return S.layers[id]; });
    var pl = D.pflanzen.filter(function (p) { return S.plants[p.id]; }).map(function (p) { return p.id; });
    var h = 'e=' + an.join(',') + '&p=' + pl.join(',') + '&z=' + S.range;
    try { history.replaceState(null, '', '#' + h); } catch (e) { /* egal */ }
  }
  function hashLesen() {
    var h = location.hash.replace(/^#/, ''); if (!h) return;
    h.split('&').forEach(function (kv) {
      var p = kv.split('='), v = (p[1] || '').split(',').filter(Boolean);
      if (p[0] === 'e') { Object.keys(S.layers).forEach(function (k) { S.layers[k] = v.indexOf(k) >= 0; }); }
      if (p[0] === 'p' && v.length) { Object.keys(S.plants).forEach(function (k) { S.plants[k] = v.indexOf(k) >= 0; }); }
      if (p[0] === 'z') S.range = p[1];
    });
  }
})();

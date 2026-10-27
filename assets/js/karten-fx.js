/* Funde, Fehlschlaege & Skurriles: Effekte an den Fall-Karten.
 *  Skurril   hover: goldene Blasen steigen auf        klick: Karte loest sich in Blasen auf
 *  Highlight hover: gruenes Pulsieren (nur CSS)       klick: gruenes Licht frisst die Karte vom Rand nach innen auf
 *  Fehler    hover: rote Tropfen am unteren Rand      klick: Karte zerlaeuft nach unten (runde Tropfen)
 * Nach dem Finale wird der Fall geoeffnet. Strg/Shift/Mittelklick, Tastatur und
 * "Bewegung reduzieren" oeffnen den Fall sofort ohne Effekt. */
(function () {
  'use strict';
  var liste = document.querySelector('.karten-fx');
  if (!liste) return;

  var reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FARBEN_GOLD = ['#e8c46a', '#c9a24b', '#f3dc9a', '#d9b45a'];
  var DAUER = { skurril: 1150, highlight: 950, fehler: 1150 };
  var laeuft = false;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function wahl(a) { return a[Math.floor(Math.random() * a.length)]; }
  function neu(klasse, vars, eltern, tag) {
    var e = document.createElement(tag || 'div');
    e.className = klasse;
    Object.keys(vars || {}).forEach(function (k) { e.style.setProperty(k, vars[k]); });
    eltern.appendChild(e);
    return e;
  }
  function ebene(li) {
    var l = li.querySelector('.fx');
    if (!l) { l = document.createElement('div'); l.className = 'fx'; li.appendChild(l); }
    return l;
  }
  function leeren(li) {
    var l = li.querySelector('.fx');
    if (l) { l.classList.remove('weg'); l.innerHTML = ''; }
  }

  // ---------- Hover ------------------------------------------------------------
  function hoverAn(li) {
    var typ = li.dataset.typ, l = ebene(li);
    l.classList.remove('weg'); l.innerHTML = '';
    var i, rand;
    if (typ === 'skurril') {
      for (i = 0; i < 13; i++) {
        rand = Math.random();
        var x, y;
        if (rand < .5) { x = rnd(0, 100); y = 0; } else if (rand < .75) { x = 0; y = rnd(0, 70); } else { x = 100; y = rnd(0, 70); }
        neu('fx-blase fx-schweb', {
          left: x + '%', top: y + '%', '--z': rnd(8, 18).toFixed(1) + 'px', '--c': wahl(FARBEN_GOLD),
          '--dx': rnd(-18, 18).toFixed(0) + 'px', '--dy': rnd(-70, -35).toFixed(0) + 'px',
          '--dur': rnd(1.8, 2.8).toFixed(2) + 's', '--del': rnd(0, 2).toFixed(2) + 's'
        }, l);
      }
    } else if (typ === 'fehler') {
      for (i = 0; i < 7; i++) {
        neu('fx-tropfen', { left: rnd(8, 92).toFixed(0) + '%', '--dur': rnd(2.2, 3.4).toFixed(2) + 's', '--del': rnd(0, 2.2).toFixed(2) + 's', '--len': rnd(16, 30).toFixed(0) + 'px' }, l);
      }
    }
  }
  function hoverAus(li) {
    var l = li.querySelector('.fx');
    if (!l || laeuft) return;
    l.classList.add('weg');
    setTimeout(function () { if (!laeuft && l.classList.contains('weg')) { l.innerHTML = ''; l.classList.remove('weg'); } }, 350);
  }

  // ---------- Finale ------------------------------------------------------------
  function skurril(li, a, l, w, h) {
    var i, c, r;
    for (i = 0; i < 80; i++) {
      r = Math.random();
      c = wahl(FARBEN_GOLD);
      neu('fx-blase fx-platz', {
        left: rnd(0, 100).toFixed(1) + '%', top: rnd(0, 100).toFixed(1) + '%', '--z': rnd(6, 24).toFixed(1) + 'px', '--c': c,
        '--dx': rnd(-60, 60).toFixed(0) + 'px', '--dy': rnd(-190, -40).toFixed(0) + 'px',
        '--dur': rnd(.8, 1.35).toFixed(2) + 's', '--del': rnd(0, .3).toFixed(2) + 's'
      }, l);
    }
    a.classList.add('fx-aufloesen');
  }
  function highlight(li, a, l) {
    neu('fx-ring', {}, l);
    a.classList.add('fx-leuchten');
  }
  function fehler(li, a, l, w, h) {
    var N = 15, i, s, schmelz = neu('fx-schmelz', {}, l), grenzen = [0], x0, x1, breite;
    for (i = 1; i < N; i++) grenzen.push(i / N * 100 + rnd(-2.6, 2.6));
    grenzen.push(100);
    for (i = 0; i < N; i++) {
      x0 = grenzen[i]; x1 = grenzen[i + 1]; breite = (x1 - x0) / 100 * w;
      s = a.cloneNode(true);
      s.removeAttribute('href'); s.setAttribute('tabindex', '-1'); s.setAttribute('aria-hidden', 'true');
      s.className = 'fx-streifen';
      s.style.width = w + 'px'; s.style.height = h + 'px';
      // unten abgerundet: jeder Streifen endet in einem Tropfen
      s.style.clipPath = 'inset(0 ' + Math.max(0, 100 - x1 - .35).toFixed(2) + '% 0 ' + Math.max(0, x0 - .35).toFixed(2) + '% round 0 0 ' + (breite / 2 + 1).toFixed(1) + 'px ' + (breite / 2 + 1).toFixed(1) + 'px)';
      s.style.setProperty('--d', rnd(50, 270).toFixed(0) + 'px');
      s.style.setProperty('--s', rnd(1.25, 2.3).toFixed(2));
      s.style.setProperty('--del', rnd(0, .3).toFixed(2) + 's');
      schmelz.appendChild(s);
    }
    a.style.visibility = 'hidden';
  }

  function spielen(li, a) {
    var typ = li.dataset.typ, l = ebene(li), w = li.offsetWidth, h = li.offsetHeight;
    l.classList.remove('weg'); l.innerHTML = '';
    laeuft = true;
    li.classList.add('fx-aktiv');
    ({ skurril: skurril, highlight: highlight, fehler: fehler }[typ] || function () {})(li, a, l, w, h);
    setTimeout(function () { window.location.href = a.href; }, DAUER[typ] || 1000);
  }

  // ---------- Ereignisse -------------------------------------------------------------
  liste.querySelectorAll('.karte').forEach(function (li) {
    li.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && !reduziert && !laeuft) hoverAn(li); });
    li.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hoverAus(li); });
    li.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduziert || laeuft || e.detail === 0) return;   // detail 0 = Tastatur
      if (!li.dataset.typ) return;
      e.preventDefault();
      spielen(li, a);
    });
  });

  // Zurueck-Taste: heile Karten wiederherstellen
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted && !laeuft) return;
    laeuft = false;
    liste.querySelectorAll('.karte').forEach(function (li) {
      li.classList.remove('fx-aktiv'); leeren(li);
      var a = li.querySelector('a');
      if (a) { a.classList.remove('fx-aufloesen', 'fx-leuchten'); a.style.visibility = ''; }
    });
  });
})();

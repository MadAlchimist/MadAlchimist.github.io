/* Blasen-Effekt ("alles blubbert wie Gebraeu") fuer Kacheln und Karten.
 *  hover: Blasen steigen vom Rand auf     klick: die Kachel loest sich in Blasen auf, dann oeffnet sich das Ziel
 *  Funde-Seite (.karten-fx .karte): Farbe je Typ (Skurril gold, Highlight gruen, Fehler rot)
 *  Startseite (.tafeln.start .tafel): lila
 * Strg/Shift/Mittelklick, Tastatur und "Bewegung reduzieren" oeffnen das Ziel sofort ohne Effekt. */
(function () {
  'use strict';
  var ziele = [];
  document.querySelectorAll('.karten-fx .karte').forEach(function (li) { ziele.push({ host: li, typ: li.dataset.typ }); });
  document.querySelectorAll('.tafeln.start .tafel').forEach(function (a) { ziele.push({ host: a, typ: 'lila' }); });
  if (!ziele.length) return;

  var reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FARBEN = {
    skurril:   ['#e8c46a', '#c9a24b', '#f3dc9a', '#d9b45a'],
    highlight: ['#7ccf4f', '#9be06b', '#b9f08f', '#5fb83a'],
    fehler:    ['#c4513a', '#d9664d', '#e0604a', '#a8402c'],
    lila:      ['#a06cff', '#b98aff', '#cdb0ff', '#8a52f0']
  };
  var DAUER = 1150;
  var laeuft = false;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function wahl(a) { return a[Math.floor(Math.random() * a.length)]; }
  function neu(klasse, vars, eltern) {
    var e = document.createElement('div');
    e.className = klasse;
    Object.keys(vars || {}).forEach(function (k) { e.style.setProperty(k, vars[k]); });
    eltern.appendChild(e);
    return e;
  }
  function linkVon(host) { return host.tagName === 'A' ? host : host.querySelector('a'); }
  function ebene(host) {
    var l = host.querySelector(':scope > .fx');
    if (!l) { l = document.createElement('div'); l.className = 'fx'; host.appendChild(l); }
    return l;
  }
  function leeren(host) {
    var l = host.querySelector(':scope > .fx');
    if (l) { l.classList.remove('weg'); l.innerHTML = ''; }
  }

  // ---------- Hover: Blasen steigen vom Rand auf -------------------------------------
  function hoverAn(z) {
    var farben = FARBEN[z.typ] || FARBEN.lila, l = ebene(z.host), i, rand, x, y;
    l.classList.remove('weg'); l.innerHTML = '';
    for (i = 0; i < 13; i++) {
      rand = Math.random();
      if (rand < .5) { x = rnd(0, 100); y = 0; } else if (rand < .75) { x = 0; y = rnd(0, 70); } else { x = 100; y = rnd(0, 70); }
      neu('fx-blase fx-schweb', {
        left: x + '%', top: y + '%', '--z': rnd(8, 18).toFixed(1) + 'px', '--c': wahl(farben),
        '--dx': rnd(-18, 18).toFixed(0) + 'px', '--dy': rnd(-70, -35).toFixed(0) + 'px',
        '--dur': rnd(1.8, 2.8).toFixed(2) + 's', '--del': rnd(0, 2).toFixed(2) + 's'
      }, l);
    }
  }
  function hoverAus(z) {
    var l = z.host.querySelector(':scope > .fx');
    if (!l || laeuft) return;
    l.classList.add('weg');
    setTimeout(function () { if (!laeuft && l.classList.contains('weg')) { l.innerHTML = ''; l.classList.remove('weg'); } }, 350);
  }

  // ---------- Klick: Kachel loest sich in Blasen auf ------------------------------------
  function spielen(z, a) {
    var farben = FARBEN[z.typ] || FARBEN.lila, l = ebene(z.host), i;
    l.classList.remove('weg'); l.innerHTML = '';
    laeuft = true;
    z.host.classList.add('fx-aktiv');
    for (i = 0; i < 80; i++) {
      neu('fx-blase fx-platz', {
        left: rnd(0, 100).toFixed(1) + '%', top: rnd(0, 100).toFixed(1) + '%', '--z': rnd(6, 24).toFixed(1) + 'px', '--c': wahl(farben),
        '--dx': rnd(-60, 60).toFixed(0) + 'px', '--dy': rnd(-190, -40).toFixed(0) + 'px',
        '--dur': rnd(.8, 1.35).toFixed(2) + 's', '--del': rnd(0, .3).toFixed(2) + 's'
      }, l);
    }
    a.classList.add('fx-aufloesen');
    setTimeout(function () { window.location.href = a.href; }, DAUER);
  }

  // ---------- Ereignisse -------------------------------------------------------------
  ziele.forEach(function (z) {
    z.host.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && !reduziert && !laeuft) hoverAn(z); });
    z.host.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hoverAus(z); });
    z.host.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduziert || laeuft || e.detail === 0) return;   // detail 0 = Tastatur
      if (!z.typ) return;
      e.preventDefault();
      spielen(z, a);
    });
  });

  // Zurueck-Taste: heile Kacheln wiederherstellen
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted && !laeuft) return;
    laeuft = false;
    ziele.forEach(function (z) {
      z.host.classList.remove('fx-aktiv'); leeren(z.host);
      var a = linkVon(z.host);
      if (a) a.classList.remove('fx-aufloesen');
    });
  });
})();

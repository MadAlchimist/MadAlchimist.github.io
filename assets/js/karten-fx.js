/* Funde, Fehlschlaege & Skurriles: Blasen-Effekt an den Fall-Karten ("alles blubbert wie Gebraeu").
 *  hover: Blasen steigen vom Rand auf     klick: die Karte loest sich in Blasen auf, dann oeffnet sich der Fall
 *  Farbe je Typ: Skurril gold, Highlight gruen, Fehler rot.
 * Strg/Shift/Mittelklick, Tastatur und "Bewegung reduzieren" oeffnen den Fall sofort ohne Effekt. */
(function () {
  'use strict';
  var liste = document.querySelector('.karten-fx');
  if (!liste) return;

  var reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FARBEN = {
    skurril:   ['#e8c46a', '#c9a24b', '#f3dc9a', '#d9b45a'],
    highlight: ['#7ccf4f', '#9be06b', '#b9f08f', '#5fb83a'],
    fehler:    ['#c4513a', '#d9664d', '#e0604a', '#a8402c']
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
  function ebene(li) {
    var l = li.querySelector('.fx');
    if (!l) { l = document.createElement('div'); l.className = 'fx'; li.appendChild(l); }
    return l;
  }
  function leeren(li) {
    var l = li.querySelector('.fx');
    if (l) { l.classList.remove('weg'); l.innerHTML = ''; }
  }

  // ---------- Hover: Blasen steigen vom Rand auf -------------------------------------
  function hoverAn(li) {
    var farben = FARBEN[li.dataset.typ] || FARBEN.skurril, l = ebene(li), i, rand, x, y;
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
  function hoverAus(li) {
    var l = li.querySelector('.fx');
    if (!l || laeuft) return;
    l.classList.add('weg');
    setTimeout(function () { if (!laeuft && l.classList.contains('weg')) { l.innerHTML = ''; l.classList.remove('weg'); } }, 350);
  }

  // ---------- Klick: Karte loest sich in Blasen auf ------------------------------------
  function spielen(li, a) {
    var farben = FARBEN[li.dataset.typ] || FARBEN.skurril, l = ebene(li), i;
    l.classList.remove('weg'); l.innerHTML = '';
    laeuft = true;
    li.classList.add('fx-aktiv');
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
      if (a) a.classList.remove('fx-aufloesen');
    });
  });
})();

/* Heim-Animation: Klick auf "Mad Alchimist" (oben links) und auf die Menuepunkte (jeweils mit eigenem Glas)
 *  Kolben hebt sich und kippt, ein Strahl Gebraeu fliesst heraus, dann loest sich die ganze Seite in Blasen auf
 *  und die Startseite wird geladen.
 * Strg/Shift/Mittelklick, Tastatur und "Bewegung reduzieren" laden das Ziel sofort ohne Effekt. */
(function () {
  'use strict';
  var links = document.querySelectorAll('.site-title, .site-nav .page-link');
  if (!links.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var logo = null;   // das gerade kippende Glas

  var FARBEN = ['#7ccf4f', '#9be06b', '#b9f08f', '#a06cff', '#b98aff', '#cdb0ff', '#c9a24b', '#e8c46a'];
  var laeuft = false;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function wahl(a) { return a[Math.floor(Math.random() * a.length)]; }
  function blase(eltern, klasse, vars) {
    var e = document.createElement('div');
    e.className = 'heim-blase ' + klasse;
    Object.keys(vars).forEach(function (k) { e.style.setProperty(k, vars[k]); });
    eltern.appendChild(e);
  }

  function spielen(href, glas) {
    logo = glas;
    var r = logo.getBoundingClientRect();
    var mundX = r.left + r.width * 0.92, mundY = r.top + r.height * 0.8;   // Kolbenmuendung nach dem Kippen (ungefaehr)
    var ebene = document.createElement('div'), i;
    ebene.className = 'heim-ebene';
    document.body.appendChild(ebene);
    laeuft = true;
    document.documentElement.classList.add('heim-laeuft');

    // 1) Kolben hebt sich und kippt (CSS, 0,7 s)
    logo.classList.add('heim-kippen');

    // 2) Strahl Gebraeu fliesst heraus
    setTimeout(function () {
      for (i = 0; i < 26; i++) {
        blase(ebene, 'heim-tropfen', {
          left: (mundX + rnd(-3, 3)).toFixed(0) + 'px', top: (mundY + rnd(-2, 2)).toFixed(0) + 'px',
          '--z': rnd(5, 10).toFixed(1) + 'px', '--c': wahl(FARBEN.slice(0, 3)),
          '--dx': rnd(8, 30).toFixed(0) + 'px', '--dy': rnd(90, 190).toFixed(0) + 'px',
          '--dur': rnd(.5, .8).toFixed(2) + 's', '--del': (i * 0.03).toFixed(2) + 's'
        });
      }
    }, 600);

    // 3) die ganze Seite geht in Blasen auf
    setTimeout(function () {
      document.documentElement.classList.add('heim-weg');
      var n = Math.min(220, Math.round(window.innerWidth * window.innerHeight / 6500));
      for (i = 0; i < n; i++) {
        blase(ebene, 'heim-steig', {
          left: rnd(0, 100).toFixed(1) + 'vw', top: rnd(5, 105).toFixed(1) + 'vh',
          '--z': rnd(8, 34).toFixed(1) + 'px', '--c': wahl(FARBEN),
          '--dx': rnd(-50, 50).toFixed(0) + 'px', '--dy': rnd(-320, -90).toFixed(0) + 'px',
          '--dur': rnd(.9, 1.5).toFixed(2) + 's', '--del': rnd(0, .6).toFixed(2) + 's'
        });
      }
    }, 1150);

    setTimeout(function () { window.location.href = href; }, 2500);
  }

  links.forEach(function (a) {
    var glas = a.querySelector('.logo, .glas');
    if (!glas) return;
    a.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (laeuft || e.detail === 0) return;   // detail 0 = Tastatur
      e.preventDefault();
      spielen(a.href, glas);
    });
  });

  // Zurueck-Taste: Seite wieder heil machen
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted && !laeuft) return;
    laeuft = false;
    document.documentElement.classList.remove('heim-laeuft', 'heim-weg');
    if (logo) logo.classList.remove('heim-kippen');
    document.querySelectorAll('.heim-ebene').forEach(function (n) { n.remove(); });
  });
})();

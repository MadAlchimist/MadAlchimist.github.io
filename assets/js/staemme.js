/* Interaktive Stammbaeume (Schriftrollen): auf-/zuklappen, Marker ein/aus und eine
 * kurze Zaehlung je Baum (Ebenen, Spuren dokumentierter Zuchtarbeit, Unbekanntes).
 * Ohne JavaScript bleiben alle Aeste offen und sind per <details> trotzdem klickbar. */
(function () {
  'use strict';

  function ebene(li, wurzel) {
    var d = 0, e = li;
    while (e && e !== wurzel) { if (e.tagName === 'LI' && e.classList.contains('kn')) d++; e = e.parentElement; }
    return d;
  }

  function statistik(baum) {
    var knoten = baum.querySelectorAll('li.kn'), tiefe = 0, spuren = 0, unbekannt = 0, weiter = false;
    knoten.forEach(function (li) {
      var d = ebene(li, baum);
      if (d > tiefe) tiefe = d;
      if (li.hasAttribute('data-spur')) spuren++;
      if (li.hasAttribute('data-unb')) unbekannt++;
      if (li.querySelector(':scope > .kn-zeile .kn-mehr, :scope > details > summary .kn-mehr')) weiter = true;
    });
    var ziel = baum.querySelector('.baum-stat');
    ziel.innerHTML = '';
    [['Ebenen', (weiter ? 'mind. ' : '') + tiefe], ['Zuchtspuren', spuren], ['Unbekannt', unbekannt]].forEach(function (p) {
      var s = document.createElement('span');
      s.innerHTML = p[0] + ' <b>' + p[1] + '</b>';
      ziel.appendChild(s);
    });
  }

  function zuklappen(baum) {
    baum.querySelectorAll('details').forEach(function (d) {
      var li = d.parentElement;
      if (ebene(li, baum) >= 3) d.removeAttribute('open'); else d.setAttribute('open', '');
    });
  }

  document.querySelectorAll('.stammvergleich').forEach(function (box) {
    var baeume = box.querySelectorAll('.baum');
    baeume.forEach(function (b) { statistik(b); zuklappen(b); });

    box.querySelectorAll('[data-aktion]').forEach(function (knopf) {
      knopf.addEventListener('click', function () {
        baeume.forEach(function (b) {
          if (knopf.dataset.aktion === 'auf') b.querySelectorAll('details').forEach(function (d) { d.setAttribute('open', ''); });
          else zuklappen(b);
        });
      });
    });

    var cb = box.querySelector('.sv-marken input');
    cb.addEventListener('change', function () { box.classList.toggle('marken-aus', !cb.checked); });
  });
})();

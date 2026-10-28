/* Kontaktadresse auf der Canalyze-Seite: die Adresse steht im HTML nur rueckwaerts
 * und wird erst beim Klick zusammengesetzt (Schutz vor Spam-Robotern). */
(function () {
  'use strict';
  var knopf = document.getElementById('kontakt-knopf'), box = document.getElementById('kontakt-box');
  var link = document.getElementById('kontakt-adresse'), kopieren = document.getElementById('kontakt-kopieren'), ok = document.getElementById('kontakt-ok');
  if (!knopf || !box || !link) return;

  var adresse = null;
  function setzen() {
    if (adresse) return;
    adresse = link.getAttribute('data-a').split('').reverse().join('');
    link.textContent = adresse;
    link.setAttribute('href', 'mailto:' + adresse);
  }
  knopf.addEventListener('click', function () {
    var offen = box.hidden;
    if (offen) setzen();
    box.hidden = !offen;
    knopf.setAttribute('aria-expanded', String(offen));
  });
  kopieren.addEventListener('click', function () {
    setzen();
    var fertig = function () { ok.textContent = '✓ kopiert'; setTimeout(function () { ok.textContent = ''; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(adresse).then(fertig, function () {});
    else { var t = document.createElement('textarea'); t.value = adresse; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); fertig(); } catch (e) {} document.body.removeChild(t); }
  });
})();

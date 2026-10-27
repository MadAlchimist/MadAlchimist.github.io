---
layout: page
title: Funde, Fehlschläge & Skurriles
permalink: /funde/
---

Fehler, Highlights und Skurriles aus meinen Grows, jeweils mit Foto und
Einordnung. Die vollständigen Aufzeichnungen bleiben privat – hier steht nur,
was ich daraus gelernt habe.

<div class="filter">
  <button type="button" data-typ="alle">Alle</button>
  <button type="button" data-typ="fehler">Fehler</button>
  <button type="button" data-typ="highlight">Highlights</button>
  <button type="button" data-typ="skurril">Skurriles</button>
</div>

<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <filter id="goo" x="-5%" y="-5%" width="110%" height="420%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b"/>
    <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="g"/>
    <feComposite in="SourceGraphic" in2="g" operator="in"/>
  </filter>
</svg>

<ul class="karten karten-fx">
{% assign faelle = site.lernkurve | sort: "datum" | reverse %}
{% for fall in faelle %}{% include fall-karte.html fall=fall %}{% endfor %}
</ul>

<script>
document.querySelectorAll('.filter button').forEach(function (b) {
  b.addEventListener('click', function () {
    document.querySelectorAll('.karten .karte').forEach(function (li) {
      li.hidden = b.dataset.typ !== 'alle' && li.dataset.typ !== b.dataset.typ;
    });
  });
});
</script>

<script src="{{ '/assets/js/karten-fx.js' | relative_url }}"></script>

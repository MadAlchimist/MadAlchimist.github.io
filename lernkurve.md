---
layout: page
title: Lernkurve
permalink: /lernkurve/
---

Fehler und Highlights aus meinen Grows, jeweils mit Foto, Ursache und
Konsequenz. Die vollständigen Aufzeichnungen bleiben privat – hier steht nur,
was ich daraus gelernt habe.

<div class="filter">
  <button type="button" data-typ="alle">Alle</button>
  <button type="button" data-typ="fehler">Fehler</button>
  <button type="button" data-typ="highlight">Highlights</button>
</div>

<ul class="karten">
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

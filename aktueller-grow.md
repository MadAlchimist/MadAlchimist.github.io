---
layout: page
title: Aktueller Grow
permalink: /aktueller-grow/
---

Der laufende Durchgang, direkt aus [**Canalyze**]({{ '/canalyze/' | relative_url }}),
meinem selbst gebauten Grow-Analyse-Tool. Zu Beginn siehst du Klima und Fotos. Über die Ebenen lassen
sich Gießen, Zusätze und Ereignisse dazuschalten, Pflanzen ein- und ausblenden
und der Zeitraum eingrenzen.

<div id="grow" data-basis="{{ '/assets/canalyze_export/' | relative_url }}">
  <p class="grow-laden">Lade Daten aus Canalyze …</p>
</div>

<noscript><p>Für die interaktive Ansicht wird JavaScript benötigt.</p></noscript>

<ul id="grow-fotos" hidden>
{%- for f in site.static_files -%}
  {%- if f.path contains '/assets/aktueller-grow/' and f.extname == '.jpg' -%}
    {%- unless f.path contains '/thumbs/' -%}<li data-src="{{ f.path | relative_url }}"></li>{%- endunless -%}
  {%- endif -%}
{%- endfor -%}
</ul>

<script src="{{ '/assets/vendor/chart.umd.js' | relative_url }}"></script>
<script src="{{ '/assets/js/grow.js' | relative_url }}"></script>

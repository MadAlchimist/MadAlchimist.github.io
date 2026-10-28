---
layout: page
title: Aktueller Grow
permalink: /aktueller-grow/
---

Der laufende Durchgang, direkt aus [**Canalyze**]({{ '/canalyze/' | relative_url }}),
meinem selbst gebauten Grow-Analyse-Tool. Zu Beginn siehst du Klima und Fotos. Über die Ebenen lassen
sich Gießen, Zusätze und Ereignisse dazuschalten, Pflanzen ein- und ausblenden
und der Zeitraum eingrenzen.

## Was bisher geschah

Ich habe, wie eigentlich immer, zu früh begonnen, Canna Terra Vega zuzugeben. Die vorgedüngte Erde war noch gar nicht ganz durchwurzelt.
Beim ersten Gießen mit Drain hatte ich dann einen EC von 2,8 bis 3,2 (am 21./22.09.2026). Da ich nicht sofort darauf geschlossen habe,
gabs beim nächsten Gießen noch mal Lösung mit EC 1 (Zombie) bzw. 1,4 (Skywalker Kush, K-MintZ). Die Pflanzen standen kurz vor dem Lockout.
Danach hab ich einmal auf gesunden EC geflusht. Seitdem habe ich einen sehr gesunden und aktiven Stoffwechsel bei allen Pflanzen.
Alle haben sich wunderbar erholt und sehen super aus.

Die genaue Dokumentation von EC und pH in der Lösung und im Drain hat es mir erheblich leichter gemacht, auf den drohenden Lockout zu reagieren.

**Tipp:** Schalte in der Ansicht unten die Ebene **EC** ein. Dann siehst du die Spitze im Drain Ende September und wie sie nach dem Spülen wieder sinkt.

*Zu den Namen: Die „Skywalker OG“ ist eine Skywalker Kush. Keine Ahnung, warum ich da OG geschrieben habe. So heißt sie auch in meiner Software.* :D

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

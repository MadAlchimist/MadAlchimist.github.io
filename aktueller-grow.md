---
layout: page
title: Aktueller Grow
permalink: /aktueller-grow/
---

Der laufende Durchgang, direkt aus [**Canalyze**]({{ '/canalyze/' | relative_url }}),
meinem selbst gebauten Grow-Analyse-Tool. Zu Beginn siehst du Klima und Fotos. Über die Ebenen lassen
sich Gießen, Zusätze und Ereignisse dazuschalten, Pflanzen ein- und ausblenden
und der Zeitraum eingrenzen.

## Logbuch

<div class="logbuch-leiste">
  <button type="button" class="pille" data-lb="auf">Alle aufklappen</button>
  <button type="button" class="pille" data-lb="zu">Alle zuklappen</button>
</div>

<details class="eintrag" open markdown="1">
<summary><span class="datum">10.11.2026</span> Aktueller Stand</summary>

Der PK13/14 Boost ist durch. Insgesamt habe ich 3x PK hinzugegeben. Der Boden ist gut gesättigt und die Pflanzen harzen regelrecht zu. Die Skywalker-Kush legt eine bemerkenswerte Öligkeit an den Tag.
Der EC ist nun bei K-MintZ und Skywalker im Drain höher als der Input EC. Das liegt zum Teil an der relativ langen Trockenperiode von fast 4 Tagen jetzt.
Beim nächsten Gießen gehe ich hier auf 1,3 beim Input herunter und werde den Abstand auf 2 Tage reduzieren. Bei der Zombie-Kush ist alles bestens in Balance. Sie ist etwas genügsamer als die anderen, harzt auch nicht so. Sie baut aber massives Volumen auf.

Die Bilder sprechen auf jeden Fall für gesunde Pflanzen. Das präzise EC-Management mit EC im Drain unter 2,0 ist sehr sehr vorsichtig und niedrig gefahren.

</details>

<details class="eintrag" markdown="1">
<summary><span class="datum">30.10.2026</span> Verbrannte Spitzen und der PK-Boost</summary>

Die Skywalker OG/Kush zeigt verbrannte Spitzen an einigen Blättern. Daher habe ich beschlossen, den EC-Input hier auf das Niveau der Zombie-Kush (1,6) zu senken.

Die genaue Dokumentation von EC und pH in der Lösung und im Drain hat es mir erheblich leichter gemacht, auf den drohenden Lockout und die Ursache für die verbrannten Spitzen zu reagieren.

Weiter habe ich beim letzten Gießen mit dem PK13/14 Boost begonnen (1mL/L)

</details>

<details class="eintrag" markdown="1">
<summary><span class="datum">21./22.09.2026</span> Zu früh gedüngt: der EC-Peak im Drain</summary>

Ich habe, wie eigentlich immer, zu früh begonnen, Canna Terra Vega zuzugeben. Die vorgedüngte Erde war noch gar nicht ganz durchwurzelt.
Beim ersten Gießen mit Drain hatte ich dann einen EC von 2,8 bis 3,2 (am 21./22.09.2026). Da ich nicht sofort darauf geschlossen habe,
gabs beim nächsten Gießen noch mal Lösung mit EC 1 (Zombie) bzw. 1,4 (Skywalker Kush, K-MintZ). Die Pflanzen standen kurz vor dem Lockout.
Danach hab ich einmal auf gesunden EC geflusht. Seitdem habe ich einen sehr gesunden und aktiven Stoffwechsel bei allen Pflanzen.
Alle haben sich wunderbar erholt und sehen super aus.

</details>

<script>
document.querySelectorAll('[data-lb]').forEach(function (b) {
  b.addEventListener('click', function () {
    document.querySelectorAll('details.eintrag').forEach(function (d) { d.open = b.dataset.lb === 'auf'; });
  });
});
</script>

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

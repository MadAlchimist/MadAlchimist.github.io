---
layout: default
---
<section class="hero">
  <div class="hero-cog">{% include cog.html %}</div>
  {% include logo.html class="hero-logo" %}
  <h1>{{ site.title }}</h1>
  <p>Fehler, Funde und Formeln – von handschriftlichen Notizen zu Canalyze.</p>
</section>

<div class="tafeln start">
  <a class="tafel" href="{{ '/funde/' | relative_url }}"><strong>Funde, Fehlschläge &amp; Skurriles</strong><span>Kurze Fälle mit Foto: was schiefging, was glänzte und was einfach skurril war.</span></a>
  <a class="tafel" href="{{ '/bibliothek/' | relative_url }}"><strong>Bibliothek</strong><span>Zum Nachschlagen: Genetik, Glossar, Selektion und Nährstoffe.</span></a>
  <a class="tafel" href="{{ '/schriftrollen/' | relative_url }}"><strong>Schriftrollen</strong><span>Längere Beiträge zu Genetik und Zucht, mit interaktiven Stammbäumen.</span></a>
  <a class="tafel" href="{{ '/labor/' | relative_url }}"><strong>Labor</strong><span>Mein Setup und wer hier experimentiert.</span></a>
  <a class="tafel" href="{{ '/aktueller-grow/' | relative_url }}"><strong>Aktueller Grow</strong><span>Live aus Canalyze, meinem Analyse-Tool.</span></a>
</div>

<div class="zierlinie">{% include blatt.html %}</div>

<h2>Aus der Werkstatt</h2>

<section class="canalyze-banner">
  <div>
    <h3>Canalyze</h3>
    <p>Mein selbst gebautes Grow-Analyse-Tool: läuft komplett lokal auf meinem PC, ohne Cloud, mit Dashboard, Stammbaum und Boden-Frühwarnsystem.</p>
    <a class="knopf" href="{{ '/canalyze/' | relative_url }}">Mehr zu Canalyze</a>
  </div>
  <a class="cb-bild" href="{{ '/canalyze/' | relative_url }}"><img src="{{ '/assets/canalyze/dashboard.png' | relative_url }}" alt="Canalyze: Dashboard mit Klimaverlauf und Boden-Status" loading="lazy"></a>
</section>

<h2>Frisch aus dem Kessel</h2>
<ul class="karten">
{% assign faelle = site.lernkurve | sort: "datum" | reverse %}
{% for fall in faelle limit: 3 %}{% include fall-karte.html fall=fall %}{% endfor %}
</ul>

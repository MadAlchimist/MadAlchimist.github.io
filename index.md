---
layout: default
---
<section class="hero">
  {% include logo.html class="hero-logo" %}
  <h1>{{ site.title }}</h1>
  <p>Fehler, Funde und Formeln – von handschriftlichen Notizen zu Canalyze.</p>
</section>

<div class="tafeln">
  <a class="tafel" href="{{ '/lernkurve/' | relative_url }}"><strong>Lernkurve</strong><span>Was schiefging, was glänzte und wie ich reagiert habe.</span></a>
  <a class="tafel" href="{{ '/archiv/' | relative_url }}"><strong>Archiv</strong><span>Sechs Jahre handschriftliche Datenerfassung.</span></a>
  <a class="tafel" href="{{ '/aktueller-grow/' | relative_url }}"><strong>Aktueller Grow</strong><span>Live aus Canalyze, meinem Analyse-Tool.</span></a>
</div>

<div class="zierlinie">✦</div>

<h2>Zuletzt im Labor</h2>
<ul class="karten">
{% assign faelle = site.lernkurve | sort: "datum" | reverse %}
{% for fall in faelle limit: 3 %}{% include fall-karte.html fall=fall %}{% endfor %}
</ul>

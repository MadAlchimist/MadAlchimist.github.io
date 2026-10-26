---
layout: default
---
<section class="hero">
  <div class="hero-cog">{% include cog.html %}</div>
  {% include logo.html class="hero-logo" %}
  <h1>{{ site.title }}</h1>
  <p>Fehler, Funde und Formeln – von handschriftlichen Notizen zu Canalyze.</p>
</section>

<div class="tafeln">
  <a class="tafel" href="{{ '/funde/' | relative_url }}"><strong>Funde &amp; Fehlschläge</strong><span>Was schiefging, was glänzte und wie ich reagiert habe.</span></a>
  <a class="tafel" href="{{ '/labor/' | relative_url }}"><strong>Labor</strong><span>Mein Setup und wer hier experimentiert.</span></a>
  <a class="tafel" href="{{ '/aktueller-grow/' | relative_url }}"><strong>Aktueller Grow</strong><span>Live aus Canalyze, meinem Analyse-Tool.</span></a>
</div>

<div class="zierlinie">{% include cog.html %}</div>

<h2>Frisch aus dem Kessel</h2>
<ul class="karten">
{% assign faelle = site.lernkurve | sort: "datum" | reverse %}
{% for fall in faelle limit: 3 %}{% include fall-karte.html fall=fall %}{% endfor %}
</ul>

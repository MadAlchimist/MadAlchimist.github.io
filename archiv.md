---
layout: page
title: Archiv
permalink: /archiv/
published: false   # erst auf true setzen (und in _config.yml unter header_pages eintragen), wenn Material da ist
---

Scans meiner handschriftlichen Datenerfassung und Fotos aus den letzten sechs
Jahren – chronologisch, damit sich die Entwicklung der Methodik nachvollziehen
lässt, bis hin zur digitalen Erfassung in Canalyze.

{% assign jahre = site.data.archiv | group_by: "jahr" | sort: "name" | reverse %}
{% for jahr in jahre %}
## {{ jahr.name }}
<div class="galerie">
  {% for eintrag in jahr.items %}
  <figure>
    <a href="{{ eintrag.datei | relative_url }}"><img src="{{ eintrag.datei | relative_url }}" alt="{{ eintrag.text }}" loading="lazy"></a>
    <figcaption>{{ eintrag.text }}</figcaption>
  </figure>
  {% endfor %}
</div>
{% else %}
*Noch keine Einträge.*
{% endfor %}

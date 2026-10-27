---
layout: page
title: Schriftrollen & verlorenes Wissen
menu_titel: Schriftrollen
permalink: /schriftrollen/
---

Längere Beiträge zu Genetik, Zucht und allem, was sich in einem Kurzfall nicht
erklären lässt.

<ul class="schrift-liste">
{% assign rollen = site.schriftrollen | sort: "datum" | reverse %}
{% for r in rollen %}
  <li class="schrift-karte">
    <a href="{{ r.url | relative_url }}">
      <span class="schrift-thema">{{ r.thema }}</span>
      <h3>{{ r.title }}</h3>
      <p>{{ r.untertitel }}</p>
    </a>
  </li>
{% endfor %}
</ul>

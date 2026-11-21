---
layout: page
title: Säulen der Zucht
menu_titel: Säulen
permalink: /saeulen/
---

Hinter fast jeder modernen Sorte stehen ein paar wenige Pflanzen, auf denen die
Zucht aufbaut. Hier stelle ich sie vor: woher sie kommen und was sie in der Zucht
leisten. Die Geschichte vieler
dieser Sorten ist lückenhaft oder umstritten, vieles ist Legende oder Mythos. Ich werde die Strains markieren mit "Myth or Legend" und "True History".
Diese Rubrik ist nie wirklich fertig und ich werde neue, moderne Säulen der Zucht hinzufügen. 

Aktuell befinde ich mich noch in der Recherche-Phase und habe nur erstmal die Säulen herausgearbeitet.
Die Artikel zu jedem einzelnen Strain werden folgen...


{% assign alle = site.saeulen | sort: "nr" %}
{% for st in site.data.saeulen.stufen %}
<section class="stufe">
  <h2 class="stufe-kopf"><span class="roemisch">{{ st.roemisch }}</span> {{ st.titel }}</h2>
  <p class="stufe-text">{{ st.text }}</p>
  <ul class="saeulen-liste">
  {%- for s in alle -%}{%- if s.stufe == st.nr -%}{% include saeule-karte.html saeule=s %}{%- endif -%}{%- endfor -%}
  </ul>
</section>
{% endfor %}

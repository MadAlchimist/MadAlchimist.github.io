---
layout: page
title: Bibliothek
permalink: /bibliothek/
---

Mein Wissensschatz rund um Genetik, Selektion und Nährstoffe, zusammengetragen
aus Fachbüchern und eigener Recherche. Das ist eine Lernsammlung und keine
Anbauanleitung.

<nav class="kapitel-nav" aria-label="Kapitel">
  <a href="#genetik">Genetik</a>
  <a href="#glossar">Glossar</a>
  <a href="#selektion">Selektion</a>
  <a href="#naehrstoffe">Nährstoffe</a>
  <a href="#quellen">Quellen</a>
</nav>

## Genetik: Kreuzungsstufen &amp; Mendel {#genetik}

<div class="tabelle-scroll">
<table class="wissen-tabelle">
  <thead><tr><th>Generation</th><th>Kreuzung</th><th>Mendel-Regel</th><th>Lernfokus</th></tr></thead>
  <tbody>
  {% for s in site.data.bibliothek.mendel.stufen %}
    <tr><td data-label="Generation"><strong>{{ s.stufe }}</strong></td><td data-label="Kreuzung">{{ s.kreuzung }}</td><td data-label="Mendel-Regel">{{ s.regel }}</td><td data-label="Lernfokus">{{ s.fokus }}</td></tr>
  {% endfor %}
  </tbody>
</table>
</div>

### Merkmale, die ich beobachte

<div class="tabelle-scroll">
<table class="wissen-tabelle">
  <thead><tr><th>Phase</th><th>Merkmal</th><th>Beobachtungswert (Score 1–5)</th><th>Warum das wichtig ist</th></tr></thead>
  <tbody>
  {% for m in site.data.bibliothek.mendel.merkmale %}
    <tr><td data-label="Phase"><strong>{{ m.phase }}</strong></td><td data-label="Merkmal">{{ m.merkmal }}</td><td data-label="Beobachtungswert">{{ m.wert }}</td><td data-label="Warum wichtig">{{ m.warum }}</td></tr>
  {% endfor %}
  </tbody>
</table>
</div>

## Glossar {#glossar}

<div class="suche">
  <label for="glossar-suche" class="sr-only">Glossar durchsuchen</label>
  <input id="glossar-suche" type="search" placeholder="Begriff suchen …" autocomplete="off">
  <span id="glossar-leer" hidden>Kein Begriff gefunden.</span>
</div>

<div class="wissen-raster" id="glossar-liste">
{% for g in site.data.bibliothek.glossar %}
  <article class="wissen-karte gl-item">
    <h3>{{ g.begriff }}{% if g.kuerzel %} <span class="kuerzel">{{ g.kuerzel }}</span>{% endif %}</h3>
    <p>{{ g.text }}</p>
  </article>
{% endfor %}
</div>

## Selektion: Beobachtungstechniken {#selektion}

Woran ich Pflanzen in der Auswahl messe, und was es für die nächste Generation
bedeutet.

{% for gruppe in site.data.bibliothek.selektion %}
<h3 class="gruppe"><span class="roemisch">{% case forloop.index %}{% when 1 %}I{% when 2 %}II{% when 3 %}III{% else %}{{ forloop.index }}{% endcase %}</span> {{ gruppe.titel }}</h3>
<div class="wissen-raster">
  {% for t in gruppe.techniken %}
  <article class="wissen-karte">
    <h4>{{ t.name }}</h4>
    <dl>
      <dt>So geht's</dt><dd>{{ t.durchfuehrung }}</dd>
      <dt>Worauf achten</dt><dd>{{ t.suche }}</dd>
      <dt>Bedeutung für die F1</dt><dd>{{ t.bedeutung }}</dd>
    </dl>
  </article>
  {% endfor %}
</div>
{% endfor %}

## Nährstoffe {#naehrstoffe}

Jedes Element mit seiner Hauptaufgabe. <span class="chip antag">Antagonisten</span>
blockieren bei Überschuss, <span class="chip syn">Synergisten</span> fördern
die Aufnahme.

{% for gruppe in site.data.bibliothek.naehrstoffe %}
<h3 class="gruppe">{{ gruppe.gruppe }}</h3>
<div class="wissen-raster">
  {% for n in gruppe.eintraege %}
  <article class="wissen-karte nkarte">
    <div class="nkopf">
      <span class="symbol">{{ n.symbol }}</span>
      <h4>{{ n.name }}</h4>
    </div>
    <p>{{ n.funktion }}</p>
    {% if n.antagonisten.size > 0 %}<p class="chips"><span class="chiptitel">Antagonisten</span> {% for a in n.antagonisten %}<span class="chip antag">{{ a }}</span>{% endfor %}</p>{% endif %}
    {% if n.synergisten.size > 0 %}<p class="chips"><span class="chiptitel">Synergisten</span> {% for s in n.synergisten %}<span class="chip syn">{{ s }}</span>{% endfor %}</p>{% endif %}
  </article>
  {% endfor %}
</div>
{% endfor %}

## Quellen {#quellen}

Gelernt habe ich aus diesen Büchern, dazu aus eigener Recherche im Netz und aus
eigenen Beobachtungen:

<ul class="quellen">
{% for q in site.data.bibliothek.quellen %}
  <li><strong>{{ q.titel }}</strong><br><span class="meta">{{ q.autor }} · {{ q.verlag }}</span></li>
{% endfor %}
</ul>

<script>
(function () {
  var feld = document.getElementById('glossar-suche');
  var leer = document.getElementById('glossar-leer');
  var karten = document.querySelectorAll('#glossar-liste .gl-item');
  feld.addEventListener('input', function () {
    var q = feld.value.trim().toLowerCase(), treffer = 0;
    karten.forEach(function (k) {
      var passt = !q || k.textContent.toLowerCase().indexOf(q) !== -1;
      k.hidden = !passt; if (passt) treffer++;
    });
    leer.hidden = treffer > 0;
  });
})();
</script>

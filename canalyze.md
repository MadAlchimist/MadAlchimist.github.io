---
layout: page
title: Canalyze
permalink: /canalyze/
---

Seit diesem Sommer dokumentiere ich meine Grows nicht mehr in Excel,
sondern in einem Tool, das ich selbst gebaut habe: **Canalyze**. Es läuft
komplett lokal auf meinem PC, kommt ohne Cloud-Zwang aus und wächst seit Monaten
weiter.

## Dashboard – Überblick auf einen Blick

<figure class="shot"><a href="{{ '/assets/canalyze/dashboard.png' | relative_url }}"><img src="{{ '/assets/canalyze/dashboard.png' | relative_url }}" alt="Canalyze: Dashboard" loading="lazy"></a></figure>

Pflanzenanzahl, aktive Zelte, Gieß-Einträge und der Klimaverlauf der letzten
Wochen – dazu der Boden-Status aller Pflanzen in Ampelfarben.

## Zelte & Klima

<figure class="shot"><a href="{{ '/assets/canalyze/zelte.png' | relative_url }}"><img src="{{ '/assets/canalyze/zelte.png' | relative_url }}" alt="Canalyze: Zelte" loading="lazy"></a></figure>

Temperatur, Luftfeuchtigkeit und Lichtzyklus werden pro Zelt und Tag erfasst
und automatisch allen Pflanzen zugeordnet, die zu dem Zeitpunkt dort stehen.
VPD wird live mitberechnet.

## Pflanzen-Bibliothek

<figure class="shot"><a href="{{ '/assets/canalyze/pflanzen.png' | relative_url }}"><img src="{{ '/assets/canalyze/pflanzen.png' | relative_url }}" alt="Canalyze: Pflanzen" loading="lazy"></a></figure>

Dünger, Drain, Bewertungen (Vigor, Harzbesatz, Mängel …) und Historie pro
Pflanze – inklusive Generations-Kennzeichnung (P, F1, F2, S1, BX1 …) für
alles, was aus eigenen Kreuzungen stammt.

## Stammbaum

<figure class="shot"><a href="{{ '/assets/canalyze/stammbaum.png' | relative_url }}"><img src="{{ '/assets/canalyze/stammbaum.png' | relative_url }}" alt="Canalyze: Stammbaum" loading="lazy"></a></figure>

Eigene Kreuzungen, Klone und Rückkreuzungen als interaktive Grafik – wer von
wem abstammt, auf einen Blick statt in einer Tabelle gesucht.

## Boden-Frühwarnsystem

<figure class="shot"><a href="{{ '/assets/canalyze/boden.png' | relative_url }}"><img src="{{ '/assets/canalyze/boden.png' | relative_url }}" alt="Canalyze: Boden-Ampel" loading="lazy"></a></figure>

Das Feature, auf das ich am meisten stolz bin: Canalyze beobachtet den
Drain-pH über die Zeit und schlägt frühzeitig Alarm (Ampel Rot/Gelb/Grün),
wenn der Boden abdriftet oder seine Pufferwirkung verliert – inklusive
Prognose, wann der Zielbereich voraussichtlich verlassen wird. Kein
zusätzliches Messgerät nötig, die Daten fallen beim normalen Gießen ohnehin
an.

## Technisch

- **Python** mit **PySide6 (Qt)** für die Oberfläche
- Daten liegen lokal in **SQLite**, verschlüsselt (Fernet) – nichts verlässt
  den eigenen Rechner ohne dass ich es explizit exportiere
- Mit **Nuitka** zu einer eigenständigen Windows-.exe kompiliert, kein
  Python-Setup für die Nutzung nötig

## Mehr erfahren

Die vollständige Anleitung gibt es im Handbuch.

<div class="canalyze-aktionen">
  <a class="knopf" href="{{ '/canalyze/handbuch/' | relative_url }}">Zum Handbuch →</a>
  <button type="button" class="knopf leise" id="kontakt-knopf" aria-expanded="false" aria-controls="kontakt-box">Kontakt aufnehmen</button>
</div>

<div class="kontakt-box" id="kontakt-box" hidden>
  <p>Bei Interesse am Projekt Canalyze und Mad Alchimist könnt ihr mich über diese Mail-Adresse anonym kontaktieren. Ein Nickname oder Alias reicht.</p>
  <p class="kontakt-zeile">
    <a id="kontakt-adresse" href="#" data-a="{{ site.data.kontakt.adresse | split: '' | reverse | join: '' }}"></a>
    <button type="button" class="pille" id="kontakt-kopieren">Kopieren</button>
    <span id="kontakt-ok" class="kontakt-ok" aria-live="polite"></span>
  </p>
</div>
<noscript><p>Für die Kontaktadresse wird JavaScript benötigt.</p></noscript>

<script src="{{ '/assets/js/kontakt.js' | relative_url }}"></script>

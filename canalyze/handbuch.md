---
layout: handbuch
noindex: true
title: Handbuch
permalink: /canalyze/handbuch/
---

Diese Anleitung erklärt die Bedienung der App. Über **Hilfe → Über Canalyze**
findest du Versionsnummer und weitere technische Angaben.

## Erster Start

Beim allerersten Start legst du ein Konto an: Benutzername, Passwort und ein
zweites Mal zur Bestätigung. Danach bekommst du einen **Notfall-Code**
angezeigt – notier ihn sofort an einem sicheren Ort (mehr dazu im nächsten
Abschnitt).

Direkt danach führt dich ein kurzer **Einrichtungsassistent** durch ein paar
Fragen zu deiner Erfahrung und deinem Anbau und richtet passend dazu die
Ansicht ein (siehe „Ansicht anpassen" weiter unten). Jede Seite hat einen
Überspringen-Knopf – dann gilt automatisch die Stufe „Fortgeschritten".

## Sicherheit: Wie deine Daten geschützt sind

Dieser Abschnitt erklärt die Verschlüsselung in Canalyze ohne Fachchinesisch
– auch wenn dich Computer-Sicherheit sonst nicht näher interessiert, lohnt
sich das Lesen, bevor du anfängst.

### Was bedeutet „verschlüsselt"?

Stell dir deine Datenbank-Datei wie ein Notizbuch vor, in dem alle deine
Grow-Daten stehen. Verschlüsselung verwandelt den Inhalt in einen Wirrwarr
aus Zeichen, den niemand lesen kann, ohne den passenden Schlüssel zu haben.

Solange Canalyze geöffnet ist, liegt die Datei „aufgeschlagen" (lesbar) vor.
**Sobald du das Programm beendest, wird sie automatisch wieder verschlüsselt**
– du musst nichts dafür tun. Selbst wenn Canalyze abstürzt, bleibt die Datei
entweder lesbar oder verschlüsselt, nie halb-kaputt.

### Wofür ist das gut?

Falls dein Rechner gestohlen wird, verloren geht oder von mehreren Personen
genutzt wird, kann niemand die Datei einfach öffnen und deine Daten lesen –
auch nicht, wenn er sie kopiert und auf einem anderen Gerät ansieht.

### Dein Passwort und der Notfall-Code

Beim ersten Start legst du ein Passwort fest. Aus diesem Passwort **und**
einer eindeutigen technischen Kennung deines PCs berechnet Canalyze den
eigentlichen „Tresorschlüssel". Dein Passwort selbst wird nirgendwo
gespeichert – nur ein damit verschlossener „Umschlag", der sich ausschließlich
mit dem richtigen Passwort wieder öffnen lässt.

Damit ein vergessenes Passwort dich nicht komplett aussperrt, bekommst du
beim ersten Start **einmalig** einen Notfall-Code angezeigt (z. B.
`A1B2-C3D4-E5F6`). Er funktioniert wie ein zweiter Schlüssel zum selben
Tresor. **Schreib ihn dir sofort auf und bewahre ihn sicher auf** – zum
Beispiel in einem Passwort-Manager oder ausgedruckt an einem sicheren Ort.
Er wird dir kein zweites Mal angezeigt. Passwort vergessen? Beim Login auf
„Passwort vergessen?" klicken und den Notfall-Code eingeben.

### Wichtige Einschränkung: an diesen PC gebunden

Sowohl dein Passwort als auch der Notfall-Code sind zusätzlich an **diesen
einen Computer** gekoppelt (über eine technische Kennung, die Windows jedem
PC vergibt). Das bedeutet konkret:

- Weder Passwort noch Notfall-Code funktionieren auf einem **anderen PC**
  oder nach einer **Windows-Neuinstallation** – die Kennung ändert sich
  dabei, der Tresorschlüssel lässt sich dann nicht mehr berechnen.
- **Bevor du den PC wechselst oder Windows neu installierst, exportiere
  unbedingt ein Backup** (Datei → Backup exportieren…, siehe „Daten
  sichern"). Ein Backup ist eine ganz normale, unverschlüsselte Kopie deiner
  Datenbank, die sich auf jedem neuen PC ohne Passwort wieder importieren
  lässt.

### Kurz zusammengefasst

- Deine Daten sind auf der Festplatte nie im Klartext lesbar, außer während
  Canalyze läuft.
- Passwort vergessen → Notfall-Code verwenden.
- Notfall-Code **und** Passwort verloren, oder PC gewechselt ohne vorheriges
  Backup → die Daten sind nicht wiederherstellbar. Deshalb: Notfall-Code
  aufschreiben, vor größeren Umzügen ein Backup exportieren.

## Ansicht anpassen: Einsteiger, Fortgeschritten, Profi

Canalyze kann sehr viele Werte erfassen – mehr, als am Anfang jeder braucht.
Deshalb gibt es drei Ansichtsstufen, die bestimmen, welche Felder, Tabs und
Auswertungen sichtbar sind:

| Stufe | Zusätzlich sichtbar |
|---|---|
| **Einsteiger** | Nur das Nötigste: Temperatur/Luftfeuchtigkeit tagsüber, Gießen, Basis-Analyse |
| **Fortgeschritten** | Zusätzlich: Nachtwerte, Lichtstärke, pH/EC beim Gießen, Dünger-Zusätze |
| **Profi** | Alles: zusätzlich Zelt-Fläche, Drain-Erfassung, EC-Empfehlung, Stammbaum, Boden-Frühwarnsystem |

Die Ansicht lässt sich jederzeit über das Menü **Ansicht** ändern:

- Direkt auf eine Stufe wechseln (wirkt sofort, ohne Neustart).
- **Ansicht anpassen…** öffnet einen Dialog, in dem sich einzelne Bereiche
  unabhängig von der Stufe an- und abschalten lassen – zum Beispiel „ich bin
  Einsteiger, will aber die Drain-Werte sehen". Weicht die Auswahl von allen
  drei Presets ab, heißt die Stufe **Benutzerdefiniert**. Manche Bereiche
  hängen von anderen ab (z. B. braucht Drain die Gieß-EC-Erfassung) – das
  übernimmt der Dialog automatisch.
- **Einrichtungsassistent erneut starten** – falls du noch einmal von vorn
  durch die Fragen willst.

Wurden durch eine Änderung neue Felder sichtbar, bekommt der betroffene
Menüpunkt in der Navigation links kurz einen Hinweis (z. B. „Pflanzen ·
2 neu"), bis du die Seite einmal besuchst.

**Wichtig:** Ausblenden heißt nie löschen – ausgeblendete Werte bleiben in
der Datenbank erhalten und tauchen wieder auf, sobald du die Ansicht änderst.
Backups enthalten immer alle Daten, unabhängig von der aktuellen Ansicht.

## Dashboard

Der Startbildschirm zeigt eine Kurzübersicht: Anzahl Pflanzen, wie viele
davon in Blüte sind, Anzahl Zelte, Anzahl Gieß-Einträge – und, sobald das
Boden-Frühwarnsystem aktiv ist, eine Kachel **Boden-Status** mit der Anzahl
Pflanzen je Ampelfarbe. Ein Klick auf eine Farbe wechselt zur Pflanzen-Seite
und filtert die Bibliothek auf genau diese Ampelfarbe („Filter aufheben"
zeigt wieder alle).

Darunter der Klimaverlauf der zuletzt erfassten Zelte als Diagramm.

## Zelte

Links die Liste deiner Zelte mit Fläche (m²) und Lichtleistung (W/m²).
„Zelt anlegen" öffnet einen Dialog für Name, Maße und Beleuchtung.

Rechts die **Umwelt-Erfassung**: Klimawerte (Temperatur, Luftfeuchtigkeit,
Licht) werden **pro Zelt und Tag** eingegeben, nicht pro Pflanze – sie
gelten automatisch für alle Pflanzen, die zu diesem Zeitpunkt in dem Zelt
stehen. Der VPD-Wert wird aus Temperatur und Luftfeuchtigkeit automatisch
berechnet und live angezeigt.

Darunter der **Klima-Verlauf** als Liste aller bisher erfassten Tage für
das gewählte Zelt. Ein Eintrag anklicken lädt ihn ins Formular zurück
(auch das Datum) – Werte korrigieren und „Änderung speichern" ersetzt den
bestehenden Eintrag, statt einen doppelten anzulegen. „Ausgewählten
Eintrag löschen" entfernt ihn ganz.

## Pflanzen

Links die Bibliothek aller Pflanzen. Mit **Strg-Klick** oder **Shift-Klick**
lassen sich mehrere gleichzeitig markieren. Zwei zusätzliche Spalten zeigen
(sofern aktiviert) die **Generation** („Gen.", z. B. F1 – siehe Stammbaum)
und die **Boden-Ampel** der jeweiligen Pflanze.

„Neue Pflanze" fragt neben den Stammdaten auch die **Herkunft** ab:
gekauft, Klon von einer bestehenden Pflanze, oder – mit aktiviertem
Stammbaum-Modul – aus einer eigenen Kreuzungs-Charge (siehe Stammbaum).
„Kreuzung verwalten…" öffnet dort die Verwaltung für Pollen, Kreuzungen und
Saatgut-Chargen.

Rechts die Erfassung in mehreren Reitern:

- **Dünger** – Datum, Menge, pH, EC und bis zu sechs Zusätze. Kann für
  **mehrere markierte Pflanzen gleichzeitig** gespeichert werden (z. B.
  wenn alle Pflanzen eines Zelts denselben Dünger bekommen).
- **Drain** – Menge, EC und pH des Ablaufs aus dem Topf. Braucht **genau
  eine** markierte Pflanze, da der Drain je Topf unterschiedlich ist. Er
  wird automatisch an den Gieß-Eintrag desselben Tages angehängt.
- **Merkmale** – Bewertung (Vigor, Struktur, Blütenstruktur, Harzbesatz
  usw.), Geschlecht und Favorit (nur mit aktiviertem Genetik-Modul), sowie
  Blüte-Start-Datum, Erntedatum, **Defoliert** und **Getoppt** als
  Trainingsmaßnahmen – diese vier sind immer sichtbar, unabhängig von der
  Ansichtsstufe, weil sie zum normalen Grow-Alltag gehören. Ebenfalls
  **genau eine** Pflanze – die Bewertung jeder einzelnen Pflanze ist für
  aussagekräftige Auswertungen wichtig.
- **Historie** – bisherige Merkmale- und Gieß-/Drain-Einträge, markierte
  Zeilen lassen sich löschen.
- **Abstammung** *(neu, nur mit aktiviertem Stammbaum-Modul)* – zeigt
  Generation, Herkunft, Geschwister (aus derselben Charge) und Nachkommen
  der gewählten Pflanze als klickbare Liste, dazu einen Knopf „Stammbaum
  anzeigen".
- **Boden** *(neu, nur mit aktiviertem Boden-Frühwarnsystem)* – Ampel,
  Trend, Prognose und Hinweise für diese Pflanze, dazu der Zielbereich und
  die Erfassung von Boden-pH-Messungen und Topdress (siehe
  Boden-Frühwarnsystem).

Ein neu gesetztes Blüte- oder Erntedatum lässt sich korrigieren: den
zugehörigen Historien-Eintrag desselben Tages löschen, dann neu eingeben.

## Stammbaum

Das Stammbaum-Modul verfolgt die Abstammung eigener Pflanzen: Kreuzungen,
Klone, Selbstungen und Rückkreuzungen. Es ist standardmäßig bei der
Profi-Ansicht aktiv und lässt sich unabhängig davon über **Ansicht →
Ansicht anpassen…** zu- oder abschalten (Frage „Zucht").

### Herkunft einer Pflanze

Beim Anlegen einer neuen Pflanze (Pflanzen-Seite, „Neue Pflanze") wählst
du die Herkunft:

- **Gekauft** – Samen von einem Breeder, der Ausgangspunkt (Generation „P").
- **Klon von …** – ein Steckling einer bestehenden Pflanze. Der Strain-Name
  wird automatisch von der Quelle übernommen (änderbar). Ein Klon ist
  genetisch identisch mit seiner Quelle und übernimmt automatisch deren
  Generation.
- **Aus eigener Charge …** – ein Sämling aus einer selbst gezüchteten
  Kreuzung. Canalyze schlägt automatisch die nächste freie Pheno-Nummer
  innerhalb der Charge vor.

### Kreuzungsverwaltung

Über den Knopf „Kreuzung verwalten…" auf der Pflanzen-Seite, in drei
Schritten:

1. **Pollen erfassen** – von welcher Pflanze, wann gesammelt, wie gelagert.
   Nützlich, weil der Pollen-Spender bei der eigentlichen Bestäubung oft
   schon nicht mehr vorhanden ist.
2. **Kreuzung anlegen** – eine Mutterpflanze entweder mit einer direkt
   gewählten Vater-Pflanze verbinden (legt automatisch einen Pollen-Eintrag
   an) oder mit bereits gelagertem Pollen.
3. **Charge anlegen** – aus einer Kreuzung eine Saatgut-Charge mit
   Bezeichnung, Erntedatum und Anzahl Samen. Die Chargen-Übersicht zeigt,
   wie viele Samen davon bereits als Pflanze angelegt wurden.

### Generationen

Canalyze berechnet die Generation jeder Pflanze automatisch:

| Kürzel | Bedeutung |
|---|---|
| **P** | Gekauft, Ausgangspflanze |
| **F1, F2, …** | Kreuzung zweier unterschiedlicher Linien bzw. Geschwister derselben Charge |
| **S1, S2, …** | Selbstung (eine Pflanze mit sich selbst gekreuzt) |
| **BX1, BX2, …** | Rückkreuzung auf ein Elternteil bzw. einen Vorfahren |
| **F1 (Hybrid)** | Kreuzung zweier nicht miteinander verwandter eigener Linien |

Ein Klon zeigt immer dieselbe Generation wie seine Quelle, erkennbar an
einem kleinen ⎘-Symbol. Auf Profi-Stufe lässt sich die berechnete Generation
bei Bedarf von Hand überschreiben – ein ✎-Symbol markiert dann, dass es sich
um eine manuelle Angabe handelt.

### Rollen

Pflanzen können als **Mutterpflanze**, **Pollenspender** oder **Keeper**
(Stockpflanze für weitere Klone) markiert sein und erscheinen dann im Tab
„Abstammung" mit einem entsprechenden Hinweis. „Pollenspender" wird
automatisch gesetzt, sobald Pollen von einer Pflanze erfasst wird.

### Die Stammbaum-Seite

In der Navigation links gibt es eine eigene Rubrik **Stammbaum**: oben eine
aufklappbare Bibliothek zum Wählen einer Pflanze, darunter eine große,
interaktive Grafik ihres gesamten zusammenhängenden Stammbaums:

- **Knoten verschieben** – mit der Maus anfassen und ziehen.
- **Zoomen** – Mausrad.
- **Ansicht verschieben** – auf den Hintergrund klicken und ziehen.
- **Klick auf einen Knoten** – wählt diese Pflanze in der Bibliothek und
  zentriert die Grafik neu auf sie.

Durchgezogene Linien zeigen Abstammung (Eltern → Kind), gestrichelte
Linien zeigen Klon-Verbindungen (Quelle → Klon).

Die Stammbaum-Seite lässt sich auch direkt aus dem Tab „Abstammung"
(Pflanzen-Seite, zentriert auf die gewählte Pflanze) und über den Button
„Stammbaum" auf der Analyse-Seite ansteuern.

### Löschen von Pflanzen mit Nachkommen

Eine Pflanze mit Klonen oder Kreuzungs-Kindern wird beim Löschen **nicht**
endgültig entfernt, sondern nur als „gelöscht" markiert (mit Warnung) –
ihre Nachkommen behalten so ihre Abstammung und alle Logs. Im Stammbaum
erscheint sie weiterhin als grauer Platzhalter, in der normalen Bibliothek
taucht sie nicht mehr auf. Pflanzen ohne Nachkommen werden wie gewohnt
endgültig gelöscht.

## Boden-Frühwarnsystem

Das Boden-Frühwarnsystem beobachtet, ob der Boden-pH abdriftet oder der
Boden (besonders bei organischem Anbau) seine Pufferwirkung verliert –
bevor es der Pflanze sichtbar schadet. **Ein eigenes Boden-pH-Messgerät ist
nicht nötig**: als Ersatzgröße dient der **Drain-pH** (der pH-Wert des
Wassers, das unten aus dem Topf abläuft), der ohnehin schon beim Gießen
erfasst wird. Das Modul ist standardmäßig bei der Profi-Ansicht aktiv.

### Die Ampel

Jede Pflanze bekommt eine Ampelfarbe (Tab „Boden" bzw. Spalte in der
Bibliothek):

| Farbe | Bedeutung |
|---|---|
| **Grau** | Noch zu wenige Drain-Messungen (mindestens 4 in den letzten 21 Tagen nötig) |
| **Rot** | Aktueller pH liegt außerhalb des Zielbereichs, oder verlässt ihn voraussichtlich in weniger als 7 Tagen |
| **Gelb** | Ein deutlicher Trend zeichnet sich ab, oder die Prognose liegt unter 21 Tagen |
| **Grün** | Alles im grünen Bereich, kein auffälliger Trend |

Dazu gibt es, wo möglich, eine **Prognose** („verlässt den Zielbereich in
etwa X Tagen") und Hinweise wie „Drain-pH fällt seit 3 Wochen um
0,15/Woche" oder „mögliche Salzansammlung" (wenn EC und pH gleichzeitig
driften) – das sind **Beobachtungen, keine Dosier-Empfehlungen**. Die
Entscheidung, was zu tun ist, bleibt bei dir. Jeder Hinweis zeigt auch, wie
sicher er ist (abhängig von der Anzahl der zugrunde liegenden Messungen).

Änderst du den Zielbereich bewusst (z. B. um gezielt einen bestimmten
Nährstoff zu fördern), wertet Canalyze eine Bewegung in Richtung des neuen
Ziels nicht als Warnung – nur eine Bewegung *weg* vom aktuellen Ziel gilt
als Drift.

### Zielbereich

Wonach sich die Ampel richtet, hängt vom Anbau-Medium ab (Vorgabe: Erde
6,0–7,0, Coco 5,8–6,5, Hydro 5,5–6,5):

| Stufe | Zielbereich |
|---|---|
| **Einsteiger** | Nur lesbar |
| **Fortgeschritten** | Kann den Medium-Standard global anpassen (wirkt sich auf alle Pflanzen mit diesem Medium aus) |
| **Profi** | Kann zusätzlich ein eigenes Ziel für eine einzelne Pflanze setzen, mit Datum, ab wann es gilt |

Ältere Messungen werden immer gegen das Ziel bewertet, das zu ihrem
Zeitpunkt galt – eine spätere Zieländerung verfälscht die Bewertung
vergangener Werte also nicht rückwirkend.

### Weitere Erfassung

Im Tab „Boden" lassen sich optional **Boden-pH-Messungen** (mit Methode:
Messgerät, Slurry oder Pour-Through) und **Topdress-Ereignisse**
(eingearbeiteter Trockendünger) erfassen. Sobald Boden-pH-Messungen
vorliegen, zeigt Canalyze zusätzlich einen aus dem Drain-pH geschätzten
Boden-pH-Wert an.

### Diagramm „Boden-Trend"

Auf der Analyse-Seite zeigt der Button „Boden-Trend" Drain-pH und
Gießwasser-pH im Zeitverlauf, den Zielbereich als farbiges Band (mit
mehreren Abschnitten, falls sich das Ziel zwischenzeitlich geändert hat),
Topdress- und Dünger-Zusatz-Ereignisse als Marker, den Drain-EC auf einer
zweiten Achse und die Prognose als gestrichelte Linie.

## Analyse

Eine Pflanze aus der Liste wählen, dann:

- **Nährstoffe / Gießen** – EC/pH-Verlauf sowie Gieß- und Drainmenge.
- **Klima / VPD** – Temperatur- und Luftfeuchtigkeits-Verlauf mit VPD.
- **Phänotyp-Profil** *(nur mit aktiviertem Genetik-Modul)* – Radar-Diagramm
  der Bewertungen über die Zeit.
- **EC-Empfehlung** – errechnet aus der eigenen Historie und einer
  Offline-Strainbibliothek einen Vorschlag für die Düngerstärke.
- **Stammbaum** *(nur mit aktiviertem Stammbaum-Modul)* – wechselt zur
  Stammbaum-Seite und zentriert dort auf die gewählte Pflanze, statt ein
  eigenes Diagrammfenster zu öffnen.
- **Boden-Trend** *(nur mit aktiviertem Boden-Frühwarnsystem)* – siehe oben.

Tage mit **Defoliert**/**Getoppt** erscheinen in den Diagrammen als
Punkt-Marker. Die Diagramme (außer Stammbaum, der ist direkt eingebettet)
öffnen sich als eigenständiges Fenster über Microsoft Edge und
funktionieren auch ohne Internetverbindung.

## Daten sichern (Datei-Menü)

- **Backup exportieren…** legt einen Ordner mit einer vollständigen,
  unverschlüsselten Kopie der Datenbank sowie anonymisierten CSV-Dateien
  an. Diese Kopie lässt sich auf jedem PC ohne Passwort importieren –
  siehe auch den Abschnitt „Sicherheit" weiter oben.
- **Backup importieren…** ersetzt die aktuellen Daten durch ein zuvor
  exportiertes Backup (`.db`-Datei). **Achtung:** die bisherigen Daten
  werden dabei überschrieben – vorher exportieren, falls sie noch gebraucht
  werden. Ein Backup aus einer älteren Canalyze-Version wird beim Import
  automatisch auf den aktuellen Stand gebracht, ohne dass Daten verloren
  gehen.

Backups enthalten immer **alle** Daten, unabhängig von der aktuell
gewählten Ansichtsstufe.

## Tastenkürzel

| Taste | Wirkung |
|---|---|
| `Strg+Q` | Canalyze beenden (verschlüsselt beim Schließen automatisch) |
| `F1` | Diese Anleitung öffnen |

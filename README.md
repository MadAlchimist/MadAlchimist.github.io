# Mad Alchimist

Quellcode für https://madalchimist.github.io

Gebaut mit [Jekyll](https://jekyllrb.com/) über den eingebauten GitHub-Pages-
Build – kein lokales Ruby/Jekyll-Setup nötig, GitHub kompiliert bei jedem
Push auf `main` automatisch neu.

## Inhalte

- **Funde, Fehlschläge & Skurriles** (Seite `funde.md`, Fälle in `_lernkurve/`): ein Fall pro Datei, `typ: fehler|highlight|skurril`,
  mit Foto-Liste im Front Matter. Vorlage: `2026-05-26-calmag-doppelt.md`.
- **Bibliothek** (`bibliothek.md`, Daten in `_data/bibliothek/`): Mendel,
  Selektionstechniken, Glossar, Nährstoffe und Quellen, aus der Excel
  übernommen. Texte direkt in den `.yml`-Dateien ändern.
- **Archiv** (vorerst deaktiviert, `published: false` in `archiv.md`; `_data/archiv.yml`): Scans der historischen Datenerfassung und
  Fotobibliothek, nach Jahr gruppiert.
- **Aktueller Grow** (`aktueller-grow.md`, Skript `assets/js/grow.js`): interaktive
  Ansicht, die zur Laufzeit die CSV-Exporte aus Canalyze liest. Siehe unten.

## Neuen Fall anlegen (Fall-Editor)

`scripts/fall-editor.html` per Doppelklick im Browser öffnen (läuft offline):

1. Art wählen (Fehler/Highlight), Felder und Foto-Dateinamen ausfüllen.
2. Den erzeugten **Foto-Befehl** in PowerShell im Projektordner ausführen.
3. Das **Markdown** kopieren oder als Datei in `_lernkurve/` speichern.
4. In der Vorschau prüfen, dann committen und pushen.

Aufbau Fehler: Fehler, Ursache, Reaktion, Erkenntnis. Aufbau Highlight:
Highlight, Was dahinter steckt, Erkenntnis. Aufbau Skurriles: Das Kuriosum,
Mögliche Erklärung, Was ich daraus mitnehme.

## Aktuellen Grow aktualisieren

Die Seite braucht keine Code-Änderung, nur neue Daten:

1. **Daten:** Die CSV-Dateien aus Canalyze in `assets/canalyze_export/`
   überschreiben (`stand`, `pflanzen`, `klima`, `giessen`, `zusaetze`,
   `ereignisse`; Trennzeichen `;`, Dezimalpunkt). Neue Pflanzen, Zelte oder
   Produkte erscheinen automatisch.
2. **Fotos:** neue Bilder aufbereiten, die Seite findet sie selbst:
   `.\scripts\Optimize-Photos.ps1 -Source <Ordner> -Dest assets\aktueller-grow -Thumbs`
   Das Datum liest die Seite aus dem Dateinamen (`PXL_JJJJMMTT_HHMMSS…`).
3. Committen und pushen. GitHub baut neu, die Seite zeigt den neuen Stand.

Optional: `assets/canalyze_export/fotos.csv` mit den Spalten
`datei;datum;pflanze_id;text` (Dateiname, Datum `JJJJ-MM-TT`, Pflanzen-ID,
Bildunterschrift). Sie ergänzt Fotos um Text oder ein abweichendes Datum.

Die Ansicht merkt sich ihre Auswahl in der Adresse (`#e=…&p=…&z=…`), so lässt
sich eine bestimmte Ansicht verlinken.

## Design

Dunkles Alchemisten-Labor, alles in `assets/main.scss` (Farben als Variablen
ganz oben). Schriften Cinzel und EB Garamond (SIL Open Font License) liegen
selbst gehostet in `assets/fonts/`, es gibt keine Anfragen an Google. Logo:
`_includes/logo.html`, Favicon: `assets/favicon.svg`.

## Fotos hinzufügen

Originale bleiben in `Quelle_Infos_Fotos/` (per `.gitignore` ausgeschlossen,
enthalten GPS-Daten). Für die Website aufbereiten:

```powershell
.\scripts\Optimize-Photos.ps1 -Source <Datei-oder-Ordner> -Dest assets\lernkurve\<fall>
.\scripts\Optimize-Photos.ps1 -Source <Scan-Ordner> -Dest assets\archiv\2021 -MaxEdge 2400
```

Das Skript verkleinert, entfernt EXIF/GPS und speichert als JPEG. Erst die
Ausgabe unter `assets/` wird committet.

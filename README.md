# Mad Alchimist

Quellcode für https://madalchimist.github.io

Gebaut mit [Jekyll](https://jekyllrb.com/) über den eingebauten GitHub-Pages-
Build – kein lokales Ruby/Jekyll-Setup nötig, GitHub kompiliert bei jedem
Push auf `main` automatisch neu.

## Inhalte

- **Lernkurve** (`_lernkurve/`): ein Fall pro Datei, `typ: fehler|highlight`,
  mit Foto-Liste im Front Matter. Vorlage: `2026-05-26-calmag-doppelt.md`.
- **Archiv** (`_data/archiv.yml`): Scans der historischen Datenerfassung und
  Fotobibliothek, nach Jahr gruppiert.
- **Aktueller Grow**: soll später aus Canalyze nach `_data/` gespeist werden.

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

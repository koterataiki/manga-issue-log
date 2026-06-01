# Manga Issue Log

Manga Issue Log is a local-first reading log and ranking analysis tool for weekly serial manga magazines.

It helps readers track each issue, series, chapter notes, development tags, personal impressions, hiatuses, color pages, one-shots, new series, endings, and rank movement over time.

The project is publisher-agnostic. It does not include official magazine images, scans, logos, copyrighted chapter text, or real publication data. The bundled data is fictional sample data for UI and analytics testing.

## Features

- Manage weekly manga issues and merged issues.
- Track table-of-contents order by drag and drop.
- Add series, one-shots, hiatuses, new series, and ended series.
- Record chapter summaries, reaction notes, personal thoughts, predictions, scores, and custom tags.
- Compare ranking movement with line charts.
- Hover chart points to inspect issue-specific tags and notes.
- Export and import JSON data.
- Runs as a static browser app with no build step.

## Quick Start

Open `index.html` directly in a browser, or serve the folder locally:

```sh
python -m http.server 5173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5173/
```

## Project Structure

```text
.
├── index.html      # App shell and screens
├── styles.css      # Visual design and responsive layout
├── app.js          # State, sample data, interactions, analysis
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── ROADMAP.md
└── SECURITY.md
```

## Data Model

The app currently stores data in `localStorage` and supports JSON export/import.

Core concepts:

- `Issue`: magazine issue metadata, issue number, merged-issue state
- `Series`: title, author, status, color, first issue, ended issue
- `ChapterLog`: issue-specific entry for a series, order, tags, score, notes
- `Tag`: reusable or custom label describing what kind of chapter it was

## Legal Notes

Manga Issue Log is an unofficial, generic reading-log tool. Do not commit or distribute copyrighted manga pages, official covers, logos, scans, long excerpts, or publisher-owned metadata unless you have the rights to do so.

The sample dataset is fictional.

## License

MIT License. See [LICENSE](LICENSE).

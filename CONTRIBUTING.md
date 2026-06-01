# Contributing

Thanks for your interest in Manga Issue Log.

This project is early and intentionally simple: static HTML, CSS, and JavaScript. There is no build step yet.

## Good First Contributions

- Improve the ranking chart readability.
- Add keyboard-accessible drag and drop alternatives.
- Improve mobile layout.
- Add tests for data import/export.
- Refine the data model for issue status, hiatuses, and one-shots.
- Improve documentation and screenshots.

## Local Development

Run a local static server:

```sh
python -m http.server 5173 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:5173/
```

## Contribution Guidelines

- Keep the app publisher-agnostic.
- Do not add copyrighted manga content, scans, official covers, or real magazine data.
- Prefer fictional sample data for demos.
- Keep changes small and easy to review.
- Preserve local-first behavior unless a sync feature is explicitly being worked on.

## Pull Request Checklist

- The app loads without console-breaking syntax errors.
- No publisher-specific branding was added.
- Sample data is fictional or clearly user-provided.
- Documentation is updated when behavior changes.

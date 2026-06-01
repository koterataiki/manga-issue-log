# Security Policy

## Supported Versions

This project is pre-1.0. Security fixes are handled on the main branch.

## Reporting a Vulnerability

Please open a private security advisory on GitHub if available, or contact the maintainer directly.

Do not include sensitive personal reading data or private exported JSON in public issues.

## Data Handling

Manga Issue Log is currently local-first:

- Data is stored in the browser's `localStorage`.
- JSON export is user-triggered.
- There is no network sync in the current static app.

Users are responsible for where they store exported JSON files.

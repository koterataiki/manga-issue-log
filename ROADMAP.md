# Roadmap

## Near Term

- Add rank-change reason cards that connect movement, tags, scores, and notes.
- Add configurable magazine analysis rules, starting with Jump-style lower-rank warning defaults.
- Add issue-level notes for overall impressions, best chapter, and next-issue expectations.
- Improve share/export flows for issue summaries and series analysis.
- Add import validation and user-friendly error messages.
- Add screenshots to the README.

## Medium Term

- Add local database storage, likely IndexedDB or SQLite for a mobile app build.
- Add CSV export for ranking tables.
- Add saved analysis presets.
- Add saved comparison sets for new series, lower-rank watchlists, and favorite series.
- Add new-series launch comparison by week number since debut.
- Add momentum scores and visual status marks for each series.
- Add support for multiple magazines.
- Add accessibility improvements for drag and drop and chart navigation.

## Long Term

- Package as a mobile app.
- Optional private sync.
- Richer visual analytics for rank movement, issue balance, and series momentum.
- Optional shared infrastructure for user-owned magazine templates, schedule metadata, and non-official community reactions.
- Optional social sharing cards for issue summaries and series trend snapshots.
- Plugin/import adapters for user-owned datasets.

## Non-Goals

- Hosting copyrighted manga content.
- Shipping official publisher artwork or logos.
- Scraping publisher websites without permission.
- Depending on a specific magazine or publisher brand.
- Re-publishing official story text, pages, or artwork through social sharing or community features.

## Analysis Direction

Manga Issue Log should grow from a reading log into a serial-publication watch tool. The analysis tab should help readers understand not only what changed, but why it may have changed.

### Rank Change Reasons

- Show week-to-week rank movement alongside tags, score, summary, and notes.
- Highlight major rises, drops, and multi-week trends.
- Let users jump from a movement card to the related chapter log.

### Configurable Warning Rules

- Provide Jump-style defaults while allowing users to adjust thresholds per magazine.
- Example settings: lower-rank line, danger line, consecutive-week warning count, sharp-drop threshold, and new-series grace period.
- Display clear marks such as rising, stable upper rank, sharp drop, lower-rank watch, danger zone, and new-series watch.

### New-Series Tracking

- Compare new series by week number since debut rather than only by calendar issue.
- Show early rank movement, scores, tags, and whether the series stabilizes or falls into warning range.

### Momentum

- Start with a simple score based on recent rank, rank movement, and personal score.
- Add badges or marks that communicate the result quickly.
- Keep the formula visible and editable later so the app remains understandable.

### Issue Notes And Sharing

- Add an issue-level note field for overall impressions.
- Support share text for social media that contains only user-authored summaries and metadata.
- Avoid sharing official images, manga pages, or long copyrighted text.

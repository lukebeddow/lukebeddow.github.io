# lukebeddow.github.io

Source for [lukebeddow.github.io](https://lukebeddow.github.io), Luke Beddow's research homepage. Built with [Astro](https://astro.build) as a static site; no client-side framework.

## Run locally

Needs Node 24 or newer.

```sh
npm install
npm run dev       # http://localhost:4321, review mode: shows placeholders and marks drafts
npm run build     # type and content checks, then the production site in dist/
npm run preview   # serve dist/ locally
PUBLIC_REVIEW=1 npm run build   # a production build that still shows placeholders, for review
```

## Updating content

Everything on the page comes from the YAML files in `src/content/`; their schemas are in `src/content.config.ts`, so a missing field, a bad date or a media file that does not exist fails the build.

| File | Holds |
| --- | --- |
| `profile.yaml` | name, headline, About paragraphs, contact links, last-updated month |
| `featured.yaml` | the large clips under "Selected work" |
| `publications.yaml` | papers and thesis: titles as published, authors, DOI, links, clip |
| `projects.yaml` | personal projects |
| `experience.yaml` | roles and education (dates `YYYY-MM`, `present` for an ongoing role) |
| `recognition.yaml` | awards and service |

Two flags mark unfinished entries. `draft: true` means the wording needs approval: it is shown, with a yellow bar in review mode. `placeholder: true` means the content is still to come: it is shown only in review mode, never in a normal build. `note:` is for the editor and is never rendered.

Media live in `public/media/` and are referenced as `/media/<file>`. Clips are short H.264 MP4s (CRF 28, `+faststart`, no audio) with a JPEG poster; they play muted and only while on screen, and stay still for visitors who prefer reduced motion. The link-preview image is `public/og.jpg` (1200×630).

## Deploying

`.github/workflows/deploy.yml` builds every push and deploys to GitHub Pages from `main` only. The repository's Pages source must be set to "GitHub Actions".

## Credits

The 2024 version of this site was a React app by Denis Hadjivelichkov, adapted by Luke; its history is archived outside this repository. Fonts: [Newsreader](https://fonts.google.com/specimen/Newsreader) (SIL Open Font License), self-hosted via Fontsource.

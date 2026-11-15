// Content collections: every editable fact on the site lives in src/content/*.yaml and is
// checked against these schemas at build time, so a typo in a field fails the build, not the page.
//
// Two flags mark unfinished content (see README):
//   draft: true        wording drafted for Luke to approve; shown normally, marked in review builds
//   placeholder: true  content still to come; shown only in review builds (`npm run dev`)
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// A path under public/, written as it is served ("/media/x.mp4"). The build fails if the file is missing.
const publicPath = z
  .string()
  .startsWith('/')
  // The config is bundled before it runs, so resolve from the project root rather than this file.
  .refine((p) => existsSync(join(process.cwd(), 'public', p)), {
    message: 'file not found under public/',
  });

// "2025-01" or "2025"; "present" for an ongoing role.
const yearMonth = z.string().regex(/^\d{4}(-\d{2})?$/, 'use YYYY or YYYY-MM');

const clip = z.object({
  video: publicPath,
  poster: publicPath,
  alt: z.string().min(3),
  aspect: z.string().regex(/^\d+ \/ \d+$/, 'e.g. "16 / 9"').optional(), // only where the role cards should not crop to 16:9
});

const links = z
  .array(z.object({ label: z.string(), url: z.string() }))
  .default([]);

const flags = {
  draft: z.boolean().default(false),
  placeholder: z.boolean().default(false),
  note: z.string().optional(), // what is missing or needs checking; never rendered
};

const profile = defineCollection({
  loader: file('src/content/profile.yaml'),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    description: z.string().max(170), // meta description and link previews
    photo: publicPath,
    email: z.email(),
    links: z.array(z.object({ label: z.string(), url: z.url() })),
    about: z.array(z.object({ text: z.string(), ...flags })),
    updated: yearMonth,
  }),
});

const roles = defineCollection({
  loader: file('src/content/roles.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    org: z.string(),
    orgUrl: z.url().optional(),
    start: yearMonth,
    end: z.union([yearMonth, z.literal('present')]),
    summary: z.string().max(200), // one sentence under the clip
    href: z.string().optional(), // where the title points (e.g. the paper on this page)
    clip: clip.optional(),
    ...flags,
  }),
});

const expertise = defineCollection({
  loader: file('src/content/expertise.yaml'),
  schema: z.object({
    order: z.number(),
    area: z.string(),
    detail: z.string(),
    ...flags,
  }),
});

const publications = defineCollection({
  loader: file('src/content/publications.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(), // exactly as published
    authors: z.array(z.string()).min(1),
    equalContribution: z.boolean().default(false), // authors marked * contributed equally
    venue: z.string(),
    year: z.number().int(),
    kind: z.enum(['journal', 'conference', 'thesis', 'preprint']),
    doi: z.string().regex(/^10\.\d{4,}\//).optional(),
    summary: z.string().optional(),
    links: links,
    clip: clip.optional(),
    image: z.object({ src: publicPath, alt: z.string().min(3) }).optional(), // a still (e.g. a paper figure) when there is no clip
    ...flags,
  }),
});

const projects = defineCollection({
  loader: file('src/content/projects.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    summary: z.string(),
    links: links,
    clip: clip.optional(),
    ...flags,
  }),
});

const experience = defineCollection({
  loader: file('src/content/experience.yaml'),
  schema: z.object({
    kind: z.enum(['role', 'education']),
    title: z.string().optional(), // optional only while a placeholder; the page then shows a gap to fill
    org: z.string(),
    orgUrl: z.url().optional(),
    start: yearMonth,
    end: z.union([yearMonth, z.literal('present')]),
    summary: z.string().optional(),
    ...flags,
  }),
});

const recognition = defineCollection({
  loader: file('src/content/recognition.yaml'),
  schema: z.object({
    order: z.number(),
    text: z.string(),
    year: z.string().optional(),
    ...flags,
  }),
});

export const collections = { profile, roles, expertise, publications, projects, experience, recognition };

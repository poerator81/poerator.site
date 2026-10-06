# Poerator website

Recovered Next.js App Router site for `poerator.com`. The app reads its
published content from the `0nygebau` Sanity project (`production` dataset).
UI copy is in `messages/`; localized equipment, case studies and landing-page
content comes from Sanity.

## Local development

1. Install Node.js 22 and run `npm ci`.
2. Copy `.env.example` to `.env.local` and add the values from the existing
   Netlify site's environment variables. Never commit `.env.local`.
3. Run `npm run dev`, `npm run lint` and `npm run build`.

The public Sanity read configuration has working defaults for local builds.
The contact endpoint requires `RESEND_API_KEY` and `MANAGER_EMAIL`; the
revalidation endpoint requires `SANITY_REVALIDATE_SECRET`.

## Sanity Studio

The embedded Studio is available at `/studio`. Deploy the schemas to the
existing project after authenticating with Sanity:

```sh
npm run sanity:schema
```

Use `node --env-file=.env.local scripts/translate-missing-locales.mjs`
to translate missing localized Sanity fields, or
`node --env-file=.env.local scripts/translate-messages.mjs` for missing UI
message keys. Both scripts require a DeepL API key; the Sanity content
script also requires a write token.

## Netlify

The intended site is `poerator-site-35j8` (site ID
`fccf5445-6938-4dc4-9832-f7c8cccb007e`). Link the Netlify CLI to that site,
pull its environment variables locally, and verify the deployment target
before publishing. Do not link or deploy to the older `poerator-site`.
The project is configured to build with Node.js 22 and
`@netlify/plugin-nextjs`.

The recovered app uses Next.js 16, React 19, Sanity 6 and Tailwind CSS 4
instead of the older versions listed in the recovery brief. Those upgrades
were needed to build against current patched releases; the App Router,
Sanity document model, routes and visual tokens remain in place.

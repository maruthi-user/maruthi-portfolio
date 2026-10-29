# Maruthi Yenumula: portfolio

Next.js (App Router) + Tailwind CSS v4. Fully static, deploys to Vercel with no configuration.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit the content

Everything on the site comes from `lib/data.ts`: profile, experience, projects, skills, education.

- **Profile photo:** copy your photo into `public/` (for example `public/profile.jpg`) and set `profile.photo` to `"/profile.jpg"`. While it is `null` the hero shows the "MY" monogram.
- **Internship length:** change `tenureMonths` at the top of `lib/data.ts`; the hero stat, experience card, About text and page description all follow it.
- **Skills:** each group has a `strong` list (solid chips) and a `familiar` list (dashed chips).
- **Resume button:** copy the resume PDF into `public/` and set `profile.resumeUrl` (for example `"/Maruthi_Yenumula_Resume.pdf"`). The buttons stay hidden while it is `null`.
- **F2Home live link:** set `live` on the F2Home entry. Until then the card shows "Live demo coming soon".
- **Screenshots:** WebP files in `public/projects/<project>/`. `scripts/media.mjs` and `scripts/gif.mjs` show how the originals were converted.
- **Case studies:** `app/case-studies/hrms`, `app/case-studies/task-management` and `app/case-studies/bes`. The screens on those pages are mock-ups with sample data; do not add client screenshots.

## Deploy

`/sitemap.xml` and `/robots.txt` use the Vercel production domain automatically. Set a `SITE_URL` environment variable (for example `https://yourname.com`) if you attach a custom domain.

Push to GitHub, import the repo in Vercel, and deploy.

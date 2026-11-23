# Maruthi Yenumula: portfolio

React + Next.js (App Router), Tailwind CSS v4 and GSAP. Prerendered portfolio pages with cinematic text reveals and dark/light themes.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit the content

Everything on the site comes from `lib/data.ts`: profile, experience, projects, skills, education.

- **Profile photo:** copy your photo into `public/` (for example `public/profile.jpg`) and set `profile.photo` to `"/profile.jpg"`. While it is `null` the hero shows the "MY" monogram.
- **Skills:** edit the `strong` lists for Backend, Frontend, Databases and Testing & Tools to update the homepage.
- **Resume button:** copy the resume PDF into `public/` and set `profile.resumeUrl` (for example `"/Maruthi_Yenumula_Resume.pdf"`). The buttons stay hidden while it is `null`.
- **F2Home live link:** set `live` on the F2Home entry. The demo button appears when a URL is configured.
- **Screenshots:** WebP files in `public/projects/<project>/`. `scripts/media.mjs` shows how the originals were converted.
- **HRMS case study:** `app/case-studies/hrms` includes Task Management alongside the other HRMS modules. The interactive demos use sample data.

## Deploy

`/sitemap.xml` and `/robots.txt` use the Vercel production domain automatically. Set a `SITE_URL` environment variable (for example `https://yourname.com`) if you attach a custom domain.

Push to GitHub, import the repo in Vercel, and deploy.

# Miravana Landing Page

One-page landing page for **Miravana Hotel & Resorts**, built with Next.js 16, React 19 and Tailwind CSS 3 from the Miravana design. It follows the same project structure as the other landing pages (GlowMist, Haulix, Constrix, Tastera): every piece of text, image, icon and link lives in `data/templates.json`, and the components only render it.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx            fonts, metadata (title, description, favicon), header, footer, scroll reveal
  page.tsx              the sections in page order
  globals.css           theme colours (CSS variables)
components/
  common/               Header, Footer
  sections/             Hero, About, Rooms, Why, Testimonials, Contact (+ form), FAQ (+ accordion)
  ui/                   Icon registry, SectionHeading (eyebrow + title), LineArt (drawn decorations), helpers
data/templates.json     all content: common (theme, metadata, company, Footer) + categories.Hotel.sections
types/templates.types.ts
public/images/          logos, favicon and photos (webp)
```

## Sizes

From 1024px up the page follows the 1920px design: the root font is `min(16px, 100vw / 90)` and every size is in rem
(1 design pixel = 0.046875rem), so 1024px shows exactly the 1440px layout, only smaller. Phones and tablets get their own stacked layout.

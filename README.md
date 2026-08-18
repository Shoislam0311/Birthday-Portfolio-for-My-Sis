<div align="center">

# Birthday Portfolio

A small website made for my sister.

<a href="https://birthday-portfolio-for-my-sis.vercel.app/">Open the live experience</a>
&nbsp; · &nbsp;
<a href="https://github.com/Shoislam0311/Birthday-Portfolio-for-My-Sis">Source</a>
&nbsp; · &nbsp;
<a href="MOBILE_COMPATIBILITY.md">Mobile notes</a>

</div>

---

## What it is

This is a personal birthday website rather than a general portfolio template. It was made for one person and built around the things that make the occasion feel personal: messages, photos, small surprises, movement, and a few interactive moments.

The site is split into a simple experience:

`arrive` → `look back` → `send a wish` → `keep the memories`

The layout is responsive so the experience still works on a phone, tablet, and desktop.

## Open it

<a href="https://birthday-portfolio-for-my-sis.vercel.app/"><img src="https://img.shields.io/badge/OPEN%20THE%20LIVE%20SITE-Visit%20the%20birthday%20experience-EC4899?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Open Birthday Portfolio live site" /></a>

## A few real moments from the gallery

The gallery uses the real photos and captions from the project instead of stock images.

<p align="center">
  <a href="https://birthday-portfolio-for-my-sis.vercel.app/"><img src="https://i.imgur.com/2gB45PS.jpeg" width="31%" alt="The Happiness" /></a>
  <a href="https://birthday-portfolio-for-my-sis.vercel.app/"><img src="https://i.imgur.com/pBcYNMF.jpeg" width="31%" alt="First Time Pookie" /></a>
  <a href="https://birthday-portfolio-for-my-sis.vercel.app/"><img src="https://i.imgur.com/EvpJbQ8.png" width="31%" alt="Birthday Girl" /></a>
</p>

<p align="center"><sub>The full gallery has 18 photos with captions, including “The Happiness”, “Birthday Girl”, and several family jokes.</sub></p>

## What is inside

| Part | Purpose |
|:--|:--|
| Hero | Start the celebration without filling the first screen with noise. |
| Memories | Give the photos and messages room to be the main content. |
| Wishes | Let visitors take part instead of only reading the page. |
| Motion | Add movement where it helps the feeling of the story. |
| Responsive layout | Keep the page usable on smaller screens. |

## Built with

`React` · `TypeScript` · `Vite` · `Tailwind CSS` · `Radix UI` · `Framer Motion` · `Embla Carousel` · `Lucide React` · `Sonner`

## Run locally

```bash
pnpm install
pnpm dev
```

For a production check:

```bash
pnpm build
```

## Working on it

Read [CONTRIBUTING.md](CONTRIBUTING.md) before changing the experience. If you change a breakpoint, dialog, carousel, image, or interactive section, also check [MOBILE_COMPATIBILITY.md](MOBILE_COMPATIBILITY.md).

The gallery content lives in `src/sections/Gallery.tsx`. The birthday-specific settings and feature flags live in `src/config/birthday-config.ts`.

<div align="center"><sub>Made for one person, with a lot of photos.</sub></div>

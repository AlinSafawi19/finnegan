# CMS Entry — Finnegan Monroe Photography Portfolio

---

## Basic Info

**Project Name**
Finnegan Monroe Photography

**Slug**
`finnegan-monroe-photography`

**Overview**

Finnegan Monroe Photography is a high-performance portfolio website built for a professional freelance photographer based in New York. The site showcases curated photo albums, documentary and editorial photography services, a CMS-driven blog, client reviews, and a booking contact form.

![Documentary photography service — cinematic shot from the Finnegan Monroe portfolio](https://framerusercontent.com/images/QYuVqRAxUi0MftDQcaQd3I9e76E.jpg?scale-down-to=1024)

It features smooth-scroll animations, scroll-driven parallax effects, and animated stat counters, all powered by a custom headless CMS (Canopy) for real-time content management. Built with Next.js App Router and Incremental Static Regeneration, it delivers fast, SEO-optimised pages without sacrificing visual richness.

![Landscape photography service — sweeping natural vista from the portfolio gallery](https://framerusercontent.com/images/aiel3WtTgXPAKPqTLdFFaO8JNEA.jpg?scale-down-to=1024)

**Tagline**
A cinematic photography portfolio built for performance, beauty, and content flexibility.

---

## Details

| Field      | Value                                 |
| ---------- | ------------------------------------- |
| Industry   | Creative / Photography                |
| Status     | Live                                  |
| Role       | Full Stack Developer                  |
| Team Size  | Solo                                  |
| Start Date | 2026-04-05                            |
| End Date   | *(leave blank — ongoing)*             |
| Featured   | Yes                                   |

---

## Links & Media

| Field      | Value                                                         |
| ---------- | ------------------------------------------------------------- |
| Domain     | finnegan.alinsafawi.com                                       |
| Host       | Vercel — vercel.com/alin-safawis-projects/finnegan            |
| Live URL   | https://finnegan.alinsafawi.com/                              |
| GitHub URL | https://github.com/AlinSafawi19/finnegan                      |

**Thumbnail**
- **File (video):** https://framerusercontent.com/assets/tNiKvAWEjMnsRZpXzJEPoMkDX28.mp4
- **Alt text:** Cinematic full-viewport hero video background from Finnegan Monroe Photography portfolio

---

## Content

### Tech Stack

- Next.js 16 (App Router, ISR)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Motion (animation library)
- Lenis (smooth scroll)
- Phosphor Icons
- Canopy CMS (headless, custom-built)
- Vercel (hosting + image optimisation)

### Highlights

- Full-viewport sticky video hero with scroll-driven parallax scrim overlay
- CMS-driven album gallery with per-album metadata (camera, lenses, client, location, year)
- CMS-driven blog with tag-based related post suggestions and structured data
- Eight photography service categories with scroll-linked image cycling
- Auto-scrolling multi-column client review ticker
- Contact form with real-time validation wired to a Next.js API route
- Incremental Static Regeneration (60 s revalidation) for near-instant content updates
- Animated stat counters using spring physics (9K+ hours, 15+ years, 13+ awards, 200+ clients)
- YouTube video gallery extracted automatically from album data
- Custom 404 page and /blogs → /blog permanent redirect

---

## Story

### Challenge

The client needed a photography portfolio that would stand out visually while remaining easy to update without developer involvement. Standard template solutions lacked the motion design fidelity required, and static sites made content updates slow. The project also needed to handle large, high-resolution images efficiently without sacrificing load performance.

![Behind-the-scenes photographer portrait from the About section slideshow](https://framerusercontent.com/images/VnwD1MTZjQzM6ulzcuSc4Mp68tM.jpg?scale-down-to=1024)

### Approach

I built the site on Next.js 16's App Router with Incremental Static Regeneration so pages are statically served but refresh automatically when CMS content changes — no rebuild required. Canopy CMS provides a structured API for albums and blog posts, meaning the client can publish new work and articles in minutes.

![Product photography service — clean, professional shot showcasing the services section](https://framerusercontent.com/images/MJs0yMA8eL0lMKdn787qmQJy8.jpg?scale-down-to=1024)

Animations were implemented with the Motion library and Lenis smooth scroll, with scroll-position-driven effects (parallax scrim, service image cycling, stat counters) handled via Intersection Observer and custom hooks. Next.js Image with AVIF/WebP and CDN-level scale-down transforms keep image payloads minimal across all viewport sizes.

### Outcome

The result is a production-ready, visually cinematic portfolio that the client can manage entirely through the CMS. Page load is fast despite heavy imagery thanks to ISR and aggressive image optimisation. The codebase is clean and modular, making future service additions or layout changes straightforward.

![Award-winning photography — real estate shoot featured in the portfolio](https://framerusercontent.com/images/3wfV5HMvOEiZcxRTtJIKb5C8II.jpg?scale-down-to=1024)

---

## Testimonial

> "Working with Alin was an effortless experience from start to finish. He took the time to understand my aesthetic and translated it into a website that genuinely feels like an extension of my work. The animations are buttery smooth, the site loads incredibly fast even with full-resolution images, and updating my albums and blog through the CMS takes me less than five minutes. I've had multiple clients reach out specifically to compliment the site before they even looked at my portfolio. I couldn't be happier."
>
> — **Finnegan Monroe**, Freelance Photographer, New York

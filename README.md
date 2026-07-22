# ScholarNaija (Naija Scholar Atlas)

ScholarNaija helps Nigerian students discover scholarships from universities, governments, NGOs, foundations, and international organizations around the world — all in one trustworthy, easy-to-search place.

> Built on top of a Dala Studio–generated React scaffold and refined into a portfolio-ready startup MVP.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Folder Structure](#folder-structure)
- [Data Layer / Mock Data Notice](#data-layer--mock-data-notice)
- [Accessibility](#accessibility)
- [Future Improvements](#future-improvements)

## Overview

Nigerian students routinely lose out on funded education simply because scholarship information is scattered across hundreds of websites, PDFs, and word-of-mouth. ScholarNaija centralizes that information into one searchable, filterable, and trackable platform — from undergraduate awards to fully funded PhDs.

This build is a **frontend MVP**: every page is fully functional against a realistic mock dataset, with the data layer cleanly separated so a real backend (Supabase or otherwise) can be plugged in later without touching UI code.

## Features

- **Landing page** — hero with live search, animated stats, featured/trending scholarships
- **Search & filter** — keyword, country, degree level, field of study, funding type, and sort (newest, deadline, popularity, fully funded)
- **Categories** — Undergraduate, Masters, PhD, Fully Funded, International, Nigeria, Women, STEM, Research, Exchange Programs
- **Scholarship detail pages** — eligibility, application process, required documents, official application link, save-for-later
- **AI Scholarship Matcher (UI preview)** — a multi-step questionnaire that returns ranked mock recommendations with a match score and reasoning; clearly labeled as a heuristic preview, not a live model
- **Dashboard** — saved scholarships, applications (placeholder), upcoming deadlines, recommended matches, recent activity, quick actions
- **Profile page** — editable name, university, course, CGPA, country, preferred countries, and interests (persisted to `localStorage`)
- **Deadline tracker** — This Week / This Month / Closing Soon / Expired, grouped automatically from scholarship deadlines
- **FAQ** — accessible accordion, plus inline privacy/terms sections
- **About** — mission, vision, why ScholarNaija exists, and a working contact form (UI only)
- **Responsive & accessible** — semantic HTML, ARIA labels, keyboard navigation, visible focus states, and layouts tested at mobile/tablet/desktop breakpoints
- **Performance** — every route is code-split and lazy-loaded; production build verified with `vite build`

## Technology Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix primitives) |
| Routing | React Router v7 (lazy-loaded routes) |
| Icons | lucide-react |
| Dates | date-fns |
| Notifications | sonner |
| State/persistence | React hooks + `localStorage` (no backend yet) |

## Installation

```bash
# from the project root
npm install
```

## Running Locally

```bash
npm run dev       # start the Vite dev server (http://localhost:3000)
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
```

## Folder Structure

```
src/
├── App.tsx                  # Route definitions (lazy-loaded)
├── main.tsx                 # App entry point
├── index.css                # Design tokens, theme, base styles
├── components/
│   ├── layout/               # Navbar, Footer, Layout shell
│   ├── home/                 # Hero, stats, featured, categories preview, CTA
│   ├── scholarships/          # ScholarshipCard, badges, filter panel
│   └── ui/                    # shadcn/ui primitives (generated, not hand-edited)
├── hooks/
│   ├── use-saved-scholarships.ts   # localStorage bookmarking, cross-tab sync
│   └── use-profile.ts              # localStorage profile persistence
├── lib/
│   ├── types.ts               # Shared TypeScript domain types
│   ├── mock-data.ts           # Scholarships, categories, FAQs (see notice below)
│   ├── search-filters.ts      # Filtering/sorting logic for Search
│   ├── matcher.ts             # Mock AI Matcher scoring heuristic
│   ├── dates.ts                # Deadline formatting/status helpers
│   └── category-icons.tsx     # Icon lookup for category cards
└── pages/                     # One file per route (Home, Search, Matcher, Dashboard, etc.)
```

## Data Layer / Mock Data Notice

All scholarship, category, and FAQ content lives in `src/lib/mock-data.ts` and is clearly commented as **illustrative placeholder data**. Well-known scholarship program names are used for realism, but deadlines, figures, and descriptions are fictionalized for this demo and should not be treated as live or accurate information.

When a backend is introduced:

1. Replace the static arrays in `mock-data.ts` with API calls (e.g. to Supabase).
2. `types.ts` already defines the shape every consumer expects — keep it as your API contract.
3. `use-saved-scholarships.ts` and `use-profile.ts` are the two places using `localStorage`; swap their internals for authenticated API calls without changing their public hook signatures, and every page that consumes them keeps working unchanged.

## Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `footer`) and a "Skip to content" link
- ARIA labels on icon-only buttons (save, menu, sort, subscribe)
- Visible focus rings on all interactive elements
- Sufficient color contrast on both light theme text and badges
- Fully keyboard-navigable menus, filters, tabs, and accordions (via Radix primitives)

## Future Improvements

- Connect a real backend (Supabase) for scholarships, saved items, applications, and auth
- Replace the mock AI Matcher heuristic with a real recommendation model
- Add pagination/infinite scroll once the scholarship dataset grows beyond a page or two
- Add application status tracking (Applied / In Review / Accepted / Rejected)
- Add email verification and real newsletter delivery
- Add dark mode toggle (tokens are already dark-mode ready in `index.css`)

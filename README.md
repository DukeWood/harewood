# Harewood Village Hall

A modern community website for Harewood Village Hall and the wider Harewood village in North Leeds (LS17). The site keeps hall hire prominent while bringing together the published hall diary, village life, local history, useful neighbourhood links and the Red Kite local guide.

## What the site includes

- Hall hire availability calendar and email-based booking request flow
- Real June, July and August 2026 Hall diary data
- Calendar and event-card views with category filtering
- Red Kite, an on-page guide for hall hire, events and local information
- Hall interior gallery and neighbourhood photo stories
- Researched “About the Village” section covering early history, royal connections, present-day atmosphere and Harewood House’s Caribbean slavery legacy
- Local directory for places to visit, stay, eat and learn
- Responsive navigation, accessible forms, dialogs and mobile layouts

## Technology

- Next.js 16 and React 19
- TypeScript
- Vinext and Cloudflare Workers hosting
- Lucide React icons
- CSS maintained in `app/globals.css`

## Run locally

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal.

## Production build

```bash
npm run build
```

The build output is written to `dist/`.

## Content structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Main page, village content, directory and footer |
| `app/events-data.ts` | Published Hall diary records |
| `app/events-explorer.tsx` | Calendar and event-card views |
| `app/booking-calendar.tsx` | Hall-hire date and enquiry flow |
| `app/red-kite-chat.tsx` | Red Kite local guide responses |
| `app/hall-gallery.tsx` | Hall interior gallery and lightbox |
| `app/neighbourhood-life.tsx` | Village-life photo stories |
| `app/globals.css` | Full responsive visual system |
| `public/` | Hall and neighbourhood imagery |

## Updating the Hall diary

Add the supplied monthly entries to `app/events-data.ts`, then register that month in `app/events-explorer.tsx`. Keep private bookings anonymised, preserve the published times and notes, and verify both calendar and event-card views.

## Research and community sources

Village history and local information are grounded in authoritative sources:

- [Harewood House Trust — History](https://harewood.org/about/history/)
- [Harewood House Trust — The Royal Avenue](https://harewood.org/stories/the-royal-avenue/)
- [Harewood House Trust — Legacy of the Caribbean](https://harewood.org/about/legacy-of-the-caribbean/)
- [Historic England — Harewood House registered park and garden](https://historicengland.org.uk/listing/the-list/list-entry/1001218)
- [Leeds City Council — Conservation areas](https://www.leeds.gov.uk/planning/conservation-protection-and-heritage/conservation-area)
- [Harewood Parish Council](https://harewoodparishcouncil.gov.uk/)

Event listings shown in the Hall diary are taken from schedules supplied directly by the Harewood Village Hall team.

## Hall contact

Harewood Village Hall  
Church Lane, Harewood, Leeds LS17 9LX  
Telephone: 07496 275356  
Email: hanbury88@btinternet.com

## Content note

Community dates, services and links can change. Recheck time-sensitive information against the Hall’s latest diary and the linked official sources before publishing future updates.

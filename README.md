<<<<<<< HEAD
# Wedding invitation

An animated Indian wedding invitation built with Next.js (App Router) and Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's in it

- Ornate doors with a spinning mandala seal that open to reveal the invitation
- A marigold toran that drops in and sways, a mandala that turns behind the names, and an arch that draws itself
- Falling petals, plus a "Shower petals" button for a burst
- Arch-shaped countdown, a colour-coded events timeline, a flowing marigold garland, and flickering diyas in the footer
- RSVP form with an animated confirmation

All motion switches off for visitors who have "reduce motion" turned on.

## Make it yours

- **Names, date, venue, events, contacts, greeting:** edit `data/wedding.ts`. Everything on the page reads from that one file.
- **Greeting:** the Devanagari text on the opening screen and above the names is `greeting` in `data/wedding.ts`. Change it to suit your family's tradition, or set it to `""` to hide it.
- **Events:** add, remove or rename events and pick a `color` for each one.
- **Colours:** the variables at the top of `app/globals.css`.
- **Fonts:** Rozha One (names and headings) and Jost (body), loaded through `@fontsource` so no network call happens at build time.

## RSVPs

The form posts to `app/api/rsvp/route.ts`, which validates the reply and logs it on the server. It does not store anything yet. Before you share the link, connect it to somewhere you can read replies, such as a database, Google Sheets or an email service.

## Deploy

Push to GitHub and import the repo on Vercel. No environment variables are needed until you add storage for RSVPs.
=======
# priyam
>>>>>>> 771b89b03f56674a0cdc03e7f3560362f078b819

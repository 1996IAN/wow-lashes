# Wowlash Maison — Thindigua, Kiambu Road

Website for Wowlash Maison lash & brow studio, Joe's Apartment, opposite Astrol
Petrol Station, Thindigua, Kiambu Road.
Built with React + TypeScript, Tailwind CSS v4, framer-motion and lucide-react.

## Run it

```bash
npm install
npm run dev       # local dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Edit business details

Everything the studio would change lives in **`src/data/site.ts`**:

- phone, WhatsApp number (`whatsappIntl` = digits only, e.g. `254712345678`), email
- opening hours (drives the live "Open now / Closed" badges and booking time slots)
- lash prices (full set & refill), extra services, artists, gallery photos, social links

## Photos

`own-*.jpg` are the studio's own photos. The others are from Unsplash (free for
commercial use, no attribution required).
Originals are in `photos-original/`; run `npm run images` to re-compress them
into `public/images/`. Replace them with the studio's own photos any time.

## How bookings work (no server needed)

- **Book Now** → choose service (full set / refill) → name, phone, date & time →
  an appointment card is generated and sent to the studio's WhatsApp to confirm.
- **Contact form** → validates, then opens WhatsApp or the visitor's email app.

## Deploy

`npm run build` and upload the `dist/` folder to any static host
(Netlify, Vercel, Cloudflare Pages, cPanel `public_html`, etc.).

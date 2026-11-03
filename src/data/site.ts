/**
 * ─────────────────────────────────────────────────────────────
 *  WOWLASH MAISON — all editable business details live here.
 *  Update phone numbers, prices, hours and copy in this file;
 *  the whole website picks the changes up automatically.
 * ─────────────────────────────────────────────────────────────
 */

const img = (name: string) => `/images/${name}`;

export const site = {
  name: "Wowlash Maison",
  tagline: "Lashes that speak first.",
  area: "Thindigua, Kiambu Road",
  building: "Joe's Apartment",
  landmark: "Opposite Astrol Petrol Station",
  address: "Joe's Apartment, opposite Astrol Petrol Station, Thindigua, Kiambu Road",

  phone: "0700 859 884",
  phoneHref: "tel:+254700859884",
  whatsapp: "0700 859 884",
  whatsappIntl: "254700859884", // digits only, no "+", used for wa.me links
  email: "ituikaian@gmail.com",

  // Hours in 24h Nairobi time. `days` uses short English weekday names.
  hours: [
    { label: "Mon – Sat", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], open: "08:00", close: "20:00" },
    { label: "Sunday", days: ["Sun"], open: "11:00", close: "17:00" },
  ],

  mapsQuery: "Astrol Petrol Station Thindigua, Kiambu Road",

  socials: {
    instagram: "https://www.instagram.com/wowlashmaison/",
  },
};

export const images = {
  // The studio's own work
  ownLash: img("own-lash.jpg"),
  ownNailsRed: img("own-nails-red.jpg"),
  ownNailsSwirl: img("own-nails-swirl.jpg"),
  ownNailsPinkGold: img("own-nails-pink-gold.jpg"),
  ownNailsMaroon: img("own-nails-maroon.jpg"),
  ownLashVolume: img("own-lash-volume.jpg"),
  ownLashMirror: img("own-lash-mirror.jpg"),
  ownLashMirror2: img("own-lash-mirror-2.jpg"),
  ownLashSide: img("own-lash-side.jpg"),
  ownClientLashes: img("own-client-lashes.jpg"),
  ownArtist: img("own-artist-ringlight.jpg"),
  logo: img("logo.png"),
  // Unsplash stock
  heroPortrait: img("hero-portrait.jpg"),
  application: img("lash-application.jpg"),
  glamEye: img("glam-eye.jpg"),
  artist: img("artist-at-work.jpg"),
  classic: img("classic-set.jpg"),
  hybrid: img("hybrid-set.jpg"),
  volume: img("volume-set.jpg"),
  wispy: img("wispy-look.jpg"),
  lift: img("lash-lift.jpg"),
  brows: img("brow-threading.jpg"),
  isolation: img("tweezer-isolation.jpg"),
  mapping: img("lash-mapping.jpg"),
  catEye: img("cat-eye.jpg"),
  studioWall: img("studio-wall.jpg"),
  studioMirror: img("studio-mirror.jpg"),
  studioNeon: img("studio-neon.jpg"),
  trays: img("lash-trays.jpg"),
  relax: img("client-relax.jpg"),
  freshFace: img("fresh-face.jpg"),
  strip: img("lash-strip.jpg"),
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Why Us", href: "#why-us" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Artists", href: "#artists" },
  { label: "Looks", href: "#looks" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  id: string;
  title: string;
  image: string;
  position?: string;
  look: "Natural" | "Soft Glam" | "Full Glam" | "Drama" | "Lift" | "Brows" | "Nails";
  duration: string;
  from: number;
  short: string;
  details: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "classic",
    title: "Classic Lashes",
    image: images.ownClientLashes,
    position: "50% 24%",
    look: "Natural",
    duration: "1 hr 45 min",
    from: 2500,
    short: "One extension on each natural lash. Your own lashes, just longer, darker and defined.",
    details:
      "The everyday set. We place a single lightweight extension on every healthy natural lash, mapped to your eye shape so it lifts and opens without looking heavy. Perfect for a first set, the office and anyone who wants to wake up looking put together.",
    includes: ["Consultation & custom lash map", "Patch test on request", "Medical-grade, low-fume adhesive", "Aftercare kit & brush"],
  },
  {
    id: "hybrid",
    title: "Hybrid Lashes",
    image: images.ownLashMirror,
    position: "50% 35%",
    look: "Soft Glam",
    duration: "2 hrs",
    from: 3500,
    short: "Classic and volume fans mixed for soft texture. Our most requested set.",
    details:
      "A blend of classic singles and handmade volume fans. You get fullness and a touch of wispy texture while still looking like you. Great for brides-to-be, birthdays and anyone between natural and glam.",
    includes: ["Custom mix of classics & fans", "Wispy or textured finish", "Lash bath & cleanse", "Aftercare kit & brush"],
  },
  {
    id: "volume",
    title: "Volume Lashes",
    image: images.ownLashVolume,
    position: "55% 45%",
    look: "Full Glam",
    duration: "2 hrs 30 min",
    from: 4500,
    short: "Handmade fans of ultra-fine lashes for a full, fluffy, camera-ready look.",
    details:
      "Several ultra-fine extensions hand-fanned and placed on each natural lash. Dense, dark and fluffy, yet light enough to stay comfortable. Ideal for events, content creators and lovers of a bold lash line.",
    includes: ["Handmade 3D–6D fans", "Dense, dark lash line", "Lash bath & cleanse", "Aftercare kit & brush"],
  },
  {
    id: "mega",
    title: "Mega Volume & Wispy",
    image: images.ownLash,
    position: "55% 35%",
    look: "Drama",
    duration: "3 hrs",
    from: 5500,
    short: "Maximum density with spiky wisps. For when you want everyone to ask who did your lashes.",
    details:
      "Our most dramatic set: mega fans layered with spikes for a wispy, editorial finish. We still respect the health of your natural lashes, so we only go as full as your lashes can safely carry.",
    includes: ["Mega fans with wispy spikes", "Kim K, anime or wet-look styles", "Natural lash health check", "Aftercare kit & brush"],
  },
  {
    id: "lift",
    title: "Lash Lift & Tint",
    image: images.lift,
    position: "50% 35%",
    look: "Lift",
    duration: "1 hr",
    from: 2500,
    short: "Your natural lashes, curled from the root and tinted dark. No extensions, no upkeep.",
    details:
      "A semi-permanent curl and tint for your own lashes that lasts 6–8 weeks. Low maintenance, perfect for gym lovers, swimmers and anyone who wants a polished look without extensions.",
    includes: ["Root-lifting perm", "Black or brown tint", "Keratin nourishing treatment", "Lasts 6–8 weeks"],
  },
  {
    id: "brows",
    title: "Brow Shaping & Lamination",
    image: images.brows,
    look: "Brows",
    duration: "45 min",
    from: 1500,
    short: "Threading, tint and lamination for brows that frame the whole look.",
    details:
      "Brows finish the lashes. Choose a clean threading and shape, add a tint for definition, or go for lamination for that brushed-up, fluffy brow that stays in place for weeks.",
    includes: ["Brow mapping", "Threading & tidy-up", "Tint (optional)", "Lamination (optional)"],
  },
  {
    id: "nails-gel",
    title: "Gel Nails & Nail Art",
    image: images.ownNailsMaroon,
    position: "50% 45%",
    look: "Nails",
    duration: "1 hr",
    from: 1500,
    short: "Glossy gel on your natural nails, with French tips, swirls and hand-drawn art.",
    details:
      "A neat, long-lasting gel finish on your own nails. Keep it simple with one colour, or add French tips and hand-drawn designs. Bring a picture of the look you love and we will match it.",
    includes: ["Nail shaping & cuticle care", "Gel colour of your choice", "French tips or simple art", "High-gloss top coat"],
  },
  {
    id: "nails-long",
    title: "Long Nail Extensions",
    image: images.ownNailsRed,
    position: "50% 40%",
    look: "Nails",
    duration: "2 hrs",
    from: 2500,
    short: "Long stiletto, almond or coffin nails, finished in gel with your choice of design.",
    details:
      "Extra length in the shape you want, built up and finished in gel. Choose a bold single colour, an accent nail or gold detail like our butterfly set.",
    includes: ["Length & shape of your choice", "Gel colour finish", "Accent nails & gold detail", "Aftercare advice"],
  },
];

/** Prices in KES. Refills are for appointments within 2–3 weeks of a full set. */
export type Tier = {
  id: string;
  name: string;
  fullSet: number;
  refill: number;
  blurb: string;
  features: string[];
  popular?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "classic",
    name: "Classic",
    fullSet: 2500,
    refill: 1500,
    blurb: "Natural, defined, everyday.",
    features: ["1:1 classic extensions", "Custom lash map", "Low-fume adhesive", "Aftercare kit"],
  },
  {
    id: "hybrid",
    name: "Hybrid",
    fullSet: 3500,
    refill: 2000,
    blurb: "Soft glam with wispy texture.",
    popular: true,
    features: ["Classics + handmade fans", "Wispy or textured finish", "Lash bath & cleanse", "Aftercare kit", "Free brow tidy-up"],
  },
  {
    id: "volume",
    name: "Volume",
    fullSet: 4500,
    refill: 2500,
    blurb: "Full, fluffy, camera ready.",
    features: ["Handmade 3D–6D fans", "Dense dark lash line", "Lash bath & cleanse", "Aftercare kit", "Free brow tidy-up"],
  },
];

export const extras = [
  { name: "Mega Volume & Wispy", price: 5500 },
  { name: "Lash Lift & Tint", price: 2500 },
  { name: "Brow Lamination & Tint", price: 2500 },
  { name: "Brow Threading", price: 500 },
  { name: "Lash Removal", price: 800 },
  { name: "Gel Nails & Nail Art", price: 1500 },
  { name: "Long Nail Extensions", price: 2500 },
];

export const artists = [
  {
    role: "Lead Lash Artist",
    focus: "Volume & Mega Volume",
    image: images.ownArtist,
    position: "55% 35%",
    tags: ["Handmade fans", "Wispy sets"],
    bio: "Maps every set to your eye shape and leads our signature volume work.",
  },
  {
    role: "Lash Artist",
    focus: "Classic & Hybrid",
    image: images.ownLashMirror,
    position: "50% 40%",
    tags: ["First sets", "Natural looks"],
    bio: "Perfect for first-timers. Soft, natural sets that feel weightless.",
  },
  {
    role: "Brow Artist",
    focus: "Brows & Lamination",
    image: images.brows,
    position: "60% 50%",
    tags: ["Threading", "Lamination"],
    bio: "Shapes, tints and laminates brows that balance your lashes.",
  },
  {
    role: "Lash Lift Specialist",
    focus: "Lifts & Tints",
    image: images.isolation,
    position: "50% 50%",
    tags: ["Lash lift", "Keratin"],
    bio: "Curls and tints your natural lashes for low-maintenance beauty.",
  },
];

export const looks: { name: string; text: string; image: string; position?: string; set: string }[] = [
  { name: "Natural", text: "Soft classic set, closest to your own lashes.", image: images.ownClientLashes, position: "50% 22%", set: "Classic" },
  { name: "Wispy", text: "Spiky, textured and full of movement.", image: images.ownLash, set: "Hybrid / Mega" },
  { name: "Cat Eye", text: "Longer at the outer corner for a lifted, sultry eye.", image: images.catEye, set: "Any set" },
  { name: "Doll Eye", text: "Longest at the centre to open and round the eye.", image: images.ownLashVolume, position: "55% 50%", set: "Volume" },
];

export type GalleryCategory = "Lashes" | "Nails" | "Brows" | "Studio" | "Process";

export const gallery: { src: string; alt: string; category: GalleryCategory; tall?: boolean }[] = [
  { src: images.ownLash, alt: "Wispy lash set done at Wowlash Maison", category: "Lashes" },
  { src: images.ownNailsPinkGold, alt: "Nude stiletto nails with white tips and gold lines", category: "Nails", tall: true },
  { src: images.ownArtist, alt: "Our lash artist working under the ring light", category: "Process", tall: true },
  { src: images.ownLashVolume, alt: "Full, fluffy volume lash set", category: "Lashes" },
  { src: images.ownNailsRed, alt: "Long red stiletto nails with gold butterfly accent", category: "Nails", tall: true },
  { src: images.ownLashMirror, alt: "Client checking her new lashes in the mirror", category: "Lashes", tall: true },
  { src: images.ownNailsMaroon, alt: "Maroon almond nails with flower accent", category: "Nails", tall: true },
  { src: images.ownLashSide, alt: "Side view of a dark, full lash set", category: "Lashes", tall: true },
  { src: images.ownClientLashes, alt: "Happy client with a natural lash set", category: "Lashes", tall: true },
  { src: images.ownNailsSwirl, alt: "Short nude gel nails with black swirl art", category: "Nails" },
  { src: images.ownLashMirror2, alt: "Lash set and brows seen in the mirror", category: "Lashes", tall: true },
  { src: images.brows, alt: "Brow threading for a clean shape", category: "Brows" },
  { src: images.studioWall, alt: "Calm studio corner with plants", category: "Studio", tall: true },
  { src: images.studioMirror, alt: "Vanity mirror and diffuser in the studio", category: "Studio" },
];

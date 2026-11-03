import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site } from "@/data/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Builds a wa.me link with a pre-filled message to the gym's WhatsApp. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappIntl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatKES(n: number) {
  return "KES " + n.toLocaleString("en-KE");
}

/** Is the gym open right now, in Nairobi time? */
export function openStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday"); // Mon, Tue ...
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const toMin = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const today = site.hours.find((h) => h.days.includes(day));
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: `Open now · until ${to12(today.close)}` };
  }
  if (today && minutes < toMin(today.open)) {
    return { open: false, label: `Closed · opens ${to12(today.open)}` };
  }
  // closed for the rest of today: find the next day with hours
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const start = week.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const next = week[(start + i) % 7];
    const h = site.hours.find((x) => x.days.includes(next));
    if (h) return { open: false, label: `Closed · opens ${i === 1 ? "tomorrow" : next} ${to12(h.open)}` };
  }
  return { open: false, label: "Closed" };
}

export function to12(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${m ? ":" + String(m).padStart(2, "0") : ""} ${suffix}`;
}

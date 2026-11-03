import { Building2, Clock, Fuel, MapPin, Navigation, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/data/site";
import { openStatus, to12 } from "@/lib/utils";

export function Location() {
  const status = openStatus();
  const q = encodeURIComponent(site.mapsQuery);

  return (
    <section id="location" className="bg-ink py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="Find Us"
          title={
            <>
              Thindigua, <span className="text-brand">Kiambu Road.</span>
            </>
          }
          intro="Look for Astrol Petrol Station. We're right across the road in Joe's Apartment, with easy parking and quick access from Ridgeways, Runda and Kiambu town."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
          <Reveal className="card flex flex-col p-7 sm:p-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-soft">
              <span className={`h-2 w-2 rounded-full ${status.open ? "animate-pulse bg-emerald-400" : "bg-muted"}`} />
              {status.label}
            </span>
            <h3 className="display mt-6 text-5xl font-bold">Wowlash Maison</h3>
            <p className="label mt-2 text-brand">Lash, Nail & Brow Studio</p>

            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-4">
                <Building2 className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-soft">{site.building}</span>
              </li>
              <li className="flex gap-4">
                <Fuel className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-soft">{site.landmark}</span>
              </li>
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-soft">{site.area}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="h-5 w-5 shrink-0 text-brand" />
                <a href={site.phoneHref} className="text-soft hover:text-brand">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="h-5 w-5 shrink-0 text-brand" />
                <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
                  {site.hours.map((h) => (
                    <div key={h.label} className="contents">
                      <dt className="text-muted">{h.label}</dt>
                      <dd className="text-soft">
                        {to12(h.open)} to {to12(h.close)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            </ul>

            <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2">
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noreferrer" className="btn-primary">
                <Navigation className="h-4 w-4" /> Directions
              </a>
              <a href={site.phoneHref} className="btn-outline">
                <Phone className="h-4 w-4" /> Call Us
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[420px] overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Map showing Wowlash Maison opposite Astrol Petrol Station, Thindigua, Kiambu Road"
              src={`https://www.google.com/maps?q=${q}&z=16&output=embed`}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-2xl border border-line bg-card/95 px-4 py-3 backdrop-blur">
              <p className="font-label text-[9px] font-bold uppercase tracking-[0.2em] text-muted">Joe's Apartment, opposite</p>
              <p className="font-display text-2xl text-heading">
                Astrol <span className="text-brand">· Thindigua</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { extras, tiers } from "@/data/site";
import { cn, formatKES } from "@/lib/utils";

export type Visit = "full" | "refill";

export function Pricing({ onSelect }: { onSelect: (serviceId: string, visit: Visit) => void }) {
  const [visit, setVisit] = useState<Visit>("full");

  return (
    <section id="pricing" className="relative bg-ink py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          kicker="Pricing"
          title={
            <>
              Choose your <span className="text-brand">lash.</span>
            </>
          }
          intro="Clear prices, no surprises. Pay by M-Pesa or cash after your appointment."
        />

        <div className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Visit type" className="relative inline-flex rounded-full border border-line bg-card p-1">
            {(
              [
                ["full", "Full Set"],
                ["refill", "Refill"],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                role="tab"
                aria-selected={visit === v}
                onClick={() => setVisit(v)}
                className={cn(
                  "relative z-10 flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 font-label text-[10px] font-bold uppercase tracking-[0.14em] transition sm:px-6 sm:text-[11px] sm:tracking-[0.16em]",
                  visit === v ? "text-on-brand" : "text-muted hover:text-heading"
                )}
              >
                {visit === v && (
                  <motion.span layoutId="visit-pill" className="absolute inset-0 -z-10 rounded-full bg-brand" transition={{ type: "spring", damping: 25, stiffness: 300 }} />
                )}
                {label}
                {v === "refill" && (
                  <span className={cn("hidden rounded-full px-2 py-0.5 text-[9px] sm:inline", visit === v ? "bg-ink text-brand" : "bg-brand/15 text-brand")}>
                    Within 2–3 wks
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => {
            const price = visit === "full" ? t.fullSet : t.refill;
            return (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8 transition-transform duration-300 hover:-translate-y-1",
                  t.popular
                    ? "border-brand bg-gradient-to-b from-[#3a1428] to-card shadow-[0_30px_80px_-30px_rgba(244,114,182,0.35)] lg:-my-4 lg:py-12"
                    : "border-line bg-card"
                )}
              >
                {t.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1.5 font-label text-[9px] font-bold uppercase tracking-[0.2em] text-on-brand">
                    Most Popular
                  </span>
                )}
                <p className="label text-muted">{String(i + 1).padStart(2, "0")} · {visit === "full" ? "Full Set" : "Refill"}</p>
                <h3 className="display mt-2 text-5xl">{t.name}</h3>
                <p className="mt-2 text-sm text-muted">{t.blurb}</p>

                <div className="mt-8 flex items-end gap-2">
                  <span className="font-label text-sm font-bold text-muted">KES</span>
                  <motion.span key={price} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-7xl leading-[0.8] text-heading">
                    {price.toLocaleString("en-KE")}
                  </motion.span>
                </div>
                <p className="mt-3 h-5 text-xs text-muted">
                  {visit === "full" ? (
                    <>
                      Refills from <span className="text-brand">{formatKES(t.refill)}</span>
                    </>
                  ) : (
                    "Must still have about 50% of your set"
                  )}
                </p>

                <ul className="mt-8 flex-1 space-y-3.5 border-t border-line pt-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {f}
                    </li>
                  ))}
                </ul>

                <button onClick={() => onSelect(t.id, visit)} className={cn("mt-10 w-full", t.popular ? "btn-primary" : "btn-outline")}>
                  Book {t.name}
                </button>
              </motion.article>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-3xl card p-6 sm:p-8">
          <p className="label text-brand">Also on the menu</p>
          <ul className="mt-5 divide-y divide-line">
            {extras.map((x) => (
              <li key={x.name} className="flex items-baseline justify-between gap-4 py-3">
                <span className="text-soft">{x.name}</span>
                <span className="mx-2 flex-1 border-b border-dotted border-line" />
                <span className="font-display text-xl text-heading">{formatKES(x.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

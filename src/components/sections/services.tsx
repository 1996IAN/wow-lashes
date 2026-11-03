import { motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Sparkles } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services, type Service } from "@/data/site";
import { formatKES, whatsappLink } from "@/lib/utils";

export function Services({ onBook }: { onBook: (serviceId?: string) => void }) {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="services" className="bg-ink py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="Services"
          title={
            <>
              Find your <span className="text-brand">set.</span>
            </>
          }
          intro="From barely-there classic lashes to long nail sets. Tap any service to see what's included."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => setSelected(s)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              className="group card relative flex flex-col overflow-hidden text-left transition hover:border-brand/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  style={{ objectPosition: s.position ?? "50% 50%" }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-black/5 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 font-label text-[9px] font-bold uppercase tracking-[0.16em] text-on-brand">
                  <Sparkles className="h-3 w-3" /> {s.look}
                </span>
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 font-label text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                  <Clock className="h-3 w-3 text-brand" /> {s.duration}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 pt-2">
                <span className="font-display text-lg text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-3xl">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-label text-[11px] font-bold uppercase tracking-[0.14em] text-heading">
                    From <span className="text-brand">{formatKES(s.from)}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-heading transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} label={selected?.title ?? "Service"}>
        {selected && (
          <>
            <div className="relative aspect-[16/8]">
              <img src={selected.image} alt="" className="h-full w-full object-cover" style={{ objectPosition: selected.position ?? "50% 50%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
              <div className="absolute bottom-4 left-6 flex gap-2">
                <span className="rounded-full bg-brand px-3 py-1 font-label text-[9px] font-bold uppercase tracking-[0.14em] text-on-brand">{selected.look}</span>
                <span className="rounded-full bg-black/70 px-3 py-1 font-label text-[9px] font-bold uppercase tracking-[0.14em] text-white">{selected.duration}</span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h3 className="display text-5xl">{selected.title}</h3>
                <p className="font-display text-3xl text-brand">from {formatKES(selected.from)}</p>
              </div>
              <p className="mt-4 leading-relaxed text-soft/85">{selected.details}</p>
              <p className="label mt-8 text-muted">What's included</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {selected.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  className="btn-primary"
                  onClick={() => {
                    const id = selected.id;
                    setSelected(null);
                    onBook(id);
                  }}
                >
                  Book This Service
                </button>
                <a
                  className="btn-outline"
                  href={whatsappLink(`Hi Wowlash Maison, I'd like to know more about ${selected.title}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}

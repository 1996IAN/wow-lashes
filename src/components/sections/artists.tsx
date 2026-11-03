import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { Instagram } from "@/components/ui/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { artists, site } from "@/data/site";
import { whatsappLink } from "@/lib/utils";

export function Artists() {
  return (
    <section id="artists" className="bg-charcoal py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="Our Artists"
          title={
            <>
              Meet your <span className="text-brand">artists.</span>
            </>
          }
          intro="Steady hands, trained eyes and a lot of patience. Book with the specialist that suits your look."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((a, i) => (
            <motion.article
              key={a.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group card flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={a.image}
                  alt={`${a.role}, ${a.focus}`}
                  loading="lazy"
                  style={{ objectPosition: a.position }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition group-hover:opacity-100">
                  <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white hover:bg-brand hover:text-on-brand">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white hover:bg-brand hover:text-on-brand">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
                <span className="absolute bottom-3 left-4 rounded-full bg-brand px-2.5 py-1 font-label text-[9px] font-bold uppercase tracking-[0.16em] text-on-brand">
                  {a.role}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="display text-3xl">{a.focus}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.bio}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-soft">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={whatsappLink(`Hi Wowlash Maison, I'd like to book with your ${a.role} (${a.focus}).`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-heading transition hover:text-brand"
                >
                  <CalendarCheck className="h-4 w-4 text-brand" /> Book with them
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

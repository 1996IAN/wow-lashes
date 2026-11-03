import { motion } from "framer-motion";
import { BadgeCheck, Droplets, Moon, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { images, looks } from "@/data/site";

const aftercare = [
  { icon: Droplets, text: "Keep lashes dry for the first 24 hours" },
  { icon: Sparkles, text: "Cleanse daily with a lash foam, brush gently" },
  { icon: Moon, text: "Sleep on your back or a silk pillow" },
  { icon: BadgeCheck, text: "Book a refill every 2–3 weeks" },
];

export function Looks({ onBook }: { onBook: () => void }) {
  return (
    <section id="looks" className="bg-ink py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="Lash Styles"
          title={
            <>
              Real looks. <span className="text-brand">Real results.</span>
            </>
          }
          intro="Not sure what to ask for? These are the four styles we map most often. Your artist will help you choose."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {looks.map((l, i) => (
            <motion.article
              key={l.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-line"
            >
              <img src={l.image} alt={`${l.name} lash style`} loading="lazy" style={{ objectPosition: l.position ?? "50% 50%" }} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-label text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                {l.set}
              </span>
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-display text-5xl leading-none text-white">{l.name}</p>
                <p className="mt-2 text-sm text-heading/85">{l.text}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid overflow-hidden rounded-3xl border border-line lg:grid-cols-[1fr_1.4fr]">
          <div className="relative min-h-60">
            <img src={images.freshFace} alt="Relaxed client after a lash appointment" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="bg-card p-8 sm:p-10">
            <h3 className="display text-4xl sm:text-5xl">
              Make your set <span className="text-brand">last.</span>
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {aftercare.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3 text-sm text-soft">
                  <Icon className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.5} /> {text}
                </li>
              ))}
            </ul>
            <button onClick={onBook} className="btn-primary mt-8">
              Book Your Set
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

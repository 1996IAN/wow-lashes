import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/data/site";

const work = [
  { image: images.ownLash, position: "55% 40%", title: "Wispy lash set", text: "Soft, spiky and light on the eye.", service: "mega" },
  { image: images.ownLashVolume, position: "55% 45%", title: "Full volume set", text: "Dark, fluffy and full from corner to corner.", service: "volume" },
  { image: images.ownLashMirror, position: "50% 40%", title: "Soft hybrid set", text: "The mirror check every client gets before leaving.", service: "hybrid" },
  { image: images.ownNailsRed, position: "50% 45%", title: "Red stiletto nails", text: "Long and glossy, with a gold butterfly accent.", service: "nails-long" },
  { image: images.ownNailsPinkGold, position: "50% 45%", title: "Nude & gold stiletto", text: "White tips, gold lines and a hand-drawn flower.", service: "nails-long" },
  { image: images.ownNailsMaroon, position: "50% 40%", title: "Maroon almond nails", text: "Rich gel colour with a flower accent nail.", service: "nails-gel" },
];

export function OurWork({ onBook }: { onBook: (serviceId: string) => void }) {
  return (
    <section id="work" className="bg-charcoal py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          kicker="Our Work"
          title={
            <>
              Done by <span className="text-brand">our hands.</span>
            </>
          }
          intro="These are real sets from our own clients, lashes and nails. See something you love? Tap to book it."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {work.map((w, i) => (
            <motion.button
              key={w.title}
              onClick={() => onBook(w.service)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group card flex flex-col overflow-hidden text-left transition hover:border-brand/60"
            >
              <span className="block aspect-square overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  loading="lazy"
                  style={{ objectPosition: w.position }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-1 flex-col p-4 sm:p-6">
                <span className="display text-xl sm:text-3xl">{w.title}</span>
                <span className="mt-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">{w.text}</span>
                <span className="mt-5 inline-flex items-center gap-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                  Book this look <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

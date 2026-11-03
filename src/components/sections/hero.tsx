import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { images } from "@/data/site";
import { openStatus } from "@/lib/utils";

const slides = [
  { src: images.ownLash, position: "50% 45%", caption: "Our own lash work · Thindigua, Kiambu Road" },
  { src: images.ownNailsRed, position: "50% 40%", caption: "Our own nail work · long stiletto set" },
  { src: images.ownNailsSwirl, position: "50% 50%", caption: "Our own nail work · gel with hand-drawn swirls" },
];

const highlights = [
  { icon: MapPin, label: "Opposite Astrol, Thindigua" },
  { icon: Sparkles, label: "Custom Lash Mapping" },
  { icon: ShieldCheck, label: "Certified Artists" },
];

export function Hero({ onBook }: { onBook: () => void }) {
  const [index, setIndex] = useState(0);
  const status = openStatus();

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink grain">
      <AnimatePresence mode="sync">
        <motion.img
          key={slides[index].src}
          src={slides[index].src}
          alt=""
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: slides[index].position }}
          fetchPriority="high"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-ink/55 md:bg-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink from-20% via-ink/70 via-45% to-transparent to-70%" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent via-30% to-ink/10" />

      <div className="container-x relative z-10 pb-10 pt-32 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="label text-brand">Lashes · Nails · Brows</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3 py-1.5 text-[11px] font-semibold text-soft backdrop-blur">
            <span className={`h-2 w-2 rounded-full ${status.open ? "animate-pulse bg-emerald-400" : "bg-muted"}`} />
            {status.label}
          </span>
        </motion.div>

        <h1 className="display max-w-4xl text-[48px] sm:text-[80px] lg:text-[100px]">
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {i === 0 ? (
                "Lashes that"
              ) : (
                <>
                  speak <span className="text-brand">first.</span>
                </>
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-soft sm:text-lg"
        >
          Wowlash Maison is a calm, private lash and nail studio on Kiambu Road. Every set is mapped to your eye shape and applied by
          hand, so you wake up looking rested, polished and completely you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <button onClick={onBook} className="btn-primary !px-9 !py-4">
            Book Now <ArrowRight className="h-4 w-4" />
          </button>
          <a href="#services" className="btn-outline !px-9 !py-4">
            Explore Services
          </a>
        </motion.div>

        <div className="mt-14 grid gap-6 border-t border-heading/15 pt-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="flex items-center gap-4">
            <span className="font-display text-4xl text-heading">
              {String(index + 1).padStart(2, "0")}
              <span className="text-muted"> / {String(slides.length).padStart(2, "0")}</span>
            </span>
            <div className="flex gap-1.5">
              {slides.map((s, i) => (
                <button key={s.src} aria-label={`Show slide ${i + 1}`} onClick={() => setIndex(i)} className="relative h-[2px] w-10 overflow-hidden bg-heading/20">
                  {i === index && (
                    <motion.span
                      className="absolute inset-0 origin-left bg-brand"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6.5, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-muted md:text-center"
            >
              {slides[index].caption}
            </motion.p>
          </AnimatePresence>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-heading">
                <Icon className="h-4 w-4 text-brand" /> {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

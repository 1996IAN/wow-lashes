import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { gallery, type GalleryCategory } from "@/data/site";
import { cn } from "@/lib/utils";

const filters: ("All" | GalleryCategory)[] = ["All", "Lashes", "Nails", "Brows", "Studio", "Process"];

export function Gallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, step]);

  return (
    <section id="gallery" className="bg-charcoal py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Gallery"
            title={
              <>
                Inside the <span className="text-brand">Maison</span>
              </>
            }
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="tablist" aria-label="Filter gallery">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "border px-4 py-2 font-label text-[10px] font-extrabold uppercase tracking-[0.16em] transition",
                  filter === f ? "border-brand bg-brand text-on-brand" : "border-line text-muted hover:border-heading/40 hover:text-heading"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button
                layout
                key={g.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setLightbox(i)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl"
                aria-label={`Open photo: ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={cn("w-full object-cover transition duration-700 group-hover:scale-105", g.tall ? "aspect-[3/4]" : "aspect-[4/3]")}
                />
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-transparent p-4 opacity-0 transition group-hover:opacity-100">
                  <span className="text-left text-sm font-medium text-white">{g.alt}</span>
                  <Expand className="h-5 w-5 shrink-0 text-brand" />
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-label text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                  {g.category}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && items[lightbox] && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <div className="flex items-center justify-between p-4 text-white">
              <span className="font-display text-2xl">
                {String(lightbox + 1).padStart(2, "0")} <span className="text-muted">/ {String(items.length).padStart(2, "0")}</span>
              </span>
              <button aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-brand hover:text-on-brand">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.figure
                  key={items[lightbox].src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex max-h-full flex-col items-center"
                >
                  <img src={items[lightbox].src} alt={items[lightbox].alt} className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain" />
                  <figcaption className="mt-4 text-center text-sm text-muted">{items[lightbox].alt}</figcaption>
                </motion.figure>
              </AnimatePresence>
              <button onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-brand hover:text-on-brand sm:left-6">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-brand hover:text-on-brand sm:right-6">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

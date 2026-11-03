import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter((el): el is Element => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-line bg-ink/85 backdrop-blur-md" : "bg-gradient-to-b from-ink/90 to-transparent"
        )}
      >
        <div className="container-x flex h-[84px] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "group relative whitespace-nowrap py-2 font-label text-[10.5px] font-bold uppercase tracking-[0.16em] transition-colors",
                  active === l.href ? "text-heading" : "text-muted hover:text-heading"
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-brand transition-all duration-300",
                    active === l.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-heading transition hover:text-brand lg:flex xl:hidden 2xl:flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line">
                <Phone className="h-4 w-4 text-brand" />
              </span>
              {site.phone}
            </a>
            <button onClick={onBook} className="btn-primary hidden whitespace-nowrap !py-3 sm:inline-flex">
              Book Now <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-heading xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink glow-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-x flex h-[84px] items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full bg-brand text-on-brand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-x flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-6">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="group flex items-baseline gap-4 py-1"
                >
                  <span className="font-label text-[10px] font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-5xl transition group-hover:text-brand">{l.label}</span>
                </motion.a>
              ))}
            </nav>
            <div className="container-x grid gap-3 pb-8 sm:grid-cols-2">
              <a href={site.phoneHref} className="btn-outline">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  onBook();
                }}
                className="btn-primary"
              >
                Book Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

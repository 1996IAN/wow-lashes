import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { images } from "@/data/site";

const stats = [
  { value: 4, prefix: "3–", suffix: " Wks", label: "Lasting Wear", text: "Typical retention with good aftercare." },
  { value: 7, suffix: " Days", label: "Flexible Booking", text: "Weekday, Saturday and Sunday slots." },
  { value: 100, suffix: "%", label: "Personalised Mapping", text: "Every set designed for your eyes." },
];

function CountUp({ to, prefix = "", suffix }: { to: number; prefix?: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
      <span className="text-brand">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden border-y border-line py-24 sm:py-28">
      <img src={images.trays} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink" />
      <div className="container-x relative">
        <p className="label mb-12 text-center text-brand">Beauty on your schedule</p>
        <div className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:px-8">
              <p className="whitespace-nowrap font-display text-[64px] leading-none text-heading sm:text-[84px] md:text-[38px] lg:text-[60px] xl:text-[76px]">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-label text-xs font-bold uppercase tracking-[0.18em] text-heading">{s.label}</p>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowRight, Award, Gem, HeartHandshake, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/section-heading";
import { images } from "@/data/site";

const badges = [
  { icon: Award, label: "Certified Artists" },
  { icon: Sparkles, label: "Premium Lash Fibres" },
  { icon: Gem, label: "Fair, Clear Pricing" },
  { icon: HeartHandshake, label: "Lasting Results" },
];

export function CtaBanner({ onBook }: { onBook: () => void }) {
  return (
    <section id="cta" className="relative overflow-hidden py-20 sm:py-28">
      <img src={images.relax} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
      <div className="absolute inset-0 bg-ink/50 md:bg-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="container-x relative">
        <Reveal className="max-w-3xl">
          <p className="label text-brand">Ready when you are</p>
          <h2 className="display mt-4 text-5xl sm:text-7xl lg:text-[92px]">
            Your lash journey <span className="text-brand">starts today.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-soft">
            Lie back, relax and wake up tomorrow without needing mascara. Slots fill quickly on weekends, so book early.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button onClick={onBook} className="btn-primary !px-9 !py-4">
              Book Now <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#contact" className="btn-outline !px-9 !py-4">
              Ask a Question
            </a>
          </div>
        </Reveal>
        <ul className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {badges.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl border border-line bg-card/85 p-5 backdrop-blur">
              <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.4} />
              <span className="font-label text-[10px] font-bold uppercase tracking-[0.14em] text-heading">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

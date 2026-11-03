import { motion } from "framer-motion";
import { Award, CalendarHeart, Gem, HeartHandshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    icon: Award,
    title: "Certified Artists",
    text: "Trained, certified lash technicians who map every set to your eye shape, natural lash strength and lifestyle.",
  },
  {
    icon: Gem,
    title: "Premium Products",
    text: "Soft, lightweight lash fibres and medical-grade, low-fume adhesive. Clean tools and fresh pads for every client.",
  },
  {
    icon: CalendarHeart,
    title: "Easy Booking & Refills",
    text: "Book on WhatsApp in a minute. Refill pricing within 2–3 weeks keeps your lashes full for less.",
  },
  {
    icon: HeartHandshake,
    title: "Lasting Results",
    text: "Proper isolation and aftercare mean better retention, healthier natural lashes and sets that still look fresh weeks later.",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative bg-ink py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker="Why Wowlash"
            title={
              <>
                Detail is <span className="text-brand">everything.</span>
              </>
            }
          />
          <p className="max-w-md text-muted lg:pb-3">
            Great lashes are not about adding as much as possible. They are about the right length, curl and weight for your
            eyes. That is what we obsess over.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group card relative flex flex-col overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_24px_50px_-24px_rgba(168,42,96,0.3)]"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-6xl leading-none text-brand">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="h-8 w-8 text-heading/70 transition group-hover:text-brand" strokeWidth={1.3} />
              </div>
              <h3 className="mt-10 font-label text-sm font-bold uppercase tracking-[0.16em] text-heading">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

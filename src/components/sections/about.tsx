import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/section-heading";
import { images } from "@/data/site";

const points = [
  { title: "Your Eyes First", text: "Every set starts with a consultation and a lash map built around your eye shape." },
  { title: "Spotless Standards", text: "Sanitised tools, fresh pads and disposable brushes for every single client." },
  { title: "Never Rushed", text: "One client per artist, unhurried appointments and a calm, private room." },
  { title: "Healthy Lashes", text: "We never overload your natural lashes. Beautiful today, healthy for years." },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative pb-16 pl-4 pr-10 sm:pl-6"
        >
          <div className="absolute bottom-10 left-0 top-6 w-[calc(100%-3rem)] rounded-[2rem] border border-brand/70" />
          <img
            src={images.studioWall}
            alt="A calm, plant-filled corner of the Wowlash Maison studio"
            loading="lazy"
            className="relative aspect-square w-full rounded-[1.75rem] object-cover"
          />
          <figure className="absolute -bottom-2 right-0 w-[42%] overflow-hidden rounded-2xl border-4 border-charcoal shadow-2xl">
            <img src={images.studioMirror} alt="Vanity mirror in the studio" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <figcaption className="bg-ink px-3 py-2 font-label text-[9px] font-bold uppercase tracking-[0.16em] text-muted">The vanity</figcaption>
          </figure>
          <div className="absolute left-0 top-12 rounded-2xl bg-brand px-5 py-4 shadow-xl">
            <p className="font-display text-3xl font-semibold leading-tight text-on-brand">Thindigua</p>
            <p className="mt-1 font-label text-[9px] font-bold uppercase tracking-[0.2em] text-on-brand/80">Kiambu Road</p>
          </div>
        </motion.div>

        <div>
          <Reveal>
            <p className="label mb-4 flex items-center gap-3 text-brand">
              <span className="h-px w-8 bg-brand" /> About Us
            </p>
            <h2 className="display text-[40px] sm:text-5xl lg:text-[64px]">
              More than lashes. <br />
              <span className="text-brand">A little luxury,</span> every few weeks.
            </h2>
            <p className="mt-6 leading-relaxed text-muted sm:text-lg">
              Wowlash Maison was created for women who want to look effortless without spending every morning on mascara.
              Tucked into Joe's Apartment opposite Astrol on Kiambu Road, our studio is a quiet escape from the traffic: soft
              music, a comfortable bed and two hours that are just for you.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="border-l border-line pl-5 transition hover:border-brand">
                  <h3 className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.14em] text-heading">
                    <Check className="h-4 w-4 text-brand" /> {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

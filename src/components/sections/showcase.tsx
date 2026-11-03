import { Clock, MapPin, Sparkles } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { images } from "@/data/site";
import { openStatus } from "@/lib/utils";

export function Showcase() {
  const status = openStatus();
  return (
    <section id="studio" className="relative overflow-hidden bg-charcoal glow-bg">
      <ContainerScroll
        titleComponent={
          <>
            <p className="label mb-4 text-brand">The Studio</p>
            <h2 className="display text-[40px] sm:text-6xl lg:text-[84px]">
              Step inside <br />
              the <span className="text-brand">Maison</span>
            </h2>
            <p className="mx-auto mb-10 mt-5 max-w-xl text-muted md:mb-24">
              A quiet, private studio where you lie back, close your eyes and leave with lashes that feel weightless.
            </p>
          </>
        }
      >
        <div className="relative h-full w-full overflow-hidden bg-black">
          {/* the photo is portrait, so a blurred copy fills the wide card behind the full photo */}
          <img src={images.ownArtist} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" draggable={false} />
          <img
            src={images.ownArtist}
            alt="Our lash artist applying extensions under the ring light at Wowlash Maison"
            className="relative h-full w-full object-contain"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2 md:left-6 md:top-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/70 px-3.5 py-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Now booking
            </span>
            <span className="hidden items-center gap-2 rounded-full bg-black/70 px-3.5 py-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur sm:inline-flex">
              <span className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-400" : "bg-muted"}`} />
              {status.label}
            </span>
          </div>

          <div className="absolute right-3 top-3 hidden rounded-2xl border border-white/15 bg-black/70 p-4 text-right backdrop-blur md:right-6 md:top-6 md:block">
            <p className="font-label text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">Retention</p>
            <p className="font-display text-5xl leading-none text-white">
              3–4<span className="text-2xl text-brand"> wks</span>
            </p>
            <p className="mt-1 text-[11px] text-white/70">with proper aftercare</p>
          </div>

          <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-2 md:inset-x-6 md:bottom-6 md:gap-3">
            {[
              { icon: Sparkles, k: "Signature", v: "Hybrid" },
              { icon: Clock, k: "Full Set", v: "~2 hrs" },
              { icon: MapPin, k: "Find Us", v: "Thindigua" },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="rounded-xl border border-white/10 bg-black/70 p-2.5 backdrop-blur md:p-4">
                <Icon className="mb-1.5 h-4 w-4 text-brand" />
                <p className="font-label text-[8px] font-bold uppercase tracking-[0.18em] text-white/70 md:text-[9px]">{k}</p>
                <p className="font-display text-xl leading-none text-white md:text-3xl">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

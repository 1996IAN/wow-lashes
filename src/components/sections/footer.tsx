import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Instagram } from "@/components/ui/brand-icons";
import { Logo } from "@/components/ui/logo";
import { navLinks, services, site } from "@/data/site";
import { to12, whatsappLink } from "@/lib/utils";

export function Footer() {
  const socials = [
    { icon: Instagram, href: site.socials.instagram, label: "Instagram @wowlashmaison" },
  ];

  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="overflow-hidden border-b border-line py-6">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10" aria-hidden={k === 1}>
              {["Classic", "Hybrid", "Volume", "Wispy", "Lash Lift", "Nails", "Brows", "Wowlash Maison"].map((w) => (
                <span key={w} className="flex items-center gap-10 font-display text-5xl text-heading/10">
                  {w} <span className="text-brand/50">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <Logo size="lg" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            A calm lash, nail & brow studio in Thindigua, Kiambu Road. Hand-mapped sets, premium products and work that lasts.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-brand hover:bg-brand hover:text-on-brand">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Explore">
          {navLinks.slice(0, 6).map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {services.map((s) => (
            <FooterLink key={s.id} href="#services">
              {s.title}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Hours">
          {site.hours.map((h) => (
            <li key={h.label} className="text-sm">
              <span className="block text-heading">{h.label}</span>
              <span className="text-muted">
                {to12(h.open)} to {to12(h.close)}
              </span>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Visit Us">
          <li className="text-sm text-muted">{site.address}</li>
          <li>
            <a href={site.phoneHref} className="flex items-center gap-2 text-sm text-heading hover:text-brand">
              <Phone className="h-4 w-4 text-brand" /> {site.phone}
            </a>
          </li>
          <li>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-heading hover:text-brand">
              <MessageCircle className="h-4 w-4 text-brand" /> WhatsApp us
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="text-sm text-heading hover:text-brand">
              {site.email}
            </a>
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 pb-24 text-xs text-muted sm:flex-row sm:pb-6">
          <p>© {new Date().getFullYear()} Wowlash Maison, Thindigua. All rights reserved.</p>
          <a href="#home" className="flex items-center gap-2 font-label font-bold uppercase tracking-[0.16em] hover:text-heading">
            Back to top <ArrowUp className="h-3.5 w-3.5 text-brand" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="label mb-5 text-heading">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a href={href} className="text-sm text-muted transition hover:pl-1 hover:text-brand">
        {children}
      </a>
    </li>
  );
}

export function FloatingActions() {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 hidden items-center gap-3 sm:flex">
        <span
          className={`whitespace-nowrap rounded-full border border-line bg-charcoal px-4 py-2.5 text-sm text-heading shadow-xl transition-all duration-300 ${
            hover ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-3 opacity-0"
          }`}
        >
          Book or ask us anything ✨
        </span>
        <a
          href={whatsappLink("Hello Wowlash Maison! I would like to book a lash appointment.")}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.6)] transition hover:scale-110"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <WhatsAppGlyph className="relative h-7 w-7" />
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-ink/95 backdrop-blur sm:hidden">
        <a href={site.phoneHref} className="flex items-center justify-center gap-2 py-4 font-label text-[11px] font-bold uppercase tracking-[0.16em] text-heading">
          <Phone className="h-4 w-4 text-brand" /> Call
        </a>
        <a
          href={whatsappLink("Hello Wowlash Maison! I would like to book a lash appointment.")}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] py-4 font-label text-[11px] font-bold uppercase tracking-[0.16em] text-white"
        >
          <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.41 9.41 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.7L.55 23.62l6.04-1.58a11.36 11.36 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z" />
    </svg>
  );
}

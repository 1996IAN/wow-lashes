import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/data/site";
import { cn, to12, whatsappLink } from "@/lib/utils";

type Form = { name: string; phone: string; interest: string; message: string };
const empty: Form = { name: "", phone: "", interest: "Lash Extensions", message: "" };
type Via = "whatsapp" | "email";
const KENYAN_PHONE = /^(?:\+?254|0)(?:7|1)\d{8}$/;

export function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState<(Form & { via: Via }) | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const via: Via = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "email" ? "email" : "whatsapp";
    const errs: typeof errors = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name.";
    if (!KENYAN_PHONE.test(form.phone.replace(/\s|-/g, ""))) errs.phone = "Enter a valid Kenyan number, e.g. 0712 345 678.";
    if (form.message.trim().length < 10) errs.message = "A little more detail please (10+ characters).";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // No backend: the enquiry goes straight to the gym's WhatsApp or email inbox.
    const body = `Hi Wowlash Maison!\n\nName: ${form.name}\nPhone: ${form.phone}\nInterested in: ${form.interest}\n\n${form.message}`;
    if (via === "email") {
      const subject = `Website enquiry: ${form.interest} from ${form.name}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(whatsappLink(body), "_blank", "noopener");
    }
    setSent({ ...form, via });
    setForm(empty);
  };

  const contacts = [
    { icon: Phone, label: "Call", value: site.phone, href: site.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: site.whatsapp, href: whatsappLink() },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <section id="contact" className="bg-charcoal py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            kicker="Contact"
            title={
              <>
                Talk to <span className="text-brand">us.</span>
              </>
            }
            intro="Questions about which set suits you, nail designs, allergies or refill timing? Send a message and we'll get back to you, usually within the hour."
          />
          <ul className="mt-10 space-y-3">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={label === "WhatsApp" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group card flex items-center gap-5 p-5 transition hover:border-brand/60"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-on-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-label text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">{label}</span>
                    <span className="text-base font-semibold text-heading">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="card flex items-start gap-5 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                <Clock className="h-5 w-5" />
              </span>
              <span className="text-sm">
                <span className="block font-label text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">Opening hours</span>
                {site.hours.map((h) => (
                  <span key={h.label} className="block text-soft">
                    <span className="inline-block w-24 text-muted">{h.label}</span>
                    {to12(h.open)} to {to12(h.close)}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        <div className="card relative p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[440px] flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="h-16 w-16 text-brand" strokeWidth={1.5} />
                <h3 className="display mt-6 text-5xl">Message ready, {sent.name.split(" ")[0]}!</h3>
                <p className="mt-4 max-w-sm text-muted">
                  We've opened {sent.via === "email" ? "your email app" : "WhatsApp"} with your enquiry. Just hit send. Prefer a call? Ring us on{" "}
                  <a href={site.phoneHref} className="text-heading underline decoration-brand underline-offset-4">
                    {site.phone}
                  </a>
                  .
                </p>
                <button onClick={() => setSent(null)} className="btn-outline mt-8">
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5 sm:grid-cols-2">
                <h3 className="display text-4xl sm:col-span-2">Send an enquiry</h3>
                <Field label="Your name" error={errors.name}>
                  <input className={cn("field", errors.name && "border-brand")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" placeholder="Full name" />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input className={cn("field", errors.phone && "border-brand")} value={form.phone} inputMode="tel" onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" placeholder="0712 345 678" />
                </Field>
                <Field label="I'm interested in" className="sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {["Lash Extensions", "Refill", "Lash Lift", "Nails", "Brows", "Other"].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setForm({ ...form, interest: opt })}
                        className={cn(
                          "border px-3.5 py-2 text-xs font-semibold transition",
                          form.interest === opt ? "border-brand bg-brand text-on-brand" : "border-line bg-field text-muted hover:text-heading"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Message" error={errors.message} className="sm:col-span-2">
                  <textarea
                    rows={5}
                    className={cn("field resize-none", errors.message && "border-brand")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us the look you love or ask anything…"
                  />
                </Field>
                <button type="submit" value="whatsapp" className="btn-primary">
                  <Send className="h-4 w-4" /> Send via WhatsApp
                </button>
                <button type="submit" value="email" className="btn-outline">
                  <Mail className="h-4 w-4" /> Send via Email
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <span className="mb-2 block font-label text-[10px] font-extrabold uppercase tracking-[0.16em] text-muted">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { LashMark } from "@/components/ui/logo";
import { Modal } from "@/components/ui/modal";
import { extras, site, tiers } from "@/data/site";
import { cn, formatKES, to12, whatsappLink } from "@/lib/utils";
import type { Visit } from "./pricing";

type Details = { name: string; phone: string; date: string; time: string; notes: string };

const KENYAN_PHONE = /^(?:\+?254|0)(?:7|1)\d{8}$/;
const todayISO = () => new Date().toISOString().slice(0, 10);

/** Bookable items: lash tiers (full set or refill) and the fixed-price extras. */
const extraIds: Record<string, string> = {
  mega: "Mega Volume & Wispy",
  lift: "Lash Lift & Tint",
  brows: "Brow Lamination & Tint",
  "nails-gel": "Gel Nails & Nail Art",
  "nails-long": "Long Nail Extensions",
};

function slotsFor(dateISO: string) {
  if (!dateISO) return [];
  const day = new Date(dateISO + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short" });
  const h = site.hours.find((x) => x.days.includes(day));
  if (!h) return [];
  const [oh] = h.open.split(":").map(Number);
  const [ch] = h.close.split(":").map(Number);
  const out: string[] = [];
  for (let t = oh; t <= ch - 2; t++) out.push(`${String(t).padStart(2, "0")}:00`);
  return out;
}

export function BookingModal({
  open,
  onClose,
  initialService,
  initialVisit,
}: {
  open: boolean;
  onClose: () => void;
  initialService: string;
  initialVisit: Visit;
}) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(initialService);
  const [visit, setVisit] = useState<Visit>(initialVisit);
  const [d, setD] = useState<Details>({ name: "", phone: "", date: todayISO(), time: "", notes: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [ref, setRef] = useState("");

  useEffect(() => {
    if (open) {
      setStep(0);
      setServiceId(initialService);
      setVisit(initialVisit);
      setErrors({});
    }
  }, [open, initialService, initialVisit]);

  const options = useMemo(
    () => [
      ...tiers.map((t) => ({ id: t.id, name: `${t.name} Lashes`, price: visit === "full" ? t.fullSet : t.refill, lash: true })),
      ...Object.entries(extraIds).map(([id, name]) => ({ id, name, price: extras.find((x) => x.name === name)?.price ?? 0, lash: false })),
    ],
    [visit]
  );
  const chosen = options.find((o) => o.id === serviceId) ?? options[1];
  const label = chosen.lash ? `${chosen.name} (${visit === "full" ? "Full Set" : "Refill"})` : chosen.name;
  const slots = slotsFor(d.date);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (d.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!KENYAN_PHONE.test(d.phone.replace(/\s|-/g, ""))) errs.phone = "Enter a valid Kenyan number, e.g. 0712 345 678.";
    if (!d.date || d.date < todayISO()) errs.date = "Pick today or a future date.";
    else if (!slots.length) errs.date = "We're closed that day. Please pick another date.";
    if (!d.time) errs.time = "Choose a start time.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setRef("WL-" + Math.random().toString(36).slice(2, 7).toUpperCase());
    setStep(2);
  };

  const prettyDate = d.date
    ? new Date(d.date + "T12:00:00").toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" })
    : "";

  return (
    <Modal open={open} onClose={onClose} label="Book an appointment">
      <div className="p-6 sm:p-8">
        <div className="pr-12">
          <img src="/images/logo.png" alt="Wow Lash Maison" width={640} height={313} className="h-16 w-auto rounded-xl bg-black shadow-md sm:h-20" />
          <h2 className="display mt-4 text-4xl">Book your appointment</h2>
        </div>

        <ol className="mt-6 grid grid-cols-3 gap-2">
          {["Service", "Details", "Confirm"].map((s, i) => (
            <li key={s}>
              <div className={cn("h-0.5 rounded-full transition-colors", i <= step ? "bg-brand" : "bg-line")} />
              <p className={cn("mt-2 font-label text-[9px] font-bold uppercase tracking-[0.16em]", i <= step ? "text-heading" : "text-muted")}>
                {String(i + 1).padStart(2, "0")} {s}
              </p>
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="svc" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mt-8">
              <div className="mb-5 inline-flex rounded-full border border-line p-1">
                {(
                  [
                    ["full", "Full Set"],
                    ["refill", "Refill"],
                  ] as const
                ).map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => setVisit(v)}
                    className={cn(
                      "rounded-full px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.16em]",
                      visit === v ? "bg-brand text-on-brand" : "text-muted hover:text-heading"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className="grid gap-2.5">
                {options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setServiceId(o.id)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border p-4 text-left transition",
                      serviceId === o.id ? "border-brand bg-brand/10" : "border-line bg-field hover:border-heading/30"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn("grid h-5 w-5 place-items-center rounded-full border", serviceId === o.id ? "border-brand bg-brand" : "border-line")}>
                        {serviceId === o.id && <Check className="h-3 w-3 text-on-brand" />}
                      </span>
                      <span className="font-label text-xs font-bold uppercase tracking-[0.1em] text-heading">{o.name}</span>
                    </span>
                    <span className="shrink-0 pl-3 font-display text-2xl text-heading">{formatKES(o.price)}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="btn-primary mt-8 w-full">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.form
              key="details"
              noValidate
              onSubmit={submit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              <Field label="Full name" error={errors.name} className="sm:col-span-2">
                <input className="field" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} autoComplete="name" placeholder="e.g. Wanjiru Kamau" />
              </Field>
              <Field label="Phone (WhatsApp)" error={errors.phone} className="sm:col-span-2">
                <input className="field" inputMode="tel" value={d.phone} onChange={(e) => setD({ ...d, phone: e.target.value })} autoComplete="tel" placeholder="0712 345 678" />
              </Field>
              <Field label="Date" error={errors.date}>
                <input className="field [color-scheme:light]" type="date" min={todayISO()} value={d.date} onChange={(e) => setD({ ...d, date: e.target.value, time: "" })} />
              </Field>
              <Field label="Start time" error={errors.time}>
                <select className="field" value={d.time} onChange={(e) => setD({ ...d, time: e.target.value })} disabled={!slots.length}>
                  <option value="">{slots.length ? "Choose a time" : "Closed this day"}</option>
                  {slots.map((s) => (
                    <option key={s} value={s}>
                      {to12(s)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Notes (optional)" className="sm:col-span-2">
                <input className="field" value={d.notes} onChange={(e) => setD({ ...d, notes: e.target.value })} placeholder="e.g. first set, sensitive eyes, wispy look" />
              </Field>
              <div className="mt-4 flex gap-3 sm:col-span-2">
                <button type="button" onClick={() => setStep(0)} className="btn-outline !px-4" aria-label="Back">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Request Booking <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
              <div className="relative overflow-hidden rounded-3xl border border-brand/50 bg-gradient-to-br from-[#ffc4d9] via-card to-ink p-6 shadow-[0_20px_60px_-20px_rgba(168,42,96,0.35)]">
                <LashMark className="pointer-events-none absolute -right-6 -top-6 h-44 w-44 text-brand opacity-10" />
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl font-bold text-heading">Wowlash Maison</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 font-label text-[9px] font-bold uppercase tracking-[0.16em] text-on-brand">
                    <CalendarCheck className="h-3 w-3" /> Requested
                  </span>
                </div>
                <p className="mt-6 font-label text-[9px] font-bold uppercase tracking-[0.2em] text-muted">Appointment for</p>
                <p className="truncate font-display text-4xl leading-tight text-heading">{d.name}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    ["Service", label],
                    ["When", `${prettyDate}, ${to12(d.time)}`],
                    ["Price", formatKES(chosen.price)],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="font-label text-[8px] font-bold uppercase tracking-[0.2em] text-muted">{k}</p>
                      <p className="text-sm font-semibold text-heading">{v}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-t border-heading/15 pt-3 font-mono text-xs tracking-[0.3em] text-brand">{ref}</p>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Almost done! Send this request to us on WhatsApp and we'll confirm your slot.{" "}
                {serviceId.startsWith("nails") ? "" : "Please come with clean, makeup-free eyes. "}Our address: <span className="text-heading">{site.address}</span>.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  className="btn-primary flex-1"
                  target="_blank"
                  rel="noreferrer"
                  href={whatsappLink(
                    `Hello Wowlash Maison! I would like to book an appointment.\n\nRef: ${ref}\nName: ${d.name}\nPhone: ${d.phone}\nService: ${label}\nDate: ${prettyDate}\nTime: ${to12(d.time)}${d.notes ? `\nNotes: ${d.notes}` : ""}`
                  )}
                >
                  <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
                </a>
                <button onClick={onClose} className="btn-outline">
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block font-label text-[9px] font-bold uppercase tracking-[0.18em] text-muted">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-700">{error}</span>}
    </label>
  );
}

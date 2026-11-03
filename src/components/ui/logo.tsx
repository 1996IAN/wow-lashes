import { cn } from "@/lib/utils";

/** A closed eye with fanned lashes and an iris above — the Wowlash mark. */
export function LashMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-10 w-10", className)} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="32" cy="22" r="7.5" />
      <path d="M8 32c8 10 40 10 48 0" />
      <path d="M13.5 37.5 9 44.5M21.5 41l-2.5 8.5M32 42.5V52M42.5 41l2.5 8.5M50.5 37.5 55 44.5" />
    </svg>
  );
}

/** The studio's own logo (gold on black). */
export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <a href="#home" className={cn("group block shrink-0", className)} aria-label="Wowlash Maison, home">
      <img
        src="/images/logo.png"
        alt="Wow Lash Maison"
        width={640}
        height={313}
        className={cn(
          "w-auto rounded-xl bg-black shadow-md ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-[1.03]",
          size === "lg" ? "h-24 sm:h-28" : "h-[60px] sm:h-[68px]"
        )}
      />
    </a>
  );
}

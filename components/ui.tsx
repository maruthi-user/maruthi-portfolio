import type { ReactNode } from "react";

export function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl 2xl:max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">{children}</span>;
}

type BtnProps = { href: string; children: ReactNode; variant?: "solid" | "outline"; external?: boolean };

export function Btn({ href, children, variant = "outline", external }: BtnProps) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition";
  const style =
    variant === "solid"
      ? "bg-accent text-accent-fg hover:opacity-90"
      : "border border-line bg-surface text-fg hover:border-accent";
  return (
    <a href={href} className={`${base} ${style}`} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}

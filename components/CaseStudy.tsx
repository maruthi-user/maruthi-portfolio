import Link from "next/link";
import type { ReactNode } from "react";
import { Chip } from "./ui";

type Props = {
  title: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  problem: string;
  myPart: string[];
  hardParts: { title: string; text: string }[];
  stack: string[];
  learned: string;
  mockTitle: string;
  mockNote?: string;
  /** Extra full-width blocks (e.g. roles and permissions), shown after "The hard parts". */
  sections?: { title: string; intro?: string; node: ReactNode }[];
  children: ReactNode;
};

export default function CaseStudy(p: Props) {
  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <Link href="/#experience" className="text-sm text-muted hover:text-fg">← Back to experience</Link>

      <header className="mt-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Case study</p>
        <h1 className="mt-2 font-serif text-5xl tracking-tight sm:text-6xl">{p.title}</h1>
        <p className="mt-3 text-lg text-muted">{p.subtitle}</p>
        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-4">
          {p.meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-xs uppercase tracking-wider text-gold">{m.label}</dt>
              <dd className="mt-1 text-sm text-muted">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">The problem</h2>
          <p className="mt-3 leading-relaxed text-muted">{p.problem}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">What I built</h2>
          <ul className="mt-3 space-y-2 leading-relaxed text-muted">
            {p.myPart.map((m) => (
              <li key={m} className="flex gap-2">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold">The hard parts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {p.hardParts.map((h) => (
            <div key={h.title} className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {p.sections?.map((s) => (
        <section key={s.title} className="mt-14">
          <h2 className="text-xl font-semibold">{s.title}</h2>
          {s.intro && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{s.intro}</p>}
          <div className="mt-4">{s.node}</div>
        </section>
      ))}

      <section className="mt-14">
        <h2 className="text-xl font-semibold">{p.mockTitle}</h2>
        <p className="mt-2 text-sm text-muted">
          {p.mockNote ?? "An illustrative mock-up I built for this page, using sample data. It is not a screen from the client's system."}
        </p>
        <div className="mt-4">{p.children}</div>
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s}><Chip>{s}</Chip></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">What I learned</h2>
          <p className="mt-3 leading-relaxed text-muted">{p.learned}</p>
        </div>
      </section>
    </article>
  );
}

import Gallery from "./Gallery";
import { Btn, Chip } from "./ui";
import type { Project } from "@/lib/data";

export default function ProjectShowcase({ p, index }: { p: Project; index: number }) {
  return (
    <article id={p.slug} className="rounded-3xl border border-line bg-surface p-5 sm:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">
            {String(index + 1).padStart(2, "0")} · {p.tag} · {p.year}
          </p>
          <h3 className="mt-2 font-serif text-4xl tracking-tight">{p.name}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{p.pitch}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          {p.live ? (
            <Btn href={p.live} variant="solid" external>Live demo ↗</Btn>
          ) : (
            <span className="inline-flex items-center rounded-full border border-dashed border-line px-5 py-2.5 text-sm text-muted">Live demo coming soon</span>
          )}
          <Btn href={p.repo} external>Source code ↗</Btn>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Gallery shots={p.shots} alt={p.name} animated={p.animated} />
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold">Why I built it</h4>
          <p className="mt-1 text-sm leading-relaxed text-muted">{p.why}</p>

          <h4 className="mt-6 text-sm font-semibold">What it does</h4>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-surface-2 p-3 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-fg">Status: </span>
            {p.status}
          </div>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${p.name} tech stack`}>
            {p.stack.map((s) => (
              <li key={s}><Chip>{s}</Chip></li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

import type { ReactNode } from "react";

export type InfoItem = { title: string; text: ReactNode; tag?: string };

export default function InfoGrid({ items, cols = 2 }: { items: InfoItem[]; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((i) => (
        <div key={i.title} className="rounded-2xl border border-line bg-surface p-5">
          {i.tag && <p className="font-mono text-xs uppercase tracking-wider text-gold">{i.tag}</p>}
          <h3 className={`font-semibold ${i.tag ? "mt-1" : ""}`}>{i.title}</h3>
          <div className="mt-2 text-sm leading-relaxed text-muted">{i.text}</div>
        </div>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Shot } from "@/lib/data";

type Props = { shots: Shot[]; alt: string };

export default function Gallery({ shots, alt }: Props) {
  const [i, setI] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const shot = shots[i];
  const src = shot.src;
  const many = shots.length > 1;

  const go = (d: number) => setI((v) => (v + d + shots.length) % shots.length);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2">
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          className="flex h-[230px] w-full cursor-zoom-in items-center justify-center p-3 sm:h-[300px]"
          aria-label="Enlarge image"
        >
          <Image
            key={src}
            src={src}
            width={shot.w}
            height={shot.h}
            alt={`${alt}: ${shot.caption}`}
            unoptimized
            className="h-full w-auto max-w-full rounded-lg object-contain"
          />
        </button>
        {many && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/90 text-lg">
              ‹
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/90 text-lg">
              ›
            </button>
          </>
        )}
      </div>

      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {shot.caption}
        {many && <span className="ml-2 text-xs">({i + 1}/{shots.length})</span>}
      </p>

      {many && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {shots.map((s, idx) => (
            <li key={s.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show: ${s.caption}`}
                aria-current={idx === i}
                className={`block overflow-hidden rounded-lg border-2 transition ${idx === i ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <Image src={s.src} width={s.w} height={s.h} alt="" unoptimized className="h-14 w-auto object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        onKeyDown={(e) => {
          if (!many) return;
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        aria-label={`${alt} screenshots`}
        className="m-auto max-h-[92vh] max-w-[94vw] rounded-2xl border border-line bg-surface p-2 backdrop:bg-black/70"
      >
        <div className="flex items-center justify-between pb-1">
          {many ? (
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className="grid size-9 place-items-center rounded-full border border-line text-lg text-muted hover:text-fg">
                ‹
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className="grid size-9 place-items-center rounded-full border border-line text-lg text-muted hover:text-fg">
                ›
              </button>
              <span className="ml-2 text-xs text-muted">{i + 1}/{shots.length}</span>
            </div>
          ) : (
            <span />
          )}
          <form method="dialog">
            <button className="rounded-md px-3 py-1 text-sm text-muted hover:text-fg">Close</button>
          </form>
        </div>
        <Image src={src} width={shot.w} height={shot.h} alt={`${alt}: ${shot.caption}`} unoptimized className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain" />
        <p className="px-2 pt-2 text-sm text-muted">{shot.caption}</p>
      </dialog>
    </div>
  );
}

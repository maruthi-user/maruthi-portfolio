"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function CinematicMotion({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      container.current?.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        const characters = element.dataset.reveal === "chars";
        SplitText.create(element, {
          type: characters ? "words,chars" : "lines",
          mask: characters ? undefined : "lines",
          autoSplit: true,
          onSplit(split) {
            return gsap.from(characters ? split.chars : split.lines, {
              autoAlpha: 0,
              yPercent: characters ? 30 : 105,
              duration: characters ? 0.4 : 0.65,
              stagger: characters ? 0.035 : 0.1,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
            });
          },
        });
      });

      container.current?.querySelectorAll<HTMLElement>("[data-enter]").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 32,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
    });

    // Expanding a gallery changes the positions of the sections that follow it.
    const refresh = () => ScrollTrigger.refresh();
    const currentContainer = container.current;
    currentContainer?.addEventListener("toggle", refresh, true);
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) refresh(); });

    return () => {
      disposed = true;
      currentContainer?.removeEventListener("toggle", refresh, true);
      media.revert();
    };
  }, { scope: container });

  return <div ref={container}>{children}</div>;
}

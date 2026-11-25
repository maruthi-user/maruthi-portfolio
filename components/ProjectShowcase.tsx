import Image from "next/image";
import Gallery from "./Gallery";
import { Btn } from "./ui";
import type { Project } from "@/lib/data";

export default function ProjectShowcase({ p }: { p: Project }) {
  const cover = p.shots[0];

  return (
    <article id={p.slug} className={"personal-project" + (p.phone ? " phone-project" : "")}>
      <div className="project-main">
        <div className="project-copy">
          <p className="eyebrow">Personal project · {p.tag}</p>
          <h3 data-reveal="chars">{p.name}</h3>
          <p className="project-subtitle">{p.phone ? "Healthcare, in a familiar voice." : "A shorter journey from farm to home."}</p>
          <p data-reveal="lines">{p.pitch}</p>
          <ul className="stack-list" aria-label={p.name + " core technologies"}>
            {(p.phone ? ["JavaScript", "Web Speech API", "Telugu / English"] : ["Java 17", "React", "PostgreSQL"]).map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="portfolio-actions">
            {p.live && <Btn href={p.live} variant="solid" external>Live demo</Btn>}
            <Btn href={p.repo} external>Source code</Btn>
          </div>
          <p className="project-status">{p.status}</p>
        </div>
        <figure className={"project-cover " + (p.phone ? "project-cover-phone" : "project-cover-desktop")} data-enter>
          <div className="project-screen">
            {!p.phone && <div className="browser-chrome" aria-hidden><span /><span /><span /><p>F2Home / Marketplace</p></div>}
            <Image src={cover.src} width={cover.w} height={cover.h} alt={cover.caption} unoptimized />
          </div>
          {p.phone && <div className="phone-caption"><span>తెలుగు</span><p>Designed to be heard.<br />Built to be understood.</p></div>}
          <figcaption>{p.phone ? "Arogya Mitra / Home screen" : "F2Home / Customer marketplace"}</figcaption>
        </figure>
      </div>
      <details className="project-details">
        <summary>Explore the build &amp; screenshots<span className="detail-symbol" aria-hidden>+</span></summary>
        <div className="project-detail-content">
          <div className="project-notes">
            <h4>Why I built it</h4><p>{p.why}</p>
            <h4>What I implemented</h4><ul>{p.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
            <h4>Engineering decision &amp; tradeoff</h4><p>{p.decision}</p>
            <h4>Next step</h4><p>{p.nextStep}</p>
            <h4>Technologies</h4><p>{p.stack.join(" · ")}</p>
          </div>
          <Gallery shots={p.shots} alt={p.name} />
        </div>
      </details>
    </article>
  );
}

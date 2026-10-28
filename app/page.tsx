import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import { Btn, Chip, Section } from "@/components/ui";
import { education, experience, profile, projects, skills, stats } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(60%_50%_at_80%_10%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent)]" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl 2xl:max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden />
            Open to full-time roles · {profile.location}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl xl:text-8xl">
            Hi, I&apos;m {profile.name.split(" ")[0]}.
            <br />
            I build <em className="text-accent">full stack</em> web apps.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href="#projects" variant="solid">See my projects</Btn>
            {profile.resumeUrl && <Btn href={profile.resumeUrl}>Download resume</Btn>}
            <Btn href="#contact">Contact me</Btn>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-4xl text-fg">{s.value}</dd>
                <p className="mt-1 text-xs leading-snug text-muted" aria-hidden>{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <aside className="rounded-3xl border border-line bg-surface p-6 shadow-sm" aria-label="At a glance">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-accent font-serif text-3xl text-accent-fg">MY</div>
            <div>
              <p className="text-lg font-semibold">{profile.name}</p>
              <p className="text-sm text-muted">{profile.role}</p>
            </div>
          </div>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-gold">Right now</dt>
              <dd className="mt-1 text-muted">{experience.role} at {experience.company} ({experience.period})</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-gold">Education</dt>
              <dd className="mt-1 text-muted">MCA, Mohan Babu University (2025)</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-gold">Core stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {["Java 17", "Spring Boot", "React", "Next.js", "PostgreSQL", "Docker"].map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="A developer who likes real users">
      <div className="grid gap-6 lg:grid-cols-2">
        {profile.about.map((p) => (
          <p key={p} className="text-lg leading-relaxed text-muted">{p}</p>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Real client work">
      <div className="rounded-3xl border border-line bg-surface p-5 sm:p-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold">{experience.role}</h3>
            <p className="text-muted">{experience.company} · {experience.location}</p>
          </div>
          <p className="font-mono text-sm text-gold">{experience.period} · {experience.duration}</p>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{experience.summary}</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {experience.projects.map((p) => (
            <div key={p.slug} className="flex flex-col rounded-2xl border border-line bg-bg p-5">
              <h4 className="text-lg font-semibold">{p.name}</h4>
              <p className="text-sm text-muted">{p.subtitle}</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s}><Chip>{s}</Chip></li>
                ))}
              </ul>
              <Link href={p.href} className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium text-accent hover:underline">
                Read the case study →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Things I built on my own">
      <div className="space-y-8">
        {projects.map((p, i) => (
          <ProjectShowcase key={p.slug} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.group} className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-gold">{g.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s}><Chip>{s}</Chip></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I studied">
      <ol className="space-y-4">
        {education.map((e) => (
          <li key={e.degree} className="flex flex-col gap-1 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">{e.degree}</h3>
              <p className="text-sm text-muted">{e.school}</p>
            </div>
            <p className="font-mono text-sm text-gold">{e.period}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk">
      <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          I&apos;m looking for a Java full stack role where I can keep learning on a real product team. The fastest way to reach me is email.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Btn href={`mailto:${profile.email}`} variant="solid">{profile.email}</Btn>
          <Btn href={profile.linkedin} external>LinkedIn ↗</Btn>
          <Btn href={profile.github} external>GitHub ↗</Btn>
          {profile.resumeUrl && <Btn href={profile.resumeUrl}>Download resume</Btn>}
        </div>
      </div>
    </Section>
  );
}

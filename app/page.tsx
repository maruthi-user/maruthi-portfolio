import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import CinematicMotion from "@/components/CinematicMotion";
import ExperienceDuration from "@/components/ExperienceDuration";
import ProjectShowcase from "@/components/ProjectShowcase";
import { Btn } from "@/components/ui";
import { education, experience, profile, projects, skills } from "@/lib/data";

const hrms = experience.projects[0];
export const metadata: Metadata = { alternates: { canonical: "/" } };
const modules = [
  { name: "Task Management", detail: "Spring Boot API + React interface", anchor: "task-management" },
  { name: "Leave & Comp-off", detail: "Requests, balances and approvals", anchor: "approvals" },
  { name: "Attendance", detail: "Check-in, check-out and approvals", anchor: "approvals" },
  { name: "Employee Advances", detail: "Approval, payment and recovery", anchor: "approvals" },
  { name: "Claims", detail: "Submission through payment", anchor: "approvals" },
];

export default function Home() {
  return (
    <CinematicMotion>
      <div className="portfolio-shell">
        <section className="cinema-hero" aria-labelledby="hero-title">
          <div className="hero-topline">
            <p className="eyebrow">Java full stack developer</p>
            <p className="availability"><span aria-hidden />Open to full-time roles</p>
          </div>
          <h1 className="hero-title" id="hero-title">
            <span className="hero-name" data-reveal="chars">MARUTHI</span>
            <span className="hero-surname">YENUMULA</span>
            <span className="studio-name" data-reveal="chars">Maruthi Yenumula</span>
          </h1>
          <div className="hero-composition">
            <div className="hero-introduction">
              <h2 className="midnight-headline" data-reveal="lines">Java Full Stack <span>Developer.</span></h2>
              <h2 className="studio-headline" data-reveal="lines">Thoughtful interfaces.<br />Reliable systems.</h2>
              <p className="hero-description" data-reveal="lines">{profile.tagline}</p>
              <div className="portfolio-actions">
                <Btn href="#projects" variant="solid">Explore my work</Btn>
                {profile.resumeUrl && <Btn href={profile.resumeUrl}>View résumé</Btn>}
              </div>
              <p className="hero-location">{profile.location}</p>
              <p className="experience-duration"><ExperienceDuration /></p>
            </div>
            {profile.photo && (
              <figure className="profile-portrait">
                <Image src={profile.photo} alt="Maruthi Yenumula" width={1448} height={1086} sizes="(max-width: 700px) 240px, 320px" loading="eager" />
                <figcaption><strong>{profile.name}</strong><span>{profile.role} · {profile.location}</span></figcaption>
              </figure>
            )}
          </div>
          <div className="hero-bottom">
            <p>Java 17 <span>/</span> Spring Boot <span>/</span> React <span>/</span> PostgreSQL</p>
            <a href="#projects">Scroll to explore</a>
          </div>
        </section>

        <section id="projects" className="portfolio-section" aria-labelledby="work-title">
          <div className="section-heading">
            <div><p className="eyebrow">A closer look</p><h2 id="work-title" data-reveal="chars">Selected <span>work.</span></h2></div>
            <p>Real workflows.<br />Thoughtful interfaces.</p>
          </div>
          <article className="hrms-feature" id="hrms">
            <div className="hrms-story">
              <p className="eyebrow">Client project · {experience.company}</p>
              <h3 data-reveal="chars">HRMS</h3>
              <p className="project-subtitle">One system. Many responsibilities.</p>
              <p data-reveal="lines">I build React screens and integrate Spring Boot APIs across the HRMS. For Task Management, I built the API and interface end to end.</p>
              <ul className="stack-list" aria-label="HRMS technologies"><li>React</li><li>Spring Boot</li><li>RTK Query</li></ul>
              <Link className="action action-solid" href={hrms.href}>Explore the case study</Link>
            </div>
            <div className="hrms-modules" data-enter>
              <div className="module-heading"><span className="eyebrow">HRMS / Modules</span><span className="module-note">Explore my contributions</span></div>
              {modules.map((module) => (
                <a key={module.name} href={hrms.href + "#" + module.anchor}>
                  <span><strong>{module.name}</strong><small>{module.detail}</small></span>
                  <span className="module-plus" aria-hidden>+</span>
                </a>
              ))}
              <p className="module-footnote">Six roles. Permissions at every step.</p>
            </div>
          </article>
          <div className="personal-projects">
            {projects.map((project) => <ProjectShowcase key={project.slug} p={project} />)}
          </div>
        </section>

        <section id="about" className="portfolio-section" aria-labelledby="profile-title">
          <div className="section-heading">
            <div><p className="eyebrow">The person behind the work</p><h2 id="profile-title" data-reveal="chars">Always <span>building.</span></h2></div>
          </div>
          <div className="experience-layout">
            <div className="experience-intro">
              <p className="statement" data-reveal="lines">I like the point where a complex workflow becomes simple to use.</p>
              {profile.about.map((paragraph) => <p key={paragraph} data-reveal="lines">{paragraph}</p>)}
            </div>
            <div className="experience-record" id="experience" data-enter>
              <p className="eyebrow">{experience.period}</p>
              <p className="experience-duration"><ExperienceDuration /></p>
              <h3>{experience.role}</h3>
              <p className="company-name">{experience.company}</p>
              <p>{experience.summary}</p>
              <h4 className="contribution-heading">Selected contributions</h4>
              <ul className="contribution-list">{experience.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="record-location">{experience.location}</p>
            </div>
          </div>
          <div id="skills" className="skill-columns">
            {skills.filter((group) => group.strong.length > 0).map((group) => (
              <div key={group.group} data-enter><h3>{group.group}</h3><p>{group.strong.join(" · ")}</p></div>
            ))}
          </div>
          <div id="education" className="education-row">
            <p className="eyebrow">Education</p>
            {education.map((entry) => <div key={entry.degree}><h3>{entry.short}</h3><p>{entry.school}</p><span>{entry.period}</span></div>)}
          </div>
        </section>

        <section id="contact" className="portfolio-contact" aria-labelledby="contact-title">
          <p className="eyebrow">Have a role in mind?</p>
          <h2 id="contact-title" data-reveal="chars">Let’s <span>talk.</span></h2>
          <div className="contact-bottom">
            <div><p>I’m looking for a Java full-stack role<br />with a team building something people use.</p><a className="contact-email" href={"mailto:" + profile.email}>{profile.email}</a></div>
            <div className="portfolio-actions"><Btn href={profile.linkedin} external>LinkedIn</Btn><Btn href={profile.github} external>GitHub</Btn>{profile.resumeUrl && <Btn href={profile.resumeUrl} variant="solid">View résumé</Btn>}</div>
          </div>
        </section>
      </div>
    </CinematicMotion>
  );
}

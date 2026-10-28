import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl 2xl:max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {profile.name}. Built with Next.js and Tailwind CSS.</p>
        <p>
          <a className="hover:text-fg" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          {" · "}
          <a className="hover:text-fg" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          {" · "}
          <a className="hover:text-fg" href={`mailto:${profile.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}

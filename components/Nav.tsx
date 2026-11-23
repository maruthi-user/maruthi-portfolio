"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/lib/data";

const links = [
  { href: "/#projects", label: "Work" },
  { href: "/#about", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -60% 0px" });
    links.forEach((link) => {
      const section = document.getElementById(link.href.slice(2));
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = matchMedia("(min-width: 768px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    media.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      media.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header ref={header} className="site-header">
      <nav className="nav-inner" aria-label="Main">
        <Link href="/" className="brand" aria-label="Maruthi Yenumula, home" onClick={() => setOpen(false)}>MY<span>.</span></Link>
        <ul className="desktop-links">
          {links.map((link) => (
            <li key={link.href}><a href={link.href} aria-current={onHome && active === link.href.slice(2) ? "location" : undefined}>{link.label}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
          {profile.resumeUrl && <a className="nav-resume" href={profile.resumeUrl}>Résumé</a>}
          <button ref={menuButton} type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </nav>
      <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile" hidden={!open}>
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={onHome && active === link.href.slice(2) ? "location" : undefined}>{link.label}</a>)}
      </nav>
    </header>
  );
}

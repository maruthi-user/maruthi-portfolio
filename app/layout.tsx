import type { Metadata } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profile } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ${profile.role}`,
  description: `${profile.name} is a ${profile.role} in ${profile.location}. Explore his HRMS client work, F2Home marketplace and Arogya Mitra accessibility prototype.`,
  openGraph: {
    type: "website",
    siteName: `${profile.name} | Developer Portfolio`,
    title: `${profile.name} | ${profile.role}`,
    description: "Spring Boot APIs, React interfaces, and real workflows. Explore HRMS, F2Home and Arogya Mitra.",
    images: [{ url: "/profile-professional.png", width: 1254, height: 1254, alt: profile.name }],
  },
  twitter: { card: "summary", title: `${profile.name} | ${profile.role}`, description: "Java, Spring Boot and React developer. Explore my projects and HRMS case study.", images: ["/profile-professional.png"] },
  icons: { icon: "/icon.svg" },
};

// Sets the theme class before first paint so there is no light/dark flash.
const themeScript = `var t,d;try{t=localStorage.getItem("theme");d=localStorage.getItem("portfolio-design")}catch(e){}document.documentElement.classList.toggle("dark",t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches));document.documentElement.dataset.design=d==="indigo"?"indigo":"midnight";`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-design="midnight"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

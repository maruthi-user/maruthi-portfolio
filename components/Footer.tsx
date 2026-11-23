import { profile } from "@/lib/data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {profile.name}</p>
      <a href={"mailto:" + profile.email}>Available for full-time opportunities</a>
      <Link href="/#main">Back to top</Link>
    </footer>
  );
}

// One-off: turn raw screenshots into web-sized WebP files in /public/projects (the GIF is handled by gif.mjs)
import sharp from "sharp";
import path from "node:path";

const src = "C:/Users/Maruthi Yenumula/Desktop/temp";
const jobs = [
  { dir: "farmtohome", out: "f2home", width: 1600, names: {
    "Screenshot 2026-10-28 111246.png": "signup",
    "Screenshot 2026-10-28 111317.png": "marketplace",
    "Screenshot 2026-10-28 111428.png": "cart",
    "Screenshot 2026-10-28 111452.png": "farmer-marketplace",
    "Screenshot 2026-10-28 111503.png": "farmer-orders",
    "Screenshot 2026-10-28 111522.png": "my-farm",
    "Screenshot 2026-10-28 111531.png": "delivery-settings" } },
  { dir: "arogramitra", out: "arogya", width: 800, names: {
    "Screenshot 2026-10-28 110845.png": "language",
    "Screenshot 2026-10-28 110857.png": "village",
    "Screenshot 2026-10-28 110931.png": "home",
    "Screenshot 2026-10-28 110938.png": "symptoms",
    "Screenshot 2026-10-28 110947.png": "doctors",
    "Screenshot 2026-10-28 110954.png": "booking" } },
];
for (const j of jobs) {
  for (const [file, name] of Object.entries(j.names)) {
    const info = await sharp(path.join(src, j.dir, file)).resize({ width: j.width, withoutEnlargement: true })
      .webp({ quality: 82 }).toFile(`public/projects/${j.out}/${name}.webp`);
    console.log(j.out, name, Math.round(info.size / 1024) + "KB", info.width + "x" + info.height);
  }
}

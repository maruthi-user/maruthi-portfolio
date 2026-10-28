import sharp from "sharp";
const gif = "C:/Users/Maruthi Yenumula/Desktop/temp/arogramitra/lotus UI.gif";
const opts = { animated: true, limitInputPixels: false };
const meta = await sharp(gif, opts).metadata();
console.log("frames", meta.pages, meta.width, meta.pageHeight, "delay0", meta.delay?.[0]);
const info = await sharp(gif, opts).resize({ width: 800 })
  .webp({ quality: 55, effort: 3 }).toFile("public/projects/lotus/bloom.webp");
console.log("bloom", Math.round(info.size / 1024) + "KB");
await sharp(gif, { limitInputPixels: false, page: 0 }).resize({ width: 1200 }).webp({ quality: 82 }).toFile("public/projects/lotus/still.webp");

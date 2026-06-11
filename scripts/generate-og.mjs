// Generates the placeholder OpenGraph image (public/og.png): a 1200×630
// navy canvas with a thin gold rule. Runs automatically before every build
// (see the "prebuild" script). Replace public/og.png with a branded image
// and delete this script + the prebuild hook when the final asset exists.
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;
const NAVY = [0x1b, 0x2a, 0x40];
const GOLD = [0xc9, 0xa8, 0x4c];

const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  const row = y * (1 + W * 3);
  raw[row] = 0; // filter: none
  const isGoldRow = y >= 300 && y < 303;
  for (let x = 0; x < W; x++) {
    const c = isGoldRow && x >= 80 && x < 400 ? GOLD : NAVY;
    const o = row + 1 + x * 3;
    raw[o] = c[0];
    raw[o + 1] = c[1];
    raw[o + 2] = c[2];
  }
}

const crcTable = [...Array(256)].map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  let crc = 0xffffffff;
  for (const b of td) crc = crcTable[(crc ^ b) & 0xff] ^ (crc >>> 8);
  crc = (crc ^ 0xffffffff) >>> 0;
  const cb = Buffer.alloc(4);
  cb.writeUInt32BE(crc);
  return Buffer.concat([len, td, cb]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type: truecolor

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og.png');
fs.writeFileSync(out, png);
console.log(`og.png written (${png.length} bytes)`);

#!/usr/bin/env node
/**
 * Generates /static/og-image.png for Open Graph / iMessage link previews.
 * Run: node scripts/generate-og.mjs
 * Requires: ImageMagick (magick / convert)
 */

import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, '..');

const svgPath = join(root, 'static', '_og-image-tmp.svg');
const outPath = join(root, 'static', 'og-image.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Main gradient: matcha green → warm gold -->
    <linearGradient id="textGrad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%"   stop-color="#9DC87A"/>
      <stop offset="100%" stop-color="#C8A96E"/>
    </linearGradient>
    <!-- Ambient glow bottom-left -->
    <radialGradient id="glowBL" cx="0%" cy="100%" r="55%" fx="0%" fy="100%">
      <stop offset="0%"   stop-color="#9DC87A" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#9DC87A" stop-opacity="0"/>
    </radialGradient>
    <!-- Subtle glow top-right -->
    <radialGradient id="glowTR" cx="100%" cy="0%" r="45%" fx="100%" fy="0%">
      <stop offset="0%"   stop-color="#C8A96E" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#C8A96E" stop-opacity="0"/>
    </radialGradient>
    <!-- Clip for gradient text -->
    <clipPath id="clip1">
      <text x="80" y="310"
        font-family="Noto Sans Mono, Liberation Mono, monospace"
        font-size="128"
        font-weight="700"
        letter-spacing="-2">Hi, I&apos;m Leo</text>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0C0B09"/>

  <!-- Ambient glows -->
  <rect width="1200" height="630" fill="url(#glowBL)"/>
  <rect width="1200" height="630" fill="url(#glowTR)"/>

  <!-- Top accent bar -->
  <rect x="80" y="72" width="48" height="4" rx="2" fill="#9DC87A" opacity="0.7"/>

  <!-- Gradient text: render as gradient rect clipped to text shape -->
  <rect width="1200" height="630" fill="url(#textGrad)" clip-path="url(#clip1)"/>

  <!-- Tagline -->
  <text x="80" y="380"
    font-family="Noto Sans Mono, Liberation Mono, monospace"
    font-size="26"
    fill="#756E60"
    letter-spacing="0.5">aerospace engineer · computer enthusiast</text>

  <!-- Divider line -->
  <line x1="80" y1="530" x2="1120" y2="530" stroke="#2E2C24" stroke-width="1"/>

  <!-- Domain -->
  <text x="80" y="572"
    font-family="Noto Sans Mono, Liberation Mono, monospace"
    font-size="20"
    fill="#413D35">nielsleo.com</text>

  <!-- Favicon echo (small circle with accent) -->
  <circle cx="1100" cy="555" r="22" fill="#9DC87A" opacity="0.12"/>
  <circle cx="1100" cy="555" r="14" fill="none" stroke="#9DC87A" stroke-width="1.5" opacity="0.3"/>
</svg>`;

writeFileSync(svgPath, svg, 'utf8');
console.log('SVG written to', svgPath);

try {
  // Use magick (ImageMagick 7) with a higher density for crisp rendering
  execSync(`magick -density 150 -background "#0C0B09" "${svgPath}" -resize 1200x630 "${outPath}"`, {
    stdio: 'inherit'
  });
  console.log('PNG written to', outPath);
} catch (e) {
  // Fallback to legacy `convert` (ImageMagick 6)
  execSync(`convert -density 150 -background "#0C0B09" "${svgPath}" -resize 1200x630 "${outPath}"`, {
    stdio: 'inherit'
  });
  console.log('PNG written to', outPath);
} finally {
  unlinkSync(svgPath);
}

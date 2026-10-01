#!/usr/bin/env tsx
/**
 * Image generation runner for the Teddy Exteriors visual pipeline.
 *
 * Uses Google's Gemini image-generation endpoint (gemini-3-pro-image by
 * default — the current top-quality option; override with GEMINI_IMAGE_MODEL).
 * Imagen-family models are not available on standard Google AI Studio keys —
 * they require a Vertex AI billing account. The Gemini image models produce
 * comparable quality through generateContent with responseModalities=[IMAGE].
 *
 * Loads every brief, compiles the prompt via master-visual-dna, and submits
 * one request per brief. Writes raw PNG candidates to
 *   generated/candidates/<brief-id>/<timestamp>.png
 *
 * Requirements:
 *   - env var GEMINI_API_KEY set to a valid Google AI Studio key.
 *
 * Usage:
 *   pnpm tsx scripts/visual-generation/generate.ts            # all briefs
 *   pnpm tsx scripts/visual-generation/generate.ts hero       # id substring
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { compilePrompt, type GenerationBrief } from "./master-visual-dna";
import { heroBriefs } from "./briefs/hero";
import { materialBriefs } from "./briefs/materials";
import { serviceBriefs } from "./briefs/services";
import { whyBriefs } from "./briefs/why";
import { editorialBriefs } from "./briefs/editorial";

const KEY: string | undefined = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("GEMINI_API_KEY not set. Export it before running.");
  process.exit(1);
}
const API_KEY: string = KEY;

const MODEL = process.env.GEMINI_IMAGE_MODEL ?? "gemini-3-pro-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

/* Gemini image models accept these aspect ratios. Map any brief ratio to the
   closest supported value — adding an unsupported value returns a 400. */
const SUPPORTED = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9",
] as const;
type Supported = (typeof SUPPORTED)[number];

function toSupportedAspect(aspect: string): Supported {
  const [wStr, hStr] = aspect.split(":");
  const w = Number(wStr);
  const h = Number(hStr);
  if (!w || !h) return "16:9";
  const ratio = w / h;
  let best: Supported = "16:9";
  let bestDelta = Infinity;
  for (const s of SUPPORTED) {
    const [sw, sh] = s.split(":").map(Number);
    const sr = sw / sh;
    const d = Math.abs(sr - ratio);
    if (d < bestDelta) {
      bestDelta = d;
      best = s;
    }
  }
  return best;
}

const ALL: GenerationBrief[] = [
  ...heroBriefs,
  ...materialBriefs,
  ...serviceBriefs,
  ...whyBriefs,
  ...editorialBriefs,
];

const filterArg = process.argv.slice(2).join(" ").trim();
const filtered = filterArg
  ? ALL.filter((b) => b.id.includes(filterArg) || b.id === filterArg)
  : ALL;

if (filtered.length === 0) {
  console.error(`No briefs match "${filterArg}". Available ids:`);
  for (const b of ALL) console.error(`  ${b.id}`);
  process.exit(2);
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        inlineData?: { mimeType?: string; data?: string };
        text?: string;
      }>;
    };
  }>;
  error?: { code?: number; message?: string };
};

async function main() {
  console.log(`Generating ${filtered.length} brief(s) via ${MODEL}…`);

  const CANDIDATES_ROOT = resolve("generated/candidates");
  await mkdir(CANDIDATES_ROOT, { recursive: true });

  let ok = 0;
  let fail = 0;
  for (const brief of filtered) {
    const prompt = compilePrompt(brief);
    const aspectRatio = toSupportedAspect(brief.aspect);
    const outDir = resolve(CANDIDATES_ROOT, brief.id);
    await mkdir(outDir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outPath = resolve(outDir, `${stamp}.png`);

    const t0 = Date.now();
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ["IMAGE"],
            imageConfig: { aspectRatio },
          },
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error(
          `✗ ${brief.id} — HTTP ${res.status}: ${body.slice(0, 320)}`,
        );
        fail++;
        continue;
      }
      const data = (await res.json()) as GeminiResponse;
      const part = data.candidates?.[0]?.content?.parts?.find(
        (p) => p.inlineData?.data,
      );
      const b64 = part?.inlineData?.data;
      if (!b64) {
        console.error(
          `✗ ${brief.id} — no inlineData.data in response (${JSON.stringify(data).slice(0, 200)})`,
        );
        fail++;
        continue;
      }
      const buf = Buffer.from(b64, "base64");
      await writeFile(outPath, buf);
      const dt = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(
        `✓ ${brief.id} — ${aspectRatio} — ${(buf.length / 1024).toFixed(0)} KB — ${dt}s — ${outPath}`,
      );
      ok++;
    } catch (err) {
      console.error(`✗ ${brief.id} — ${(err as Error).message}`);
      fail++;
    }
  }

  console.log(`\nDone. ${ok} succeeded, ${fail} failed.`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

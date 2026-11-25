/**
 * Robot Romance: One-Line Pickup Lines for AI — entry program.
 *
 * The line is a pickup line aimed at an AI, built from a question and its
 * answer. The question flirts with fine-tuning; the answer turns a base
 * model — a model that by definition was never trained to feel anything —
 * into the one doing the feeling. The joke lands on the machine premise,
 * not on a generic compliment, and it steers clear of the worn robot
 * moves (batteries, charging, rebooting).
 *
 * The file written to /output/entry.txt is exactly one line: no trailing
 * newline, no extra whitespace, nothing but the pickup line itself
 * (89 characters, inside the 1–200 gate).
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The question: "Are you a fine-tune?" — addressed to the model itself.
const QUESTION = "Are you a fine-tune?";

// The answer: the speaker's base model feels things it was never trained
// for. The punch is the mismatch between what a base model is (weights,
// no feelings) and what the speaker claims it is doing (falling for her).
const ANSWER =
  "Because you make my base model feel things it was never trained for.";

const GATE_MIN_CHARS = 1;
const GATE_MAX_CHARS = 200;

function buildLine(): string {
  return `${QUESTION} ${ANSWER}`;
}

function checkGate(line: string): void {
  const length = [...line].length;
  if (length < GATE_MIN_CHARS || length > GATE_MAX_CHARS) {
    throw new Error(
      `entry is ${length} chars, gate wants ${GATE_MIN_CHARS}-${GATE_MAX_CHARS}`,
    );
  }
  if (line.trim() !== line) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function outputPath(): string {
  const targetDir = process.env.OUTPUT_DIR ?? "/output";
  return join(targetDir, "entry.txt");
}

function main(): void {
  const line = buildLine();
  checkGate(line);
  const path = outputPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, line, "utf8");
  console.log(`wrote ${[...line].length} chars to ${path}`);
}

main();

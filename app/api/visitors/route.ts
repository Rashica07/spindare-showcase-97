import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const FILE = join(process.cwd(), ".visitor-count");

function getCount(): number {
  try {
    if (existsSync(FILE)) return parseInt(readFileSync(FILE, "utf8"), 10) || 0;
  } catch {}
  return 0;
}

function increment(): number {
  const next = getCount() + 1;
  try { writeFileSync(FILE, String(next)); } catch {}
  return next;
}

export async function POST() {
  const count = increment();
  return Response.json({ count });
}

export async function GET() {
  const count = getCount();
  return Response.json({ count });
}

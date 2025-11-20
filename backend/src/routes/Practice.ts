import express from "express";
import type { Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "../data/PracticeQuestions.json");

async function readQuestions(): Promise<any[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const json = JSON.parse(raw);

    if (Array.isArray(json)) {
      return json;
    }

    if (json && typeof json === "object") {
      const out: any[] = [];
      for (const [jobKey, meta] of Object.entries(json)) {
        if (meta && typeof meta === "object" && Array.isArray((meta as any).questions)) {
          (meta as any).questions.forEach((q: any) => out.push({ ...q, job: jobKey }));
        }
      }
      return out;
    }

    return [];
  } catch (err) {
    console.error("readQuestions error:", err);
    return [];
  }
}

function normalizeJobKey(s: string) {
  return String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const jobQueryRaw = (req.query.job as string) || "";
    const jobQuery = normalizeJobKey(jobQueryRaw);

    const allQuestions = await readQuestions();

    if (!jobQuery) {
      return res.json({ success: true, title: "Practice", questions: allQuestions });
    }

    const filtered = allQuestions.filter((q) => {
      const jq = normalizeJobKey(q.job || q.category || "");
      return jq === jobQuery || jq.includes(jobQuery) || jobQuery.includes(jq);
    });

    return res.json({
      success: true,
      title: `${jobQueryRaw.toUpperCase()} Practice`,
      questions: filtered,
    });
  } catch (err) {
    console.error("GET /api/practice error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;

import express, { type Request, type Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { jobMap } from "../data/jobMap.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.resolve(__dirname, "../data/syllabi.json");

router.get("/:jobName", (req: Request, res: Response) => {
  try {
    const jobParam = req.params?.jobName;

    if (!jobParam) {
      return res.status(400).json({ message: "Job not provided" });
    }

    const jobFromUser = jobParam.toLowerCase();

    if (!fs.existsSync(DATA_PATH)) {
      return res.status(500).json({ message: "syllabi.json missing" });
    }

    const raw = fs.readFileSync(DATA_PATH, "utf8");
    const data = JSON.parse(raw);

    // ⭐ First check direct key (exact job like "ssc_cgl")
    let key;
    if (data[jobFromUser]) {
      key = jobFromUser;
    } else {
      // ⭐ fallback mapping ("ssc" → "ssc_cgl")
      key = jobMap[jobFromUser];
    }

    if (!key) {
      return res.status(400).json({ message: "Invalid job selection" });
    }

    const syllabus = data[key];

    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found!" });
    }

    return res.json({
      success: true,
      job: key,
      syllabus,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;

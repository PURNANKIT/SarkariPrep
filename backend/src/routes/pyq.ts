import express from "express";
import type { Request, Response } from "express";

interface PyqItem {
  year: number;
  name: string;
  pdf: string;
}

interface PyqDataType {
  title: string;
  pyq: PyqItem[];
}

const pyqData: Record<string, PyqDataType> = {
  ssc_cgl: {
    title: "SSC CGL PYQs",
    pyq: [
      { year: 2025, name: "SSC CGL Tier 1 – 2025", pdf: "/pdfs/cgl2025.pdf" },
      { year: 2024, name: "SSC CGL Tier 1 – 2024", pdf: "/pdfs/cgl2024.pdf" },
    ],
  },

  up_police: {
    title: "UP Police PYQs",
    pyq: [
      { year: 2024, name: "UP Police 2024 Exam", pdf: "/pdfs/up2024.pdf" },
      { year: 2023, name: "UP Police 2023 Exam", pdf: "/pdfs/up2023.pdf" },
    ],
  },
};

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const jobRaw = req.query.job;

  // Safe string conversion
  const job = Array.isArray(jobRaw)
    ? String(jobRaw[0])
    : String(jobRaw || "");

  if (!job) {
    return res.status(400).json({ message: "Job query required" });
  }

  const data = pyqData[job];

  if (!data) {
    return res.json({ title: job, pyq: [] });
  }

  res.json(data);
});

export default router;

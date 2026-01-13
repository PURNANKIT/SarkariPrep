import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

/* --------------------------- TYPES --------------------------- */
interface PyqItem {
  year: number;
  name: string;
  pdf_en: string;
  pdf_hi: string;
}

interface PyqDataType {
  title: string;
  pyq: PyqItem[];
}

const pyqData: Record<string, PyqDataType> = {
  ssc_cgl: {
    title: "SSC CGL PYQs",
    pyq: [
      {
        year: 2025,
        name: "SSC CGL Tier 1 – 2025",
        pdf_en: "/pdfs/english/cgl2025.pdf",
        pdf_hi: "/pdfs/hindi/cgl2025.pdf",
      },
      {
        year: 2024,
        name: "SSC CGL Tier 1 – 2024",
        pdf_en: "/pdfs/english/cgl2024.pdf",
        pdf_hi: "/pdfs/hindi/cgl2024.pdf",
      },

       {
        year: 2023,
        name: "SSC CGL Tier 1 – 2023",
        pdf_en: "/pdfs/english/cgl2023.pdf",
        pdf_hi: "/pdfs/hindi/cgl2023.pdf",
      },
    ],
  },

  banking: {
  title: "Banking PYQs",
  pyq: [

     {
      year: 2025,
      name: "IBPS PO Prelims – 2025",
      pdf_en: "/pdfs/english/ibps_po_2025.pdf",
      pdf_hi: "/pdfs/hindi/ibps_po_2025.pdf"
    },
    {
      year: 2024,
      name: "IBPS PO Prelims – 2024",
      pdf_en: "/pdfs/english/ibps_po_2024.pdf",
      pdf_hi: "/pdfs/hindi/ibps_po_2024.pdf"
    },
    {
      year: 2023,
      name: "SBI PO Prelims – 2023",
      pdf_en: "/pdfs/english/ibps_po_2023.pdf",
      pdf_hi: "/pdfs/hindi/ibps_po_2023.pdf"
    },
     {
      year: 2022,
      name: "SBI PO Prelims – 2022",
      pdf_en: "/pdfs/english/ibps_po_2022.pdf",
      pdf_hi: "/pdfs/hindi/ibps_po_2022.pdf"
    }
  ]
},
railway: {
  title: "Railway PYQs",
  pyq: [
    {
      year: 2025,
      name: "RRB NTPC CBT-1 – 2025",
      pdf_en: "/pdfs/english/rrb_ntpc_2025.pdf",
      pdf_hi: "/pdfs/hindi/rrb_ntpc_2025.pdf"
    },
    {
      year: 2024,
      name: "RRB NTPC CBT-1 – 2024",
      pdf_en: "/pdfs/english/rrb_ntpc_2024.pdf",
      pdf_hi: "/pdfs/hindi/rrb_ntpc_2024.pdf"
    },
    {
      year: 2023,
      name: "RRB NTPC CBT-1 – 2023",
      pdf_en: "/pdfs/english/rrb_ntpc_2023.pdf",
      pdf_hi: "/pdfs/hindi/rrb_ntpc_2023.pdf"
    },
    {
      year: 2022,
      name: "RRB NTPC CBT-1– 2022",
      pdf_en: "/pdfs/english/rrb_ntpc_2022.pdf",
      pdf_hi: "/pdfs/hindi/rrb_ntpc_2022.pdf"
    }
  ]
},


  

  up_police: {
    title: "UP Police PYQs",
    pyq: [
      {
        year: 2024,
        name: "UP Police 2024",
        pdf_en: "/pdfs/english/up2024.pdf",
        pdf_hi: "/pdfs/hindi/up2024.pdf",
      },
    ],
  },

};

/* --------------------------- ROUTE --------------------------- */

router.get("/", (req: Request, res: Response) => {
  const jobRaw = req.query.job;

  const job = Array.isArray(jobRaw) ? jobRaw[0] : jobRaw;

  if (!job || typeof job !== "string") {
    return res.status(400).json({ message: "Job query required" });
  }

  type JobKey = keyof typeof pyqData;

  // job is dynamic, so we check it manually first
  if (!(job in pyqData)) {
    return res.json({ title: job, pyq: [] });
  }

  const data = pyqData[job as JobKey];

  return res.json(data);
});

export default router;

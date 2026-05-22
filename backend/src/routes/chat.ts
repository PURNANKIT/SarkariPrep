import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "SarkariPrep AI",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [{ role: "user", content: message }],
        }),
      },
    );

    const data = await response.json();
    console.log("OPENROUTER:", data);

    const reply = data?.choices?.[0]?.message?.content || "No response";

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenRouter API error" });
  }
});

export default router;

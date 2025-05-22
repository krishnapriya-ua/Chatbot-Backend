
const express = require('express')
const router = express.Router()
require('dotenv').config()
const { GoogleGenerativeAI } = require('@google/generative-ai');
const GeminiAPIKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(GeminiAPIKey)

router.post('/chat', async (req, res) => {
  const message = req.body.message;

  try {
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid input message" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const chat = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
      history: [],
    });

    const result = await chat.sendMessage(message);

    const reply =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no response for this question";

    console.log(reply, 'REPLY');
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});



module.exports = router
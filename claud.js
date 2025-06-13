const axios = require("axios");

const API_KEY = process.env.ANTHROPIC_API_KEY;
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

async function askClaude(prompt) {
  try {
    const res = await axios.post(
      CLAUDE_API_URL,
      {
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        temperature: 0.3,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "content-type": "application/json",
        },
      }
    );

    return res.data?.content?.[0]?.text;
  } catch (err) {
    console.error("Claude API error:", err.response?.data?.error?.message || err.message);
    return err.response?.data?.error?.message || err.message
  }
}

module.exports = { askClaude };

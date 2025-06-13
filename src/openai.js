const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function askOpenAI(prompt) {
    try{
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an intelligent Slack assistant that helps developers and QA teams during sprints. Be helpful, concise, and occasionally witty." },
          { role: "user", content: prompt },
        ],
      });

      return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.error(error.message);
        return "I'm sorry, I'm having trouble processing your request. Please try again later.";
    }
}

module.exports = { askOpenAI };
# 🤖 Slack Chat Bot with OpenAI Integration

This is a proof-of-concept (POC) project that demonstrates how to build a powerful Slack bot integrated with OpenAI to intelligently understand and respond to user prompts within a Slack workspace.

---

## 📌 Features

- 🧠 Responds intelligently to Slack messages using OpenAI's GPT model.
- 🔄 Thread-aware: replies in the same thread where it's mentioned.
- 🎯 Understands context and responds with relevant answers (e.g. summaries, explanations, suggestions).
- 🔐 Secure setup using Slack tokens and OpenAI API keys.
- 🔍 Scalable structure for future integrations (e.g. Claude Code, GitHub PR automation).

---

## 🛠 Tech Stack

- **Node.js**
- **Slack Bolt SDK**
- **OpenAI GPT-4 API**
- **Axios** for HTTP requests
- **Dotenv** for environment configuration

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/slack-openai-bot.git
cd slack-openai-bot

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_SIGNING_SECRET=your-slack-signing-secret
OPENAI_API_KEY=sk-...
```

🔑 Get Slack tokens from: https://api.slack.com/apps  
🔑 Get OpenAI API key from: https://platform.openai.com/account/api-keys

### 4. Run the Bot Locally

```bash
npm run dev
```

You need to expose your local server to Slack using a tool like ngrok:

```bash
npx ngrok http 3000
```

Update the Slack app's Event Subscriptions URL in your Slack app settings:

```
https://<your-ngrok-subdomain>.ngrok.io/slack/events
```

## 💬 Example Usage

User in Slack:
```
@bot How many issues are posted in the channel today, What's the progress of them?
```

Bot:
```
🗓️ Date: June 13, 2025
📌 Total Issues Reported: 3

1. ✅ [Fixed] Login button unresponsive on mobile (by @saboor)  
2. 🚧 [In Progress] Broken link in dashboard footer (assigned to @ali)  
3. ⏳ [Pending] Add email validation in signup form (unassigned)

📈 Progress:  
- 1 Resolved  
- 1 In Progress  
- 1 Pending Assignment

```

## 🧪 What's Next (Coming Soon)

We're working on automating full dev workflows using Claude Code and GitHub:

✅ Parse developer instructions from Slack threads  
✅ Use Claude 3 Code model to analyze and update source code 
✅ Commit changes and open a PR via GitHub API  
✅ Post PR link back into the original Slack thread  

## 🤝 Contributing

PRs and suggestions are welcome! This project is in active development for internal experimentation.


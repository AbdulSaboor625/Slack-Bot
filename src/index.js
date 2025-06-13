require("dotenv").config();
const { App } = require("@slack/bolt");
const { askClaude } = require("./claud");
const { askOpenAI } = require("./openai");
const { getSlackData, getSlackUserWithId } = require("./slack");


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  port: process.env.PORT || 3000,
});

app.event("app_mention", async ({ event, say }) => {
  const { formattedMessages, users } = await getSlackData(event.channel);
  const user = await getSlackUserWithId(event.user);
  if (event.subtype === undefined && !event.bot_id) {
    const userInput = event.text;

    const prompt = `
                You are a Slack assistant with access to recent messages and users data. User has asked for this query only answer with relevant information no extra information or text. Here is the query:
                "${userInput}"

                Here is the user who asked the query:
                ${user.name}

                Here are the last 100 messages in the channel:
                ${formattedMessages}

                Here are the users in the channel:
                ${JSON.stringify(users)}

                I have stringified the responses to make it easier to read. Based on these results, give the best possible answer by keeping the conversation to the point.
                `;

    // Send to OpenAI
    const reply = await askOpenAI(prompt);

    // Send response back to Slack
    await say(reply);
  }
});

app.message(async ({ message, say }) => {

  // const { formattedMessages, users } = await getSlackData(message.channel);

  // if (message.subtype === undefined && !message.bot_id) {
  //   const userInput = message.text;

  //   const prompt = `
  //               You are a Slack assistant with access to recent messages.

  //               User asked:
  //               "${userInput}"

  //               Here are the last 100 messages in the channel:
  //               ${formattedMessages}

  //               Here are the users in the channel:
  //               ${JSON.stringify(users)}

  //               I have stringified the responses to make it easier to read. Based on these results, give the best possible answer by keeping the conversation to the point.
  //               `;

  //   // Send to OpenAI
  //   const reply = await askOpenAI(prompt);

  //   // Send response back to Slack
  //   await say(reply);
  // }
});


(async () => {
  await app.start();
  console.log("⚡️ Slack bot is running!");
})();

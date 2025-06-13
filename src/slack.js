const { WebClient } = require("@slack/web-api");

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

async function getSlackUserWithId(userId){
    const res = await slackClient.users.info({ user: userId });
    return res
}


async function formatMessagesWithNames(messages) {
    const userIdSet = new Set(messages.map(msg => msg.user).filter(Boolean));
    const userMap = {};
  
    // Fetch all user info once
    for (const userId of userIdSet) {
      const user = await getSlackUserWithId(userId);
      userMap[userId] = user.name;
    }
    // Format messages
    const formatted = messages
      .filter(msg => msg.text)
      .map(msg => {
        const name = userMap[msg.user] || "Unknown";
        return `${name}: ${msg.text}`;
      })
      .join("\n");
  
    return formatted;
  }

  async function fetchAllMessages(slackClient, channelId, maxMessages = 100) {
    let allMessages = [];
    let cursor;
    
    do {
      const res = await slackClient.conversations.history({
        channel: channelId,
        limit: Math.min(100, maxMessages - allMessages.length),
        cursor: cursor,
      });
  
      allMessages = allMessages.concat(res.messages);
      cursor = res.response_metadata?.next_cursor;
  
    } while (cursor && allMessages.length < maxMessages);
  
    console.log('allMessages length', allMessages.length);
    return allMessages;
  }
  
  
  async function getSlackData(channelId){
    const messages = await fetchAllMessages(slackClient, channelId);
    console.log('messages length', messages.length);
    const formattedMessages = await formatMessagesWithNames(messages); 
  
    const users = await slackClient.users.list();
  
    return {
      formattedMessages,
      users,
    }
  
  }

  module.exports = { getSlackData, getSlackUserWithId };
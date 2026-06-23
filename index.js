const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

app.command("/hughmanns-bot-ping",async({command,ack,respond}) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({text: `Pong!\nLatency: ${latency}ms`});
});

app.command("/hughmanns-bot-help",async({ack,respond}) => {
    await ack();
    await respond({
        text:
    `Available Commands:
    /hughmanns-bot-help - Displays this menu.
    /hughmanns-bot-ping - Pings the bot! Check for latency.
    /hughmanns-bot-catfact - Get a cat fact.`
    });
});

app.command("/hughmanns-bot-catfact", async ({ack,respond}) => {
    await ack();
    try {
        const response = await axios.get("https://catfact.ninja/fact");
        await respond({text: `Here's a fun fact about cats:\n${response.data.fact}`});
    } catch (err) {
        await respond({text: "Whoops! I couldn't fetch a cat fact."});
    }
});

app.command("/hughmanns-bot-joke", async({ack,respond}) => {
    await ack();
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
        await respond({
            text:
            `${response.data.setup}
            
            ${response.data.punchline}`
            
        });

    } catch (err) {
        await respond({text: "Whoops! I couldn't fetch a joke."});
    }
});

(async () => {
    await app.start();
    console.log("hughmanns-bot is now running!");
})();
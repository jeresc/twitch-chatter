import tmi from "tmi.js";
import readline from "readline";

const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
};

const ans = await askQuestion(
  "Escribi el nombre de quien queres copiar (en minúscula): ",
);

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (tags.username == ans) {
    client.say(channel, `${message}`);
  }
});

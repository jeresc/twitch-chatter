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

const channel = process.env.CHANNEL_NAME ?? await askQuestion(
  "Escribi el canal en el que queres copiar a alguien (en minúscula): ",
);

const copycat = await askQuestion(
  "Escribi el nombre de quien queres copiar (en minúscula): ",
);

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [channel],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  if (tags.username == copycat) {
    client.say(channel, `${message}`);
  }
});

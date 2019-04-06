const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config();

var wikiSearch = require("./wikiSearch");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content.includes("!deets")) {
    wikiSearch(msg.content.substring(7))
      .then(discordResponse => {
          msg.reply(discordResponse.wikiFirstSentence + '\n' + discordResponse.wikiURL);
      })
      .catch(err => {
          msg.reply('Sorry something went wrong!');
      });
  }
});

client.login(process.env.TOKEN);

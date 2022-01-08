const Discord = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config();

const Loggy = require("./lib/logger");
const commandHandler = require("./commandHandler");

const client = new Discord.Client();
const logger = new Loggy();

client.on("ready", () => {
  logger.success(`Bot logged in as ${client.user.tag}`);
  client.user.setActivity("Use ?help");
});

client.on("message", (message) => {
  if (message.author.id === client.user.id) return;
  commandHandler(message);
});

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    client.login(process.env.BOT_TOKEN);
    logger.success("Database Initialized");
  })
  .catch(console.err);

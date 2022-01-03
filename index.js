const Discord = require('discord.js');
require('dotenv').config();

const Loggy = require('./lib/logger');
const commandHandler = require('./commandHandler');

const client = new Discord.Client();
const logger = new Loggy();

client.on('ready', () => {
  logger.success(`Bot logged in as ${client.user.tag}`);
  client.user.setActivity('Use ?help');
});

client.on('message', (message) => {
  if (message.author.id === client.user.id) return;
  commandHandler(message);
});

client.login(process.env.BOT_TOKEN);
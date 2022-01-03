require('dotenv').config();

const commandIndexGenerator = require('./commandIndexGen');
const altGenenerator = require('./altGen');
const ErrorEmbed = require('./utils/errorEmbed');
const Loggy = require('./lib/logger');

const prefix = process.env.PREFIX;

const logger = new Loggy();

const commandHandler = (message) => {
  if (!message.content.startsWith(prefix)) return;
  if (!message.content[1]) return;

  const baseCommand = message.content.toLowerCase().split(" ")[0].split("");
  baseCommand.shift();

  const command = baseCommand.join("");

  const altInstance = altGenenerator();
  if (altInstance.alts.includes(command)) {
    logger.log(`Running command ${command}`)
    altInstance.altIndex[command].handler(message);
    return;
  }

  const commandIndex = commandIndexGenerator();
  if (!commandIndex[command]) {
    message.channel.send(
      new ErrorEmbed(
        "Command Not Found",
        "I don't think I have that command chief."
      )
    );
    logger.error('User used invalid command');
    return;
  }

  logger.log(`Running command ${command}`)
  commandIndex[command].handler(message);
};

module.exports = commandHandler;
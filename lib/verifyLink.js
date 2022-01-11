const Links = require("../linkSchema");
const ErrorEmbed = require("../utils/errorEmbed");
const genericError = require("../utils/genericError");
const Loggy = require("./logger");

const logger = new Loggy();

const verifyLink = async (message) => {
  try {
    const user = await Links.findOne({ id: message.author.id });
    if (!user) {
      logger.log('We did not find the user')
      message.channel.send(
        new ErrorEmbed(
          "Account not linked",
          "You need to link a username to this account in order to see your own stats when using the command standalone."
        )
      );
      return false;
    }
    return user;
  } catch (err) {
    logger.error(err);
    genericError(message);
    return;
  }
};

module.exports = verifyLink;

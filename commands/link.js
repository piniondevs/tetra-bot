const Links = require("../linkSchema");
const Loggy = require("../lib/logger");
const genericError = require("../utils/genericError");
const ErrorEmbed = require("../utils/errorEmbed");
const SuccessEmbed = require("../utils/successEmbed.js");

const logger = new Loggy();

module.exports = {
  name: "link",
  alt: "l",
  desc: "Links your tetr account to your discord acc (unofficially) so that you can see your profile when you use a command without an argument. Usage: `?link yourusernamehere`",
  handler: (message) => {
    try {
      const base = message.content.split(" ");
      base.shift();
      const name = base.join();

      if (!name) {
        message.channel.send(
          new ErrorEmbed(
            "No username provided",
            "You gotta put a username next to the command so that we can link your acc to that username."
          )
        );
        return;
      }

      const link = new Links({ id: message.author.id, username: name });
      link
        .save()
        .then(() => {
          message.channel.send(
            new SuccessEmbed(
              "Account Linked Successfully",
              "The account has been linked to your Discord. Use the unlink command if you wish to unlink again."
            )
          );
          return;
        })
        .catch((err) => logger.log(err));
    } catch (err) {
      genericError(message);
      logger.error(err);
      return;
    }
  },
};

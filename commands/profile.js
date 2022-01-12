const axios = require("axios");

const Loggy = require("../lib/logger");
const genericError = require("../utils/genericError");
const ErrorEmbed = require("../utils/errorEmbed");
const createProfileEmbed = require("../lib/createProfileEmbed");
const verifyLink = require("../lib/verifyLink");

const logger = new Loggy();

module.exports = {
  name: "profile",
  alt: "p",
  desc: "Command that shows a users profile. Usage: `?profile someusernamehere`",
  handler: async (message) => {
    try {
      const baseContent = message.content.split(" ");
      baseContent.shift();
      const targetUser = baseContent.join(" ");

      if (!targetUser) {
        const user = await verifyLink(message);
        if (!user) return;
        const res = await axios.get(
          `http://ch.tetr.io/api/users/${user.username}`
        );
        const payload = res.data;

        if (
          payload.error ===
          "No such user! | Either you mistyped something, or the account no longer exists."
        ) {
          message.channel.send(
            new ErrorEmbed(
              "Invalid Username",
              "We could not find anyone with that username."
            )
          );
          return;
        }

        if (!payload.success) {
          genericError(message);
          logger.error(payload.error);
          return;
        }

        message.channel.send(createProfileEmbed(payload.data));
        return;
      }

      const res = await axios.get(`http://ch.tetr.io/api/users/${targetUser}`);
      const payload = res.data;

      if (
        payload.error ===
        "No such user! | Either you mistyped something, or the account no longer exists."
      ) {
        message.channel.send(
          new ErrorEmbed(
            "Invalid Username",
            "We could not find anyone with that username."
          )
        );
        return;
      }

      if (!payload.success) {
        genericError(message);
        logger.error(payload.error);
        return;
      }

      message.channel.send(createProfileEmbed(payload.data));
    } catch (err) {
      genericError(message);
      logger.error(err);
      return;
    }
  },
};

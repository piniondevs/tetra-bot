const axios = require('axios');

const Loggy = require("../lib/logger");
const genericError = require("../utils/genericError");
const ErrorEmbed = require("../utils/errorEmbed");
const createProfileEmbed = require('../lib/createProfileEmbed');

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
        message.channel.send(
          new ErrorEmbed(
            "No username provided",
            "You need to provide a tetrio account username to see their stats."
          )
        );
        return;
      }

      const res = await axios.get(`https://ch.tetr.io/api/users/${targetUser}`);
      const payload = res.data;

      if (!payload.success) { 
        genericError(message);
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

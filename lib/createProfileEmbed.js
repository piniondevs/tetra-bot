const { MessageEmbed } = require("discord.js");

const positionSuffix = require("./positionSuffix");

const createProfileEmbed = (data) => {
  const embed = new MessageEmbed()
    .setColor("#161a2a")
    .setTitle("Profile:")
    .setThumbnail(
      `https://tetr.io/user-content/avatars/${data.user._id}.jpg?rv=${data.user.avatar_revision}`
    )
    .addFields([
      { name: "Username:", value: `${data.user.username.toUpperCase()}` },
      { name: 'Country:', value: `:flag_${data.user.country.toLowerCase()}:` },
      { name: "Rank:", value: data.user.league.rank.toUpperCase() },
      { name: "XP:", value: `${data.user.xp}` },
      { name: "Friends:", value: `${data.user.friend_count}` },
      { name: "APM:", value: data.user.league.apm, inline: true },
      { name: "PPS:", value: data.user.league.pps, inline: true },
      { name: "VS:", value: data.user.league.pps, inline: true },
      {
        name: "Global Position:",
        value: `${data.user.league.standing}'${positionSuffix(
          data.user.league.standing
        )}`,
        inline: true,
      },
      {
        name: "Local Position:",
        value: `${data.user.league.standing_local}'${positionSuffix(
          data.user.league.standing_local
        )}`,
        inline: true,
      },
    ]);
  return embed;
};

module.exports = createProfileEmbed;

const Discord = require("discord.js");

module.exports.help = {
  name: "voice",
  description: "detect where the user has connect",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  let user = message.mentions.members.first();

  if (!user)
    return message.reply(
      "<:False:823030995053576232> You should mention(**User**)"
    );

  if (user.voice.channel === null || user.voice.channel === undefined)
    return message.reply(
      `<:False:823030995053576232> That person is not on any voice Channel`
    );
  let invite = await user.voice.channel.createInvite();

  message.reply(
    invite
      ? `<:True:826475694661042206> Here's the voice invite of that user\n${invite}`
      : "There has been an error during the creation of the invite."
  );
};

const { MessageEmbed } = require("discord.js");
module.exports.help = {
  name: "claim",
  description: "claim the channel",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

// const oldState = require("../index");
// const newState = require("../index");
// const AUTO_VOICE_CHANNEL = require("../index");

module.exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  const channelOwner = channel.permissionOverwrites.cache.map((x) => {
    if (x) {
      return message.guild.members.resolve(x.id)?.user.username;
    }
  });

  if (!channel)
    return message.reply(
      "<:Locked:878090820912295967> Setting channel on your own channel"
    );

  if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
    return message.reply(
      "<:Locked:878090820912295967> I dont have authority to manage"
    );

  if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
    return message.reply("<:Locked:878090820912295967> Channel is owned");

  // let user = message.mentions.members.first();

  // if (!user)
  //   return message.reply(
  //     "<:False:823030995053576232> You should mention(**User**)"
  //   );

  // if (user.user.bot)
  //   return message.reply(
  //     "<:False:823030995053576232> User detected as (**Bot**)"
  //   );

  let embed = new MessageEmbed()
    .setAuthor("Channel Owner")
    .addField("Owner", "Test " + channelOwner.length);

  return message.channel.send({ content: `Ini`, embeds: [embed] });
};

// ${channelr.permissionOverwrites.cache.map((x) => x.type === "role" ? message.guild.roles.resolve(x.id)?.name : message.guild.members.resolve(x.id)?.user.username

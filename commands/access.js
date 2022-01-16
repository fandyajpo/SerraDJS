const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "access",
  description: "access user to your voice channel",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  let channel = message.member.voice.channel;
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

  let user = message.mentions.members.first();

  if (!user)
    return message.reply(
      "<:False:823030995053576232> You should mention(**User**)"
    );

  if (user.user.bot)
    return message.reply(
      "<:False:823030995053576232> User detected as (**Bot**)"
    );

  let ikan = new MessageEmbed()
    .setTitle("Access Granted")
    .setDescription(
      `<:True:826475694661042206> <@${message.member.id}> add access to <@${user.id}>`
    )
    .setFooter(`© ${message.guild.name} 2021`)
    .setColor("GREEN");

  await channel.permissionOverwrites.edit(user.id, {
    PRIORITY_SPEAKER: true,
    CONNECT: true,
    VIEW_CHANNEL: true,
    USE_VAD: true,
  });

  return message.reply({
    embeds: [ikan],
  });
};

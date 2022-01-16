const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "unaccess",
  description: "remove user access",
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
  if (user.author.id) {
    return message.reply("I couldnt remove your permanent access");
  }

  if (!user)
    return message.reply(
      "<:False:823030995053576232> You should mention(**User**)"
    );

  if (user.user.bot)
    return message.reply(
      "<:False:823030995053576232> User detected as (**Bot**)"
    );

  let ikan = new MessageEmbed()
    .setTitle("Access Removed")
    .setDescription(
      `<:True:826475694661042206> <@${message.member.id}> Remove access to <@${user.id}>`
    )
    .setFooter(`© ${message.guild.name} 2021`)
    .setColor("GREEN");

  await channel.permissionOverwrites.delete(user.id);

  return message.reply({
    embeds: [ikan],
  });
};

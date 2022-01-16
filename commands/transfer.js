const { MessageEmbed } = require("discord.js");

module.exports.help = {
  name: "transfer",
  description: "transfer the channel access",
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
  try {
    if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
      return message.reply("<:Locked:878090820912295967> Channel is owned");

    if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
      return message.reply(
        "<:Locked:878090820912295967> I dont have authority to manage"
      );

    let user = message.mentions.members.first();
    if (!user)
      return message.reply(
        "<:False:823030995053576232> You should mention(**User**)"
      );

    if (user.user.bot)
      return message.reply(
        "<:False:823030995053576232> User detected as (**bot**)"
      );

    if (user.voice.channel === null || user.voice.channel === undefined)
      return message.reply(
        `<:False:823030995053576232> That person should join to your channel`
      );

    async () => await channel.permissionOverwrites.delete(message.member.id);

    async () =>
      await channel.permissionOverwrites.edit(user.id, {
        //PERMISSION FOR CHANNEL AUTHOR
        PRIORITY_SPEAKER: true,
      });

    let ikan = new MessageEmbed()
      .setTitle("Authority Update")
      .addField(
        "Transfer Rights",
        `
<:False:823030995053576232> Previous Owner : <@${message.member.id}>
<:True:826475694661042206> Current Author : <@${user.id}>
  `
      )
      .setFooter(`© ${message.guild.name} 2021`)
      .setColor("GREEN");
    throw message.reply({
      embeds: [ikan],
    });
  } catch (err) {
    console.log(err);
  }
};

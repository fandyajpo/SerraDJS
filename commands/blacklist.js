const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.help = {
  name: "blacklist",
  description: "blacklist user from voice channel",
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

  let doing = new MessageEmbed()
    .setAuthor(
      "Blacklist Voice",
      "https://cdn.discordapp.com/emojis/870629127525392424.png?v=1"
    )
    .addField(
      "How to do the command ?",
      `\`\`\`js
${config.PREFIX}blacklist <mention>
\`\`\``
    )
    .setFooter("Blacklist Statement")
    .setColor();
  if (!user)
    return message.reply({
      embeds: [doing],
    });

  await channel.permissionOverwrites.edit(user, {
    CONNECT: false,
  });

  let ngentot = new Discord.MessageEmbed()
    .setTitle("Permission Update")
    .setDescription(
      `\`🔨\` Now ${user} got blacklist in [\`${channel.name}\`] by **${message.author.username}**. Tadaa`
    )
    .setFooter(`© ${message.guild.name} 2021`)
    .setColor();
  await message.reply({
    embeds: [ngentot],
  });
};

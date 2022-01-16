const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.help = {
  name: "whitelist",
  description: "whitelisting user",
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

  if (!message.member.permissionsIn(channel).has("PRIORITY_SPEAKER"))
    return message.reply("<:Locked:878090820912295967> Channel is owned");

  if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS"))
    return message.reply(
      "<:Locked:878090820912295967> I dont have authority to manage"
    );

  let user = message.mentions.members.first();

  let doing = new MessageEmbed()
    .setAuthor(
      "Whitelist Voice",
      "https://cdn.discordapp.com/emojis/870629127525392424.png?v=1"
    )
    .addField(
      "How to do?",
      `\`\`\`js
${config.PREFIX}blacklist <mention>
\`\`\``
    )
    .setFooter("Whitelist Statement")
    .setColor("#FFFFFF");
  if (!user)
    return message.reply({
      embeds: [doing],
    });

  await channel.permissionOverwrites.delete(user);

  let ngentot = new Discord.MessageEmbed()
    .setTitle("Permission Update")
    .setDescription(
      `\`🔨\` Now ${user} already whitelisted in [\`${channel.name}\`] by **${message.author.username}**. Yuhuu`
    )
    .setFooter(`© MONEYPOWER 2021`)
    .setColor("#FFFFFF");
  await message.reply({
    embeds: [ngentot],
  });
};

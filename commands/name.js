const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports.help = {
  name: "name",
  description: "change channel name",
};

module.exports.limits = {
  rateLimit: 100,
  cooldown: 600000,
  case: "You can only change the channel 2x per ten minutes. because there's a rate limit",
};

module.exports.run = async (client, message, args) => {
  try {
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
    if (!args[0])
      return message.reply(
        "<:False:823030995053576232> Please type new channel name"
      );
    if (message.member.voice.channel) {
      let name = args.join(" ");
      let ngentot = new MessageEmbed()
        .setTitle("Channel Edited")
        .setDescription(
          `Channel Name edited by **${message.author.username}** into **${name}**`
        )
        .setFooter(`© ${message.guild.name} 2021`)
        .setColor("GREEN");
      channel.setName(name).then(async () => {
        await message.reply({
          embeds: [ngentot],
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

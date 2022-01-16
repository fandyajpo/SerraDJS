const Discord = require("discord.js");

module.exports.help = {
  name: "help",
  description: "change channel name",
};

module.exports.limits = {
  rateLimit: 5,
  cooldown: 2000,
  case: "Command has limit rate",
};

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    // .setAuthor(client.user.username.toString())
    .addField(
      "Contributor",
      "(1) *we need contributors to update and maintenance our technology*"
    );
  //     .addField(
  //       "Available Commands",
  //       `
  //     **Voice Channel (11)**
  // \`access\`     :: add owner permission in your channel
  // \`bitrate\`    :: setting up you own voice bitrate
  // \`blacklist\`  :: blacklist user
  // \`whitelist\`  :: whitelist user
  // \`transfer\`   :: transfer channelship permission
  // \`limit\`  :: manage the voice channel user limit
  // \`name\`   :: request the channel name
  // \`lock\`   :: locking channel
  // \`unlock\` :: open the voice channel
  // \`region\` :: there's a list for channel region
  // \`public\` :: show the voice channel

  //    **Information (3)**
  // \`help\`        :: get the available command list
  // \`voice\`       :: mention user and get voice invite
  // \`channelinfo\` :: getting channel information
  // `
  //     );

  return message.channel.send({ embeds: [embed] });
};

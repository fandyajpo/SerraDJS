const config = require("../config.json");
module.exports.help = {
  name: "public",
  description: "make the channel open public",
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 2000,
  case: "Command has limit rate",
};
module.exports.run = async (client, message, args) => {
  const memberRole = message.guild.roles.cache.find(
    (ikan) => ikan.name === config.MEMBER
  );
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

  await channel.permissionOverwrites.edit(memberRole, {
    VIEW_CHANNEL: true,
  });

  return message.react("<:True:826475694661042206>");
};

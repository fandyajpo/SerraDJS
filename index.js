const { Client, Collection, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

const config = require("./config.json");
const { readFileSync } = require("fs");
const TOKEN = readFileSync("token.txt", "utf8");
const map = new Map();
//!EXPORTS

//!MONGO MODEL
const Note = require("./structure/model/note");

const client = new Client({
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  intents: [
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
  ],
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
  },
});
// console.log(client);
client.prefix = config.PREFIX;
client.commands = new Collection();
client.limits = new Map();
client.on("warn", (error) => console.log(error));
client.on("error", (error) => console.log(error));
client.setMaxListeners(0);
client.login("ODI2NDk1Mjc4NTYzMTk2OTY5.YGNTtQ.MZJs57coErOnumKh_rf5_eAEDQA");
// client.login("ODQwODA4NTg5OTcwMzc0NjY3.YJdmBQ.78dtXRbrnMOw0x4ivtF9uVY7zzg");
const command = require("./structure/commandHandler");
command.run(client);

const events = require("./structure/event");
events.run(client);

// !ANTI CRASH
process.on("unhandledRejection", (reason, p) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Unhandled Rejection/Catch"
  );
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Uncaught Exception/Catch"
  );
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    " [Anti - Crash] :: Uncaught Exception/Catch (MONITOR)"
  );
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log("\x1b[31m%s\x1b[0m", " [Anti - Crash] :: Multiple Resolves");
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  if (!newState) return console.log("[ NOT USER ]");
  if (!oldState) return console.log("[ NOT USER ]");
  const user = await client.users.fetch(newState.id);
  const AUTO_VOICE_CHANNEL = "928611091238490112";
  const AUTO_CATEGORY_CHANNEL = "922024249651253248";

  if (
    newState.channel === newState.guild.channels.cache.get(AUTO_VOICE_CHANNEL)
  ) {
    newState.guild.channels
      .create(`${user.username}'s`, {
        type: "GUILD_VOICE",
        parent: AUTO_CATEGORY_CHANNEL,
      })
      .then(async (set) => {
        await set.lockPermissions().then((add) =>
          add.permissionOverwrites.edit(newState.id, {
            PRIORITY_SPEAKER: true,
          })
        );
        await newState.setChannel(newState.guild.channels.cache.get(set.id));
      });
  }
  if (oldState.channel) {
    let filtered = (ch) =>
      ch.parent === newState.guild.channels.cache.get(AUTO_CATEGORY_CHANNEL) &&
      ch.id !== AUTO_VOICE_CHANNEL &&
      oldState.channel.id === ch.id;
    oldState.channel.members.filter((m) => !m.user.bot).size < 1;
    return oldState.guild.channels.cache
      .filter(filtered)
      .forEach(async (ch) => await ch.delete());
  }
  module.exports = { newState, oldState, AUTO_VOICE_CHANNEL };
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  const notes = await Note.find({ userID: message.author.id });
  if (message.content.toLowerCase().startsWith("!addnote")) {
    const index = message.content.indexOf(" ");
    const description = message.content.slice(index + 1);
    try {
      await Note.create({
        description,
        userID: message.author.id,
      });
      return message.channel.send({ content: "Data saved" });
    } catch (err) {
      console.log("Create Error :", err);
      return message.channel.send({ content: "Failed to save" });
    }
  } else if (message.content.toLowerCase().startsWith("!getnote")) {
    const args = message.content.split(" ");
    if (args.length === 1) {
      console.log(notes);
      let description = "";
      for (const i in notes) {
        description += `${parseInt(i) + 1}) ${notes[i].description}\n`;
      }
      message.channel.send(description);
      console.log({ Data: notes.length });
    }
  } else if (message.content.toLowerCase().startsWith("!delnote")) {
    try {
      await Note.deleteOne({
        _id: "61c7c55a104b8e3510f6a4ad",
        userID: message.author.id,
      });
      return message.channel.send({ content: "Data deleted" });
    } catch (err) {
      console.log("Delete Error :", err);
      return message.channel.send({ content: "Something went err" });
    }
  }
});

client.on("rateLimit", (data) => {
  console.log(data.route);
  // console.log(
  //   "\x1b[31m%s\x1b[0m",
  //   `Rate limit hit ${
  //     data.timeDifference
  //       ? data.timeDifference
  //       : data.timeout
  //       ? data.timeout
  //       : "Unknown timeout "
  //   }`
  // );
});

// client.on("debug", (debug) => {
//   console.log("\x1b[35m%s\x1b[0m", debug);
// });

client.on("message", async (message) => {
  if (message.channel.id === "924675252921991169") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      if (map.has(message.author.id)) {
        const data = map.get(message.author.id);
        const { lastmsg, timer } = data;
        const diff = message.createdTimestamp - lastmsg.createdTimestamp;

        let msgs = data.msgs;

        if (diff > 2000) {
          clearTimeout(timer);
          data.msgs = 1;
          data.lastmsg = message;
          data.timer = setTimeout(() => {
            map.delete(message.author.id);
          }, 5000);
          map.set(message.author.id, data);
        } else {
          ++msgs;
          if (parseInt(msgs) === 3) {
            const embed = new MessageEmbed()
              .setAuthor("Spam Alert")
              .addField(
                `Tindakan global mute`,
                `
Username : \`${message.author.id}\`
Duration : 1 menit aja njing!        
          `
              )
              .setFooter("Jangan spam anjing!");
            const user = message.member;
            await user.timeout(60000, "They deserved it");

            return message.channel.send({
              content: `<@${message.author.id}> Has been mute for 1m`,
            });
          } else {
            data.msgs = msgs;
            map.set(message.author.id, data);
          }
        }
      } else {
        let remove = setTimeout(() => {
          map.delete(message.author.id);
        }, 5000);
        map.set(message.author.id, {
          msgs: 1,
          lastmsg: message,
          timer: remove,
        });
      }
    }
  }
});

// client.on("message", (message) => {
//   const channelr = message.member.voice.channel;
//   if (message.content.startsWith("check")) {
//     console.log(
//       channelr.permissionOverwrites.cache.map((x) =>
//         x.type === "role"
//           ? message.guild.roles.resolve(x.id)?.name
//           : message.guild.members.resolve(x.id)?.user.username
//       )
//     );
//   }
// });

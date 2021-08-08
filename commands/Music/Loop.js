const Command = require("../../abstract/Command.js");

module.exports = class Loop extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Clears the queue.",
      category: 'Music',
      aliases: ['reapet']
    });
  }
  
  async run(msg, args) {   
    if (!msg.member.voice.channel) return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | You have to be connected to a voice channel before you can use this command.`
      }
    });

    if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | You have to be connected to same voice channel.`
      }
    });

    if (!this.client.player.getQueue(msg)) return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | I am not playing anything.`
      }
    });

    if (!args[0]) return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | Please provide a valid query. Example: \`${this.client.config.prefix}loop queue\` | \`${this.client.config.prefix}loop current\``
      }
    });

    if (args[0].toLowerCase() === `song` || args[0].toLowerCase() === `current`)  {
        if (this.client.player.getQueue(msg).repeatMode) {
            this.client.player.setRepeatMode(msg, false);
            return msg.channel.send({
                embed: {
                  color: this.client.util.color.success,
                  description: `${this.client.util.emoji.success} | Loop is now \`disabled\`.`
              }
            });
        } else {
            this.client.player.setRepeatMode(msg, true);
            return msg.channel.send({
                embed: {
                  color: this.client.util.color.success,
                  description: `${this.client.util.emoji.success} | Loop is now \`enabled\`.`
              }
            });
        }
    }

    else if (args[0].toLowerCase() === `queue` || args[0].toLowerCase() === `q`) {
        if (this.client.player.getQueue(msg).repeatMode) {
            this.client.player.setLoopMode(msg, false);
            return msg.channel.send({
                embed: {
                  color: this.client.util.color.success,
                  description: `${this.client.util.emoji.success} | Loop is now \`disabled\`.`
              }
            });
        } else {
            this.client.player.setLoopMode(msg, true);
            return msg.channel.send({
                embed: {
                  color: this.client.util.color.success,
                  description: `${this.client.util.emoji.success} | Loop is now \`enabled\`.`
              }
            });
        }
    }

    else {
        return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | Something went wrong!`
      }
    });
     }
  }
};

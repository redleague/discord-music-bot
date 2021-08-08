const Command = require("../../abstract/Command.js");

module.exports = class Play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      description: "Plays a song",
      category: 'Music',
      aliases: ["p"],
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

    if (!args[0]) return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | Please provide a search query!`
      }
    });

    else this.client.player.play(msg, args.join(" "), { firstResult: true });
  }
};

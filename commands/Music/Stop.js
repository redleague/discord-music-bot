const Command = require("../../abstract/Command.js");

module.exports = class Stop extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      description: "Stops music and clears the queue.",
      category: 'Music',
    });
  }
  
  async run(msg) {   
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

    else {
        this.client.player.setRepeatMode(msg, false);
        this.client.player.stop(msg);
        return msg.channel.send({
            embed: {
              color: this.client.util.color.success,
              description: `${this.client.util.emoji.success} | Successfully stoped the music.`
          }
        });
     }
  }
};

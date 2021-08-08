const Command = require("../../abstract/Command.js");

module.exports = class Resume extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      description: "Resumes music if player is paused.",
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

    if (!this.client.player.getQueue(msg).paused) return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | Player is not paused.`
      }
    });

    else {
        this.client.player.resume(msg);
        return msg.channel.send({
            embed: {
              color: this.client.util.color.success,
              description: `${this.client.util.emoji.success} | Resumed the music.`
          }
        });
     }
  }
};

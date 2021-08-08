const Command = require("../../abstract/Command.js");

module.exports = class  Shuffle extends Command {
  constructor(client) {
    super(client, {
      name: "shuffle",
      description: "Shuffles the queue.",
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

    if (!this.client.player.getQueue(msg).tracks.length) return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | Queue is empty.`
      }
    });

    else {
        this.client.player.shuffle(msg);
        return msg.channel.send({
            embed: {
              color: this.client.util.color.success,
              description: `${this.client.util.emoji.success} | Successfully shuffled the queue.`
          }
        });
     }
  }
};

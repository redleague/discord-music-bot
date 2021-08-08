const Command = require("../../abstract/Command.js");

module.exports = class Volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Displays current volume or changes volume.",
      category: 'Music',
      aliases: ['vol']
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

    const newvolume = parseInt(args[0], 10);

    if (!newvolume) return msg.channel.send({
        embed: {
          color: this.client.util.color.primary,
          description: `🔊 | Current volume is: \`${this.client.player.getQueue(msg).volume}\``
      }
    });

    if (newvolume < 0 || newvolume > 100) return msg.channel.send({
        embed: {
          color: this.client.util.color.error,
          description: `${this.client.util.emoji.error} | You can only set volume from \`0\` to \`100\`.`
      }
    });

    else {
        this.client.player.setVolume(msg, newvolume);
        return msg.channel.send({
            embed: {
              color: this.client.util.color.success,
              description: `${this.client.util.emoji.success} | Changed volume to: \`${newvolume}\``
          }
        });
     }
  }
};

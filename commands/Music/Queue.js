const Command = require("../../abstract/Command.js");
const { MessageEmbed } = require('discord.js');

module.exports = class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Pauses music if player is playing.",
      category: 'Music',
      aliases: ['q']
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

    const tracks = this.client.player.getQueue(msg);
        
    if (tracks.length < 10) {
      return msg.channel.send({
        embed: {
            color: this.client.util.color.primary,
            title: `Queue for ${msg.guild.name}`,
            thumbnail: {url: msg.guild.iconURL({dynamic: true})},
            description: tracks.map((track, i) => `\`${++i}).\`- [${track.title.split("[").join("\[").split("]").join("\]")}](${track.url})*\n~Requested by: \`${track.requestedBy.username}\``).join(`\n`)
          }
      });
    }

    else {
        
     }
  }
};

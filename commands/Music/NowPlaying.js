const Command = require("../../abstract/Command.js");
const { MessageEmbed } = require('discord.js');

module.exports = class NowPlaying extends Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      description: "Pauses music if player is playing.",
      category: 'Music',
      aliases: ['current', 'np']
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
        const track = this.client.player.nowPlaying(msg);
        //return console.log(currentTrack)
        var embed = new MessageEmbed()
        .setAuthor(`| Now Playing 🎶`, this.client.user.displayAvatarURL())
        .setTitle(track.title)
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .addFields(
            {name: `Author`, value: track.author, inline: true},
            {name: 'Duration', value: track.duration, inline: true},
            {name: `Progress Bar`, value: `${this.client.player.createProgressBar(msg, { timecodes: true })}`}
        )
        .setFooter(`Requested by: ${track.requestedBy.username}`)
        .setColor(this.client.util.color.primary)
        .setTimestamp();

        return msg.channel.send(embed);
     }
  }
};

const Client = require('./structures/Client');

const client = new Client();

client.login();

client.player.on('trackStart', async (msg, track) => {
    return msg.channel.send({
        embed: {
            color: client.util.color.error,
            description: `**Now Playing:** [${track.title}](${track.url})`
        }
    })
});

client.player.on('trackAdd', async (msg, queue, track) => {
    return msg.channel.send({
        embed: {
            color: client.util.color.error,
            description: `**Queued:** [${track.title}](${track.url})`
        }
    })
})
process.on('uncaughtException', err => console.error(err.stack));
process.on('unhandledRejection', err => console.error(err.stack));

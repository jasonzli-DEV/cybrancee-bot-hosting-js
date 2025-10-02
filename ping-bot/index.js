const Discord = require('discord.js');
const Config = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ping Bot Online');
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if message starts with the prefix
    if (!message.content.startsWith(Config.prefix)) return;

    // Parse command
    const args = message.content.slice(Config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Ping command
    if (command === 'ping') {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! 🏓\nBot latency: ${timeTaken}ms\nAPI latency: ${Math.round(client.ws.ping)}ms`);
    }
});

client.login(Config.token).catch((err) => {
    console.log(`Failed to authenticate with Discord network: "${err.message}"`);
});

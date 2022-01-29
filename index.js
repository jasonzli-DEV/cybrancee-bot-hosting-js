const fs = require('fs');
const Discord = require('discord.js'); 
const Config = require('./config.json'); 
const BotLib = require('./lib/bot.js');

const Keywords = require('./dispatchers/keywordDispatch');
const Commands = require('./dispatchers/commandDispatch');

const client = new Discord.Client(); 
client.botConfig = Config; 
client.botConfig.rootDir = __dirname; 

BotLib.loadHandlers(client, 'commands');
BotLib.loadHandlers(client, 'keywords');

const cooldowns = new Discord.Collection(); 


client.on('ready', () => {
    console.log('Bot Online');
});


client.on('message', message => {
    if(Keywords.handle(client, message)) {
        return;
    }

    if(Commands.handle(client, message, cooldowns)) {
        return;
    }
});

client.login(client.botConfig.token).catch((err) => {
    console.log(`Failed to authenticate with Discord network: "${err.message}"`);
});
const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
    loadHandlers(client, subdir) {
        const files = fs.readdirSync(`${client.botConfig.rootDir}/handlers/${subdir}`).filter(file => file.endsWith('.js'));

        client[subdir] = new Discord.Collection();

        for (const file of files) {
            const func = require(`${client.botConfig.rootDir}/handlers/${subdir}/${file}`);
            client[subdir].set(func.name, func);
        }
    }
}
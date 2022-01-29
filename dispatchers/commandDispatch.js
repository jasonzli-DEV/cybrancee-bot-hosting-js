const Discord = require('discord.js');

module.exports = {
    handle(client, message, cooldowns) {
        if(!message.content.startsWith(client.botConfig.prefix) || message.author.bot) return;

        const args = message.content.slice(client.botConfig.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;

        if (command.args && !args.length) {
            let reply = 'That command requires more details!';

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${client.botConfig.prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        if(!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3 ) * 1000;

        if(!timestamps.has(message.author.id)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        } else {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if(now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Whoa! You're sending commands too fast! Please wait ${timeLeft.toFixed(1)} more second(s) before running \`${command.name}\` again!`);
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
        }

        try {
            command.execute(message, args).catch((err) => {
                console.error(`Failed running command handler ${command.name}: "${err.message}"`)
            });
        } catch(error) {
            console.error(error);
            message.reply('Sorry! I ran into an error trying to do that!');
        }
    }
}
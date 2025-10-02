const Discord = require('discord.js');
const Config = require('./config.json');

const client = new Discord.Client();
const cooldowns = new Discord.Collection();

client.on('ready', () => {
    console.log('Moderation Bot Online');
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', message => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if message starts with the prefix
    if (!message.content.startsWith(Config.prefix)) return;

    // Parse command
    const args = message.content.slice(Config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Command handlers
    let command;
    switch(commandName) {
        case 'kick':
            command = kickCommand;
            break;
        case 'ban':
            command = banCommand;
            break;
        case 'mute':
            command = muteCommand;
            break;
        case 'unmute':
            command = unmuteCommand;
            break;
        case 'warn':
            command = warnCommand;
            break;
        case 'modhelp':
            command = modhelpCommand;
            break;
        default:
            return;
    }

    // Check permissions
    if (!message.member.hasPermission('MANAGE_MESSAGES') && commandName !== 'modhelp') {
        return message.reply('You do not have permission to use moderation commands!');
    }

    // Cooldown handling
    if (!cooldowns.has(commandName)) {
        cooldowns.set(commandName, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(commandName);
    const cooldownAmount = 3000; // 3 seconds

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before using this command again.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Execute command
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command!');
    }
});

// Kick command
const kickCommand = {
    execute(message, args) {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('You do not have permission to kick members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to kick! Usage: `!kick @user [reason]`');
        }

        if (!member.kickable) {
            return message.reply('I cannot kick this user! They may have a higher role than me.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        member.kick(reason)
            .then(() => {
                message.channel.send(`✅ ${member.user.tag} has been kicked. Reason: ${reason}`);
            })
            .catch(err => {
                console.error(err);
                message.reply('I was unable to kick the member.');
            });
    }
};

// Ban command
const banCommand = {
    execute(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('You do not have permission to ban members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to ban! Usage: `!ban @user [reason]`');
        }

        if (!member.bannable) {
            return message.reply('I cannot ban this user! They may have a higher role than me.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        member.ban({ reason: reason })
            .then(() => {
                message.channel.send(`✅ ${member.user.tag} has been banned. Reason: ${reason}`);
            })
            .catch(err => {
                console.error(err);
                message.reply('I was unable to ban the member.');
            });
    }
};

// Mute command
const muteCommand = {
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('You do not have permission to mute members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to mute! Usage: `!mute @user [reason]`');
        }

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return message.reply('No "Muted" role found! Please create a role named "Muted" and configure its permissions.');
        }

        if (member.roles.cache.has(muteRole.id)) {
            return message.reply('This user is already muted!');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        member.roles.add(muteRole, reason)
            .then(() => {
                message.channel.send(`✅ ${member.user.tag} has been muted. Reason: ${reason}`);
            })
            .catch(err => {
                console.error(err);
                message.reply('I was unable to mute the member.');
            });
    }
};

// Unmute command
const unmuteCommand = {
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('You do not have permission to unmute members!');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to unmute! Usage: `!unmute @user`');
        }

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return message.reply('No "Muted" role found!');
        }

        if (!member.roles.cache.has(muteRole.id)) {
            return message.reply('This user is not muted!');
        }

        member.roles.remove(muteRole)
            .then(() => {
                message.channel.send(`✅ ${member.user.tag} has been unmuted.`);
            })
            .catch(err => {
                console.error(err);
                message.reply('I was unable to unmute the member.');
            });
    }
};

// Warn command
const warnCommand = {
    execute(message, args) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a user to warn! Usage: `!warn @user [reason]`');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        message.channel.send(`⚠️ ${member.user.tag} has been warned. Reason: ${reason}`);
        
        // Try to DM the user
        member.user.send(`You have been warned in ${message.guild.name}. Reason: ${reason}`)
            .catch(() => {
                message.channel.send('(Could not DM the user about their warning)');
            });
    }
};

// Modhelp command
const modhelpCommand = {
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Moderation Bot Commands')
            .setDescription('Here are all available moderation commands:')
            .addFields(
                { name: '!kick @user [reason]', value: 'Kicks a user from the server' },
                { name: '!ban @user [reason]', value: 'Bans a user from the server' },
                { name: '!mute @user [reason]', value: 'Mutes a user (requires "Muted" role)' },
                { name: '!unmute @user', value: 'Unmutes a user' },
                { name: '!warn @user [reason]', value: 'Warns a user' },
                { name: '!modhelp', value: 'Shows this help message' }
            )
            .setFooter('Note: Most commands require MANAGE_MESSAGES permission or higher');

        message.channel.send(embed);
    }
};

client.login(Config.token).catch((err) => {
    console.log(`Failed to authenticate with Discord network: "${err.message}"`);
});

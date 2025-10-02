# Keyword Bot

A Discord bot that responds to specific keywords and commands.

## Features
- **Keyword responses**: Automatically responds when certain keywords are typed
- **Help command**: Lists all available commands
- Extensible handler system for commands and keywords

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your bot token in `config.json`:
   ```json
   {
     "prefix": "!",
     "token": "YOUR-DISCORD-BOT-TOKEN-HERE"
   }
   ```

3. Run the bot:
   ```bash
   node index.js
   ```

## Adding New Keywords
Add new keyword handlers in the `handlers/keywords/` directory. Example:
```javascript
module.exports = {
    name: 'KEYWORD',
    aliases: ['keyword', 'alt-keyword'],
    execute(message) {
        return message.channel.send('Response message');
    },
};
```

## Adding New Commands
Add new command handlers in the `handlers/commands/` directory. Example:
```javascript
module.exports = {
    name: 'commandname',
    description: 'Command description',
    aliases: ['alias1', 'alias2'],
    usage: '[optional args]',
    cooldown: 5,
    execute(message, args) {
        // Command logic here
    },
};
```

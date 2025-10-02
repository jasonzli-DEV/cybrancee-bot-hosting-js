# Discord Bot Collection

This repository contains three different Discord bots, each serving different purposes.

## Bots Overview

### 1. Keyword Bot (`keyword-bot/`)
A bot that responds to specific keywords and supports custom commands with a handler system.

**Features:**
- Keyword-based responses (e.g., responds to "LAHEE" with a gif)
- Command system with help command
- Extensible handler architecture for adding new commands and keywords

[View Keyword Bot README](keyword-bot/README.md)

### 2. Moderation Bot (`moderation-bot/`)
A bot focused on server moderation with essential moderation commands.

**Features:**
- Kick, ban, mute, unmute, and warn members
- Permission-based command access
- Built-in moderation help command

[View Moderation Bot README](moderation-bot/README.md)

### 3. Ping Bot (`ping-bot/`)
A simple bot that responds to ping commands and shows latency information.

**Features:**
- !ping command that displays bot latency and API latency
- Lightweight and easy to understand

[View Ping Bot README](ping-bot/README.md)

## Getting Started

Each bot is independent and can be run separately. To use any bot:

1. Navigate to the bot's directory:
   ```bash
   cd keyword-bot/  # or moderation-bot/ or ping-bot/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the bot by editing `config.json`:
   ```json
   {
     "prefix": "!",
     "token": "YOUR-DISCORD-BOT-TOKEN-HERE"
   }
   ```

4. Run the bot:
   ```bash
   node index.js
   ```

## Creating a Discord Bot

To use any of these bots, you'll need to:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the bot token and paste it into the `config.json` file
5. Go to the "OAuth2" section, select "bot" scope, and select the necessary permissions
6. Use the generated URL to invite the bot to your server

## Required Permissions

- **Keyword Bot**: Read Messages, Send Messages
- **Moderation Bot**: Read Messages, Send Messages, Kick Members, Ban Members, Manage Roles
- **Ping Bot**: Read Messages, Send Messages

## License

MIT License - See [LICENSE](LICENSE) file for details

## Author

Cybrancee

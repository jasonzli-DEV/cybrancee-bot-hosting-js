# Ping Bot

A simple Discord bot that responds to ping commands and shows the bot's latency.

## Features
- **!ping command**: Shows bot latency and API latency

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

## Usage
Once the bot is running and invited to your server, simply type:
```
!ping
```

The bot will respond with:
- Bot latency (time taken to process the command)
- API latency (WebSocket ping to Discord)

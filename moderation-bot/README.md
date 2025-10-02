# Moderation Bot

A Discord bot with basic moderation commands for managing server members.

## Features
- **!kick** - Kick members from the server
- **!ban** - Ban members from the server
- **!mute** - Mute members (requires a "Muted" role to be set up)
- **!unmute** - Unmute members
- **!warn** - Warn members
- **!modhelp** - Display help for all moderation commands

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

3. **Important**: For the mute/unmute commands to work, you need to:
   - Create a role named "Muted" in your Discord server
   - Configure the "Muted" role to deny "Send Messages" permission in all channels

4. Run the bot:
   ```bash
   node index.js
   ```

## Permissions
Most moderation commands require the user to have the `MANAGE_MESSAGES` permission or higher. Specific commands require:
- **!kick**: `KICK_MEMBERS` permission
- **!ban**: `BAN_MEMBERS` permission
- **!mute/unmute**: `MANAGE_ROLES` permission

The bot itself needs these permissions to execute the commands.

## Usage Examples
```
!kick @username Spamming in chat
!ban @username Violating server rules
!mute @username Inappropriate behavior
!unmute @username
!warn @username Please follow the rules
!modhelp
```

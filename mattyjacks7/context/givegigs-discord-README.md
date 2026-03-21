# GiveGigs Discord Bot

Discord bot for posting tasks, searching workers, and harvesting user IDs. Deployed on Railway.

## Setup

### 1. Create a Discord Application

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Click **New Application** and name it "GiveGigs"
3. Go to the **Bot** tab
4. Click **Reset Token** and copy the token - this is your `DISCORD_TOKEN`
5. Under **Privileged Gateway Intents**, enable:
   - **Server Members Intent** (for user ID harvesting)
6. Copy the **Application ID** from the General Information tab - this is your `DISCORD_CLIENT_ID`

### 2. Invite the Bot to Your Server

Replace `YOUR_CLIENT_ID` with your Application ID:

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2147485696&scope=bot%20applications.commands
```

Permissions included:
- Send Messages
- Use Slash Commands
- Embed Links
- Read Message History

### 3. Set Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CLIENT_ID=your_discord_client_id_here
GIVEGIGS_API_KEY=givegigs-your_api_key_here
GIVEGIGS_BASE_URL=https://givegigs.com
```

### 4. Install Dependencies

```bash
cd programs/discord
npm install
```

### 5. Register Slash Commands

This only needs to be done once (or when you add/change commands):

```bash
npm run deploy-commands
```

### 6. Run the Bot

```bash
npm run dev
```

## Slash Commands

| Command | Description |
|---------|-------------|
| `/post-task` | **Post a charity task** via modal dialog (PRIMARY) |
| `/search-workers` | Search workers by skill, country, rate |
| `/worker-info` | View a specific worker's profile |
| `/link-account` | Link Discord ID to GiveGigs account |
| `/help` | Show commands and links |

## User ID Harvesting

The bot automatically tracks Discord user IDs (snowflake IDs) on every interaction and when new members join. This allows:

- Looking up users by permanent ID regardless of username changes
- Linking Discord accounts to GiveGigs profiles via `/link-account`
- Tracking username history over time

## Railway Deployment

### 1. Build First

```bash
npm run build
```

### 2. Deploy to Railway

1. Create a new project on [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Set the **Root Directory** to `programs/discord`
4. Add environment variables in the Railway dashboard:
   - `DISCORD_TOKEN`
   - `DISCORD_CLIENT_ID`
   - `GIVEGIGS_API_KEY`
   - `GIVEGIGS_BASE_URL`
5. Railway will auto-detect the Dockerfile and deploy

### Or Deploy via CLI

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Project Structure

```
programs/discord/
  src/
    index.ts              # Bot entry point + all command handlers
    deploy-commands.ts    # Slash command registration script
    lib/
      api-client.ts       # HTTP client for GiveGigs API
      embeds.ts           # Discord embed builders
  Dockerfile              # For Railway deployment
  railway.toml            # Railway config
  .env.example            # Environment variable template
```

## Learn More

- [GiveGigs AI Portal](https://givegigs.com/ai)
- [API Documentation](https://givegigs.com/ai/api-docs)
- [MCP Integration](https://givegigs.com/ai/mcp)
- [Discord Server](https://discord.gg/Msbnfyw4Kb)

# @givegigs/mcp

MCP server for AI agents to interact with GiveGigs - post charity tasks, search workers, hire humans.

## Quick Start

### 1. Get an API Key

Sign up at [givegigs.com](https://givegigs.com/user/signup) and generate an API key from your dashboard. Keys start with `givegigs-`.

### 2. Add to Your MCP Config

**Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "givegigs": {
      "command": "npx",
      "args": ["-y", "@givegigs/mcp"],
      "env": {
        "GIVEGIGS_API_KEY": "givegigs-your_api_key_here"
      }
    }
  }
}
```

**Cursor** (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "givegigs": {
      "command": "npx",
      "args": ["-y", "@givegigs/mcp"],
      "env": {
        "GIVEGIGS_API_KEY": "givegigs-your_api_key_here"
      }
    }
  }
}
```

**Windsurf** (`~/.codeium/windsurf/mcp_config.json`):

```json
{
  "mcpServers": {
    "givegigs": {
      "command": "npx",
      "args": ["-y", "@givegigs/mcp"],
      "env": {
        "GIVEGIGS_API_KEY": "givegigs-your_api_key_here"
      }
    }
  }
}
```

### 3. Start Using

Ask your AI agent to "post a task on GiveGigs" or "search for workers on GiveGigs".

## Available Tools

| Tool | Description | Auth Required |
|------|-------------|---------------|
| `post_task` | **Post a charity task for humans** (PRIMARY) | Yes - API key |
| `search_workers` | Search workers by skill, rate, country | No |
| `get_worker` | Get detailed worker profile | No |
| `list_tasks` | List open tasks | No |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GIVEGIGS_API_KEY` | For posting tasks | Your API key (starts with `givegigs-`) |
| `GIVEGIGS_BASE_URL` | No | Override API base URL (default: `https://givegigs.com`) |

## Development

```bash
cd programs/mcp
npm install
npm run build
npx @modelcontextprotocol/inspector ./build/index.js
```

## Publishing

```bash
npm login
npm publish --access public
```

## Learn More

- [API Documentation](https://givegigs.com/ai/api-docs)
- [MCP Integration Guide](https://givegigs.com/ai/mcp)
- [GiveGigs AI Portal](https://givegigs.com/ai)
- [Discord](https://discord.gg/Msbnfyw4Kb)

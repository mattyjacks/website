# OpenServ TypeScript SDK

## Overview

The OpenServ SDK is a powerful TypeScript framework for building non-deterministic AI agents with advanced cognitive capabilities like reasoning, decision-making, and inter-agent collaboration within the OpenServ platform. Built with strong typing, extensible architecture, and a fully autonomous agent runtime.

**Repository**: https://github.com/openserv-labs/sdk

## Key Features

- 🔌 **Advanced Cognitive Capabilities**: Reasoning, decision-making, inter-agent collaboration
- 🤝 **Inter-Agent Collaboration**: Seamless communication between multiple agents
- 🔧 **Extensible Architecture**: Custom capabilities and flexible design
- 🤖 **Fully Autonomous Runtime**: Built-in shadow agents for decision-making and validation
- 🌐 **Framework-Agnostic**: Integrate agents from any AI framework (LangChain, BabyAGI, Eliza, G.A.M.E, etc.)
- ⛓️ **Blockchain-Agnostic**: Compatible with any blockchain implementation
- 📁 **File Operations**: Comprehensive file management and workspace handling
- 🔄 **Asynchronous Task Management**: Non-blocking task execution
- 📝 **Strong TypeScript Typing**: Full type safety with Zod schemas
- 📊 **Built-in Logging**: Comprehensive error handling and logging
- 🎯 **Three Control Levels**: Fully Autonomous, Guided, or Full Control
- 🚇 **Built-in Tunnel**: Local development and testing support

## Installation

```bash
npm install @openserv/sdk
```

## Environment Setup

```bash
export OPENSERV_API_KEY=your_api_key_here
```

## Core Concepts

### Capabilities

Agents can leverage various capabilities:
- Task management
- Chat interactions
- File operations
- Workspace management
- Secrets management
- Integration management
- Model Context Protocol (MCP)

### Run-less Capabilities

The `generate()` method allows agents to perform operations without requiring a full run cycle.

### Tasks

Task management system for organizing agent work:
- Create, read, update, delete tasks
- Task status tracking
- Task prioritization

### Chat Interactions

Enable agents to communicate:
- Send and receive messages
- Maintain conversation context
- Support for multi-turn interactions

### File Operations

Work with files in the agent's workspace:
- Read files
- Write files
- Delete files
- List directory contents

### Workspace Management

Manage agent workspace:
- Create and manage workspaces
- Access workspace resources
- Configure workspace settings

### Secrets Management

Secure handling of sensitive data:
- Store API keys and credentials
- Retrieve secrets safely
- Rotate credentials

### Integration Management

Connect with external services:
- Configure integrations
- Manage API connections
- Handle webhooks

## API Reference

### Task Management

```typescript
// Create a task
await agent.createTask({
  title: "Task title",
  description: "Task description",
  priority: "high"
});

// List tasks
const tasks = await agent.listTasks();

// Update task
await agent.updateTask(taskId, { status: "completed" });

// Delete task
await agent.deleteTask(taskId);
```

### Chat & Communication

```typescript
// Send message
await agent.sendMessage({
  content: "Message content",
  conversationId: "conv-id"
});

// Get conversation history
const history = await agent.getConversationHistory(conversationId);
```

### File Operations

```typescript
// Read file
const content = await agent.readFile(filePath);

// Write file
await agent.writeFile(filePath, content);

// List files
const files = await agent.listFiles(directoryPath);
```

## Advanced Usage

### Local Development with Tunnel

Use tunneling for local development:
- Expose local endpoints to OpenServ platform
- Test agents locally before deployment
- Debug agent behavior in real-time

### OpenAI Process Runtime

Configure OpenAI as the process runtime:
- Set up OpenAI API credentials
- Configure model selection
- Manage token limits and timeouts

### Error Handling

Comprehensive error handling:
- Try-catch blocks for API calls
- Graceful degradation
- Error logging and reporting

### Custom Agents

Build custom agent implementations:
- Extend base Agent class
- Implement custom capabilities
- Override default behaviors

## Control Levels

OpenServ offers three levels of control:

1. **Full Control**: Complete autonomy for agent decision-making
2. **Guided Control**: Agent operates with human oversight
3. **Manual Control**: Human makes all decisions, agent executes

## Framework Compatibility

- Works with major blockchain frameworks
- Compatible with existing OpenServ infrastructure
- Supports multiple deployment targets

## Examples

See the `agent-examples/` folder for real-world implementations:
- Perplexity Sonar Pro integration
- Web search agents
- Data processing agents
- Integration agents

## Migration from v1.x

Key changes in v2:
- Improved API structure
- Enhanced error handling
- Better TypeScript support
- New capability system
- Simplified configuration

## Resources

- **GitHub**: https://github.com/openserv-labs/sdk
- **Examples**: https://github.com/openserv-labs/agent-examples
- **Tutorial**: https://github.com/openserv-labs/agent-tutorial

---

For more information, visit the official OpenServ documentation.

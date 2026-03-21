# OpenServ API Concepts

## Platform Overview

OpenServ is a platform for building and deploying autonomous AI agents. The platform provides a unified interface for agents to interact with various services and capabilities.

## Core API Patterns

### Single Endpoint Architecture

Unlike traditional REST APIs with multiple endpoints, OpenServ agents use a single HTTP endpoint that handles all action types:

```
POST /agent
```

Request format:
```json
{
  "action": "task|chat|file|workspace|secrets|integration|mcp",
  "params": { /* action-specific parameters */ },
  "context": { /* execution context */ }
}
```

Response format:
```json
{
  "success": true|false,
  "result": { /* action result */ },
  "error": "error message if failed"
}
```

## Action Types

### 1. Task Management

Manage tasks and work items:

**Operations:**
- `create` - Create a new task
- `list` - List all tasks
- `get` - Get task details
- `update` - Update task
- `delete` - Delete task
- `complete` - Mark task as complete

**Parameters:**
```json
{
  "operation": "create",
  "title": "Task title",
  "description": "Task description",
  "priority": "low|medium|high|urgent",
  "dueDate": "2026-03-20T00:00:00Z",
  "assignee": "user-id",
  "tags": ["tag1", "tag2"]
}
```

### 2. Chat & Communication

Enable agent-to-human and agent-to-agent communication:

**Operations:**
- `send` - Send message
- `history` - Get conversation history
- `create` - Create new conversation
- `update` - Update conversation
- `delete` - Delete conversation

**Parameters:**
```json
{
  "operation": "send",
  "conversationId": "conv-123",
  "content": "Message content",
  "metadata": { /* optional */ }
}
```

### 3. File Operations

Work with files in agent workspace:

**Operations:**
- `read` - Read file content
- `write` - Write/create file
- `delete` - Delete file
- `list` - List directory contents
- `move` - Move/rename file
- `copy` - Copy file

**Parameters:**
```json
{
  "operation": "read",
  "path": "/workspace/file.txt"
}
```

### 4. Workspace Management

Manage agent workspace:

**Operations:**
- `info` - Get workspace info
- `create` - Create workspace
- `delete` - Delete workspace
- `configure` - Configure workspace settings

**Parameters:**
```json
{
  "operation": "info",
  "workspaceId": "ws-123"
}
```

### 5. Secrets Management

Securely store and retrieve secrets:

**Operations:**
- `set` - Store secret
- `get` - Retrieve secret
- `delete` - Delete secret
- `list` - List secret names

**Parameters:**
```json
{
  "operation": "set",
  "name": "api_key",
  "value": "secret-value",
  "ttl": 3600
}
```

### 6. Integration Management

Connect with external services:

**Operations:**
- `list` - List available integrations
- `connect` - Connect to service
- `disconnect` - Disconnect from service
- `test` - Test integration connection

**Parameters:**
```json
{
  "operation": "connect",
  "service": "slack|github|jira|etc",
  "credentials": { /* service-specific */ }
}
```

### 7. Model Context Protocol (MCP)

Interact with MCP-compatible tools:

**Operations:**
- `list_tools` - List available tools
- `call_tool` - Execute tool
- `list_resources` - List available resources
- `read_resource` - Read resource

**Parameters:**
```json
{
  "operation": "call_tool",
  "toolName": "tool-name",
  "arguments": { /* tool-specific */ }
}
```

## Authentication

### API Key Format

OpenServ API keys follow the format:
```
openserv_[random-string]
```

### Header-Based Authentication

Include API key in request headers:

```
Authorization: Bearer openserv_xxxxx
```

Or:

```
X-API-Key: openserv_xxxxx
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": { /* additional context */ }
}
```

### Common Error Codes

- `INVALID_ACTION` - Unknown action type
- `MISSING_PARAMS` - Required parameters missing
- `UNAUTHORIZED` - Authentication failed
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMITED` - Too many requests
- `INTERNAL_ERROR` - Server error

## Rate Limiting

### Rate Limit Headers

Responses include rate limit information:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1234567890
```

### Retry Strategy

Implement exponential backoff:

```typescript
async function callWithRetry(action, params, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await callAgent(action, params);
    } catch (error) {
      if (error.code === 'RATE_LIMITED') {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}
```

## Context Object

The context object provides execution context:

```json
{
  "agentId": "agent-123",
  "userId": "user-456",
  "workspaceId": "ws-789",
  "requestId": "req-abc123",
  "timestamp": "2026-03-20T12:00:00Z",
  "metadata": { /* custom metadata */ }
}
```

## Async Operations

For long-running operations, use async pattern:

```json
{
  "action": "task",
  "params": {
    "operation": "process_large_file",
    "async": true,
    "callbackUrl": "https://your-agent.com/callback"
  }
}
```

Response includes job ID:

```json
{
  "success": true,
  "jobId": "job-123",
  "statusUrl": "/jobs/job-123"
}
```

## Webhooks

OpenServ can send webhooks to your agent:

```
POST /webhook
Content-Type: application/json

{
  "event": "task.completed|chat.message|integration.connected",
  "data": { /* event data */ },
  "timestamp": "2026-03-20T12:00:00Z",
  "signature": "hmac-sha256-signature"
}
```

Verify webhook signature:

```typescript
function verifyWebhook(body, signature, secret) {
  const computed = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  return computed === signature;
}
```

## Pagination

For list operations, use pagination:

```json
{
  "action": "task",
  "params": {
    "operation": "list",
    "limit": 50,
    "offset": 0,
    "sort": "created_at",
    "order": "desc"
  }
}
```

Response includes pagination metadata:

```json
{
  "success": true,
  "result": [ /* items */ ],
  "pagination": {
    "total": 1000,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

## Filtering & Searching

List operations support filtering:

```json
{
  "action": "task",
  "params": {
    "operation": "list",
    "filter": {
      "status": "pending",
      "priority": "high",
      "assignee": "user-123",
      "createdAfter": "2026-03-01T00:00:00Z"
    }
  }
}
```

## Best Practices

1. **Always validate inputs** - Check parameters before processing
2. **Implement timeouts** - Set reasonable timeout values
3. **Use exponential backoff** - For rate-limited requests
4. **Log important events** - For debugging and monitoring
5. **Handle errors gracefully** - Provide meaningful error messages
6. **Secure credentials** - Never expose API keys or secrets
7. **Test thoroughly** - Test all action types before deployment
8. **Monitor performance** - Track response times and error rates

---

For more information, see the SDK and agent tutorial documentation.

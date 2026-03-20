# OpenServ Troubleshooting & FAQ

## Common Issues & Solutions

### Authentication Issues

**Problem: "Invalid API Key" Error**

**Causes:**
- API key is incorrect or expired
- API key has been revoked
- API key doesn't have required permissions
- API key format is invalid

**Solutions:**
1. Verify API key is correctly set in environment variables
2. Check API key hasn't been rotated or revoked
3. Regenerate API key if necessary
4. Ensure key format matches expected pattern
5. Check for extra whitespace in key

**Example:**
```bash
# Verify API key is set
echo $OPENSERV_API_KEY

# Regenerate key
openserv-cli keys regenerate
```

---

**Problem: "Unauthorized" Response**

**Causes:**
- Missing API key in request headers
- API key not included in correct header
- Request signature validation failed
- Session has expired

**Solutions:**
1. Include API key in `X-API-Key` or `Authorization: Bearer` header
2. Verify header format is correct
3. Check request signature if using signed requests
4. Refresh session/token

**Example:**
```typescript
const response = await fetch('https://api.openserv.io/agent', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.OPENSERV_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ action: 'task', params: {} })
});
```

---

### Agent Execution Issues

**Problem: Agent Timeout**

**Causes:**
- Task taking too long to execute
- External service is slow or unresponsive
- Network latency issues
- Agent is stuck in infinite loop

**Solutions:**
1. Increase timeout value in configuration
2. Optimize task logic for performance
3. Check external service health
4. Review agent logs for stuck operations
5. Implement timeout handling in agent code

**Example:**
```typescript
const agent = new Agent({
  apiKey: process.env.OPENSERV_API_KEY,
  timeout: 60000 // 60 seconds
});
```

---

**Problem: "Task Failed" Error**

**Causes:**
- Task parameters are invalid
- Required capability is not available
- External service returned error
- Agent encountered unexpected condition

**Solutions:**
1. Validate task parameters match schema
2. Check agent has required capabilities
3. Verify external service is accessible
4. Review detailed error message in logs
5. Check agent permissions for task

**Example:**
```typescript
try {
  const result = await agent.executeTask({
    operation: 'create',
    title: 'Task title',
    description: 'Task description'
  });
} catch (error) {
  console.error('Task failed:', error.message);
  console.error('Details:', error.details);
}
```

---

**Problem: Agent Not Responding**

**Causes:**
- Agent process crashed
- Network connectivity issue
- Agent is overloaded
- Endpoint URL is incorrect

**Solutions:**
1. Check agent process is running
2. Verify network connectivity
3. Check system resources (CPU, memory)
4. Verify endpoint URL is correct
5. Check firewall rules
6. Review agent logs

**Example:**
```bash
# Check if agent is running
ps aux | grep openserv

# Check network connectivity
curl -X GET https://api.openserv.io/health

# Check logs
tail -f logs/agent.log
```

---

### Data & State Issues

**Problem: "Data Not Found" Error**

**Causes:**
- Resource ID doesn't exist
- Resource has been deleted
- Wrong workspace or context
- Insufficient permissions to access resource

**Solutions:**
1. Verify resource ID is correct
2. Check resource hasn't been deleted
3. Verify you're in correct workspace
4. Check user permissions
5. List resources to find correct ID

**Example:**
```typescript
// List all tasks to find correct ID
const tasks = await agent.listTasks();
console.log(tasks);

// Then use correct ID
const task = await agent.getTask(correctTaskId);
```

---

**Problem: "State Corruption" or Inconsistent Data**

**Causes:**
- Concurrent modifications to same resource
- Incomplete transaction
- Database connection lost
- Race condition in agent code

**Solutions:**
1. Implement proper locking/transactions
2. Use optimistic concurrency control
3. Add retry logic with exponential backoff
4. Verify database connectivity
5. Review agent code for race conditions

**Example:**
```typescript
async function updateTaskWithRetry(taskId, updates, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await agent.updateTask(taskId, updates);
    } catch (error) {
      if (error.code === 'CONFLICT' && i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
        continue;
      }
      throw error;
    }
  }
}
```

---

### Performance Issues

**Problem: Slow Response Times**

**Causes:**
- High system load
- Database query performance
- Network latency
- Inefficient agent logic
- Too many concurrent requests

**Solutions:**
1. Monitor system resources
2. Optimize database queries
3. Implement caching
4. Profile agent code
5. Implement rate limiting
6. Scale horizontally

**Example:**
```typescript
// Add caching
const cache = new Map();

async function getTaskCached(taskId) {
  if (cache.has(taskId)) {
    return cache.get(taskId);
  }
  const task = await agent.getTask(taskId);
  cache.set(taskId, task);
  setTimeout(() => cache.delete(taskId), 60000); // 1 minute TTL
  return task;
}
```

---

**Problem: High Memory Usage**

**Causes:**
- Memory leak in agent code
- Unbounded cache growth
- Large data structures not being freed
- Unclosed connections/streams

**Solutions:**
1. Profile memory usage
2. Check for memory leaks
3. Implement cache eviction
4. Properly close resources
5. Use streaming for large data
6. Monitor heap usage

**Example:**
```typescript
// Proper resource cleanup
const stream = fs.createReadStream('large-file.json');
stream.on('data', chunk => {
  processChunk(chunk);
});
stream.on('end', () => {
  console.log('Stream closed');
});
stream.on('error', (error) => {
  console.error('Stream error:', error);
  stream.destroy();
});
```

---

### Integration Issues

**Problem: External Service Integration Failing**

**Causes:**
- Service endpoint is unreachable
- Authentication credentials are invalid
- API rate limits exceeded
- Service returned unexpected response format
- Network firewall blocking connection

**Solutions:**
1. Verify service endpoint URL
2. Check authentication credentials
3. Implement rate limiting and backoff
4. Add response validation
5. Check firewall rules
6. Test connectivity manually

**Example:**
```typescript
async function callExternalServiceWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
}
```

---

**Problem: MCP Tool Not Available**

**Causes:**
- MCP server is not running
- Tool name is incorrect
- Tool requires parameters that weren't provided
- MCP server doesn't have required tool

**Solutions:**
1. Verify MCP server is running
2. Check tool name matches exactly
3. Provide all required parameters
4. List available tools from MCP server
5. Check MCP server logs

**Example:**
```typescript
// List available MCP tools
const tools = await agent.listMCPTools();
console.log('Available tools:', tools);

// Call MCP tool with proper parameters
const result = await agent.callMCPTool({
  toolName: 'search',
  arguments: { query: 'search term' }
});
```

---

## Debugging Techniques

### Enable Debug Logging

```typescript
import { Agent } from '@openserv/sdk';

const agent = new Agent({
  apiKey: process.env.OPENSERV_API_KEY,
  debug: true,
  logLevel: 'debug'
});
```

### Use Request/Response Logging

```typescript
// Log all requests and responses
agent.on('request', (req) => {
  console.log('Request:', {
    method: req.method,
    url: req.url,
    headers: req.headers
  });
});

agent.on('response', (res) => {
  console.log('Response:', {
    status: res.status,
    headers: res.headers,
    body: res.body
  });
});
```

### Inspect Agent State

```typescript
// Export agent state for inspection
const state = await agent.exportState();
console.log('Agent state:', JSON.stringify(state, null, 2));

// Check specific properties
console.log('Tasks:', state.tasks);
console.log('Conversations:', state.conversations);
console.log('Workspace:', state.workspace);
```

---

## FAQ

**Q: How do I increase the timeout for long-running tasks?**

A: Set the `timeout` option when creating the agent:
```typescript
const agent = new Agent({
  apiKey: process.env.OPENSERV_API_KEY,
  timeout: 120000 // 2 minutes
});
```

---

**Q: Can I run multiple agents in parallel?**

A: Yes, create multiple agent instances:
```typescript
const agent1 = new Agent({ apiKey: key1 });
const agent2 = new Agent({ apiKey: key2 });

const [result1, result2] = await Promise.all([
  agent1.executeTask(task1),
  agent2.executeTask(task2)
]);
```

---

**Q: How do I handle rate limiting?**

A: Implement exponential backoff:
```typescript
async function callWithBackoff(fn, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.code === 'RATE_LIMITED' && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
}
```

---

**Q: How do I secure my API key?**

A: Use environment variables and secrets management:
```bash
# Never hardcode API keys
export OPENSERV_API_KEY=$(aws secretsmanager get-secret-value --secret-id openserv-key --query SecretString --output text)
```

---

**Q: What's the best way to monitor agent health?**

A: Implement health checks:
```typescript
app.get('/health', async (req, res) => {
  try {
    await agent.checkConnectivity();
    res.json({ status: 'healthy' });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});
```

---

For more help, visit the official OpenServ documentation or community forums.

# OpenServ Agent Examples

Real-world implementations of OpenServ agents demonstrating various capabilities and patterns.

**Repository**: https://github.com/openserv-labs/agent-examples

## Perplexity Sonar Pro Integration

An AI agent that leverages Perplexity's API to perform web search with source citations.

### Features

- Web search using Perplexity Sonar Pro
- Source citation and attribution
- Detailed insights with references
- Multi-turn conversation support

### Example Queries

- "What are the latest developments in AI?"
- "Tell me about renewable energy technologies"
- "Explain quantum computing basics"

### Implementation

```typescript
import { Agent } from '@openserv/sdk';

const agent = new Agent({
  apiKey: process.env.OPENSERV_API_KEY,
  name: 'Perplexity Search Agent',
  description: 'Search the web using Perplexity Sonar Pro'
});

app.post('/agent', async (req, res) => {
  const { action, params } = req.body;
  
  if (action === 'search') {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [{ role: 'user', content: params.query }]
      })
    });
    
    const result = await response.json();
    res.json({ success: true, result });
  }
});
```

## Web Search Agent

A general-purpose web search agent with advanced filtering and ranking.

### Features

- Multi-source search
- Result ranking and filtering
- Relevance scoring
- Cache management

### Usage

```typescript
const searchResult = await agent.callAction({
  action: 'search',
  params: {
    query: 'machine learning frameworks',
    limit: 10,
    filter: { language: 'en', date: 'last_month' }
  }
});
```

## Data Processing Agent

Process and transform data from various sources.

### Features

- CSV/JSON parsing
- Data validation
- Transformation pipelines
- Error handling

### Example

```typescript
const result = await agent.callAction({
  action: 'process_data',
  params: {
    source: 'csv',
    filePath: '/data/input.csv',
    transformations: [
      { type: 'filter', field: 'status', value: 'active' },
      { type: 'map', field: 'price', operation: 'multiply', value: 1.1 },
      { type: 'sort', field: 'date', order: 'desc' }
    ],
    output: '/data/output.json'
  }
});
```

## Integration Agent

Connect and manage integrations with external services.

### Features

- Multi-service support
- Credential management
- Webhook handling
- Error recovery

### Supported Services

- Slack
- GitHub
- Jira
- Asana
- Linear
- Notion
- Google Workspace
- Microsoft 365

### Example

```typescript
// Connect to Slack
await agent.callAction({
  action: 'integration',
  params: {
    operation: 'connect',
    service: 'slack',
    credentials: {
      botToken: process.env.SLACK_BOT_TOKEN,
      appToken: process.env.SLACK_APP_TOKEN
    }
  }
});

// Send message via Slack
await agent.callAction({
  action: 'integration',
  params: {
    operation: 'execute',
    service: 'slack',
    method: 'postMessage',
    args: {
      channel: '#general',
      text: 'Hello from OpenServ agent!'
    }
  }
});
```

## Task Automation Agent

Automate task creation and management workflows.

### Features

- Bulk task creation
- Workflow automation
- Status tracking
- Notification management

### Example

```typescript
// Create tasks from template
await agent.callAction({
  action: 'task',
  params: {
    operation: 'bulk_create',
    template: {
      title: 'Sprint Task: {feature}',
      description: 'Implement {feature} for {project}',
      priority: 'high',
      dueDate: '+7d'
    },
    items: [
      { feature: 'Authentication', project: 'API' },
      { feature: 'Database', project: 'API' },
      { feature: 'Caching', project: 'API' }
    ]
  }
});
```

## Chat Agent

Multi-turn conversation with context management.

### Features

- Conversation history
- Context awareness
- Multi-user support
- Message threading

### Example

```typescript
// Create conversation
const conv = await agent.callAction({
  action: 'chat',
  params: {
    operation: 'create',
    title: 'Project Discussion'
  }
});

// Send messages
await agent.callAction({
  action: 'chat',
  params: {
    operation: 'send',
    conversationId: conv.id,
    content: 'What are the requirements?'
  }
});

// Get history
const history = await agent.callAction({
  action: 'chat',
  params: {
    operation: 'history',
    conversationId: conv.id,
    limit: 50
  }
});
```

## File Processing Agent

Handle file operations and transformations.

### Features

- Multi-format support
- Batch processing
- Compression/decompression
- Format conversion

### Example

```typescript
// Read file
const content = await agent.callAction({
  action: 'file',
  params: {
    operation: 'read',
    path: '/workspace/data.json'
  }
});

// Write file
await agent.callAction({
  action: 'file',
  params: {
    operation: 'write',
    path: '/workspace/output.json',
    content: JSON.stringify(processedData, null, 2)
  }
});

// List directory
const files = await agent.callAction({
  action: 'file',
  params: {
    operation: 'list',
    path: '/workspace',
    filter: '*.json'
  }
});
```

## Monitoring & Alerting Agent

Monitor systems and send alerts.

### Features

- Health checks
- Metric monitoring
- Alert routing
- Escalation policies

### Example

```typescript
// Check system health
const health = await agent.callAction({
  action: 'monitor',
  params: {
    operation: 'health_check',
    targets: ['api', 'database', 'cache']
  }
});

// Send alert
if (health.status === 'critical') {
  await agent.callAction({
    action: 'integration',
    params: {
      operation: 'execute',
      service: 'slack',
      method: 'postMessage',
      args: {
        channel: '#alerts',
        text: `🚨 CRITICAL: ${health.message}`
      }
    }
  });
}
```

## Report Generation Agent

Generate reports from data and templates.

### Features

- Template-based generation
- Data aggregation
- Format options (PDF, HTML, JSON)
- Scheduled generation

### Example

```typescript
// Generate report
const report = await agent.callAction({
  action: 'report',
  params: {
    operation: 'generate',
    template: 'monthly_summary',
    data: {
      month: 'March',
      year: 2026,
      metrics: { ... }
    },
    format: 'pdf',
    output: '/reports/march_2026.pdf'
  }
});
```

## Common Patterns

### Error Handling

```typescript
try {
  const result = await agent.callAction(action);
  return { success: true, result };
} catch (error) {
  console.error('Agent error:', error);
  return { 
    success: false, 
    error: error.message,
    code: error.code,
    retryable: error.retryable
  };
}
```

### Retry Logic

```typescript
async function callWithRetry(action, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await agent.callAction(action);
    } catch (error) {
      if (!error.retryable || i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
}
```

### Logging

```typescript
function logAction(action, result, duration) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    action: action.action,
    success: result.success,
    duration: `${duration}ms`,
    error: result.error
  }));
}
```

## Best Practices

1. **Always validate inputs** before processing
2. **Implement comprehensive error handling**
3. **Use logging for debugging** and monitoring
4. **Test edge cases** thoroughly
5. **Handle rate limiting** gracefully
6. **Secure sensitive data** (API keys, credentials)
7. **Document your agent** clearly
8. **Monitor performance** metrics
9. **Implement timeouts** for long operations
10. **Use async patterns** for non-blocking operations

## Resources

- **Examples Repository**: https://github.com/openserv-labs/agent-examples
- **SDK Documentation**: https://github.com/openserv-labs/sdk
- **Agent Tutorial**: https://github.com/openserv-labs/agent-tutorial

---

For more examples and patterns, visit the official OpenServ documentation.

# OpenServ Deployment & Operations Guide

## Deployment Overview

OpenServ agents can be deployed across multiple platforms and environments. This guide covers deployment strategies, configuration, monitoring, and best practices.

## Deployment Platforms

### Local Development

**Setup:**
```bash
npm install @openserv/sdk
export OPENSERV_API_KEY=your_key_here
npm start
```

**Features:**
- Built-in tunnel for exposing local endpoints
- Hot reload for rapid development
- Local debugging and logging
- Development-specific error messages

**Use Cases:**
- Initial agent development
- Testing and validation
- Integration testing
- Debugging and troubleshooting

### Docker Containerization

**Dockerfile Example:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

**Build & Run:**
```bash
docker build -t openserv-agent:latest .
docker run -e OPENSERV_API_KEY=your_key -p 3000:3000 openserv-agent:latest
```

**Benefits:**
- Consistent environments
- Easy scaling
- Simplified deployment
- Reproducible builds

### Kubernetes Deployment

**Basic Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: openserv-agent
spec:
  replicas: 3
  selector:
    matchLabels:
      app: openserv-agent
  template:
    metadata:
      labels:
        app: openserv-agent
    spec:
      containers:
      - name: agent
        image: openserv-agent:latest
        ports:
        - containerPort: 3000
        env:
        - name: OPENSERV_API_KEY
          valueFrom:
            secretKeyRef:
              name: openserv-secrets
              key: api-key
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

**Features:**
- Automatic scaling
- Load balancing
- Self-healing
- Rolling updates

### Serverless Deployment

**AWS Lambda:**
```typescript
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Agent } from '@openserv/sdk';

const agent = new Agent({
  apiKey: process.env.OPENSERV_API_KEY,
  name: 'Lambda Agent'
});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const result = await agent.handleRequest(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

**Benefits:**
- No server management
- Auto-scaling
- Pay-per-use pricing
- Reduced operational overhead

## Configuration Management

### Environment Variables

**Required:**
```bash
OPENSERV_API_KEY=your_api_key_here
```

**Optional:**
```bash
LOG_LEVEL=info
AGENT_TIMEOUT=30000
MAX_RETRIES=3
CACHE_TTL=3600
```

### Configuration Files

**config.json:**
```json
{
  "agent": {
    "name": "My Agent",
    "description": "Agent description",
    "timeout": 30000,
    "maxRetries": 3
  },
  "capabilities": {
    "tasks": true,
    "chat": true,
    "files": true,
    "integrations": true
  },
  "logging": {
    "level": "info",
    "format": "json"
  },
  "monitoring": {
    "enabled": true,
    "metricsPort": 9090
  }
}
```

## Monitoring & Observability

### Metrics Collection

**Key Metrics:**
- Request count and latency
- Error rates and types
- Task execution time
- Agent resource usage
- API call counts

**Prometheus Integration:**
```typescript
import { register, Counter, Histogram } from 'prom-client';

const requestCounter = new Counter({
  name: 'openserv_requests_total',
  help: 'Total requests',
  labelNames: ['method', 'status']
});

const requestDuration = new Histogram({
  name: 'openserv_request_duration_seconds',
  help: 'Request duration',
  labelNames: ['method']
});
```

### Logging

**Structured Logging:**
```typescript
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('Agent started', { agentId: 'agent-123' });
logger.error('Task failed', { taskId: 'task-456', error: err.message });
```

### Health Checks

**Liveness Probe:**
```typescript
app.get('/health/live', (req, res) => {
  res.json({ status: 'alive' });
});
```

**Readiness Probe:**
```typescript
app.get('/health/ready', async (req, res) => {
  try {
    await agent.checkConnectivity();
    res.json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});
```

## Performance Optimization

### Caching Strategies

**Response Caching:**
```typescript
const cache = new Map();
const CACHE_TTL = 3600000; // 1 hour

function getCachedResult(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.value;
  }
  cache.delete(key);
  return null;
}
```

**Connection Pooling:**
```typescript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});
```

### Load Balancing

**Round-Robin:**
```typescript
let currentIndex = 0;
const agents = [agent1, agent2, agent3];

function getNextAgent() {
  const agent = agents[currentIndex];
  currentIndex = (currentIndex + 1) % agents.length;
  return agent;
}
```

## Scaling Strategies

### Horizontal Scaling

- Deploy multiple agent instances
- Use load balancer (nginx, HAProxy)
- Distribute traffic evenly
- Shared state management (Redis)

### Vertical Scaling

- Increase instance resources
- Optimize code and algorithms
- Reduce memory footprint
- Improve database queries

## Disaster Recovery

### Backup Strategy

```typescript
async function backupAgentState() {
  const state = await agent.exportState();
  await storage.save(`backup-${Date.now()}.json`, state);
}

async function restoreAgentState(backupId) {
  const state = await storage.load(backupId);
  await agent.importState(state);
}
```

### Failover Configuration

```typescript
const primaryAgent = new Agent({ apiKey: process.env.PRIMARY_KEY });
const backupAgent = new Agent({ apiKey: process.env.BACKUP_KEY });

async function executeWithFailover(task) {
  try {
    return await primaryAgent.execute(task);
  } catch (error) {
    console.warn('Primary agent failed, using backup');
    return await backupAgent.execute(task);
  }
}
```

## Security in Deployment

### Secrets Management

**Using Environment Variables:**
```bash
export OPENSERV_API_KEY=$(aws secretsmanager get-secret-value --secret-id openserv-key --query SecretString --output text)
```

**Using Vault:**
```typescript
const vault = require('node-vault')({
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN
});

const secret = await vault.read('secret/openserv/api-key');
const apiKey = secret.data.data.key;
```

### Network Security

- Use HTTPS/TLS for all communications
- Implement rate limiting
- Use API key rotation
- Enable CORS only for trusted origins
- Implement request signing

### Access Control

```typescript
const authorizeRequest = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!validateApiKey(apiKey)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.use(authorizeRequest);
```

## Troubleshooting

### Common Issues

**Agent Not Responding**
- Check API key validity
- Verify network connectivity
- Review logs for errors
- Check resource limits

**High Latency**
- Monitor CPU and memory usage
- Check database query performance
- Review network latency
- Consider horizontal scaling

**Memory Leaks**
- Use memory profiling tools
- Check for unclosed connections
- Review event listener cleanup
- Monitor heap usage over time

## Best Practices

1. **Use containerization** for consistency
2. **Implement health checks** for reliability
3. **Monitor metrics** continuously
4. **Automate deployments** with CI/CD
5. **Use secrets management** for credentials
6. **Implement logging** for debugging
7. **Plan for scaling** from the start
8. **Test disaster recovery** regularly
9. **Document configuration** clearly
10. **Keep dependencies updated** for security

---

For more information, visit the official OpenServ documentation.

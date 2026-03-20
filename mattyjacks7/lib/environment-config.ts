// Environment-specific configuration

export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  // API Configuration
  api: {
    chatRateLimit: {
      windowMs: parseInt(process.env.CHAT_RATE_LIMIT_WINDOW || '60000'),
      maxRequests: parseInt(process.env.CHAT_RATE_LIMIT_MAX || '20'),
    },
    viewsRateLimit: {
      windowMs: parseInt(process.env.VIEWS_RATE_LIMIT_WINDOW || '60000'),
      maxRequests: parseInt(process.env.VIEWS_RATE_LIMIT_MAX || '100'),
    },
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT || '30000'),
    maxBodySize: parseInt(process.env.MAX_BODY_SIZE || '5242880'), // 5MB
  },

  // Cache Configuration
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '3600'),
    maxSize: parseInt(process.env.CACHE_MAX_SIZE || '10000'),
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    verbose: process.env.VERBOSE_LOGGING === 'true',
  },

  // Feature Flags
  features: {
    enableMetrics: process.env.ENABLE_METRICS !== 'false',
    enableCompression: process.env.ENABLE_COMPRESSION !== 'false',
    enableCaching: process.env.ENABLE_CACHING !== 'false',
    enableGracefulDegradation: process.env.ENABLE_GRACEFUL_DEGRADATION !== 'false',
  },
};

export function getConfig(path: string): any {
  const keys = path.split('.');
  let value: any = ENV_CONFIG;
  for (const key of keys) {
    value = value?.[key];
  }
  return value;
}

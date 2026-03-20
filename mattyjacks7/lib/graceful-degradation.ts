// Graceful degradation and fallback strategies

export interface FallbackConfig {
  maxRetries: number;
  retryDelayMs: number;
  timeoutMs: number;
}

const DEFAULT_CONFIG: FallbackConfig = {
  maxRetries: 3,
  retryDelayMs: 100,
  timeoutMs: 5000,
};

export async function withFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T> | T,
  config: Partial<FallbackConfig> = {}
): Promise<T> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  for (let attempt = 0; attempt < finalConfig.maxRetries; attempt++) {
    try {
      return await Promise.race([
        primary(),
        new Promise<T>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), finalConfig.timeoutMs)
        ),
      ]);
    } catch (error) {
      if (attempt === finalConfig.maxRetries - 1) {
        // Last attempt failed, use fallback
        try {
          return await Promise.resolve(fallback());
        } catch (fallbackError) {
          throw new Error(`Primary and fallback both failed: ${error}`);
        }
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, finalConfig.retryDelayMs * (attempt + 1)));
    }
  }

  throw new Error("Unexpected state in withFallback");
}

// Circuit breaker pattern
export class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private readonly failureThreshold: number;
  private readonly resetTimeoutMs: number;

  constructor(failureThreshold: number = 5, resetTimeoutMs: number = 60000) {
    this.failureThreshold = failureThreshold;
    this.resetTimeoutMs = resetTimeoutMs;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.resetTimeoutMs) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await fn();
      if (this.state === 'half-open') {
        this.state = 'closed';
        this.failureCount = 0;
      }
      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();

      if (this.failureCount >= this.failureThreshold) {
        this.state = 'open';
      }

      throw error;
    }
  }

  getState(): string {
    return this.state;
  }

  reset(): void {
    this.state = 'closed';
    this.failureCount = 0;
  }
}

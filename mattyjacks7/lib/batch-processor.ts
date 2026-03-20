// Batch processing for bulk operations

export interface BatchConfig {
  batchSize: number;
  delayMs: number;
  timeout: number;
}

export class BatchProcessor<T, R> {
  private queue: T[] = [];
  private processing = false;
  private readonly config: BatchConfig;
  private readonly processor: (items: T[]) => Promise<R[]>;

  constructor(processor: (items: T[]) => Promise<R[]>, config: Partial<BatchConfig> = {}) {
    this.processor = processor;
    this.config = {
      batchSize: config.batchSize || 10,
      delayMs: config.delayMs || 100,
      timeout: config.timeout || 30000,
    };
  }

  add(item: T): void {
    this.queue.push(item);
    if (this.queue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  async flush(): Promise<R[]> {
    if (this.processing || this.queue.length === 0) {
      return [];
    }

    this.processing = true;
    const batch = this.queue.splice(0, this.config.batchSize);

    try {
      return await Promise.race([
        this.processor(batch),
        new Promise<R[]>((_, reject) =>
          setTimeout(() => reject(new Error('Batch processing timeout')), this.config.timeout)
        ),
      ]);
    } finally {
      this.processing = false;
      if (this.queue.length > 0) {
        setTimeout(() => this.flush(), this.config.delayMs);
      }
    }
  }

  getQueueSize(): number {
    return this.queue.length;
  }
}

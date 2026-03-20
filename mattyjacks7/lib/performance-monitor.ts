// Performance monitoring and metrics collection

interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

class PerformanceMonitor {
  private metrics: MetricData[] = [];
  private maxMetrics = 10000;

  recordMetric(name: string, value: number, tags?: Record<string, string>): void {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      tags,
    });

    // Cleanup old metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  recordDuration(name: string, startTime: number, tags?: Record<string, string>): void {
    const duration = Date.now() - startTime;
    this.recordMetric(name, duration, tags);
  }

  getMetrics(name?: string): MetricData[] {
    if (!name) return this.metrics;
    return this.metrics.filter(m => m.name === name);
  }

  getAverageMetric(name: string): number {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  getMetricStats(name: string): { avg: number; min: number; max: number; count: number } {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return { avg: 0, min: 0, max: 0, count: 0 };

    const values = metrics.map(m => m.value);
    return {
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    };
  }

  clear(): void {
    this.metrics = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Request timing middleware
export function createTimingMiddleware() {
  return (name: string, startTime: number) => {
    performanceMonitor.recordDuration(name, startTime);
  };
}

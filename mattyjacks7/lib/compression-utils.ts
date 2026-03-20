// Image and response compression utilities

export const COMPRESSION_CONFIG = {
  jpeg: {
    quality: 0.80,
    maxWidth: 1920,
    maxHeight: 1920,
  },
  webp: {
    quality: 0.75,
    maxWidth: 1920,
    maxHeight: 1920,
  },
  png: {
    maxWidth: 1920,
    maxHeight: 1920,
  },
};

// Response payload optimization
export function optimizePayload<T>(data: T): T {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => optimizePayload(item)) as T;
  }

  const optimized: any = {};
  for (const [key, value] of Object.entries(data)) {
    // Skip null/undefined values
    if (value === null || value === undefined) {
      continue;
    }
    // Skip empty arrays/objects
    if (Array.isArray(value) && value.length === 0) {
      continue;
    }
    if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
      continue;
    }
    optimized[key] = optimizePayload(value);
  }

  return optimized;
}

// Gzip compression detection
export function shouldCompress(contentType: string): boolean {
  const compressibleTypes = [
    'application/json',
    'text/plain',
    'text/html',
    'text/css',
    'application/javascript',
    'application/xml',
  ];
  return compressibleTypes.some(type => contentType.includes(type));
}

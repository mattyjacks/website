// Image Upload Handler - Supports file selection, drag-drop, and paste
// Converts images to base64 for AI processing

export interface UploadedImage {
  id: string;
  base64: string;
  mimeType: string;
  fileName: string;
  size: number;
  width?: number;
  height?: number;
}

const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function generateImageId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function processImageFile(file: File): Promise<UploadedImage | null> {
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    console.error(`Invalid image type: ${file.type}`);
    return null;
  }

  // Validate file size
  if (file.size > MAX_IMAGE_SIZE) {
    console.error(`Image too large: ${file.size} bytes (max ${MAX_IMAGE_SIZE})`);
    return null;
  }

  try {
    const base64 = await fileToBase64(file);
    const { width, height } = await getImageDimensions(base64);

    return {
      id: generateImageId(),
      base64,
      mimeType: file.type,
      fileName: file.name,
      size: file.size,
      width,
      height
    };
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
}

export async function processImageFiles(files: FileList | File[]): Promise<UploadedImage[]> {
  const results: UploadedImage[] = [];

  for (const file of files) {
    if (file.type.startsWith('image/')) {
      const processed = await processImageFile(file);
      if (processed) {
        results.push(processed);
      }
    }
  }

  return results;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(base64: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
    };
    img.src = base64;
  });
}

export function getImagePreviewUrl(image: UploadedImage): string {
  return image.base64;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export async function handlePasteEvent(event: ClipboardEvent): Promise<UploadedImage[]> {
  const items = event.clipboardData?.items;
  if (!items) return [];

  const results: UploadedImage[] = [];

  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) {
        const processed = await processImageFile(file);
        if (processed) {
          results.push(processed);
        }
      }
    }
  }

  return results;
}

export async function handleDropEvent(event: DragEvent): Promise<UploadedImage[]> {
  const files = event.dataTransfer?.files;
  if (!files) return [];

  return processImageFiles(files);
}

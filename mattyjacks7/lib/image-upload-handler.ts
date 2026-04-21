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
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB for documents
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'text/markdown', 'text/plain', 'text/csv', 'application/json'];
const ALLOWED_EXTENSIONS = ['.pdf', '.md', '.txt', '.csv', '.json', '.markdown'];
const MAX_DIMENSION = 1920; // Max width/height for compression
const JPEG_QUALITY = 0.82; // Optimized quality for JPEG compression
const MAX_COMPRESSED_SIZE = 500 * 1024; // 500KB max after compression

export function generateImageId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        
        // Scale down if too large
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const scale = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          JPEG_QUALITY
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function isImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
}

function isDocumentFile(file: File): boolean {
  const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  return ALLOWED_DOCUMENT_TYPES.includes(file.type) || ALLOWED_EXTENSIONS.includes(fileExtension);
}

export async function processImageFile(file: File): Promise<UploadedImage | null> {
  const isImage = isImageFile(file);
  const isDocument = isDocumentFile(file);

  // Validate file type
  if (!isImage && !isDocument) {
    console.error(`Invalid file type: ${file.type}`);
    return null;
  }

  // Validate file size
  const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_FILE_SIZE;
  if (file.size > maxSize) {
    console.error(`File too large: ${file.size} bytes (max ${maxSize})`);
    return null;
  }

  try {
    let base64: string;
    let width: number | undefined;
    let height: number | undefined;

    if (isImage) {
      // Compress image to reduce payload size
      const compressedFile = await compressImage(file);
      base64 = await fileToBase64(compressedFile);
      const dimensions = await getImageDimensions(base64);
      width = dimensions.width;
      height = dimensions.height;

      return {
        id: generateImageId(),
        base64,
        mimeType: 'image/jpeg',
        fileName: file.name,
        size: compressedFile.size,
        width,
        height
      };
    } else {
      // Handle documents (PDF, MD, TXT, etc.)
      base64 = await fileToBase64(file);

      return {
        id: generateImageId(),
        base64,
        mimeType: file.type || 'text/plain',
        fileName: file.name,
        size: file.size
      };
    }
  } catch (error) {
    console.error('Error processing file:', error);
    return null;
  }
}

export async function processImageFiles(files: FileList | File[]): Promise<UploadedImage[]> {
  const results: UploadedImage[] = [];

  for (const file of files) {
    const isImage = isImageFile(file);
    const isDocument = isDocumentFile(file);
    
    if (isImage || isDocument) {
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

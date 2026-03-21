"use client";

import { X, Download, Copy } from "lucide-react";
import Image from "next/image";
import { UploadedImage, formatFileSize } from "@/lib/image-upload-handler";
import { useState } from "react";

interface ImagePreviewProps {
  image: UploadedImage;
  onRemove?: (id: string) => void;
  compact?: boolean;
}

export function ImagePreview({ image, onRemove, compact = false }: ImagePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const response = await fetch(image.base64);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy image:", err);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.base64;
    link.download = image.fileName;
    link.click();
  };

  if (compact) {
    return (
      <div className="relative inline-block group">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <img
            src={image.base64}
            alt={image.fileName}
            className="w-full h-full object-cover"
          />
        </div>
        {onRemove && (
          <button
            onClick={() => onRemove(image.id)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            aria-label="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
            {image.fileName}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {formatFileSize(image.size)}
            {image.width && image.height && ` • ${image.width}×${image.height}px`}
          </p>
        </div>
        {onRemove && (
          <button
            onClick={() => onRemove(image.id)}
            className="p-1 text-zinc-400 hover:text-red-500 transition-colors flex-shrink-0"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="relative w-full h-40 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={image.base64}
          alt={image.fileName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
          title="Copy image to clipboard"
        >
          <Copy className="w-3.5 h-3.5" />
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          title="Download image"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      </div>
    </div>
  );
}

interface ImageGalleryProps {
  images: UploadedImage[];
  onRemove?: (id: string) => void;
  compact?: boolean;
}

export function ImageGallery({ images, onRemove, compact = false }: ImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className={compact ? "flex flex-wrap gap-2" : "space-y-2"}>
      {images.map((image) => (
        <ImagePreview
          key={image.id}
          image={image}
          onRemove={onRemove}
          compact={compact}
        />
      ))}
    </div>
  );
}

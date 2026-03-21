import { ConversationRenameData } from "@/lib/conversation-renamer";
import { UploadedImage } from "@/lib/image-upload-handler";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  error?: boolean;
  images?: UploadedImage[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
  renameData?: ConversationRenameData;
}

export interface CloudSessionMeta {
  id: string;
  title: string;
  updatedAt: number;
  messageCount?: number;
}

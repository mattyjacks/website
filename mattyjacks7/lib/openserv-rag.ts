// OpenServ RAG - Selective document scanning for quick-context mini-AI
// Scans .md and .txt files in /context/openserv/ to find relevant snippets

import fs from 'fs';
import path from 'path';

interface RagDocument {
  filename: string;
  content: string;
  path: string;
}

interface RagMatch {
  filename: string;
  snippet: string;
  relevanceScore: number;
}

const CONTEXT_DIR = path.join(process.cwd(), 'context', 'openserv');
const MAX_SNIPPET_LENGTH = 500;
const MAX_RESULTS = 3;

// Keywords for different OpenServ topics
const KEYWORD_GROUPS: Record<string, string[]> = {
  sdk: ['sdk', 'typescript', 'framework', 'installation', 'setup', 'api reference'],
  agents: ['agent', 'autonomous', 'development', 'tutorial', 'endpoint', 'action'],
  tasks: ['task', 'management', 'create', 'update', 'delete', 'status'],
  chat: ['chat', 'communication', 'conversation', 'message', 'interact'],
  files: ['file', 'operation', 'read', 'write', 'workspace'],
  integration: ['integration', 'service', 'connect', 'slack', 'github', 'webhook'],
  mcp: ['mcp', 'model context protocol', 'tools', 'resources'],
  examples: ['example', 'implementation', 'pattern', 'code', 'sample'],
  concepts: ['concept', 'architecture', 'pattern', 'design', 'framework'],
  pricing: ['pricing', 'cost', 'model', 'token', 'rate'],
};

function loadDocuments(): RagDocument[] {
  const documents: RagDocument[] = [];
  
  try {
    if (!fs.existsSync(CONTEXT_DIR)) {
      return documents;
    }

    const files = fs.readdirSync(CONTEXT_DIR);
    
    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.txt')) continue;
      
      const filePath = path.join(CONTEXT_DIR, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        documents.push({
          filename: file,
          content,
          path: filePath
        });
      } catch (err) {
        console.error(`Failed to read ${file}:`, err);
      }
    }
  } catch (err) {
    console.error('Failed to load RAG documents:', err);
  }
  
  return documents;
}

function calculateRelevance(text: string, query: string): number {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  let score = 0;
  
  // Exact phrase match (highest priority)
  if (textLower.includes(queryLower)) {
    score += 10;
  }
  
  // Word-by-word matching
  const queryWords = queryLower.split(/\s+/);
  for (const word of queryWords) {
    if (word.length > 2 && textLower.includes(word)) {
      score += 2;
    }
  }
  
  // Check keyword groups
  for (const [group, keywords] of Object.entries(KEYWORD_GROUPS)) {
    for (const keyword of keywords) {
      if (queryLower.includes(keyword) && textLower.includes(keyword)) {
        score += 3;
      }
    }
  }
  
  return score;
}

function extractSnippet(content: string, query: string, maxLength: number): string {
  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Find the first occurrence of query or related keywords
  let startIdx = contentLower.indexOf(queryLower);
  
  if (startIdx === -1) {
    // Try to find any keyword match
    for (const word of queryLower.split(/\s+/)) {
      if (word.length > 2) {
        startIdx = contentLower.indexOf(word);
        if (startIdx !== -1) break;
      }
    }
  }
  
  if (startIdx === -1) {
    // No match found, return first paragraph
    const paragraphs = content.split('\n\n');
    return paragraphs[0].slice(0, maxLength);
  }
  
  // Extract context around the match
  const contextStart = Math.max(0, startIdx - 100);
  const contextEnd = Math.min(content.length, startIdx + maxLength);
  
  let snippet = content.slice(contextStart, contextEnd);
  
  // Clean up snippet
  if (contextStart > 0) snippet = '...' + snippet;
  if (contextEnd < content.length) snippet = snippet + '...';
  
  return snippet.trim();
}

export function selectRelevantContext(query: string): string {
  const documents = loadDocuments();
  
  if (documents.length === 0) {
    return '';
  }
  
  const matches: RagMatch[] = [];
  
  // Score all documents
  for (const doc of documents) {
    const relevance = calculateRelevance(doc.content, query);
    
    if (relevance > 0) {
      const snippet = extractSnippet(doc.content, query, MAX_SNIPPET_LENGTH);
      matches.push({
        filename: doc.filename,
        snippet,
        relevanceScore: relevance
      });
    }
  }
  
  // Sort by relevance and take top results
  matches.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topMatches = matches.slice(0, MAX_RESULTS);
  
  // Format context
  if (topMatches.length === 0) {
    return '';
  }
  
  let context = 'Relevant OpenServ Documentation:\n\n';
  for (const match of topMatches) {
    context += `**From ${match.filename}:**\n${match.snippet}\n\n`;
  }
  
  return context;
}

export function isOpenservQuery(query: string): boolean {
  const openservKeywords = [
    'openserv',
    'agent',
    'task',
    'mcp',
    'api',
    'sdk',
    'integration',
    'autonomous'
  ];
  
  const queryLower = query.toLowerCase();
  return openservKeywords.some(keyword => queryLower.includes(keyword));
}

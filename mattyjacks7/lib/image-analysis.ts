// Image Analysis - Extract text and generate deep descriptions
// Creates invisible context summaries for images to preserve information

export interface ImageAnalysis {
  fileName: string;
  description: string;
  transcribedText: string;
  visualElements: string[];
  contextSummary: string;
}

export async function analyzeImage(base64Image: string, fileName: string): Promise<ImageAnalysis | null> {
  try {
    // Call Claude API to analyze the image
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: base64Image.replace(/^data:image\/[^;]+;base64,/, '')
                }
              },
              {
                type: 'text',
                text: `Analyze this image and provide:
1. A deep, detailed description of what you see (colors, composition, mood, objects, people, text, etc.)
2. Any text visible in the image (transcribe exactly)
3. Key visual elements (list 3-5 main elements)
4. A brief context summary (what is this image about, what is its purpose)

Format your response as JSON with keys: description, transcribedText, visualElements (array), contextSummary`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('Image analysis failed:', response.statusText);
      return null;
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;
    
    if (!content) {
      return null;
    }

    try {
      const parsed = JSON.parse(content);
      return {
        fileName,
        description: parsed.description || '',
        transcribedText: parsed.transcribedText || '',
        visualElements: Array.isArray(parsed.visualElements) ? parsed.visualElements : [],
        contextSummary: parsed.contextSummary || ''
      };
    } catch {
      return null;
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    return null;
  }
}

export function createImageContextMessage(analyses: ImageAnalysis[]): string {
  if (analyses.length === 0) return '';

  const sections = analyses.map(analysis => {
    const parts = [];
    
    if (analysis.description) {
      parts.push(`**Description:** ${analysis.description}`);
    }
    
    if (analysis.transcribedText) {
      parts.push(`**Text in image:** ${analysis.transcribedText}`);
    }
    
    if (analysis.visualElements.length > 0) {
      parts.push(`**Key elements:** ${analysis.visualElements.join(', ')}`);
    }
    
    if (analysis.contextSummary) {
      parts.push(`**Context:** ${analysis.contextSummary}`);
    }
    
    return `[Image: ${analysis.fileName}]\n${parts.join('\n')}`;
  });

  return `\n\n---\n**[Image Context - Invisible to user]**\n${sections.join('\n\n')}\n---\n`;
}

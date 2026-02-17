// Truncate text to a specific number of words
export function truncateWords(text: string, wordLimit: number = 30): string {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
}

// Calculate read time based on word count (average 200 words per minute)
export function calculateReadTime(wordCount: number): string {
  if (!wordCount || wordCount <= 0) return '1 min read';
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
}

// Extract plain text from Lexical editor state and count words
export function countWordsFromLexical(content: Record<string, unknown> | null | undefined): number {
  if (!content) return 0
  const text = extractTextFromNode(content)
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

function extractTextFromNode(node: Record<string, unknown>): string {
  if (node.type === 'text' && typeof node.text === 'string') {
    return node.text
  }

  const root = node.root as Record<string, unknown> | undefined
  const children = node.children || root?.children
  if (Array.isArray(children)) {
    return children.map((child: Record<string, unknown>) => extractTextFromNode(child)).join(' ')
  }

  return ''
}

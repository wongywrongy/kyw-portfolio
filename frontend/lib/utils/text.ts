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

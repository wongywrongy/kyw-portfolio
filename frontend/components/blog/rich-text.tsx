import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface RichTextProps {
  content: SerializedEditorState | null | undefined
}

export function RichText({ content }: RichTextProps) {
  if (!content) return null

  return (
    <div className="prose-portfolio">
      <PayloadRichText data={content} />
    </div>
  )
}

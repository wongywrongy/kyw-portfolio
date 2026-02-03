'use client';

import Image from 'next/image';
import { PortableText as PortableTextReact, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { urlFor } from '@/lib/sanity';
import type { SanityImageAsset } from '@/lib/sanity/types';

interface CodeBlockProps {
  value: {
    language?: string;
    filename?: string;
    code?: string;
  };
}

function CodeBlock({ value }: CodeBlockProps) {
  const { language, filename, code } = value;

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border">
      {(filename || language) && (
        <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border">
          {filename || language}
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-muted/50">
        <code className={`text-sm font-mono ${language ? `language-${language}` : ''}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

interface ImageBlockProps {
  value: SanityImageAsset;
}

function ImageBlock({ value }: ImageBlockProps) {
  if (!value?.asset) return null;

  const altText = value.alt || 'Blog post image';

  return (
    <figure className="my-8">
      <Image
        src={urlFor(value).width(1200).auto('format').quality(80).url()}
        alt={altText}
        width={1200}
        height={675}
        className="w-full h-auto rounded-lg"
      />
      {value.caption && (
        <figcaption className="text-sm text-muted-foreground text-center mt-2">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ImageBlock,
    codeBlock: CodeBlock,
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-medium mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-border pl-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '';
      // Validate URL to prevent javascript: protocol injection
      const isValidUrl = href.startsWith('http://') ||
                         href.startsWith('https://') ||
                         href.startsWith('mailto:') ||
                         href.startsWith('tel:') ||
                         href.startsWith('/');

      if (!isValidUrl) {
        return <span>{children}</span>;
      }

      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      return (
        <a
          href={href}
          target={isExternal || value?.blank ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
}

export function PortableText({ value }: PortableTextProps) {
  return <PortableTextReact value={value} components={components} />;
}

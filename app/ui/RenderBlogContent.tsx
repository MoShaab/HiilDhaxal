import React from 'react';
import Link from 'next/link';

const headingClasses: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', string> = {
  h1: 'text-4xl font-bold text-gray-900 mt-12 mb-6',
  h2: 'text-3xl font-semibold text-gray-800 mt-10 mb-5',
  h3: 'text-2xl font-medium text-gray-700 mt-8 mb-4',
  h4: 'text-xl font-medium text-gray-600 mt-6 mb-3',
  h5: 'text-lg font-medium text-gray-600 mt-4 mb-2',
  h6: 'text-base font-medium text-gray-600 mt-4 mb-2',
};

function RenderBlogContent({ content }: { content: string }) {
  const lines = content.split('\n');

  const renderLine = (line: string, index: number) => {
    const trimmedLine = line.trim();
    const key = `line-${index}-${trimmedLine.slice(0, 20)}`;

    if (trimmedLine === '') {
      return <br key={key} />;
    }

    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length as 1 | 2 | 3 | 4 | 5 | 6;
      const text = headingMatch[2];
      const HeadingTag = `h${level}` as keyof typeof headingClasses;

      return (
        <HeadingTag key={key} className={headingClasses[HeadingTag]}>
          {renderTextWithFormatting(text)}
        </HeadingTag>
      );
    }

    if (trimmedLine.startsWith('- ')) {
      return (
        <ul key={key} className="list-disc list-inside space-y-2 text-gray-700 pl-4">
          <li className="mb-2">{renderTextWithFormatting(trimmedLine.slice(2))}</li>
        </ul>
      );
    }

    return (
      <p key={key} className="text-gray-700 leading-relaxed text-lg">
        {renderTextWithFormatting(trimmedLine)}
      </p>
    );
  };

  const renderTextWithFormatting = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let currentIndex = 0;
    const length = text.length;

    while (currentIndex < length) {
      // Find next formatting marker (either link or bold)
      const nextLinkStart = text.indexOf('[', currentIndex);
      const nextBoldStart = text.indexOf('**', currentIndex);

      // If no more formatting found, break
      if (nextLinkStart === -1 && nextBoldStart === -1) break;

      // Determine which comes first
      let isLink = false;
      let nextFormatStart: number;
      
      if (nextLinkStart === -1) {
        nextFormatStart = nextBoldStart;
      } else if (nextBoldStart === -1) {
        nextFormatStart = nextLinkStart;
        isLink = true;
      } else {
        if (nextLinkStart < nextBoldStart) {
          nextFormatStart = nextLinkStart;
          isLink = true;
        } else {
          nextFormatStart = nextBoldStart;
        }
      }

      // Add text before the formatting
      if (nextFormatStart > lastIndex) {
        parts.push(text.slice(lastIndex, nextFormatStart));
      }

      if (isLink) {
        // Handle link formatting
        const linkTextEnd = text.indexOf(']', nextFormatStart);
        if (linkTextEnd === -1) break;

        const urlStart = text.indexOf('(', linkTextEnd);
        if (urlStart === -1 || urlStart !== linkTextEnd + 1) break;

        const urlEnd = text.indexOf(')', urlStart);
        if (urlEnd === -1) break;

        const linkText = text.slice(nextFormatStart + 1, linkTextEnd);
        const url = text.slice(urlStart + 1, urlEnd);

        parts.push(
          <Link
            key={`link-${nextFormatStart}`}
            href={url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </Link>
        );

        currentIndex = urlEnd + 1;
        lastIndex = currentIndex;
      } else {
        // Handle bold formatting
        const boldEnd = text.indexOf('**', nextFormatStart + 2);
        if (boldEnd === -1) break;

        const boldText = text.slice(nextFormatStart + 2, boldEnd);
        parts.push(
          <strong key={`bold-${nextFormatStart}`} className="font-bold">
            {boldText}
          </strong>
        );

        currentIndex = boldEnd + 2;
        lastIndex = currentIndex;
      }
    }

    // Add remaining text
    if (lastIndex < length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="space-y-4">
      {lines.map((line, index) => renderLine(line, index))}
    </div>
  );
}

export default RenderBlogContent;
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
    const parts = [];
    let lastIndex = 0;
    let currentIndex = 0;
    const length = text.length;

    while (currentIndex < length) {
      // Find opening bracket
      const linkStart = text.indexOf('[', currentIndex);
      if (linkStart === -1) break;

      // Find closing bracket
      const linkTextEnd = text.indexOf(']', linkStart);
      if (linkTextEnd === -1) break;

      // Find opening parenthesis
      const urlStart = text.indexOf('(', linkTextEnd);
      if (urlStart === -1 || urlStart !== linkTextEnd + 1) break;

      // Find closing parenthesis
      const urlEnd = text.indexOf(')', urlStart);
      if (urlEnd === -1) break;

      // Add text before the link
      if (linkStart > lastIndex) {
        parts.push(text.slice(lastIndex, linkStart));
      }

      // Extract link text and URL
      const linkText = text.slice(linkStart + 1, linkTextEnd);
      const url = text.slice(urlStart + 1, urlEnd);

      // Add the link component
      parts.push(
        <Link
          key={`link-${linkStart}`}
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


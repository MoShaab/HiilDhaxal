import React from 'react';

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

  return (
    <div className="space-y-4">
      {lines.map((line, index) => {
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
              {text}
            </HeadingTag>
          );
        }

        if (trimmedLine.startsWith('- ')) {
          return (
            <ul key={key} className="list-disc list-inside space-y-2 text-gray-700 pl-4">
              <li className="mb-2">{trimmedLine.slice(2)}</li>
            </ul>
          );
        }

        return (
          <p key={key} className="text-gray-700 leading-relaxed text-lg">
            {trimmedLine}
          </p>
        );
      })}
    </div>
  );
}

export default RenderBlogContent;


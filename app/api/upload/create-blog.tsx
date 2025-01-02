'use client';

import Link from 'next/link';
import { DocumentTextIcon, PencilIcon, CalendarIcon, ClockIcon, LinkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createBlog } from '@/app/lib/actions';
import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';

export default function Form() {
  const [content, setContent] = useState('');

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <form action={createBlog} className="max-w-2xl mx-auto text-black">
      <div className="rounded-md bg-gray-50 p-4 md:p-6 shadow-md">
        {/* Blog Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className={`mb-2 block text-2xl ${lusitana.className} text-gray-900 font-bold`}
          >
            Blog Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter blog title"
              className="peer block w-full rounded-md border border-gray-300 py-3 pl-12 text-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Blog Content */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="mb-2 block text-xl text-gray-800 font-semibold"
          >
            Blog Content
          </label>
          <div className="relative">
            <textarea
              id="content"
              name="content"
              placeholder="Enter blog content"
              className="peer block w-full rounded-md border border-gray-300 py-3 pl-12 text-lg text-gray-700 placeholder:text-gray-500 min-h-[300px] resize-y focus:border-blue-500 focus:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-6 w-6 text-gray-400" />
          </div>
          <div className="mt-2 space-y-1 text-sm text-gray-500">
            <div className="flex items-center">
              <LinkIcon className="w-4 h-4 mr-1" />
              <span>To add a link, use the format: [Link Text](https://example.com)</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span>To make text bold, use double asterisks: **Bold Text**</span>
            </div>
          </div>
        </div>

        {/* Estimated Reading Time */}
        <div className="mb-6 flex items-center text-gray-500">
          <ClockIcon className="w-5 h-5 mr-2" />
          <span>{estimateReadingTime(content)} daqiiqo aqris</span>
        </div>

        {/* Blog Images */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="mb-2 block text-xl text-gray-800 font-semibold"
          >
            Upload Blog Images
          </label>
          <div className="relative">
            <input
              id="image"
              name="images"
              type="file"
              multiple
              accept="image/*,.pdf,video/*"
              className="block w-full rounded-md border border-gray-300 bg-gray-100 py-3 px-4 text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-600 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">You can upload multiple images, PDFs, or videos.</p>
        </div>

        {/* Created At (hidden, will be set server-side) */}
        <input type="hidden" name="created_at" value={new Date().toISOString()} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/blog"
          className="flex h-10 items-center justify-center rounded-lg bg-gray-100 px-4 text-gray-600 font-medium hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Blog</Button>
      </div>
    </form>
  );
}


import React from 'react';
import { Blog } from '@/app/lib/definitions';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { UpdateListing, DeleteListing } from '@/app/ui/properties/buttons';
import ShareButtons from './ShareButtons';
import { lusitana } from '@/app/ui/fonts';
import RenderBlogContent from './RenderBlogContent';

// Utility Functions
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function estimateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}


export default function FullBlogs({ blogs }: { blogs: Blog }) {
  if (!blogs) {
    return notFound();
  }

  const mediaPaths: string[] = Array.isArray(blogs.image_url) ? blogs.image_url : blogs.image_url ? [blogs.image_url] : [];
  const readingTime = estimateReadingTime(blogs.content);

    const renderMedia = (mediaPath: string, index: number) => {
    const fileExtension = mediaPath.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension!)) {
      return (
        <Link key={index} href={mediaPath}>
          <div className="relative aspect-video cursor-pointer overflow-hidden rounded-lg shadow-lg">
            <Image
              src={mediaPath}
              alt={`${blogs.title} - Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </Link>
      );
    } else if (fileExtension === 'pdf') {
      return (
        <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <object data={mediaPath} type="application/pdf" className="w-full h-full">
            <p className="p-4 text-center">
              PDF preview not available.{' '}
              <a href={mediaPath} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Download the PDF
              </a>
              .
            </p>
          </object>
        </div>
      );
    } else if (['mp4', 'webm', 'ogg'].includes(fileExtension!)) {
      return (
        <div key={index} className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
          <video controls className="w-full h-full">
            <source src={mediaPath} type={`video/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return (
        <div key={index} className="relative aspect-square flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
          <p className="text-gray-500">Unsupported file type</p>
        </div>
      );
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
       <Link href="/blog" className="inline-flex items-center text-blue-600 hover:underline mb-8 text-lg">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Ku Laabo Qormo
      </Link>

      <header className="mb-12">
        <h1 className='text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
          {blogs.title}
        </h1>

        <div className="flex flex-wrap items-center text-base text-gray-500 mb-6">
          <div className="flex items-center mr-6 mb-2">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <time dateTime={blogs.created_at}>{formatDate(blogs.created_at)}</time>
          </div>
          <div className="flex items-center mr-6 mb-2">
            <ClockIcon className="w-5 h-5 mr-2" />
            <span>{readingTime} daqiiqo aqris</span>
          </div>
        </div>
      </header>

      {mediaPaths.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{mediaPaths.map((media, i) => renderMedia(media, i))}</div>
        </div>
      )}
      <div className="prose prose-lg max-w-none">
        <RenderBlogContent content={blogs.content} />
      </div>

     <div className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">La Wadaag Maqaalkan</h2>
        <ShareButtons title={blogs.title} />
      </div>

      <div className="mt-16 flex justify-end space-x-4">
        <UpdateListing id={blogs.id} />
        <DeleteListing id={blogs.id} />
      </div>
    </article>
  );
}


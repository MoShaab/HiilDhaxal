import Link from 'next/link';
import {
  DocumentTextIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createBlog } from '@/app/lib/actions';

export default function BlogForm() {
  return (
    <form action={createBlog} className="max-w-md mx-auto text-black">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Blog Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-lg text-3xl font-medium">
            Blog Title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter blog title"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-lg text-3xl outline-2 placeholder:text-gray-500"
            />
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Blog Content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-lg text-3xl font-medium">
            Blog Content
          </label>
          <div className="relative">
            <textarea
              id="content"
              name="content"
              placeholder="Enter blog content"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-lg text-3xl outline-2 placeholder:text-gray-500"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Blog Image */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-lg text-3xl text-gray-700 font-medium">
            Upload Blog Image
          </label>
          <div className="relative">
            <input
              id="image"
              name="images"
              type="file"
              multiple
              className="block w-full text-lg text-3xl text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-gray-200 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-300"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/properties"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-lg text-3xl font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Blog</Button>
      </div>
    </form>
  );
}

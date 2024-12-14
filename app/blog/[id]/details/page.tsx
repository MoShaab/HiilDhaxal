import { notFound } from 'next/navigation';
import { fetchBlogById } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import FullBlogs from '@/app/ui/blogfull';
import Link from 'next/link';
import {
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

export default async function Page({ params }: { params: { id: string } }) {
  const fullblogs = await fetchBlogById(params.id);

  if (!fullblogs) {
    notFound();
  }

  console.log("full blog", fullblogs)

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Header */}
          <h1
            className={`${lusitana.className} text-gray-900 text-3xl md:text-4xl font-bold border-b-4 border-blue-400 pb-2 text-center md:text-left`}
          >
            Hoyga Hiddaha Soomaaliyeed
          </h1>

          {/* Navigation Links */}
          <div className="mt-4">
            <Link href="/blog">
            <ArrowLeftIcon className = "text-gray-900 w-10" />
              <span className="gap-2  px-4 py-2 text-gray-900 text-sm md:text-lg font-medium hover:bg-blue-600">
              Dib u laabo
              
              </span>
              
            </Link>

           
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-8">
          <FullBlogs blogs ={fullblogs} />
        </div>

        {/* Footer with Somali Motifs */}
        <div className="mt-16 border-t pt-6 text-center text-sm text-gray-700">
          <p className="font-semibold">
            “Hiddaha Soomaaliyeed waa ilbaxnimo aan dhamaan.”
          </p>
          <p className="text-gray-500">Created with is-xilqaan❤️ by Mohamed Shacab</p>
        </div>
      </div>
    </div>
  );
}

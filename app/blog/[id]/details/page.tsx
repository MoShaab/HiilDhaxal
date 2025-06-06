import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchBlogById } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import FullBlogs from '@/app/ui/blogfull';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

type Props = {
  params: { id: string }
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await fetchBlogById(params.id);
  const baseUrl = 'https://hiildhaxal.online';
  
  const imageUrl = Array.isArray(blog.image_url) 
    ? blog.image_url[0] 
    : blog.image_url;
  const absoluteImageUrl = imageUrl?.startsWith('http') 
    ? imageUrl 
    : `${baseUrl}${imageUrl}`;

  return {
    metadataBase: new URL(baseUrl),
    title: blog.title,
    description: blog.content.slice(0, 160),
    openGraph: {
      url: `${baseUrl}/blog/${params.id}`,
      title: blog.title,
      description: blog.content.slice(0, 160),
      images: [absoluteImageUrl],
    }
  };
}

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
            className={`${lusitana.className} text-gray-900 text-3xl md:text-4xl font-bold pb-2 text-center md:text-left break-words overflow-visible`}
          >
            Hoyga Hiddaha Soomaaliyeed
          </h1>

           {/* Navigation Links */}

           <div className="mt-4">
            <Link href="/">
              <button>
              <HomeIcon className = "text-gray-900 w-10" />
              <span className="gap-2 rounded px-4 py-2 text-gray-900 text-sm md:text-lg font-medium hover:bg-blue-600">
              Guriga aad
              
              </span>

              </button>
            
              
            </Link>

           
          </div>

          
        </div>

        {/* Property Details */}
        <div className="mt-8">
          <FullBlogs blogs ={fullblogs} />
        </div>

        {/* Footer with Somali Motifs */}
        <div className="mt-6 border-t pt-6 text-center text-sm text-gray-700">
         
        </div>
      </div>
    </div>
  );
}

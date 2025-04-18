
import Pagination from '@/app/ui/properties/pagination';
import Search from '@/app/ui/search';
import PropertyListings from "@/app/ui/properties/listings";
import { fetchPropertiesPages } from '@/app/lib/data';
import Link from 'next/link';
import {
  HomeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Navigator from '../ui/properties/navigation-events';





export const revalidate = 0;
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPropertiesPages(query);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className=" mt-15 flex flex-col md:flex-row md:items-center justify-between">
          {/* Header */}
          <h1
            className='text-gray-900 text-3xl md:text-4xl font-bold pb-2 text-center md:text-left break-words overflow-visible'
          >
            Ilaalinta Dhaxalka Soomaaliyeed.
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

          <div className="mt-4">
          

              <Navigator />

           
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col gap-3 items-center md:flex-row md:justify-between md:gap-2 md:mt-8">
          <Search placeholder="Baar Kaydka" />
        </div>

        {/* Property Listings */}
        <div className="mt-8">
          <PropertyListings query={query} currentPage={currentPage} />
        </div>

        {/* Pagination */}
        <div className="mt-10 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>

        {/* Footer with Somali Motifs */}
        <div className="mt-6 border-t pt-6 text-center text-sm text-gray-700">
          
        </div>
      </div>
    </div>
  );
}
import Pagination from '@/app/ui/properties/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import PropertyListings from "@/app/ui/properties/listings";
import { fetchPropertiesPages } from '@/app/lib/data';
import Link from 'next/link';
import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';

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
    <div className="w-full min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className={`${lusitana.className} text-gray-900 text-4xl font-bold`}>
            Property Listings
          </h1>
           
        <Link href= '/'>
            
            <span className =  "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-blue-400 p-3 text-lg font-medium hover:bg-sky-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">  Go Back Home  </span>
        
        </Link>

        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-400 p-3 text-sm font-medium hover:bg-sky-300 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>


        </div>
        <div className="mt-6 flex items-center text-lg justify-between gap-2 md:mt-8">
          <Search placeholder="Search properties" />
          {/* <CreateInvoice /> */}
        </div>
        <div className="mt-8">
          <PropertyListings query={query} currentPage={currentPage} />
        </div>
        <div className="mt-10 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

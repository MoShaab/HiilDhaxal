
import Pagination from '@/app/ui/properties/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import PropertyListings from "@/app/ui/properties/listings";
import Link from 'next/link';
import { fetchPropertiesPages } from '@/app/lib/data';


export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }){
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPropertiesPages(query);
 
    return (
        <div className="w-full min-h-screen bg-gray-100">
          <div className="flex items-center justify-between">
            <h1 className={`${lusitana.className} text-black text-2xl`}>Property Listings</h1>
            
            <Link href= 'http://localhost:3000/'>
            
                <div className =  "p-8 mt-20 bg-blue-700 hover:bg-gray-500 text-white font-bold py-2 rounded">  Go Back Home  </div>
            
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search properties" />
            {/* <CreateInvoice /> */}
          </div>
          
            <PropertyListings query={query} currentPage={currentPage} />
          
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      );

}
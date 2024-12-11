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
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="flex items-center justify-between">
          {/* Header */}
          <h1
            className={`${lusitana.className} text-gray-900 text-4xl font-bold border-b-4 border-blue-400 pb-2`}
          >
            Hoyga Hiddaha Soomaaliyeed
          </h1>

          {/* Navigation Links */}
          <div className="flex gap-4">
            <Link href="/">
              <span className="flex items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white text-lg font-medium hover:bg-blue-600">
                Go Back Home
              </span>
            </Link>

            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button className="flex items-center justify-center gap-2 rounded-md bg-gray-400 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500">
                <PowerIcon className="w-6" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex items-center justify-between gap-2 md:mt-8">
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

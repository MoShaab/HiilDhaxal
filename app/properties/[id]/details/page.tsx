import { notFound } from 'next/navigation';
import { fetchPropertyById } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import PropertyDetails from '@/app/ui/properties/details';
import Link from 'next/link';
import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';

export default async function Page({ params }: { params: { id: string } }) {
    const property = await fetchPropertyById(params.id);

    return (
        
            <div className="w-full min-h-screen bg-gray-100">
              <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="flex items-center justify-between">
                  <h1 className={`${lusitana.className} text-gray-900 text-4xl font-bold`}>
                    Property Details
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
                
                <div className="mt-8">
                  <PropertyDetails property={property} />
                </div>
                
              </div>
            </div>
          );
        }
        
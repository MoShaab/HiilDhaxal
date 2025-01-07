import { notFound } from 'next/navigation';
import { fetchPropertyById } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import PropertyDetails from '@/app/ui/properties/details';
import Link from 'next/link';
import {
  
  HomeIcon
} from '@heroicons/react/24/outline';
import Navigator from '@/app/ui/properties/navigation-events';
export const revalidate = 0;
export default async function Page({ params }: { params: { id: string } }) {
  const property = await fetchPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen  bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Header */}
          <h1
            className='text-gray-900 text-3xl md:text-4xl font-bold pb-2 text-center md:text-left break-words overflow-visible'
          >
            Dhaxalka Jiilka Maanta iyo Kuwa Berri.
          </h1>

          {/* Navigation Links */}

          <div className="mt-10">
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
        {/* Back Button (Client Component) */}
        
        

        {/* Property Details */}
        <div className="mt-8">
          <PropertyDetails property={property} />
        </div>

        {/* Footer with Somali Motifs */}
        <div className="mt-6 border-t text-center text-sm text-gray-700">
          
        </div>
      </div>
    </div>
  );
}

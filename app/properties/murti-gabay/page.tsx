import DisplayAllVillas from "@/app/ui/properties/villas";
import { fetchDisplayAllVillas } from "@/app/lib/data";
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

export const revalidate = 0;

export default async function Page(){
    
    const displayAllVillas = await fetchDisplayAllVillas();
   
    return (
      <main>
      <div className="min-h-screen mt-20 w-full  bg-gradient-to-b from-blue-100 via-white to-blue-50">

      <div className="flex flex-col md:flex-row md:items-center justify-between">
       
  
        {/* {<DisplayProperty/>} */}
        <h1
            className={`${lusitana.className} text-gray-900 text-3xl md:text-4xl font-bold border-b-4 border-blue-400 pb-2 text-center md:text-left`}
          >
            Murtida Soomaaliyeed waa ilbaxnimo aan dhamaan.
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

       
        <DisplayAllVillas displayAllVillas = {displayAllVillas} />
        {/* Footer with Somali Motifs */}
        <div className="mt-6 border-t pt-6 text-center text-sm text-gray-700">
          
        </div>

        

        
        
      
    
      </div>
      </main>
    );
  };
  
  
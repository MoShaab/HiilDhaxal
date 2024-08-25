import Image from 'next/image';

import { fetchFilteredProperties } from '@/app/lib/data';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default async function PropertyListings({
    query,
    currentPage
}:{
    query: string;
    currentPage: number;
}
){
    const properties = await fetchFilteredProperties(query, currentPage);

    return(
        <div>
        <h2 className="text-blue-500 text-center">Our Services</h2>
    
        <p className='font-bold text-black text-center'>Best Properties For Sale</p>

        <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => {
            console.log('Image URL:', property.image_path);
            
            return(
        <Link href = {property.image_path} key={property.id}>
            <div   className="block group"
            
            >
                
                    <div className="relative w-full h-64">
                    <Image
                        src={property.image_path}
                        alt={property.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />

                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                            {property.title}
                        </h3>
                        <p className="text-md text-black">
                            {property.description}
                        </p>
                        <p  className={`${lusitana.className} mb-4 text-black text-xl md:text-2xl`}> {property.price} </p>
                    </div>
                
            </div>
            </Link>
            
            );   
        }
        )}
    </div>
        </div>
    )

}
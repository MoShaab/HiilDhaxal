import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Property } from '@/app/lib/definitions';
import Link from 'next/link';

export default async function DisplayVillas({
    displayVillas,
}:{
displayVillas: Property[];
})
{
    console.log('Display Villas:', displayVillas);
    

    return(
    <div>
        <h2 className="text-blue-500 text-center">Browse Properties</h2>
    
        <p className='font-bold text-black text-center'>Villa for Rent & Sale</p>

        <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayVillas.map((property) => {
            console.log('Image URL:', property.image_path);
            
            return(
        
            <div  key={property.id}
            className = "block group"
            >
            <Link href = {property.image_path}>
                
                    <div className="relative w-full h-64">
                    <Image
                        src={property.image_path}
                        alt={property.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg shadow-lgz transition-transform duration-300 ease-in-out group-hover:scale-105"
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

                    
             </Link> 
             
                       
                  
                           
                       

                    
            
            </div>
           
           
            
            );   
        }
        )}
    </div>

    


<div className="flex justify-center">
  <div className =  "p-8 mb-20 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 rounded">  View All  </div>
</div>
    
    
  </div>
        
    );
    

}
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Property } from '@/app/lib/definitions';
import Link from 'next/link';
import { Fade } from "react-awesome-reveal";

export default async function DisplayFromDb({

    featuredProperty,
    }:{
    featuredProperty: Property[];
    
    }){
        console.log('Featured Property:', featuredProperty);

        const renderFile = (filePath: string) => {
            const fileExtension = filePath.split('.').pop()?.toLowerCase();
    
            if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension!)) {
                return (
                    <Image
                        src={filePath}
                        alt="Property Image"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                );
            } else if (fileExtension === 'pdf') {
                return (
                    <object data={filePath} type="application/pdf" width="100%" height="64">
                        <p>PDF preview not available. <a href={filePath} target="_blank">Download the PDF</a>.</p>
                    </object>
                );
            } else if (['mp4', 'webm', 'ogg'].includes(fileExtension!)) {
                return (
                    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                    <video 
                        className="w-full h-full object-contain" 
                        controls
                    >
                        <source src={filePath} type={`video/${fileExtension}`} />
                        Your browser does not support the video tag.
                    </video>
                </div>
                );
            } else {
                return <p>Unsupported file type.</p>;
            }
        };
        

        return(
            <div>
            <h2 className="text-blue-500 text-center text-3xl mt-10">Agabyo laguu soo xulay</h2>

            <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperty.map((property) => {
                console.log('Image URL:', property.image_path);
                const images = JSON.parse(property.image_path);
                    const thumbnail = images[0]; 
                
                return(
            <Link href = {`/properties/${property.id}/details`} key={property.id}>
                <div   className="block group"
                
                >
                    
                        <div className="relative w-full h-64">
                        {renderFile(thumbnail)}
                        

                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                                {property.title}
                            </h3>
                            <p className="text-md text-black">
                                {property.description}
                            </p>
                            <p className={`${lusitana.className} mb-4 text-black text-xl md:text-2xl`}>
                                {property.location}
                            </p>
                           
                        </div>
                    
                </div>
                </Link>
                
                );   
            }
            )}
        </div>
        <div className = 'flex justify-center'>
        <Fade direction={'up'} delay={100} cascade damping={1e-1} triggerOnce={true}>
        <div className='md:flex align-middle justify-center lg:justify-start'>
            
            <button className='flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink'><Link href='/properties'>Sahmi Bandhigga</Link></button>
        </div>
    </Fade>

        </div>
        
            </div>
            
        );
        
        
        
}
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Property } from '@/app/lib/definitions';
import Link from 'next/link';

export default async function DisplayVillas({
    displayVillas,
}:{
    displayVillas: Property[];
}) {
    console.log('Display Villas:', displayVillas);

    const renderFile = (filePath: string) => {
        const fileExtension = filePath.split('.').pop()?.toLowerCase();

        if (['jpg', 'jpeg', 'png','webp', 'gif'].includes(fileExtension!)) {
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
                <video width="100%" controls className="rounded-lg shadow-lg">
                    <source src={filePath} type={`video/${fileExtension}`} />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return <p>Unsupported file type.</p>;
        }
    };

    return (
        <div>
            <h2 className="text-blue-500 text-3xl text-center mt-10">Raadi Maansooyinka(Gabay)</h2>
            <p className='font-bold text-black text-center text-3xl'>Murti iyo Madaddaalo</p>

            <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayVillas.map((property) => {
                    console.log('Image URL:', property.image_path);
                    const images = JSON.parse(property.image_path);
                    const thumbnail = images[0]; 

                    return (
                        <div key={property.id} className="block group">
                            <Link href={`/properties/${property.id}/details`} key={property.id}>
                                <div className="relative w-full h-64">
                                    {renderFile(thumbnail)}
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                                        {property.title}
                                    </h3>
                                    <p className="text-md text-black">{property.description}</p>
                                    <p className={`${lusitana.className} mb-4 text-black text-xl md:text-2xl`}>
                                        {property.location}
                                    </p>
                                    
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <Link href="/properties/villas">
                    <div className="p-8 mb-10 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 rounded">View All</div>
                </Link>
            </div>
        </div>
    );
}

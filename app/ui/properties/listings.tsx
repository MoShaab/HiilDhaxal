import Image from 'next/image';
import { fetchFilteredProperties } from '@/app/lib/data';
import { UpdateListing, DeleteListing } from '@/app/ui/properties/buttons';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default async function PropertyListings({
    query,
    currentPage
}: {
    query: string;
    currentPage: number;
}) {
    const properties = await fetchFilteredProperties(query, currentPage);

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
            <div className="flex w-full flex-col px-3 py-4 md:px-2"></div>

            <h2 className={`${lusitana.className} text-black text-3xl text-center`}>You are at the right place!</h2>
            <p className='font-bold text-black text-center text-3xl'>Feel free to browse our large database</p>

            <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties?.map((property) => {
                    const images = JSON.parse(property.image_path);
                    const thumbnail = images[0]; // Get the first image as a thumbnail

                    return (
                        <div key={property.id} className="block group">
                            <Link href={`/properties/${property.id}/details`}>
                                <div className="block group">
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

                            <div className="flex justify-end gap-2">
                                <UpdateListing id={property.id} />
                                <DeleteListing id={property.id} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

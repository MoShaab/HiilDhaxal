import Image from 'next/image';
import { UpdateListing, DeleteListing } from '@/app/ui/properties/buttons';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { notFound } from 'next/navigation';
import { Property } from '@/app/lib/definitions';

export default async function PropertyDetails({ property }: { property: Property }) {
    if (!property) {
        return notFound(); // Show a 404 page if the property is not found
    }

    // Parse image paths from JSON string
    const imagePaths = JSON.parse(property.image_path) as string[];

    return (
        <div>
            <div className="flex w-full flex-col px-3 py-4 md:px-2"></div>

            <h2 className={`${lusitana.className} text-black text-3xl text-center`}>You are at the right place!</h2>

            <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Render each image as a clickable thumbnail */}
                {imagePaths.map((image, i) => (
                    <Link key={i} href={`/properties/${property.id}/details`}>
                        <div className="relative w-full h-64 cursor-pointer overflow-hidden">
                            <Image
                                src={image}
                                alt={property.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-125"
                            />
                        </div>
                    </Link>
                ))}
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
                <p className={`${lusitana.className} mb-4 text-black text-xl md:text-2xl`}>
                    KSH {property.price}
                </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <UpdateListing id={property.id} />
                <DeleteListing id={property.id} />
            </div>
        </div>
    );
}

'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { UpdateListing, DeleteListing } from '@/app/ui/properties/buttons';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { notFound } from 'next/navigation';
import { Property } from '@/app/lib/definitions';

export default function PropertyDetails({ property }: { property: Property }) {
    if (!property) {
        return notFound(); // Show a 404 page if the property is not found
    }

    // Parse media paths from JSON string
    const mediaPaths = JSON.parse(property.image_path) as string[];

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => setIsLightboxOpen(false);

    const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaPaths.length);
    const goToPrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaPaths.length) % mediaPaths.length);

    const renderMedia = (mediaPath: string, index: number) => {
        const fileExtension = mediaPath.split('.').pop()?.toLowerCase();

        if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(fileExtension!)) {
            return (
                <div
                    key={index}
                    className="relative w-full h-64 cursor-pointer overflow-hidden"
                    onClick={() => openLightbox(index)}
                >
                    <Image
                        src={mediaPath}
                        alt={property.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-125"
                    />
                </div>
            );
        }

        // Handle unsupported media
        return <p key={index}>Unsupported media type.</p>;
    };

    return (
        <div>
            <h2 className="text-black text-3xl text-center">Kaalay iska arag!</h2>

            <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {mediaPaths.map((media, i) => renderMedia(media, i))}
            </div>

            {isLightboxOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white text-2xl"
                    >
                        ✕
                    </button>
                    <button
                        onClick={goToPrev}
                        className="absolute left-4 text-white text-2xl"
                    >
                        ◀
                    </button>
                    <div className="relative max-w-3xl mx-auto">
                        <Image
                            src={mediaPaths[currentIndex]}
                            alt={`Image ${currentIndex + 1}`}
                            width={800}
                            height={600}
                            className="rounded-lg"
                        />
                    </div>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 text-white text-2xl"
                    >
                        ▶
                    </button>
                </div>
            )}

            <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                    {property.title}
                </h3>
                <p className="text-md text-black">{property.description}</p>
                <p className="text-black text-xl">{property.location}</p>
            </div>
        </div>
    );
}

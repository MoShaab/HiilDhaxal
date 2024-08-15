
import Image from 'next/image';
import Link from 'next/link';

export default function ImageGrid() {
    const items = [
        { src: '/villa.jpg', alt: 'Image 1', title: 'Beautiful Villa', description: 'A spacious and elegant villa with modern amenities.', link: '/villas' },
        { src: '/home.jpg', alt: 'Image 2', title: 'Cozy Cottage ', description: 'A charming cottage surrounded by nature.', link: '/homes' },
        { src: '/apartment.jpg', alt: 'Image 3', title: 'Modern Apartment', description: 'A chic apartment located in the heart of the city.', link: 'apartment' },
        // Add more items as needed
    ];

    return (
<>
         <h2 className="text-blue-500 text-center">Our Services</h2>
        
        <p className='font-bold text-black text-center'>Best Properties For Sale</p>
        <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
                <Link href={item.link} key={index} className="block group">
                    
                        <div className="relative w-full h-64">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                                {item.title}
                            </h3>
                            <p className="text-md text-black">
                                {item.description}
                            </p>
                        </div>
                    
                </Link>
            ))}
        </div>
</>
    );
}

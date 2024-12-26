import Image from 'next/image';
import { UpdateListing, DeleteListing } from '@/app/ui/properties/buttons';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { notFound } from 'next/navigation';
import { Blog } from '@/app/lib/definitions';

type BlogContentProps = {
    content: string;
};


export default async function FullBlogs({ blogs }: { blogs: Blog }) {
    if (!blogs) {
        return notFound(); // Show a 404 page if the property is not found
    }
   

    function RenderBlogContent({content}: BlogContentProps) {
        // Replace newlines with <br> for HTML rendering
        const formattedContent = content.replace(/\n/g, '<br />');
      
        return (
          <article className="prose mx-auto">
            <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </article>
        );
      }

    // Directly use the array of image URLs
    const mediaPaths: string[] = Array.isArray(blogs.image_url) ? blogs.image_url : [];

    // Function to render different media types
    const renderMedia = (mediaPath: string, index: number) => {
        const fileExtension = mediaPath.split('.').pop()?.toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension!)) {
            return (
                <Link key={index} href={mediaPath}>
                    <div className="relative w-full h-64 cursor-pointer overflow-hidden">
                        <Image
                            src={mediaPath}
                            alt={blogs.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-125"
                        />
                    </div>
                </Link>
            );
        } else if (fileExtension === 'pdf') {
            return (
                <div key={index} className="relative w-full h-64 cursor-pointer overflow-hidden">
                    <object data={mediaPath} type="application/pdf" width="100%" height="100%">
                        <p>PDF preview not available. <a href={mediaPath} target="_blank">Download the PDF</a>.</p>
                    </object>
                </div>
            );
        } else if (['mp4', 'webm', 'ogg'].includes(fileExtension!)) {
            return (
                <div key={index} className="relative w-full h-64 cursor-pointer overflow-hidden">
                    <video width="100%" height="100%" controls className="rounded-lg shadow-lg">
                        <source src={mediaPath} type={`video/${fileExtension}`} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        } else {
            return (
                <div key={index} className="relative w-full h-64 cursor-pointer overflow-hidden">
                    <p>Unsupported file type.</p>
                </div>
            );
        }
    };

    return (
        <div>
            <div className="flex w-full flex-col px-3 py-4 md:px-2"></div>

            <h2 className={`${lusitana.className} text-black text-3xl text-center`}>Aan ilaalinno dhaxalka Soomaaliyeed!</h2>

            <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Render each media item as a clickable thumbnail */}
                {mediaPaths.map((media, i) => renderMedia(media, i))}
            </div>

            <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                    {blogs.title}
                </h3>
                <article className="prose mx-auto">
                    <RenderBlogContent content={blogs.content} />
                </article>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <UpdateListing id={blogs.id} />
                <DeleteListing id={blogs.id} />
            </div>
        </div>
    );
}

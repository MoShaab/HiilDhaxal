import Image from 'next/image';
import { UpdateListing, DeleteListing } from '@/app/ui/properties/buttons';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { Blog } from '@/app/lib/definitions';

export default async function FullBlogs({
    blogs,
}: {
    blogs: Blog[];
}) {

    
   

    const renderFile = (filePath: string) => {
        const fileExtension = filePath.split('.').pop()?.toLowerCase();

        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension!)) {
            return (
                <Image
                    src={filePath}
                    alt="Blog Image"
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

            <h2 className={`${lusitana.className} text-black text-3xl text-center`}>Kaalay iska arag!</h2>
            <p className='font-bold text-black text-center text-3xl'>Raadi oo ka bogo kaydkeenna</p>

            <div className="mt-10 ml-10 mr-10 ">
                {blogs.map((blog) => {
                    const images = blog.image_url;
                    const thumbnail = images[0]; // Get the first image as a thumbnail

                    return (
                        <div key={blog.id}>
                            <Link href={`/blog/${blog.id}/details`}>
                                <div className="block group">
                                    <div className="relative">
                                        {renderFile(thumbnail)}
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-500">
                                            {blog.title}
                                        </h3>
                                        <p className= {`${lusitana.className} text-md text-2xl text-black`}>
                                            {blog.content}
                                        </p>
                                        
                                      
                                    </div>
                                </div>
                            </Link>

                            <div className="flex justify-end gap-2">
                                <UpdateListing id={blog.id} />
                                <DeleteListing id={blog.id} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

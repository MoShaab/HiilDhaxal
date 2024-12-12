import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Blog } from '@/app/lib/definitions';
import Link from 'next/link';
import { fetchFilteredBlogs } from '../lib/data';

export default async function DisplayBlogs({
    query,
    currentPage
}: {
    query: string;
    currentPage: number;
}){
        
        const blogs = await fetchFilteredBlogs(query, currentPage);

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
        

        return(
            <div>
            <h2 className="text-blue-500 text-center text-3xl mt-10">Ka bogo qormooyin qiimo badan</h2>
        
            <p className='font-bold text-black text-center text-3xl'>Inta xulka ah</p>

            <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => {
                console.log('Image URL:', blog.image_url);
                const images = JSON.parse(blog.image_url);
                    const thumbnail = images[0]; 
                
                return(
            <Link href = {`/blog/${blog.id}/details`} key={blog.id}>
                <div   className="block group"
                
                >
                    
                        <div className="relative w-full h-64">
                        {renderFile(thumbnail)}
                        

                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                                {blog.title}
                            </h3>
                            
                            
                           
                        </div>
                    
                </div>
                </Link>
                
                );   
            }
            )}
        </div>
            </div>
            
        );
        
}
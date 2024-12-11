import DisplayBlogs from '../ui/blogs';
import {fetchBlogs} from '@/app/lib/data';



export const revalidate = 0;

export default async function Page(){
  
  const displayBlogs = await fetchBlogs();
  
  return (
    <main>
    <div className="min-h-screen bg-gray-100">
     
     
   

      {/* {<DisplayProperty/>} */}
      
      < DisplayBlogs blogs  = {displayBlogs}/>
      
      
    
  
    </div>
    </main>
  );
};


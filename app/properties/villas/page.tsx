import DisplayAllVillas from "@/app/ui/properties/villas";
import { fetchDisplayAllVillas } from "@/app/lib/data";

export const revalidate = 0;

export default async function Page(){
    
    const displayAllVillas = await fetchDisplayAllVillas();
   
    return (
      <main>
      <div className="min-h-screen bg-gray-100">
       
  
        {/* {<DisplayProperty/>} */}
       
        <DisplayAllVillas displayAllVillas = {displayAllVillas} />
        
        
      
    
      </div>
      </main>
    );
  };
  
  
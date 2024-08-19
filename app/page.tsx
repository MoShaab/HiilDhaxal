
import UpperNav from './ui/landingPage/upper-navlinks';
import LowerNav from './ui/landingPage/lower-navlinks';
import HeroArea from './ui/landingPage/hero-area';
import DisplayProperty from './ui/landingPage/display-properties';
import DisplayFromDb from './ui/landingPage/displayfromdb';
import {fetchFeaturedProperty} from '@/app/lib/data';

export const revalidate = 0;

export default async function Page(){
  const featuredProperty = await fetchFeaturedProperty();
  return (
    <main>
    <div className="min-h-screen bg-gray-100">
     
      <UpperNav />
      <LowerNav />
      <HeroArea />
      {/* {<DisplayProperty/>} */}
      <DisplayFromDb featuredProperty = {featuredProperty} />
      
    
  
    </div>
    </main>
  );
};



import UpperNav from './ui/landingPage/upper-navlinks';
import LowerNav from './ui/landingPage/lower-navlinks';
import HeroArea from './ui/landingPage/hero-area';
import DisplayFromDb from './ui/landingPage/displayfromdb';
import DisplayVillas from './ui/landingPage/displayForVillas';
import {fetchFeaturedProperty, fetchDisplayVillas} from '@/app/lib/data';
import LetUsKnow from './ui/landingPage/letUsKnow';


export const revalidate = 0;

export default async function Page(){
  const featuredProperty = await fetchFeaturedProperty();
  const displayVillas = await fetchDisplayVillas();
  return (
    <main>
    <div className="min-h-screen bg-gray-100">
     
      <UpperNav />
      <LowerNav />
      <HeroArea />
      {/* {<DisplayProperty/>} */}
      <DisplayFromDb featuredProperty = {featuredProperty} />
      <DisplayVillas displayVillas = {displayVillas} />
      <LetUsKnow />
      
    
  
    </div>
    </main>
  );
};


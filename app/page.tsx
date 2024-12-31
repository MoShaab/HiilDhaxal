
import UpperNav from './ui/landingPage/upper-navlinks';
import LowerNav from './ui/landingPage/lower-navlinks';
import HeroArea from './ui/landingPage/hero-area';
import DisplayFromDb from './ui/landingPage/displayfromdb';
import DisplayVillas from './ui/landingPage/displayForVillas';
import LetUsKnow from './ui/landingPage/letUsKnow';
import DisplayAgents from './ui/landingPage/agents';
import Achieved from './ui/landingPage/achievements';
import TestimonialSection from './ui/landingPage/testmonials';
import Banner from './ui/landingPage/components/Banner/index';
import Cook from './ui/landingPage/components/Cook/index';
import Gallery from './ui/landingPage/components/Gallery/index';
import Newsletter from './ui/landingPage/components/Newsletter/Newsletter';
import Features from './ui/landingPage/components/Work/index';
// import Expert from './ui/landingPage/components/Expert/index';
import Contactusform from './ui/landingPage/components/Navbar/Contactus';

import {fetchFeaturedProperty, fetchDisplayVillas} from '@/app/lib/data';



export const revalidate = 0;

export default async function Page(){
  const featuredProperty = await fetchFeaturedProperty();
  const displayVillas = await fetchDisplayVillas();
  // const featuredAgents = await fetchFeaturedAgents();
  return (
    <main>
    
      {/* components */}
      <Banner />
      <Features />
      <Cook />
      {/* <Expert /> */}
      <Gallery />
      
     
     
      {/* <LowerNav /> */}
      {/* <HeroArea /> */}

      {/* {<DisplayProperty/>} */}
      <DisplayFromDb featuredProperty = {featuredProperty} />
      <DisplayVillas displayVillas = {displayVillas} />
      <LetUsKnow />
      {/* <DisplayAgents featuredAgents={featuredAgents} />
      <Achieved />
      <TestimonialSection /> */}
      {/* <Newsletter /> */}
      {/* <UpperNav /> */}
      {/* <Contactusform /> */}


      
    
  
    
    </main>
  );
};


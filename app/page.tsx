
import UpperNav from './ui/landingPage/upper-navlinks';
import LowerNav from './ui/landingPage/lower-navlinks';
import HeroArea from './ui/landingPage/hero-area';
import DisplayProperty from './ui/landingPage/display-properties';
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <UpperNav />
      <LowerNav />
      <HeroArea />
      <DisplayProperty />
  
    </div>

  );
};

export default Home;

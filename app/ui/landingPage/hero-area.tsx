
import Image from 'next/image';
import { lusitana, inter } from '@/app/ui/fonts';
import Search from '../search';



export default  function HeroArea(){


    return(
        <>
         <main className="relative w-full h-[70vh] flex justify-center items-center py-5 bg-cover">
        <div className=" absolute inset-0 mt-15">

        <div>
          <Image
            src="/hero-desktop.png"
            layout="fill"
            objectFit="cover"
            className="hidden md:block"
            alt="Hero Image Desktop"
          />
          <Image
            src="/hero-mobile.jpg"
            
            layout="fill"
            objectFit="cover"
            className="block md:hidden"
            alt="Hero Image Mobile"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>

         </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className={`${inter.className} text-2xl md:text-3xl font-bold`}>
              Find Your Perfect Home
            </h1>
            <p className={`${lusitana.className} text-xl md:text-3xl`}>
              Search your dream home on the largest property marketplace
              
            </p>

            <div className = "mt-10 text-lg text-3xl">
            <Search placeholder='search properties' />
            </div>


          </div>


        </div>
        
      </main>
      
        </>
    )
}

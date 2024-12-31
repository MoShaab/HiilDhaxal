import Image from 'next/image';
import { lusitana, inter } from '@/app/ui/fonts';
import Link from '@/node_modules/next/link';
import { Fade } from "react-awesome-reveal";

export default function LetUsKnow() {
  return (
    <>
      <main className="relative mt-10 w-full h-[70vh] flex items-center justify-center bg-cover ">
        <div className="absolute inset-0 mt-15">
          <Image
            src="/interior-desktop.jpg"
            layout="fill"
            objectFit="cover"
            className="hidden md:block"
            alt="Interior Image Desktop"
          />
          <Image
            src="/interior-mobile.jpg"
            layout="fill"
            objectFit="cover"
            className="block md:hidden"
            alt="Interior Image Mobile"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className={`${inter.className} text-xl md:text-3xl font-bold`}>
            Maadan  helin waxaad raadinaysay?
          </h1>
          <p className={`${lusitana.className} text-3xl md:text-3xl`}>
          Ha walwalin. Aan wada xallinno.
          </p>
          <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                            <div className='md:flex align-middle justify-center lg:justify-start'>
                                {/* <button className='text-xl w-full md:w-auto font-medium rounded-full text-white py-5 px-6 bg-pink lg:px-14 mr-6'><Link href='/#work-section'>Ku soco</Link></button> */}
                                <button className='flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center bg-grey rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink'><Link href='/#footer-section'>Farriin Reeb </Link></button>
                            </div>
          </Fade>
        
        </div>
      </main>
    </>
  );
}

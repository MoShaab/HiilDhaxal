'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { lusitana, inter } from '@/app/ui/fonts';
import SearchIcon from '@/app/ui/search.svg';
import styles from '@/app/ui/home.module.css';



export default function HeroArea(){

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
            <h1 className={`${inter.className} text-xl md:text-3xl font-bold`}>
              Find Your Perfect Home
            </h1>
            <p className={`${lusitana.className} text-xl md:text-3xl`}>
              Search your dream home on the largest property marketplace
            </p>

   


            {/* <div className={styles.search}>
              <div className={styles["search-icon-wrapper"]}>
                <Image
                  src={SearchIcon}
                  alt="Search Icon"
                  width={65}
                  height={65}
                />
              </div>
            </div> */}
          </div>
        </div>
      </main>
        </>
    )
}

export function Search({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-60 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
import Image from 'next/image';
import { lusitana, inter } from '@/app/ui/fonts';
import SearchIcon from '@/app/ui/search.svg';
import styles from '@/app/ui/home.module.css';


export default function HeroArea(){

    return(
        <>
         <main className="flex justify-center items-center py-5 bg-cover">
        <div className="relative text-center text-white">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Hero Image Desktop"
          />
          <Image
            src="/hero-mobile.jpg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Hero Image Mobile"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center mt-60">
            <h1 className={`${inter.className} text-xl text-white md:text-3xl font-bold`}>
              Find Your Perfect Home
            </h1>
            <p className={`${lusitana.className} text-xl text-white md:text-3xl`}>
              Search your dream home on the largest property marketplace
            </p>

            <div className={styles.search}>
              <div className={styles["search-icon-wrapper"]}>
                <Image
                  src={SearchIcon}
                  alt="Search Icon"
                  width={65}
                  height={65}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
        </>
    )
}
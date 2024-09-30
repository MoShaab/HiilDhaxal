import Image from 'next/image';
import { lusitana, inter } from '@/app/ui/fonts';

export default function LetUsKnow() {
  return (
    <>
      <main className="relative w-full h-[70vh] flex items-center justify-center bg-cover ">
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
            Didn&apos;t Find What You Were Looking For?
          </h1>
          <p className={`${lusitana.className} text-3xl md:text-3xl`}>
            Don't fret! We got you covered.
          </p>
            <div className="flex justify-center">
                <div className =  "p-8 mt-20 bg-blue-700 hover:bg-gray-500 text-white font-bold py-2 rounded">  Let Us Know  </div>
            </div>
        </div>3
      </main>
    </>
  );
}

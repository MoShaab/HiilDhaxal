import Image from 'next/image';
import { lusitana, inter } from '@/app/ui/fonts';
import { BuildingOfficeIcon, HomeModernIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const statistics = [
  { name: '1k+ Villas', icon:HomeModernIcon   },
  { name: '1k+ Apartments', icon: BuildingOfficeIcon },
  { name: '2k+ Houses', icon: HomeIcon },
  { name: '4k+ Happy Clients', icon: UserGroupIcon },
];

export default function Achieved() {
  return (
    <>
      <main className="mt-10 relative w-full h-[55vh] flex items-center justify-center bg-cover ">
        <div className="absolute inset-0">
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

        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {statistics.map((statistic) => {
              const Icon = statistic.icon;
              return (
                <div
                  key={statistic.name}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <p className="text-xl font-bold">{statistic.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

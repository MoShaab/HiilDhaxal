// 'use client';

// import { useSearchParams } from 'next/navigation';
// import PropertyListings from './listings';
// import { Property } from '@/app/lib/definitions';

// export default function PropertyResults({ properties, query }: { properties: Property[], query: string }) {
//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get('page')) || 1;

//   if (properties.length === 0) {
//     return (
//       <div className="mt-8 text-center">
//         <p className="text-xl text-gray-700">
//           Ma jiraan natiijooyinka laga helay "{query}".
//         </p>
//         <p className="mt-2 text-gray-500">
//           Fadlan isku day erayo kale ama baadi guud ahaan.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-8">
//       <PropertyListings properties={properties} currentPage={currentPage} />
//     </div>
//   );
// }


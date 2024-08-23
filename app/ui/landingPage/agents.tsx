import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Agent } from '@/app/lib/definitions'; // Assuming you've defined Agent type
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, } from 'react-icons/fa';

export default function DisplayAgents({ featuredAgents }: { featuredAgents: Agent[] }) {
  console.log('Featured Agents:', featuredAgents);

  return (
    <div>
      <h2 className="text-blue-500 text-center">Our Agents</h2>
      <p className="font-bold text-black text-center">Meet Our Professional Agents</p>

      <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAgents.map((agent) => {
          return (
            <div key={agent.id} className="block group">
              
                <div className="relative w-full h-64">
                  <Image
                    src={agent.image_url} // Updated to use the agent's image
                    alt={agent.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
                
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
                  {agent.name}
                </h3>
                <p className="text-md text-black">{agent.role}</p>
                <div className="flex justify-center space-x-4 mt-2">
                <div className=" bg-blue-200 flex space-x-4 mt-4 md:mt-0">

{/* Social Media Icons */}
<Link href={agent.facebook} className=" hover:text-blue-600" aria-label="Facebook">
    <FaFacebook className=" w-5 h-5 md:w-6 md:h-6" />
</Link>
<Link href={agent.twitter} className="  hover:text-blue-400" aria-label="X">
    <FaTwitter className=" w-5 h-5 md:w-6 md:h-6" />
</Link>
<Link href={agent.instagram} className="  hover:text-pink-500" aria-label="Instagram">
    <FaInstagram className=" w-5 h-5 md:w-6 md:h-6" />
</Link>

</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

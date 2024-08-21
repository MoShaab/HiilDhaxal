import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Agent } from '@/app/lib/definitions';  // Import the Agent type
import Link from 'next/link';

export default async function DisplayAgents({
    featuredAgents,
}: {
    featuredAgents: Agent[];  // Update the type to match the Agent type
}) {
    console.log('Featured Agents:', featuredAgents);

    return (
        <div>
            <h2 className="text-blue-500 text-center">Our Agents</h2>
            <p className="font-bold text-black text-center">Meet Our Professional Agents</p>

            <div className="mt-10 ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAgents.map((agent) => {
                    return (
                        <Link href={agent.social_media.facebook} key={agent.id}>
                            <div className="block group">
                                <div className="relative w-full h-64">
                                    <Image
                                        src={agent.image_url}  // Use the agent's specific image URL
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
                                        <Link href={agent.social_media.facebook} className="text-blue-600" aria-label="Facebook">
                                            <i className="fab fa-facebook-f"></i>
                                        </Link>
                                        <Link href={agent.social_media.instagram} className="text-pink-500" aria-label="Instagram">
                                            <i className="fab fa-instagram"></i>
                                        </Link>
                                        <Link href={agent.social_media.twitter} className="text-blue-400" aria-label="Twitter">
                                            <i className="fab fa-twitter"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

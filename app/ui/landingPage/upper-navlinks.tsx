'use client';

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const links = [
    { name: 'Any Questions? Call Us: 0740 749 907 or 0768 463 768', href: 'tel:0740749907', icon: PhoneIcon },
    { name: 'Email: info@silveroakrealestate.co.ke', href: 'mailto:info@silveroakrealestate.co.ke', icon: EnvelopeIcon }
];

export default function UpperNavlinks() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-7 bg-gray-800 text-white">
            
            {/* Contact Links */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center md:text-left">
                {links.map((link) => {
                    const LinkIcon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center gap-2 rounded-md p-2 md:p-3 text-xs md:text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
                        >
                            <LinkIcon className='w-5 h-5 md:w-6 md:h-6' />
                            <p className="block">{link.name}</p>
                        </Link>
                    );
                })}
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
                {/* Social Media Icons */}
                <Link href="http://facebook.com/silveroakrealestate" className="text-white hover:text-blue-600" aria-label="Facebook">
                    <FaFacebook className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
                <Link href="https://x.com" className="text-white hover:text-blue-400" aria-label="X">
                    <FaTwitter className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
                <Link href="https://www.instagram.com/silveroakrealestate/" className="text-white hover:text-pink-500" aria-label="Instagram">
                    <FaInstagram className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
                <Link href="https://www.youtube.com/channel/UC-tMhaxlMOvjnjEC9aRMqIw" className="text-white hover:text-red-600" aria-label="YouTube">
                    <FaYoutube className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
            </div>

        </div>
    );
}

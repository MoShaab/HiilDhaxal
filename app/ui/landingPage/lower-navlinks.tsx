'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    NewspaperIcon,
    HomeIcon,
} from '@heroicons/react/24/outline';

const links = [
    { name: 'Blog', href: '/blog', icon: NewspaperIcon },
    { name: 'SELL MY PROPERTY', href: '/sell_property', icon: HomeIcon }
];

export default function LowerNav() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <Image src="/logo.png" width={200} height={200} alt="Logo" />
            </Link>
           
            {/* Links displayed on desktop */}
            <div className="hidden md:flex space-x-3">
                {links.map((link) => {
                    const LinkIcon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center space-x-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${pathname === link.href ? 'bg-blue-700' : 'bg-gray-500'}`}
                        >
                            <LinkIcon className="w-6" />
                            <p className="block">{link.name}</p>
                        </Link>
                    );
                })}
            </div>

            {/* Breadcrumbs displayed on mobile */}
            <div className="flex md:hidden mt-4 space-x-2 text-sm text-blue-600">
                {links.map((link) => (
                    <Link key={link.name} href={link.href} className="flex items-center space-x-1">
                        <p className="block">{link.name}</p>
                        {pathname !== link.href && <span>/</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
}

import Image from 'next/image';
import Link from 'next/link';

import {
    UserCircleIcon,
    HomeIcon,
    DocumentTextIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

const links = [
    { name: 'Qormo', href: '/blog', icon: DocumentTextIcon },
    { name: 'Taageer Mashruucaan', href: 'https://www.paypal.com/donate/?hosted_button_id=RC3WBWZ9GNTSU', icon: HeartIcon }
];

export default function LowerNav() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <Image src="/logo.png" width={80} height={80} alt="Logo" />
            </Link>

            {/* Links displayed on desktop */}
            <div className="hidden md:flex space-x-3">
                {links.map((link) => {
                    const LinkIcon = link.icon;

                    // Check if the link should open in the same tab
                    const isSameTab = link.name === 'Qormo';

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            target={isSameTab ? undefined : '_blank'}
                            rel={isSameTab ? undefined : 'noopener noreferrer'}
                            className="flex items-center space-x-2 bg-gray-500 hover:bg-blue-700 text-white font-small py-3 px-5 rounded"
                        >
                            <LinkIcon className="w-6" />
                            <p className="block">{link.name}</p>
                        </Link>
                    );
                })}
            </div>

            {/* Links displayed on mobile */}
            <div className="flex md:hidden mt-4 space-x-2 text-sm text-blue-600">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center space-x-1 p-2 bg-gray-100 hover:bg-blue-200 rounded"
                    >
                        <p className="block">{link.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

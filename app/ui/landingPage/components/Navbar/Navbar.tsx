'use client';
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signindialog from './Signindialog';
import Image from 'next/image';

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Guriga', href: '/', current: false },
    { name: 'Nagu Saabsan', href: '/#about-section', current: false },
    { name: 'Contact', href: '/#footer-section', current: false },
    { name: 'Rug Bandhig', href: '/#gallery-section', current: false},
    { name: 'Qormo', href: '/blog', current: false },
    { name: 'Taageer Mashruucaan', href: 'https://www.paypal.com/donate/?hosted_button_id=RC3WBWZ9GNTSU', current: false}
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



const Navbar = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Disclosure as="nav" className="navbar ">
            <>
                <div className="mx-auto mt-10 max-w-7xl p-3 md:p-6 lg:px-8">
                    <div className="relative flex h-3 sm:h-2 items-center">
                        <div className="flex flex-1 items-center sm:justify-between">

                            {/* LOGO */}
                            

                            <div className="flex sm:hidden flex-shrink-0 items-center">
                            <div className="w-[80px] h-[35px] relative">
                            <Image 
                                src="/logo.png" 
                                alt="Logo" 
                                fill 
                                className="object-contain"
                            />
                            </div>
                            </div>
                            <div className="hidden sm:flex flex-shrink-0 items-center">
                            <Image src="/logo.png" width={80} height={65} alt="Logo" />
                                    
                                <Link href="/" className='text-2xl font-semibold text-black'>
                                    
                                    HiilDhaxal.
                                </Link>
                            </div>

                            {/* LINKS */}

                            <div className="hidden lg:flex items-center ">
                                <div className="flex justify-end space-x-4">
                                    {navigation.map((item) => 
                                    
                                    (
                                        
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            target={item.name === 'Taageer Mashruucaan' ? '_blank' : undefined}
                                            rel={item.name === 'Taageer Mashruucaan' ? 'noopener noreferrer' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-black' : 'navlinks hover:opacity-100',
                                                'px-3 py-4 rounded-md text-lg font-normal opacity-50 hover:text-black space-links'
                                            )}
                                            aria-current={item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>

                            </div>
                          
                        </div>

                        {/* DRAWER FOR MOBILE VIEW */}

                        {/* DRAWER ICON */}

                        <div className='block lg:hidden'>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
                        </div>

                        {/* DRAWER LINKS DATA */}

                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>

                    </div>
                </div>
            </>
        </Disclosure>
    )
}

export default Navbar;

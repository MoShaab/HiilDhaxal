import Link from "next/link";
import Image from "next/image";
import {
    PhoneIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';
import TrustBox from './reviews'

interface ProductType {
    id: number;
    section: string;
    links: string[];
}

interface socialLinks {
    imgSrc: string;
    link: string;
    width: number;
}

const socialLinks: socialLinks[] = [
    {
        imgSrc: '/images/Footer/facebook.svg',
        link: 'https://www.facebook.com/profile.php?id=61571088016466',
        width: 10
    },
    {
        imgSrc: '/images/Footer/insta.svg',
        link: 'https://tiktok.com/@hiil_dhaxal',
        width: 14
    },
    {
        imgSrc: '/images/Footer/twitter.svg',
        link: 'https://x.com/dhaxal31420',
        width: 14
    },

]

const products: ProductType[] = [
    {
        id: 1,
        section: "Bogga",
        links: ['Ku saabsan', 'Taariikhda', 'Dhaqanka', 'Farshaxanka', 'Cuntada'],
    },
    {
        id: 2,
        section: "Xiriir",
        links: ['Nala soo xiriir', 'Tabarucaad', 'Iskaashi', 'Warbaahinta', 'FAQ']
    },
    {
        id: 3,
        section: "Wax-kale",
        links: ['Maktabadda', 'Muuqaalada', 'Dhacdooyinka', 'Waxbarashada']
    }
]

const footer = () => {
    return (

        <div id = "footer-section" className=" mx-auto max-w-2xl pt-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="my-12 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12">

                {/* COLUMN-1 */}

                <div className='sm:col-span-6 lg:col-span-5'>
                    <div className="flex flex-shrink-0 items-center border-right">
                        <Image src="/images/Logo/icon.png" alt="logo" width={56} height={56} />
                        <Link href="/" className='text-2xl font-semibold text-black ml-4'>
                            HiilDhaxal
                        </Link>
                    </div>
                    <h3 className='text-textbl text-xs font-medium mt-5 mb-4 lg:mb-16'>Waxaannu ku faanaynaa Soomaalinimada, haddaa nahay <br />jiilka maanta iyo kuwa berri.</h3>
                    <TrustBox />
                    <div className='flex gap-4'>

                        {socialLinks.map((items, i) => (
                        <Link href={items.link} key={i}>
                            <div className="bg-white h-10 w-10 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-pink">
                                <Image src={items.imgSrc} alt={items.imgSrc} width={items.width} height={2} className="sepiaa" />
                            </div>
                        </Link>
                        ))}

                    </div>
                    <div className  = "mt-5 flex">
                    <PhoneIcon className = "text-gray-900 w-6" />
                        
                        <p>+254729111768</p>
                    
                    </div>
                    <div className  = "mt-5 flex">
                    <EnvelopeIcon className = "text-gray-900 w-6 mr-1" />
                        <p>info@hiildhaxal.online</p>
                    </div>
                </div>

                {/* CLOUMN-2/3/4 */}


                {products.map((product) => (
                    <div key={product.id} className="sm:col-span-2">
                        <p className="text-black text-xl font-semibold mb-9">{product.section} </p>
                        <ul>
                            {product.links.map((link: string, index: number) => (
                                <li key={index} className='mb-5'>
                                    <Link 
                                            href={`/#${link.toLowerCase().replace(/ /g, '-')}`} 
                                            className="text-footerlinks text-base font-normal mb-6 space-links"
                                        >
                                            {link}
                                        </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

            {/* All Rights Reserved */}

            <div className='py-10 md:flex items-center justify-between border-t border-t-bordertop'>
                <h4 className='text-darkgrey text-sm text-center md:text-start font-normal'>@2025 - HiilDhaxal: Built with ❤️ by Mohamed A. Hassan</h4>
                <div className="flex gap-5 mt-5 md:mt-0 justify-center md:justify-start">
                    <h4 className='text-darkgrey text-sm font-normal'><Link href="/privay" target="_blank">Privacy policy</Link></h4>
                    <div className="h-5 bg-bordertop w-0.5"></div>
                    <h4 className='text-darkgrey text-sm font-normal'><Link href="/terms" target="_blank">Terms & conditions</Link></h4>
                </div>
            </div>
        </div>
    )
}

export default footer;

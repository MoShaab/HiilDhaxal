"use client"
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Fade } from "react-awesome-reveal";


interface cardDataType {
    imgSrc: string;
    heading: string;
    subheading: string;
    link: string;
}

const cardData: cardDataType[] = [
    {
        imgSrc: '/images/Features/hiddo.svg',
        heading: "Hiddiyo Dhaqan",
        subheading: "Waxay muujinaysaa sida ay u noolyihiin Soomaalida: miyi iyo magaalo.",
        link: '/#gallery-section'
    },
    {
        imgSrc: '/images/Features/khyr.svg',
        heading: "Kheyraadka",
        subheading: "Waxay soo bandhigaysaa nimcada teedsan bad iyo barri ee geyiga Soomaalida.",
        link: '/#gallery-section'
    },
    {
        imgSrc: '/images/Features/suugaanta.svg',
        heading: "Suugaanta",
        subheading: "Gabayo, heeso iyo murtida kale ee Soomaalidu ku tahay hodan.",
        link: '/#gallery-section'
    },
    {
        imgSrc: '/images/Features/history.svg',
        heading: "Taariikhda",
        subheading: "Xasuusin ku saabsan ilbaxnimadii Soomaalidii hore si cashar looga barto maanta.",
        link: '/#gallery-section'
    }

]

const Work = () => {
    return (


        <div>
            <div className='mx-auto max-w-7xl py-40 px-6' id="work-section">
                <div className='text-center mb-14' >
                    <Fade direction={'up'} delay={40} cascade damping={1e-1} triggerOnce={true}>
                        <h3 className='text-pink text-lg font-normal mb-3 ls-51 uppercase'>Guudmar</h3>
                    </Fade>
                    <Fade direction={'up'} delay={80} cascade damping={1e-1} triggerOnce={true}>
                        <p className='text-3xl lg:text-5xl font-semibold text-lightgrey'>Si kooban u eeg  <br /> waxyaabahaan aruurinay.</p>
                    </Fade>
                </div>


                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-32'>
                    <Fade direction={'up'} delay={100} cascade damping={1e-1} triggerOnce={true}>
                        {cardData.map((items, i) => (
                            <div className='card-b p-8 relative rounded-3xl' key={i}>
                                <div className='work-img-bg rounded-full flex justify-center absolute top-[-50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] left-[0%]'>
                                    <Image src={items.imgSrc} alt={items.imgSrc} width={310} height={10} />
                                </div>
                                <h3 className='text-2xl text-black font-semibold text-center mt-16'>{items.heading}</h3>
                                <p className='text-lg font-normal text-black text-center text-opacity-50 mt-2'>{items.subheading}</p>
                                <div className='flex items-center justify-center'>
                                    <Link href={items.link}><p className='text-center text-lg font-medium text-pink mt-2 hover-underline'>Sii Ogow<ChevronRightIcon width={20} height={20} /></p></Link>
                                </div>
                            </div>
                        ))}
                    </Fade>
                </div>
            </div>
        </div>

    )
}

export default Work;

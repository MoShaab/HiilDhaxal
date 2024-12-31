"use client"
import Image from 'next/image';
import { Fade } from "react-awesome-reveal";


const Cook = () => {

    return (
        <div className='relative' id="about-section">
            <div className="mx-auto max-w-7xl lg:pt-20 sm:pb-24 px-6">

                

                <div className='grid grid-cols-1 lg:grid-cols-12 my-16 space-x-5'>

                    <div className='col-span-6 flex justify-start'>
                        <Image src="/images/Cook/about.png" alt="nothing" width={636} height={808} />
                    </div>


                    <div className='col-span-6 flex flex-col justify-center'>
                        <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
                            <h2 className='text-pink text-lg font-normal mb-3 ls-51 uppercase text-start'>hiildhaxal</h2>
                        </Fade>
                        <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}>
                            <h3 className="text-3xl lg:text-5xl font-semibold text-black text-start">
                                Kaydinta Danabaysan ee Dhaxalkeenna.
                            </h3>
                        </Fade>
                        <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
                            <p className='text-grey md:text-lg font-normal mb-10 text-start mt-2'>Waxaanu ku howllannahay in <span className = "text-bold text-pink text-lg">hal meel </span>la iskugu keeno dhammaan agabka ka turjamaya hiddaha, dhaqanka, khayraadka, taariikhda iyo suugaanta Soomaalida. Waxaan u aruurinaynna hab danabaysan si uusan u lumin ama u hallaabin. Tani oo an uga golleennahy iney kor u qaaddo fahamka Soomaalida ee dalkooda ayna kobciso dalxiiska. </p>
                            <p className='text-grey md:text-lg font-normal mb-10 text-start mt-1'>HiilDhaxal waxay u hiillinaysaa jiritaanka Soomaalinimada mar kasta iyo meel kasta.</p>
                            {/* <div className='flex align-middle justify-center md:justify-start'>
                                <button className='text-xl font-medium rounded-full text-white py-5 px-6 bg-pink lg:px-10 mr-6'>Learn more</button>
                            </div> */}
                        </Fade>
                    </div>



                </div>

            </div>
        </div >
    )
}

export default Cook;

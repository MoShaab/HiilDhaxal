// components/Faq.js
'use client';
import Image from 'next/image';
import React, { useState } from 'react';// Optional: install lucide-react icons
import { PlusIcon } from '@heroicons/react/24/outline';

const faqData = [
    
        {
            question: "Waa maxay Hiildhaxal?",
            answer: "Hiildhaxal waa madal dhijitaal ah oo ujeedadeedu tahay kaydinta, kobcinta, iyo faafinta dhaqanka iyo hiddaha Soomaaliyeed."
        },
        {
            question: "Hiildhaxal ma laga heli karaa caalamka oo dhan?",
            answer: "Haa, Hiildhaxal waxaa si fudud looga heli karaa dunida dacaladeeda iyadoo loo marayo internet-ka."
        },
        {
            question: "Maxay Hiildhaxal ka kooban tahay?",
            answer: "Hiildhaxal waxay bixisaa buugaag, heeso dhaqameed, maahmaahyo, taariikh, iyo muuqaallo hidde-dhaqan oo la xiriira Soomaalida."
        },
        {
            question: "Xogtayda shaqsiga ah ma amaan bay ku tahay Hiildhaxal?",
            answer: "Haa, Hiildhaxal waxay isticmaashaa farsamooyin casri ah si ay u sugaan xogtaada si waafaqsan heerarka caalamiga ah ee ammaanka xogta."
        },
        {
            question: "Adeegyada HiilDhaxal ma lacag baa mise waa bilaash?",
            answer: "Adeegyada Hiildhaxal waa bilaash."
        },
        {
            question: "Hiildhaxal ma leedahay qalab cilmi-baaris iyo waxbarasho?",
            answer: "Haa, Hiildhaxal waxay siisaa cilmi-baarayaasha, ardayda, iyo macallimiinta agab waxbarasho oo tayo leh oo ku saabsan hiddaha iyo dhaqanka Soomaaliyeed."
        }
    
    
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id='faq' className=" py-16 text-black">
            <div className="container">
                <div className=" mx-auto px-4">
                    <div className="text-center mb-10">
                        <p className="text-green-400 uppercase text-sm">Suaalaha dadwaynaha inooga yimi</p>
                        <h2 className="text-3xl md:text-4xl font-semibold mt-2">Wax badan ka ogow HiilDhaxal</h2>
                        <p className="text-gray-400 mt-2">We accept 100+ cryptocurrencies around the world</p>
                    </div>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white/5 rounded-lg p-4 cursor-pointer transition-all duration-300"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">{item.question}</h3>

                                    <
                                    PlusIcon
                                    className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                                    width = {20}
                                    height = {20}
                                    />
                                </div>

                                <div
                                    className={`mt-2 text-gray-800 overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 visible' : 'max-h-0 hidden'
                                        }`}
                                >
                                    <p className="py-2">{item.answer}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;

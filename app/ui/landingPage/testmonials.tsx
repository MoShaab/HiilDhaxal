'use client';
import Image from 'next/image';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {lusitana} from '@/app/ui/fonts';


export default function TestimonialSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
    const testimonials = [
      {
        name: "Sahro Elmi",
        image: "/sara.jpg",
        title: "Happy Homeowner",
        review: "Buying my dream home from Silveroak Real Estate was a fantastic experience. The entire process was seamless, and their team was extremely helpful. Highly recommended!",
      },
      {
        name: "David Oloo",
        image: "/david-oloo.jpg",
        title: "Satisfied Buyer",
        review: "Silveroak Real Estate  offered exceptional service and great attention to detail. Their properties are top-notch, and I couldn&apos;t be happier with my new apartment.",
      },
      {
        name: "Jama Nuur",
        image: "/jama.jpg",
        title: "Luxury Property Owner",
        review: "The property I purchased from Silveroak Real Estate  exceeded my expectations. They provided excellent customer service and ensured I got exactly what I was looking for.",
      },
    ];
  
    return (
        <>
      <section className="bg-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            What Our Clients Say About Us
          </h2>
          <p className={`${lusitana.className} text-center text-gray-800 text-xl md:text-xl mt-2`}>
            Hear from clients who have purchased properties from Silveroak Real Estate.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                data-aos="fade-up"
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-lg text-gray-500">{testimonial.title}</p>
                <p className={`${lusitana.className} text-xl md:text-xl text-gray-700`}>&quot;{testimonial.review}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </>
    );
    
  }
  
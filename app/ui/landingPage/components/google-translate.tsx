// 'use client'

// import { useEffect } from 'react'
// import Script from 'next/script'

// declare global {
//   interface Window {
//     google: any;
//     googleTranslateElementInit: any;
//   }
// }

// export default function GoogleTranslate() {
//   useEffect(() => {
//     // Initialize Google Translate after the script loads
//     const initTranslate = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: 'so', // Set Somali as source language
//           includedLanguages: 'en,ar,fr,it', // Add more languages as needed
//           layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//           autoDisplay: false,
//         },
//         'google_translate_element'
//       )
//     }

//     // Add the callback to window object
//     window.googleTranslateElementInit = initTranslate
//   }, [])

//   return (
//     <>
//       <Script
//         src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//         strategy="afterInteractive"
//       />
//       <div 
//         id="google_translate_element" 
//         className="fixed top-4 right-4 z-50"
//       />
//       <style jsx global>{`
//         // Hide Google Translate attribution
//         .goog-logo-link {
//           display: none !important;
//         }
//         .goog-te-gadget {
//           color: transparent !important;
//         }
//         .goog-te-gadget .goog-te-combo {
//           color: black;
//           border: 1px solid #ccc;
//           padding: 4px;
//           border-radius: 4px;
//           background: white;
//         }
//         // Hide the top frame on translated pages
//         .goog-te-banner-frame {
//           display: none !important;
//         }
//         body {
//           top: 0 !important;
//         }
//       `}</style>
//     </>
//   )
// }


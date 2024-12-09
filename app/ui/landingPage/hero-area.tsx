
export default  function HeroArea(){


    return(
        <>
   <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Hoyga Hiddaha Soomaaliyeed
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-300">
          Wax badan ka ogow sooyaalikii taariiikheed ee Soomaalida.
        </p>
        <div className="mt-8">
          <a
            href="/properties"
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Sahmi bandhigga
          </a>

        </div>
      </div>
    </section>
  
      
        </>
    )
}

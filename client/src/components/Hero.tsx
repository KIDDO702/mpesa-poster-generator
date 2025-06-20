import HeroBackground from "../assets/images/hero-background.svg";

function Hero() {
  return (
    <div className="mt-10 w-[95%] md:w-[90%] rounded-lg mx-auto bg-gray-200 dark:bg-slate-800 dark:shadow-sm overflow-hidden">
        <div className="relative text-center">
            {/* Background Image */}
            <img src={HeroBackground} alt="hero-image" className="w-full h-[300px] md:h-[300px] object-cover" />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                    Create Stunning M-Pesa Posters in Seconds
                </h1>
                <p className="mt-10 text-lg text-white">
                    Customize → Preview → Download
                </p>
                <a href="#" className="px-6 py-3 mt-3 font-semibold transition rounded-full shadow-md bg-mpesa-green dark:text-blue-900 hover:bg-mpesa-red">
                    Get Started
                </a>
            </div>
        </div>
    </div>
  )
}

export default Hero
import { useState } from "react";
import AuthModal from "../components/AuthModal";

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#121212]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular text-white">
              Smarter Urban Mobility Starts Here
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-gray-400 max-w-md text-left">
              Join us in reducing your carbon footprint by making smarter transport choices. 
              Our platform helps you track your emissions, optimize routes, and gamify your commute.
            </p>
            <p className="text-lg text-gray-400 max-w-md text-left mt-4">
              Ready to make a difference? Get started today!
            </p>
            <div className="flex flex-row gap-4 mt-6">
              <button
                className="px-6 py-3 text-lg text-black rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                Get Started
              </button>
            </div>
          </div>
          <div 
            className="bg-contain bg-center bg-no-repeat rounded-md aspect-square" 
            style={{ backgroundImage: "url('https://img.freepik.com/free-photo/full-shot-people-with-electric-transport-outdoors_23-2149383284.jpg?ga=GA1.1.1434408627.1742753418')" }}
          ></div>

        </div>
      </div>
      {isModalOpen && <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </div>
  );
}

export default Hero;

"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  // Countdown target: July 8, 2025, 00:00:00
  const targetDate = new Date("2025-08-07T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Email waiting list state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Handle email form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (res.status === 409) {
        toast.error("This email is already on the waiting list.");
      } else if (result.success) {
        toast.success("You have been added to the waiting list!");
        setEmail("");
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[url('/branding-bg.jpg')] bg-blend-multiply  bg-neutral-700 bg-cover bg-center text-white min-h-screen flex flex-col">
      <Toaster position="top-center" />

      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Jara" width={110} height={110} />
          </div>
          <nav className="hidden md:flex space-x-8">
          </nav>
          <div className="md:hidden">
           
          </div>
        </div>
      </header>


      <main className="flex-grow flex items-center relative overflow-hidden">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-500 opacity-20 floating"></div>
          <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-yellow-500 opacity-20 floating-slow"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-pink-500 opacity-20 floating-slower"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-green-300 opacity-20 floating"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex justify-center gap-12 items-center">
            <div className="text-center md:text-left flex flex-col items-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight md:w-3/4 text-center">
                Something <span className="text-transparent bg-clip-text bg-[#FBA812] kaushan text-7xl">Amazing</span> is Coming Soon
              </h1>
              <p className="text-lg md:text-xl text-white mb-8 max-w-lg text-center mx-auto md:mx-0">
                We're working hard to bring you our new platform. Sign up to be the first to know when we launch and get exclusive early access.
              </p>


              <div className="grid grid-cols-4 gap-4 max-w-md text-center mx-auto md:mx-0 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 ">
                  <div className="text-white ">Days</div>
                  <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white ">Hours</div>
                  <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white ">Minutes</div>
                  <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white ">Seconds</div>
                  <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                </div>
              </div>

              <div className="max-w-md mx-auto md:mx-0">
                <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/10 backdrop-blur-sm border border-white/20"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg font-medium transition-all duration-200 whitespace-nowrap"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Notify Me"}
                  </button>
                </form>
                <p className="text-xs text-indigo-300 mt-3">
                  We respect your privacy. No spam, ever. Unsubscribe anytime.
                </p>
              </div>


              <div className="mt-10 flex justify-center md:justify-start space-x-6">
                <a href="#" className="text-indigo-300 hover:text-black transition-colors duration-200">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-indigo-300 hover:text-black transition-colors duration-200">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-indigo-300 hover:text-black transition-colors duration-200">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-indigo-300 hover:text-black transition-colors duration-200">
                  <i className="fab fa-linkedin-in text-xl"></i>
                </a>
              </div>
            </div>


            {/* <div className="hidden md:block">
              <div className="relative">
                
                <Image
                  src="/rebranding.svg"
                  alt="Illustration"
                  className="relative z-10 mx-auto floating-slow"
                  width={600}
                  height={600}
                />
              </div>
            </div> */}
          </div>
        </div>
      </main>


      <footer className="container mx-auto px-4 py-4 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="text-sm text-white">
            &copy; 2025 Jara. All rights reserved.
          </div>
        
        </div>
      </footer>
    </main>
  );
}

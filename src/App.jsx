import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Plane , Facebook , CircleUserRound , Github , MapPin , Calendar , Users , Share2} from 'lucide-react';
import AppHomeMake from './AppHomeMake';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [click , setClick] = useState(false)
  const vite_react_Class = "text-7xl font-bold bg-gradient-to-r from-[#A378B5]  to-cyan-400 w-150 bg-clip-text text-transparent"

  const features = [
    {
      icon: MapPin,
      title: 'Add Destinations',
      description: 'Search and add locations to your itinerary with map integration',
    },
    {
      icon: Calendar,
      title: 'Schedule Your Trip',
      description: 'Set dates and times for each destination with timeline view',
    },
    {
      icon: Users,
      title: 'Travel with Friends',
      description: 'Add companions and collaborate on your travel plans',
    },
    {
      icon: Share2,
      title: 'Share Your Journey',
      description: 'Generate shareable links to show your trip to others',
    },
  ];

  return (
    <div>
      <div className="text-center bg-gradient-to-r from-blue-100 via-white to-cyan-100 w-screen min-h-screen"> {/*from-[#A378B5] via-white to-cyan-200*/}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between item-center">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                  <Plane className="w-8 h-8 text-white"/>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  OnMyWay
                </h1>
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-10 items-center pr-20">
                    <a href="" className="text-xl">
                      Home
                    </a>
                    <a href="" className="text-xl">
                      About
                    </a>
                    <a href="" className="text-xl">
                      Trip
                    </a>
                  </div>
                <a href="https://www.facebook.com/natee.saetae?locale=th_TH" target="_blank" className="bg-blue-600   p-2 rounded-full shadow-lg hover:-translate-y-1 duration-200 hover:shadow-2xl">
                  <Facebook className="text-white w-8 h-8"/>
                </a>
                <button>
                  <Facebook className="text-black w-5 h-5"/>
                </button>
                <a href="https://github.com/NateeSaetae" target="_blank" className="bg-black p-2 rounded-full shadow-lg hover:-translate-y-1 duration-200 hover:shadow-2xl">
                  <Github className="text-white w-8 h-8"/>
                </a>
                <a className="bg-gray-300 p-2 rounded-full shadow-lg hover:-translate-y-1 duration-200 hover:shadow-2xl">
                  <CircleUserRound className="text-white w-8 h-8"/>
                </a>
              </div>
            </div>
          </div>
        </header>
        {/*<AppHomeMake/>*/}

        {/*Hero Section*/}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="tect-center justify-center">
              <h1 className="md:text-7xl font-bold text-gray-900 mb-6">
                Plan Your Trip
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent h-20">
                  OnMyWay
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create detailed travel itineraries, organize your destinations, and share your journey with friends. Turn your travel dreams into perfectly planned adventures.
              </p>
              <div className="text-center my-5">
                <button
                  onClick={() => setClick(true)}
                  className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full px-8 py-4 shadow-lg hover:-translate-y-1.5 duration-200 hover:to-cyan-500 hover:from-blue-600 hover:shadow-xl transform transition-all cursor-pointer"
                  >
                    Start Planning Now
                </button>
              </div>
              <div className="mt-20">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Planning your next adventure?
                    <span className="block mt-2">
                      Let's make it fun and easy!
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed mt-5">
                    Mark your favorite places, set the date and time for each stop, arrange your travel timeline, jot down notes, and share your plan with someone special — all in one beautiful, simple tool.
                  </p>
                </div>
                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((features , index) => (
                    <div key={index}
                      className="bg-gray-50 p-7 rounded-2xl shadow-xl hover:-translate-y-1.5 duration-200">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl text-white">
                          <features.icon></features.icon>
                        </div >
                        <h1 className="pl-3 text-xl font-semibold text-gray-800">
                          {features.title}
                        </h1>
                      </div>
                      <p className="text-gray-600 leading-relaxed mt-5 text-left">
                          {features.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <footer className="bg-gray-900 py-5 px-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="block items-center justify-center text-center text-md text-white">
              <p>
                Released under the MIT License.
              </p>
              <p>
                © 2025 Natee Saetae. for my web dev study
              </p>
            </div>
          </div>
        </footer>
    </div>


    
  )
}

export default App

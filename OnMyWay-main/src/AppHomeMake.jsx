import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Plane , Facebook , CircleUserRound , Github , MapPin , Calendar , Users , Share2} from 'lucide-react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Trip from './component/page/Trip';
import { useNavigate } from 'react-router-dom';
import './App.css'

function AppHomeMake() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  const openTrip = () => {
    if(token){
      navigate('/trip');
    }else{
      navigate('/login');
    }
  }

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
      <div className="text-center bg-gradient-to-r from-blue-100 via-white to-cyan-100 w-screen min-h-screen">
        {/*Hero Section*/}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="tect-center justify-center">
              <h1 className="md:text-7xl font-bold text-gray-900 md:mb-6 text-4xl">
                Plan Your Trip
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent h-22">
                  OnMyWay
                </span>
              </h1>
              <p className="md:text-xl text-md text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Create detailed travel itineraries, organize your destinations,
                and share your journey with friends. Turn your travel dreams
                into perfectly planned adventures.
              </p>
              <div className="text-center my-5">
                <button
                  onClick={() => openTrip()}
                  className="md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full md:px-8 md:py-4 px-5 py-3 shadow-lg hover:-translate-y-1.5 duration-200 hover:to-cyan-500 hover:from-blue-600 hover:shadow-xl transform transition-all cursor-pointer text-md"
                >
                  Start Planning Now
                </button>
              </div>
              <div className="md:mt-20 mt-10">
                <div className="text-center">
                  <h1 className="md:text-4xl text-2xl font-bold text-gray-900">
                    Make Planning Your Trip
                    <span className="block mt-2">Fun And Easy.</span>
                  </h1>
                  <p className="md:text-xl text-md text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed mt-5">
                    Plan your trip. Choose your destination, set your dates,
                    save your important stuff, and share it with your special
                    someone
                  </p>
                </div>
                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((features, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-7 rounded-2xl shadow-lg hover:-translate-y-1.5 hover:shadow-xl duration-200"
                    >
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl text-white">
                          <features.icon></features.icon>
                        </div>
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
      <Footer />
    </div>
  );
}

export default AppHomeMake;
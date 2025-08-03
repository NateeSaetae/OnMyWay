import { useEffect, useRef, useState } from "react";
import { Plane , Facebook , CircleUserRound , Github , MapPin , Calendar , Users , Share2} from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import Trip from './page/Trip';
import About from './page/about';
import { useRecoilState } from "recoil";
import { userAtom } from "./AtomList/OMWAtom";

function Navbar() {
    const tailwind_Navbar_menu = "font-semibold text-gray-800 duration-100 hover:text-blue-500"
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [user, setUser] = useRecoilState(userAtom);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
    }

    console.log(token);
    

    return (
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40 w-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between item-center">
            <Link to="/">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl hover:-translate-y-1 duration-200 hover:shadow-xl">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  OnMyWay
                </h1>
              </div>
            </Link>
            <div className="flex space-x-2 justify-center items-center">
              <div className="flex space-x-6 items-center pr-20 text-lx">
                <Link to="/" className={tailwind_Navbar_menu}>
                  Home
                </Link>
                <Link to="/About" className={tailwind_Navbar_menu}>
                  About
                </Link>
                <Link to="/Trip" className={tailwind_Navbar_menu}>
                  Trip
                </Link>
              </div>
              <a
                href="https://www.facebook.com/natee.saetae?locale=th_TH"
                target="_blank"
                className="bg-blue-600 shadow-lg hover:-translate-y-1 duration-200 hover:shadow-2xl items-center flex w-10 h-10 justify-center rounded-full"
              >
                <Facebook className="text-white w-5 h-5" />
              </a>
              <a
                href="https://github.com/NateeSaetae"
                target="_blank"
                className="bg-black shadow-lg hover:-translate-y-1 duration-200 hover:shadow-2xl items-center flex w-10 h-10 justify-center rounded-full"
              >
                <Github className="text-white w-5 h-5" />
              </a>
              <a className="bg-gray-300 shadow-lg hover:-translate-y-1 duration-200 hover:shadow-2xl items-center flex w-10 h-10 justify-center rounded-full">
                <CircleUserRound className="text-white w-8 h-8" />
              </a>
              {token ? <h1 className="font-bold">{user.user_name}</h1> : ""}
              {!token ? (
                <div className="flex space-x-3 ml-5 font-semibold">
                  <Link to="/login">
                    <button className="shadow-lg px-3 py-2 rounded-xl duration-200 hover:-translate-y-0.5 hover:bg-gray-200 cursor-pointer mr-3">
                      Log in
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-2 rounded-xl text-white duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                      Sign up
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex space-x-3 ml-5 font-semibold">
                  <button
                    className="shadow-lg px-3 py-2 rounded-xl duration-200 hover:-translate-y-0.5 hover:bg-gray-200 cursor-pointer"
                    onClick={() => isLogout()}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
}

export default Navbar;
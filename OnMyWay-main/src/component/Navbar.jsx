import { useState } from "react";
import {
  Plane,
  Facebook,
  CircleUserRound,
  Github,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "./AtomList/OMWAtom";

function Navbar() {
  const tailwind_Navbar_menu =
    "font-semibold text-gray-800 duration-100 hover:text-blue-500";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useRecoilState(userAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-50">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl hover:-translate-y-1 duration-200 hover:shadow-xl">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            OnMyWay
          </h1>
        </Link>

        {/* Hamburger for mobile */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center text-lg">
          <Link to="/" className={tailwind_Navbar_menu}>
            Home
          </Link>
          <Link to="/About" className={tailwind_Navbar_menu}>
            About
          </Link>
          <Link to="/Trip" className={tailwind_Navbar_menu}>
            Trip
          </Link>

          <a
            href="https://www.facebook.com/natee.saetae?locale=th_TH"
            target="_blank"
            className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/NateeSaetae"
            target="_blank"
            className="bg-black w-10 h-10 rounded-full flex items-center justify-center text-white"
          >
            <Github className="w-5 h-5" />
          </a>
          <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center">
            <CircleUserRound className="text-white w-8 h-8" />
          </div>
          {token ? <h1 className="font-bold">{user.user_name}</h1> : ""}

          {!token ? (
            <div className="flex space-x-3 ml-5 font-semibold">
              <Link to="/login">
                <button className="shadow px-3 py-2 rounded-xl hover:bg-gray-200">
                  Log in
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-3 py-2 rounded-xl hover:shadow-lg">
                  Sign up
                </button>
              </Link>
            </div>
          ) : (
            <button
              onClick={isLogout}
              className="shadow px-3 py-2 rounded-xl hover:bg-gray-200"
            >
              Log out
            </button>
          )}
        </div>

        {/* Mobile menu drawer */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-0 right-0 h-screen w-40 bg-white z-40 p-6 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={tailwind_Navbar_menu}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/About"
                className={tailwind_Navbar_menu}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/Trip"
                className={tailwind_Navbar_menu}
                onClick={() => setIsMenuOpen(false)}
              >
                Trip
              </Link>
              <div className="flex space-x-3 mt-4">
                <a
                  href="https://facebook.com/natee.saetae"
                  target="_blank"
                  className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white"
                >
                  <Facebook />
                </a>
                <a
                  href="https://github.com/NateeSaetae"
                  target="_blank"
                  className="bg-black w-10 h-10 rounded-full flex items-center justify-center text-white"
                >
                  <Github />
                </a>
              </div>
              {token ? (
                <>
                  <h1 className="font-bold">{user.user_name}</h1>
                  <button
                    onClick={isLogout}
                    className="text-left hover:text-red-500"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

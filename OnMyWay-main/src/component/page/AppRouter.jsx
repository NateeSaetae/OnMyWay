import { BrowserRouter as Router, Routes, Route ,useLocation } from "react-router-dom";
import AppHomeMake from "../../AppHomeMake";
import Navbar from "../Navbar";
import Trip from "./Trip";
import About from "./about";
import LoginPage from "./loginPage";
import Register from "./register";
import "react-toastify/dist/ReactToastify.css";


function AppRouter() {
    const location = useLocation();
    const isLocation = location.pathname === "/login";
    const isRegister = location.pathname === "/register"
  return (
    <>
      {!isLocation && !isRegister && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<AppHomeMake />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/trip"
          element={
            <Trip
              src="./image/Trip_2.png"
              alt="Beach"
              className="w-screen md:h-100 h-60 object-cover"
            />
          }
        />
      </Routes>
    </>
  );
}

export default AppRouter;

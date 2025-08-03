import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./component/page/AppRouter";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <AppRouter />
      </Router>
      <ToastContainer
        position="top-right" // ตำแหน่งแสดง
        autoClose={3000} // ปิดเองหลัง 3 วินาที
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;

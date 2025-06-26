import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Plane , Facebook , CircleUserRound , Github , MapPin , Calendar , Users , Share2} from 'lucide-react';
import AppHomeMake from './AppHomeMake';
import Navbar from './component/Navbar';
import Trip from './component/page/Trip';
import About from './component/page/about';
import { RecoilRoot } from 'recoil'
import './App.css'

function App() {

  return (
    <div>
      <RecoilRoot>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<AppHomeMake />} />
            <Route path="/about" element={<About />} />
            <Route path="/trip" element={<Trip src="./image/Trip_2.png" alt="Beach" className="w-screen h-100 object-cover"/>} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>

  )
}

export default App

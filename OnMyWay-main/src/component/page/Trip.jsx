import { useEffect , useRef , useState} from "react";
import { PlaneTakeoff } from 'lucide-react';
import Footer from "../Footer";
import { Search } from 'lucide-react';
import { TripModal } from "./TripModal";

function Trip({src , alt, className=""}) {
    const imgRef = useRef();
    const fontRef = useRef();
    const trip_Bar = useRef();
    const anime_trip = "opacity-0 transition-opacity duration-1000"

    //const [modalCreateTrip , setModalCreateTrip] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const img = imgRef.current;
        const font = fontRef.current;
        const bar = trip_Bar.current;
        if (img && font) {
            requestAnimationFrame(() => {
                img.classList.remove("opacity-0");
                img.classList.add("opacity-100");
                font.classList.remove("opacity-0");
                font.classList.add("opacity-100");
                bar.classList.remove("opacity-0");
                bar.classList.add("opacity-100");
            });
        }
        window.scrollTo(0, 0);
    },[])

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openNewTripModal = () => {
        setIsModalOpen(true);
    };
    
    return (
        <div>
            <div className="text-center bg-gradient-to-r from-blue-100 via-white to-cyan-100 w-screen min-h-screen">
                <div className="relative flex justify-center items-center">
                    
                    <img src={src} alt={alt} className={`${anime_trip} ${className}`}
                    ref={imgRef}/>
                    <div className={`absolute top-10 left-55 text-left text-8xl font-bold px-8 py-6 rounded-xl text-white flex text-shadow-lg/30 ${anime_trip}`} ref={fontRef}>
                        <h1 className="text-black">Your Trip</h1>
                        <span className="ml-25">Your Way</span>
                    </div>
                    <div className="absolute w-screen h-20 bg-white -bottom-9"></div>
                    <div className={`absolute w-175 h-15 flex items-center justify-between top-92 ${anime_trip}`} ref={trip_Bar}>
                        <div className="w-100 h-15 flex items-center relative">
                            <input type="text" placeholder="Search Trip" className="bg-gray-200 rounded-full px-6 py-3 w-100 focus:outline-none"/>
                            <button className="absolute flex right-0 items-center bg-gray-600 px-7 py-3 rounded-full cursor-pointer hover:bg-gradient-to-r from-blue-500 to-cyan-500 duration-200 transform transition-transform"><Search className="text-white"
                            /></button>
                        </div>
                        <div className="w-70 h-15 flex items-center">
                            <button className="flex text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full px-6 py-3 shadow-lg hover:-translate-y-1.5 
                            duration-200 hover:to-cyan-500 hover:from-blue-600 hover:shadow-xl transform transition-all cursor-pointer"
                            onClick={openNewTripModal} ><PlaneTakeoff className="mr-2"/> Create Your Trip</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            <TripModal
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    )
}

export default Trip;
import { useEffect , useRef , useState} from "react";
import {
  PlaneTakeoff,
  Plane,
  Wallet,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Edit,
  Trash,
} from "lucide-react";
import Footer from "../Footer";
import { Search } from 'lucide-react';
import { useRecoilState } from "recoil";
import { tripSubmitAtom, placeNameAtom } from "../AtomList/OMWAtom";
import { TripModal } from "./TripModal";
import axios from 'axios';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Trip({src , alt, className=""}) {
    const imgRef = useRef();
    const fontRef = useRef();
    const trip_Bar = useRef();
    const [trip , setTrip] = useState([]);
    const [editTrips , setEditTrips] = useState(null);
    const [reTrip , setRetrip] = useState(false);
    const [searchTrip , setSearchTrip] = useState("");
    const [tripAtom, setTripAtom] = useRecoilState(tripSubmitAtom);
    const [place, setPlace] = useRecoilState(placeNameAtom);
    const anime_trip = "opacity-0 transition-opacity duration-1000";

    //const [modalCreateTrip , setModalCreateTrip] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalBudget = trip.reduce((sum , trip) => sum + trip.budget, 0);
    const filteredTrips = trip.filter((trip) =>
      trip.tripName?.toLowerCase().includes(searchTrip.toLowerCase())
    );
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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

    useEffect(() => {
      console.log(trip);
      fetchTrip();
      if(reTrip){
        setRetrip(false)
      }
    }, [tripAtom,reTrip]);

    console.log(trip)
    
    const closeModal = () => {
        setIsModalOpen(false);
        setRetrip(false);
    };

    const openNewTripModal = () => {
        if(token){
          setEditTrips(null);
          setIsModalOpen(true);
        }else{
          navigate('/login');
        }
    };

    const editTrip = (trip) => {
      setEditTrips(trip);
      setRetrip(true)
      setIsModalOpen(true)
    };

    const handleDeleteTrip = async (trip) => {
      try {
        const token = localStorage.getItem('token');
        const result = await Swal.fire({
          title: "Delete Your Trip?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Delete Trip!",
        });

        if (result.isConfirmed) {
          const res = await axios.delete(
            `http://localhost:3000/api/trip/${trip.tripId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status === 201) {
            toast.success("Delete trip success!");
            setRetrip(true);
          } else {
            toast.error("Error Delete Trip!");
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    console.log("testDeit", editTrips);

    const fetchTrip = async() => {
        try {
          const token = localStorage.getItem('token');
          //const userId = parseInt(localStorage.getItem('userId'));
          const res = await axios.get("http://localhost:3000/api/trips", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            setTrip(res.data);
            //setPlace(res.data.place);
        }catch(e){
            console.error("Error fetching trips:", error);
        }
    }

    const getDuration = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const difTime = Math.abs(end.getTime() - start.getTime());
      const difDay = Math.ceil(difTime / (1000 * 60 * 60 * 24));
      return difDay;
    };

    const formatBudget= (budget) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency:"USD",
        minimumFractionDigits: 0,
      }).format(budget);
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        month:'short',
        day:'numeric',
        year:'numeric',
      })
    }

    
    return (
      <div>
        <div className="text-center bg-gradient-to-r from-blue-100 via-white to-cyan-100 w-screen min-h-screen">
          <div className="relative flex justify-center items-center">
            <img
              src={src}
              alt={alt}
              className={`${anime_trip} ${className}`}
              ref={imgRef}
            />
            <div
              className={`absolute text-left text-8xl font-bold px-8 py-6 rounded-xl text-white flex text-shadow-lg/30 ${anime_trip}`}
              ref={fontRef}
            >
              <h1 className="text-black">Your Trip</h1>
              <span className="ml-25">Your Way</span>
            </div>
            <div className="absolute w-screen h-20 bg-white -bottom-9"></div>
            <div
              className={`absolute w-175 h-15 flex items-center justify-between top-92 ${anime_trip}`}
              ref={trip_Bar}
            >
              <div className="w-100 h-15 flex items-center relative">
                <input
                  type="text"
                  placeholder="Search Trip"
                  className="bg-gray-200 rounded-full px-6 py-3 w-100 focus:outline-none"
                  value={searchTrip}
                  onChange={(e) => setSearchTrip(e.target.value)}
                />
                <button className="absolute flex right-0 items-center bg-gray-600 px-7 py-3 rounded-full cursor-pointer hover:bg-gradient-to-r from-blue-500 to-cyan-500 duration-200 transform transition-transform">
                  <Search className="text-white" />
                </button>
              </div>
              <div className="w-70 h-15 flex items-center">
                <button
                  className="flex text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full px-6 py-3 shadow-lg hover:-translate-y-1.5 
                            duration-200 hover:to-cyan-500 hover:from-blue-600 hover:shadow-xl transform transition-all cursor-pointer"
                  onClick={openNewTripModal}
                >
                  <PlaneTakeoff className="mr-2" /> Create Your Trip
                </button>
              </div>
            </div>
          </div>
          {trip.length > 0 ? (
            <div className="w-screen h-50 bg-white/80 flex justify-center gap-25 items-center mt-9">
              <div className="w-100 h-30 bg-blue-400 rounded-xl flex justify-center items-center gap-2 shadow-xl">
                <div className="w-18 h-18 bg-white flex justify-center items-center rounded-xl">
                  <Calendar className="w-12 h-12 text-blue-400" />
                </div>
                <div className="w-60 h-25 block">
                  <div className="w-full h-1/2 flex justify-start items-end pb-2 pl-2">
                    <h1 className="text-md font-bold text-white">
                      Total Trips:
                    </h1>
                  </div>
                  <div className="w-full h-1/2 flex justify-start items-start">
                    <h1 className="text-4xl font-bold pl-2 text-white">
                      {trip.length}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-100 h-30 bg-blue-400 rounded-xl flex justify-center items-center gap-2 shadow-xl">
                <div className="w-18 h-18 bg-white flex justify-center items-center rounded-xl">
                  <Wallet className="w-12 h-12 text-blue-400" />
                </div>
                <div className="w-60 h-25  block">
                  <div className="w-full h-1/2  flex justify-start items-end pb-2 pl-2">
                    <h1 className="text-md font-bold text-white">
                      Total Budget:
                    </h1>
                  </div>
                  <div className="w-full h-1/2  flex justify-start items-start">
                    <h1 className="text-4xl font-bold pl-2 text-white">
                      {formatBudget(totalBudget)}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-100 h-30 bg-blue-400 shadow-2xl rounded-xl flex justify-center items-center gap-2">
                <div className="w-18 h-18 bg-white flex justify-center items-center rounded-xl">
                  <Plane className="w-12 h-12 text-blue-400" />
                </div>
                <div className="w-60 h-25 block">
                  <div className="w-full h-1/2 flex justify-start items-end pb-2 pl-2">
                    <h1 className="text-md font-bold text-white">
                      Total Trips:
                    </h1>
                  </div>
                  <div className="w-full h-1/2 flex justify-start items-start">
                    <h1 className="text-4xl font-bold pl-2 text-white">1</h1>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/*  display Trip */}
          {trip.length === 0 ? (
            <div className="mt-50 text-5xl font-bold space-y-4 text-gray-300">
              <h1>Start Create Your Trip on "Your Way"</h1>
              <h1>
                By Cilck <span className="text-blue-300">Create Your Trip</span>
              </h1>
            </div>
          ) : (
            <div className="w-screen grid grid-cols-3 gap-15 mt-5 ml-10 pb-15">
              {filteredTrips.map((trips, index) => (
                <div
                  key={index}
                  className="w-120 h-80 bg-blue-300 rounded-xl shadow-2xs duration-200 hover:-translate-y-1.5 cursor-pointer hover:shadow-xl block group transition-all"
                >
                  <div className="relative w-full h-1/3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-xl flex justify-start items-end px-10 pb-2">
                    <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex">
                      <button
                        onClick={() => editTrip(trips)}
                        className="bg-white/40 backdrop-blur-sm rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/80 cursor-pointer duration-200 mr-2"
                      >
                        <Edit className="w-5 h-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trips)}
                        className="bg-white/40 backdrop-blur-sm rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/80 cursor-pointer duration-200"
                      >
                        <Trash className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                    <div className="flex justify-start items-center">
                      <MapPin className="w-8 h-8 text-white" />
                      <h1 className="text-xl font-semibold text-white flex px-1 mb-2 truncate max-w-90">
                        {trips.tripName}
                      </h1>
                    </div>
                  </div>
                  <div className="w-full h-2/3 bg-white rounded-b-xl block pt-5">
                    <div className="w-full h-2/3 grid grid-cols-2 gap-2 rounded-b-xl">
                      <div className="flex items-center">
                        <Users
                          size={30}
                          className="ml-10 mr-4 text-green-500"
                        />
                        <div>
                          <div className="text-md text-gray-500">People</div>
                          <div className="text-xl font-semibold flex justify-start ">
                            {trips.numberOfPeople}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <DollarSign
                          size={30}
                          className="ml-4 mr-4 text-purple-700"
                        />
                        <div>
                          <div className="text-md text-gray-500">Budget</div>
                          <div className="text-xl font-semibold flex justify-start ">
                            {formatBudget(trips.budget)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar
                          size={30}
                          className="ml-10 mr-4 text-blue-500"
                        />
                        <div>
                          <div className="text-md text-gray-500 flex justify-start">
                            Duration
                          </div>
                          {trips.endDate === "false" ? (
                            <div className="text-xl font-semibold flex justify-start ">
                              One Day Trip
                            </div>
                          ) : (
                            <div className="text-xl font-semibold flex justify-start ">
                              {getDuration(trips.startDate, trips.endDate)} Days
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div>
                          <div className="text-md text-gray-500 flex justify-start">
                            Dates
                          </div>
                          {trips.endDate === "false" ? (
                            <div className="text-md font-semibold flex justify-start ">
                              {formatDate(trips.startDate)}
                            </div>
                          ) : (
                            <div className="text-md font-semibold flex justify-start ">
                              {formatDate(trips.startDate)} -{" "}
                              {formatDate(trips.endDate)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-1/3 flex justify-start items-center px-10 text-md">
                      <div className="truncate max-w-100">
                        {trips.description}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
        <TripModal isOpen={isModalOpen} onClose={closeModal} edit={editTrips} />
      </div>
    );
}

export default Trip;
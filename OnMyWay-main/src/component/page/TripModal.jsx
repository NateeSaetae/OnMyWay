import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { X, MapPin, Calendar, Users, DollarSign, FileText, Plus, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { tripAtom, placeNameAtom, tripSubmitAtom } from "../AtomList/OMWAtom";
import { useRecoilState } from "recoil";
import { ButtonGroup, Button } from '@mui/material';
import { Map } from '../Map';
import axios from 'axios';
import { toast } from "react-toastify";

export const TripModal = ({ isOpen, onClose, edit}) => {
  const [formData, setFormData] = useRecoilState(tripAtom);
  const [place, setPlace] = useRecoilState(placeNameAtom);
  const [tripAtoms, setTripAtoms] = useRecoilState(tripSubmitAtom);
  const [listPlace, setListPlace] = useState("");
  const [errors, setErrors] = useState({});
  const [oneDay, setOneDay] = useState(false);

  useEffect(() => {
    if (edit) {
      setFormData({
        tripName: edit.tripName || "",
        placeName: "",
        description: edit.description || "",
        numberOfPeople: edit.numberOfPeople || 0,
        budget: edit.budget || 0,
        startDate: edit.startDate || "",
        endDate: edit.endDate || "",
        coordinates: edit.coordinates || "",
      });
      if (edit.endDate === "false") {
        setOneDay(true);
      } else {
        setOneDay(false);
      }
      setPlace(edit.place || []);
    } else {
      setFormData({
        tripName: "",
        placeName: "",
        description: "",
        numberOfPeople: 1,
        budget: 0,
        startDate: "",
        endDate: "",
        coordinates: null,
      });
      setListPlace("");
      setOneDay(false);
      setPlace([]);
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(oneDay);

    if (!oneDay) {
      setFormData((prev) => ({
        ...prev,
        startDate: "",
        endDate: "",
      }));
    }
  }, [oneDay]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tripName.trim()) newErrors.tripName = "Trip name is required";
    if (place.length < 1) newErrors.placeName = "Place name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.numberOfPeople < 1)
      newErrors.numberOfPeople = "Number of people must be at least 1";
    if (formData.budget < 0) newErrors.budget = "Budget cannot be negative";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate && !oneDay)
      newErrors.endDate = "End date is required";
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) >= new Date(formData.endDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token');
    const userId = parseInt(localStorage.getItem("userId"));
    e.preventDefault();
    if (validateForm()) {
      try {
        const resBody = {
          tripName: formData.tripName,
          description: formData.description,
          numberOfPeople: formData.numberOfPeople,
          budget: formData.budget,
          startDate: formData.startDate,
          endDate: oneDay ? "false" : formData.endDate,
          place: place,
          userId: userId,
        };
        const res = !edit
          ? await axios.post("http://localhost:3000/api/trips", resBody, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await axios.put(
              `http://localhost:3000/api/trip/${edit.tripId}`,
              resBody,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
        if (res.status === 201) {
          console.log("check your response server.", res.data);
          setTripAtoms((prev) => [...prev, res.data]);
          if (!edit) {
            toast.success("Create trip success!");
          } else {
            toast.success("Update trip success!");
          }
        }
      } catch (e) {
        console.log("error log", e);
        toast.error("Something went wrong!");
      }
      onClose();
    }
  };

  //test
  const testHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      let resBody;
      if (!oneDay) {
        resBody = {
          tripName: "test",
          description: "test",
          numberOfPeople: 2,
          budget: 3000,
          startDate: '2025-07-22',
          endDate: '2025-07-24',
          place: place,
          userId:userId
          //coordinates: formData.coordinates,
        };
      } else {
        resBody = {
          tripName: "test",
          description: "test",
          numberOfPeople: 2,
          budget: 3000,
          startDate: "2025-07-22",
          place: place,
          endDate: "false",
          userId: userId,
          //coordinates: formData.coordinates,
        };
      }
      const res = await axios.post(
        "http://localhost:3000/api/trips",resBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        console.log("check your response server.", res.data);
        setTripAtoms((prev) => [...prev, res.data]);
      }
    } catch (e) {
      console.log("error log", e);
    }
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addPlaceName = () => {
    if (listPlace.trim() === "") return;
    const newPlaces = {
      //id: crypto.randomUUID(),
      text: listPlace,
      //complete: false,
    };
    setPlace((prev) => [...prev, newPlaces]);
    setListPlace("");
  };

  const deletePlace = (id) => {
    setPlace((prve) => prve.filter((place) => place.id !== id));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const temp = [...place];
    [temp[index - 1], temp[index]] = [temp[index], temp[index - 1]];
    setPlace(temp);
  };

  const moveDown = (index) => {
    if (index === place.length - 1) return;
    const temp = [...place];
    [temp[index + 1], temp[index]] = [temp[index], temp[index + 1]];
    setPlace(temp);
  };

  /*const handlePlaceNameChange = (index, value) => {
      const updatedPlaces = [...place];
      updatedPlaces[index].placeName = value;
      setPlace(updatedPlaces);
    };

    const handleLocationSelect = (coords) => {
        handleInputChange('coordinates', coords);
    };*/

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="z-10 fixed inset-0 transition-opacity bg-gray-500/50 bg-opacity-75 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        <div className="z-50 inline-block w-full max-w-2xl px-6 py-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl sm:align-middle relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-gray-900">Plan New Trip</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/*<div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="mr-2 text-red-500" />
                Location on Map
              </label>
              <Map
                coordinates={formData.coordinates}
                onLocationSelect={handleLocationSelect}
                onPlaceNameChange={handlePlaceNameChange}
              />
            </div>*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FileText size={16} className="mr-2 text-blue-500" />
                  Trip Name
                </label>
                <input
                  type="text"
                  value={formData.tripName}
                  onChange={(e) =>
                    handleInputChange("tripName", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.tripName
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter trip name..."
                />
                {errors.tripName && (
                  <p className="mt-1 text-sm text-red-600">{errors.tripName}</p>
                )}
              </div>

              {/*<div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="mr-2 text-green-500" />
                  Place Name
                </label>
                <input
                  type="text"
                  value={formData.placeName}
                  onChange={(e) => handleInputChange('placeName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.placeName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter destination..."
                />
                {errors.placeName && <p className="mt-1 text-sm text-red-600">{errors.placeName}</p>}
              </div>*/}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText size={16} className="mr-2 text-purple-500" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Describe your trip plans..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Users size={16} className="mr-2 text-orange-500" />
                  Number of People
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.numberOfPeople}
                  onChange={(e) =>
                    handleInputChange(
                      "numberOfPeople",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.numberOfPeople
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.numberOfPeople && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.numberOfPeople}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <DollarSign size={16} className="mr-2 text-green-600" />
                  Budget ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.budget}
                  onChange={(e) =>
                    handleInputChange("budget", parseFloat(e.target.value) || 0)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.budget
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
                )}
              </div>
            </div>

            {oneDay ? (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="mr-2 text-blue-600" />
                  Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.startDate
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.startDate}
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} className="mr-2 text-blue-600" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.startDate
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} className="mr-2 text-red-600" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.endDate
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div>
              <label className="text-blue-400 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={oneDay}
                  onChange={(e) => setOneDay(e.target.checked)}
                  className="h-4 w-4 mr-2 cursor-pointer"
                />
                One Day Trip
              </label>
            </div>
            {/*<div className="flex justify-end">
                <button className="px-5 py-3 bg-blue-500 rounded-lg cursor-pointer">
                    <Plus className="text-white"/>
                </button>
            </div>*/}

            <div className="block">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="mr-2 text-green-500" />
                  Place Name
                </label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={listPlace}
                  onChange={(e) =>
                    handleInputChange("placeName", setListPlace(e.target.value))
                  }
                  className={`w-full h-10 mr-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.placeName
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter destination..."
                />
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 rounded-lg cursor-pointer p-2"
                    onClick={addPlaceName}
                    type="button"
                  >
                    <Plus className="text-white" />
                  </button>
                </div>
                {/*<ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                    className="w-1/2 h-8"
                  >
                    <Button>
                      <ChevronUp />
                    </Button>
                    <Button>
                      <ChevronDown />
                    </Button>
                    <Button color="error">
                      <Trash2 />
                    </Button>
                  </ButtonGroup>*/}
              </div>
              {place.map((places, index) => (
                <div
                  key={index}
                  className="flex items-center my-2 bg-gray-100 p-3 rounded-xl justify-between"
                >
                  <div className="flex-1">{places.text}</div>
                  <button
                    className="flex px-2 cursor-pointer"
                    type="button"
                    onClick={() => deletePlace(places.id)}
                  >
                    <Trash2 className="hover:text-red-500 duration-200" />
                  </button>
                  <button
                    className="flex px-2 cursor-pointer"
                    onClick={() => moveUp(index)}
                    type="button"
                  >
                    <ChevronUp className="hover:text-blue-600 duration-200" />
                  </button>
                  <button
                    className="flex px-2 cursor-pointer"
                    onClick={() => moveDown(index)}
                    type="button"
                  >
                    <ChevronDown className="hover:text-blue-600 duration-200" />
                  </button>
                </div>
              ))}
              <div>
                {errors.placeName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.placeName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {edit ? "Update Trip" : "Create Trip"}
              </button>
              <button
                type="submit"
                onClick={testHandleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-medium hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Test
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
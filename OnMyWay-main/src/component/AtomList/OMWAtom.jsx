import { atom } from "recoil";

export const tripAtom = atom({
  key: "tripAtom",
  default: {
    tripName: "",
    placeName: "",
    description: "",
    numberOfPeople: 1,
    budget: 0,
    startDate: "",
    endDate: "",
    coordinates: null,
  },
});

export const placeNameAtom = atom({
  key: "placeNameAtom",
  default: []
});

export const tripSubmitAtom = atom({
  key: "tripSubmitAtom",
  default:[]
});

export const userAtom = atom({
  key: "userAtom",
  default: {}
});
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy7Kq2SuG0Htc-D0EujFQ2Te2W-pNQSoA",
  authDomain: "login-a663b.firebaseapp.com",
  projectId: "login-a663b",
  storageBucket: "login-a663b.firebasestorage.app",
  messagingSenderId: "1095047771072",
  appId: "1:1095047771072:web:385a65ae506eab9a594e25",
  measurementId: "G-X6E8LFNLZN"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
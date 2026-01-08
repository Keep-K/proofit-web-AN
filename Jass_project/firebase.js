// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCDc3vbP740Tg9WloaDxPvrPIikHTvpCs",
  authDomain: "proofit-7a7a4.firebaseapp.com",
  projectId: "proofit-7a7a4",
  storageBucket: "proofit-7a7a4.firebasestorage.app",
  messagingSenderId: "467442863812",
  appId: "1:467442863812:web:81eedd70b224b96ce2c391",
  measurementId: "G-83JTPZG2JP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
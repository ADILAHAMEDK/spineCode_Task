import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLApacYmFpcK7-wnUg6XKoepqT1ON-Ktw",
  authDomain: "spinecode-task.firebaseapp.com",
  projectId: "spinecode-task",
  storageBucket: "spinecode-task.firebasestorage.app",
  messagingSenderId: "674136511413",
  appId: "1:674136511413:web:8996531b83f3af764ebffc",
  measurementId: "G-758Y8EMV0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
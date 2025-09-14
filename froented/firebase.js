// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pizzaapp-f5944.firebaseapp.com",
  projectId: "pizzaapp-f5944",
  storageBucket: "pizzaapp-f5944.firebasestorage.app",
  messagingSenderId: "989989065779",
  appId: "1:989989065779:web:07927a5a8bde5a8ef37f46",
  measurementId: "G-008X1GT4ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app , analytics , auth}
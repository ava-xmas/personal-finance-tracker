import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDb5vykMuGtE8hp8G27lTmEVtteQNk9SXY",
    authDomain: "finance-tracker-8ec9e.firebaseapp.com",
    projectId: "finance-tracker-8ec9e",
    storageBucket: "finance-tracker-8ec9e.firebasestorage.app",
    messagingSenderId: "683776452173",
    appId: "1:683776452173:web:d8f35f32a56c6c039d1e04",
    measurementId: "G-TN4QTHQCNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
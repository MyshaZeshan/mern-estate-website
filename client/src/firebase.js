// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estates-b8227.firebaseapp.com",
  projectId: "mern-estates-b8227",
  storageBucket: "mern-estates-b8227.firebasestorage.app",
  messagingSenderId: "42734669974",
  appId: "1:42734669974:web:ceb05a4dfd537e721ab2b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
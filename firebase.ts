// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrgjtxCR4bhcgtXscgBNVsjb7ZF64g-tw",
  authDomain: "final-web-dev-acb25.firebaseapp.com",
  projectId: "final-web-dev-acb25",
  storageBucket: "final-web-dev-acb25.firebasestorage.app",
  messagingSenderId: "441728800021",
  appId: "1:441728800021:web:cffcad190006363cd1c51c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCRbdgYnKID4E8HOyxKdxgp9ABQlJ0sls",
  authDomain: "react-6cbea.firebaseapp.com",
  projectId: "react-6cbea",
  storageBucket: "react-6cbea.appspot.com",
  messagingSenderId: "684765893321",
  appId: "1:684765893321:web:28aae89cd399db87073318",
  measurementId: "G-GTVESL4CDK"
};

// Initialize Firebase
export const database = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp2FZFkEtrn0cfM1jjtU22U3WRAZRCgv8",
  authDomain: "marketzero-6109c.firebaseapp.com",
  projectId: "marketzero-6109c",
  storageBucket: "marketzero-6109c.appspot.com",
  messagingSenderId: "288839590621",
  appId: "1:288839590621:web:4076b025ac916bee71f134",
  measurementId: "G-XN1VDPECQ2"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export default app;
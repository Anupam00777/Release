// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc987CVvkGoH4aXla4ye7sS4k6l1VJ5D0",
  authDomain: "release-web-app.firebaseapp.com",
  projectId: "release-web-app",
  storageBucket: "release-web-app.appspot.com",
  messagingSenderId: "426018195407",
  appId: "1:426018195407:web:09be77f43c1d484cc774ba",
  measurementId: "G-FYD9T8WH5B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

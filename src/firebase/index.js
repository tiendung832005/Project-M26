// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJFe16x0G722hVjs-Ist9AE239sOwcP9I",
  authDomain: "m26-upload-file-87e8c.firebaseapp.com",
  projectId: "m26-upload-file-87e8c",
  storageBucket: "m26-upload-file-87e8c.appspot.com",
  messagingSenderId: "1065128146206",
  appId: "1:1065128146206:web:21d2d4bd7562d4cfdc050f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export {storage}
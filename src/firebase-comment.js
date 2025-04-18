import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmw-FJH04zK8mUWwU_Xytems1k4vLCw7A",
    authDomain: "portfolio-benep.firebaseapp.com",
    projectId: "portfolio-benep",
    storageBucket: "portfolio-benep.firebasestorage.app",
    messagingSenderId: "1071633710122",
    appId: "1:1071633710122:web:989b500ae3a991bbd69753",
    measurementId: "G-9JQK6J0Q0F"
};

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
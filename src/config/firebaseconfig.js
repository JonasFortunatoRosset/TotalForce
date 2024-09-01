import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, deleteDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB7ed27MWGq4auOURDO0GnipBSmWsgbypY",
    authDomain: "totalforce-a70b2.firebaseapp.com",
    projectId: "totalforce-a70b2",
    storageBucket: "totalforce-a70b2.appspot.com",
    messagingSenderId: "699276838980",
    appId: "1:699276838980:web:9fa31e6c5813e6e9b3d411",
    measurementId: "G-90KGXKNY1F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth();

export { database, collection, doc, deleteDoc, auth, onAuthStateChanged };
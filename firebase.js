// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBSL7ZW9MgTH84dbFqgiIB6jwc5oE3aY1k",
	authDomain: "fir-c358e.firebaseapp.com",
	projectId: "fir-c358e",
	storageBucket: "fir-c358e.appspot.com",
	messagingSenderId: "981640061788",
	appId: "1:981640061788:web:ce254c7a564df2b38f9799",
	measurementId: "G-LK2VY9TQB1",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
// Database
const db = getFirestore(app);
// Storage
const storage = getStorage(app);

export { app, storage, db };

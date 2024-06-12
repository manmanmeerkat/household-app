// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT0piUfWG1SCtHV5AGhA5bMtbT0niqBeQ",
  authDomain: "householdtypescript-fb9cb.firebaseapp.com",
  projectId: "householdtypescript-fb9cb",
  storageBucket: "householdtypescript-fb9cb.appspot.com",
  messagingSenderId: "149956097972",
  appId: "1:149956097972:web:21a7bbd61271aaee9264e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
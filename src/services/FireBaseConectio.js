import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBNIEPiazTpytvDNUUOphymiYujfc_eWhw",
  authDomain: "tickets-69bd7.firebaseapp.com",
  projectId: "tickets-69bd7",
  storageBucket: "tickets-69bd7.appspot.com",
  messagingSenderId: "1053706414779",
  appId: "1:1053706414779:web:0ac71ffe0ef5139ff9179e",
  measurementId: "G-6S93EM1Y25"
};
 
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp)



export {db, auth, storage};

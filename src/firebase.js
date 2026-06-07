import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeG-sx2qTwe-AT9tiqdVHqh-J8t-FjT6E",
  authDomain: "crud-automoveis.firebaseapp.com",
  projectId: "crud-automoveis",
  storageBucket: "crud-automoveis.firebasestorage.app",
  messagingSenderId: "174945456958",
  appId: "1:174945456958:web:15774139ea53598364126f",
  measurementId: "G-8BBLFJEJKX"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const carrosCollection = collection(db, "carros");
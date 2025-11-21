
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase pour Aura Paris
const firebaseConfig = {
  apiKey: "AIzaSyDTasA-DUUbB77njOuWvkNRSkwZaCxN9V0",
  authDomain: "aura-00001.firebaseapp.com",
  projectId: "aura-00001",
  storageBucket: "aura-00001.firebasestorage.app",
  messagingSenderId: "315609192762",
  appId: "1:315609192762:web:0b79f89d7e777d8054d803",
  measurementId: "G-4FGEQYDNPS"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de la base de données Firestore
// C'est cet objet 'db' qui est importé dans les pages Contact et Quiz
export const db = getFirestore(app);

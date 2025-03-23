
import { initializeApp } from 'firebase/app';
import {getAuth,GoogleAuthProvider}  from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDsiSCDKhp0vvshWcpcLyRtADLv70DD5_A",
  authDomain: "bond-beyond.firebaseapp.com",
  projectId: "bond-beyond",
  storageBucket: "bond-beyond.appspot.com",
  messagingSenderId: "159569757721",
  appId: "1:159569757721:web:7d0d5e90e93823d0040c88",
  measurementId: "G-X36W9X2V9S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// Import the functions you need from the SDKs you need

import { initializeApp, getApps } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env.NEXT_PUBLIC_FIREBASEAPI);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPI,

  authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,

  projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,

  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,

  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,

  appId: process.env.NEXT_PUBLIC_APPID,

  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storeage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//const analytics = getAnalytics(app);

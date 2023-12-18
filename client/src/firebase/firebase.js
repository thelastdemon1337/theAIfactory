import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  signInWithPhoneNumber,
  PhoneAuthProvider, signInWithCredential, ApplicationVerifier,
  RecaptchaVerifier
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection, query, where, getDocs, setDoc
} from "firebase/firestore";
import * as Constants from "../utils/constants";

const firebaseConfig = {
  apiKey: "AIzaSyAXNonVHm8sFc7Tp5EQjY2X9IjHYOSZjhw",
  authDomain: "metamist-45698.firebaseapp.com",
  projectId: "metamist-45698",
  storageBucket: "metamist-45698.appspot.com",
  messagingSenderId: "1031840691765",
  appId: "1:1031840691765:web:2bbf4fe3cac079c93d637c"
};



const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
auth.languageCode = 'it';

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);



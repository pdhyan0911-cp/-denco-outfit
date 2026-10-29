import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase web config is intended for client-side use. Protect your data with
// Firebase Authentication, Firestore Security Rules, and authorized domains.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAYCmktcBT137zf1Zv20R5CoaZMPre4K8g',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'denco-outfit.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'denco-outfit',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'denco-outfit.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1003795855014',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1003795855014:web:cc4116b837803b849e6667',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-T0HN4CCMDN',
};

export const firebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId);
const app = firebaseConfigured ? (getApps()[0] || initializeApp(firebaseConfig)) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const googleProvider = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  onAuthStateChanged,
  updateProfile,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
};

export async function googleSignIn() {
  if (!auth) throw new Error('Account service is not configured. Check Firebase settings.');
  return signInWithPopup(auth, googleProvider);
}

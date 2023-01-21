import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBEevZH5qZK1Dg3_0xL-0CYtOjrVhcmH1w",
  authDomain: "chat-app-test-c6fff.firebaseapp.com",
  projectId: "chat-app-test-c6fff",
  storageBucket: "chat-app-test-c6fff.appspot.com",
  messagingSenderId: "62445937110",
  appId: "1:62445937110:web:85ad634851585962334477",
  measurementId: "G-N7C1JJTPSK",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage();
export const db = getFirestore();

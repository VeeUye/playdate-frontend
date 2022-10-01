import { initializeApp } from "firebase/app";
import { getAuth, getIdToken, connectAuthEmulator } from "firebase/auth";
import {
  getStorage,
  connectStorageEmulator,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

if (location.hostname === "localhost") {
  connectStorageEmulator(storage, "localhost", 9199);
}

export { auth, getIdToken, app, storage, getDownloadURL, ref, uploadBytesResumable };

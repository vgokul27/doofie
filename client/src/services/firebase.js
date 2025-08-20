import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2fp5kIfO3bnV7dEeqNHCkVmuH1B_W-1k",
  authDomain: "doofie-api.firebaseapp.com",
  projectId: "doofie-api",
  storageBucket: "doofie-api.firebasestorage.app",
  messagingSenderId: "99101063554",
  appId: "1:99101063554:web:02d9a163c01640743b379b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  } else {
    throw new Error("User not logged in");
  }
};
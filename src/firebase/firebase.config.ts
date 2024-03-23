// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4DL70pHQYYFZCbXFI3qXU49x1qBS7Qug",
  authDomain: "todo-app-dd9ac.firebaseapp.com",
  projectId: "todo-app-dd9ac",
  storageBucket: "todo-app-dd9ac.appspot.com",
  messagingSenderId: "368446145195",
  appId: "1:368446145195:web:17979cc40a9deab1932dee",
  measurementId: "G-5KSEJ0KJRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const passwordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email)
}

export const confirmThePasswordReset = async (oobCode: string, newPassword: string) => {
  if (!oobCode && !newPassword) return;

  return await confirmPasswordReset(auth, oobCode, newPassword)
}
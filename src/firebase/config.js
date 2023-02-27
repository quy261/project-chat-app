// Import the functions you need from the SDKs you need
import  firebase from 'firebase/compat/app'
import "firebase/compat/analytics"
import "firebase/compat/auth"
import "firebase/compat/firestore"
// import "firebase/analytics"
const firebaseConfig = {
  apiKey: "AIzaSyDWyZFc3BzENxBn4MnNzqHYfcW6PdfI8Vg",
  authDomain: "my-chat-app-b41f7.firebaseapp.com",
  projectId: "my-chat-app-b41f7",
  storageBucket: "my-chat-app-b41f7.appspot.com",
  messagingSenderId: "882122556932",
  appId: "1:882122556932:web:1f5f21f3ad7e9ae1be9751",
  measurementId: "G-728V6F13VQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth(app);
const db = firebase.firestore(app);

// them link den cac authentication va firestore cho firebase emulator
// if (window.location.hostname === "localhost") {
//   console.log("localhost detected!");
//   auth.useEmulator("http://localhost:9099");
//   db.useEmulator("localhost", 8080);
// }

export {auth, db, analytics};
export default firebase;
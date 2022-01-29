import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8qT1z7GQn7p3BiIUpRw1WtSA19-v5hGY",
  authDomain: "study-ship.firebaseapp.com",
  projectId: "study-ship",
  storageBucket: "study-ship.appspot.com",
  messagingSenderId: "1080708916487",
  appId: "1:1080708916487:web:a6a56dca284b0f9a6091a2",
  measurementId: "G-0L5J9JZF14",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase };

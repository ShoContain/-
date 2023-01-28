import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { firebaseConfig } from "../../credential";

const Firebase = firebase.initializeApp(firebaseConfig);
const Firestore = getFirestore();
const FirebaseAuth = getAuth(Firebase);

const env = import.meta.env.VITE_ENV;

if (env === "local") {
  connectFirestoreEmulator(Firestore, "localhost", 8080);
  connectAuthEmulator(FirebaseAuth, "http://localhost:9099");
}

export { Firestore, FirebaseAuth };

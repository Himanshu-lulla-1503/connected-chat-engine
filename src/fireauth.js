import firebase from "firebase";
const config={
  apiKey: "AIzaSyBjd_HQ8op_3uuFlnXVnZswMRBXrd3cRuQ",
  authDomain: "connected-chat-engine.firebaseapp.com",
  projectId: "connected-chat-engine",
  storageBucket: "connected-chat-engine.appspot.com",
  messagingSenderId: "265432897130",
  appId: "1:265432897130:web:ac9062c321f0b5cbc25c13",
  measurementId: "G-KYVMM90XV6"
}

const app = firebase.initializeApp(config);
const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const yahooProvider =new firebase.auth.OAuthProvider('yahoo.com');
const twitterProvider = new firebase.auth.TwitterAuthProvider();
export {auth,googleProvider,twitterProvider,yahooProvider};
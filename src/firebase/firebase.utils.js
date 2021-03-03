import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDiaRN9sN_KOf2jGQGr7_GlNbX-COkH--w",
  authDomain: "smokit-db.firebaseapp.com",
  projectId: "smokit-db",
  storageBucket: "smokit-db.appspot.com",
  messagingSenderId: "1047854945794",
  appId: "1:1047854945794:web:278aa1810ecb7867cd791b",
  measurementId: "G-8XM7VNC3P0"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

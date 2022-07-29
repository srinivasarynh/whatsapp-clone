
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDXvHwhwQ_igZa2U34ibj8GhA_Ro0HO5UA",
    authDomain: "whatsapp-clone-e8a13.firebaseapp.com",
    projectId: "whatsapp-clone-e8a13",
    storageBucket: "whatsapp-clone-e8a13.appspot.com",
    messagingSenderId: "455966842594",
    appId: "1:455966842594:web:331be68cbbf0134cc748bb",
    measurementId: "G-5YNE4030ZF"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;
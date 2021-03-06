import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAT_a-8zLqaooqBhikXEH1MJ6m8r-39ZQM",
    authDomain: "revent-72a9c.firebaseapp.com",
    projectId: "revent-72a9c",
    storageBucket: "revent-72a9c.appspot.com",
    messagingSenderId: "752217483559",
    appId: "1:752217483559:web:063f3db3a1e25174f56102",
    measurementId: "G-NJ3TE4MHED"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampInSnapshots : true});
export default firebase;
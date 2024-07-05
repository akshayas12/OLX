import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAKrmMnG7acdq0KNw8Jj6xbVFidcjvZgoA",
    authDomain: "olx-a67f5.firebaseapp.com",
    projectId: "olx-a67f5",
    storageBucket: "olx-a67f5.appspot.com",
    messagingSenderId: "405977745911",
    appId: "1:405977745911:web:d8b80d2069f547a174c6f2",
    measurementId: "G-PHNPWC68Z7"
  };

  export default firebase.initializeApp(firebaseConfig)
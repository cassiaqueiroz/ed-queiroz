// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtaHdHVmV81V14apptmJ6v9_ZleJKTnGs",
  authDomain: "edqueiroz-br.firebaseapp.com",
  databaseURL: "https://edqueiroz-br-default-rtdb.firebaseio.com",
  projectId: "edqueiroz-br",
  storageBucket: "edqueiroz-br.appspot.com",
  messagingSenderId: "405351568095",
  appId: "1:405351568095:web:1ac8565069af809b2acf6a",
  measurementId: "G-26ZTHLFD94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
const analytics = getAnalytics(app);
const db = getDatabase();
const reference = ref(db, 'users/' + userId);

set(reference, {
    username: name,
    email: email,
    profile_picture : imageUrl
});
}

writeUserData ("ninaserena", "serena", "emaildaninaserena@nanita.com", "ninaimageurl"); 
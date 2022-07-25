
// Import the functions you need from the SDKs you nee
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTdkE5UuP8-QTj7sqI4jn-iZUmkyssaOo",
  authDomain: "reels-d7742.firebaseapp.com",
  projectId: "reels-d7742",
  storageBucket: "reels-d7742.appspot.com",
  messagingSenderId: "275709064969",
  appId: "1:275709064969:web:af310020d21d1f94a0c5d8"
};

// Initialize Firebase
export  const ap = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database={
    users : firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage =firebase.storage();
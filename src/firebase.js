// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth,
    signOut
} from 'firebase/auth';

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUifPAdN03bev7YpQZUvgFtFeY6G9ZGJ0",
    authDomain: "vikasproject-1f581.firebaseapp.com",
    projectId: "vikasproject-1f581",
    storageBucket: "vikasproject-1f581.appspot.com",
    messagingSenderId: "715884436378",
    appId: "1:715884436378:web:afb30744ca7f9382803823",
    measurementId: "G-ZYMMSZ16YQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};




// Initialize Firebase

export {
    auth,
    db,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    signOut,
}

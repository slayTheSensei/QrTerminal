import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAqOSyY6VIuF9tQynwn5s5lWpNyHDSGqv0",
    authDomain: "vinyl-pay.firebaseapp.com",
    projectId: "vinyl-pay",
    storageBucket: "vinyl-pay.appspot.com",
    messagingSenderId: "95878834051",
    appId: "1:95878834051:web:5cb590267bb2bbed7c38b6",
    measurementId: "G-RSGYWGEN5H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore()

export default db;
var firebase = require('firebase');

firebase.initializeApp({
    apiKey: "AIzaSyC6ySrInpH3svhfDbZDIWc3dhHAOvZW2kk",
    authDomain: "studygroupfinder-d172b.firebaseapp.com",
    databaseURL: "https://studygroupfinder-d172b.firebaseio.com",
    projectId: "studygroupfinder-d172b",
    storageBucket: "studygroupfinder-d172b.appspot.com",
    messagingSenderId: "390539351889"
});

module.exports = firebase;

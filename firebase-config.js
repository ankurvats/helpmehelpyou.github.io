import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'; 
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBccWwn7HY_LtoBhjfOpoIeXNS5vfVH52E",
    authDomain: "help-me-help-you-dcaa3.firebaseapp.com",
    databaseURL: "https://help-me-help-you-dcaa3-default-rtdb.firebaseio.com/",
    projectId: "help-me-help-you-dcaa3",
    storageBucket: "help-me-help-you-dcaa3.appspot.com",
    messagingSenderId: "818356225230",
    appId: "1:818356225230:web:fa129bc0942b0b40c53c9f",
    measurementId: "G-XPWP3MBJS3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

// Export the app instance
export { app, database };
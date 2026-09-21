import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// TODO: Replace with your Firebase configuration object
// You can find this in your Firebase Console -> Project Settings -> General -> Web Apps
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app;
let db;
let messagesCollection;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    messagesCollection = collection(db, "messages");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

export { db, messagesCollection, addDoc };

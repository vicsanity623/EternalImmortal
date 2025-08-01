import { saveGameToCloud, loadGameFromCloud } from './database.js';

// --- IMPORTANT ---
// PASTE YOUR FIREBASE CONFIG SNIPPET HERE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual key
  authDomain: "eternal-immortal-rpg.firebaseapp.com",
  projectId: "eternal-immortal-rpg",
  storageBucket: "eternal-immortal-rpg.appspot.com",
  messagingSenderId: "313509729333",
  appId: "1:313509729333:web:b692ab77bed51377ca4d7c",
  measurementId: "G-CKTX3Q77N6"
};

// Initialize Firebase (this works globally with the compat scripts)
firebase.initializeApp(firebaseConfig);

// Get the Auth service using the v8 syntax
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const googleLoginBtn = document.getElementById('google-login-btn');

// Handle Google Login Click
googleLoginBtn.addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .catch((error) => {
            console.error("Google Sign-In Error:", error);
            alert("Could not sign in with Google. Please try again.");
        });
});

// The "Brain" of our app: Listens for login/logout changes
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // User is signed in. Let's load their data and go to the game.
        console.log("User signed in:", user.displayName);
        googleLoginBtn.textContent = 'Loading Game...';
        googleLoginBtn.disabled = true;

        const saveData = await loadGameFromCloud(user.uid);
        
        // Use sessionStorage to pass data to the game page
        sessionStorage.setItem('user', JSON.stringify({ uid: user.uid, displayName: user.displayName }));
        sessionStorage.setItem('saveData', saveData ? JSON.stringify(saveData) : null);
        
        // Redirect to the game page
        window.location.href = 'game.html';

    } else {
        // User is signed out. Make sure we are on the login page.
        console.log("No user signed in.");
        // This logic is fine, no changes needed here.
    }
});

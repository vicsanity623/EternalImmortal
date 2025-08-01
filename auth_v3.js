import { loadGameFromCloud } from './database_v2.js';

document.addEventListener('DOMContentLoaded', () => {
const firebaseConfig = {
  apiKey: "AIzaSyBSrk6DzJEb9u9fSpjA3r2WnZgEbzPpH44",
  authDomain: "eternal-immortal-rpg.firebaseapp.com",
  projectId: "eternal-immortal-rpg",
  storageBucket: "eternal-immortal-rpg.firebasestorage.app",
  messagingSenderId: "313509729333",
  appId: "1:313509729333:web:1eb4c4d0a5941fbfca4d7c",
  measurementId: "G-WLTHERPVEZ"
};
// ---------------------------------------------------------

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    const googleLoginBtn = document.getElementById('google-login-btn');

    // This check prevents errors if the script is somehow loaded on the wrong page.
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            auth.signInWithPopup(provider)
                .catch((error) => {
                    console.error("Google Sign-In Error:", error);
                    alert("Could not sign in with Google. Please try again.");
                });
        });
    }

    // This function runs whenever a user signs in or out
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // User is signed in.
            console.log("User signed in:", user.displayName);
            if (googleLoginBtn) {
                googleLoginBtn.textContent = 'Loading Game...';
                googleLoginBtn.disabled = true;
            }

            // Try to load their save data from the cloud
            const saveData = await loadGameFromCloud(user.uid);
            
            // Store user info and save data in the browser's session storage
            sessionStorage.setItem('user', JSON.stringify({ uid: user.uid, displayName: user.displayName }));
            sessionStorage.setItem('saveData', saveData ? JSON.stringify(saveData) : null);
            
            // Go to the game page
            window.location.href = 'game.html';

        } else {
            // User is signed out.
            console.log("No user signed in.");
        }
    });
});

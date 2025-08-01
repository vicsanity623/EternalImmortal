import { loadGameFromCloud } from './database_final.js';

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
firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const googleLoginBtn = document.getElementById('google-login-btn');

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            auth.signInWithPopup(provider)
                .catch((error) => {
                    console.error("Google Sign-In Error:", error);
                    alert("Could not sign in with Google. Please try again.");
                });
        });
    }

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            console.log("User signed in:", user.displayName);
            if (googleLoginBtn) {
                googleLoginBtn.textContent = 'Loading Game...';
                googleLoginBtn.disabled = true;
            }
            const saveData = await loadGameFromCloud(user.uid);
            sessionStorage.setItem('user', JSON.stringify({ uid: user.uid, displayName: user.displayName }));
            sessionStorage.setItem('saveData', saveData ? JSON.stringify(saveData) : null);
            window.location.href = 'game.html';
        } else {
            console.log("No user signed in.");
        }
    });
  if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/EternalImmortal/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
});

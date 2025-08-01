import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBSrk6DzJEb9u9fSpjA3r2WnZgEbzPpH44",
    authDomain: "eternal-immortal-rpg.firebaseapp.com",
    projectId: "eternal-immortal-rpg",
    storageBucket: "eternal-immortal-rpg.firebasestorage.app",
    messagingSenderId: "313509729333",
    appId: "1:313509729333:web:b692ab77bed51377ca4d7c",
    measurementId: "G-CKTX3Q77N6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
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
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            window.location.href = 'index.html';
        }
    }
});

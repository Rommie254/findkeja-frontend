// User authentication using Firebase 
// Import the needed functions from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeC5HQxCoSsoDx_VOk4uBY-EuOaigwvb0",
    authDomain: "findkeja-4.firebaseapp.com",
    projectId: "findkeja-4",
    storageBucket: "findkeja-4.appspot.com",
    messagingSenderId: "416225743836",
    appId: "1:416225743836:web:a53f3b3e32b8e557123519",
    measurementId: "G-PK26R2HCF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication 
const auth = getAuth(app);

// Get form elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const errorMessage = document.getElementById('error-message');
const signupMessage = document.getElementById('signupMessage');

const googleLoginButton = document.getElementById('google-login-button');
const googleSignupButton = document.getElementById('google-signup-button');

const showSignupButton = document.getElementById('showSignupButton');
const backToLoginButton = document.getElementById('backToLoginButton');

const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');

// Add a submit event listener to the login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // Get email and password from the form
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Sign in the user with Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            user.getIdToken().then((token) => {
            localStorage.setItem('authToken', token);

            // Redirect to the userpage 
            document.getElementById("userPage").style.display = "block";
            document.getElementById("loginModal").style.display = "none";
            document.getElementsByClassName("container")[0].style.display = "none";
            });
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessageText = error.message;
            // Display error message
            errorMessage.textContent = 'Wrong email or password. Try again.';
        });
});

// Add a submit event listener to the signup form
signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get email and password from the form
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Create a new user with Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            user.getIdToken().then((token) => {
                localStorage.setItem('authToken', token);
            // Redirect to the main user page 
            document.getElementById("userPage").style.display = "block";
            document.getElementById("loginModal").style.display = "none";
            document.getElementsByClassName("container")[0].style.display = "none";
            });
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessageText = error.message;
            // Display error message
            signupMessage.textContent = errorMessageText;
        });
});

// Add a click event listener to the Google login button
googleLoginButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {

            // This gives a Google Access Token
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            user.getIdToken().then((token) => {
                localStorage.setItem('authToken', token);
            // Redirect to the main user page
            document.getElementById("userPage").style.display = "block";
            document.getElementById("loginModal").style.display = "none";
            document.getElementsByClassName("container")[0].style.display = "none";
            });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessageText = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // Display error message
            errorMessage.textContent = errorMessageText;
        });
});

// Add a click event listener to the Google signup button
googleSignupButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives a Google Access Token to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            user.getIdToken().then((token) => {
                localStorage.setItem('authToken', token);
            // Redirect to the main user page
            document.getElementById("userPage").style.display = "block";
            document.getElementById("loginModal").style.display = "none";
            document.getElementsByClassName("container")[0].style.display = "none";
            });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessageText = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // Display error message
            signupMessage.textContent = errorMessageText;
        });
});

// Toggle between login and signup forms
showSignupButton.addEventListener('click', () => {
    loginSection.style.display = 'none';
    signupSection.style.display = 'block';
});

backToLoginButton.addEventListener('click', () => {
    signupSection.style.display = 'none';
    loginSection.style.display = 'block';
});

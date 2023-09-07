const addEventOnElements = (elements, eventType, callback) => {
    elements.forEach(element => {
        element.addEventListener(eventType, callback);
    });
}



/**
 *  Navbar toggler for mobile 
*/

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = () =>{ 
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 *  Header
*/

const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () => {
    header.classList[window.scrollY > 100 ? "add" : "remove"] ("active");
});


////////////////
//  Firebase  //
////////////////


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJwVzw1VhKE0Ui8mxd7S3JsawrRgXAZhQ",
    authDomain: "linqup-web.firebaseapp.com",
    projectId: "linqup-web",
    storageBucket: "linqup-web.appspot.com",
    messagingSenderId: "52682549828",
    appId: "1:52682549828:web:3ed79cb0af3296cc436a11",
    measurementId: "G-1RJTNKZG69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth();

// print user info
const user = auth.currentUser;
auth.onAuthStateChanged((user) => {

    // remove preloader
    const preloader = document.querySelector("[data-preloader]");
    preloader.classList.add("remove");

    if (user) {
        // User is signed in
        console.log(user);
        // Change button text
        document.getElementById("login").innerHTML = "Logout";
        // Change button link
        document.getElementById("login").href = "/logout/";

        // View user name
        if (user.displayName) {
            var profile = user.displayName;
        } else {
            var profile = user.email.split("@")[0];
        }
        document.getElementById("user").innerHTML = profile;
    } else {
        // User is signed out
        // ...
    }
});



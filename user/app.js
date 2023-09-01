const shareButtons = document.querySelectorAll('.tile-share-button')

function copyText(e) {
//prevent button going to the site
    e.preventDefault()
    const link = this.getAttribute('href')
    try {
        navigator.clipboard.writeText(link)
        alert("Copied the text: " + link)
    } catch (err) {
        console.error(err)
    }
}

 shareButtons.forEach(shareButton =>
     shareButton.addEventListener('click', copyText))


////////////////
//  Firebase  //
////////////////

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getStorage, ref, getDownloadURL, } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getDatabase, ref as dbRef, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

// Get uid from url
const url = window.location.href;
const uid = url.split("/").pop().substring(1);

// Initialize Firebase Storage
const storage = getStorage();

// Initialize Firebase Database
const database = getDatabase();

// Get user data
const userRef = dbRef(database, "users/" + uid);

// UI elements
const name = document.querySelector(".name");
const bio = document.querySelector(".bio");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const website = document.querySelector(".website");
const facebook = document.querySelector(".facebook");
const twitter = document.querySelector(".twitter");
const instagram = document.querySelector(".instagram");
const linkedin = document.querySelector(".linkedin");
const tiktok = document.querySelector(".tiktok");
const snapchat = document.querySelector(".snapchat");
const threads = document.querySelector(".threads");
const instapay = document.querySelector(".instapay");
const behance = document.querySelector(".behance");
const veseeta = document.querySelector(".veseeta");
const calendly = document.querySelector(".calendly");
const whatsapp = document.querySelector(".whatsapp");
const telegram = document.querySelector(".telegram");
const youtube = document.querySelector(".youtube");
const telda = document.querySelector(".telda");
const messenger = document.querySelector(".messenger");
const fileLabel = document.querySelector(".fileLabel");

name.innerHTML = "Hello";

// Get user data from database
get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.bio) { bio.innerHTML = data.bio; } else { bio.remove(); }
        if (data.email) { email.href = "mailto:" + data.email; } else { email.remove(); }
        if (data.phone) { phone.href = "tel:" + data.phone; } else { phone.remove(); }
        if (data.website) { website.href = data.website; } else { website.remove(); }
        if (data.facebook) { facebook.href = data.facebook; } else { facebook.remove(); }
        if (data.twitter) { twitter.href = data.twitter; } else { twitter.remove(); }
        if (data.instagram) { instagram.href = data.instagram; } else { instagram.remove(); }
        if (data.linkedin) { linkedin.href = data.linkedin; } else { linkedin.remove(); }
        if (data.tiktok) { tiktok.href = data.tiktok; } else { tiktok.remove(); }
        if (data.snapchat) { snapchat.href = data.snapchat; } else { snapchat.remove(); }
        if (data.threads) { threads.href = data.threads; } else { threads.remove(); }
        if (data.instapay) { instapay.href = data.instapay; } else { instapay.remove(); }
        if (data.behance) { behance.href = data.behance; } else { behance.remove(); }
        if (data.veseeta) { veseeta.href = data.veseeta; } else { veseeta.remove(); }
        if (data.calendly) { calendly.href = data.calendly; } else { calendly.remove(); }
        if (data.whatsapp) { whatsapp.href = data.whatsapp; } else { whatsapp.remove(); }
        if (data.telegram) { telegram.href = data.telegram; } else { telegram.remove(); }
        if (data.youtube) { youtube.href = data.youtube; } else { youtube.remove(); }
        if (data.telda) { telda.href = data.telda; } else { telda.remove(); }
        if (data.messenger) { messenger.href = data.messenger; } else { messenger.remove(); }

    } else {
        console.log("No data available");
    }
}).catch((error) => {
        console.error(error);
    });

// Get user profile image
const storageRefImg = ref(storage, "users/" + uid + "/profile.jpg");
const profileImage = document.querySelector("#profileImg");

getDownloadURL(storageRefImg).then((url) => {
    profileImage.src = url;
    // remove preloader
    const preloader = document.querySelector("[data-preloader]");
    profileImage.onload = () => {
        // Timeout for demo purposes
        setTimeout(() => {
            preloader.classList.add("remove");
        }, 1000);
    }
});

// const preloader = document.querySelector("[data-preloader]");
// preloader.classList.add("remove");

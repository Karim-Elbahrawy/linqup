////////////////
//  Firebase  //
////////////////

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, setPersistence, browserLocalPersistence, updateProfile } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll, } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { getDatabase, ref as dbRef, set, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

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

    if (user) {
        // User is signed in
        const uid = user.uid;
        const storage = getStorage();
        const storageRefImg = ref(storage, 'users/' + uid + '/profile.jpg');

        const database = getDatabase();
        const userRef = dbRef(database, 'users/' + uid);

        const profileImage = document.querySelector('#profileImg');
        getDownloadURL(storageRefImg).then((url) => {
            profileImage.src = url;
            // remove preloader
            const preloader = document.querySelector("[data-preloader]");
            profileImage.onload = () => {
                preloader.classList.add('remove');
            }
        }).catch((error) => {
                // Handle any errors
                console.log(error);
            });

        // Make files field required if files are uploaded
        const fileField = document.querySelector('#file');
        const fileLabel = document.querySelector('#file-label');
        fileField.addEventListener('change', () => {
            if (fileField.files.length > 0) {
                fileLabel.required = true;
            } else {
                fileLabel.required = false;
            }
        });

        // Update image when uploaded
        const imageField = document.querySelector('#inputTag');
        imageField.addEventListener('change', () => {
            if (imageField.files.length > 0) {
                const image = imageField.files[0];
                profileImage.src = URL.createObjectURL(image);
            }
        });

        // Get user data
        const name = document.querySelector('#name');
        const bio = document.querySelector('#bio');
        const email = document.querySelector('#email');
        const phone = document.querySelector('#phone');
        const website = document.querySelector('#website');
        const facebook = document.querySelector('#facebook');
        const twitter = document.querySelector('#twitter');
        const instagram = document.querySelector('#instagram');
        const linkedin = document.querySelector('#linkedin');
        const tiktok = document.querySelector('#tiktok');
        const snapchat = document.querySelector('#snapchat');
        const threads = document.querySelector('#threads');
        const instapay = document.querySelector('#instapay');
        const behance = document.querySelector('#behance');
        const veseeta = document.querySelector('#veseeta');
        const calendly = document.querySelector('#calendly');

        name.value = user.displayName;

        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                // name.value = snapshot.val().name;
                bio.value = snapshot.val().bio;
                email.value = snapshot.val().email;
                phone.value = snapshot.val().phone;
                website.value = snapshot.val().website;
                facebook.value = snapshot.val().facebook;
                twitter.value = snapshot.val().twitter;
                instagram.value = snapshot.val().instagram;
                linkedin.value = snapshot.val().linkedin;
                tiktok.value = snapshot.val().tiktok;
                snapchat.value = snapshot.val().snapchat;
                threads.value = snapshot.val().threads;
                instapay.value = snapshot.val().instapay;
                behance.value = snapshot.val().behance;
                veseeta.value = snapshot.val().veseeta;
                calendly.value = snapshot.val().calendly;
                fileLabel.value = snapshot.val().fileLabel;
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        // Submit form
        document.querySelector('.user-data').addEventListener('submit', async (e) => {
            e.preventDefault();

            // Save user data
            // Update user profile
            await updateProfile(user, {
                displayName: name.value,
            });

            set(userRef, {
                // name: name.value,
                bio: bio.value,
                email: email.value,
                phone: phone.value,
                website: website.value,
                facebook: facebook.value,
                twitter: twitter.value,
                instagram: instagram.value,
                linkedin: linkedin.value,
                tiktok: tiktok.value,
                snapchat: snapchat.value,
                threads: threads.value,
                instapay: instapay.value,
                behance: behance.value,
                veseeta: veseeta.value,
                calendly: calendly.value,
                fileLabel: fileLabel.value,
            });

            // Upload image and files
            const image = document.querySelector('#inputTag').files[0];
            const file = fileField.files;
            const filesPath = 'users/' + uid + '/files/';
            const filesPathRef = ref(storage, filesPath);

            try {
                if (image) {
                    const uploadTask = uploadBytesResumable(storageRefImg, image);
                    console.log("Uploaded image");
                }
                if (file.length > 0) {
                    listAll(filesPathRef).then((res) => {
                        res.items.forEach((itemRef) => {
                            deleteObject(itemRef).then(() => {
                                console.log("Deleted files");
                            }).catch((error) => {
                                    console.log(error);
                                });
                        });
                    }).catch((error) => {
                            console.log(error);
                        });

                    for (let i = 0; i < file.length; i++) {
                        const storageRefFile = ref(storage, filesPath + file[i].name);
                        const uploadTask = uploadBytesResumable(storageRefFile, file[i]);
                        console.log("Uploaded files");
                    }
                }
            } catch (e) {
                /* handle error */
                alert("Error uploading");
                console.log(e);
            }
        });

        // Public view button
        const publicBtn = document.querySelector('.publicBtn');
        publicBtn.addEventListener('click', () => {
            window.location.href = '/user?' + uid;
        });

    } else {
        // User is signed out
        window.location.href = '/';
    }

});

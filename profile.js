// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc, } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
//  import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGBn74wS9CKti-LUeF1lO02WoKX4MycDc",
  authDomain: "hackathon1-9e3bb.firebaseapp.com",
  projectId: "hackathon1-9e3bb",
  storageBucket: "hackathon1-9e3bb.appspot.com",
  messagingSenderId: "748156588728",
  appId: "1:748156588728:web:2e7c9f9496ffa69861da4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userMObNum = document.getElementById("userMObNum")

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      userName.textContent = `Name: ${userData.firstName}`;
      userEmail.textContent = `Email: ${userData.email}`;
      userMObNum.textContent = `Phone Number: ${userData.phoneNumber}`;
    }
  }
})




// const logOutBtn = document.querySelector("#logout")
// logOutBtn.addEventListener("click", function () {
//   localStorage.removeItem("user")
//   window.location.replace("./index.html")
// })
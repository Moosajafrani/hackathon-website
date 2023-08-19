 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
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


 const loginbtn = document.querySelector("#loginbtn")
loginbtn.addEventListener("click", login)

async function login(e) {
    try {

        const email = document.getElementById("Email").value
        const password = document.getElementById("Password").value
        console.log(email, password)
        loginbtn.className = "btn btn-info"
        loginbtn.innerHTML = `<div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
        const userLogin = await signInWithEmailAndPassword(auth, email, password)
        console.log(userLogin)
        localStorage.setItem("userUid", userLogin.user.uid)
        window.location.replace("/dashboard2.html")

    } catch (error) {
        console.log("error", error.message)

        loginbtn.className = "btn btn-danger"
        loginbtn.innerHTML = `Login`
        alert(error.message)
    }


}
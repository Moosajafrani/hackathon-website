 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js"; 
 import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
 import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
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

 const signUpbtn = document.querySelector("#signupbtn")
 signUpbtn.addEventListener("click", passCheck)

 async function passCheck() {
    const password = document.getElementById("password").value;
    const Repeatpassword = document.getElementById("Repeatpassword").value;
  
    if (password === Repeatpassword) {
      try {
        await signUp();
      } catch (error) {
        console.log("error", error.message)
      } 
    } else {
        alert("Password and Repeat Password should be the same.")
      }
  }
  

 async function signUp() {
     try {
        const firstName = document.getElementById("firstName").value
        const LastName = document.getElementById("LastName").value
        const phoneNumber = document.getElementById("phoneNumber").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const image = document.getElementById("image").value

         const userAuth = await createUserWithEmailAndPassword(auth, email, password)
         console.log(userAuth.user.uid)
         const uid = userAuth.user.uid
         const userObj = {
             firstName,
             LastName,
             phoneNumber,
             email,
             image,
             accountActivate: true,
             uid
         }
         console.log("userObj", userObj)
         const userRef = doc(db, "users", uid);
         const userDB = await setDoc(userRef, userObj)
         console.log("userDB", userDB)
 
         window.location.assign("login.html")
 
 
 
 
     } catch (error) {
         console.log("error", error.message)
         alert(error.message)
     }
    }
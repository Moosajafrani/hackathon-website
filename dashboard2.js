 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
 import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc ,} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
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
//  const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);
//  const storage = getStorage();



 const Addpostbtn = document.querySelector("#Addpostbtn")
 Addpostbtn.addEventListener("click", Addpost)
 


 async function Addpost(e) {
  e.preventDefault();
  
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;

  // Create a new post object
  const post = {
    title: title,
    description: desc
  };

  // Add the post data to the Firestore collection
  try {
    const docRef = await addDoc(collection(db, "posts"), post);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }

  // Create the card for display (similar to your existing code)
  const card = document.createElement("div");
  card.className = "card mb-3";
  card.innerHTML = `<div class="card-body">
      <h3 class="card-title text-4xl font-bold">${title}</h3>
      <p class="card-text">${desc}</p>
      <button class="delete-btn  btn-success">Delete</button>
      <button class="edit-btn">Edit</button>
  </div>`;

  // Prepend the card to the listParent element
  const listParent = document.getElementById("listParent");
  listParent.prepend(card);

  // Clear form fields
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  listParent.addEventListener("click", handleDelete);

function handleDelete(e) {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".card");
    const cardTitle = card.querySelector(".card-title").textContent;
    
    // Delete the post from Firestore
    // You need to implement this part based on the document ID or title
    // ...
    
    // Remove the card from the DOM
    card.remove();
  }
}
listParent.addEventListener("click", handleEdit);

function handleEdit(e) {
  if (e.target.classList.contains("edit-btn")) {
    const card = e.target.closest(".card");
    const cardTitle = card.querySelector(".card-title").textContent;
    const cardDesc = card.querySelector(".card-text").textContent;

    // Populate the form fields with the current post data for editing
    document.getElementById("title").value = cardTitle;
    document.getElementById("desc").value = cardDesc;

    // Remove the card from the DOM
    card.remove();
  }
}
async function fetchAndDisplayPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const listParent = document.getElementById("listParent");
    listParent.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const card = createPostCard(post);
      
      const listParent = document.getElementById("listParent");
      listParent.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }
}

// Function to create a post card
function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "card mb-3";
  card.innerHTML = `<div class="card-body">
      <h3 class="card-title text-4xl font-bold">${post.title}</h3>
      <p class="card-text">${post.description}</p>
      <button class="delete-btn btn-success">Delete</button>
      <button class="edit-btn">Edit</button>
  </div>`;
  
  return card;
  // window.addEventListener("load", fetchAndDisplayPosts);
}
document.addEventListener("DOMContentLoaded", fetchAndDisplayPosts);
}




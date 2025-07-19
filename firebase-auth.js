import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyABsASS7qrOTcDYHjxZ0jpp_P-n7zWt2QQ",
    authDomain: "breasthealthweb.firebaseapp.com",
    projectId: "breasthealthweb",
    messagingSenderId: "147361987150",
    appId: "1:147361987150:web:48c8285647f7b681d8211f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Example: Create new user with email and password
document.getElementById('signup-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Signup successful! UID: " + user.uid);
    })
    .catch((error) => {
      alert(error.message);
    });
});

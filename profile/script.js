// script.js
document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullname").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  // Save to Firebase
  firebase.database().ref("users/" + phone).set({
    fullName: fullName,
    age: age,
    phone: phone,
    email: email,
  })
  .then(() => {
    document.getElementById("status").innerText = "Profile saved successfully!";
    document.getElementById("profileForm").reset();
  })
  .catch((error) => {
    console.error("Error saving profile:", error);
    document.getElementById("status").innerText = "Error saving profile!";
  });
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyABsASS7qrOTcDYHjxZ0jpp_P-n7zWt2QQ",
  authDomain: "breasthealthweb.firebaseapp.com",
  databaseURL: "https://breasthealthweb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "breasthealthweb",
  storageBucket: "breasthealthweb.firebasestorage.app",
  messagingSenderId: "147361987150",
  appId: "1:147361987150:web:48c8285647f7b681d8211f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Display live temperature
const tempRef = ref(db, 'sensors/temperature');
onValue(tempRef, (snapshot) => {
  const temp = snapshot.val();
  document.getElementById('live-temp').innerText = `Temperature: ${temp} °C`;
});

// Ensure this is loaded after firebase-config.js which exports { auth }

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

// Show Login Modal
function showLogin() {
  document.getElementById('loginModal').style.display = 'flex';
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('loginModal');
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Login with Email and Password
window.loginUser = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Login successful:", user.email);

    // UI Updates
    document.getElementById('loginModal').style.display = 'none';
    document.querySelector('.signin-btn').style.display = 'none';
    document.getElementById('profileBtn').style.display = 'inline-block';
    alert(`Welcome, ${user.email}`);
  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Login failed: " + error.message);
  }
};

// Social Login (Google, Facebook, Twitter)
window.socialLogin = async function (providerName) {
  let provider;
  if (providerName === 'google') {
    provider = new GoogleAuthProvider();
  } else if (providerName === 'facebook') {
    provider = new FacebookAuthProvider();
  } else if (providerName === 'twitter') {
    provider = new TwitterAuthProvider();
  }

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Social login success:", user.email);

    document.getElementById('loginModal').style.display = 'none';
    document.querySelector('.signin-btn').style.display = 'none';
    document.getElementById('profileBtn').style.display = 'inline-block';
    alert(`Welcome, ${user.displayName || user.email}`);
  } catch (error) {
    alert("Social login error: " + error.message);
  }
};

// Profile dropdown functionality
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

profileBtn.addEventListener('click', () => {
  profileDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
    profileDropdown.classList.remove('active');
  }
});

// Sample profile data - replace with actual user data
const profileData = {
  name: "John Doe",
  age: 25,
  phone: "+1234567890",
  email: "john@example.com",
  location: "New York, USA"
};

// Update profile info
function updateProfileInfo() {
  document.getElementById('profileName').textContent = profileData.name;
  document.getElementById('profileAge').textContent = profileData.age;
  document.getElementById('profilePhone').textContent = profileData.phone;
  document.getElementById('profileEmail').textContent = profileData.email;
  document.getElementById('profileLocation').textContent = profileData.location;
}

// Initialize profile info
updateProfileInfo();

// Auto Update UI if Already Logged In
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('signInBtn')?.style.display = 'none';
    document.getElementById('profileBtn')?.style.display = 'inline-block';
  }
});

// Make showLogin globally available
window.showLogin = showLogin;

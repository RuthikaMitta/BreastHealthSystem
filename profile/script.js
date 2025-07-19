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

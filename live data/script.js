// script.js

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Reference paths (customize according to your Firebase structure)
  const paths = {
    temperature: "sensors/temperature",      // MLX90614
    heartrate: "sensors/heartrate",          // Pulse Sensor
    spo2: "sensors/spo2",                    // MAX30102
    gsr: "sensors/gsr",                      // GSR
    fsr: "sensors/fsr",                      // FSR
    ds18b20: "sensors/ds18b20"               // DS18B20
  };
  
  // Function to update sensor values
  function updateValue(path, elementId, suffix = "") {
    database.ref(path).on("value", (snapshot) => {
      const val = snapshot.val();
      document.getElementById(elementId).innerText = val !== null ? `${val} ${suffix}` : "--";
    });
  }
  
  // Attach listeners
  updateValue(paths.temperature, "temperature", "°C");
  updateValue(paths.heartrate, "heartrate", "bpm");
  updateValue(paths.spo2, "spo2", "%");
  updateValue(paths.gsr, "gsr");
  updateValue(paths.fsr, "fsr");
  updateValue(paths.ds18b20, "ds18b20", "°C");
  
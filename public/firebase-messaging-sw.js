// Import Firebase scripts required for background messaging
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js");

// Initialize Firebase with your project config
const firebaseConfig = {
  apiKey: "AIzaSyD1B1qTZSl2uX0dC60QMVEE-nqJeT-WO1s",
  authDomain: "scholarly-2025.firebaseapp.com",
  projectId: "scholarly-2025",
  storageBucket: "scholarly-2025.firebasestorage.app",
  messagingSenderId: "730652392087",
  appId: "1:730652392087:web:673fcb5fbd7fe1fb1587d2",
  measurementId: "G-VVCDYH518M"
}

firebase.initializeApp(firebaseConfig);


// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title, {
    body: body || "New notification received",
    icon: icon || "/favicon.ico", // Change this to your own icon
  });
});

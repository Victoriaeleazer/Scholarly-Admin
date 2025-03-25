import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, payload =>{
    console.log("Message received: ", payload);
})

export const requestPermission = async ()=>{
    console.log("Requesting User Notification Permission.....")
    const permission = await Notification.requestPermission();
    
    if(permission === 'granted'){
        console.log("Notification User Permission Granted...");

        const token = await getToken(messaging, {
            vapidKey:"BP8inz1fqEJJ8a3_86Y7-DNkHDT_Q2Aamib3QVvOMti394vxAjOuQ-TQsfty2zPWMduvUy5nUH9rn99lITgXxRA"
        }).then(token =>{
            console.log("Token is:", token);
            return token;
        });

        return token;
    }

    console.log("Permission Denied");
    
}

requestPermission();

export const onMessageListener = ()=>{
    return new Promise(resolve => {
        onMessage(messaging, payload => {
            console.log("Message received: ", payload);
            resolve(payload);
        })
    })
}
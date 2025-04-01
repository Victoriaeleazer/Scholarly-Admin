import { getToken, onMessage } from 'firebase/messaging';
import {messaging} from './firebase'

export const requestPermission = async () : Promise<string | undefined>=>{
    console.log("Requesting User Notification Permission.....")
    
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    
    if(registration.active){
        console.log("Registered Service Worker: ", registration)
    }
    else{
        console.log("Failed to register service worker: ", registration);
    }

    const permission = await Notification.requestPermission();
    if(permission === 'denied'){
        console.log("Permission Denied");
        return;
    }
    
    const token = await getToken(messaging!, {
        vapidKey:"BP8inz1fqEJJ8a3_86Y7-DNkHDT_Q2Aamib3QVvOMti394vxAjOuQ-TQsfty2zPWMduvUy5nUH9rn99lITgXxRA"
    }).then(token =>{
        console.log("Token is:", token);
        return token;
    });

    return token;
    
}

export const onMessageListener = ()=>{
    return new Promise(resolve => {
        onMessage(messaging!, payload => {
            console.log("Message received: ", payload);
            resolve(payload);
        })
    })
}
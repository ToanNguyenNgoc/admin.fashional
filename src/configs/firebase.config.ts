import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from "firebase/analytics"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyC_VkeLMZVLuLxsCznDUtZEigHrtq4HOeA",
    authDomain: "fashional-pro.firebaseapp.com",
    projectId: "fashional-pro",
    storageBucket: "fashional-pro.appspot.com",
    messagingSenderId: "789523173054",
    appId: "1:789523173054:web:a3f4ae635c89d713bd58ef",
    measurementId: "G-4DSNY5YF7Q"
};
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
const authentication = getAuth(app)

// Notification
const messaging = getMessaging();

const KEY = `BNA9rZ9QT26U0xZO1HOU783op99AMAo6DAqoa2tTF-SBDn0BLHZM6K6qkfkiGybLvMsf1G17hkVS8GmkEnxEkQg`
export const requestForToken = async () => {
    try {
        const token = await getToken(messaging, { vapidKey: KEY })
        console.log(token)
        return token
    } catch (error) {
        console.log('An error occurred while retrieving token. ', error);
    }
};
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

export { analytics, authentication, logEvent, RecaptchaVerifier, signInWithPhoneNumber }
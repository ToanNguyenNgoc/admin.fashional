/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
firebase.initializeApp({
  apiKey: "AIzaSyC_VkeLMZVLuLxsCznDUtZEigHrtq4HOeA",
  authDomain: "fashional-pro.firebaseapp.com",
  projectId: "fashional-pro",
  storageBucket: "fashional-pro.appspot.com",
  messagingSenderId: "789523173054",
  appId: "1:789523173054:web:a3f4ae635c89d713bd58ef",
  measurementId: "G-4DSNY5YF7Q"
})
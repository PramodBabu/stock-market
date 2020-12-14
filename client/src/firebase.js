import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA91I5riumiVKOxugORKThpu2coOJd9wng",
    authDomain: "stock-market-user-db.firebaseapp.com",
    projectId: "stock-market-user-db",
    storageBucket: "stock-market-user-db.appspot.com",
    messagingSenderId: "675383746315",
    appId: "1:675383746315:web:1e9a3a35620c7d6210cc0e"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;
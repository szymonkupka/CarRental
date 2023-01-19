import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA70_wOPiF-wMuEc8W6H4JUhcxs7O03A1w",
    authDomain: "inzynierka-szymon.firebaseapp.com",
    databaseURL: "https://inzynierka-szymon-default-rtdb.firebaseio.com",
    projectId: "inzynierka-szymon",
    storageBucket: "inzynierka-szymon.appspot.com",
    messagingSenderId: "244295290442",
    appId: "1:244295290442:web:190b34e2877dfe96ebe0b3",

  };
  
  //const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const auth = getAuth(app);
  
  
  export { auth, app, firestore, storage };
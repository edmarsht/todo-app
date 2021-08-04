

  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBqOq0unygBEC_1Gs9r7bg9OKlj-23PrMQ",
        authDomain: "todo-app-908e1.firebaseapp.com",
        projectId: "todo-app-908e1",
        storageBucket: "todo-app-908e1.appspot.com",
        messagingSenderId: "393613869632",
        appId: "1:393613869632:web:d4e32d29f54cbc7ee855a5",
        measurementId: "G-ST1BDVSF0G"
  });
  
  const db = firebaseApp.firestore()

  export default db;
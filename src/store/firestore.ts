import * as React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "./user/counterSlice";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyDGgpqforcSJDwCtNoBPIoysbsvyotiuno",
   authDomain: "myapp-14d22.firebaseapp.com",
   projectId: "myapp-14d22",
   storageBucket: "myapp-14d22.appspot.com",
   messagingSenderId: "216540156027",
   appId: "1:216540156027:web:3baa5f6896c35a9a2ad2de",
   measurementId: "G-N906D4CG4J",
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
} else {
   firebase.app();
}

export default function FireStoreModule() {
   const [userDb, setUserDb] = React.useState([{}]);
   const dispatch = useDispatch();
   React.useEffect(() => {
      try {
         const db = firebase.firestore();
         const docRef = db.collection("users");
         const output = {};
         docRef
            .limit(50)
            .get()
            .then((querySnapshot) => {
               const data = querySnapshot.docs.map(function (documentSnapshot) {
                  return documentSnapshot.data();
               });
               setUserDb(data);
               data && dispatch(saveUser(data));
            })
            .then(() => {
               db.clearPersistence();
            });
      } catch (error) {
         console.log("error");
      }
   }, []);
   console.log("datasource:", userDb);
   return null;
}

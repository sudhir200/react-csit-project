import firebase from "firebase";
export const firebaseConfig = {
    apiKey: "AIzaSyBuLy673Gq0jRno00XRScwkT_9qAO2jL2Y",
    authDomain: "react-test-2-adf4b.firebaseapp.com",
    projectId: "react-test-2-adf4b",
    storageBucket: "react-test-2-adf4b.appspot.com",
    messagingSenderId: "373263623136",
    appId: "1:373263623136:web:ab801251798cb54a6c8185",
    measurementId: "G-HTKCHCWHPT"
};
export const randomIdGenerator = () => {
    return Math.random().toString(36).slice(2);
}
if (firebase.apps.length===0) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}
export const database=firebase.firestore();

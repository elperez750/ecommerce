import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjc_qe0orz6bb8z6NnlYq2Kr0WIYSuEw0",
    authDomain: "crown-clothing-db-3ed8c.firebaseapp.com",
    projectId: "crown-clothing-db-3ed8c",
    storageBucket: "crown-clothing-db-3ed8c.appspot.com",
    messagingSenderId: "434208734543",
    appId: "1:434208734543:web:42871d64be2127dc6c193a"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ 
    prompt: "select_account" 
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
          })
        }
        catch (error) {
          console.error("Error adding document: ", error.message);
        }
}
return userDocRef;

}
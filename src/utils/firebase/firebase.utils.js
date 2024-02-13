import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";
import { CartContext } from "../../context/cart.context";

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

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ 
    prompt: "select_account" 
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
          })
        }
        catch (error) {
          console.error("Error adding document: ", error.message);
        }
}
return userDocRef;

}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object)
    console.log("done")


  })
  
  await batch.commit();

}


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap =  querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;

  }, {});

  return categoryMap;

}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email ||!password) return;

  return await createUserWithEmailAndPassword(auth, email, password);


}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email ||!password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async () => await signOut(auth);




export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
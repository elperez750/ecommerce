import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const signIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);

    }

    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}> 
                Sign In with Google poput
            </button>
        </div>
    )
}


export default signIn;
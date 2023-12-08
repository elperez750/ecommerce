import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, auth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const signIn = () => {

   


    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
        const userDocRef = await createUserDocumentFromAuth(user);

    };


   
    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}> 
                Sign In with Google poput
            </button>
            
            <SignUpForm />
        </div>
    )
}


export default signIn;
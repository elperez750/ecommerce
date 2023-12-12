import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss"
import Button from "../button/button.component";


const defaultFormFields = {
    email: "",
    password: "", 
}




const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const signInWithGoogle = async () => {
            await signInWithGooglePopup();
    
        };
    

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
       

        try {
            await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();


        } catch(error){
        switch (error.code) {
            case "auth/wrong-password":
                alert("Wrong Password");
                break;
            case "auth/user-not-found":
                alert("User not found");
                break;
            case "auth/network-request-failed":
                alert("Network request failed");
                break;
            default:
                alert(error.message);
                break;
        }

    }
}

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})

    };


    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                />
                <div className="buttons-container">
                    
                
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>

                </div>
            </form>
        </div>
    )
}


export default SignInForm;


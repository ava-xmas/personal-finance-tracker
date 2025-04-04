// import { Auth } from "../view/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const signInUser = async (auth, email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully.", email);
    } catch (e) {
        console.log("Error signing in: ", e);
    }
};

export const registerUser = async (auth, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully", email);
    } catch (e) {
        console.log("Error singing in: ", e);
    }
};
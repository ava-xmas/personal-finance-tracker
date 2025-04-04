import { auth } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInUser, registerUser } from "../../firebase/auth";
import { useState } from "react";

export const AuthView = ({ onSignIn, onRegister }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email); // ? so that we're not trying to access objects that don't exist

    // we should always handle our errors when using async await
    const handleSignIn = async () => {
        try {
            await signInUser(auth, email, password);
        } catch (e) {
            console.log(e);
        }
    }

    const handleRegister = async () => {
        try {
            await registerUser(auth, email, password);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleRegister}>Sign Up</button>
        </div>
    );
};
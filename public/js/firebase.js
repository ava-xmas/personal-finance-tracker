import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// auth
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
// firestore
import { getFirestore, setDoc, doc, addDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { capitalize } from "./utils.js";
import { firebaseConfig } from "./env.js";

// initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (loggedInUserId) {
        console.log("User is logged in.", user.email);
        localStorage.setItem("loggedInUserEmail", user.email);
        localStorage.setItem("loggedInUserId", user.uid);
    } else {
        console.log("User is not logged in.");
        localStorage.removeItem("loggedInUserEmail");
        localStorage.removeItem("loggedInUserId");
    }
});

if (auth.currentUser) {
    getElementById("navbar-text").style.display = "none";
}

// authentication

function showErrorMessage(message, id) {
    var element = document.getElementById(id);
    element.innerHTML = message;
}

// sign up

const submitSignup = document.getElementById('submitSignup');
submitSignup.addEventListener('click', (event) => {
    event.preventDefault();

    // get the values of the input fields
    const signupEmail = document.getElementById('signupInputEmail').value;
    const signupPassword = document.getElementById('signupInputPassword').value;
    const signupError = document.getElementById('signup-error');

    const auth = getAuth();
    const db = getFirestore();

    console.log("In the console.");

    // showErrorMessage("Working!", "signup-error");

    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredentials) => {
            // const user = userCredentials.user;
            // const userData = {
            //     email: email,
            // };
            showErrorMessage("Account created successfully!", "signup-error");
            // const docRef = doc(db, "users", user.uid);
            // setDoc(docRef, userData)
            //     .then(() => {
            //         window.location.href = 'index.html';
            //     })
            //     .catch((error) => {
            //         showErrorMessage(error.message, "signup-error");
            //     });
        })
        .catch((error) => {
            showErrorMessage(error.message, 'signup-error');
        });
});

// log in

const submitLogin = document.getElementById('submitLogin');
submitLogin.addEventListener('click', (event) => {
    console.log(auth)

    event.preventDefault();

    // get the values of the input fields
    const loginEmail = document.getElementById('loginInputEmail').value;
    const loginPassword = document.getElementById('loginInputPassword').value;
    const loginError = document.getElementById("login-error");

    const auth = getAuth();

    console.log("User is attempting to log in.", auth.currentUser);

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredentials) => {
            showErrorMessage("Logged in successfully!", "login-error");
            console.log("Logged in!", userCredentials.user);
            const user = userCredentials.user;
            localStorage.setItem("loggedInUserEmail", user.email);
            localStorage.setItem('loggedInUserId', user.uid);
        })
        .catch((error) => {
            // if the user already is logged in, display the logged in confirmation
            if (auth.currentUser) {
                showErrorMessage("Logged in successfully!", "login-error");
            } else {
                showErrorMessage(error.message, "login-error");
            }
        });
});

// database connection

// adding docs

const submitTransaction = document.getElementById("submitTransaction");
submitTransaction.addEventListener("click", async (event) => {

    // getting the values from the input fields
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);
    // console.log("1");

    // getting the valeue of the radio group - type
    const radios = document.querySelectorAll('input[name="radioDefault"]');
    let selectedValue = "";
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    const type = selectedValue;

    console.log(description, category, amount, type);

    const user = auth.currentUser;

    if (user) {
        try {
            const docRef = await addDoc(collection(db, "transactions"), {
                amount: amount,
                category: category.toLowerCase(),
                description: description,
                type: type,
                createdAt: new Date(),
                date: Date.now(),
            });
            console.log("Doc added", docRef);
            document.getElementById("description").value = "";
            document.getElementById("category").value = "None";
            document.getElementById("amount").value = 0;
        } catch (error) {
            console.log("Error adding document: ", error);
        }
    } else {
        console.log("No user is logged in.");
    }
});

// getting docs

const historyTable = document.getElementById("history-table");
const historyBody = document.getElementById("history-body");

export const getHistory = async () => {
    console.log("Inside the get history function")
    const q = query(collection(db, "transactions"), where("amount", "!=", 0));
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });

        if (doc.length == 0) {
            historyBody.innerHTML = "Nothing to show here."
        } else {
            querySnapshot.forEach((doc, index) => {
                const tableRow = `
                <tr>
                <td>${capitalize(doc.data().category)}</td>
                <td>${doc.data().amount}</td>
                <td>${doc.data().description}</td>
                </tr>
                `;

                historyBody.innerHTML += tableRow;
            })
        }
    } catch (error) {

    }
}

const historyHeading = document.getElementById("history-heading");
historyHeading.addEventListener('click', getHistory);
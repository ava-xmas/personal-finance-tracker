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
    event.preventDefault();

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
    const type = "Expense";

    const date = document.getElementById("date").value;

    console.log(description, category, amount, type, date);
    console.log("Doc not yet added.");

    // adding checks to see if the user has left some fields empty
    const transactionError = document.getElementById("transaction-error");

    if (description == null || description == " ") {
        transactionError.innerHTML = "You cannot leave the description field empty."
    } else if (amount == 0 || amount == NaN) {
        transactionError.innerHTML = "You cannot leave the amount empty or zero."
    } else {
        const user = auth.currentUser;
        if (user) {
            try {
                const docRef = await addDoc(collection(db, "transactions"), {
                    amount: amount,
                    category: category.toLowerCase(),
                    description: description,
                    type: type,
                    createdAt: new Date(),
                    date: date,
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
    }
});

// getting docs

const historyTable = document.getElementById("history-table");
const historyBody = document.getElementById("history-body");
const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg>`;
const tableClass = "text-center"

export const getDocsFromFirebase = async () => {
    let q = query(collection(db, "transactions"), where("amount", "!=", 0));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}

export const getHistory = async () => {
    console.log("Inside the get history function");
    const q = query(collection(db, "transactions"), where("amount", "!=", 0));
    try {
        // const querySnapshot = await getDocs(q);
        const querySnapshot = await getDocsFromFirebase();
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });

        if (doc.length == 0) {
            historyBody.innerHTML = "";
            historyBody.innerHTML = "Nothing to show here."
        } else {
            historyBody.innerHTML = "";
            querySnapshot.forEach((doc, index) => {
                const tableRow = `
                ${doc.data().type == "Expense" ? '<tr class="table-danger">' : '<tr class="table-primary">'}
                <td class=${tableClass}>${capitalize(doc.data().category)}</td>
                <td class=${tableClass}>${doc.data().amount}</td>
                <td class=${tableClass}>${doc.data().description}</td>
                <td class=${tableClass}>${(new Date(doc.data().date)).toString().slice(0, 15)}</td>
                <td class=${tableClass}><button type="button" class="btn btn-primary" id="delete-${doc.id}">${deleteIcon}</button></td>
                </tr>
                `;

                historyBody.innerHTML += tableRow;
            })
        }
    } catch (error) {

    }
}

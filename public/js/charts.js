import { findPastSixMonths, findMonth, Transaction, capitalize } from "./utils.js";
import { getDocsFromFirebase } from "./firebase.js";

// getting the value of current month
let currentMonth = (new Date()).toString().slice(4, 7);
// console.log(currentMonth);

// finding the past six months from the current month
let pastMonthsList = findPastSixMonths(currentMonth);

// getting docs from firebase
const querySnapshot = await getDocsFromFirebase();

// creating the object and keys that will store the Transactions for each month
const transactionObj = {};
for (let month of pastMonthsList) {
    transactionObj[month] = [];
}

// adding the values to that object
querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    let month = findMonth(doc);
    // console.log(month);
    let data = doc.data();

    // add the transaction object to the corresponding month array
    if (pastMonthsList.includes(month)) {
        transactionObj[month].push(new Transaction(data.description, data.amount, capitalize(data.category), data.date, data.createdAt));
    }
})


const categoryList = ["None", "Food", "Entertainment", "Beauty", "Transport", "Medical", "Education"];
const monthWiseData = {};

// initializing monthwisedata with categories and amount = 0
for (let month of pastMonthsList) {
    monthWiseData[month] = categoryList.map(category => ({
        category: category,
        amount: 0
    }));
}

querySnapshot.forEach((doc) => {
    let data = doc.data();
    let month = findMonth(doc);
    console.log(month);
    let category = data.category;
    console.log(category);

    // find the corresponding category in the current month and update the amount
    if (monthWiseData[month]) {
        monthWiseData[month].forEach((item) => {
            if (item.category == capitalize(category)) {
                // add the amount to the corresponding category
                item.amount += data.amount;
            }
        });
    }
});

console.log(monthWiseData);

console.log(monthWiseData[pastMonthsList[5]]);

new Chart(
    document.getElementById('chart1'),
    {
        type: 'bar',
        data: {
            labels: monthWiseData[pastMonthsList[5]].map(row => row.category),
            datasets: [
                {
                    label: `Amount spent by month in ${pastMonthsList[5]}`,
                    data: monthWiseData[pastMonthsList[5]].map(row => row.amount),
                }
            ]
        }
    }
);

new Chart(
    document.getElementById('chart2'),
    {
        type: 'bar',
        data: {
            labels: monthWiseData[pastMonthsList[4]].map(row => row.category),
            datasets: [
                {
                    label: `Amount spent by month in ${pastMonthsList[4]}`,
                    data: monthWiseData[pastMonthsList[4]].map(row => row.amount),
                }
            ]
        }
    }
);

new Chart(
    document.getElementById('chart3'),
    {
        type: 'bar',
        data: {
            labels: monthWiseData[pastMonthsList[3]].map(row => row.category),
            datasets: [
                {
                    label: `Amount spent by month in ${pastMonthsList[3]}`,
                    data: monthWiseData[pastMonthsList[3]].map(row => row.amount),
                }
            ]
        }
    }
);

new Chart(
    document.getElementById('chart4'),
    {
        type: 'bar',
        data: {
            labels: monthWiseData[pastMonthsList[2]].map(row => row.category),
            datasets: [
                {
                    label: `Amount spent by month in ${pastMonthsList[2]}`,
                    data: monthWiseData[pastMonthsList[2]].map(row => row.amount),
                }
            ]
        }
    }
);

new Chart(
    document.getElementById('chart5'),
    {
        type: 'bar',
        data: {
            labels: monthWiseData[pastMonthsList[1]].map(row => row.category),
            datasets: [
                {
                    label: `Amount spent by month in ${pastMonthsList[1]}`,
                    data: monthWiseData[pastMonthsList[1]].map(row => row.amount),
                }
            ]
        }
    }
);

new Chart(
    document.getElementById('chart6'),
    {
        type: 'bar',
        data: {
            labels: monthWiseData[pastMonthsList[0]].map(row => row.category),
            datasets: [
                {
                    label: `Amount spent by month in ${pastMonthsList[0]}`,
                    data: monthWiseData[pastMonthsList[0]].map(row => row.amount),
                }
            ]
        }
    }
);
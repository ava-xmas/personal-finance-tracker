import { findPastSixMonths, findMonth, Transaction, capitalize } from "./utils.js";
import { getDocsFromFirebase } from "./firebase.js";

// import { Chart } from "../../node_modules/chart.js/dist/chart.js";

// (async function () {
//     const data = [
//         { year: 2010, count: 10 },
//         { year: 2011, count: 9 },
//         { year: 2012, count: 33 },
//         { year: 2013, count: 54 },
//         { year: 2014, count: 12 },
//         { year: 2015, count: 78 },
//         { year: 2016, count: 55 },
//         { year: 2017, count: 28 },
//     ];

//     new Chart(
//         document.getElementById("acquisitions"),
//         {
//             type: 'bar',
//             data: {
//                 labels: data.map(row => row.year),
//                 datasets: [
//                     {
//                         label: 'Acquisition by year',
//                         data: data.map(row => row.count)
//                     }
//                 ]
//             }
//         }
//     );
// })();

let currentMonth = (new Date()).toString().slice(4, 7);
// console.log(currentMonth);
let pastMonthsList = findPastSixMonths(currentMonth);

const querySnapshot = await getDocsFromFirebase();
const transactionObj = {};
console.log("Hi!!");

for (let month of pastMonthsList) {
    transactionObj[month] = [];
}

querySnapshot.forEach((doc) => {
    console.log(doc.data());
    let month = findMonth(doc);
    console.log(month);
    let data = doc.data();

    // add the transaction object to the corresponding month array
    if (pastMonthsList.includes(month)) {
        transactionObj[month].push(new Transaction(data.description, data.amount, capitalize(data.category), data.date, data.createdAt));
    }
})

console.log(querySnapshot);
console.log(transactionObj, "new");
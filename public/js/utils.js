export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

window.capitalize = capitalize;

const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function findPastSixMonths(month) {
    let currentMonthIndex = monthList.indexOf(month);
    // console.log("Current month index:", currentMonthIndex);

    if (currentMonthIndex < 6) {
        currentMonthIndex += 12;
    }

    const firstMonthIndex = currentMonthIndex - 5;
    const combinedList = monthList.concat(monthList);

    const myList = combinedList.slice(firstMonthIndex, currentMonthIndex + 1);
    return myList;
}


export function findMonth(doc) {
    return (new Date(doc.data().date)).toString().slice(4, 7);
}

export class Transaction {
    constructor(description, amount, category, type, date, createdAt) {
        this.description = description;
        this._amount = 0; // initializing to 0
        this.amount = amount;
        // triggers the setter defined in our class which validates the amount 
        // and applies the valie to _amount if the validation passes
        this.category = category;
        this.type = type;
        this.date = date;
        this.createdAt = createdAt;
    }

    // the getter for amount is called every time we try to access the value of amount
    // any logic inside the getter is also executed with it 
    get amount() {
        return this._amount;
    }

    // the setter is activated when we assign a value to the property
    // instead of directly modifying the property, the setter method is invoked
    // allows us to apply validation or transformation logic before setting the value
    set amount(value) {
        if (value < 0) {
            console.log("Amount cannot be less than 0!");
        } else {
            this._amount = value;
        }
    }
}
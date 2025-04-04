export default function TransactionForm() {
    return (
        <>
            <form action="">
                <h3>Add Transaction</h3>
                <div>
                    <label htmlFor="">Description</label>
                    <input type="text" name="description" required />
                </div>
                <div>
                    <label htmlFor="">Amount</label>
                    <input type="number" name="amout" required />
                </div>
                <div>
                    <label htmlFor="">Category</label>
                    <input type="text" name="category" required />
                </div>
                <div>
                    <label htmlFor="" for="expense">Expense</label>
                    <input type="radio" name="type" value="expense" />
                    <label htmlFor="" for="income">Income</label>
                    <input type="radio" name="type" value="income" />
                </div>
                <div>
                    <label htmlFor="">Date</label>
                    <input type="date" name="date" required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
// Given an array of expenses.  Return the total sum of their values

export default (expenses) => {
    return expenses.map((expense) => {
        return typeof expense.amount === 'number' ? expense.amount : 0;
    }).reduce(((accum, val) => accum + val), 0);
}
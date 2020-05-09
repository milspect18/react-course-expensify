import { v4 as uuid } from 'uuid';
import database, { expensesRef } from '../firebase/firebase';

// Action Generators for expenses data
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


export const startAddExpense = (expenseData) => {
    return (dispatch) => {
        const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
        const expense = { description, note, amount, createdAt };

        return expensesRef.push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
    };
};


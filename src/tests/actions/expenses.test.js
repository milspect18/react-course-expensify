import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should setup removeExpense action object', () => {
    const action = removeExpense({ id: '123ABC' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123ABC'
    });
});

test('Should build an editExpense action object', () => {
    const actionId = 42
    const editAction = { amount: 101010, description: 'Test Expense', createdAt: 12345 };
    const action = editExpense(actionId, editAction);

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 42,
        updates: {
            amount: 101010,
            description: 'Test Expense',
            createdAt: 12345
        }
    });
});

test('Should setup addExpense action with custom values', () => {
    const expenseData = {
        description: 'Test Description',
        note: 'Test Note',
        amount: 42,
        createdAt: 1000
    }
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('Should setup addExpense action with default values', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});

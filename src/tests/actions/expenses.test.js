import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addExpense,
    editExpense,
    removeExpense,
    startEditExpense,
    startAddExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, note, amount, createdAt };
    });

    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('Should setup removeExpense action object', () => {
    const action = removeExpense({ id: '123ABC' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123ABC'
    });
});

test('Should remove expense from database', (done) => {
    const id = expenses[1].id;
    const store = createMockStore({ auth: { uid } });

    database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
        expect(snapshot.val()).toBeTruthy();
    }).then(() => {
        store.dispatch(startRemoveExpense({ id })).then(() => {
            const action = store.getActions()[0];

            expect(action).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            });
        });
    }).then(() => {
        database.ref(`expenses/${id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toBeNull();
            done();
        });
    });

})

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

test('Should edit a firebase expense', (done) => {
    const store = createMockStore({ auth: { uid } });
    const id = expenses[2].id;
    const existingAmount = expenses[2].amount;
    const newAmount = existingAmount + 5000;

    database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
        expect(snapshot.val().amount).toBe(existingAmount);
    }).then(() => {
        store.dispatch(startEditExpense(id, { amount: newAmount })).then(() => {
            const action = store.getActions()[0];
            expect(action).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates: {
                    amount: newAmount
                }
            });
        });
    }).then(() => {
        database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
            expect(snapshot.val().amount).toBe(newAmount);
            done();
        });
    });
});

test('Should setup addExpense action with custom values', () => {
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'Best mouse ever',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    const defaultData = { description: '', note: '', amount: 0, createdAt: 0 };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);
        done();
    });
});

test('Should setup set expenses action object', () => {
    const result = setExpenses(expenses);

    expect(result).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('Should fetch expenses from firebase', (done) => {
    const store = createMockStore({ auth: { uid } });

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });

        done();
    });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
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

        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
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

        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);
        done();
    });
});

// test('Should setup addExpense action with default values', () => {
//     const action = addExpense();

//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     });
// });

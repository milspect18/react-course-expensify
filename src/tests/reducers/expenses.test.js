import expenseReducer from '../../reducers/expenses';
import moment from 'moment';
import testState from '../fixtures/expenses';

test('Should verify state init', () => {
    const result = expenseReducer(undefined, { type: '@@INIT' });

    expect(result).toEqual([]);
});

test('Should add an expense to the test state', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: 4,
            description: 'Boat',
            note: '',
            amount: 1000000,
            createdAt: moment()
        }
    };
    const result = expenseReducer(testState, action);

    expect(result).toEqual([...testState, action.expense]);
});

test('Should remove an expense from the test state', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: testState[1].id
    };
    const result = expenseReducer(testState, action);

    expect(result).toEqual([testState[0], testState[2]]);
});

test('Should try to remove invalid id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: 20
    };
    const result = expenseReducer(testState, action);

    expect(result).toEqual(testState);
});

test('Should modify an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: testState[0].id,
        updates: {
            amount: 205,
            description: 'Updated'
        }
    };
    const result = expenseReducer(testState, action);

    expect(result).toEqual([
        { id: 1, description: 'Updated', note: '', amount: 205, createdAt: 100 },
        testState[1],
        testState[2]
    ]);
});

test('Should try to modify an expense with invalid id', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 10,
        updates: {
            amount: 205,
            description: 'Updated'
        }
    };
    const result = expenseReducer(testState, action);

    expect(result).toEqual(testState);
});

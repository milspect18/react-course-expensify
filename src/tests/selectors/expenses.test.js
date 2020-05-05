import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('Should filter by text value', () => {
    const searchFilter = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, searchFilter);

    expect(result).toEqual([
        // Ordered by date
        expenses[2],
        expenses[1]
    ]);
});


test('Should filter by start date', () => {
    const searchFilter = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectExpenses(expenses, searchFilter);

    expect(result).toEqual([
        expenses[2],
        expenses[0]
    ]);
});


test('Should filter by endDate', () => {
    const searchFilter = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };
    const result = selectExpenses(expenses, searchFilter);

    expect(result).toEqual([
        expenses[0],
        expenses[1]
    ]);
});


test('Should sort by date', () => {
    const searchFilter = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, searchFilter);

    expect(result).toEqual([
        expenses[2],
        expenses[0],
        expenses[1]
    ]);
});


test('Should sort by amount', () => {
    const searchFilter = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, searchFilter);

    expect(result).toEqual([
        expenses[1],
        expenses[2],
        expenses[0]
    ]);
});

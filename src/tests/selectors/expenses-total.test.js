import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';


test('Should calculate total amount of multiple expenses', () => {
    const result = getExpensesTotal(expenses);  // should be 226762

    expect(result).toBe(226762);
});

test('Should calculate total amount from zero expenses', () => {
    const result = getExpensesTotal([]);

    expect(result).toBe(0);
});

test('Should calculate total amount from single expense', () => {
    const result = getExpensesTotal([expenses[0]]);

    expect(result).toBe(195);
});

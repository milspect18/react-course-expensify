import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    addExpenseSpy = jest.fn();
    historySpy = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage history={historySpy} addExpense={addExpenseSpy} />);
});

test('Should render the add expense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);

    expect(historySpy.push).lastCalledWith('/');
    expect(addExpenseSpy).lastCalledWith(expenses[2]);
});

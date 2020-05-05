import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpenseSpy, removeExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    editExpenseSpy = jest.fn();
    removeExpenseSpy = jest.fn();
    historySpy = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            expenseToEdit={expenses[1]}
            editExpense={editExpenseSpy}
            removeExpense={removeExpenseSpy}
            history={historySpy}
        />
    );
});

test('Should render edit expense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should ensure on click is firing', () => {
    wrapper.find('button').simulate('click');

    expect(removeExpenseSpy).lastCalledWith(expenses[1].id);
    expect(historySpy.push).lastCalledWith('/');
});

test('Should fire onSubmit event', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);

    expect(editExpenseSpy).lastCalledWith(expenses[1].id, expenses[2]);
    expect(historySpy.push).lastCalledWith('/');
});

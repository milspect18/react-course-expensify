import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpenseSpy, startRemoveExpense, historySpy, wrapper;

beforeEach(() => {
    editExpenseSpy = jest.fn();
    startRemoveExpense = jest.fn();
    historySpy = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            expenseToEdit={expenses[1]}
            editExpense={editExpenseSpy}
            startRemoveExpense={startRemoveExpense}
            history={historySpy}
        />
    );
});

test('Should render edit expense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should ensure on click is firing', () => {
    wrapper.find('button').simulate('click');

    expect(startRemoveExpense).lastCalledWith(expenses[1].id);
    expect(historySpy.push).lastCalledWith('/');
});

test('Should fire onSubmit event', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);

    expect(editExpenseSpy).lastCalledWith(expenses[1].id, expenses[2]);
    expect(historySpy.push).lastCalledWith('/');
});

import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Should render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
});


test('Should render expense form with passed in data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} />);

    expect(wrapper).toMatchSnapshot();
});

test('Should render error when missing description or amount', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(wrapper.state('formError').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('Should set description state value on input change', () => {
    const value = 'New description value';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(0).simulate('change', { target: { value } });

    expect(wrapper.state('description')).toBe(value);
});

test('Should set note state on user input', () => {
    const value = 'New value string';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('textarea').simulate('change', { target: { value } });

    expect(wrapper.state('note')).toBe(value);
});

test('Should update the value state', () => {
    const value = '13.37';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(1).simulate('change', { target: { value } });

    expect(wrapper.state('amount')).toBe(value);
})

test('Should not update the value state with invalid input', () => {
    const value = 'IMINVALID';
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('input').at(1).simulate('change', { target: { value } });

    expect(wrapper.state('amount')).toBe('');
})

test('should call onSubmit prop for valid submission', () => {
    const onSubmitSpy = jest.fn();
    const { description, amount, note, createdAt } = expenses[0];
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

    wrapper.find('form').simulate('submit', { preventDefault: () => { } });

    expect(wrapper.state('formError')).toBe('');
    expect(onSubmitSpy).toBeCalledWith({ description, amount, note, createdAt });
});

test('Should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const timeVal = moment()

    wrapper.find('SingleDatePicker').prop('onDateChange')(timeVal);

    expect(wrapper.state('createdAt')).toEqual(timeVal);
});

test('Should set new focus value on focus change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });

    expect(wrapper.state('dateFocused')).toEqual(focused);
});

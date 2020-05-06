import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';



test('should render with single expense (singular text)', () => {
    const wrapper = shallow(<ExpenseSummary expenses={[expenses[0]]} />);

    expect(wrapper).toMatchSnapshot();
});


test('should render with multiple expenses (plural text)', () => {
    const wrapper = shallow(<ExpenseSummary expenses={expenses} />);

    expect(wrapper).toMatchSnapshot();
});

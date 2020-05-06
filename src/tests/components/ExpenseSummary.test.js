import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';


test('should render with single expense (singular text)', () => {
    const wrapper = shallow(
        <ExpenseSummary
            expensesCount={1}
            expensesTotal={195}
        />
    );

    expect(wrapper).toMatchSnapshot();
});


test('should render with multiple expenses (plural text)', () => {
    const wrapper = shallow(
        <ExpenseSummary
            expensesCount={3}
            expensesTotal={226762}
        />
    );

    expect(wrapper).toMatchSnapshot();
});

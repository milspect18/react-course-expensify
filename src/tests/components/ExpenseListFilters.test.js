import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            setTextFilter={setTextFilter}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filters={filters}
        />
    );
});


test('Should render expense list filters component', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render expense list filters component with alt data', () => {
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
});

test('Should handle text change', () => {
    wrapper.find('input').simulate('change', { target: { value: 'TESTING' } });

    expect(setTextFilter).lastCalledWith('TESTING');
});

test('Should sort by date', () => {
    wrapper.setProps({ filters: altFilters });

    wrapper.find('select').simulate('change', { target: { value: 'date' } });

    expect(sortByDate).toBeCalled();
});

test('Should sort by amount', () => {
    wrapper.find('select').simulate('change', { target: { value: 'amount' } });

    expect(sortByAmount).toBeCalled();
});

test('Should handle date change', () => {
    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate: altFilters.startDate,
        endDate: altFilters.endDate
    });

    expect(setStartDate).lastCalledWith(altFilters.startDate);
    expect(setEndDate).lastCalledWith(altFilters.endDate);
});

test('Should handle date focus change', () => {
    wrapper.find('DateRangePicker').prop('onFocusChange')('endDate');

    expect(wrapper.state('calenderFocused')).toEqual('endDate');
});


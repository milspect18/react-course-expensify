import { setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';
import { setStartDate, setEndDate } from '../../actions/filters';
import moment from 'moment';


test('Setup a setTextFilter action with custom text', () => {
    const action = setTextFilter('Test');

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Test'
    });
});

test('Setup a setTextFilter action with default text', () => {
    const action = setTextFilter();

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('Setup a sortByAmount action', () => {
    const action = sortByAmount();

    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('Setup a sortByDate action', () => {
    const action = sortByDate();

    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('Setup a setStartDate action', () => {
    const action = setStartDate(moment(1000));

    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(1000)
    });
});

test('Setup a setEndDate action', () => {
    const action = setEndDate(moment(5000));

    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(5000)
    });
});

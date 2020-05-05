import filtersReducer from '../../reducers/filters';
import moment from 'moment';

const testFilter = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}

test('Should ensure filter reducer inits correctly', () => {
    const result = filtersReducer(undefined, { type: '@@INIT' });

    expect(result).toEqual(testFilter);
});

test('Should set the text option of the filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'TestText'
    }
    const result = filtersReducer(testFilter, action);

    expect(result).toEqual({
        ...testFilter,
        text: action.text
    });
});

test('Should set sortBy to amount', () => {
    const action = { type: 'SORT_BY_AMOUNT' };
    const result = filtersReducer(testFilter, action);

    expect(result).toEqual({
        ...testFilter,
        sortBy: 'amount'
    });
});

test('Should set sortBy to date', () => {
    const testFilter = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const action = { type: 'SORT_BY_DATE' };
    const result = filtersReducer(testFilter, action);

    expect(result).toEqual({
        ...testFilter,
        sortBy: 'date'
    });
});

test('Should set startDate to beginning of epoch', () => {
    const action = {
        type: 'SET_START_DATE',
        startDate: moment(0)
    };
    const result = filtersReducer(testFilter, action);

    expect(result).toEqual({
        ...testFilter,
        startDate: moment(0)
    });
});

test('Should set endDate to beginning of epoch', () => {
    const action = {
        type: 'SET_END_DATE',
        endDate: moment(0)
    };
    const result = filtersReducer(testFilter, action);

    expect(result).toEqual({
        ...testFilter,
        endDate: moment(0)
    });
});

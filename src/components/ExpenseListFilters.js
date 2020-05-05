import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';
import { setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';


export class ExpenseListFilters extends React.Component {
    state = {
        calenderFocused: null,
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onDatePickerFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    onSelectChange = (e) => {
        if (e.target.value === 'date') {
            this.props.sortByDate();
        } else if (e.target.value === 'amount') {
            this.props.sortByAmount();
        }
    }

    render() {
        return (
            <div>
                <input
                    type='text'
                    value={this.props.filters.text}
                    onChange={this.onTextChange}
                />
                <select
                    value={this.props.filters.sortBy}
                    onChange={this.onSelectChange}
                >
                    <option value='date'>Date</option>
                    <option value='amount'>Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId={'expenseListFilters_startDateID'}
                    endDate={this.props.filters.endDate}
                    endDateId={'expenseListFilters_endDateID'}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onDatePickerFocusChange}
                    focusedInput={this.state.calenderFocused}
                    isOutsideRange={() => false}
                    numberOfMonths={1}
                    showClearDates={true}
                />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)),
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);

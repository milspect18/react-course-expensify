import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';


export const ExpenseSummary = ({ expenses }) => {
    const numExpenses = expenses.length;
    const total = selectExpensesTotal(expenses);

    return (
        <div>
            {`Viewing ${numExpenses} ${numExpenses === 1 ? 'expense' : 'expenses'} `}
            {`totalling ${numeral(total / 100).format('$0,0.00')}`}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
}

export default connect(mapStateToProps)(ExpenseSummary);

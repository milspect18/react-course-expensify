import React from 'react';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {
    onSubmit = (updatedExpense) => {
        this.props.startEditExpense(this.props.expenseToEdit.id, updatedExpense);
        this.props.history.push('/');
    };

    onClick = () => {
        this.props.startRemoveExpense(this.props.expenseToEdit.id);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>

                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expenseToEdit}
                        onSubmit={this.onSubmit}
                    />

                    <button
                        className="button button--secondary"
                        onClick={this.onClick}
                    >
                        Remove Expense
                    </button>
                </div>
            </div >
        );
    }
}

const maptStateToProps = (state, props) => {
    return {
        expenseToEdit: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startEditExpense: (id, newDetails) => dispatch(startEditExpense(id, newDetails)),
        startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
    };
};

export default connect(maptStateToProps, mapDispatchToProps)(EditExpensePage);

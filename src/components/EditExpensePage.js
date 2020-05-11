import React from 'react';
import { connect } from 'react-redux';
import { editExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {
    onSubmit = (updatedExpense) => {
        this.props.editExpense(this.props.expenseToEdit.id, updatedExpense);
        this.props.history.push('/');
    };

    onClick = () => {
        this.props.startRemoveExpense(this.props.expenseToEdit.id);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expenseToEdit}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onClick} >
                    Remove
                </button>
            </div>
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
        editExpense: (id, newDetails) => dispatch(editExpense(id, newDetails)),
        startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
    };
};

export default connect(maptStateToProps, mapDispatchToProps)(EditExpensePage);

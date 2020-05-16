import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";


export default class ExpenseForm extends React.Component {
    state = {
        description: (this.props.expense ? this.props.expense.description : ""),
        note: (this.props.expense ? this.props.expense.note : ""),
        amount: (this.props.expense ? (this.props.expense.amount / 100.0).toString() : ""),
        createdAt: (this.props.expense ? moment(this.props.expense.createdAt) : moment()),
        dateFocused: false,
        formError: ""
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    }

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;

        // Only update if the input is a number with at most
        // two digits after the decimal place.  Paste the regex
        // into regex101.com for depper explanation
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ dateFocused: focused }));
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ formError: "Please provide a description and amount." }));
        } else {
            this.setState(() => ({ formError: "" }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseInt(parseFloat(this.state.amount) * 100),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.onFormSubmit}>
                {this.state.formError && <p className="form__error">{this.state.formError}</p>}
                <input
                    type="text"
                    className="text-input"
                    placeholder="Description"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    className="text-input"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.dateFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    className="text-area"
                    placeholder="Add a note for your expense (optional"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>

                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        );
    }
}
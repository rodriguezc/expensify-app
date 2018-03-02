import React from "react";
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {editExpense, removeExpense} from "../actions/expenses";


export class EditExpensePage extends React.Component {
    editExpense = (expense) => {
        this.props.dispatch(editExpense(this.props.expense.id, expense));
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={editExpense}
                />
                <button
                    onClick={() => {
                        this.props.dispatch(removeExpense({id: this.props.expense.id}));
                        this.props.history.push("/");
                    }}
                >
                    Remove
                </button>
            </div>
        );
    }
}

// Remove expense via dispatch and then redirect to dashboard

mapStateToProps = (state, props) => {
    console.log("ICILA", props);

    return {
        expense: state.expenses.find(
            expense => expense.id === props.match.params.id
        )
    };
};

connect(mapStateToProps)

(
    EditExpensePage
)
;

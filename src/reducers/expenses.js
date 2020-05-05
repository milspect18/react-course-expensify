// Expenses Reducer
const expenseReducerDefaultState = [];

export default (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // Spread out the existing expenses and add the new one on the end
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            // Filter out the expense id to be removed
            return state.filter((expense) => expense.id !== action.id);
        case 'EDIT_EXPENSE':
            // Find the id we wish to edit and update the state object
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }

                return expense;
            })
        default:
            return state;
    }
};
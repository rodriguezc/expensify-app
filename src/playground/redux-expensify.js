import { createStore, combineReducers } from "redux";
import uuid from "uuid";

//ADD_EXPENSE
const addExpense = (
  { description = "", note = "", amount = 0, createdAt = 0 } = {}
) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

//SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});
//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});
//SET_START_DATE
const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});
//SET_END_DATE
const setEndDate = endDate => ({
  type: "SET_END_DATE",
  endDate
});

//Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense]; //Avec un spread operator
    // =  return state.concat(action.expense); //retourne un nouvel état.
    //L'état étant un tableau, on utilise concat pour créer une copie de ce tableau en ajoutant l'élément en paramètre
    //On ne doit jamais modifier directgement l'état
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);

    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates };
        }
      });

    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };

    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };

    default:
      return state;
  }
};

// timestamps (milliseconds)
// january 1st 1970  (unix epoch)

//get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch =
      typeof startDate !== "number" || expense.createdAt >= startDate;
    const endDateMatch =
      typeof endDate !== "number" || expense.createdAt <= endDate;
    const textMatch =
      typeof text !== "string" ||
      expense.description.toLowerCase().includes(text.toLowerCase());
    return startDateMatch && endDateMatch && textMatch;
  });
};

//Store creation
const store = createStore(
  combineReducers({ expenses: expensesReducer, filters: filtersReducer })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

//store.subscribe(() => {
//  console.log(store.getState());
//});

const expenseOne = store.dispatch(
  addExpense({
    description: "Rent",
    amount: 100,
    createdAt: 1000
  })
);
const expenseTwo = store.dispatch(
  addExpense({
    description: "Coffee",
    amount: 300,
    createdAt: -1000
  })
);

//store.dispatch(removeExpense({ id: expenseOne.expense.id }));

//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter("ffe"));
//store.dispatch(setTextFilter());

//store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

//console.log(expenseOne);
//console.log(expenseTwo);

//store.dispatch(setStartDate(0)); //startDate 125
//store.dispatch(setStartDate()); //startDate undefined
//store.dispatch(setEndDate(999)); //endDate 1250

//dummy data
//const demoState = {
//  expenses: [
//    {
//      id: "poiwadsh",
//      description: "January Rent",
//      note: "This was the final payment for that address",
//      amount: 54500,
//      createdAt: 0
//    }
//  ],
//  filters: {
//    text: "rent",
//   sortBy: "amount", //date or amount
//  startDate: undefined,
//    endDate: undefined
//  }
//};

//const myObject = {
//  a: null,
//  b: "salut"
//};
//console.log(JSON.stringify(myObject));

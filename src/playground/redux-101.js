import { createStore } from "redux";

//Action generators = functions that return action objects

const add = (data = { a: 10, b: 12 }, c) => data.a + data.b + c;
console.log(add({ a: 1, b: 12 }, 10));

const add2 = ({ a, b }, c) => a + b + c;
console.log(add2({ a: 1, b: 12 }, 10));

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ count } = {}) => ({
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET",
  count: 0
});

//Mon premier Store
//Créer un store avec un état initial
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      };

    case "SET":
      return {
        count: action.count
      };

    case "RESET":
      return {
        count: action.count
      };

    default:
      return state;
  }
});

//Demander l'état du store
console.log(store.getState());

//Appelé à chaque fois que le store change
const unsubscribe = store.subscribe(() => {
  console.log("subscription: " + store.getState());
});
//unsubscribe();

//Actions

store.dispatch(incrementCount({ incrementBy: 5 }));
console.log(store.getState());

store.dispatch(decrementCount());
console.log(store.getState());

store.dispatch(decrementCount({ decrementBy: 10 }));
console.log(store.getState());

//I'd like to reset the count to zero
store.dispatch(resetCount());

console.log("setCount 101");
store.dispatch(setCount({ count: 101 }));
console.log(store.getState());

store.dispatch(incrementCount());
console.log(store.getState());

console.log("setCount 101");
store.dispatch(setCount({ count: 110 }));
console.log(store.getState());

store.dispatch(resetCount());
console.log(store.getState());

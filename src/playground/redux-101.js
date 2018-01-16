import { createStore } from "redux";

//Mon premier Store
//Créer un store avec un état initial
const store = createStore((state = { count: 10 }) => {
  return state;
});

//Demander l'état du store
console.log(store.getState());

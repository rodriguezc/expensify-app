//Object destructuring
const person = {
  name: "Andrew",
  age: 27,
  location: {
    city: "Philadelphia",
    temp: 92
  }
};

const { name: firstName = "Anonymous", age } = person;
console.log(`${firstName} is ${age}.`);

//Avant
if (person.location.city && person.location.temp) {
  console.log(`It's ${person.location.temp} in ${person.location.city}`);
}
//Après
const { city, temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}`);
}

const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday",
  publisher: {
    name: "Penguin"
  }
};

const { name: publisherName = "Self-Published" } = book.publisher;

console.log(publisherName);

//Array destructuring
const address = [
  "1299 S Juniper Street",
  "Philadelphia",
  "Pennsylvania",
  "19147"
];
//Avant
console.log(`You are in ${address[1]} ${address[2]} `);

const [, city2, state = "New York"] = address;
console.log(`You are i ${city2} ${state}`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);

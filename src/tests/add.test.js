const add = (a, b) => a + b;

const generateGreeting = (name = "Anonymous") => `Hello ${name}!`;

//Testcase
test("should add two numbers", () => {
  const result = add(3, 4);
  expect(result).toBe(7);
});

//Testcase
test("should generateGreeting from name", () => {
  const result = generateGreeting("Mike");
  expect(result).toBe("Hello Mike!");
});

test("should generateGreeting for no name", () => {
  const result = generateGreeting();
  expect(result).toBe("Hello Anonymous!");
});

// NOTE: in the below examples, none of the annotations are strictly needed.
// "type inference" can take over because all of the variables have been
// initialized with a specific type value. If variable is declared without
// being initialized, then you must add annotations

// by convention, we should rely on type inference whenever possible,
// so the below are more for reference

// the annotation number here tells TS apples should always be a number
let apples: number = 5;

// fine
apples = 10;

// throws error
//apples = 'fruit';

// throws error
//apples = true;

// examples of other types
let speed: string = 'fast';
let hasName: boolean = true;
let nothingMuch: null = null;
let nothing: undefined = undefined;

// built-in objects
let now: Date = new Date();

// arrays string[] indicates "colors" must be an array of strings
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, -200, 0.00123];
let truths: boolean[] = [true, true, false];

// Classes
class Car {}

// variable "car" must be an instance of the "Car" class
let car: Car = new Car();

// Object lierals
let point: { x: number; y: number } = {
  x: 10,
  y: 20
};

// fine
point.x = 30;

// throws an error
//point.x = true;

// Functions
// "(i: number) => void" annotates the type that arg i is expecting, and
// what type the function is expected to return. In this case nothing, or "void"
// with this pattern we're annotating the variable "logNumber" as opposed to the
// function. see functions.ts for the distinction
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

// When to use annotations

// 1) function that returns the 'any' type
// JSON.parse always returns type 'any'. This can be fixed by adding type
// annotations to the parsed object.
const json = '{"x": 10, "y": 20"}';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates); // {x: 10, y: 20}

// 2) when a variable is declared but not initialized on the same line
let words = ['red', 'green', 'blue'];
let foundWord: boolean;

words.forEach(word => {
  if (word === 'green') {
    foundWord = true;
  }
});

// 3) when we have a variable where the type cannot be reasonably inferred (edge case)
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}

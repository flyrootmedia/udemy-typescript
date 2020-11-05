// Generics with Classes

// here we have 2 basically identical classes that handle different types
// (strings vs. numbers);
class ArrayOfNumbers {
  constructor(public collection: number[]) {}

  get(index: number): number {
    return this.collection[index];
  }
}

class ArrayOfStrings {
  constructor(public collection: string[]) {}

  get(index: number): string {
    return this.collection[index];
  }
}

// condense above with generic type
class ArrayOfAnything<T> {
  constructor(public collection: T[]) {}

  get(index: number): T {
    return this.collection[index];
  }
}

// to initialize, pass the type 
const strArr1 = new ArrayOfAnything<string>(['a', 'b', 'c']);

// with type inference (because TS will recognize the type of the arg passed)
const strArr2 = new ArrayOfAnything(['a', 'b', 'c']);

// TS will set the type with the union operator here
const mixedArr = new ArrayOfAnything(['a', 2, false]);

// Generics with functions

// similar to the class example we have 2 identical functions below
// that expect different types as args
function printString(arr: string[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

function printNumbers(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// ...so we condense with a generic type
function printAnything<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// to call
printAnything<string>(['a', 'b', 'c']);

// NOTE: we don't indicate an array in the type like below, because that would tell
// the "printAnything" function that we're passing a 2 dimensional array because <T> 
// would get string[], then the arr arg would get string[][]
printAnything<string[]>([['a'], ['b'], ['c']]);

// type inference works here, too, but it's recommended to leave the type 
// annotation to help make sure your args are correct
printAnything(['a', 'b', 'c']);


// Generic Constraints

class Car {
  print() {
    console.log('I am a car');
  }
}

class House {
  print() {
    console.log('I am a house');
  }
}

interface Printable {
  print(): void;
}

// define an interface and extend it with the T arg to limit 
// the types that can be passed to the function 
function printHousesOrCars<T extends Printable>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  }
}

printHousesOrCars<House>([new House(), new House()]);
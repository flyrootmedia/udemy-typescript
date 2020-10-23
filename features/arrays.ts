// type inference will work here to assume carMakers will always contain strings
const carMakers = ['ford', 'toyota', 'chevy'];

// if initialized with no values in the array, must annotate type
const carMakersEmpty: string[] = [];

// can add complex objects and TS will infer properly
const dates = [new Date(), new Date()];

// for 2 dimensional arrays, inference also works, or you can annotate with:
const carsByMake = [['f150'], ['corolla'], ['camaro']];

// to annotate a 2 dimensional array:
const carsByMakeEmpty: string[][] = []; // --> "contains an array of arrays of strings"

// help with inference when extracting values. TS knows the array we're accessing contains
// strings, so it knows the below vars will be strings.
const carMaker = carMakers[0];
const myCar = carMakers.pop();

// prevent incompatible values
// this will throw an error:
//carMakers.push(100);

// help with 'map', 'forEach', 'reduce'.
// TS will know the return value is a string below, so will help with autocomplete properties
carMakers.map((car: string): string => {
  return car;
});

// flexible types. TS will infer the below can contain Dates OR strings
const importantDates = [new Date(), '2030-10-10'];

// annotate if empty or only initialized with one of the allowed types
const importantDatesEmpty: (Date | string)[] = [];
const importantDatesOneType: (Date | string)[] = [new Date()];

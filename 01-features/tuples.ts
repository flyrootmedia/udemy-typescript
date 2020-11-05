// object structure
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
};

// tuple structure. The order must remain consistent.
// the below annotation '[string, boolean, number]' is what tells TS that the indexes
// must have a specific order
const pepsi: [string, boolean, number] = ['brown', true, 40];

// alternatively you can use "type alias". Create a specific type that can be reused.
type Drink = [string, boolean, number];
const sprite: Drink = ['clear', true, 100];
const tea: Drink = ['brown', false, 0];

// use cases for tuples are few because the data is kind of meaningless when looking at the code since
// you don't have the property labels like in an object, but they're a prominent feature in the TS docs
const carSpecs: [number, number] = [400, 3354];

// vs.
const carStats = {
  horsepower: 400,
  weight: 3354
};

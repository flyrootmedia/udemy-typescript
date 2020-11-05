const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  // using ES2015 syntax for adding a function to an object
  setAge(age: number): void {
    this.age = age;
  }
};

// destructure out age prop from profile
const { age } = profile;

// if you need to annotate the expected type with the destructuring:
//const { age }: { age: number } = profile;

//const { coords: { lat, lng }} = profile;

// to annotate:
const {
  coords: { lat, lng }
}: { coords: { lat: number; lng: number } } = profile;

const today = new Date();
today.getMonth(); // TS knows which properties a Date object has

const person = {
  age: 20
};

person.age; // TS will know the properties a "person" has

class Color {}

const red = new Color(); // TS will know which properties a "Color" has

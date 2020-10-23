// with the below, every time we call a function we need to annotate all the types on the args
const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true
};

const printVehicle = (vehicle: {
  name: string;
  year: number;
  broken: boolean;
}): void => {
  console.log(`
    Name: ${vehicle.name}
    Year: ${vehicle.year}
    Broken? ${vehicle.broken}
  `);
};

printVehicle(oldCivic);

// the above works, but it's tedious and difficult to read. Instead use an interface:
// NOTE: interface properties can be primitive types, complex objects (e.g. Date), or
// functions
interface Summary {
  summary(): string; // function called 'summary' that returns a string
}

// both of 'newCamry' and 'soda' below satisfy the Summary interface even though
// they are very different objects. This encourages the creation of more
// reusable/generic functions like "printSummary" below
const newCamry = {
  name: 'camry',
  year: new Date(),
  broken: false,
  color: 'red',
  summary(): string {
    return `
      Name: ${this.name}
      Year: ${this.year}
      Broken? ${this.broken}
    `;
  }
};

const soda = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  }
};

const printSummary = (summary: Summary): void => {
  console.log(summary.summary());
};

// now as long as the arg object satisfies the properties of a 'Summary' interface,
// you can pass it to printSummary. Note you can ADD more
// properties to the object that are NOT required by the Summary interface
printSummary(soda);

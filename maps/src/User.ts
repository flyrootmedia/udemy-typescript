// need to manually install types definition file for faker - @types/faker
import faker from 'faker';
import { Mappable } from './CustomMap';

// by importing the Mappable interface and marking User as implementing
// that interface, we'll get error messages here, too, not just where User
// is used (index.ts in this case). This is not required, but it helps create
// a direct relationship.
export class User implements Mappable {
  name: string;

  // note you must manually initialize the location object before
  // trying to set its properties
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

  markerContent(): string {
    return `User Name: ${this.name}`;
  }
}

// NOTE: you can use a default export, but TypeScript convention is to export properties
// individully so you never have to question whether or not to use curly braces in your imports.
// you just always use them.

// Note: as of the time I'm writing this, when using decorators you must uncomment the "Experimental Options"
// section of tsconfig.json because they are still exerimental

import 'reflect-metadata';

const plane = {
  color: 'red'
};

// args: key, value, object to attach it to
Reflect.defineMetadata('note', 'hi there', plane);
Reflect.defineMetadata('height', 10, plane);

// metadata is not displayed in console if you simply log the object. You must retreive it:
const note = Reflect.getMetadata('note', plane);
const height = Reflect.getMetadata('height', plane);

// console.log(note); // => hi there
// console.log(height); // => 10

// attach metadata to a specific object key
Reflect.defineMetadata('note', 'this is the color prop', plane, 'color');

const colorNote = Reflect.getMetadata('note', plane, 'color');

// console.log(colorNote);

// Decorator/Metadata combination in use

@printMetadata
class Airplane {
  color: string = 'red';

  @markFunction('Let\'s get ready to fly')
  fly(): void {
    console.log('vrrrrrr');
  }

  @markFunction('Prepare for landing')
  land(): void {
    console.log('screeee');
  }
}

function markFunction (secretInfo: string) {
  return function (target: Airplane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  }
}

//const secret = Reflect.getMetadata('secret', Airplane.prototype, 'fly');
//console.log(secret);

function printMetadata(target: typeof Airplane) {
  // "key" will be any methods in the class, so this will log out "secret" on any method 
  // that has the markFunction decorator
  for (let key in target.prototype) {
    const keySecret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(keySecret);
  }
}
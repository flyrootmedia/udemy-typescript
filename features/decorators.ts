// Note: as of the time I'm writing this, when using decorators you must uncomment the "Experimental Options"
// section of tsconfig.json because they are still exerimental

@classDecorator
class Boat {
  @propertyDecorator
  color: string = 'red';

  @propertyDecorator
  get formattedColor(): string {
    return `This boat's color is ${this.color}`;
  }

  @logError('Oops, boat was sunk')
  pilot(
    @parameterDecorator speed: string, 
    @parameterDecorator generateWake: boolean
  ): void {
    //throw new Error();

    if (speed === 'fast') {
      console.log('swish');
    } else {
      console.log('nothing');
    }
  }
}

// wrapping the decorator in a containg function that returns the actual decorator
// allows you to pass custom values as args from the decorator, so in this case you 
// could use logError on multiple methods and customize the message
// I was testing and looks like if you just want the default message, you'd have to 
// call the decorator above the method like @logError() (as opposed to simply @logError )
function logError(errorMessage: string = 'Default error message') {
  // target, key, and desc are standard for decorators
  // "PropertyDescriptor" type interface is available in es5
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    // you must use the property descriptor to update any properties (see below)
    const method = desc.value;

    // "value" is a property defined in the PropertyDescriptor interface
    desc.value = function() {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    }
  }
}

// need to create an instance and call pilot() to see the actual error 
// new Boat().pilot();

function propertyDecorator(target: any, key: string) {
  // note that target returns the constructor, which only contains methods of the class, 
  // so we'll never be able to access, for example, the value of property "color" using the target.
  // this is a limitation, so adding a decorator to a property definition really only tells us that 
  // the propery exists. We can't access it
  console.log('propertyDecorator: target:', target); // => testDecorator target: Boat { pilot: [Function] }
  console.log('propertyDecorator: key:', key); // => key: color
}

// the index arg is the index of the arg passed to the method on which the decorator is applied
function parameterDecorator(target: any, key: string, index: number) {
  console.log('parameterDecorator: key, index:', key, index);
}

// when adding a decorator to a class, the only arg will be the constructor function of the class,
// so you can pass either "Function" or the specific type, like "typeof Boat"
function classDecorator(constructor: typeof Boat) {
  console.log('classDecorator: constructor:', constructor);
}


// Notes on PropertyDescriptor interface:

// this is from the type definition file
// interface PropertyDescriptor {
//   configurable?: boolean;
//   enumerable?: boolean;
//   value?: any;
//   writable?: boolean;
//   get?(): any;
//   set?(v: any): void;
// }

// const carPropDesc = {
//   make: 'honda',
//   year: 2000
// }

// console.log(Object.getOwnPropertyDescriptor(carPropDesc, 'make'));

// prints:

// {
//   value: 'honda',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

// now you can change with:

// Object.defineProperty(carPropDesc, 'make', { writable: false });

// ...and if you log it out again, the "writable" property will have been updated



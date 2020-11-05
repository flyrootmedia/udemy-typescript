export class Attributes<T> {
  constructor(private data: T) {}

  // generic constraint used here. "K" is convention.
  // This syntax says that the key arg (K) must be a key of the type T 
  // where T is the data type passed to the constructor.
  // the return type is essentially a normal object lookup, returning, 
  // in this case, the value at key "K" of the interface "T"
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  // note: the update arg should be passed as an object
  set = (update: T): void => {
    Object.assign(this.data, update);
  }

  getAll = (): T => {
    return this.data;
  }
}


// the below is an example that demonstrates how the generic 
// constraint in the get() method works. You'll see that TS correctly 
// annotates "id" and "age" as numbers, and "name" as a string

// import { UserProps } from './User';

// const attrs = new Attributes<UserProps>({
//   id: 5,
//   age: 20,
//   name: 'Erik'
// });

// const id = attrs.get('id');
// const name = attrs.get('name');
// const age = attrs.get('age');
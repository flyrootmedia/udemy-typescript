// this final refactor implements Sorter as an ABSTRACT parent class, where each collection 
// will extend the Sorter, so the Sortable interface isn't used
export abstract class Sorter {
  // since length is a getter we just set it like a property, not a methoc
  abstract length: number;
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;

  sort(): void {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}

// This commented out version implements a sortable collection interface,
// where you can instantiate the Sorter individually

// export interface Sortable {
//   length: number;
//   compare(leftIndex: number, rightIndex: number): boolean;
//   swap(leftIndex: number, rightIndex: number): void;
// }

// export class Sorter {
//   constructor(public collection: Sortable) {}

//   sort(): void {
//     const { length } = this.collection;

//     for (let i = 0; i < length; i++) {
//       for (let j = 0; j < length - i - 1; j++) {
//         if (this.collection.compare(j, j + 1)) {
//           this.collection.swap(j, j + 1);
//         }
//       }
//     }
//   }
// }



// This commented out version is one way to handle this, but not recommended 
// because it requires you to again add support for every type of data in the union 
// and in the if statements below. Leaving it in because it explains the "bubble sort" 
// and "type guards". Was refactored to above.

// class Sorter {
//   constructor(public collection: number[] | string) {}

//   sort(): void {
//     // "bubble sort algorithm - checks consecutive pairs of values and keeps moving 
//     // the higher one to the right until they're all sorted
//     const { length } = this.collection;

//     for (let i = 0; i < length; i++) {
//       // each iteration we stop before the last sorted number which has been 
//       // moved to the end of the array
//       for (let j = 0; j < length - i - 1; j++) {
//         // this condition is called a "type guard". TS will now allow us to manipulate
//         // it as an array of numbers, eliminating the union restrictions
//         if (this.collection instanceof Array) {
//           if (this.collection[j] > this.collection[j+1]) {
//             // if the left element in the pair is greater than the right, 
//             // swap their values
//             const leftHand = this.collection[j];
//             this.collection[j] = this.collection[j+1];
//             this.collection[j+1] = leftHand;
//           }
//         }

//         // type guard for strings
//         if (typeof this.collection === 'string') {
//           // logic to compare string chars
//         }

//       }
//     }
//   }
// }
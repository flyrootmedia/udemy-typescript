import { NumbersCollection } from './NumbersCollection';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from './LinkedList';

const numbersCollection = new NumbersCollection([1, 10, -3, 25, -10]);
const charactersCollection = new CharactersCollection('testsortstring');
const linkedList = new LinkedList();

linkedList.add(20);
linkedList.add(2);
linkedList.add(-2);
linkedList.add(47);
linkedList.add(32);

numbersCollection.sort();
charactersCollection.sort();
linkedList.sort();

console.log(numbersCollection.data);
console.log(charactersCollection.data);
linkedList.print();
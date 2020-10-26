import { User } from './models/User';

const user = new User({ name: 'myName', age: 20 });

user.on('change', () => {
  console.log('change 1');
});

user.on('change', () => {
  console.log('change 2');
});

user.on('test', () => {
  console.log('test');
});

console.log(user);
user.trigger('change');
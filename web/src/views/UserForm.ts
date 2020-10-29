import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  // see web/src/models/Eventing.ts for below syntax explanation 
  eventsMap(): { [key: string]: () => void } {
    // this is an old but simpler way of handling event mapping (simpler compared 
    // to React or Angular)
    return {
      'click:[data-js="setAge"]': this.onSetAgeClick,
      'click:[data-js="setName"]': this.onSetNameClick,
      'click:[data-js="saveUser"]': this.onSaveUserClick
    };
  }

  // create as arrow function to avoid "Cannot read property 'setRandomAge' of undefined"
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  onSetNameClick = (): void => {
    // I wanted to use a data attribute selector, so need to cast to input el
    const input = this.parent.querySelector('[data-js="nameField"]') as HTMLInputElement;
    
    // need type guard
    if (input) {
      const name = input.value;
      if (name) {
        this.model.set({ name });
      } else {
        alert('Please enter a name');
      }
    }
  }

  onSaveUserClick = (): void => {
    this.model.save();
  }

  template(): string {
    return `
      <div>
        <input type="text" placeholder="${this.model.get('name')}" data-js="nameField" />
        <button data-js="setName">Change Name</button>
        <button data-js="setAge">Set Random Age</button>
        <button data-js="saveUser">Save User</button>
      </div>
    `
  }
}
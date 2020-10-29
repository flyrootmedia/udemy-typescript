import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserEdit extends View<User, UserProps> {
  regionsMap = (): { [key: string]: string } =>  {
    return {
      userShow: '#userShow',
      userForm: '#userForm'
    }
  }

  template(): string {
    return `
      <div>
        <div id="userShow"></div>
        <div id="userForm"></div>
      </div>
    `
  }
}
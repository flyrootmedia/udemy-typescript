import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';

export class UserEdit extends View<User, UserProps> {
  regionsMap = (): { [key: string]: string } =>  {
    return {
      userShow: '#userShow',
      userForm: '#userForm'
    }
  }

  onRender(): void {
    new UserShow(this.regions.userShow, this.model, true).render();
    new UserForm(this.regions.userForm, this.model).render();
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
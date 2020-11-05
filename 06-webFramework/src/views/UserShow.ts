import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
  constructor(
    public parent: Element, 
    public model: User, 
    public isDetailPage: boolean
  ) {
    super(parent, model);
  }

  template(): string {

    const backLink = this.isDetailPage ? '<div><a href="index.html">&lt; Back</a></div>' : '';
    const header = this.isDetailPage ? '<h1>User Detail</h1>' : '';
    const detailLink = this.isDetailPage ?
      `User Name: ${this.model.get('name')}` : 
      `User Name: <a href="/user.html?id=${this.model.get('id')}">${this.model.get('name')}</a>`

    return `
      <div>
        ${backLink}
        ${header}
        <div>${detailLink}</div>
        <div>User Age: ${this.model.get('age')}</div>
      </div>
    `
  }
}
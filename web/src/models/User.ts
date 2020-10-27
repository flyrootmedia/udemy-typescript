import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

export interface UserProps {
  id?: number; // ? makes the prop optional
  name?: string; 
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    // note we're initializing attributes in the constructor rather than 
    // inline because it requires that we pass it a data object as an arg, 
    // and we won't have that object until the User is initialized
    this.attributes = new Attributes<UserProps>(attrs);
  }
}
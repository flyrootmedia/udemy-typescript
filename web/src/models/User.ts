import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Model } from './Model';
import { Collection } from './Collection';

export interface UserProps {
  id?: number; // ? makes the prop optional
  name?: string; 
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

// using inheritance rather than composition here because of the number of different 
// unique properties we'd have to define on the model if we were going to compose 
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootUrl,
      (json: UserProps) => User.buildUser(json)
    );
  }

  // below was old version which has been refactored to above and Model class

  // public events: Eventing = new Eventing();
  // public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  // public attributes: Attributes<UserProps>;

  // constructor(attrs: UserProps) {
  //   // note we're initializing attributes in the constructor rather than 
  //   // inline because it requires that we pass it a data object as an arg, 
  //   // and we won't have that object until the User is initialized
  //   this.attributes = new Attributes<UserProps>(attrs);
  // }

}
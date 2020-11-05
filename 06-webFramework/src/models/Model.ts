import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(value: T): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  // When using composition we need to create methods that will call the methods 
  // on the backing (composed) modules in order to prevent requiring reaching into 
  // those modules when using the user class. I.e, we want to call "user.save()" not 
  // "user.sync.save()"

  // the following are direct passthrough methods that simply pass args to the composed modules
  // use getters to return REFERENCES to the methods in composed classes. 
  // In this way you don't need to keep the args in sync (note no parens on the references - 
  // we don't want to invoke them)

  // get on() {
  //   return this.events.on;
  // }

  // get trigger() {
  //   return this.events.trigger;
  // }

  // get get() {
  //   return this.attributes.get;
  // }

  // shortened syntax option, equivalent to the getter methods above.
  // NOTE: we can only use this syntax if the modules (events/attributes) are passed as args in the 
  // constructor. If the module properties are declared outside of the constructor (or even inside the 
  // constructor funtion as opposed to as args), the below would get called before the modules are 
  // initialized (because of the way TS is transpiled)
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  // the following need coordination between different modules
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    
    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id.');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      // calling the User set() method rather than this.attributes.set directly only 
      // so we trigger that change event. It could be done either way
      this.set(response.data);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
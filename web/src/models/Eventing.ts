// type annotation for a function with no args, no return value
type Callback = () => void;

export class Eventing {
  // the below syntax tells TS that we know "events" will be an object where 
  // the keys are strings, and they will point to an array of Callbacks, but 
  // we have no idea at this point what the different event keys will be
  events: { [key: string]: Callback[] } = {};
  
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    
    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  }
}
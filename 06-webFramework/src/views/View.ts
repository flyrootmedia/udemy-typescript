import { Model } from '../models/Model';

// the generic type constraints here are gnarly because we need the view to always 
// have a Model type, but Model is also a generic, which currently requires the "HasId" 
// interface. So when creating a View subclass, you need to pass it 2 types:
// - first one (T) must satisfy the Model class properties, like "User"
// - second one (K) must satisfy the "HasId" interface, like "UserProps"
export abstract class View<T extends Model<K>, K> {
  // the elements in the regionsMap
  regions: { [key: string]: Element } = {}

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  // template is required, but must be implemented by the individual views,
  // so making it an abstract property
  abstract template(): string;

  // regionsMap is to define selectors for nested views
  regionsMap(): { [key: string]: string } {
    return {};
  }

  // eventsMap is optional, so create default implementation to return empty
  // object, which can be overridden by the view
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      // es2015 syntax to destructure out the 2 results of the split and 
      // assign to variables
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
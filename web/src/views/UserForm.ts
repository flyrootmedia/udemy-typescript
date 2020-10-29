export class UserForm {
  constructor(public parent: Element) {}

  // see web/src/models/Eventing.ts for below syntax explanation 
  eventsMap(): { [key: string]: () => void } {
    // this is an old but simpler way of handling event mapping (simpler compared 
    // to React or Angular)
    return {
      'click:button': this.onButtonClick,
      'mouseenter:h1': this.onHeaderHover
    };
  }
  
  onButtonClick(): void {
    console.log('button click');
  }

  onHeaderHover(): void {
    console.log('hovered h1');
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <input />
        <button>Click Me</button>
      </div>
    `
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      // es2015 syntax to destructure out the 2 results of the split and 
      // assign to variables
      const [eventName, selector] = eventKey.split(':');

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
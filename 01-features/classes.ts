class Vehicle {
  // properties CAN be initialized when declared here
  // public color: string;
  // public weight: number;

  // to set properties as args when creating an instance, they must be set in
  // the constructor method. Note now all args will be required by instances
  // constructor(color: string, weight: number) {
  //   this.color = color;
  //   this.weight = weight;
  // }

  // shorthand syntax for creating/setting public properties as args:
  constructor(
    public color: string,
    private weight: number,
    protected numOfWheels: number
  ) {}

  // private can only be accessed from inside this class
  private getWeight(): number {
    return this.weight;
  }

  // protected can be accessed by child classes
  protected honk(): void {
    console.log('beep');
  }

  // public accessible from anywhere
  // public keyword is not required since this is default
  public tellMeTheWeight(): void {
    console.log(this.getWeight());
  }

  public tellMeHowManyWheels(): number {
    return this.numOfWheels;
  }
}

// car inherits from vehicle
class Car extends Vehicle {
  // when adding properties to the constructor of a child class, you must still
  // accept all the properties defined in the parent class as args and pass them
  // to the super() method. NOTE: do not add access modifiers to the properties
  // coming from the parent because you don't want to create new property definitions
  // in the child.
  constructor(
    public engine: string,
    color: string,
    weight: number,
    numOfWheels: number
  ) {
    super(color, weight, numOfWheels);
  }

  // override the inherited drive method
  private drive(): void {
    console.log('vroom');
  }

  public startDrivingProcess(): void {
    this.drive();
    this.honk();
    this.tellMeTheWeight();
  }
}

// Vehicle has 3 required args as defined in the constructor
const vehicle = new Vehicle('black', 850, 2);
vehicle.tellMeTheWeight();

// Car has the required "engine" arg defined in the constructor, PLUS the
// additional "color", "weight" and "numOfWheels" args required in the parent Vehicle class
const car = new Car('v8', 'blue', 3000, 6);
car.startDrivingProcess();
console.log(car.tellMeHowManyWheels());

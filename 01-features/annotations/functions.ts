// here we're annotating the arg types, then the return type after the arg list
// should always add annotations for args because type inference doesn't work
// on the arguments. We CAN get inference on the return type based on the body
// of the function, but we shouldn't rely on this. Always annotate the return type.
// This is because if you, for example, forget to add the return statement, TS will
// infer type "void"

// arrow functions
const add = (a: number, b: number): number => {
  return a + b;
};

// here TS would infer a return type of void because we forgot the "return" keyword
const subtract = (a: number, b: number) => {
  a - b;
};

// named functions
function divide(a: number, b: number): number {
  return a / b;
}

// anonymous functions
const multiply = function (a: number, b: number): number {
  return a * b;
};

// void indicates there should be NO value returned
const logger = (message: string): void => {
  console.log(message);
};

// never indicates we'll "never" reach the end of the function and return something,
// rather we're throwing an error and exiting early. This is a rare use case.
const throwError = (message: string): never => {
  throw new Error(message);
};

// more common to do something like this
const throwVoidError = (message: string): void => {
  if (!message) {
    throw new Error(message);
  }
};

const todaysWeather = {
  date: new Date(),
  weather: 'sunny'
};

const logWeather = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};

// using destructuring with annotations
const logWeatherDestructured = ({
  date,
  weather
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};

logWeather(todaysWeather);

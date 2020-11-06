## Integrating Typescript with React and Redux

### Pros

- Far easier to avoid common typos, like incorrect action types
- Gives devs a far better understanding of the type of data flowing around the app
- Much easier to refactor just about anything

### Cons

- Not the best type definitions files (esp. around Redux)
- Tons of generics flying around
- Tons of imports, as just about everything (action creator, action, reducer, store, component) need to be aware of different types
- Redux is inherently functional in nature, so it's tough to integrate with TS classes
  -- The Redux docs have a section explaining usage with TS. This course intentionally strays from some of their recommendations

### Notes

- app was created and initialized with TS using **npx create-react-app rrts --typescript**
- create-react-app gave a warning that the --typescript flag is deprecated and should instead use **--template typescript**
- the typescript template creates files as .ts/.tsx. **.tsx** is used for any files that will use JSX
- as is typical with Stephen Grider courses, we deleted the generated src folder and started from scratch, and are using class based components, presumably because it lines up better with TS.
- also I left a lot of stuff commented out for reference

### Packages/Methods Used

- React, Redux, Redux Thunk, Axios

import { Router, Request, Response, NextFunction } from 'express';

// define interface to give a better definition of the "body"
// property, since the type definition file defines it as "any"
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return; 
  }

  res.status(403);
  res.send('You are not authorized to view this page.');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  // need body-parser middleware to parse form data. the "body" property is added 
  // by the middleware
  const { email, password } = req.body;

  // see server/node_modules/@types/express-serve-static-core/index.d.ts line 464
  // as a test we changed the type for ReqBody from "any" to an object of keys that can be strings or undefined
  // this forced us to handle the undefined case. NOTE: this was changed back because we should never actually 
  // modify type definition files
  
  // here's how we'd actually handle a poor type definition: create an interface that extends the Request 
  // interface, then override the body property (RequestWithBody above). Now we'll get the same error on "body"
  // if we don't have the type guard

  if (email && password && email === 'hi@hi.com' && password === 'password123') {
    // mark user as logged in
    req.session = { loggedIn: true };
    res.redirect('/');
    // redirect them to the root route
  } else {
    res.send('Invalid email or password');
  }
  
});

router.get('/', (req: RequestWithBody, res: Response) => {
  // req.session to determine what to show based on logged in status
  //if (req.session && req.session.loggedIn) {
  if (req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in.</div>
        <a href="/logout">Log out</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in.</div>
        <a href="/login">Log in</a>
      </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  // note, course says to set to undefined, but the interface must have changed 
  // because TS is telling me it must be CookieSessionObject or null
  req.session = null;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user.');
});

export { router };

/*
  Notes about middlewares with TS:
  - middlewares add on/change/remove/etc. properties of objects like the request/response using JS
  - this is problematic because TS doesn't know what's being changed
  - type definition files don't always tell the full/accurate story. For example, the type definition
    file for Express requests has a "body" property defined, which doesn't actually exist unless 
    you're using the body-parser middleware
*/
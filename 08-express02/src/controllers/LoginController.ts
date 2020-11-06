import { NextFunction, Response } from 'express';
import { RequestWithBody } from './RequestWithBody';
import { get, controller, use, bodyValidator, post } from './decorators';

// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log('request was made!');
//   next();
// }

@controller('/auth')
class LoginController {

  // this is to demonstrate the error Typescript will throw here because method
  // "add" does not satisfy the RouteHandlerDescriptor interface as defined in routes.ts
  // @get('/')
  // add(a: number, b: number): number {
  //   return a + b;
  // }

  @get('/login')
  //@use(logger) // this was just to make sure the "use" decorator works
  getLogin(req: RequestWithBody, res: Response): void {
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
  }

  @post('/login')
  // note, these keys are passed as a list, but the spread operator in the bodyValidator decorator 
  // turns them into an array
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body;
  
    if (email === 'hi@hi.com' && password === 'password123') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: RequestWithBody, res: Response) {
    req.session = null;
    res.redirect('/');
  }
}
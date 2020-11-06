import { Response, NextFunction } from 'express';
import { RequestWithBody } from './RequestWithBody';
import { get, controller, use } from './decorators';

function requireAuth(req: RequestWithBody, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return; 
  }

  res.status(403);
  res.send('You are not authorized to view this page.');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: RequestWithBody, res: Response) {
    if (req.session?.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in.</div>
          <a href="/auth/logout">Log out</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in.</div>
          <a href="/auth/login">Log in</a>
        </div>
      `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: RequestWithBody, res: Response) {
    res.send('Welcome to protected route, logged in user.');
  }
  
}
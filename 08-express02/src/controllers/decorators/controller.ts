import 'reflect-metadata';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

// function to make sure the request body has all the required keys
// Note: the course annotates "keys" as type string as below, as opposed to
// an array of strings like string[]. But they both seem to work...I'm not sure why
function bodyValidators (keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Inavalid request.');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  }
}

export function controller(routePrefix: string) {
  // this decorator will be applied to a class, so target is the constructor function,
  // so we need to look at target.prototype 
  return function(target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.Path, 
        target.prototype, 
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.Method, 
        target.prototype, 
        key
      );
      const middlewares = Reflect.getMetadata(
        MetadataKeys.Middleware,
        target.prototype,
        key
      ) || [];
      const requiredBodyProps = Reflect.getMetadata(
        MetadataKeys.Validator,
        target.prototype,
        key
      ) || [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        // look up the method from the Express router
        router[method](
          `${routePrefix}${path}`, 
          ...middlewares, 
          validator, 
          routeHandler
        );
      }
    }
  };
}
import 'reflect-metadata';
// NOTE: you may not see an error on type RequestHandler if you forget to import it because
// there's something native to fetch, but we want the Express version
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

// This decorator takes a middleware as an arg, then looks for any existing 
// middlewares in the method's metadata and merges in the newly passed one
export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(
      MetadataKeys.Middleware, 
      target, 
      key
    ) || [];

    Reflect.defineMetadata(
      MetadataKeys.Middleware, 
      [...middlewares, middleware], 
      target, 
      key
    );
  }
}
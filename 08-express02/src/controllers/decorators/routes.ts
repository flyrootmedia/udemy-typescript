// be sure to install reflect-metadata and uncomment Experimental Options from tsconfig.json
import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

// use this interface in routeBinder (the desc arg) to make sure 
// that any method you try to attach the decorator to satisfies the 
// RequestHandler type. Note value must be optional because it is optional
// in the interface we're extending. But here we're overriding the "any" 
// annotation in the original interface to make sure it's a RequestHandler
interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler
}

// For reference:
// interface PropertyDescriptor {
//   configurable?: boolean;
//   enumerable?: boolean;
//   value?: any;
//   writable?: boolean;
//   get?(): any;
//   set?(v: any): void;
// }

// decorator factory function to accept a path and store is as metadata on the controller method
function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
    }
  }
}

// we exported * in index.ts, so import the following decorators as needed...
// we don't need to import routeBinder
export const get = routeBinder(Methods.Get);
export const put = routeBinder(Methods.Put);
export const post = routeBinder(Methods.Post);
export const del = routeBinder(Methods.Del);
export const patch = routeBinder(Methods.Patch);


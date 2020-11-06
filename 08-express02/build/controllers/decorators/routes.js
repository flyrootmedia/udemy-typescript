"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
// be sure to install reflect-metadata and uncomment Experimental Options from tsconfig.json
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
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
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Method, method, target, key);
        };
    };
}
// we exported * in index.ts, so import the following decorators as needed...
// we don't need to import routeBinder
exports.get = routeBinder(Methods_1.Methods.Get);
exports.put = routeBinder(Methods_1.Methods.Put);
exports.post = routeBinder(Methods_1.Methods.Post);
exports.del = routeBinder(Methods_1.Methods.Del);
exports.patch = routeBinder(Methods_1.Methods.Patch);

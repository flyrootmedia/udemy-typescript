"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
// This decorator takes a middleware as an arg, then looks for any existing 
// middlewares in the method's metadata and merges in the newly passed one
function use(middleware) {
    return function (target, key, desc) {
        var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Middleware, target, key) || [];
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Middleware, __spreadArrays(middlewares, [middleware]), target, key);
    };
}
exports.use = use;
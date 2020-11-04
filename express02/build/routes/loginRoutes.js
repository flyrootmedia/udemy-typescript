"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('You are not authorized to view this page.');
}
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input name=\"email\" />\n      </div>\n      <div>\n        <label>Password</label>\n        <input name=\"password\" type=\"password\" />\n      </div>\n      <button>Submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    // need body-parser middleware to parse form data. the "body" property is added 
    // by the middleware
    var _a = req.body, email = _a.email, password = _a.password;
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
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/', function (req, res) {
    var _a;
    // req.session to determine what to show based on logged in status
    //if (req.session && req.session.loggedIn) {
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        res.send("\n      <div>\n        <div>You are logged in.</div>\n        <a href=\"/logout\">Log out</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div>You are not logged in.</div>\n        <a href=\"/login\">Log in</a>\n      </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    // note, course says to set to undefined, but the interface must have changed 
    // because TS is telling me it must be CookieSessionObject or null
    req.session = null;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user.');
});
/*
  Notes about middlewares with TS:
  - middlewares add on/change/remove/etc. properties of objects like the request/response using JS
  - this is problematic because TS doesn't know what's being changed
  - type definition files don't always tell the full/accurate story. For example, the type definition
    file for Express requests has a "body" property defined, which doesn't actually exist unless
    you're using the body-parser middleware
*/ 

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var loginRoutes_1 = require("./routes/loginRoutes");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var app = express_1.default();
// Note/Reminder: middlewares must be wired up before the routes,
// otherwise the route will get errors trying to use them
// use body parser to parse form requests
app.use(body_parser_1.default.urlencoded({ extended: true }));
// use cookie session for creating login session (note, a random value must be provided when 
// passing the keys array... I used "initKey")
app.use(cookie_session_1.default({ keys: ['initKey'] }));
// Route Handlers
app.use(loginRoutes_1.router);
// start app on localhost:3000
app.listen(3000, function () {
    console.log('listening on port 3000');
});

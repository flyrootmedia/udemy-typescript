"use strict";
// Inheritence Version (using abstract generic class)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = void 0;
// fs ('file system') is a standard Node module 
// (need to install type definitions for Node)
var fs_1 = __importDefault(require("fs"));
// generic absract class; allows you to extend it
// and pass any type you need for the CSV data
var CsvFileReader = /** @class */ (function () {
    function CsvFileReader(filename) {
        this.filename = filename;
        this.data = [];
    }
    CsvFileReader.prototype.read = function () {
        // utf-8 encoding tells readFileSync to give us a string of the file text 
        // as opposed to the raw data so we can parse it
        this.data = fs_1.default.readFileSync(this.filename, {
            encoding: 'utf-8'
        })
            .split('\n')
            .map(function (row) {
            return row.split(',');
        })
            .map(this.mapRow);
    };
    return CsvFileReader;
}());
exports.CsvFileReader = CsvFileReader;

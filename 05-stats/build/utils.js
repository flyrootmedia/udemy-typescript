"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateStringToDate = void 0;
/**
 * @description: takes a European formatted date string and returns a date object
 * @param {string} dateString: date formatted 'DD/MM/YYYY'
 */
exports.dateStringToDate = function (dateString) {
    var dateParts = dateString
        .split('/')
        .map(function (value) {
        return parseInt(value);
    });
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
};

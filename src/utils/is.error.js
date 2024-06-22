"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = void 0;
var isError = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Error]';
};
exports.isError = isError;

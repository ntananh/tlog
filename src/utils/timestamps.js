"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeStamp = void 0;
var getTimeStamp = function (date) {
    var splittedDate = date.toISOString().split('T');
    return splittedDate[0] + " " + splittedDate[1].slice(0, 8);
};
exports.getTimeStamp = getTimeStamp;

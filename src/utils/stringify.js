"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = void 0;
var stringify = function (obj, space) {
    var seen = new Set();
    return JSON.stringify(obj, function (key, val) {
        if (val && typeof val === 'object') {
            if (seen.has(val)) {
                return '[Circular]';
            }
            seen.add(val);
        }
        return val;
    }, space || undefined);
};
exports.stringify = stringify;

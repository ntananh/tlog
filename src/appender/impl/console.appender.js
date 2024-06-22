"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleAppender = void 0;
var appender_1 = require("../appender");
var ConsoleAppender = /** @class */ (function (_super) {
    __extends(ConsoleAppender, _super);
    function ConsoleAppender(consoleOptions) {
        var _a;
        var _this = _super.call(this, consoleOptions) || this;
        _this.consoleOptions = consoleOptions;
        _this.consoleOptions = consoleOptions || {};
        _this.consoleOptions.fullFormat = (_a = _this.consoleOptions.fullFormat) !== null && _a !== void 0 ? _a : true;
        return _this;
    }
    ConsoleAppender.prototype.append = function (_a) {
        var _b;
        var message = _a.message;
        if (!((_b = this.consoleOptions) === null || _b === void 0 ? void 0 : _b.fullFormat)) {
            message = message.split('\n')[0];
        }
        console.log(message);
    };
    return ConsoleAppender;
}(appender_1.Appender));
exports.ConsoleAppender = ConsoleAppender;

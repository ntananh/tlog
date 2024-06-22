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
exports.FileAppender = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var appender_1 = require("../appender");
var FileAppender = /** @class */ (function (_super) {
    __extends(FileAppender, _super);
    function FileAppender(fileOptions) {
        var _this = _super.call(this, fileOptions) || this;
        _this.fileOptions = fileOptions;
        _this.ensureDirectoryExists(_this.fileOptions.path);
        return _this;
    }
    FileAppender.prototype.append = function (logMessage) {
        try {
            var filePath = this.getFilePath();
            (0, fs_1.writeFileSync)(filePath, "".concat(logMessage.message, "\n"), { flag: 'a' });
        }
        catch (error) {
            console.error('Failed to write log message to file:', error);
        }
    };
    FileAppender.prototype.getFilePath = function () {
        var _a = this.fileOptions, path = _a.path, logRotation = _a.logRotation;
        if (!logRotation) {
            return path;
        }
        var date = new Date();
        var rotatedPath;
        switch (logRotation) {
            case 'daily':
                rotatedPath = (0, path_1.join)(path, "".concat(date.getFullYear(), "-").concat(String(date.getMonth() + 1).padStart(2, '0'), "-").concat(String(date.getDate()).padStart(2, '0'), ".log"));
                break;
            case 'weekly':
                var weekNumber = Math.ceil(date.getDate() / 7);
                rotatedPath = (0, path_1.join)(path, "".concat(date.getFullYear(), "-W").concat(weekNumber, ".log"));
                break;
            case 'monthly':
                rotatedPath = (0, path_1.join)(path, "".concat(date.getFullYear(), "-").concat(String(date.getMonth() + 1).padStart(2, '0'), ".log"));
                break;
            default:
                rotatedPath = path;
        }
        this.ensureDirectoryExists(rotatedPath);
        return rotatedPath;
    };
    FileAppender.prototype.ensureDirectoryExists = function (filePath) {
        var dir = (0, path_1.dirname)(filePath);
        if (!(0, fs_1.existsSync)(dir)) {
            (0, fs_1.mkdirSync)(dir, { recursive: true });
        }
    };
    return FileAppender;
}(appender_1.Appender));
exports.FileAppender = FileAppender;

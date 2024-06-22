"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorize = exports.DEFAULT_LOG_LEVEL_COLORS = void 0;
var level_1 = require("../level");
var enums_1 = require("./../enums");
exports.DEFAULT_LOG_LEVEL_COLORS = (_a = {},
    _a[level_1.LogLevel.TRACE] = enums_1.COLOR.BLACK,
    _a[level_1.LogLevel.DEBUG] = enums_1.COLOR.BLUE,
    _a[level_1.LogLevel.INFO] = enums_1.COLOR.GREEN,
    _a[level_1.LogLevel.WARN] = enums_1.COLOR.YELLOW,
    _a[level_1.LogLevel.ERROR] = enums_1.COLOR.RED,
    _a[level_1.LogLevel.OFF] = enums_1.COLOR.WHITE,
    _a);
var colorize = function (color, text) { return "".concat(color).concat(text).concat(enums_1.COLOR.RESET); };
exports.colorize = colorize;

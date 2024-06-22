import { LogLevel } from '../level';
import { COLOR } from './../enums';

export const DEFAULT_LOG_LEVEL_COLORS = {
    [LogLevel.TRACE]: COLOR.BLACK,
    [LogLevel.DEBUG]: COLOR.BLUE,
    [LogLevel.INFO]: COLOR.GREEN,
    [LogLevel.WARN]: COLOR.YELLOW,
    [LogLevel.ERROR]: COLOR.RED,
    [LogLevel.OFF]: COLOR.WHITE
};

export const colorize = (color: COLOR, text: string) => `${color}${text}${COLOR.RESET}`;
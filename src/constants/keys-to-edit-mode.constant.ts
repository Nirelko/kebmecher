import {CursorProperty} from 'csstype';

export enum EditMode {
    free = 'free',
    draw = 'draw'
}

export enum SHORTCUT_KEYS {
    control = 'Control'
}

export const KEYS_TO_EDIT_MODE = {
    [SHORTCUT_KEYS.control]: EditMode.draw
}

export const EDIT_MODE_TO_CURSOR_STYLE: Record<string, CursorProperty> = {
    [EditMode.draw]: 'crosshair'
}
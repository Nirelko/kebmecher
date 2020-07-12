import {CursorProperty} from 'csstype';

export enum EditMode {
    free = 'free',
    draw = 'draw',
    zoomIn = 'zoomIn',
    zoomOut = 'zoomOut',
    hand = 'hand',
}

export enum SHORTCUT_KEYS {
    control = 'Control',
    z = 'z',
    shift = 'Shift',
    h = 'h'
}

export const KEYS_TO_EDIT_MODE = {
    [SHORTCUT_KEYS.control]: EditMode.draw,
    [SHORTCUT_KEYS.z]: EditMode.zoomIn,
    [`${ SHORTCUT_KEYS.shift} ${SHORTCUT_KEYS.z}`]: EditMode.zoomOut,
    [SHORTCUT_KEYS.h]: EditMode.hand
}

export const EDIT_MODE_TO_CURSOR_STYLE: Record<string, CursorProperty> = {
    [EditMode.draw]: 'crosshair',
    [EditMode.zoomIn]: 'zoom-in',
    [EditMode.zoomOut]: 'zoom-out',
    [EditMode.hand]: 'grab'
}
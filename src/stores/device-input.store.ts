import {action, observable} from 'mobx';
import {BaseRootStoreItem} from './root-store/base-root-store-item';

export class DeviceInputStore extends BaseRootStoreItem {
    @observable pressedKeys: Record<string, boolean> = {};
    @observable isMousePressed: boolean;

    private _callbacks: Array<Function> = [];

    constructor(props) {
        super(props);
    }

    @action
    keyHold(key: string) {
        if (this.pressedKeys[key]) {
            return;
        }
        this.pressedKeys[key] = true;

        this._callbacks.forEach(callback => callback());
    }

    @action
    keyRelease(key: string) {
        delete this.pressedKeys[key];

        this._callbacks.forEach(callback => callback());
    }

    @action
    setMouseState(isPressed: boolean) {
        this.isMousePressed = isPressed;
    }

    onKeyChange(callback: Function) {
        this._callbacks.push(callback);

        return () => this._callbacks.filter(x => x !== callback);
    }

    getPressedKeySet() {
        const pressedKeys = Object.keys(this.pressedKeys);

        return  pressedKeys.sort().join(" ");
    }
}
import {BaseStore} from './base.store';
import {action, observable} from 'mobx';

export class KeyboardStore extends BaseStore {
    @observable pressedKeys: Record<string, boolean> = {};

    constructor(props) {
        super(props);
    }

    @action
    keyHold(key: string) {
        this.pressedKeys[key] = true;
    }

    @action
    keyRelease(key: string) {
        delete this.pressedKeys[key];
    }
}
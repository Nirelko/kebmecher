import { observable } from 'mobx';
import { Action } from './action';

export class ActionsStack {
    @observable _stack: Array<Action>;
    _currentItemIndex: number;

    constructor() {
        this.clear();
    }

    get stack() {
        return this._stack;
    }

    push(action) {
        if(this._currentItemIndex !== this._stack.length - 1) {
            this._stack.splice(this._currentItemIndex + 1);
        }

        this._stack.push(action);
        this._currentItemIndex = this._stack.length - 1;
    }

    clear() {
        this._stack = [];
        this._currentItemIndex = 0;
    }

    getNextAction() {
        if (this._currentItemIndex >= this._stack.length - 1) {
            return null;
        }

        return this._stack[this._currentItemIndex + 1];
    }

    onAfterRedo() {
        this._currentItemIndex++;
    }

    getCurrentAction() {
        if(!this._stack.length) {
            return null;
        }

        return this._stack[this._currentItemIndex];
    }

    onAfterUndo() {
        this._currentItemIndex--;
    }
}
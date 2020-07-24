import { debounce } from 'lodash';
import {computed} from 'mobx';

import { QUEUE_WAIT_TIME, MAX_BATCH_SIZE } from './queue-constants';
import { RootStore } from '../../stores/root-store/root.store';
import { Action } from './action';
import {BaseRootStoreItem} from "../../stores/root-store/base-root-store-item";

export enum ActionDirection {
    do = 'do',
    undo = 'undo'
}

export interface IActionQueueItem {
    action: Action;
    direction: ActionDirection
}

export abstract class BaseRequestsQueue extends BaseRootStoreItem {
    _queue: Array<IActionQueueItem>;
    onActionFailedCallbacks: Array<(action, error) => void>;

    executeNextBulkRequests: any;

    protected constructor(rootStore: RootStore) {
        super(rootStore);

        this.clear();

        this.executeNextBulkRequests = debounce(
            () => this._executeNextBulkRequests(),
            QUEUE_WAIT_TIME
        );
    }

    @computed get queue() {
        return this._queue.map(x => x.action);
    }

    push(action: Action, direction: ActionDirection) {
        this._queue.push({ action, direction});

        this._tryExecuteNextBulkRequests();
    }

    private _tryExecuteNextBulkRequests() {
        if (!this._queue.length) {
            return;
        }

        if (this._queue.length >= MAX_BATCH_SIZE) {
            this.executeNextBulkRequests.flush();
            return;
        }

        this.executeNextBulkRequests();
    }

    private async _executeNextBulkRequests() {
        const actionsToHandleLater = this._queue.splice(MAX_BATCH_SIZE);
        const actionsToHandle = this._queue;
        this._queue = actionsToHandleLater;

        await this.executeBulk(actionsToHandle);
    }

    abstract async executeBulk(actionsToHandle: Array<IActionQueueItem>);

    onActionsFailed(callback: (action, error) => void) {
        this.onActionFailedCallbacks.push(callback);
    }

    private actionsFailed(actions: Array<Action>, error) {
        // this.rootStore.loggerService.error(error); TODO: Add logger

        this.onActionFailedCallbacks.forEach(callback =>
            callback(actions, error)
        );
    }

    clear() {
        this.clearQueue();
        this.onActionFailedCallbacks = [];
    }

    clearQueue() {
        this._queue = [];
    }
}
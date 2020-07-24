import { action, observable, set } from 'mobx';
import {noop} from 'lodash';

export enum ActionStatus {
    new = 'new',
    appliedLocally = 'appliedLocally',
    appliedResolved = 'appliedResolved',
    applyFailed = 'applyFailed',
    revertedLocally = 'revertedLocally',
    revertedResolved = 'revertedResolved',
    revertFailed = 'revertFailed'
}

export enum ActionRestrictions {
    none = 0,
    urgent = 1, // Make the actions queued to server to be flushed now.
    blocking = 3, // The client wait for resolve. It's by default an urgent restriction
    irreversible = 4 // Cannot be reverted.
}

export enum ActionName {
    AddSelectZone = 'AddSelectZone',
    UpdateSelectZone = 'UpdateSelectZone',
}

export interface IAction<TContext = {}> {
    // Props
    name?: ActionName;
    restrictions?: ActionRestrictions;
    ctx: TContext;

    // Actions
    apply: () => void;
    revert: () => void;
    createApplyDataForServer?: () => any;
    createRevertDataForServer?: () => any;
    onApplyToServerResolved?: (result: any) => any;
    onRevertToServerResolved?: (result: any) => any;
}

export interface Action<TContext> extends IAction<TContext> {}

export class Action<TContext = {}> implements IAction<TContext> {
    @observable status: ActionStatus;
    action_number: number;

    constructor() {
        this.status = ActionStatus.new;
        this.restrictions = ActionRestrictions.none;

        this.createApplyDataForServer = noop;
        this.createRevertDataForServer = noop;
        this.onApplyToServerResolved = noop;
        this.onRevertToServerResolved = noop;
    }

    init(actionData: IAction<TContext>) {
        set(this, actionData);
    }

    createDataForServer() {
        if (this.status === ActionStatus.appliedLocally) {
            return this.createApplyDataForServer();
        }

        if (this.status === ActionStatus.revertedLocally) {
            return this.createRevertDataForServer();
        }

        throw Error(
            `The action status was ${this.status} instead of local one.`
        );
    }

    onActionToServerResolved(result) {
        if (this.status === ActionStatus.appliedResolved) {
            return this.onApplyToServerResolved(result);
        }

        if (this.status === ActionStatus.revertedResolved) {
            return this.onRevertToServerResolved(result);
        }

        throw Error(
            `The action status was ${this.status} instead of local one.`
        );
    }

    @action
    setStatus(newStatus: ActionStatus) {
        this.status = newStatus;
    }

    setToSuccess() {
        if (this.status === ActionStatus.appliedLocally) {
            this.setStatus(ActionStatus.appliedResolved);

            return;
        }

        if (this.status === ActionStatus.revertedLocally) {
            this.setStatus(ActionStatus.revertedResolved);

            return;
        }

        throw Error(
            `The action status was ${this.status} instead of local one.`
        );
    }

    setToFailed() {
        if (this.status === ActionStatus.appliedLocally) {
            this.setStatus(ActionStatus.applyFailed);

            return;
        }

        if (this.status === ActionStatus.revertedLocally) {
            this.setStatus(ActionStatus.revertFailed);

            return;
        }

        throw Error(
            `The action status was ${this.status} instead of local one.`
        );
    }

    setContext(ctx: Partial<TContext>) {
        set(this.ctx, ctx);
    }
}
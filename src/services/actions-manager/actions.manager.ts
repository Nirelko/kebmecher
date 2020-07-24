import {ActionsStack} from './actions-stack';
import {LocalStorageRequestsQueue} from './local-storage-requests-queue';
import {RootStore} from '../../stores/root-store/root.store';
import {Action, ActionStatus, IAction} from './action';
import {
    FlowApplyActionResponseStatus,
    FlowApplyActionsErrors,
    IFlowApplyActionResponse
} from "../../@types/actions.types";
import {ActionDirection, BaseRequestsQueue} from "./base-request-queue";
import {BaseRootStoreItem} from "../../stores/root-store/base-root-store-item";

function mapActionNumberToAction(actions): Record<number, Action> {
    const actionNumberToActionToApply = {};
    actions.forEach(x => {
        actionNumberToActionToApply[x.action_number] = x;
    });

    return actionNumberToActionToApply;
}

export class ActionsManager extends BaseRootStoreItem {
    actionsStack: ActionsStack;
    requestsQueue: BaseRequestsQueue;
    lastActionNumber: number;

    constructor(rootStore: RootStore) {
        super(rootStore);

        this.actionsStack = new ActionsStack();
        this.requestsQueue = new LocalStorageRequestsQueue(this.rootStore);
        this.lastActionNumber = -1;

        this.onActionsFailed = this.onActionsFailed.bind(this);
        this.requestsQueue.onActionsFailed(this.onActionsFailed);
    }

    createAction<TContext extends object = {}>(
        actionDataCreator: (newAction: IAction<TContext>) => IAction<TContext>
    ) {
        const newAction = new Action<TContext>();
        newAction.init(actionDataCreator(newAction));

        return newAction;
    }

    doNewApplyAction(baseAction: Action) {
        baseAction.action_number = ++this.lastActionNumber;
        this.applyAction(baseAction);
        this.actionsStack.push(baseAction);
    }

    private applyAction(baseAction: Action) {
        baseAction.apply();
        baseAction.setStatus(ActionStatus.appliedLocally);
        this.requestsQueue.push(baseAction, ActionDirection.do);
    }

    redoAction() {
        const currentAction = this.actionsStack.getNextAction();
        if (!currentAction) {
            return null;
        }

        this.applyAction(currentAction);
        this.actionsStack.onAfterRedo();

        return currentAction;
    }

    undoAction() {
        const currentAction = this.actionsStack.getCurrentAction();
        if (!currentAction) {
            return null;
        }

        this.doRevertAction(currentAction);
        this.actionsStack.onAfterUndo();

        return currentAction;
    }

    private doRevertAction(baseAction: Action) {
        baseAction.revert();
        baseAction.setStatus(ActionStatus.revertedLocally);
        this.requestsQueue.push(baseAction, ActionDirection.undo);
    }

    async onActionsFailed(baseActions, error) {
        this.requestsQueue.clearQueue();
        this.handleActionsFailure(baseActions, error);

        // TODO: add callback.
    }

    clear() {
        this.actionsStack.clear();
        this.requestsQueue.clear();
        this.lastActionNumber = -1;
        this.requestsQueue.onActionsFailed(this.onActionsFailed);
    }

    private handleActionsFailure(baseActions: Array<Action>, error: any) {
        const errorType =
            error.response &&
            error.response.data &&
            error.response.data.error_type;

        // eslint-disable-next-line default-case
        switch (errorType) {
            case FlowApplyActionsErrors.actionResolveFailed: {
                const actionsResults = error.response.data.error_data;
                this.failActionsByResults(baseActions, actionsResults);

                return;
            }
            case FlowApplyActionsErrors.flowNotSynced: {
                // TODO: Nirel show a message?
            }
        }

        if (baseActions.length) {
            this.failAllActions(baseActions[0]);
        }
    }

    private failActionsByResults(
        baseActions: Array<Action>,
        actionsResults: Array<IFlowApplyActionResponse>
    ) {
        const actionNumberToActionToApply = mapActionNumberToAction(
            baseActions
        );

        actionsResults.forEach(actionResult => {
            const baseAction =
                actionNumberToActionToApply[actionResult.action_number];

            if (actionResult.status !== FlowApplyActionResponseStatus.success) {
                baseAction.setToFailed();
            } else {
                baseAction.setToSuccess();
                baseAction.onActionToServerResolved(actionResult);
            }
        });

        if (baseActions.length) {
            this.failStackFromActionToEnd(baseActions[baseActions.length - 1]);
        }
    }

    private failAllActions(baseAction: Action) {
        this.failStackFromActionToEnd(baseAction);
    }

    private failStackFromActionToEnd(baseAction: Action) {
        let actionIndex = this.actionsStack.stack.indexOf(baseAction);
        if (
            baseAction.status === ActionStatus.applyFailed ||
            baseAction.status === ActionStatus.revertFailed
        ) {
            actionIndex++;
        }

        for (
            let index = actionIndex;
            index < this.actionsStack.stack.length;
            index++
        ) {
            const actionToFail = this.actionsStack.stack[index];
            actionToFail.setToFailed();
        }
    }
}
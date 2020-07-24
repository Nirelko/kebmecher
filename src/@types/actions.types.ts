export enum FlowApplyActionsErrors {
    actionResolveFailed = 'HBFailedToApplyFlowActionsError',
    flowNotSynced = 'HBNotSyncedFlowAction'
}

export enum FlowApplyActionResponseStatus {
    success = 'success',
    failed = 'failed',
    notReached = 'not_reached'
}

export interface IFlowApplyActionResponse {
    status: FlowApplyActionResponseStatus;
    action_number: number;
    [key: string]: any;
}
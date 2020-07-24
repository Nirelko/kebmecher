import { Action } from './action';
import {BaseRequestsQueue} from "./base-request-queue";
import {RootStore} from "../../stores/root-store/root.store";

export class LocalStorageRequestsQueue extends BaseRequestsQueue {
    constructor(rootStore: RootStore) {
        super(rootStore);
    }


    async executeBulk(actionsToHandle: Array<Action<any>>): Promise<any> {

        return Promise.resolve(true);
    }
}
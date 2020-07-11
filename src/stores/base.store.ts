import {RootStore} from 'root.store';

export abstract class BaseStore {
    rootStore: RootStore;

    protected constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
}
import {RootStore} from 'src/stores/root-store/root.store';

export abstract class BaseRootStoreItem {
    rootStore: RootStore;

    protected constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
}
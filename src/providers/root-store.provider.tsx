import React, {createContext, useContext} from 'react';
import {RootStore} from "../stores/root-store/root.store";

let rootStore: RootStore = null;
export const RootStoreContext = createContext<RootStore>(rootStore);

export function RootStoreProvider({children}) {
    rootStore = new RootStore();

    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
}

export function useRootStore(): RootStore {
    return useContext<RootStore>(RootStoreContext);
}
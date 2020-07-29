import React, {createContext, useContext} from 'react';
import {RootStore} from "../stores/root-store/root.store";

let rootStore: RootStore = new RootStore();
export const RootStoreContext = createContext<RootStore>(rootStore);

export function RootStoreProvider({children}) {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    );
}

export function useRootStore(): RootStore {
    return useContext<RootStore>(RootStoreContext);
}
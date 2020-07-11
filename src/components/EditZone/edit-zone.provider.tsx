import React, {createContext, useContext} from 'react';

interface IEditZoneContext {
    zoneRef: HTMLElement,
    rectangle: DOMRect
}

export const EditZoneContext = createContext<IEditZoneContext>(null);

export function EditZoneProvider({children, zoneRef, rectangle}) {
    return (
        <EditZoneContext.Provider value={{zoneRef, rectangle}}>
            {children}
        </EditZoneContext.Provider>
    );
}

export function useEditZoneContext(): IEditZoneContext {
    return useContext<IEditZoneContext>(EditZoneContext);
}
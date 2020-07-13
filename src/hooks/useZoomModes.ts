import {useEffect} from "react";
import {cancelPropagation, createMouseEvent} from "../utils/dom-events.utils";
import {useRootStore} from "../providers/root-store.provider";
import {EditMode} from "../constants/keys-to-edit-mode.constant";

export function useZoomModes(zoneRef, zoomOptions) {
    const {editorStore} = useRootStore();

    function applyZoom(event: MouseEvent) {
        if(
            editorStore.editMode !== EditMode.zoomIn &&
            editorStore.editMode !== EditMode.zoomOut
        ) {
            return;
        }

        if(
            !zoomOptions ||
            !zoomOptions.zoomWrapperRef ||
            !zoomOptions.zoomWrapperRef.wrapperRef ||
            !zoomOptions.zoomWrapperRef.wrapperRef.current
        ) {
            // TODO: add error event
            return;
        }
        
        event.stopPropagation();

        const doubleClickEvent = createMouseEvent({...event, type: 'dblclick'});
        zoomOptions.zoomWrapperRef.wrapperRef.current.dispatchEvent(doubleClickEvent);
    }

    useEffect(() => {
        if (!zoneRef) {
            return;
        }

        zoneRef.addEventListener('dblclick', cancelPropagation, false);

        return () => zoneRef.removeEventListener('dblclick', cancelPropagation);
    }, [zoneRef])

    return applyZoom;
}
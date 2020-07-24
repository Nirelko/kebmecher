import React, {useCallback} from 'react';
import {observer} from "mobx-react";
import {DraggableData, Props, ResizableDelta, Rnd} from "react-rnd";
import {SelectZoneModel} from "../../models/select-zone.model";
import DynamicRectangle from "../DynamicRectangle/DynamicRectangle";
import {useRootStore} from "../../providers/root-store.provider";
import {EditMode} from "../../constants/keys-to-edit-mode.constant";
import {useEditZoneContext} from "../EditZone/edit-zone.provider";

interface SelectZoneProps {
    selectZone: SelectZoneModel;
}

function SelectZone({selectZone}: SelectZoneProps) {
    const {editorStore, selectZoneController} = useRootStore();
    const {rectangle: editZoneRectangle} = useEditZoneContext();

    const loadSelectZoneRef = useCallback((selectZoneRef: Rnd) => {
        if(!selectZoneRef) {
            return;
        }

        editorStore.setSelectZoneRef(selectZone.id, selectZoneRef);
    }, [editorStore, selectZone.id]);

    const onResizeStop = useCallback((event, direction, elementRef, delta: ResizableDelta) => {
        const newPosition = {x: selectZone.x, y: selectZone.y};

        const directionLowerCase = direction.toLowerCase();
        if(directionLowerCase.indexOf('left') !== -1) {
            newPosition.x -= delta.width;
        }
        if(directionLowerCase.indexOf('top') !== -1) {
            newPosition.y -= delta.height;
        }

        selectZoneController.merge(selectZone, {...delta, ...newPosition })
    }, [selectZone, editZoneRectangle, selectZoneController]);

    const onDragStop = useCallback((e, {x, y}: DraggableData) => {
        selectZoneController.update(selectZone, {x, y})
    }, [selectZone, selectZoneController]);

    const dynamicSettings: Props = {
        onResizeStop,
        onDragStop
    };

    if(editorStore.editMode !== EditMode.free) {
        dynamicSettings.enableResizing = false;
        dynamicSettings.disableDragging = true;
    }

    return <DynamicRectangle rectangle={selectZone} dynamicProps={dynamicSettings} getRef={loadSelectZoneRef} />
}

export default observer(SelectZone);
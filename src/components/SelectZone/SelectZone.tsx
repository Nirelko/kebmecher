import React, {useCallback} from 'react';
import {observer} from "mobx-react";
import {DraggableData, Props, ResizableDelta} from "react-rnd";
import {SelectZoneModel} from "../../models/select-zone.model";
import DynamicRectangle from "../DynamicRectangle/DynamicRectangle";
import {useRootStore} from "../../providers/root-store.provider";
import {EditMode} from "../../constants/keys-to-edit-mode.constant";
import {calculateOnZoneLocation} from "../../utils/select-zone.utils";
import {useEditZoneContext} from "../EditZone/edit-zone.provider";

interface SelectZoneProps {
    selectZone: SelectZoneModel;
}

function SelectZone({selectZone}: SelectZoneProps) {
    const {editorStore} = useRootStore();
    const {rectangle: editZoneRectangle} = useEditZoneContext();

    const onResizeStop = useCallback((event, dir, elementRef, delta: ResizableDelta) => {
        const newPosition = {x: selectZone.x, y: selectZone.y};

        const dirLower = dir.toLowerCase();
        if(dirLower.indexOf('left') !== -1) {
            newPosition.x -= delta.width;
        }
        if(dirLower.indexOf('top') !== -1) {
            newPosition.y -= delta.height;
        }

        selectZone.merge({...delta, ...newPosition })
    }, [selectZone, editZoneRectangle, calculateOnZoneLocation]);

    const onDragStop = useCallback((e, {x, y}: DraggableData) => {
        selectZone.update({x, y})
    }, [selectZone]);

    const dynamicSettings: Props = {
        onResizeStop,
        onDragStop
    };

    if(editorStore.editMode !== EditMode.free) {
        dynamicSettings.enableResizing = false;
        dynamicSettings.disableDragging = true;
    }

    return <DynamicRectangle rectangle={selectZone} dynamicProps={dynamicSettings} />
}

export default observer(SelectZone);
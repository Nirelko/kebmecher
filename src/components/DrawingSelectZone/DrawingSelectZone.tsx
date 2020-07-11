import {observer} from 'mobx-react';
import React from 'react';
import {useRootStore} from "../../providers/root-store.provider";
import FloatingRectangle from "../FloatingRectangle/FloatingRectangle";

export default observer(function DrawingSelectZone() {
    const {editorStore} = useRootStore();
    const selectZone = editorStore.drawingSelectZone.convertToSelectZone();

    const locationStyle = {
        left: `${selectZone.x}px`,
        top: `${selectZone.y}px`,
        width: `${selectZone.width}px`,
        height: `${selectZone.height}px`
    }

    return <FloatingRectangle style={locationStyle}/>;
});
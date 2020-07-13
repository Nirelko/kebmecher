import React from 'react';
import {observer} from 'mobx-react';
import {TransformWrapper} from 'react-zoom-pan-pinch/dist';
import {useRootStore} from "../../providers/root-store.provider";
import {EditMode} from "../../constants/keys-to-edit-mode.constant";

function ZoomWrapper({children}) {
    const {editorStore} = useRootStore();
    const disabled = {disabled: true};
    const doubleClickSettings = {
        disabled: editorStore.editMode !== EditMode.zoomIn && editorStore.editMode !== EditMode.zoomOut,
        step: 10,
        animation: true,
        animationTime: 200,
        animationType: 'easeOut',
        mode: editorStore.editMode === EditMode.zoomIn ? 'zoomIn' : 'zoomOut'
    }

    const panSettings = {
        disabled: editorStore.editMode !== EditMode.hand,
        lockAxisX: false,
        lockAxisY: false,
        velocity: false,
        velocityEqualToMove: false,
        velocitySensitivity: 1,
        velocityMinSpeed: 1.2,
        velocityBaseTime: 1800,
        velocityAnimationType: 'easeOut',
        padding: true,
        paddingSize: 0,
        animationTime: 200,
        animationType: 'easeOut'
    }

    const featuresSettings = {
        wheel: disabled,
        pan: panSettings,
        pinch: disabled,
        doubleClick: doubleClickSettings,
        scalePadding: disabled,
    }

    return (
        <TransformWrapper{...featuresSettings}>
            {zoomCallbacks => children(zoomCallbacks)}
        </TransformWrapper>
    );
}

export default observer(ZoomWrapper);
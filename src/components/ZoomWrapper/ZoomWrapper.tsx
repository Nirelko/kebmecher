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

    const featuresSettings = {
        wheel: disabled,
        pan: disabled,
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
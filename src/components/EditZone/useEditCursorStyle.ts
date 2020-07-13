import {CursorProperty} from 'csstype';
import {useRootStore} from '../../providers/root-store.provider';
import {EDIT_MODE_TO_CURSOR_STYLE, EditMode} from '../../constants/keys-to-edit-mode.constant';

export function useEditCursorStyle(): CursorProperty {
    const {editorStore, deviceInputStore} = useRootStore();

    if (editorStore.drawingSelectZone) {
        return EDIT_MODE_TO_CURSOR_STYLE[EditMode.draw];
    }

    if(editorStore.editMode === EditMode.hand && deviceInputStore.isMousePressed) {
        return 'grabbing';
    }

    return EDIT_MODE_TO_CURSOR_STYLE[editorStore.editMode]
}
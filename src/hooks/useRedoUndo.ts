import {useRootStore} from "../providers/root-store.provider";
import {useEffect} from "react";
import {SHORTCUT_KEYS} from "../constants/keys-to-edit-mode.constant";

const undoKeySet = `${SHORTCUT_KEYS.control} ${SHORTCUT_KEYS.z}`;
const redoKeySet = `${SHORTCUT_KEYS.control} ${SHORTCUT_KEYS.y}`;

function onKeyChanged(deviceInputStore, actionsManager) {
    const keySetPressed = deviceInputStore.getPressedKeySet();
    if (keySetPressed === undoKeySet) {
        actionsManager.undoAction();
    } else if (keySetPressed == redoKeySet) {
        actionsManager.redoAction();
    }
}

export function useRedoUndo() {
    const {deviceInputStore, actionsManager} = useRootStore();

    useEffect(() => {
        const unregister = deviceInputStore.onKeyChange(() =>
            onKeyChanged(deviceInputStore, actionsManager));

        return unregister;
    }, [deviceInputStore, actionsManager])
}
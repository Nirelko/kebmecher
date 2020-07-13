import {useEffect} from "react";
import {useRootStore} from "../providers/root-store.provider";

export default function useDetectKeypress(zoneRef: HTMLElement) {
    const {deviceInputStore} = useRootStore();

    function onMouseHold(event: MouseEvent) {
        deviceInputStore.setMouseState(true);
    }

    function onMouseRelease(event: MouseEvent) {
        deviceInputStore.setMouseState(false);
    }

    function onKeyHold(e: KeyboardEvent) {
        if(deviceInputStore.pressedKeys[e.key]) {
            return;
        }

        deviceInputStore.keyHold(e.key);
    }

    function onKeyRelease(e: KeyboardEvent) {
        deviceInputStore.keyRelease(e.key);
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyHold, false)
        document.addEventListener('keyup', onKeyRelease, false)

        return () => {
            document.removeEventListener('keydown', onKeyHold)
            document.removeEventListener('keyup', onKeyRelease)
        }
    }, []);

    useEffect(() => {
        if(!zoneRef) {
            return;
        }

        zoneRef.addEventListener('mousedown', onMouseHold, false)
        zoneRef.addEventListener('mouseup', onMouseRelease, false)

        return () => {
            zoneRef.removeEventListener('mousedown', onMouseHold);
            zoneRef.removeEventListener('mouseup', onMouseRelease);
        }
    }, [zoneRef]);
}
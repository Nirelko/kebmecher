import {useEffect} from "react";
import {useRootStore} from "../providers/root-store.provider";

export default function useDetectKeypress(zoneRef: HTMLElement) {
    const {deviceInputStore} = useRootStore();

    function onMouseHold() {
        deviceInputStore.setMouseState(true);
    }

    function onMouseRelease() {
        deviceInputStore.setMouseState(false);
    }

    function onKeyHold(event: KeyboardEvent) {
        if(deviceInputStore.pressedKeys[event.key]) {
            return;
        }

        deviceInputStore.keyHold(event.key);
    }

    function onKeyRelease(event: KeyboardEvent) {
        deviceInputStore.keyRelease(event.key);
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
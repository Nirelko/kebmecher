import {useEffect} from "react";
import {useRootStore} from "../providers/root-store.provider";

export default function useDetectKeypress() {
    const {keyboardStore} = useRootStore();

    function onHold(e: KeyboardEvent) {
        if(keyboardStore.pressedKeys[e.key]) {
            return;
        }

        keyboardStore.keyHold(e.key);
    }

    function onRelease(e: KeyboardEvent) {
        keyboardStore.keyRelease(e.key);
    }

    useEffect(() => {
        document.addEventListener('keydown', onHold, false)
        document.addEventListener('keyup', onRelease, false)

        return () => {
            document.removeEventListener('keydown', onHold)
            document.removeEventListener('keyup', onRelease)
        }
    }, []);
}
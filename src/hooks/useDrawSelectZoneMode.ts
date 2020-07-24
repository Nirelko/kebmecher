import {useEffect} from "react";
import {EditMode} from "../constants/keys-to-edit-mode.constant";
import {calculateOnZoneLocation} from "../utils/select-zone.utils";
import {useRootStore} from "../providers/root-store.provider";

export default function useDrawSelectZoneMode(
    zoneRef: HTMLElement,
    drawableZoneRectangle: DOMRect
) {
    const {editorStore, selectZoneController} = useRootStore();

    function onMouseMove(event: MouseEvent) {
        const {drawingSelectZone} = editorStore;
        if(!drawingSelectZone) {
            return;
        }

        const {x, y} = calculateOnZoneLocation(drawableZoneRectangle, event);

        drawingSelectZone.update({
            endX: x,
            endY: y
        });
    }

    function onHold(event: MouseEvent) {
        if(editorStore.editMode !== EditMode.draw) {
            return;
        }

        const {x: startX, y: startY} = calculateOnZoneLocation(drawableZoneRectangle, event);
        selectZoneController.startDrawing({
                startX: startX,
                startY: startY,
                endX: startX,
                endY: startY
            });
    }

    function onRelease() {
        const {drawingSelectZone} = editorStore;
        if(!drawingSelectZone) {
            return;
        }

        selectZoneController.finishDrawing()
    }

    useEffect(() => {
        if(!zoneRef) {
            return;
        }

        zoneRef.addEventListener('mousemove', onMouseMove, false);
        zoneRef.addEventListener('mousedown', onHold, false)
        zoneRef.addEventListener('mouseup', onRelease, false)

        return () => {
            zoneRef.removeEventListener('mousemove', onMouseMove);
            zoneRef.removeEventListener('mousedown', onHold);
            zoneRef.removeEventListener('mouseup', onRelease);
        }
    }, [zoneRef]);
}
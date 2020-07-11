import {useEffect} from "react";
import {EditorStore} from "../stores/editor.store";
import {EditMode} from "../constants/keys-to-edit-mode.constant";
import {calculateOnZoneLocation} from "../utils/select-zone.utils";

export default function useDrawSelectZoneMode(
    drawableZone: HTMLElement,
    drawableZoneRectangle: DOMRect,
    editorStore: EditorStore
) {
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
        editorStore.startDrawing({
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

        editorStore.finishDrawing()
    }

    useEffect(() => {
        if(!drawableZone) {
            return;
        }

        drawableZone.addEventListener('mousemove', onMouseMove, false);
        drawableZone.addEventListener('mousedown', onHold, false)
        drawableZone.addEventListener('mouseup', onRelease, false)

        return () => {
            drawableZone.removeEventListener('mousemove', onMouseMove);
            drawableZone.removeEventListener('mousedown', onHold);
            drawableZone.removeEventListener('mouseup', onRelease);
        }
    }, [drawableZone]);
}
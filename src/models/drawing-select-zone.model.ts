import {observable} from "mobx";
import {SelectZoneModel} from "./select-zone.model";

export class DrawingSelectZoneModel {
    @observable startX: number;
    @observable startY: number;
    @observable endX: number;
    @observable endY: number;

    constructor(initData: Partial<DrawingSelectZoneModel>) {
        this.update(initData);
    }

    update(updateData: Partial<DrawingSelectZoneModel>) {
        Object.assign(this, updateData)
    }

    convertToSelectZone() {
        const newStartX = Math.min(this.startX, this.endX);
        const newStartY = Math.min(this.startY, this.endY);
        const newEndX = Math.max(this.startX, this.endX);
        const newEndY = Math.max(this.startY, this.endY);

        return new SelectZoneModel({
            x: newStartX,
            y: newStartY,
            width: newEndX - newStartX,
            height: newEndY - newStartY
        });
    }
}
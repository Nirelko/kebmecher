import {action} from 'mobx';
import {v4 as uuidV4} from 'uuid';
import {ResizableDelta} from "react-rnd";
import {IRectangle} from "./rectangle.model";

export interface ISelectZone extends IRectangle{
}

export interface SelectZoneModel extends ISelectZone {
}
export class SelectZoneModel {
    id: string;

    constructor(initData: Partial<ISelectZone>) {
        this.id = uuidV4();
        Object.assign(this, initData);
    }

    @action
    update(updateData: Partial<ISelectZone>) {
        Object.assign(this, updateData);
    }

    @action
    merge({width, height, ...updateData}: ResizableDelta) {
        this.update({
            ...updateData,
            width: this.width + width,
            height: this.height + height
        });
    }
}
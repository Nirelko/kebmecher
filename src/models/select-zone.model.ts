import {action} from 'mobx';
import {IRectangle} from "./rectangle.model";
import {BaseModel} from "./base-model";

export interface ISelectZone extends IRectangle{
}

export interface SelectZoneModel extends ISelectZone {
}
export class SelectZoneModel extends BaseModel {
    constructor(initData: Partial<ISelectZone>) {
        super();

        Object.assign(this, initData);
    }

    @action
    update(updateData: Partial<ISelectZone>) {
        Object.assign(this, updateData);
    }
}
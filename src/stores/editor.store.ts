import {action, computed, observable} from 'mobx';
import {SelectZoneModel} from "../models/select-zone.model";
import {BaseRootStoreItem} from "./root-store/base-root-store-item";
import {DrawingSelectZoneModel} from "../models/drawing-select-zone.model";
import {KEYS_TO_EDIT_MODE, EditMode} from "../constants/keys-to-edit-mode.constant";
import {Rnd} from "react-rnd";

export interface SelectZoneData {
    ref: Rnd;
    model: SelectZoneModel;
}

export class EditorStore extends BaseRootStoreItem {
    @observable selectZones: Record<string, SelectZoneData> = {};
    @observable drawingSelectZone: DrawingSelectZoneModel = null;
    @observable imageSrc: string = null;

    constructor(props) {
        super(props);
    }

    @computed
    get editMode(): EditMode {
        const {deviceInputStore} = this.rootStore;
        const keySetPress = deviceInputStore.getPressedKeySet();

        return KEYS_TO_EDIT_MODE[keySetPress] || EditMode.free;
    }

    @action
    addSelectZone(selectZone: SelectZoneModel) {
        this.selectZones[selectZone.id] = {model: selectZone, ref: null};
    }

    @action
    setSelectZoneRef(id, selectZoneRef: Rnd) {
        this.selectZones[id].ref = selectZoneRef;
    }

    @action
    setImageSrc(imageSrc: string) {
        this.imageSrc = imageSrc;
    }

    @action
    removeSelectZone(id: string) {
        delete this.selectZones[id];
    }

    @action
    setDrawingSelectZone(selectZone: DrawingSelectZoneModel) {
        this.drawingSelectZone = selectZone;
    }
}
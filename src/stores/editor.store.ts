import {action, computed, observable} from 'mobx';
import {SelectZoneModel} from "../models/select-zone.model";
import {BaseStore} from "./base.store";
import {DrawingSelectZoneModel} from "../models/drawing-select-zone.model";
import {KEYS_TO_EDIT_MODE, EditMode} from "../constants/keys-to-edit-mode.constant";

export class EditorStore extends BaseStore {
    @observable selectZones: Array<SelectZoneModel> = [];
    @observable drawingSelectZone: DrawingSelectZoneModel = null;

    @computed
    get editMode(): EditMode {
        const {keyboardStore} = this.rootStore;
        const pressedKeys = Object.keys(keyboardStore.pressedKeys);
        const keyPress = pressedKeys.sort().join(" ");

        return KEYS_TO_EDIT_MODE[keyPress] || EditMode.free;
    }

    constructor(props) {
        super(props);
    }

    @action
    addSelectZone(selectZone: SelectZoneModel) {
        this.selectZones.push(selectZone);
    }

    @action
    startDrawing(initData: Partial<DrawingSelectZoneModel>) {
        const drawingSelectZone = new DrawingSelectZoneModel(initData);
        this.drawingSelectZone = drawingSelectZone;

        return drawingSelectZone;
    }

    @action
    finishDrawing() {
        this.addSelectZone(this.drawingSelectZone.convertToSelectZone());
        this.drawingSelectZone = null;
    }

    @action
    setDrawingSelectZone(selectZone: DrawingSelectZoneModel) {
        this.drawingSelectZone = selectZone;
    }
}
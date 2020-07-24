import { EditorStore } from "../editor.store";
import {DeviceInputStore} from "../device-input.store";
import {ActionsManager} from "../../services/actions-manager/actions.manager";
import {SelectZoneController} from "../../controllers/selectZoneController";

export class RootStore {
    editorStore: EditorStore = null;
    deviceInputStore: DeviceInputStore = null;
    actionsManager: ActionsManager = null;
    selectZoneController: SelectZoneController = null;

    constructor() {
        this.editorStore = new EditorStore(this);
        this.deviceInputStore = new DeviceInputStore(this);
        this.actionsManager = new ActionsManager(this);
        this.selectZoneController = new SelectZoneController(this);
    }
}
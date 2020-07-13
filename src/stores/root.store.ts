import { EditorStore } from "./editor.store";
import {DeviceInputStore} from "./deviceInputStore";

export class RootStore {
    editorStore: EditorStore = null;
    deviceInputStore: DeviceInputStore = null;

    constructor() {
        this.editorStore = new EditorStore(this);
        this.deviceInputStore = new DeviceInputStore(this);
    }
}
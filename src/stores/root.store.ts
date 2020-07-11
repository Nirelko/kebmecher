import { EditorStore } from "./editor.store";
import {KeyboardStore} from "./keyboard.store";

export class RootStore {
    editorStore: EditorStore = null;
    keyboardStore: KeyboardStore = null;

    constructor() {
        this.editorStore = new EditorStore(this);
        this.keyboardStore = new KeyboardStore(this);
    }
}
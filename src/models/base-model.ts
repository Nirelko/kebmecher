import {v4 as uuidV4} from 'uuid';

export class BaseModel {
    id: string;

    constructor(id?: string) {
        this.id = id || uuidV4();
    }
}
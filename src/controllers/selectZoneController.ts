import {BaseRootStoreItem} from "../stores/root-store/base-root-store-item";
import {RootStore} from "../stores/root-store/root.store";
import {DrawingSelectZoneModel} from "../models/drawing-select-zone.model";
import {ISelectZone, SelectZoneModel} from "../models/select-zone.model";
import {Action, ActionName} from "../services/actions-manager/action";
import {ResizableDelta, Rnd} from 'react-rnd';

export interface IAddSelectZoneContext {
    selectZone: SelectZoneModel;
}

export interface IUpdateSelectZoneContext {
    selectZone: SelectZoneModel;
    updateData: Partial<ISelectZone>;
    oldData: Partial<ISelectZone>;
}

export class SelectZoneController extends BaseRootStoreItem {
    constructor(rootStore: RootStore) {
        super(rootStore);
    }

    startDrawing(initData: Partial<DrawingSelectZoneModel>) {
        const drawingSelectZone = new DrawingSelectZoneModel(initData);
        this.rootStore.editorStore.setDrawingSelectZone(drawingSelectZone);

        return drawingSelectZone;
    }

    finishDrawing() {
        const {editorStore, actionsManager} = this.rootStore;

        const newSelectZone = editorStore.drawingSelectZone.convertToSelectZone();
        const addSelectZoneAction = this.createAddSelectZoneAction(newSelectZone);
        actionsManager.doNewApplyAction(addSelectZoneAction);

        this.rootStore.editorStore.setDrawingSelectZone(null);
    }

    createAddSelectZoneAction(selectZone: SelectZoneModel): Action<IAddSelectZoneContext> {
        const {actionsManager, editorStore} = this.rootStore;

        return actionsManager.createAction<IAddSelectZoneContext>(selectZoneAction => ({
            name: ActionName.UpdateSelectZone,
            ctx: {
                selectZone
            },
            apply: () => editorStore.addSelectZone(selectZone),
            revert: () => editorStore.removeSelectZone(selectZone.id)
        }))
    }

    private performUpdate(
        selectZoneModel: SelectZoneModel,
        selectZoneRef: Rnd,
        updatedData: Partial<ISelectZone>) {
        selectZoneModel.update(updatedData);

        if (updatedData.x && updatedData.y) {
            selectZoneRef.updatePosition({x: updatedData.x, y: updatedData.y});
        }

        if (updatedData.width && updatedData.height) {
            selectZoneRef.updateSize({
                width: updatedData.width,
                height: updatedData.height
            });
        }
    }

    createUpdateSelectZoneAction(selectZone: SelectZoneModel, updateData: Partial<ISelectZone>): Action<IUpdateSelectZoneContext> {
        const {actionsManager, editorStore} = this.rootStore;

        return actionsManager.createAction<IUpdateSelectZoneContext>(selectZoneAction => ({
            name: ActionName.UpdateSelectZone,
            ctx: {
                updateData,
                oldData: {
                    height: selectZone.height,
                    width: selectZone.width,
                    x: selectZone.x,
                    y: selectZone.y,
                },
                selectZone
            },
            apply: () => this.performUpdate(
                selectZoneAction.ctx.selectZone,
                editorStore.selectZones[selectZoneAction.ctx.selectZone.id].ref,
                selectZoneAction.ctx.updateData
            ),
            revert: () => this.performUpdate(
                selectZoneAction.ctx.selectZone,
                editorStore.selectZones[selectZoneAction.ctx.selectZone.id].ref,
                selectZoneAction.ctx.oldData),
        }))
    }

    update(selectZoneModel: SelectZoneModel, updateData: Partial<ISelectZone>) {
        const {actionsManager} = this.rootStore;

        const updateSelectZoneAction = this.createUpdateSelectZoneAction(selectZoneModel, updateData);
        console.log(updateSelectZoneAction);
        actionsManager.doNewApplyAction(updateSelectZoneAction);
    }

    merge(selectZoneModel: SelectZoneModel, {width, height, ...updateData}: ResizableDelta) {
        this.update(selectZoneModel, {
            ...(updateData || {}),
            width: selectZoneModel.width + width,
            height: selectZoneModel.height + height
        });
    }
}
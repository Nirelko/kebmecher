import React, {useMemo, useState} from "react";
import {observer} from 'mobx-react';
import {CursorProperty} from 'csstype';
import styled from "styled-components";
import {TransformComponent} from 'react-zoom-pan-pinch/dist';
import useDrawSelectZoneMode from "../../hooks/useDrawSelectZoneMode";
import {useRootStore} from "../../providers/root-store.provider";
import DrawingSelectZone from "../DrawingSelectZone/DrawingSelectZone";
import SelectZone from "../SelectZone/SelectZone";
import useWatchKeypressModes from "../../hooks/useDetectKeypress";
import {useEditCursorStyle} from "./useEditCursorStyle";
import {EditZoneProvider} from "./edit-zone.provider";
import {useZoomModes} from "../../hooks/useZoomModes";
import ZoomWrapper from "../ZoomWrapper/ZoomWrapper";
import {useRedoUndo} from "../../hooks/useRedoUndo";

interface ZoneProps {
    cursor: CursorProperty;
}

const BackgroundImage = styled.img`
position: absolute;
width: 100%;
object-fit: scale-down;
height: 100%;
`

const Zone = styled.div<ZoneProps>`
    position: relative;
    width: 1200px;
    height: 800px;
    background: #eeeeee;
    ${({cursor}) => cursor ? `cursor: ${cursor};` : null}
    
    & > * {
        ${({cursor}) => cursor ? `cursor: ${cursor} !important;` : null}
    }
`;

function EditZone({zoomOptions}) {
    const [zoneRef, setZoneRef] = useState(null);
    const zoneRectangle = useMemo(() => zoneRef && zoneRef.getBoundingClientRect(), [zoneRef]);
    const {editorStore} = useRootStore();
    useWatchKeypressModes(zoneRef);
    useDrawSelectZoneMode(zoneRef, zoneRectangle);
    const applyZoom = useZoomModes(zoneRef, zoomOptions);
    const cursorStyle = useEditCursorStyle();
    useRedoUndo();

    return (
        <EditZoneProvider zoneRef={zoneRef} rectangle={zoneRectangle}>
            <Zone className="zone"
                  ref={setZoneRef}
                  cursor={cursorStyle}
                  onClick={applyZoom}
            >
                {editorStore.imageSrc && <BackgroundImage src={editorStore.imageSrc} />}
                {editorStore.drawingSelectZone && <DrawingSelectZone/>}
                {Object.keys(editorStore.selectZones).map(id => (
                        <SelectZone key={id} selectZone={editorStore.selectZones[id].model}/>
                    )
                )}
            </Zone>
        </EditZoneProvider>
    );
}

const ObservedEditZone = observer(EditZone);

function ZoomableEditZone(props) {
    const [zoomWrapperRef, setZoomWrapperRef] = useState(null);

    return (
        <ZoomWrapper>
            {zoomOptions => (
                <TransformComponent ref={setZoomWrapperRef}>
                    <ObservedEditZone {...props} zoomOptions={{...zoomOptions, zoomWrapperRef}}/>
                </TransformComponent>
            )}
        </ZoomWrapper>
    );
    4
}


export default ZoomableEditZone;
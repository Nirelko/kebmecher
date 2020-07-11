import {observer} from "mobx-react";
import {CursorProperty} from "csstype";
import React, {useMemo, useState} from "react";
import styled from "styled-components";
import useDrawSelectZoneMode from "../../hooks/useDrawSelectZoneMode";
import {useRootStore} from "../../providers/root-store.provider";
import DrawingSelectZone from "../DrawingSelectZone/DrawingSelectZone";
import SelectZone from "../SelectZone/SelectZone";
import useWatchKeypressModes from "../../hooks/useDetectKeypress";
import {useEditCursorStyle} from "./useEditCursorStyle";
import {EditZoneProvider} from "./edit-zone.provider";

interface ZoneProps {
    cursor: CursorProperty;
}

const Zone = styled.div<ZoneProps>`
    position: relative;
    width: 400px;
    height: 400px;
    background: #eeeeee;
    ${({cursor}) => cursor ? `cursor: ${cursor};` : null}
    
    & > * {
        ${({cursor}) => cursor ? `cursor: ${cursor} !important;` : null}
    }
`;

export default observer(function EditZone() {
    const [zoneRef, setZoneRef] = useState(null);
    const zoneRectangle = useMemo(() => zoneRef && zoneRef.getBoundingClientRect(), [zoneRef]);
    const {editorStore} = useRootStore();
    useDrawSelectZoneMode(zoneRef, zoneRectangle, editorStore);
    useWatchKeypressModes();
    const cursorStyle = useEditCursorStyle();

    return (
        <EditZoneProvider zoneRef={zoneRef} rectangle={zoneRectangle}>
            <Zone className="zone" ref={setZoneRef} cursor={cursorStyle}>
                {editorStore.drawingSelectZone && <DrawingSelectZone/>}
                {editorStore.selectZones.map(selectZone => <SelectZone key={selectZone.id} selectZone={selectZone}/>)}
            </Zone>
        </EditZoneProvider>
    );
});
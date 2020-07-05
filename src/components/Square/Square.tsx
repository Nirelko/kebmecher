import React from 'react';
import styled from "styled-components";
import { Rnd } from 'react-rnd';

const SquareShape = styled.div`
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
border: 1px dashed black;
outline: 1px dashed white;
`;

export default function Square() {
    return <Rnd
        default={{
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        }}
    bounds='.zone'><SquareShape/></Rnd>
    // return <Resizable className="box"><SquareShape/></Resizable>;
}


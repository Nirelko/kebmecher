import React from 'react';
import {observer} from 'mobx-react';
import { Rnd, Props } from 'react-rnd';
import {noop} from 'lodash';
import {IRectangle} from "../../models/rectangle.model";
import FloatingRectangle from "../FloatingRectangle/FloatingRectangle";

interface DynamicRectangleProps {
    rectangle: IRectangle;
    dynamicProps?: Props;
    getRef?: (rectangle: Rnd) => void;
}

function DynamicRectangle({rectangle, dynamicProps = {}, getRef = noop}: DynamicRectangleProps) {
    return <Rnd
        ref={getRef}
        default={{
            x: rectangle.x,
            y: rectangle.y,
            width: rectangle.width,
            height: rectangle.height,
        }}
        {...dynamicProps}
        bounds='.zone'>
        <FloatingRectangle/>
    </Rnd>
}

export default observer(DynamicRectangle);


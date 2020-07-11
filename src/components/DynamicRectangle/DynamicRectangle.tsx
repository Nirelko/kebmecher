import React from 'react';
import { Rnd, Props } from 'react-rnd';
import {IRectangle} from "../../models/rectangle.model";
import FloatingRectangle from "../FloatingRectangle/FloatingRectangle";

interface DynamicRectangleProps {
    rectangle: IRectangle;
    dynamicProps?: Props;
}

export default function DynamicRectangle({rectangle, dynamicProps = {}}: DynamicRectangleProps) {
    return <Rnd
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


import React from "react";
import styled from "styled-components";

const Zone = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
`;

export default function EditZone({children}) {

    return <Zone className="zone">
        {children}
    </Zone>
}
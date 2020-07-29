import React from "react";
import styled from "styled-components";

import {RootStoreProvider} from "../../providers/root-store.provider";
import EditZone from '../EditZone/EditZone';
import ChooseImage from "../ChooseImage/ChooseImage";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
    return (
        <RootStoreProvider>
            <Container>
                <ChooseImage />
                <EditZone />
            </Container>
        </RootStoreProvider>
    );
}

export default App;

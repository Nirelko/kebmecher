import React from "react";
import styled from "styled-components";

import {RootStoreProvider} from "../../providers/root-store.provider";
import EditZone from '../EditZone/EditZone';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
    return (
        <RootStoreProvider>
            <Container>
                <EditZone />
            </Container>
        </RootStoreProvider>
    );
}

export default App;

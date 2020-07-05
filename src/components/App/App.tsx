import React from "react";
import styled from "styled-components";

import EditZone from '../EditZone/EditZone';
import Square from "../Square/Square";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Container>
      <span>test</span>
        <EditZone>
            <span>Zone</span>
            <Square />
        </EditZone>
    </Container>
  );
}

export default App;

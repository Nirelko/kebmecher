import React from 'react';
import styled from "styled-components";
import { ThemeProvider } from 'styled-components';

const Hello = styled.div`
color: red;
`

function App() {
    return (
        <Hello>test</Hello>
    );
}

export default App;
import {css} from 'styled-components'

export const dashedBorder = css`
border: 1px dashed black;
outline: 1px dashed white;
`

export const floatingRectangle = css`
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
${dashedBorder}
    `;
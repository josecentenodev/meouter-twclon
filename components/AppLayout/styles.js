import css from 'styled-jsx/css'
import { breakpoints, colors, fonts } from '../../styles/theme'
import { addOpacityToColor } from '../../styles/utils'

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export default css`
    div {
        display: grid;
        height: 100vh;
        place-items: center;
    }
    main {
        background: #fefefe;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        position: relative;
        height: 100%;
        width: 100%;
        overflow: auto;
    }
    @media (min-width: ${breakpoints.mobile}) {
        main {
            height: 90vh;
            width: ${breakpoints.mobile};
        }
    }
`

export const globalStyles = css.global`
    html,
    body {
        background-image: radial-gradient(${backgroundColor} 1px, #fafafa 1px),
            radial-gradient(${backgroundColor} 1px, #fafafa 1px);
        background-position: 0 0, 25px 25px;
        background-size: 50px 50px;
        padding: 0;
        margin: 0;
        font-family: ${fonts.base};
        overflow: hidden;
    }

    * {
        box-sizing: border-box;
    }

    textarea,
    input {
        font-family: ${fonts.base};
    }
`

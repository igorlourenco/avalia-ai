import {extendTheme} from '@chakra-ui/react'

const fonts = {
    heading: `'Rubik', sans-serif`,
    body: `'Rubik', sans-serif`,
    mono: `'Menlo', monospace`
}

const fontWeights = {
    regular: 400,
    medium: 500,
    bold: 700
}

const theme = extendTheme({fonts, fontWeights})

export default theme
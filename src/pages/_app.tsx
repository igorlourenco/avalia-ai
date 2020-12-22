import {CSSReset, ThemeProvider} from '@chakra-ui/react'
import {ProvideAuth} from '../libraries/auth'
import theme from "../styles/theme";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset/>
            <ProvideAuth>
                <Component {...pageProps} />
            </ProvideAuth>
        </ThemeProvider>
    )
}

export default MyApp

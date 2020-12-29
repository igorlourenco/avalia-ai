import {CSSReset, ThemeProvider} from '@chakra-ui/react'
import {AuthProvider} from '../libraries/auth'
import theme from "../styles/theme";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset/>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default MyApp

import {CSSReset, ThemeProvider} from '@chakra-ui/react'
import {AuthProvider} from '../libraries/auth'
import theme from "../styles/theme";
import {DefaultSeo} from 'next-seo'
import SEO from '../../next-seo.config'

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset/>
            <AuthProvider>
                <DefaultSeo {...SEO}/>
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default MyApp

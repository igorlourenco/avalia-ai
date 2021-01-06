import {CSSReset, ThemeProvider} from '@chakra-ui/react'
import {AuthProvider} from '../libraries/auth'
import theme from "../styles/theme";
import {DefaultSeo} from 'next-seo'
import SEO from '../../next-seo.config'
import Footer from "../components/Footer";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset/>
            <AuthProvider>
                <DefaultSeo {...SEO}/>
                <Component {...pageProps} />
                <Footer/>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default MyApp

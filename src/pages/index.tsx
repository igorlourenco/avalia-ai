import {Box, Button, Flex, Heading, Image, Link} from '@chakra-ui/react'
import {useAuth} from '../libraries/auth'
import Head from "next/head";
import {FcGoogle} from 'react-icons/fc'

const Home = () => {

    const auth = useAuth()

    return (
        <>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        if(document.cookie  && document.cookie.includes('avalia-ai-auth')){
                            window.location.href = "/dashboard"
                        }
                    `
                    }}
                />
            </Head>
            <Flex direction={`column`} alignItems={`center`} justifyContent={`center`} height={`100vh`}>
                <Image src={`logo.svg`} width={`40`} height={`40`}/>
                <Heading size={`xl`} marginBottom={5}>
                    Avalia aí!
                </Heading>
                {
                    !auth.user &&
                        <Button variant="outline" size={`md`} fontWeight={`medium`}
                                colorScheme={"#000"}
                                onClick={auth.signInWithGoogle}
                                margin={3}>
                            <Box as={FcGoogle} size={24} marginRight={2}/>
                            Entre com Google
                        </Button>


                }

                {
                    auth.user &&
                    <Flex direction={`column`}>
                        <Link href={`/dashboard`} margin={2}>Ir para Quadro de Gerenciamento</Link>
                        <Button width={`auto`} variant={`ghost`} size={`sm`} onClick={auth.signOut}
                                margin={2}>SAIR</Button>
                    </Flex>
                }

                <Box as={`iframe`} width={`100%`} height={`300px`} src={`https://localhost:3000/avaliacoes/embed/0ThVQqXzzrhX6qY054AQ`}/>
            </Flex>
        </>
    )
}

export default Home

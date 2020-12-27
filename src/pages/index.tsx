import {Button, Flex, Heading, Image, Link} from '@chakra-ui/react'
import {useAuth} from '../libraries/auth'
import Head from "next/head";

const Home = () => {

    const auth = useAuth()

    return (
        <div>
            <Flex direction={`column`} alignItems={`center`} justifyContent={`center`} height={`100vh`}>
                <Image src={`logo.svg`} width={`40`} height={`40`}/>
                <Heading size={`xl`} marginBottom={5}>
                    Avalia aí!
                </Heading>
                {
                    !auth.user &&
                    <Button variant={`ghost`} size={`md`} onClick={(e) => auth.signInWithGithub()} margin={3}>Entrar com Github</Button>
                }

                {
                    auth.user &&
                    <Flex direction={`column`}>
                        <Link href={`/dashboard`} margin={2}>Ir para Quadro de Gerenciamento</Link>

                        <Button width={`auto`} variant={`ghost`} size={`sm`} onClick={(e) => auth.signOut()} margin={2}>SAIR</Button>
                    </Flex>
                }
            </Flex>
        </div>
    )
}

export default Home

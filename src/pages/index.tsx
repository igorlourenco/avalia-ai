import {Button, Code, Flex, Heading} from '@chakra-ui/react'
import {useAuth} from '../libraries/auth'

export default function Home() {

    const auth = useAuth()

    return (
        <div>
            <Flex direction={`column`} alignItems={`center`} justifyContent={`center`} height={`100vh`}>
                <Heading size={`xl`}>
                    Avalia aí!
                </Heading>

                {
                    !auth.user &&
                    <Button onClick={(e) => auth.signInWithGithub()}>entrar com github</Button>
                }

                {
                    auth.user &&
                    <div>
                        <Heading size={`md`}>Usuário: <Code>{auth.user.email}</Code></Heading>

                        <Button onClick={(e) => auth.signOut()}>SAIR</Button>
                    </div>
                }
            </Flex>
        </div>
    )
}

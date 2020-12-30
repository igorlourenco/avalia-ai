import React from 'react'
import {
    Flex,
    Stack,
    Link,
    Icon, Image,
    Avatar,
    Button,
} from '@chakra-ui/react'
import {useAuth} from "../libraries/auth";

const DashboardShell = ({children, isEmptyState}) => {
    const auth = useAuth()

    return (
        <Flex flexDirection="column">
            <Flex
                backgroundColor="white"
                justifyContent="space-between"
                paddingY={3}
                paddingX={4}
                alignItems="center"
            >
                <Stack spacing={4} isInline justifyContent="center" alignItems="center">
                    <Image src={`logo.svg`} boxSize={`50px`}/>
                    <Link href={`/dashboard`}>Meus produtos</Link>
                    <Link href={`/minhas-avaliacoes`}>Minhas avaliações</Link>
                </Stack>
                <Flex alignItems="center" justifyContent="center">
                    <Button width={`auto`} variant={`ghost`} size={`sm`} onClick={(e) => auth.signOut()}
                            margin={2}>SAIR</Button>

                    <Avatar size="sm" src={auth.user?.photoURL}/>
                </Flex>
            </Flex>
            <Flex
                backgroundColor="gray.100"
                justifyContent="center"
                alignItems="center"
            >
                <Flex
                    margin={`0 auto`}
                    flexDirection="column"
                    justifyContent="flex-start"
                >
                    {children}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default DashboardShell
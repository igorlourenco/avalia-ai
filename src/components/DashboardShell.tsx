import React from 'react'
import {
    Flex,
    Stack,
    Link,
    Image,
    Avatar,
    Button,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    PopoverFooter,
    Popover, PopoverTrigger, Box,
} from '@chakra-ui/react'
import {useAuth} from "../libraries/auth";
import {NextSeo} from 'next-seo'

const DashboardShell = ({children, title}) => {
    const auth = useAuth()
    let path = ''
    if (typeof window !== "undefined") path = window.location.pathname
    const url = `https://avalia-ai.vercel.app/${path}`

    return (
        <>
            <NextSeo title={`Avalia aí - ${title}`}
                     canonical={url}
                     openGraph={{
                         title: `Avalia aí - ${title}`,
                         url
                     }}
            />
            <Flex flexDirection="column">
                <Flex
                    backgroundColor="white"
                    justifyContent="space-between"
                    paddingY={3}
                    paddingX={4}
                    alignItems="center"
                    borderTop="6px solid #38B2AC"
                >
                    <Stack spacing={4} isInline justifyContent="center" alignItems="center" borderTop={2}
                           borderTopColor={`black`}>
                        <Image src={`logo.svg`} boxSize={`50px`}/>
                        <Link href={`/dashboard`} fontWeight={`medium`} color={`teal.900`}>Meus produtos</Link>
                        <Link href={`/minhas-avaliacoes`} fontWeight={`medium`} color={`teal.900`}>Minhas
                            avaliações</Link>
                    </Stack>
                    <Flex alignItems="center" justifyContent="center">
                        <Popover>
                            <PopoverTrigger>
                                <Avatar size="sm" src={auth.user?.photoURL}/>
                            </PopoverTrigger>
                            <PopoverContent color="teal.900" bg="gray.50" borderColor="gray.10">
                                <PopoverHeader pt={4} fontWeight="bold" border="0">
                                    {auth.user.displayName}
                                </PopoverHeader>
                                <PopoverArrow/>
                                <PopoverCloseButton/>
                                <PopoverFooter
                                    border="0"
                                    d="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    pb={4}
                                >
                                    <Box fontSize="sm">Detalhes da conta</Box>
                                    <Button width={`auto`} variant={`link`} colorScheme={`red`} size={`sm`}
                                            onClick={(e) => auth.signOut()}
                                            margin={2}>SAIR</Button>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                </Flex>
                <Flex
                    backgroundColor="gray.100"
                    minHeight={`100vh`}
                    justifyContent="space-around"
                    alignItems="space-around"
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
        </>
    )
}

export default DashboardShell
import {
    Box,
    Heading,
    List,
    ListItem,
    Text, Link
} from '@chakra-ui/react'
import {CopyIcon} from '@chakra-ui/icons'
import DashboardButton from "../components/DashboardButton";


const Docs = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="stretch"
        >
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={5}>
                <CopyIcon/>
                <Heading size="lg">Documentação</Heading>
                <DashboardButton/>
            </Box>
            <Box display="flex" p={5}>
                <Box as={`aside`} display="flex" flexDirection="column" p={5} width="25vw">
                    <Heading size="md">Seções</Heading>
                    <List>
                        <ListItem>1. <Link href={`#criando-um-produto`}>Criando um produto</Link></ListItem>
                    </List>
                </Box>
                <Box p={5} width={`55vw`}>
                    <Box as={`section`} id={`criando-um-produto`}>
                        <Heading size="md"><Link href={`#criando-um-produto`}>#</Link> Criando um produto</Heading>
                        <Text>
                            Para dar os primeiros passos com a Avalia Aí, você deve ter um cadastro,
                            o que pode ser feito facilmente, clicando no botão de login no topo direito desta página.
                            Com o cadastro feito, você pode criar seu primeiro produto <Link color={`teal.700`}
                                                                                             fontWeight={`medium`}
                                                                                             isExternal
                                                                                             href={`/dashboard`}>
                            acessando o Quadro de Gerenciamento</Link> e clicando no botão <Link color={`teal.700`}
                                                                                                 fontWeight={`bold`}>+
                            Adicione
                            seu primeiro produto</Link>.
                        </Text>
                    </Box>
                    <Box as={`section`} marginTop={8}>
                        <Heading size="md">Heading title</Heading>
                        <Text>
                            Lorem ipsum dolor sit amet. Ea incidunt debitis ut voluptatem
                            voluptatem nam consequatur voluptatibus qui eveniet rerum. Sed
                            voluptatum laborum et explicabo eaque ut perferendis quibusdam cum
                            commodi incidunt qui rerum provident. Et galisum vero qui Quis
                            veniam ut voluptatem nesciunt eos ipsam odio vel aliquid
                            accusantium.
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Docs
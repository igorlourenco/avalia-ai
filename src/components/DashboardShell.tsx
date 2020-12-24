import React from 'react'
import {
    Flex,
    Stack,
    Link,
    Icon,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from '@chakra-ui/react'
import {useAuth} from "../libraries/auth";
import AddProductModal from "./AddProductModal";

const DashboardShell = ({children, isEmptyState}) => {
    const auth = useAuth()

    return (
        <Flex flexDirection="column">
            <Flex
                backgroundColor="white"
                justifyContent="space-between"
                padding={4}
                alignItems="center"
            >
                <Stack spacing={4} isInline justifyContent="center" alignItems="center">
                    <Icon name="eye"/>
                    <Link>Seus produtos</Link>
                    <Link>Feedbacks</Link>
                </Stack>
                <Flex alignItems="center" justifyContent="center">
                    <Link mr={4}>Sua conta</Link>
                    <Avatar size="sm" src={auth.user?.photoURL}/>
                </Flex>
            </Flex>
            <Flex
                backgroundColor="gray.100"
                justifyContent="center"
                alignItems="center"
            >
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Breadcrumb p={4}>
                        <BreadcrumbItem marginY={2}>
                            <BreadcrumbLink fontSize={`sm`}>Produtos</BreadcrumbLink>
                        </BreadcrumbItem>
                        <Flex justifyContent={`space-between`}>
                            <Heading marginBottom={12}>
                                Seus produtos
                            </Heading>
                            {
                                isEmptyState ? ' ' : <AddProductModal isFirstProduct={false}/>
                            }
                        </Flex>
                        {children}
                    </Breadcrumb>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default DashboardShell
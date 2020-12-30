import React from 'react';
import NextLink from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
    Flex,
    Box
} from '@chakra-ui/react';

const FeedbackTableHeader = () => (
    <Box mx={4}>
        <Breadcrumb p={4}>
            <BreadcrumbItem marginY={2}>
                <BreadcrumbLink fontSize={`sm`}>Avaliações</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent={`space-between`}>
            <Heading marginBottom={12}>
                Minhas avaliações
            </Heading>
        </Flex>
    </Box>
);

export default FeedbackTableHeader;
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
    Flex,
    Box
} from '@chakra-ui/react';

import AddProductModal from "./AddProductModal";

const ProductTableHeader = () => (
    <Box mx={4}>
        <Breadcrumb p={4}>
            <BreadcrumbItem marginY={2}>
                <BreadcrumbLink fontSize={`sm`}>Produtos</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent={`space-between`}>
            <Heading marginBottom={12}>
                Meus produtos
            </Heading>
            <AddProductModal isFirstProduct={false}/>
        </Flex>
    </Box>
);

export default ProductTableHeader
import React from 'react';
import {
    Heading,
    Flex,
    Box
} from '@chakra-ui/react';

import AddProductModal from "./AddProductModal";

const ProductTableHeader = ({isEmptyState}) => (
    <Box margin={4} >
        <Flex justifyContent={`space-between`}>
            <Heading marginBottom={8} color={`teal.800`}>
                Meus produtos
            </Heading>
            {
                !isEmptyState && <AddProductModal isFirstProduct={false}/>
            }
        </Flex>
    </Box>
);

export default ProductTableHeader
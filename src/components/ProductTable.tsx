import React from 'react';
import {Box, Link, Text} from '@chakra-ui/react';
import {Table, Tr, Th, Td} from './Table';
import {parseISO, format} from 'date-fns';
import ProductRow from "./ProductRow";

const ProductTable = ({products}) => {
    return (
        <Table>
            <thead>
            <Tr>
                <Th>Produto</Th>
                <Th>Descrição</Th>
                <Th>Link para Feedback</Th>
                <Th>Adicionado em</Th>
                <Th>{''}</Th>
                <Th>{''}</Th>
            </Tr>
            </thead>
            <tbody>
            {products.map((product, index) => <ProductRow key={index} product={product}/>)}
            </tbody>
        </Table>
    );
};

export default ProductTable;
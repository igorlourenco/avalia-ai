import React from 'react';
import {Box, Link} from '@chakra-ui/react';
import {Table, Tr, Th, Td} from './Table';
import {parseISO, format} from 'date-fns';

const ProductTable = ({products}) => {
    return (
        <Table>
            <thead>
            <Tr>
                <Th>Produto</Th>
                <Th>Descrição</Th>
                <Th>Link para Feedback</Th>
                <Th>Adicionado em</Th>
                <Th/>
            </Tr>
            </thead>
            <tbody>
            {products.map((product) => (
                <Box as="tr" key={product.id}>
                    <Td fontWeight={`medium`}>{product.name}</Td>
                    <Td>{product.description}</Td>
                    <Td>
                        <Link isExternal href={`/avaliacoes/${product.id}`} fontWeight={`medium`} color={`teal.700`}>
                            Ver Feedbacks
                        </Link>
                    </Td>
                    <Td>{format(parseISO(product.createdAt), 'PPpp')}</Td>
                </Box>
            ))}
            </tbody>
        </Table>
    );
};

export default ProductTable;
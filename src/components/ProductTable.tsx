import React from 'react';
import {Box, Link} from '@chakra-ui/react';
import {Table, Tr, Th, Td} from './Table';
import {parseISO, format} from 'date-fns';
import DashboardShell from "./DashboardShell";

const ProductTable = ({products}) => {
    return (
        <DashboardShell isEmptyState={false}>
            <Table>
                <thead>
                <Tr>
                    <Th>Produto</Th>
                    <Th>Descrição</Th>
                    <Th>Link para Feedback</Th>
                    <Th>Adicionado em</Th>
                    <Th>{''}</Th>
                </Tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <Box as="tr" key={index}>
                        <Td fontWeight="medium">{product.name}</Td>
                        <Td>{product.description}</Td>
                        <Td>
                            <Link isExternal href={`/avaliacoes/${product.id}`}>Ver Feedbacks</Link>
                        </Td>
                        <Td>{format(parseISO(product.createdAt), 'PPpp')}</Td>
                    </Box>
                ))}
                </tbody>
            </Table>
        </DashboardShell>
    );
};

export default ProductTable;
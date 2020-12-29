import { Box, Skeleton } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';

const SkeletonRow = ({ width }) => (
    <Box as="tr">
        <Td>
            <Skeleton height="10px" w={width} my={4} />
        </Td>
        <Td>
            <Skeleton height="10px" w={width} my={4} />
        </Td>
        <Td>
            <Skeleton height="10px" w={width} my={4} />
        </Td>
        <Td>
            <Skeleton height="10px" w={width} my={4} />
        </Td>
    </Box>
);

const ProductTableSkeleton = () => {
    return (
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
                <SkeletonRow width="75px" />
                <SkeletonRow width="125px" />
                <SkeletonRow width="50px" />
                <SkeletonRow width="100px" />
                <SkeletonRow width="75px" />
                </tbody>
            </Table>
    );
};

export default ProductTableSkeleton;
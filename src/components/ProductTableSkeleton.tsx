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
                    <Th>{''}</Th>
                </Tr>
                </thead>
                <tbody>
                <SkeletonRow width="100px" />
                <SkeletonRow width="175px" />
                <SkeletonRow width="75px" />
                <SkeletonRow width="120px" />
                <SkeletonRow width="40px" />
                <SkeletonRow width="40px" />
                </tbody>
            </Table>
    );
};

export default ProductTableSkeleton;
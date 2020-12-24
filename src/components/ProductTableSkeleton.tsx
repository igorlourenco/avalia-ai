import { Box, Skeleton } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import DashboardShell from "./DashboardShell";
import React from "react";

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
                <SkeletonRow width="75px" />
                <SkeletonRow width="125px" />
                <SkeletonRow width="50px" />
                <SkeletonRow width="100px" />
                <SkeletonRow width="75px" />
                </tbody>
            </Table>
        </DashboardShell>
    );
};

export default ProductTableSkeleton;
import React from 'react';
import {
    Heading,
    Flex,
    Box
} from '@chakra-ui/react';

const FeedbackTableHeader = () => (
    <Box margin={4} >
        <Flex justifyContent={`space-between`}>
            <Heading marginBottom={8} color={`teal.800`}>
                Minhas avaliações
            </Heading>
        </Flex>
    </Box>
);

export default FeedbackTableHeader
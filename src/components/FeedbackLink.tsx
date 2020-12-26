import { Flex, Link } from '@chakra-ui/react';

export default function FeedbackLink({ productId }) {
    return (
        <Flex justifyContent="space-between" mb={8} width="full" mt={1}>
            <Link fontWeight="bold" fontSize="sm" href={`/avaliacoes/${productId}`}>
                Faça um comentário →
            </Link>
            <Link fontSize="xs" color="blackAlpha.500" href="/">
                Mantido por Avalia Aí!
            </Link>
        </Flex>
    );
}
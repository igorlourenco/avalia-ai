import React from 'react'
import {
    Heading,
    Box,
    Text, Link
} from '@chakra-ui/react'

const FeedbackEmptyState = () => {
    return (
        <Box
            backgroundColor={`white`}
            display={`flex`}
            flexDirection={`column`}
            justifyContent={`center`}
            alignItems={`center`}
            paddingX={10}
            paddingY={12}
            borderRadius={`md`}
            boxShadow={`md`}
        >
            <Heading size={`lg`} color={`teal.900`}>
                Você ainda não avaliou nenhum produto :(
            </Heading>
            <Link>
                <Text marginTop={4} marginBottom={5} fontSize={`md`} fontWeight={`medium`} color={`teal.700`}>
                    Veja o ranking de produtos que usam Avalia Aí e conheça nossos parceiros!
                </Text>
            </Link>
        </Box>
    )
}

export default FeedbackEmptyState
import React from 'react'
import {
    Heading,
    Box,
    Text,
    Button
} from '@chakra-ui/react'

const FreePlanEmptyState = () => {
    return (
        <Box
            backgroundColor="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingX={10}
            paddingY={12}
            borderRadius="md"
            boxShadow="md"
        >
            <Heading size="md">
                Receba feedbacks dos seus produtos instantaneamente.
            </Heading>
            <Text mt={3} mb={5}>
                Comece agora e cresça junto conosco. 🌱❤️
            </Text>
            <Button variant="solid" size="md">
                Começar com o Plano Básico
            </Button>
        </Box>
    )
}

export default FreePlanEmptyState
import {Td} from "./Table";
import {Box, Link, Text} from "@chakra-ui/react";
import {format, parseISO} from "date-fns";
import React from "react";
import DeleteProductButton from "./DeleteProductButton";
import EditProductButton from "./EditProductButton";

const ProductRow = ({product}) => {
    return (
        <Box as="tr" key={product.id}>
            <Td color={`teal.900`} fontWeight={`medium`}>{product.name}</Td>
            <Td>{`${product.description.substring(0, 37)}...`}</Td>
            <Td>
                {
                    product.id ? (
                            <Link isExternal href={`/avaliacoes/${product.id}`} fontWeight={`medium`} color={`teal.600`}>
                                Ver Feedbacks
                            </Link>
                        ) :
                        <Text color={`teal.500`}>Gerando link...</Text>
                }
            </Td>
            <Td>{format(parseISO(product.createdAt), 'PPpp')}</Td>
            <Td>
                <DeleteProductButton productId={product.id}/>
            </Td>
            <Td>
                <EditProductButton product={product}/>
            </Td>
        </Box>
    )
}

export default ProductRow
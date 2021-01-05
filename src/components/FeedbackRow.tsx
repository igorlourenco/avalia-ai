import {Td} from "./Table";
import {Box, Switch} from "@chakra-ui/react";
import DeleteFeedbackButton from "./DeleteFeedbackButton";
import React, {useState} from "react";
import {findProductById, updateFeedback} from "../libraries/database";
import {mutate} from "swr";
import {useAuth} from "../libraries/auth";

const FeedbackRow = ({feedback}) => {
    const auth = useAuth()

    const [productName, setProductName] = useState()

    const [checked, setChecked] = useState(feedback.status === 'active')

    const toggleStatusChange = async () => {
        setChecked(!checked)

        const status = checked ? 'pending' : 'active'

        await updateFeedback(feedback.id, {status})
        mutate(['/api/feedback', auth.user.token]);
    }

    async function getProductName() {
        const {product} = await findProductById(feedback.productId)
        setProductName(product.name)
    }

    getProductName()

    return (
        <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{productName}</Td>
            <Td>{feedback.comment.substring(0, 50)}{feedback.comment.length >= 50 ? '...' : ''}</Td>
            <Td>
                <Switch
                    colorScheme={`teal`}
                    onChange={toggleStatusChange}
                    isChecked={checked}
                />
            </Td>
            <Td>
                <DeleteFeedbackButton feedbackId={feedback.id}/>
            </Td>
        </Box>
    )
}

export default FeedbackRow
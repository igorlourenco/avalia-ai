import {Td} from "./Table";
import {Box, Switch} from "@chakra-ui/react";
import DeleteFeedbackButton from "./DeleteFeedbackButton";
import React, {useState} from "react";
import {updateFeedback} from "../libraries/database";
import {mutate} from "swr";
import {useAuth} from "../libraries/auth";

const FeedbackRow = ({feedback}) => {
    const auth = useAuth()

    const [checked, setChecked] = useState(feedback.status === 'active')

    const toggleStatusChange = async () => {
        setChecked(!checked)


        const status = checked ? 'pending' : 'active'

        await updateFeedback(feedback.id, {status})
        mutate(['/api/feedback', auth.user.token]);
    }

    return (
        <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.comment}</Td>
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
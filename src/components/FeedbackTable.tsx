import React from 'react';
import { Box, Code, Switch, IconButton } from '@chakra-ui/react';

import { Table, Tr, Th, Td } from './Table';
import DeleteFeedbackButton from './DeleteFeedbackButton';
import {getProductById} from "../libraries/database";

const FeedbackTable = ({feedback}) => {
    return (
        <Table>
            <thead>
            <Tr>
                <Th>Name</Th>
                <Th>Feedback</Th>
                <Th>Visible</Th>
                <Th width="50px">{''}</Th>
            </Tr>
            </thead>
            <tbody>
            {feedback.map((feedback) => (
                    <Box as="tr" key={feedback.id}>
                        <Td fontWeight="medium">{feedback.author}</Td>
                        <Td>{feedback.comment}</Td>
                        <Td>
                            <Switch
                                color="green"
                                defaultIsChecked={feedback.status === 'active'}
                            />
                        </Td>
                        <Td>
                            <DeleteFeedbackButton feedbackId={feedback.id} />
                        </Td>
                    </Box>
                ))
            }
            </tbody>
        </Table>
    );
};

export default FeedbackTable;
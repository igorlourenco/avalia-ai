import React from 'react';
import {Table, Tr, Th} from './Table';
import FeedbackRow from "./FeedbackRow";

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
            {feedback.map((feedback) =>
                <FeedbackRow key={feedback.id} feedback={feedback}/>
            )
            }
            </tbody>
        </Table>
    );
};

export default FeedbackTable;
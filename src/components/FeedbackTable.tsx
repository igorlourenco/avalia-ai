import React from 'react';
import {Table, Tr, Th} from './Table';
import FeedbackRow from "./FeedbackRow";
import {findProductById} from "../libraries/database";

const FeedbackTable = ({feedback}) => {
    return (
        <Table>
            <thead>
            <Tr>
                <Th>Produto</Th>
                <Th>Comentário</Th>
                <Th>É visível?</Th>
                <Th width="50px">{''}</Th>
            </Tr>
            </thead>
            <tbody>
                {feedback.map((feedback) => <FeedbackRow key={feedback.id} feedback={feedback}/>)}
            </tbody>
        </Table>
    );
};

export default FeedbackTable;
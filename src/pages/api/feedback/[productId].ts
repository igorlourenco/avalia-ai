import {NextApiRequest, NextApiResponse} from "next";
import {getAllFeedback} from "../../../libraries/database-admin";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const {productId} = request.query

    const { feedback, error } = await getAllFeedback(productId.toString())

    if (error) {
        return response.status(500).json({error});
    }

    return response.status(200).json({feedback});
};
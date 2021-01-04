import {NextApiRequest, NextApiResponse} from "next";
import {createFeedback} from "../../../../libraries/database-admin";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const {productId} = request.query

    const data = JSON.parse(request.body)

    await createFeedback({productId, ...data})

    return response.status(200).json({message: 'Seu comentário foi enviado'});
};
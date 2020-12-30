import {NextApiRequest, NextApiResponse} from "next";
import {getUserFeedback} from "../../libraries/database-admin";
import {auth} from "../../libraries/firebase-admin";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const {token} = request.headers
        const {uid} = await auth.verifyIdToken(token.toString())

        const {feedback, error} = await getUserFeedback(uid)

        if (error) {
            return response.status(500).json({error});
        }

        return response.status(200).json({feedback});
    } catch (error) {
        return response.status(500).json({error});
    }
}
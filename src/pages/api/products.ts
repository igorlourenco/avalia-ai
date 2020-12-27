import {NextApiRequest, NextApiResponse} from "next";
import {getUserProducts} from "../../libraries/database-admin";
import {auth} from "../../libraries/firebase-admin";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const {token} = request.headers
        const {uid} = await auth.verifyIdToken(token.toString())

        const {products, error} = await getUserProducts(uid)

        if (error) {
            return response.status(500).json({error});
        }

        return response.status(200).json({products});
    } catch (error) {
        return response.status(500).json({error});
    }
}
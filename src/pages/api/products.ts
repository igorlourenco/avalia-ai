import {NextApiRequest, NextApiResponse} from "next";
import {getAllProducts} from "../../libraries/database-admin";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { products, error } = await getAllProducts()

    if (error) {
        return response.status(500).json({ error });
    }

    return response.status(200).json({ products });
}
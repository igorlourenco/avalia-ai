import {NextApiRequest, NextApiResponse} from "next";
import {database} from "../../libraries/firebase-admin";

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const snapshot = await database.collection('products').get();
    const products = [];

    console.log(snapshot)

    snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
    });

    return response.status(200).json({ products });
}
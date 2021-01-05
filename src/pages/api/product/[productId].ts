import {findProductById} from "../../../libraries/database-admin";

export default async (req, res) => {
    try {
        const { productId } = req.query;
        const { product } = await findProductById(productId);

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error });
    }
};
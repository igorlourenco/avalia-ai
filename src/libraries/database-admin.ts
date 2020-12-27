import {database} from './firebase-admin'
import {compareDesc, parseISO} from "date-fns";

export async function getAllFeedback(productId: string) {
    try {
        const snapshot = await database.collection('feedback')
            .where('productId', '==', productId)
            .get()

        const feedback = [];

        snapshot.forEach((doc) => {
            feedback.push({id: doc.id, ...doc.data()});
        });

        feedback.sort((a, b) =>
            compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        );

        return {feedback};
    } catch (error) {
        return {error}
    }
}

export async function getAllProducts() {
    try {
        const snapshot = await database.collection('products').get();

        const products = [];

        snapshot.forEach((doc) => {
            products.push({id: doc.id, ...doc.data()});
        });

        return {products};
    } catch (error) {
        return {error}
    }
}
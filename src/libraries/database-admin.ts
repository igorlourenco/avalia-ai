import {firestore} from './firebase-admin'
import {compareDesc, parseISO} from "date-fns";
import Feedback from "../interfaces/Feedback";


export async function getAllProducts() {
    try {
        const snapshot = await firestore.collection('products').get();

        const products = [];

        snapshot.forEach((doc) => {
            products.push({id: doc.id, ...doc.data()});
        });

        return {products};
    } catch (error) {
        return {error}
    }
}

export async function createFeedback(feedback: Feedback) {
    return await firestore
        .collection('feedback')
        .add(feedback)
}

export async function getAllFeedback(productId: string) {
    try {
        const snapshot = await firestore.collection('feedback')
            .where('productId', '==', productId)
            .where('status', '==', 'active')
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

export async function getUserProducts(uid: string) {
    try {
        const snapshot = await firestore.collection('products')
            .where('owner', '==', uid)
            .get();

        const products = [];

        snapshot.forEach((doc) => {
            products.push({id: doc.id, ...doc.data()});
        });

        products.sort((a, b) =>
            compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        );

        return {products};
    } catch (error) {
        return {error}
    }
}

export async function getUserFeedback(authorId: string) {
    try {
        const snapshot = await firestore.collection('feedback')
            .where('authorId', '==', authorId)
            .where('status', 'in', ['pending', 'active'])
            .get();

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

export async function findProductById(productId: string) {
    try {
        const snapshot = await firestore.collection('products')
            .doc(productId)
            .get()

        const product = snapshot.data()

        return {product};
    } catch (error) {
        return {error}
    }
}
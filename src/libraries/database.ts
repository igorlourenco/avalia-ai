import firebase from 'firebase/app'
import 'firebase/firestore'
import User from '../interfaces/User'
import Product from "../interfaces/Product";
import Feedback from "../interfaces/Feedback";

const firestore = firebase.firestore()

export async function createUser(uid: string, user: User) {
    return await firestore
        .collection('users')
        .doc(uid)
        .set({uid, ...user}, {merge: true})
}

export async function createProduct(product: Product) {
    return await firestore
        .collection('products')
        .add(product)
}

export async function createFeedback(feedback: Feedback) {
    return await firestore
        .collection('feedback')
        .add(feedback)
}
export function deleteFeedback(id) {
    return firestore.collection('feedback').doc(id).delete();
}

export async function getProductById(id: string) {
    try {
        const snapshot = await firestore.collection('products')
            .where('id', '==', id)
            .get();

        const products = [];

        snapshot.forEach((doc) => {
            products.push({id: doc.id, ...doc.data()});
        });

        return products[0];
    } catch (error) {
        return {error}
    }
}

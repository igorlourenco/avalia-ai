import firebase from 'firebase/app'
import 'firebase/firestore'
import User from '../interfaces/User'
import Product from "../interfaces/Product";

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

export function deleteFeedback(id: string) {
    return firestore.collection('feedback').doc(id).update({status: 'removed'});
}

export function updateFeedback(id: string, newValues: any) {
    return firestore.collection('feedback').doc(id).update(newValues);
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
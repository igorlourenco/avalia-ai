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

export function deleteFeedback(id: string) {
    return firestore.collection('feedback').doc(id).update({status: 'removed'});
}

export function updateFeedback(id: string, newValues: any) {
    return firestore.collection('feedback').doc(id).update(newValues);
}
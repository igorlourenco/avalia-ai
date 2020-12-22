import firebase from 'firebase/app'
import 'firebase/firestore'
import User from "../interfaces/User";

const firestore = firebase.firestore()

export async function createUser(uid: string, user: User) {
    return await firestore
        .collection('users')
        .doc(uid)
        .set({uid, ...user}, {merge: true})
}
import React, {useState, useEffect, useContext, createContext} from 'react'
import firebase from './firebase'
import {createUser} from './database'
import cookie from 'js-cookie'
import Router from 'next/router';

const authContext = createContext({
    user: undefined,
    signInWithGithub: undefined,
    signOut: undefined
})

export function AuthProvider({children}) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {
    const [user, setUser] = useState({})

    const handleUser = async (rawUser: firebase.User) => {
        if (rawUser) {
            const tempUser = await formatUser(rawUser);

            const { token, ...userWithoutToken } = tempUser;

            setUser(tempUser);
            await createUser(tempUser.uid, userWithoutToken);

            cookie.set('avalia-ai-auth', true, {
                expires: 1
            });

            return tempUser;
        } else {
            setUser(false);
            cookie.remove('avalia-ai-auth');

            return false;
        }
    }

    const signInWithGithub = (redirect) => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(async (response) => {
                await handleUser(response.user);

                if (redirect) {
                    await Router.push(redirect);
                }
            });
    };

    const signOut = async () => {
        cookie.remove('avalia-ai-auth');
        await Router.push('/')
        return firebase
            .auth()
            .signOut()
            .then(async () => {
                await handleUser(null)
            })
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(false)
            }
        })

        return () => unsubscribe()
    }, [])

    return {
        user,
        signInWithGithub,
        signOut
    }
}

const formatUser = async (user: any) => {
    return {
        uid: user?.uid,
        email: user?.email,
        name: user?.displayName,
        token: user.ya,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    }
}
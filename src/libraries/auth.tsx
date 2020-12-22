import React, {useState, useEffect, useContext, createContext} from 'react'
import firebase from './firebase'
import {createUser} from './database'

const formatUser = async (user: firebase.User) => {
    return {
        uid: user?.uid,
        email: user?.email,
        name: user?.displayName,
        token: user.refreshToken,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
    }
}

const authContext = createContext({
    user: null,
    signInWithGithub: null,
    signOut: null
})

export function ProvideAuth({children}) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

function useProvideAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleUser = async (rawUser: firebase.User) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            const {token, ...userWithoutToken} = user;

            await createUser(user.uid, userWithoutToken);
            setUser(user);

            setLoading(false);
            return user;
        } else {
            setUser(false);
            setLoading(false);
            return false;
        }
    }

    const signInWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(async (response) => {
                await handleUser(response.user);
                return response.user
            })
    }

    const signOut = () => {
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
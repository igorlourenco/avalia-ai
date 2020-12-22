import React, {useState, useEffect, useContext, createContext} from 'react'
import firebase from './firebase'

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

    const signInWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => {
                setUser(response.user)
                return response.user
            })
    }

    const signOut = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false)
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
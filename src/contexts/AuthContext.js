import React, { useContext, useEffect, useState } from 'react'
import { auth } from "../firebase"
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider,
    signOut, 
    signInWithPopup
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    
    const[currentUser, setCurrentUser] = useState()
    const[loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider()
    
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function loginWithGoogle() {
        return signInWithPopup(auth, provider)
    }

    function logout() {
        signOut(auth)
    }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login, loginWithGoogle,
        logout,
        signup,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

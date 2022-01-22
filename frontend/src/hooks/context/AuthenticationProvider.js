import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'
import { DeviceEventEmitter } from 'react-native'

import { auth, onAuthStateChanged, sendEmailVerification } from '../../firebase'
import { save, getValueFor, deleteValue } from '../../shared/UserAuthentication'
export const AuthenticationContext = createContext()
const AuthenticationProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState()
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
                setCurrentUser(user)
                user.getIdToken().then((token) => {
                    save('jwtToken', token)
                })
                save('currentUserId', user.uid)
                if (user.emailVerified == false) {
                    sendEmailVerification(auth.currentUser)
                }
                postUserProfileData(user)
            }
            if (!user) {
                setIsAuthenticated(false)
            }
        })
        return unsubscribe
    }, [])

    const postUserProfileData = async (user) => {
        try {
            let mounted = true
            const username = user?.email.split('@')[0]
            const avatar = user?.imageURL ?? `https://unavatar.io/${username}`
            const isVerified = user?.emailVerified
            const email = user?.email
            const userId = await getValueFor('currentUserId')
            const token = await getValueFor('jwtToken')
            const response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
                method: 'post',
                url: 'http://192.168.0.9:3001/user',
                data: {
                    username: username,
                    displayName: username,
                    avatar: avatar,
                    email: email,
                    isVerified: isVerified,
                    userId: userId,
                },
            }).then(function (response) {
                console.log(response.data.message)
            })
            DeviceEventEmitter.emit('userUpdated')
            return () => (mounted = false)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <AuthenticationContext.Provider
            value={{ isAuthenticated, currentUser }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider

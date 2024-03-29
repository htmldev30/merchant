import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { DeviceEventEmitter } from 'react-native'
import { getValueFor } from '../../shared/UserAuthentication'
import { auth, onAuthStateChanged } from '../../firebase'

export const UserProfileContext = createContext()

const UserProfileProvider = (props) => {
    const [userProfile, setUserProfile] = useState([])
    const [userUpdated, setUserUpdated] = useState(false)
    useEffect(() => {
        let mounted = true
        let unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (userUpdated) {
                    getUserProfile()

                    userUpdatedSubscription.remove()
                }
            }
        })

        return () => (mounted = false)
    }, [userUpdated])

    const userUpdatedSubscription = DeviceEventEmitter.addListener(
        'userUpdated',
        () => setUserUpdated(true)
    )

    const getUserProfile = async () => {
        try {
            let mounted = true

            const token = await getValueFor('jwtToken')
            const currentUserId = await getValueFor('currentUserId')
            const response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
                method: 'get',
                url: `http://192.168.0.9:3001/user/${currentUserId}`,
            })
                .then(function (response) {
                    return response
                })
                .then(function (response) {
                    const userProfile = response.data.userProfile
                    setUserProfile(userProfile)
                    setUserUpdated(false)
                })

            return () => (mounted = false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <UserProfileContext.Provider value={{ userProfile, setUserUpdated }}>
            {props.children}
        </UserProfileContext.Provider>
    )
}
export default UserProfileProvider

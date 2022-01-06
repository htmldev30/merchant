import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { DeviceEventEmitter } from 'react-native'

import { getValueFor } from '../../shared/UserAuthentication'

export const UserShopContext = createContext()

const UserShopProvider = (props) => {
    const [userShop, setUserShop] = useState([])
    const [userShopUpdated, setUserShopUpdated] = useState(false)

    // runs whenever userShop is updated | not relying on true or false
    useEffect(() => {
        getUserShop()
        userShopUpdatedSubscription.remove()
    }, [userShopUpdated])

    const userShopUpdatedSubscription = DeviceEventEmitter.addListener(
        'userShopUpdated',
        () => setUserShopUpdated(true)
    )

    const getUserShop = async () => {
        try {
            let mounted = true
            const token = await getValueFor('jwtToken')
            const shopCreatorId = await getValueFor('currentUserId')
            const response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
                method: 'get',
                url: `http://192.168.0.9:3001/user-shop/${shopCreatorId}`,
            })
                .then(function (response) {
                    return response
                })
                .then(function (response) {
                    const userShop = response.data.userShop
                    setUserShop(userShop)
                    setUserShopUpdated(false)
                })
            return () => (mounted = false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <UserShopContext.Provider value={{ userShop, setUserShopUpdated }}>
            {props.children}
        </UserShopContext.Provider>
    )
}
export default UserShopProvider

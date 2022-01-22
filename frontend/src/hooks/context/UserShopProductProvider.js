import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { DeviceEventEmitter } from 'react-native'

import { getValueFor, save } from '../../shared/UserAuthentication'
import { auth, onAuthStateChanged } from '../../firebase'

export const UserShopProductContext = createContext()

const UserShopProvider = (props) => {
    const [allUserShopProducts, setAllUserShopProducts] = useState([])
    const [userShopProductsUpdated, setUserShopProductsUpdated] =
        useState(false)

    // runs whenever userShop is updated | not relying on true or false
    useEffect(() => {
        let mounted = true
        let unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user || userShopProductsUpdated) {
                getAllUserShopProducts()

                userShopProductsUpdatedSubscription.remove()
            }
        })

        return () => (mounted = false)
    }, [userShopProductsUpdated])

    const userShopProductsUpdatedSubscription = DeviceEventEmitter.addListener(
        'userShopProductsUpdated',
        () => setUserShopProductsUpdated(true)
    )

    const getAllUserShopProducts = async () => {
        try {
            let mounted = true
            const token = await getValueFor('jwtToken')
            const shopCreatorId = await getValueFor('currentUserId')
            const currentUserShopId = await getValueFor('currentUserShopId')
            const response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    authorization: `Bearer ${token}`,
                },
                method: 'get',
                url: `http://192.168.0.9:3001/user-shop/${shopCreatorId}/${currentUserShopId}/products`,
            })
                .then(function (response) {
                    return response
                })
                .then(function (response) {
                    const allUserShopProducts =
                        response.data.allUserShopProducts
                    setAllUserShopProducts(allUserShopProducts)
                    setUserShopProductsUpdated(false)
                })
            return () => (mounted = false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <UserShopProductContext.Provider value={{ allUserShopProducts }}>
            {props.children}
        </UserShopProductContext.Provider>
    )
}
export default UserShopProvider

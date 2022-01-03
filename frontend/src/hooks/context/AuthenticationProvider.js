import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'
import * as AuthSession from 'expo-auth-session'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {
    save,
    getValueFor,
    checkAuthentication,
} from '../../shared/UserAuthentication'
import {
    AUTH0_CLIENT_ID,
    AUTH0_AUTHORIZATION_ENDPOINT,
    AUTH0_AUDIENCE,
} from '@env'
const authorizationEndpoint = `${AUTH0_AUTHORIZATION_ENDPOINT}`

const useProxy = Platform.select({ web: false, default: true })
const redirectUri = AuthSession.makeRedirectUri({ useProxy })

export const AuthenticationContext = createContext()
const AuthenticationProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUserId, setCurrentUserId] = useState(null)
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            redirectUri,
            clientId: `${AUTH0_CLIENT_ID}`,
            responseType: 'id_token',
            // retrieve the user's profile
            scopes: ['openid', 'profile', 'email'],
            audience: `${AUTH0_AUDIENCE}`,
            extraParams: {
                nonce: 'nonce',
            },
        },
        { authorizationEndpoint }
    )

    useEffect(() => {
        if (result) {
            if (result.error) {
                Alert.alert(
                    'Authentication error',
                    result.params.error_description || 'something went wrong'
                )
                return
            }
            if (result.type === 'success') {
                const jwtToken = result.params.id_token
                const decoded = jwtDecode(jwtToken)

                const { iat, iss, nonce, aud, exp, ...user } = decoded
                save('jwtToken', jwtToken)
                setIsAuthenticated(checkAuthentication)

                save('currentUserId', user['http://127.0.0.1:3001/user'].userId)
                postUserProfileData(user)
            }
        }
    }, [result])

    const authenticate = () => promptAsync({ useProxy })
    const postUserProfileData = async (user) => {
        try {
            let mounted = true
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
                    username: user.nickname,
                    displayName: user.nickname,
                    avatar: user.picture,
                    isVerified: user.email_verified,
                    userId: user['http://127.0.0.1:3001/user'].userId,
                },
            })

            return () => (mounted = false)
        } catch (error) {
            console.log('post error')
            console.log(error.message)
        }
    }
    return (
        <AuthenticationContext.Provider
            value={{ authenticate, isAuthenticated, currentUserId }}
        >
            {props.children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider

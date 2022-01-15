import React, { useContext } from 'react'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
// Customs
import { fonts } from '../styles/global'
import { AuthenticationContext } from './hooks/context/AuthenticationProvider'
import UserShopProvider from './hooks/context/UserShopProvider'
import UserProfileProvider from './hooks/context/UserProfileProvider'
// Components
import RootStackScreen from './routes/rootNavigation'
export default function Index() {
    let [fontsLoaded] = useFonts(fonts)
    const { isAuthenticated } = useContext(AuthenticationContext)
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <UserProfileProvider>
                <UserShopProvider>
                    <NavigationContainer>
                        <RootStackScreen isAuthenticated={isAuthenticated} />
                    </NavigationContainer>
                </UserShopProvider>
            </UserProfileProvider>
        )
    }
}
